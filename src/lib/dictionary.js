// Dictionary search + normalization utilities.
// Mirrors the rules in scripts/validate-web-data.mjs so validation and search agree.

export function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function normalizeEntries(rawEntries) {
  const counts = rawEntries.reduce((map, entry) => {
    const key = normalizeText(entry.headword || '(tanpa lema)');
    map.set(key, (map.get(key) || 0) + 1);
    return map;
  }, new Map());

  const ordinals = new Map();
  return rawEntries.map((entry, index) => {
    const headword = entry.headword || '(tanpa lema)';
    const key = normalizeText(headword);
    const homonymCount = counts.get(key) || 0;
    const homonymNumber = homonymCount > 1 ? (ordinals.get(key) || 0) + 1 : 0;
    if (homonymNumber) ordinals.set(key, homonymNumber);

    return {
      id: entry.id || `entry-${index + 1}`,
      headword,
      homonymNumber,
      language: entry.language || 'paser',
      partOfSpeech: entry.part_of_speech || entry.partOfSpeech || '',
      translations: asArray(entry.translations)
        .map((t) => t.text || t)
        .filter(Boolean),
      examples: asArray(entry.examples),
      subentries: asArray(entry.subentries)
        .map(normalizeSubentry)
        .filter((s) => s.label),
      variants: asArray(entry.variants).map(normalizeVariant).filter(isVisibleVariant),
      notes: entry.notes || '',
    };
  });
}

function normalizeSubentry(s) {
  if (!s || typeof s !== 'object') {
    return { label: '', partOfSpeech: '', translations: [], examples: [], note: '' };
  }
  return {
    label: s.headword || s.label || s.text || '',
    partOfSpeech: s.part_of_speech || s.partOfSpeech || '',
    translations: asArray(s.translations).map((t) => t.text || t).filter(Boolean),
    examples: asArray(s.examples),
    note: s.note || s.notes || '',
  };
}

function normalizeVariant(v) {
  if (typeof v === 'string') {
    return { label: v, kind: '', translations: [], examples: [], note: '' };
  }
  if (!v || typeof v !== 'object') {
    return { label: '', kind: '', translations: [], examples: [], note: '' };
  }
  return {
    label: v.headword || v.label || v.text || '',
    kind: v.kind || '',
    translations: asArray(v.translations).map((t) => t.text || t).filter(Boolean),
    examples: asArray(v.examples),
    note: v.note || v.notes || '',
  };
}

function isVisibleVariant(v) {
  return v.label && v.kind !== 'syllable';
}

export function searchableText(entry) {
  return normalizeText([entry.headword, entry.translations.join(' ')].join(' '));
}

export function filterEntries(entries, query) {
  const q = normalizeText(query);
  if (!q) return [];
  return entries.filter((entry) => searchableText(entry).includes(q));
}

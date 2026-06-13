const DATA_CANDIDATES = [
  '../data/entries.json',
  '../data/entries.sample.json',
  './data/entries.json',
  './data/entries.sample.json',
  '/data/entries.json',
  '/data/entries.sample.json'
];

const els = {
  search: document.querySelector('#searchInput'),
  clear: document.querySelector('#clearSearch'),
  count: document.querySelector('#entryCount'),
  status: document.querySelector('#status'),
  results: document.querySelector('#results'),
  template: document.querySelector('#entryTemplate')
};

let entries = [];

init();

async function init() {
  try {
    const loaded = await loadEntries();
    entries = normalizeEntries(loaded.entries);
    bindEvents();
    render();
  } catch (error) {
    showStatus(`Data belum bisa dimuat: ${error.message}`, true);
    els.count.textContent = '0 entri';
  }
}

async function loadEntries() {
  const errors = [];
  for (const url of DATA_CANDIDATES) {
    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('format bukan array');
      return { entries: data, url };
    } catch (error) {
      errors.push(`${url}: ${error.message}`);
    }
  }
  throw new Error(errors.join('; '));
}

function bindEvents() {
  els.search.addEventListener('input', render);
  els.clear.addEventListener('click', () => {
    els.search.value = '';
    els.search.focus();
    render();
  });
}

function normalizeEntries(rawEntries) {
  const headwordCounts = rawEntries.reduce((counts, entry) => {
    const key = normalizeHeadwordKey(entry.headword || '(tanpa lema)');
    counts.set(key, (counts.get(key) || 0) + 1);
    return counts;
  }, new Map());

  const headwordOrdinals = new Map();
  return rawEntries.map((entry, index) => {
    const headword = entry.headword || '(tanpa lema)';
    const headwordKey = normalizeHeadwordKey(headword);
    const homonymCount = headwordCounts.get(headwordKey) || 0;
    const homonymNumber = homonymCount > 1 ? (headwordOrdinals.get(headwordKey) || 0) + 1 : 0;
    if (homonymNumber) headwordOrdinals.set(headwordKey, homonymNumber);

    return ({
    id: entry.id || `entry-${index + 1}`,
    headword,
    homonymNumber,
    language: entry.language || 'paser',
    partOfSpeech: entry.part_of_speech || entry.partOfSpeech || '',
    translations: asArray(entry.translations).map((item) => item.text || item).filter(Boolean),
    examples: asArray(entry.examples),
    subentries: asArray(entry.subentries).map(normalizeSubentry).filter((subentry) => subentry.label),
    variants: asArray(entry.variants).map(normalizeVariant).filter(isVisibleVariant),
    notes: entry.notes || ''
    });
  });
}

function render() {
  const query = normalizeText(els.search.value);
  const filtered = query ? entries.filter((entry) => searchableText(entry).includes(query)) : [];

  els.results.replaceChildren();

  if (!entries.length) {
    els.count.textContent = '';
    showStatus('Belum ada entri. Tambahkan data JSON untuk mulai.', false);
    return;
  }

  if (!query) {
    els.count.textContent = '';
    showStatus('Mulai ketik untuk melihat hasil kamus yang relevan.', false);
    els.results.appendChild(renderHelperState());
    return;
  }

  if (!filtered.length) {
    showStatus('Tidak ada hasil. Coba kata Paser/Indonesia lain.', false);
    return;
  }

  showStatus(query ? `Hasil untuk “${els.search.value}”` : 'Semua entri ditampilkan.', false);
  filtered.forEach((entry) => els.results.appendChild(renderEntry(entry)));
}

function renderHelperState() {
  const card = document.createElement('article');
  card.className = 'card helper-card';
  const title = document.createElement('h2');
  const text = document.createElement('p');
  title.textContent = 'Cari arti kata';
  text.textContent = 'Masukkan kata Paser atau arti Indonesia. Hasil akan muncul setelah Anda mengetik.';
  card.append(title, text);
  return card;
}

function renderEntry(entry) {
  const node = els.template.content.cloneNode(true);
  renderHeadword(node.querySelector('.headword'), entry);
  node.querySelector('.subline').textContent = [entry.language, entry.partOfSpeech].filter(Boolean).join(' · ');
  node.querySelector('.badge').remove();

  const fields = node.querySelector('.fields');
  addField(fields, 'Indonesia', entry.translations.join('; '));
  addField(fields, 'Contoh', renderExamples(entry.examples));
  addField(fields, 'Sublema/Varian', renderSubentriesAndVariants(entry.subentries, entry.variants));
  return node;
}

function renderHeadword(parent, entry) {
  parent.replaceChildren(document.createTextNode(entry.headword));
  if (!entry.homonymNumber) return;
  const marker = document.createElement('sup');
  marker.className = 'homonym-number';
  marker.textContent = entry.homonymNumber;
  parent.appendChild(marker);
}

function addField(parent, label, value) {
  if (!value || (Array.isArray(value) && !value.length)) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'field';
  const dt = document.createElement('dt');
  const dd = document.createElement('dd');
  dt.textContent = label;
  if (Array.isArray(value)) dd.append(...value);
  else dd.textContent = value;
  wrapper.append(dt, dd);
  parent.appendChild(wrapper);
}

function renderExamples(examples) {
  const nodes = [];
  examples.forEach((item) => {
    const example = renderExample(item);
    if (!example.length) return;
    if (nodes.length) nodes.push(document.createTextNode(' | '));
    nodes.push(...example);
  });
  return nodes;
}

function renderSubentriesAndVariants(subentries, variants) {
  const items = [...subentries, ...variants];
  if (!items.length) return [];

  const list = document.createElement('div');
  list.className = 'variant-list';

  items.forEach((variant) => {
    const item = document.createElement('details');
    item.className = 'variant-item';

    const summary = document.createElement('summary');
    summary.className = 'variant-summary';
    summary.textContent = variant.label;

    const detail = document.createElement('div');
    detail.className = 'variant-detail';
    renderVariantDetail(detail, variant);

    item.append(summary, detail);
    list.appendChild(item);
  });

  return [list];
}

function renderVariantDetail(parent, variant) {
  let hasDetail = false;

  if (variant.partOfSpeech) {
    const partOfSpeech = document.createElement('p');
    partOfSpeech.textContent = `Kelas kata: ${variant.partOfSpeech}`;
    parent.appendChild(partOfSpeech);
    hasDetail = true;
  }

  if (variant.translations.length) {
    const text = document.createElement('p');
    text.textContent = `Indonesia: ${variant.translations.join('; ')}`;
    parent.appendChild(text);
    hasDetail = true;
  }

  if (variant.examples.length) {
    const examples = document.createElement('p');
    examples.append(document.createTextNode('Contoh: '), ...renderExamples(variant.examples));
    parent.appendChild(examples);
    hasDetail = true;
  }

  if (!hasDetail) {
    const fallback = document.createElement('p');
    fallback.textContent = variant.note || 'Detail varian belum diparse dari OCR';
    parent.appendChild(fallback);
  }
}

function normalizeVariant(variant) {
  if (typeof variant === 'string') {
    return { label: variant, kind: '', translations: [], examples: [], note: '' };
  }

  if (!variant || typeof variant !== 'object') {
    return { label: '', kind: '', translations: [], examples: [], note: '' };
  }

  return {
    label: variant.headword || variant.label || variant.text || '',
    kind: variant.kind || '',
    translations: asArray(variant.translations).map((item) => item.text || item).filter(Boolean),
    examples: asArray(variant.examples),
    note: variant.note || variant.notes || ''
  };
}

function isVisibleVariant(variant) {
  return variant.label && variant.kind !== 'syllable';
}

function normalizeSubentry(subentry) {
  if (!subentry || typeof subentry !== 'object') {
    return { label: '', partOfSpeech: '', translations: [], examples: [], note: '' };
  }

  return {
    label: subentry.headword || subentry.label || subentry.text || '',
    partOfSpeech: subentry.part_of_speech || subentry.partOfSpeech || '',
    translations: asArray(subentry.translations).map((item) => item.text || item).filter(Boolean),
    examples: asArray(subentry.examples),
    note: subentry.note || subentry.notes || ''
  };
}

function renderExample(item) {
  if (typeof item === 'string') return renderExampleParts(...splitExample(item));
  return renderExampleParts(item.text, item.translation_id || item.translation);
}

function renderExampleParts(paser, indonesia = '') {
  if (!paser) return [];
  const nodes = [];
  const paserText = document.createElement('em');
  paserText.textContent = paser.trim();
  nodes.push(paserText);
  if (indonesia) {
    nodes.push(document.createTextNode(' — '));
    nodes.push(document.createTextNode(indonesia.trim()));
  }
  return nodes;
}

function splitExample(text) {
  const parts = text.split(' — ');
  return parts.length > 1 ? [parts[0], parts.slice(1).join(' — ')] : [text, ''];
}

function searchableText(entry) {
  return normalizeText([
    entry.headword,
    entry.translations.join(' '),
    entry.subentries.map(searchableVariantText).join(' '),
    entry.variants.map(searchableVariantText).join(' ')
  ].join(' '));
}

function searchableVariantText(variant) {
  return [
    variant.label,
    variant.translations.join(' ')
  ].join(' ');
}

function normalizeText(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function normalizeHeadwordKey(value) {
  return normalizeText(value);
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function showStatus(message, isError) {
  els.status.textContent = message;
  els.status.classList.toggle('error', Boolean(isError));
}

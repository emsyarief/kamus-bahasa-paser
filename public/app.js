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
  source: document.querySelector('#dataSource'),
  status: document.querySelector('#status'),
  results: document.querySelector('#results'),
  template: document.querySelector('#entryTemplate')
};

let entries = [];
let loadedFrom = '';

init();

async function init() {
  try {
    const loaded = await loadEntries();
    entries = normalizeEntries(loaded.entries);
    loadedFrom = loaded.url;
    els.source.textContent = `Sumber: ${loadedFrom}`;
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
  return rawEntries.map((entry, index) => ({
    id: entry.id || `entry-${index + 1}`,
    headword: entry.headword || '(tanpa lema)',
    language: entry.language || 'paser',
    partOfSpeech: entry.part_of_speech || entry.partOfSpeech || '',
    translations: asArray(entry.translations).map((item) => item.text || item).filter(Boolean),
    definitions: asArray(entry.definitions).filter(Boolean),
    examples: asArray(entry.examples),
    variants: asArray(entry.variants).filter(Boolean),
    notes: entry.notes || '',
    source: entry.source || {},
    review: entry.review || {}
  }));
}

function render() {
  const query = normalizeText(els.search.value);
  const filtered = query ? entries.filter((entry) => searchableText(entry).includes(query)) : entries;

  els.count.textContent = `${filtered.length} dari ${entries.length} entri`;
  els.results.replaceChildren();

  if (!entries.length) {
    showStatus('Belum ada entri. Tambahkan data JSON untuk mulai.', false);
    return;
  }

  if (!filtered.length) {
    showStatus('Tidak ada hasil. Coba kata Paser/Indonesia lain.', false);
    return;
  }

  showStatus(query ? `Hasil untuk “${els.search.value}”` : 'Semua entri ditampilkan.', false);
  filtered.forEach((entry) => els.results.appendChild(renderEntry(entry)));
}

function renderEntry(entry) {
  const node = els.template.content.cloneNode(true);
  node.querySelector('.headword').textContent = entry.headword;
  node.querySelector('.subline').textContent = [entry.language, entry.partOfSpeech].filter(Boolean).join(' · ');
  node.querySelector('.badge').textContent = entry.review.status || 'draft';

  const fields = node.querySelector('.fields');
  addField(fields, 'Indonesia', entry.translations.join('; '));
  addField(fields, 'Definisi', entry.definitions.join('; '));
  addField(fields, 'Contoh', formatExamples(entry.examples));
  addField(fields, 'Varian', entry.variants.join(', '));
  return node;
}

function addField(parent, label, value) {
  if (!value) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'field';
  const dt = document.createElement('dt');
  const dd = document.createElement('dd');
  dt.textContent = label;
  dd.textContent = value;
  wrapper.append(dt, dd);
  parent.appendChild(wrapper);
}

function formatExamples(examples) {
  return examples.map((item) => {
    if (typeof item === 'string') return item;
    return [item.text, item.translation_id || item.translation].filter(Boolean).join(' — ');
  }).filter(Boolean).join(' | ');
}

function formatSource(source) {
  return [source.file, source.page ? `hal. ${source.page}` : '', source.ocr_confidence ? `OCR ${source.ocr_confidence}` : '']
    .filter(Boolean)
    .join(' · ');
}

function searchableText(entry) {
  return normalizeText([
    entry.headword,
    entry.translations.join(' '),
    entry.definitions.join(' ')
  ].join(' '));
}

function normalizeText(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function showStatus(message, isError) {
  els.status.textContent = message;
  els.status.classList.toggle('error', Boolean(isError));
}

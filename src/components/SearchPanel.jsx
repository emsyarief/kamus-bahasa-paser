import { useEffect, useRef, useState } from 'react';

export default function SearchPanel({
  query,
  onQueryChange,
  onClear,
  mode,
  onModeChange,
  count,
  status,
  onPickSuggestion,
  suggestions = [],
  randomChips = [],
}) {
  const modes = [
    { id: 'all', label: 'Semua' },
    { id: 'paser', label: 'Paser → Indo' },
    { id: 'indo', label: 'Indo → Paser' },
  ];

  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const boxRef = useRef(null);

  useEffect(() => {
    setHighlight(-1);
  }, [suggestions]);

  useEffect(() => {
    const onDoc = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const showList = open && Boolean(query) && suggestions.length > 0;

  const pick = (headword) => {
    onPickSuggestion(headword);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (!showList) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(suggestions.length - 1, h + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(0, h - 1));
    } else if (e.key === 'Enter') {
      if (highlight >= 0) {
        e.preventDefault();
        pick(suggestions[highlight].headword);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <section className="section border-b border-ink/15 px-pad-x py-12">
      <div className="mx-auto max-w-wrap">
        <div className="mx-auto max-w-content text-center">
          <div className="reveal mx-auto mb-6 border border-ink/15 bg-transparent p-6">
            <label className="label mb-3 block text-ink" htmlFor="searchInput">
              CARI ENTRI
            </label>
            <div className="mb-4 flex flex-col gap-2.5 sm:flex-row">
              <div ref={boxRef} className="relative min-w-0 flex-1 text-left">
                <input
                  id="searchInput"
                  type="search"
                  autoComplete="off"
                  spellCheck="false"
                  role="combobox"
                  aria-expanded={showList}
                  aria-controls="search-suggestions"
                  aria-activedescendant={highlight >= 0 ? `suggestion-${highlight}` : undefined}
                  placeholder="Ketik kata Paser atau Indonesia…"
                  value={query}
                  onChange={(e) => {
                    onQueryChange(e.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                  onKeyDown={onKeyDown}
                  className="w-full border-2 border-ink/15 bg-transparent px-5 py-4 text-[17px] text-ink outline-none transition-all placeholder:text-ink/50 focus:border-ink focus:shadow-[inset_0_0_0_1px_#1A1A1A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                />
                {showList && (
                  <ul
                    id="search-suggestions"
                    role="listbox"
                    className="absolute left-0 right-0 top-full z-30 mt-1 max-h-80 overflow-auto border border-ink/15 bg-bg shadow-[0_10px_30px_rgba(26,26,26,0.12)]"
                  >
                    {suggestions.map((s, i) => (
                      <li
                        key={s.id}
                        id={`suggestion-${i}`}
                        role="option"
                        aria-selected={i === highlight}
                        onMouseEnter={() => setHighlight(i)}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          pick(s.headword);
                        }}
                        className={`flex cursor-pointer items-baseline justify-between gap-4 px-4 py-2.5 text-[15px] ${
                          i === highlight ? 'bg-ink text-reversed' : 'text-ink hover:bg-ink/04'
                        }`}
                      >
                        <span className="font-display font-light">{s.headword}</span>
                        <span className={`truncate text-[13px] ${i === highlight ? 'text-reversed/70' : 'text-ink/50'}`}>
                          {s.translations[0] || ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                onClick={onClear}
                type="button"
                className="rounded-pill border border-transparent bg-ink px-7 py-4 font-body text-cta uppercase text-reversed transition-colors hover:bg-[#262626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Bersihkan
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.12em] text-ink/50">Mode:</span>
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => onModeChange(m.id)}
                  className={`rounded-pill border px-4 py-1.5 text-[11px] uppercase tracking-[0.12em] transition-all ${
                    mode === m.id
                      ? 'border-ink bg-ink text-reversed'
                      : 'border-ink/20 bg-transparent text-ink/60 hover:border-ink/40 hover:text-ink'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          {!query && randomChips.length > 0 && (
            <div className="reveal mb-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[12px] text-ink/50">Coba:</span>
              {randomChips.map((word) => (
                <button
                  key={word}
                  onClick={() => onPickSuggestion(word)}
                  className="rounded-pill border border-ink/15 bg-transparent px-3 py-1 text-[13px] text-ink/70 transition-colors hover:border-ink/40 hover:bg-ink/04 hover:text-ink"
                >
                  {word}
                </button>
              ))}
            </div>
          )}
          {count && <p className="text-label text-ink/60">{count}</p>}
          {status && <p className="mt-4 min-h-[1.5em] text-[15px] text-ink/60">{status}</p>}
        </div>
      </div>
    </section>
  );
}

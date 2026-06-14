const POPULAR_WORDS = ['rumah', 'baik', 'air', 'makan', 'pergi', 'besar'];

export default function SearchPanel({ query, onQueryChange, onClear, mode, onModeChange, count, status, onPickSuggestion }) {
  const modes = [
    { id: 'all', label: 'Semua' },
    { id: 'paser', label: 'Paser → Indo' },
    { id: 'indo', label: 'Indo → Paser' },
  ];

  return (
    <section className="section border-b border-ink/15 px-pad-x py-12">
      <div className="mx-auto max-w-wrap">
        <div className="mx-auto max-w-content text-center">
          <div className="reveal mx-auto mb-6 border border-ink/15 bg-transparent p-6">
            <label className="label mb-3 block text-ink" htmlFor="searchInput">
              CARI ENTRI
            </label>
            <div className="mb-4 flex flex-col gap-2.5 sm:flex-row">
              <input
                id="searchInput"
                type="search"
                autoComplete="off"
                spellCheck="false"
                placeholder="Ketik kata Paser atau Indonesia…"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                className="min-w-0 flex-1 border-2 border-ink/15 bg-transparent px-5 py-4 text-[17px] text-ink outline-none transition-all placeholder:text-ink/50 focus:border-ink focus:shadow-[inset_0_0_0_1px_#1A1A1A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              />
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
          {!query && (
            <div className="reveal mb-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[12px] text-ink/50">Coba:</span>
              {POPULAR_WORDS.map((word) => (
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

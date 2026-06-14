export default function SearchPanel({ query, onQueryChange, onClear, count, status }) {
  return (
    <section className="section border-b border-ink/15 px-pad-x py-12">
      <div className="mx-auto max-w-wrap">
        <div className="mx-auto max-w-content text-center">
          <div className="reveal mx-auto mb-6 border border-ink/15 bg-transparent p-5">
            <label className="label mb-2 block text-ink" htmlFor="searchInput">
              CARI ENTRI
            </label>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <input
                id="searchInput"
                type="search"
                autoComplete="off"
                spellCheck="false"
                placeholder="Mis. aba, baik, rumah…"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                className="min-w-0 flex-1 border border-ink/15 bg-transparent px-4 py-3.5 text-ink outline-none transition-all placeholder:text-ink/50 focus:border-ink focus:shadow-[inset_0_0_0_1px_#1A1A1A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              />
              <button
                onClick={onClear}
                type="button"
                className="rounded-pill border border-transparent bg-ink px-6 py-3 font-body text-cta uppercase text-reversed transition-colors hover:bg-[#262626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Bersihkan
              </button>
            </div>
          </div>
          {count && <p className="text-label text-ink/60">{count}</p>}
          {status && <p className="mt-4 min-h-[1.5em] text-sm text-ink/60">{status}</p>}
        </div>
      </div>
    </section>
  );
}

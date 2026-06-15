export default function SearchPanel({ draftQuery, onDraftQueryChange, onSubmitSearch, mode, onModeChange, compact = false }) {
  const modes = [
    { id: 'all', label: 'Semua' },
    { id: 'paser', label: 'Paser → Indo' },
    { id: 'indo', label: 'Indo → Paser' },
  ];

  return (
    <form
      className="text-left"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmitSearch();
      }}
    >
      <div className="border border-ink/15 bg-transparent p-3.5 sm:p-6">
        <label className={`label mb-3 block text-ink/60 ${compact ? 'hidden' : ''}`} htmlFor="searchInput">
          CARI ENTRI
        </label>
        <div className="mb-3 flex flex-col gap-2.5 sm:mb-4 sm:flex-row">
          <input
            id="searchInput"
            type="search"
            autoComplete="off"
            spellCheck="false"
            placeholder="Ketik kata…"
            value={draftQuery}
            onChange={(e) => onDraftQueryChange(e.target.value)}
            className="min-w-0 flex-1 border-2 border-ink/15 bg-transparent px-4 py-3.5 text-[16px] text-ink outline-none transition-all placeholder:text-ink/50 focus:border-ink focus:shadow-[inset_0_0_0_1px_#1A1A1A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-5 sm:py-4 sm:text-[17px]"
          />
          <button
            type="submit"
            className="rounded-pill border border-transparent bg-ink px-6 py-3.5 font-body text-cta uppercase text-reversed transition-colors hover:bg-[#262626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-7 sm:py-4"
          >
            Cari kata
          </button>
        </div>
        <div className={`flex flex-wrap items-center gap-1.5 transition-all sm:gap-2 ${compact ? 'hidden' : ''}`}>
          <span className="text-[11px] uppercase tracking-[0.12em] text-ink/50">Mode:</span>
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => onModeChange(m.id)}
              className={`shrink-0 rounded-pill border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] transition-all sm:px-4 sm:text-[11px] ${
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
    </form>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-nav-bg/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-wrap items-center justify-between gap-4 px-pad-x py-4">
        <div className="flex flex-1 gap-7">
          <a className="text-label text-ink/70 transition-colors hover:text-ink" href="#entri">ENTRI</a>
          <a className="text-label text-ink/70 transition-colors hover:text-ink" href="#statistik">STATISTIK</a>
        </div>
        <a className="font-display text-[18px] font-medium uppercase tracking-[-0.05em] text-ink" href="#pencarian">
          KAMUS PASER
        </a>
        <div className="flex flex-1 justify-end gap-7">
          <a className="text-label text-ink/70 transition-colors hover:text-ink" href="#kontribusi">KONTRIBUSI</a>
          <a className="text-label text-ink/70 transition-colors hover:text-ink" href="https://github.com/emsyarief/kamus-bahasa-paser" target="_blank" rel="noreferrer">GITHUB ↗</a>
        </div>
      </nav>
    </header>
  );
}

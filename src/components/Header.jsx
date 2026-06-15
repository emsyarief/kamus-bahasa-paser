export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full overflow-hidden border-b border-ink/15 bg-nav-bg/90 backdrop-blur-md">
      <nav className="mx-auto grid max-w-wrap grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 sm:gap-4 sm:px-pad-x sm:py-4">
        <div className="flex min-w-0 flex-wrap gap-x-3 gap-y-1 sm:flex-1 sm:flex-nowrap sm:gap-7">
          <a className="text-[10px] uppercase tracking-[0.14em] text-ink/70 transition-colors hover:text-ink sm:text-label" href="#entri">ENTRI</a>
          <a className="text-[10px] uppercase tracking-[0.14em] text-ink/70 transition-colors hover:text-ink sm:text-label" href="#statistik">STATISTIK</a>
        </div>
        <a className="max-w-[4.8rem] text-center font-display text-[15px] font-medium uppercase leading-[0.9] tracking-[-0.05em] text-ink sm:max-w-none sm:text-[18px] sm:leading-none" href="#pencarian">
          KAMUS PASER
        </a>
        <div className="flex min-w-0 flex-wrap justify-end gap-x-3 gap-y-1 sm:flex-1 sm:flex-nowrap sm:gap-7">
          <a className="text-[10px] uppercase tracking-[0.14em] text-ink/70 transition-colors hover:text-ink sm:text-label" href="#kontribusi">KONTRIBUSI</a>
          <a className="text-[10px] uppercase tracking-[0.14em] text-ink/70 transition-colors hover:text-ink sm:text-label" href="https://github.com/emsyarief/kamus-bahasa-paser" target="_blank" rel="noreferrer">GITHUB</a>
        </div>
      </nav>
    </header>
  );
}

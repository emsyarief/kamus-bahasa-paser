export default function Footer() {
  return (
    <footer id="kontribusi" className="relative overflow-hidden border-t border-ink/15 px-pad-x py-pad-y">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-[2vw] z-0 text-center font-display text-[24vw] font-light uppercase leading-[0.8] tracking-[-0.05em] text-ink/5">
        Paser
      </div>
      <div className="relative z-10 mx-auto max-w-wrap">
        <p className="label mb-6">05 / KONTRIBUSI</p>
        <h2 className="max-w-[18ch] font-display text-h2 text-ink">Berkontribusi untuk pelestarian Bahasa Paser.</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <Info title="Sumber" body="Kamus cetak Komunitas Adat Paser — dipindai, di-OCR, dan disusun ulang sebagai data terbuka." />
          <Info title="Kontribusi" body="Pull request terbuka untuk siapa pun. Mulai dari satu lema, koreksi ejaan, atau tambah contoh pemakaian." />
          <Info title="Lisensi" body="Data: CC BY-SA 4.0. Kode: MIT. PDF sumber tetap milik Komunitas Adat Paser." />
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink/15 pt-7 md:flex-row">
          <span className="label text-ink/70">Kamus Paser · © 2026 · Sumber terbuka</span>
          <div className="flex flex-wrap gap-3">
            <a className="rounded-pill border border-ink/25 px-5 py-2 text-[12px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink/04" href="#pencarian">Kembali ke atas</a>
            <a className="rounded-pill border border-ink/25 px-5 py-2 text-[12px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink/04" href="https://github.com/emsyarief/kamus-bahasa-paser" target="_blank" rel="noreferrer">Lihat di GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Info({ title, body }) {
  return (
    <div>
      <p className="label mb-4 text-ink/70">{title}</p>
      <p className="text-[15px] leading-[1.7] text-ink/70">{body}</p>
    </div>
  );
}

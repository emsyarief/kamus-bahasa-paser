export default function Hero() {
  return (
    <section id="pencarian" className="section border-b border-ink/15 px-pad-x py-pad-y">
      <div className="mx-auto grid max-w-wrap gap-10 lg:grid-cols-[1.55fr_1fr] lg:items-end lg:gap-16">
        <div className="reveal">
          <p className="label mb-6">(*01) — PENCARIAN</p>
          <h1 className="font-display text-h1 uppercase text-ink">
            BAHASA
            <br />PASER
            <br />↔ INDONESIA
          </h1>
        </div>
        <div className="reveal flex flex-col gap-7">
          <p className="max-w-[48ch] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-ink/70">
            Cari lema Bahasa Paser atau padanan Bahasa Indonesia. Data berasal dari kamus cetak Komunitas Adat Paser, hasil OCR dan review bertahap.
          </p>
        </div>
      </div>
    </section>
  );
}

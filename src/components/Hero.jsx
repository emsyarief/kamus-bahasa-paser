import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero({ motionOk = true }) {
  const headingRef = useRef(null);

  useGSAP(() => {
    if (!motionOk) return;
    const lines = headingRef.current?.querySelectorAll('.hero-line');
    if (!lines?.length) return;
    gsap.from(lines, {
      yPercent: 110,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
    });
  }, { dependencies: [motionOk], scope: headingRef });

  return (
    <section id="pencarian" className="section border-b border-ink/15 px-pad-x py-pad-y">
      <div className="mx-auto grid max-w-wrap gap-10 lg:grid-cols-[1.55fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="reveal label mb-6">(*01) — PENCARIAN</p>
          <h1 ref={headingRef} className="font-display text-h1 uppercase text-ink">
            <span className="block overflow-hidden"><span className="hero-line block">BAHASA</span></span>
            <span className="block overflow-hidden"><span className="hero-line block">PASER</span></span>
            <span className="block overflow-hidden"><span className="hero-line block">↔ INDONESIA</span></span>
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

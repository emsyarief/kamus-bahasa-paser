import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = ['Bahasa Paser', '↔ Indonesia', 'Sumber terbuka', 'OCR bertahap', 'Kontribusi komunitas'];

export default function Band({ count = 0 }) {
  const sectionRef = useRef(null);
  const numRef = useRef(null);
  const fmt = (n) => Math.round(n).toLocaleString('id-ID');

  useGSAP(() => {
    const el = numRef.current;
    if (!el) return;
    el.textContent = `${fmt(count)} entri`;
    const reduce =
      typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !count) return;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: count,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${fmt(obj.v)} entri`;
      },
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
    });
  }, { dependencies: [count], scope: sectionRef });

  return (
    <section ref={sectionRef} id="statistik" className="overflow-hidden bg-dark-bg py-12 text-reversed">
      <div className="mb-6 px-pad-x">
        <p className="label mb-3 text-reversed/60">04 / STATISTIK</p>
        <p ref={numRef} className="font-display text-stat uppercase leading-none text-reversed">0 entri</p>
      </div>
      <div className="marquee flex whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`font-display px-7 text-stat uppercase ${i % 2 === 0 ? 'text-reversed' : 'text-reversed/45'}`}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

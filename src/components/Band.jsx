import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = ['Bahasa Paser', '↔ Indonesia', 'Sumber terbuka', 'OCR bertahap', 'Kontribusi komunitas'];

export default function Band() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const items = sectionRef.current ? Array.from(sectionRef.current.querySelectorAll('[data-band-item]')) : [];
    if (!items.length) return;
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="statistik" className="overflow-hidden bg-dark-bg py-12 text-reversed">
      <div className="marquee flex whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={`${item}-${i}`}
            data-band-item
            className={`font-display px-7 text-stat uppercase ${i % 2 === 0 ? 'text-reversed' : 'text-reversed/45'}`}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

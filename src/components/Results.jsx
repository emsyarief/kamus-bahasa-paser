import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import EntryCard from './EntryCard.jsx';

export default function Results({ query, results, motionOk }) {
  const containerRef = useRef(null);
  const prevIdsRef = useRef('');

  useEffect(() => {
    if (!motionOk) return;
    const node = containerRef.current;
    if (!node) return;
    const cards = node.querySelectorAll('.card');
    if (!cards.length) return;
    const key = Array.from(cards).map((c) => c.dataset.id).join('|');
    if (key === prevIdsRef.current) return;
    prevIdsRef.current = key;
    gsap.killTweensOf(cards);
    gsap.from(cards, {
      autoAlpha: 0,
      y: 12,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.04,
      clearProps: 'transform,opacity',
    });
  }, [results, motionOk]);

  if (!query) {
    return (
      <section id="entri" className="section border-b border-ink/15 px-pad-x py-pad-y">
        <div className="mx-auto max-w-wrap">
          <div className="mx-auto max-w-content text-center">
            <h2 className="reveal mb-2 font-display text-h2 text-ink">Hasil pencarian.</h2>
            <p className="reveal text-ink/70">Masukkan kata Paser atau arti Indonesia. Hasil akan muncul setelah Anda mengetik.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="entri" className="section border-b border-ink/15 px-pad-x py-pad-y">
      <div className="mx-auto max-w-wrap">
        <div className="mx-auto max-w-content">
          <h2 className="reveal mb-10 text-center font-display text-h2 text-ink">Hasil pencarian.</h2>
          {results.length ? (
            <div ref={containerRef} className="results" aria-label="Daftar entri">
              {results.map((entry) => (
                <EntryCard key={entry.id} entry={entry} motionOk={motionOk} />
              ))}
            </div>
          ) : (
            <p className="text-center text-ink/60">Coba kata lain atau periksa ejaan.</p>
          )}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import EntryCard from './EntryCard.jsx';

export default function Results({ query, hasActiveQuery, results, motionOk, mode, onModeChange, activeIndex, onActiveIndexChange, inline = false }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const prevIdsRef = useRef('');
  const LIMIT = 80;
  const shown = results.slice(0, LIMIT);

  useEffect(() => {
    if (!motionOk) return;
    const sectionNode = sectionRef.current;
    if (!sectionNode || !hasActiveQuery) return;

    gsap.killTweensOf(sectionNode);
    gsap.fromTo(
      sectionNode,
      { autoAlpha: 0, y: 38, rotateX: 10, rotateZ: -2.5, transformOrigin: '50% 100%' },
      { autoAlpha: 1, y: 0, rotateX: 0, rotateZ: 0, duration: 0.78, delay: 0.12, ease: 'power3.out', clearProps: 'transform,opacity' }
    );
  }, [hasActiveQuery, motionOk, query]);

  useEffect(() => {
    if (!motionOk) return;
    const node = containerRef.current;
    if (!node) return;
    const cards = Array.from(node.querySelectorAll('.card'));
    if (!cards.length) return;
    const key = cards.map((card) => card.dataset.id).join('|');
    if (key === prevIdsRef.current) return;
    prevIdsRef.current = key;
    gsap.killTweensOf(cards);
    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 30, rotateZ: -2.75, transformOrigin: '50% 100%' },
      { autoAlpha: 1, y: 0, rotateZ: 0, duration: 0.64, delay: 0.2, ease: 'power3.out', stagger: 0.06, clearProps: 'transform,opacity' }
    );
  }, [results, motionOk]);

  const title = useMemo(() => `Hasil untuk “${query}”`, [query]);
  const subtitle = useMemo(() => {
    if (!results.length) return 'Tidak ada hasil yang cocok. Coba kata lain atau ubah mode pencarian.';
    return `${results.length} lema ditemukan`;
  }, [results.length]);

  const jump = (delta) => {
    if (!shown.length) return;
    const next = Math.max(0, Math.min(shown.length - 1, activeIndex + delta));
    onActiveIndexChange(next);
    document.getElementById(`entry-${shown[next].id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (!hasActiveQuery) return null;

  const sectionClassName = inline
    ? 'w-full border-t border-ink/15 pt-5 sm:pt-8'
    : 'section border-b border-ink/15 px-pad-x py-pad-y';
  const outerClassName = inline ? 'w-full' : 'mx-auto max-w-wrap';
  const innerClassName = inline ? 'w-full' : 'mx-auto max-w-content';
  const headerClassName = inline
    ? 'mb-5 border border-ink/10 bg-nav-bg/90 px-3 py-3 backdrop-blur-md sm:mb-8 sm:px-4'
    : 'reveal sticky top-[74px] z-20 mb-8 border border-ink/10 bg-nav-bg/90 px-4 py-3 backdrop-blur-md';

  return (
    <section id="entri" ref={sectionRef} className={sectionClassName}>
      <div className={outerClassName}>
        <div className={innerClassName}>
          {results.length ? (
            <div ref={containerRef} className="results">
              {shown.map((entry, index) => (
                <EntryCard key={entry.id} entry={entry} query={query} active={index === activeIndex} />
              ))}
              {results.length > LIMIT && (
                <p className="mt-6 text-center text-[13px] text-ink/50">
                  Menampilkan {LIMIT} dari {results.length} hasil. Persempit pencarian untuk hasil lebih spesifik.
                </p>
              )}
            </div>
          ) : (
            <div className="reveal border border-dashed border-ink/15 px-6 py-8 text-center">
              <p className="text-[15px] text-ink/60">Coba kata lain.</p>
            </div>
          )}

          <div className={`${headerClassName} mt-8`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-[clamp(1.6rem,8vw,3rem)] font-light leading-[1.05] tracking-[-0.04em] text-ink">{title}</h2>
                <p className="mt-1 text-[15px] text-ink/60">{subtitle}</p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {['all', 'paser', 'indo'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onModeChange(item)}
                    className={`shrink-0 rounded-pill border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] transition-all sm:px-3.5 sm:text-[11px] ${
                      mode === item ? 'border-ink bg-ink text-reversed' : 'border-ink/15 bg-transparent text-ink/60 hover:border-ink/40 hover:text-ink'
                    }`}
                  >
                    {item === 'all' ? 'Semua' : item === 'paser' ? 'Paser' : 'Indo'}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => jump(-1)}
                  className="shrink-0 rounded-pill border border-ink/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-ink/60 transition-colors hover:border-ink/40 hover:text-ink sm:px-3.5 sm:text-[11px]"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => jump(1)}
                  className="shrink-0 rounded-pill border border-ink/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-ink/60 transition-colors hover:border-ink/40 hover:text-ink sm:px-3.5 sm:text-[11px]"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

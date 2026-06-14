import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import EntryCard from './EntryCard.jsx';

const SUGGESTIONS = ['rumah', 'baik', 'air', 'makan', 'pergi'];

export default function Results({ query, results, motionOk, mode, onModeChange, onPickSuggestion, activeIndex, onActiveIndexChange }) {
  const containerRef = useRef(null);
  const prevIdsRef = useRef('');
  const LIMIT = 80;
  const shown = results.slice(0, LIMIT);

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
      y: 14,
      duration: 0.55,
      ease: 'power2.out',
      stagger: 0.04,
      clearProps: 'transform,opacity',
    });
  }, [results, motionOk]);

  const title = useMemo(() => (!query ? 'Hasil pencarian.' : `Hasil untuk “${query}”`), [query]);
  const subtitle = useMemo(() => {
    if (!query) return 'Mulai ketik untuk melihat hasil kamus yang relevan.';
    if (!results.length) return 'Tidak ada hasil yang cocok. Coba kata lain atau ubah mode pencarian.';
    return `${results.length} lema ditemukan`;
  }, [query, results.length]);

  const jump = (delta) => {
    if (!shown.length) return;
    const next = Math.max(0, Math.min(shown.length - 1, activeIndex + delta));
    onActiveIndexChange(next);
    document.getElementById(`entry-${shown[next].id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="entri" className="section border-b border-ink/15 px-pad-x py-pad-y">
      <div className="mx-auto max-w-wrap">
        <div className="mx-auto max-w-content">
          <div className="reveal sticky top-[74px] z-20 mb-8 border border-ink/10 bg-nav-bg/90 px-4 py-3 backdrop-blur-md">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="label text-ink/50">02 / ENTRI</p>
                <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light tracking-[-0.04em] text-ink">{title}</h2>
                <p className="mt-1 text-[15px] text-ink/60">{subtitle}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {['all', 'paser', 'indo'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onModeChange(item)}
                    className={`rounded-pill border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.12em] transition-all ${
                      mode === item ? 'border-ink bg-ink text-reversed' : 'border-ink/15 bg-transparent text-ink/60 hover:border-ink/40 hover:text-ink'
                    }`}
                  >
                    {item === 'all' ? 'Semua' : item === 'paser' ? 'Paser' : 'Indo'}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => jump(-1)}
                  className="rounded-pill border border-ink/15 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.12em] text-ink/60 transition-colors hover:border-ink/40 hover:text-ink"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => jump(1)}
                  className="rounded-pill border border-ink/15 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.12em] text-ink/60 transition-colors hover:border-ink/40 hover:text-ink"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {results.length ? (
            <div ref={containerRef} className="results">
              {shown.map((entry, index) => (
                <EntryCard key={entry.id} entry={entry} query={query} motionOk={motionOk} active={index === activeIndex} />
              ))}
              {results.length > LIMIT && (
                <p className="mt-6 text-center text-[13px] text-ink/50">
                  Menampilkan {LIMIT} dari {results.length} hasil. Persempit pencarian untuk hasil lebih spesifik.
                </p>
              )}
            </div>
          ) : (
            <div className="reveal border border-dashed border-ink/15 px-6 py-8 text-center">
              <p className="text-[15px] text-ink/60">{query ? 'Coba kata lain.' : 'Masukkan kata Paser atau arti Indonesia.'}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((word) => (
                  <button
                    key={word}
                    type="button"
                    onClick={() => onPickSuggestion(word)}
                    className="rounded-pill border border-ink/15 px-3 py-1.5 text-[13px] text-ink/70 transition-colors hover:border-ink/40 hover:bg-ink/04"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

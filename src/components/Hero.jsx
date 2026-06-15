import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import SearchPanel from './SearchPanel.jsx';
import Results from './Results.jsx';

const STICKY_TOP = 73;

export default function Hero({ draftQuery, onDraftQueryChange, onSubmitSearch, mode, onModeChange, motionOk, query, hasActiveQuery, results, activeIndex, onActiveIndexChange }) {
  const heroRef = useRef(null);
  const stickyRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useGSAP(() => {
    if (!motionOk) return;

    const label = heroRef.current?.querySelector('[data-hero-label]');
    const lines = Array.from(heroRef.current?.querySelectorAll('[data-hero-line]') ?? []);
    const copy = heroRef.current?.querySelector('[data-hero-copy]');
    const panel = heroRef.current?.querySelector('[data-hero-panel]');

    if (!label || !lines.length || !copy || !panel) return;

    const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
    timeline
      .fromTo(label, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7 })
      .fromTo(lines, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, '-=0.35')
      .fromTo(copy, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.75 }, '-=0.45')
      .fromTo(panel, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.85 }, '-=0.35');
  }, { dependencies: [motionOk], scope: heroRef });

  useEffect(() => {
    if (!motionOk) return undefined;

    const updateSticky = () => {
      const node = stickyRef.current;
      if (!node) return;
      const nextSticky = node.getBoundingClientRect().top <= STICKY_TOP;
      setIsSticky((previous) => (previous === nextSticky ? previous : nextSticky));
    };

    updateSticky();
    window.addEventListener('scroll', updateSticky, { passive: true });
    window.addEventListener('resize', updateSticky);
    return () => {
      window.removeEventListener('scroll', updateSticky);
      window.removeEventListener('resize', updateSticky);
    };
  }, [motionOk]);

  useEffect(() => {
    if (!motionOk || !stickyRef.current) return;
    gsap.fromTo(
      stickyRef.current,
      { autoAlpha: 0, y: 16, rotateZ: -0.8 },
      { autoAlpha: 1, y: 0, rotateZ: 0, duration: 0.42, ease: 'power2.out', clearProps: 'transform,opacity' }
    );
  }, [isSticky, motionOk]);

  return (
    <section id="pencarian" ref={heroRef} className="section flex min-h-[calc(100svh-65px)] items-start border-b border-ink/15 px-pad-x py-8 sm:min-h-[calc(100vh-73px)] sm:items-center sm:py-12 lg:py-16">
      <div className="mx-auto flex w-full max-w-wrap flex-1 flex-col justify-center gap-7 sm:gap-12 lg:gap-16">
        <div className="grid gap-6 sm:gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,28rem)] lg:items-end lg:gap-20">
          <div className="max-w-[15ch] lg:self-end">
            <p data-hero-label className="label mb-3 text-ink/50 sm:mb-5">Kamus Bahasa</p>
            <h1 className="font-display text-[clamp(3.45rem,18vw,9.5rem)] uppercase leading-[0.88] tracking-[-0.075em] text-ink sm:text-[clamp(4.5rem,10vw,9.5rem)] sm:leading-[0.9]">
              <span data-hero-line className="block whitespace-nowrap">Paser ↔</span>
              <span data-hero-line className="block">Indonesia</span>
            </h1>
          </div>

          <div className="flex flex-col gap-5 pt-0 sm:gap-8 sm:pt-2 lg:self-end lg:pt-0">
            <p data-hero-copy className="max-w-[34ch] text-[15px] leading-[1.65] text-ink/70 sm:text-[clamp(1rem,1.45vw,1.22rem)] sm:leading-[1.7]">
              Cari lema Bahasa Paser atau padanan Bahasa Indonesia. Data berasal dari kamus cetak Komunitas Adat Paser, hasil OCR dan review bertahap.
            </p>
            <div data-hero-copy className="h-px w-full bg-ink/15" />
          </div>
        </div>

        <div ref={stickyRef} data-hero-panel className={`w-full ${isSticky ? 'sticky top-[65px] z-30 sm:top-[73px]' : ''}`}>
          <div className={`w-full border-y border-ink/15 bg-nav-bg/90 backdrop-blur-md ${isSticky ? 'shadow-none' : ''}`}>
            <div className="mx-auto w-full max-w-wrap px-0 py-2.5 sm:px-pad-x sm:py-3">
              <SearchPanel
                draftQuery={draftQuery}
                onDraftQueryChange={onDraftQueryChange}
                onSubmitSearch={onSubmitSearch}
                mode={mode}
                onModeChange={onModeChange}
                compact={isSticky}
              />
            </div>
          </div>
        </div>

        <Results
          query={query}
          hasActiveQuery={hasActiveQuery}
          results={results}
          motionOk={motionOk}
          mode={mode}
          onModeChange={onModeChange}
          activeIndex={activeIndex}
          onActiveIndexChange={onActiveIndexChange}
          inline
        />
      </div>
    </section>
  );
}

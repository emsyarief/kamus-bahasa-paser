import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Band from './components/Band.jsx';
import Footer from './components/Footer.jsx';
import { filterEntries, normalizeEntries } from './lib/dictionary.js';

const DATA_URL = '/data/entries.json';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState('');
  const [draftQuery, setDraftQuery] = useState('');
  const [mode, setMode] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);
  const motionOk = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return true;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    let alive = true;
    fetch(DATA_URL, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('format bukan array');
        if (!alive) return;
        setEntries(normalizeEntries(data));
      })
      .catch((err) => {
        if (!alive) return;
        console.error(`Data belum bisa dimuat: ${err.message}`);
      });
    return () => { alive = false; };
  }, []);

  const results = useMemo(() => filterEntries(entries, query, mode), [entries, query, mode]);
  const hasActiveQuery = useMemo(() => query.trim().length > 0, [query]);
  const submitSearch = () => {
    setQuery(draftQuery.trim());
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [results]);

  useGSAP(() => {
    if (!motionOk) return;
    const revealNodes = Array.from(rootRef.current?.querySelectorAll('.reveal') ?? []);
    if (!revealNodes.length) return;

    gsap.fromTo(
      revealNodes,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power2.out', stagger: 0.07, clearProps: 'all' }
    );
  }, { dependencies: [motionOk], scope: rootRef });

  return (
    <div ref={rootRef} className="min-h-screen bg-bg text-ink">
      <Header />
      <main>
        <Hero
          draftQuery={draftQuery}
          onDraftQueryChange={setDraftQuery}
          onSubmitSearch={submitSearch}
          mode={mode}
          onModeChange={setMode}
          motionOk={motionOk}
          query={query}
          hasActiveQuery={hasActiveQuery}
          results={results}
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
        />
        <Band />
      </main>
      <Footer />
    </div>
  );
}

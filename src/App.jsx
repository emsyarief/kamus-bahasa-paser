import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import SearchPanel from './components/SearchPanel.jsx';
import Results from './components/Results.jsx';
import Band from './components/Band.jsx';
import Footer from './components/Footer.jsx';
import { filterEntries, normalizeEntries } from './lib/dictionary.js';

const DATA_URL = '/data/entries.json';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Mulai ketik untuk melihat hasil kamus yang relevan.');
  const [error, setError] = useState('');
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
        setError(`Data belum bisa dimuat: ${err.message}`);
        setStatus('');
      });
    return () => { alive = false; };
  }, []);

  const results = useMemo(() => filterEntries(entries, query), [entries, query]);
  const entryCount = useMemo(() => (query ? `${results.length} hasil` : `${entries.length} lema`), [entries.length, query, results.length]);

  useEffect(() => {
    if (!query) {
      setStatus('Mulai ketik untuk melihat hasil kamus yang relevan.');
      return;
    }
    if (!results.length) {
      setStatus('Tidak ada hasil. Coba kata Paser/Indonesia lain.');
      return;
    }
    setStatus(`Hasil untuk “${query}”`);
  }, [query, results.length]);

  useGSAP(() => {
    if (!motionOk) return;
    gsap.fromTo(
      rootRef.current?.querySelectorAll('.reveal'),
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.08, clearProps: 'all' }
    );
  }, { dependencies: [motionOk], scope: rootRef });

  return (
    <div ref={rootRef} className="min-h-screen bg-bg text-ink">
      <Header />
      <main>
        <Hero />
        <SearchPanel
          query={query}
          onQueryChange={setQuery}
          onClear={() => setQuery('')}
          count={entryCount}
          status={error || status}
        />
        <Results query={query} results={results} motionOk={motionOk} />
        <Band />
      </main>
      <Footer />
    </div>
  );
}

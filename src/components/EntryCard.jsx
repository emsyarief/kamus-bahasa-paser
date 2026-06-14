import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

function renderExample(item) {
  if (typeof item === 'string') {
    const [a, b = ''] = item.split(' — ');
    return a ? <ExampleText paser={a} indonesia={b} /> : null;
  }
  if (!item) return null;
  return <ExampleText paser={item.text} indonesia={item.translation_id || item.translation} />;
}

function ExampleText({ paser, indonesia }) {
  if (!paser) return null;
  return (
    <span className="example-pair">
      <em>{paser.trim()}</em>
      {indonesia && <> — {indonesia.trim()}</>}
    </span>
  );
}

function Examples({ list }) {
  if (!list?.length) return null;
  return (
    <p>
      {list.map((ex, i) => (
        <span key={i}>
          {i > 0 && ' | '}
          {renderExample(ex)}
        </span>
      ))}
    </p>
  );
}

function VariantDetail({ variant }) {
  return (
    <div className="grid gap-2 px-3.5 pb-3.5 text-[15px] leading-[1.55] text-ink/70">
      {variant.partOfSpeech && <p>Kelas kata: {variant.partOfSpeech}</p>}
      {variant.translations.length > 0 && <p>Indonesia: {variant.translations.join('; ')}</p>}
      {variant.examples.length > 0 && <p>Contoh: <Examples list={variant.examples} /></p>}
    </div>
  );
}

function VariantItem({ variant }) {
  const itemRef = useRef(null);
  const detailRef = useRef(null);

  useGSAP(() => {
    const item = itemRef.current;
    const detail = detailRef.current;
    if (!item || !detail) return;
    const onToggle = (e) => {
      if (!(item instanceof HTMLDetailsElement)) return;
      if (item.open) {
        e.preventDefault();
        gsap.killTweensOf(detail);
        gsap.to(detail, {
          autoAlpha: 0,
          height: 0,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            item.open = false;
            gsap.set(detail, { clearProps: 'height,opacity,visibility' });
          },
        });
      } else {
        gsap.killTweensOf(detail);
        gsap.fromTo(
          detail,
          { autoAlpha: 0, height: 0 },
          { autoAlpha: 1, height: 'auto', duration: 0.35, ease: 'power2.out', clearProps: 'height' }
        );
      }
    };
    item.addEventListener('toggle', onToggle, true);
    return () => item.removeEventListener('toggle', onToggle, true);
  }, []);

  return (
    <details ref={itemRef} className="variant-item border border-ink/10">
      <summary className="variant-summary flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3 text-sm font-medium tracking-[0.02em] text-ink transition-colors hover:bg-ink/04">
        <span>{variant.label}</span>
        <span className="summary-marker text-[18px] font-light text-ink/50">+</span>
      </summary>
      <div ref={detailRef} className="variant-detail">
        <VariantDetail variant={variant} />
      </div>
    </details>
  );
}

export default function EntryCard({ entry, motionOk }) {
  const subline = [entry.language, entry.partOfSpeech].filter(Boolean).join(' · ');
  const hasVariants = entry.subentries.length > 0 || entry.variants.length > 0;
  const variants = [...entry.subentries, ...entry.variants];

  return (
    <article data-id={entry.id} className="card border-b border-l border-r border-ink/10 px-7 py-7">
      <div className="card-head flex items-start justify-between gap-4">
        <div>
          <h2 className="headword font-display text-[clamp(1.8rem,4vw,2.4rem)] font-light leading-[1.1] tracking-[-0.03em] text-ink">
            {entry.headword}
            {entry.homonymNumber ? <sup className="homonym-number ml-1 text-[0.55em] text-ink/50">{entry.homonymNumber}</sup> : null}
          </h2>
          {subline && <p className="subline mt-1.5 text-label text-ink/60">{subline}</p>}
        </div>
        <span className="chip whitespace-nowrap rounded-pill border border-ink/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/60">
          lema
        </span>
      </div>

      <dl className="fields grid gap-3.5">
        {entry.translations.length > 0 && (
          <div className="field grid grid-cols-1 gap-1.5 border-t border-ink/10 pt-3.5 sm:grid-cols-[140px_1fr] sm:gap-4">
            <dt className="text-label text-ink/60">Indonesia</dt>
            <dd className="text-base leading-[1.6] text-ink/70">{entry.translations.join('; ')}</dd>
          </div>
        )}
        {entry.examples.length > 0 && (
          <div className="field grid grid-cols-1 gap-1.5 border-t border-ink/10 pt-3.5 sm:grid-cols-[140px_1fr] sm:gap-4">
            <dt className="text-label text-ink/60">Contoh</dt>
            <dd className="text-base leading-[1.6] text-ink/70">
              <Examples list={entry.examples} />
            </dd>
          </div>
        )}
        {hasVariants && (
          <div className="field grid grid-cols-1 gap-1.5 border-t border-ink/10 pt-3.5 sm:grid-cols-[140px_1fr] sm:gap-4">
            <dt className="text-label text-ink/60">Sublema / Varian</dt>
            <dd className="text-base leading-[1.6] text-ink/70">
              <div className="variant-list grid gap-2">
                {variants.map((v, i) => (
                  <VariantItem key={`${v.label}-${i}`} variant={v} />
                ))}
              </div>
            </dd>
          </div>
        )}
      </dl>
    </article>
  );
}

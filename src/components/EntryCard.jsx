import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { highlightSegments } from '../lib/dictionary.js';

function RichText({ text, query, as: Tag = 'span', className = '' }) {
  const segments = highlightSegments(text, query);
  return (
    <Tag className={className}>
      {segments.map((segment, i) =>
        segment.hit ? (
          <mark key={i} className="rounded-none bg-ink px-1 text-reversed">
            {segment.text}
          </mark>
        ) : (
          <span key={i}>{segment.text}</span>
        )
      )}
    </Tag>
  );
}

function renderExample(item, query) {
  if (typeof item === 'string') {
    const [a, b = ''] = item.split(' — ');
    return a ? <ExampleText paser={a} indonesia={b} query={query} /> : null;
  }
  if (!item) return null;
  return <ExampleText paser={item.text} indonesia={item.translation_id || item.translation} query={query} />;
}

function ExampleText({ paser, indonesia, query }) {
  if (!paser) return null;
  return (
    <span className="example-pair">
      <RichText as="em" text={paser.trim()} query={query} />
      {indonesia && <> — <RichText text={indonesia.trim()} query={query} /></>}
    </span>
  );
}

function Examples({ list, query }) {
  if (!list?.length) return null;
  return (
    <p className="space-y-1">
      {list.map((ex, i) => (
        <span key={i} className="block">
          {renderExample(ex, query)}
          {i < list.length - 1 && <span className="mt-1 block h-px w-full bg-ink/08" />}
        </span>
      ))}
    </p>
  );
}

function VariantDetail({ variant, query }) {
  return (
    <div className="grid gap-2 px-3.5 pb-3.5 text-[15px] leading-[1.6] text-ink/70">
      {variant.partOfSpeech && <p>Kelas kata: <RichText text={variant.partOfSpeech} query={query} /></p>}
      {variant.translations.length > 0 && <p>Indonesia: <RichText text={variant.translations.join('; ')} query={query} /></p>}
      {variant.examples.length > 0 && <p>Contoh: <Examples list={variant.examples} query={query} /></p>}
    </div>
  );
}

function VariantItem({ variant, query }) {
  const itemRef = useRef(null);
  const detailRef = useRef(null);
  const summaryRef = useRef(null);

  useGSAP(() => {
    const item = itemRef.current;
    const detail = detailRef.current;
    const summary = summaryRef.current;
    if (!item || !detail || !summary) return;

    const onSummaryClick = (e) => {
      e.preventDefault();
      gsap.killTweensOf(detail);
      const willOpen = !item.open;
      if (willOpen) {
        item.open = true;
        gsap.fromTo(
          detail,
          { autoAlpha: 0, height: 0 },
          { autoAlpha: 1, height: 'auto', duration: 0.32, ease: 'power2.out', clearProps: 'height' }
        );
      } else {
        gsap.to(detail, {
          autoAlpha: 0,
          height: 0,
          duration: 0.22,
          ease: 'power2.in',
          onComplete: () => {
            item.open = false;
            gsap.set(detail, { clearProps: 'height,opacity,visibility' });
          },
        });
      }
    };
    summary.addEventListener('click', onSummaryClick);
    return () => summary.removeEventListener('click', onSummaryClick);
  }, []);

  return (
    <details ref={itemRef} className="variant-item border border-ink/10">
      <summary
        ref={summaryRef}
        className="variant-summary flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3 text-sm font-medium tracking-[0.02em] text-ink transition-colors hover:bg-ink/04"
      >
        <span><RichText text={variant.label} query={query} /></span>
        <span className="summary-marker text-[18px] font-light text-ink/50">+</span>
      </summary>
      <div ref={detailRef} className="variant-detail">
        <VariantDetail variant={variant} query={query} />
      </div>
    </details>
  );
}

export default function EntryCard({ entry, query, motionOk, active = false }) {
  const subline = [entry.language, entry.partOfSpeech].filter(Boolean).join(' · ');
  const hasVariants = entry.subentries.length > 0 || entry.variants.length > 0;
  const variants = [...entry.subentries, ...entry.variants];

  return (
    <article
      id={`entry-${entry.id}`}
      data-id={entry.id}
      className={`card scroll-mt-32 border border-ink/10 px-6 py-6 sm:px-7 sm:py-7 transition-shadow ${
        active ? 'shadow-[inset_0_0_0_2px_#1A1A1A]' : ''
      }`}
    >
      <div className="card-head flex items-start justify-between gap-4">
        <div>
          <h2 className="headword font-display text-[clamp(1.8rem,4vw,2.4rem)] font-light leading-[1.05] tracking-[-0.03em] text-ink">
            <RichText text={entry.headword} query={query} />
            {entry.homonymNumber ? <sup className="homonym-number ml-1 text-[0.55em] text-ink/50">{entry.homonymNumber}</sup> : null}
          </h2>
          {subline && <p className="subline mt-1.5 text-label text-ink/60">{subline}</p>}
        </div>
        <span className="chip whitespace-nowrap rounded-pill border border-ink/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/60">
          lema
        </span>
      </div>

      <dl className="fields mt-4 grid gap-3.5">
        {entry.translations.length > 0 && (
          <div className="field grid grid-cols-1 gap-1.5 border-t border-ink/10 pt-3.5 sm:grid-cols-[140px_1fr] sm:gap-4">
            <dt className="text-label text-ink/60">Indonesia</dt>
            <dd className="text-base leading-[1.65] text-ink/70">
              <RichText text={entry.translations.join('; ')} query={query} />
            </dd>
          </div>
        )}
        {entry.examples.length > 0 && (
          <div className="field grid grid-cols-1 gap-1.5 border-t border-ink/10 pt-3.5 sm:grid-cols-[140px_1fr] sm:gap-4">
            <dt className="text-label text-ink/60">Contoh</dt>
            <dd className="text-base leading-[1.65] text-ink/70">
              <Examples list={entry.examples} query={query} />
            </dd>
          </div>
        )}
        {hasVariants && (
          <div className="field grid grid-cols-1 gap-1.5 border-t border-ink/10 pt-3.5 sm:grid-cols-[140px_1fr] sm:gap-4">
            <dt className="text-label text-ink/60">Sublema / Varian</dt>
            <dd className="text-base leading-[1.65] text-ink/70">
              <div className="variant-list grid gap-2">
                {variants.map((v, i) => (
                  <VariantItem key={`${v.label}-${i}`} variant={v} query={query} />
                ))}
              </div>
            </dd>
          </div>
        )}
      </dl>
    </article>
  );
}

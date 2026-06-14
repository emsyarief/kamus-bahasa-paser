export default function Band() {
  const items = ['3.759 entri', 'Bahasa Paser', '↔ Indonesia', 'Sumber terbuka', 'OCR bertahap', 'Kontribusi komunitas'];
  return (
    <section id="statistik" className="overflow-hidden bg-dark-bg py-12 text-reversed">
      <p className="label mb-5 px-pad-x text-reversed/60">04 / STATISTIK</p>
      <div className="marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
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

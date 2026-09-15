import { MARQUEE_ITEMS } from '../data/content';

// Infinite typographic ribbon — alternates solid / outlined phrases.
export default function Marquee({ items = MARQUEE_ITEMS }) {
  const row = [...items, ...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} style={{ display: 'flex' }}>
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="marquee-item">
                <span className={i % 2 === 0 ? '' : 'outline-text'}>{item}</span>
                <span className="marquee-star">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

import Reveal from './Reveal';

// Consistent cinematic section intro: index label, monumental title, optional aside.
export default function SectionHeader({ index, label, title, aside, align = 'left' }) {
  const centered = align === 'center';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1.6rem, 3vw, 2.6rem)',
        marginBottom: 'clamp(3rem, 6vw, 5.5rem)',
        textAlign: centered ? 'center' : 'left',
        alignItems: centered ? 'center' : 'flex-start',
      }}
    >
      <Reveal>
        <span className="label" style={centered ? { justifyContent: 'center' } : {}}>
          {index} / {label}
        </span>
      </Reveal>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: centered ? 'center' : 'space-between',
          gap: '2rem',
          width: '100%',
        }}
      >
        <Reveal delay={0.08}>
          <h2 className="display" style={{ fontSize: 'clamp(2.4rem, 6.4vw, 5.6rem)' }}>{title}</h2>
        </Reveal>
        {aside && (
          <Reveal delay={0.16}>
            <p style={{ maxWidth: '34ch', color: 'var(--muted)', fontSize: 'clamp(0.95rem, 1.2vw, 1.08rem)' }}>
              {aside}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

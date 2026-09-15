import { motion } from 'framer-motion';
import { Radar } from 'lucide-react';

// ============================================================
// COMING SOON — the project's standard "not yet released" module.
// Used everywhere official information is pending so the absence
// of data still reads as premium and intentional.
// ============================================================
export default function ComingSoon({
  title = 'COMING SOON',
  note,
  label,
  icon: Icon = Radar,
  size = 'md',
  accent = 'cyan',
}) {
  const scale = {
    sm: { pad: '2rem 1.6rem', title: 'clamp(1.1rem, 2.4vw, 1.6rem)', ring: 120 },
    md: { pad: 'clamp(2.6rem, 5vw, 4.2rem) clamp(1.6rem, 3vw, 3rem)', title: 'clamp(1.5rem, 4vw, 2.8rem)', ring: 190 },
    lg: { pad: 'clamp(3.4rem, 7vw, 6rem) clamp(1.6rem, 3vw, 3rem)', title: 'clamp(2rem, 6vw, 4.4rem)', ring: 260 },
  }[size];

  const accentColor = {
    cyan: 'rgba(34,211,238,',
    violet: 'rgba(139,92,246,',
    magenta: 'rgba(232,121,249,',
    amber: 'rgba(251,191,36,',
  }[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="glass"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: scale.pad,
        textAlign: 'center',
        display: 'grid',
        placeItems: 'center',
        gap: '1rem',
      }}
    >
      {/* radar sweep rings */}
      {[0, 1, 2].map((r) => (
        <span
          key={r}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -scale.ring / 2,
            marginLeft: -scale.ring / 2,
            width: scale.ring,
            height: scale.ring,
            borderRadius: '50%',
            border: `1px solid ${accentColor}0.22)`,
            animation: `pulse-ring 3.4s ease-out infinite ${r * 1.1}s`,
            pointerEvents: 'none',
          }}
        />
      ))}
      {/* grid floor */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black, transparent 72%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, display: 'grid', placeItems: 'center', gap: '1.1rem' }}>
        {label && (
          <span className="mono" style={{ fontSize: '0.62rem', letterSpacing: '0.34em', color: 'var(--faint)', textTransform: 'uppercase' }}>
            {label}
          </span>
        )}

        <span
          style={{
            width: 62,
            height: 62,
            borderRadius: 18,
            border: '1px solid var(--line-strong)',
            display: 'grid',
            placeItems: 'center',
            background: `${accentColor}0.06)`,
            color: `${accentColor}1)`,
          }}
        >
          <Icon size={24} strokeWidth={1.4} />
        </span>

        <p className="display grad-text" style={{ fontSize: scale.title, lineHeight: 1.1 }}>
          {title}
        </p>

        {note && (
          <p style={{ color: 'var(--muted)', maxWidth: '46ch', lineHeight: 1.75, fontSize: 'clamp(0.88rem, 1.1vw, 1rem)' }}>
            {note}
          </p>
        )}

        <span className="chip" style={{ marginTop: '0.4rem' }}>
          <span className="dot" />
          ANNOUNCEMENT PENDING
        </span>
      </div>
    </motion.div>
  );
}

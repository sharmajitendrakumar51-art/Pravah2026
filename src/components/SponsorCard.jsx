import { motion } from 'framer-motion';
import { ExternalLink, Handshake } from 'lucide-react';

// ============================================================
// SPONSOR CARD — reusable partner card.
// Supports logo, name, tier, website and description; renders only
// the fields that exist. The slot variant communicates an open
// partnership position without naming an unconfirmed sponsor.
// ============================================================

const EASE = [0.22, 1, 0.36, 1];

const ACCENTS = {
  cyan: '#22d3ee',
  violet: '#a78bfa',
  magenta: '#e879f9',
  amber: '#fbbf24',
};

export default function SponsorCard({ sponsor, scale = 1, accent = 'cyan' }) {
  const color = ACCENTS[accent] ?? ACCENTS.cyan;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.85, ease: EASE }}
      whileHover={{ y: -6 }}
      data-cursor
      className="glass"
      style={{
        padding: `clamp(1.2rem, ${2.4 * scale}vw, ${2.4 * scale}rem)`,
        display: 'grid',
        gap: '1rem',
        placeItems: 'center',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 14,
          background: '#f4f6ff',
          display: 'grid',
          placeItems: 'center',
          padding: '1rem',
          overflow: 'hidden',
        }}
      >
        {sponsor.logo ? (
          <img src={sponsor.logo} alt={sponsor.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        ) : (
          <span className="display" style={{ color: '#0b0e1a', fontSize: `clamp(0.9rem, ${1.6 * scale}vw, ${1.4 * scale}rem)` }}>
            {sponsor.name}
          </span>
        )}
      </div>

      <p className="display" style={{ fontSize: `clamp(0.95rem, ${1.5 * scale}vw, ${1.3 * scale}rem)` }}>{sponsor.name}</p>

      {sponsor.description && (
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '34ch' }}>{sponsor.description}</p>
      )}

      {sponsor.website && (
        <a
          href={sponsor.website}
          target="_blank"
          rel="noreferrer"
          className="mono"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            color,
            textTransform: 'uppercase',
          }}
        >
          VISIT SITE
          <ExternalLink size={12} />
        </a>
      )}
    </motion.article>
  );
}

// ---------------------------------------------- OPEN SLOT
export function SponsorSlot({ i = 0, scale = 1, accent = 'cyan', label = 'PARTNER SLOT OPEN' }) {
  const color = ACCENTS[accent] ?? ACCENTS.cyan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: Math.min(i * 0.06, 0.34), duration: 0.8, ease: EASE }}
      whileHover={{ y: -5, borderColor: color }}
      data-cursor
      style={{
        position: 'relative',
        borderRadius: 20,
        border: '1px dashed var(--line-strong)',
        background: 'linear-gradient(165deg, rgba(17,21,38,0.5), rgba(8,10,18,0.85))',
        padding: `clamp(1.2rem, ${2.2 * scale}vw, ${2.2 * scale}rem)`,
        display: 'grid',
        placeItems: 'center',
        gap: '0.9rem',
        minHeight: `clamp(140px, ${13 * scale}vw, ${190 * scale}px)`,
        overflow: 'hidden',
        transition: 'border-color 0.45s',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.045) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 76%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black, transparent 76%)',
        }}
      />
      <span
        style={{
          width: 44,
          height: 44,
          borderRadius: 13,
          border: '1px solid var(--line-strong)',
          display: 'grid',
          placeItems: 'center',
          color,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Handshake size={18} strokeWidth={1.4} />
      </span>
      <span className="mono" style={{ fontSize: '0.56rem', letterSpacing: '0.26em', color: 'var(--muted)', textTransform: 'uppercase', position: 'relative', zIndex: 2 }}>
        {label}
      </span>
      <span className="mono" style={{ fontSize: '0.52rem', letterSpacing: '0.22em', color: 'var(--faint)', position: 'relative', zIndex: 2 }}>
        {String(i + 1).padStart(2, '0')}
      </span>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import {
  AppWindow,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Gamepad2,
  Lightbulb,
  Rocket,
  ShieldHalf,
  Terminal,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ============================================================
// EVENT CARD — reusable arena card used on /events and in
// related-event rails. Renders only data that exists; pending
// details surface as a status chip rather than invented values.
// ============================================================

export const EVENT_ICONS = {
  terminal: Terminal,
  brain: BrainCircuit,
  shield: ShieldHalf,
  rocket: Rocket,
  app: AppWindow,
  bot: Bot,
  gamepad: Gamepad2,
  lightbulb: Lightbulb,
};

export const EVENT_HUES = {
  cyan: { text: '#22d3ee', soft: 'rgba(34,211,238,', label: 'CYAN' },
  violet: { text: '#a78bfa', soft: 'rgba(139,92,246,', label: 'VIOLET' },
  magenta: { text: '#e879f9', soft: 'rgba(232,121,249,', label: 'MAGENTA' },
  amber: { text: '#fbbf24', soft: 'rgba(251,191,36,', label: 'AMBER' },
};

export default function EventCard({ event, i = 0 }) {
  const Icon = EVENT_ICONS[event.icon];
  const hue = EVENT_HUES[event.hue] ?? EVENT_HUES.cyan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ delay: Math.min(i * 0.06, 0.4), duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <Link
        to={`/events/${event.slug}`}
        data-cursor
        className="event-card"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          height: '100%',
          padding: 'clamp(1.5rem, 2.6vw, 2.2rem)',
          borderRadius: 22,
          border: '1px solid var(--line)',
          background: 'linear-gradient(165deg, rgba(17,21,38,0.72), rgba(8,10,18,0.88))',
          backdropFilter: 'blur(12px)',
          overflow: 'hidden',
          transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1), border-color 0.5s, box-shadow 0.5s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.borderColor = hue.text;
          e.currentTarget.style.boxShadow = `0 24px 60px -30px ${hue.soft}0.55)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = 'var(--line)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* hue wash */}
        <span
          aria-hidden="true"
          className="card-wash"
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(120% 100% at 100% 0%, ${hue.soft}0.14), transparent 62%)`,
            pointerEvents: 'none',
          }}
        />
        {/* oversized index */}
        <span
          aria-hidden="true"
          className="display card-index"
          style={{
            position: 'absolute',
            top: '-1.2rem',
            right: '0.4rem',
            fontSize: 'clamp(4rem, 7vw, 6.4rem)',
            color: 'transparent',
            WebkitTextStroke: `1px ${hue.soft}0.2)`,
            pointerEvents: 'none',
            transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.5s',
            lineHeight: 1,
          }}
        >
          {event.index}
        </span>

        {/* icon + status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', position: 'relative', zIndex: 2 }}>
          <span
            className="card-icon"
            style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              border: '1px solid var(--line-strong)',
              display: 'grid',
              placeItems: 'center',
              color: hue.text,
              background: `${hue.soft}0.07)`,
              transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s',
            }}
          >
            <Icon size={22} strokeWidth={1.6} />
          </span>
          <span className="mono" style={{ fontSize: '0.56rem', letterSpacing: '0.22em', color: 'var(--faint)', textAlign: 'right' }}>
            {event.index} / 08
          </span>
        </div>

        {/* title + blurb */}
        <div style={{ position: 'relative', zIndex: 2, flex: 1 }}>
          <p
            className="display card-title"
            style={{
              fontSize: 'clamp(1.1rem, 1.9vw, 1.55rem)',
              lineHeight: 1.22,
              transition: 'color 0.4s',
            }}
          >
            {event.title}
          </p>
          <p style={{ color: 'var(--muted)', marginTop: '0.7rem', lineHeight: 1.7, fontSize: '0.92rem' }}>
            {event.blurb}
          </p>
        </div>

        {/* tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', position: 'relative', zIndex: 2 }}>
          {event.tags.map((tag) => (
            <span key={tag} className="chip" style={{ fontSize: '0.54rem', padding: '0.26rem 0.66rem' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '1.1rem',
            borderTop: '1px solid var(--line)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <span className="mono" style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--faint)', textTransform: 'uppercase' }}>
            DETAILS COMING SOON
          </span>
          <span
            className="card-arrow"
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              border: '1px solid var(--line-strong)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--muted)',
              flexShrink: 0,
              transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>

      <style>{`
        .event-card:hover .card-index { transform: translate(-6px, 6px); opacity: 0.65; }
        .event-card:hover .card-icon { transform: rotate(-8deg) scale(1.07); box-shadow: 0 0 26px ${hue.soft}0.35); }
        .event-card:hover .card-title { color: ${hue.text}; }
        .event-card:hover .card-arrow {
          background: var(--ink);
          color: #05060a;
          border-color: var(--ink);
          transform: rotate(45deg);
        }
      `}</style>
    </motion.div>
  );
}

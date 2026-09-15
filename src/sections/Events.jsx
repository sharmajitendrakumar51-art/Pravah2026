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
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { EVENT_CATEGORIES } from '../data/content';

const ICONS = {
  terminal: Terminal,
  brain: BrainCircuit,
  shield: ShieldHalf,
  rocket: Rocket,
  app: AppWindow,
  bot: Bot,
  gamepad: Gamepad2,
  lightbulb: Lightbulb,
};

const HUES = {
  cyan: { text: '#22d3ee', glow: 'rgba(34,211,238,0.14)' },
  violet: { text: '#a78bfa', glow: 'rgba(139,92,246,0.16)' },
  magenta: { text: '#e879f9', glow: 'rgba(232,121,249,0.13)' },
  amber: { text: '#fbbf24', glow: 'rgba(251,191,36,0.12)' },
};

function EventRow({ event, i }) {
  const Icon = ICONS[event.icon];
  const hue = HUES[event.hue];

  return (
    <motion.a
      href="#events"
      onClick={(e) => e.preventDefault()}
      data-cursor
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: (i % 4) * 0.06, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="event-row"
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'auto auto 1fr auto',
        alignItems: 'center',
        gap: 'clamp(1rem, 3vw, 2.6rem)',
        padding: 'clamp(1.5rem, 3.2vw, 2.6rem) clamp(0.4rem, 1.5vw, 1.4rem)',
        borderTop: '1px solid var(--line)',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      {/* Hover energy sweep */}
      <span
        className="event-sweep"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(100deg, ${hue.glow}, transparent 65%)`,
          opacity: 0,
          transition: 'opacity 0.55s cubic-bezier(0.22,1,0.36,1)',
          pointerEvents: 'none',
        }}
      />
      {/* Hue bottom line */}
      <span
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 1,
          background: hue.text,
          transform: 'scaleX(0)',
          transformOrigin: '0 50%',
          transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
        }}
        className="event-line"
      />

      <span className="mono" style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--faint)', transition: 'color 0.4s' }}>
        /{event.index}
      </span>

      <span
        className="event-icon"
        style={{
          width: 54,
          height: 54,
          borderRadius: 16,
          border: '1px solid var(--line-strong)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--muted)',
          transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
          background: 'rgba(10,13,24,0.4)',
        }}
      >
        <Icon size={22} strokeWidth={1.6} />
      </span>

      <span style={{ minWidth: 0 }}>
        <span
          className="display event-title"
          style={{
            display: 'block',
            fontSize: 'clamp(1.15rem, 3vw, 2.5rem)',
            letterSpacing: '-0.01em',
            transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1), color 0.4s',
          }}
        >
          {event.title}
        </span>
        <span
          className="event-blurb"
          style={{
            display: 'block',
            color: 'var(--muted)',
            fontSize: 'clamp(0.86rem, 1.1vw, 1rem)',
            maxWidth: '58ch',
            marginTop: '0.35rem',
            opacity: 0.55,
            transition: 'opacity 0.5s',
          }}
        >
          {event.blurb}
        </span>
        <span className="event-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.8rem' }}>
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="chip"
              style={{ fontSize: '0.56rem', padding: '0.28rem 0.7rem' }}
            >
              {tag}
            </span>
          ))}
        </span>
      </span>

      <span
        className="event-arrow"
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: '1px solid var(--line-strong)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--muted)',
          transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
          flexShrink: 0,
        }}
      >
        <ArrowUpRight size={18} />
      </span>

      {/* hover interactions (injected per-row via CSS for reliability) */}
      <style>{`
        .event-row:hover .event-sweep { opacity: 1 !important; }
        .event-row:hover .event-line { transform: scaleX(1) !important; }
        .event-row:hover .event-title { transform: translateX(14px); color: ${hue.text}; }
        .event-row:hover .event-blurb { opacity: 1 !important; }
        .event-row:hover .event-icon {
          color: ${hue.text};
          border-color: ${hue.text};
          box-shadow: 0 0 28px ${hue.glow};
          transform: rotate(-8deg) scale(1.06);
        }
        .event-row:hover .event-arrow {
          background: var(--ink);
          color: #05060a;
          border-color: var(--ink);
          transform: rotate(45deg);
        }
        .event-row:hover > .mono { color: ${hue.text} !important; }
        @media (max-width: 640px) {
          .event-row { grid-template-columns: auto 1fr auto !important; }
          .event-icon { display: none !important; }
        }
      `}</style>
    </motion.a>
  );
}

export default function Events() {
  return (
    <section id="events" className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        className="aurora"
        style={{ transform: 'rotate(180deg)' }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeader
          index="02"
          label="EVENT CATEGORIES"
          title={
            <>
              EIGHT <span className="grad-text">ARENAS</span>
            </>
          }
          aside="Eight battlegrounds of engineering. Pick your current — detailed challenges, rules and registrations unlock soon."
        />

        <div style={{ borderBottom: '1px solid var(--line)' }}>
          {EVENT_CATEGORIES.map((event, i) => (
            <EventRow key={event.id} event={event} i={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.4rem',
              marginTop: 'clamp(2.4rem, 4vw, 3.6rem)',
            }}
          >
            <p className="mono" style={{ fontSize: '0.72rem', letterSpacing: '0.26em', color: 'var(--muted)', textTransform: 'uppercase' }}>
              FULL EVENT CATALOG — COMING SOON
            </p>
            <span className="chip magenta">
              <span className="dot" />
              08 ARENAS // 06 DAYS
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

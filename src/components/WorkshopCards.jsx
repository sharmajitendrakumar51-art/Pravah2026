import { motion } from 'framer-motion';
import { CalendarClock, MapPin, Mic2, Presentation, Ticket, User } from 'lucide-react';

// ============================================================
// WORKSHOP CARDS — reusable session + speaker components.
// Both render only the fields present on the record, so future
// official data can be dropped in with no layout changes.
// A placeholder variant keeps the grid composed until then.
// ============================================================

const EASE = [0.22, 1, 0.36, 1];

// ---------------------------------------------- SESSION
export function SessionCard({ session, i = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: Math.min(i * 0.08, 0.4), duration: 0.85, ease: EASE }}
      whileHover={{ y: -6 }}
      className="glass"
      data-cursor
      style={{ padding: 'clamp(1.5rem, 2.6vw, 2.2rem)', position: 'relative', overflow: 'hidden' }}
    >
      <span aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--grad)', opacity: 0.7 }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <span
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            border: '1px solid var(--line-strong)',
            display: 'grid',
            placeItems: 'center',
            color: 'var(--cyan)',
            background: 'rgba(34,211,238,0.06)',
          }}
        >
          <Presentation size={20} strokeWidth={1.5} />
        </span>
        {session.track && (
          <span className="chip" style={{ fontSize: '0.54rem' }}>
            {session.track}
          </span>
        )}
      </div>

      <h3 className="display" style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.35rem)', marginTop: '1.3rem', lineHeight: 1.3 }}>
        {session.title}
      </h3>

      {session.speaker && (
        <p className="mono" style={{ fontSize: '0.64rem', letterSpacing: '0.18em', color: 'var(--cyan)', marginTop: '0.7rem' }}>
          {session.speaker}
          {session.org ? ` — ${session.org}` : ''}
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.3rem' }}>
        {[
          session.day && { Icon: CalendarClock, text: `${session.day}${session.time ? ` · ${session.time}` : ''}` },
          session.venue && { Icon: MapPin, text: session.venue },
          session.seats && { Icon: Ticket, text: `${session.seats} SEATS` },
        ]
          .filter(Boolean)
          .map(({ Icon, text }) => (
            <span
              key={text}
              className="mono"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.6rem', letterSpacing: '0.18em', color: 'var(--faint)' }}
            >
              <Icon size={12} /> {text}
            </span>
          ))}
      </div>
    </motion.article>
  );
}

// ---------------------------------------------- SPEAKER
export function SpeakerCard({ speaker, i = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: Math.min(i * 0.07, 0.4), duration: 0.85, ease: EASE }}
      whileHover={{ y: -6 }}
      data-cursor
      style={{
        borderRadius: 20,
        border: '1px solid var(--line)',
        background: 'linear-gradient(170deg, rgba(17,21,38,0.7), rgba(8,10,18,0.9))',
        overflow: 'hidden',
      }}
    >
      <div style={{ aspectRatio: '4 / 5', position: 'relative', background: 'rgba(8,10,18,0.6)' }}>
        {speaker.photo ? (
          <img src={speaker.photo} alt={speaker.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'var(--faint)' }}>
            <Mic2 size={34} strokeWidth={1.1} />
          </span>
        )}
      </div>
      <div style={{ padding: '1.2rem 1.3rem 1.5rem' }}>
        <p className="display" style={{ fontSize: '1.05rem' }}>{speaker.name}</p>
        {speaker.title && (
          <p className="mono" style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--cyan)', marginTop: '0.5rem' }}>
            {speaker.title}
          </p>
        )}
        {speaker.org && (
          <p style={{ color: 'var(--muted)', fontSize: '0.86rem', marginTop: '0.5rem' }}>{speaker.org}</p>
        )}
      </div>
    </motion.article>
  );
}

// ---------------------------------------------- PLACEHOLDER
// Keeps the grid rhythm intact without inventing a person.
export function PlaceholderPersonCard({ i = 0, label = 'TO BE ANNOUNCED', icon: Icon = User }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: Math.min(i * 0.06, 0.35), duration: 0.8, ease: EASE }}
      whileHover={{ y: -5 }}
      data-cursor
      style={{
        position: 'relative',
        aspectRatio: '4 / 5',
        borderRadius: 20,
        border: '1px dashed var(--line-strong)',
        background: 'linear-gradient(170deg, rgba(17,21,38,0.55), rgba(8,10,18,0.85))',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '1.1rem',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          color: 'var(--faint)',
          opacity: 0.75,
        }}
      >
        <Icon size={30} strokeWidth={1.1} />
      </span>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent, rgba(34,211,238,0.05), transparent)',
          animation: 'scanline 5s linear infinite',
          animationDelay: `${i * 0.4}s`,
        }}
      />
      <span className="mono" style={{ position: 'absolute', top: 12, right: 14, fontSize: '0.54rem', letterSpacing: '0.22em', color: 'var(--faint)' }}>
        {String(i + 1).padStart(2, '0')}
      </span>
      <span className="chip" style={{ position: 'relative', zIndex: 2, fontSize: '0.52rem', padding: '0.24rem 0.62rem' }}>
        <span className="dot" />
        {label}
      </span>
    </motion.div>
  );
}

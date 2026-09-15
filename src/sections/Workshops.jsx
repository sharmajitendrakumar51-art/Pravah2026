import { motion } from 'framer-motion';
import { FlaskConical, Mic2, Wrench } from 'lucide-react';
import Reveal, { WordsReveal } from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { WORKSHOP_TRACKS } from '../data/content';

const ICONS = {
  workshop: Wrench,
  seminar: Mic2,
  lab: FlaskConical,
};

function TrackCard({ track, i }) {
  const Icon = ICONS[track.icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay: i * 0.12, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="glass"
      style={{
        position: 'relative',
        padding: 'clamp(1.8rem, 3vw, 2.8rem)',
        overflow: 'hidden',
        cursor: 'default',
      }}
      data-cursor
    >
      {/* radar pulse */}
      <span
        style={{
          position: 'absolute',
          top: '-30%',
          right: '-18%',
          width: 220,
          height: 220,
          borderRadius: '50%',
          border: '1px solid rgba(34,211,238,0.25)',
          animation: 'pulse-ring 2.8s ease-out infinite',
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: '-30%',
          right: '-18%',
          width: 220,
          height: 220,
          borderRadius: '50%',
          border: '1px solid rgba(139,92,246,0.2)',
          animation: 'pulse-ring 2.8s ease-out infinite 0.9s',
        }}
      />

      <div
        style={{
          width: 58,
          height: 58,
          borderRadius: 18,
          border: '1px solid var(--line-strong)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--cyan)',
          background: 'rgba(34,211,238,0.06)',
          marginBottom: 'clamp(1.6rem, 3vw, 2.4rem)',
        }}
      >
        <Icon size={24} strokeWidth={1.5} />
      </div>

      <p className="display" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.7rem)' }}>{track.title}</p>
      <p style={{ color: 'var(--muted)', marginTop: '0.8rem', lineHeight: 1.7, fontSize: 'clamp(0.9rem, 1.1vw, 1rem)' }}>
        {track.desc}
      </p>

      <div style={{ marginTop: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
        <span className="chip amber"><span className="dot" /> COMING SOON</span>
      </div>
    </motion.div>
  );
}

export default function Workshops() {
  return (
    <section id="workshops" className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeader
          index="04"
          label="WORKSHOPS & SEMINARS"
          aside="Signals are being calibrated. Workshop crews, speaker panels and lab sessions will be announced here."
        />

        <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 6vw, 5.4rem)', maxWidth: '16ch', marginBottom: 'clamp(2.6rem, 5vw, 4.5rem)' }}>
          <WordsReveal text="KNOWLEDGE" />{' '}
          <span className="grad-text"><WordsReveal text="IN TRANSMISSION." delay={0.1} /></span>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1.2rem, 2vw, 1.8rem)',
          }}
        >
          {WORKSHOP_TRACKS.map((track, i) => (
            <TrackCard key={track.title} track={track} i={i} />
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mono" style={{ marginTop: 'clamp(2.4rem, 4vw, 3.4rem)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--faint)', textTransform: 'uppercase' }}>
            SESSION SCHEDULES // SPEAKER PROFILES — COMING SOON
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Hexagon } from 'lucide-react';
import Reveal, { WordsReveal } from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { TEAM_COUNT } from '../data/content';

function MemberCard({ i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: (i % 4) * 0.07, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      data-cursor
      style={{
        position: 'relative',
        aspectRatio: '3 / 4',
        borderRadius: 18,
        border: '1px solid var(--line)',
        background: 'linear-gradient(170deg, rgba(17,21,38,0.65), rgba(8,10,18,0.9))',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '1.2rem',
      }}
    >
      {/* silhouette monogram */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 24 + i * 2, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'grid', placeItems: 'center', opacity: 0.5 }}
        >
          <Hexagon size={92} strokeWidth={0.8} style={{ color: i % 2 ? '#8b5cf6' : '#22d3ee' }} />
        </motion.span>
        <span
          className="display"
          style={{
            position: 'absolute',
            fontSize: '2rem',
            color: 'rgba(226,232,255,0.28)',
          }}
        >
          ?
        </span>
      </div>

      <span
        className="mono"
        style={{ position: 'absolute', top: 12, right: 14, fontSize: '0.56rem', letterSpacing: '0.24em', color: 'var(--faint)' }}
      >
        {String(i + 1).padStart(2, '0')}
      </span>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <span className="chip" style={{ fontSize: '0.54rem', padding: '0.26rem 0.65rem' }}>
          <span className="dot" /> COMING SOON
        </span>
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section id="team" className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
      <div className="aurora" />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeader
          index="07"
          label="ORGANIZING TEAM"
          aside="The crew running the current backstage. Faces, roles and leads revealed soon."
        />

        <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 6vw, 5.4rem)', maxWidth: '16ch', marginBottom: 'clamp(2.6rem, 5vw, 4.5rem)' }}>
          <WordsReveal text="THE MINDS BEHIND" />{' '}
          <span className="grad-text"><WordsReveal text="THE MACHINE." delay={0.12} /></span>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
            gap: 'clamp(0.9rem, 1.6vw, 1.4rem)',
          }}
        >
          {Array.from({ length: TEAM_COUNT }).map((_, i) => (
            <MemberCard key={i} i={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mono" style={{ marginTop: 'clamp(2.2rem, 4vw, 3.2rem)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--faint)', textTransform: 'uppercase' }}>
            CORE COMMITTEE & COORDINATORS — COMING SOON
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Crown, Medal, Trophy } from 'lucide-react';
import Reveal, { WordsReveal } from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';

const RECOGNITIONS = [
  { icon: Trophy, label: 'CHAMPION TITLES' },
  { icon: Medal, label: 'ARENA WINNERS' },
  { icon: Crown, label: 'GRAND FINALE HONOURS' },
];

export default function Prizes() {
  return (
    <section
      id="prizes"
      className="section hairline-t"
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}
    >
      <div className="aurora" />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeader
          index="05"
          label="PRIZES & RECOGNITION"
          align="center"
          aside="The vault is sealed. Prize categories, amounts and special awards unlock closer to the festival."
        />

        <div style={{ textAlign: 'center', position: 'relative' }}>
          {/* Orbiting trophy emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', width: 150, height: 150, margin: '0 auto clamp(2rem, 4vw, 3.4rem)' }}
          >
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1px dashed rgba(34,211,238,0.4)',
                animation: 'spin-slow 18s linear infinite',
              }}
            />
            <span
              style={{
                position: 'absolute',
                inset: 12,
                borderRadius: '50%',
                border: '1px solid rgba(139,92,246,0.35)',
                boxShadow: '0 0 60px rgba(139,92,246,0.25), inset 0 0 40px rgba(34,211,238,0.12)',
                display: 'grid',
                placeItems: 'center',
                background: 'radial-gradient(circle at 35% 30%, rgba(34,211,238,0.16), rgba(8,10,18,0.9) 70%)',
              }}
            >
              <Trophy size={40} strokeWidth={1.3} style={{ color: 'var(--cyan)', filter: 'drop-shadow(0 0 14px rgba(34,211,238,0.6))' }} />
            </span>
          </motion.div>

          <h2 className="display" style={{ fontSize: 'clamp(2.6rem, 8.4vw, 8rem)' }}>
            <WordsReveal text="PRIZE POOL" />
            <br />
            <span className="grad-text" style={{ filter: 'drop-shadow(0 0 30px rgba(232,121,249,0.3))' }}>
              <WordsReveal text="COMING SOON" delay={0.14} />
            </span>
          </h2>

          <Reveal delay={0.2}>
            <p style={{ color: 'var(--muted)', maxWidth: '52ch', margin: 'clamp(1.6rem, 3vw, 2.4rem) auto 0', lineHeight: 1.8, fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}>
              Every arena at Tech Pravah 2026 carries its own reward — and the boldest builders
              take the stage at the Grand Finale on 15 October. Amounts and categories are under
              wraps until the reveal.
            </p>
          </Reveal>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'clamp(0.8rem, 2vw, 1.4rem)',
              marginTop: 'clamp(2.2rem, 4vw, 3.2rem)',
            }}
          >
            {RECOGNITIONS.map((rec, i) => (
              <Reveal key={rec.label} delay={0.25 + i * 0.1}>
                <span
                  className="chip"
                  style={{ padding: '0.7rem 1.3rem', fontSize: '0.66rem', gap: '0.65rem' }}
                >
                  <rec.icon size={13} style={{ color: 'var(--amber)' }} />
                  {rec.label}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { BellRing } from 'lucide-react';
import Reveal, { WordsReveal } from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { FESTIVAL } from '../data/content';

export default function Register() {
  return (
    <section
      id="register"
      className="section hairline-t"
      style={{ position: 'relative', overflow: 'hidden', minHeight: '88svh', display: 'flex', alignItems: 'center' }}
    >
      <div className="aurora" />
      {/* center glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(46% 42% at 50% 55%, rgba(139,92,246,0.16), transparent 70%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <SectionHeader
          index="08"
          label="REGISTRATION"
          align="center"
          aside="Crews are assembling. Registration links for every arena open soon — position yourself at the frontier."
        />

        <h2 className="display" style={{ fontSize: 'clamp(3rem, 11vw, 10.5rem)' }}>
          <WordsReveal text="READY TO" />
          <br />
          <span className="grad-text" style={{ filter: 'drop-shadow(0 0 36px rgba(34,211,238,0.35))' }}>
            <WordsReveal text="FLOW?" delay={0.14} />
          </span>
        </h2>

        <Reveal delay={0.2}>
          <p
            style={{
              color: 'var(--muted)',
              maxWidth: '48ch',
              margin: 'clamp(1.6rem, 3vw, 2.4rem) auto 0',
              lineHeight: 1.8,
              fontSize: 'clamp(0.98rem, 1.35vw, 1.12rem)',
            }}
          >
            One campus. Four days. Eight arenas. When the gates of Tech Pravah 2026 open, you will
            want to already be in the current.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.1rem',
              marginTop: 'clamp(2.2rem, 4.5vw, 3.4rem)',
            }}
          >
            <motion.button
              className="btn btn-solid"
              disabled
              style={{ opacity: 0.75, cursor: 'not-allowed' }}
              whileHover={{ scale: 1.02 }}
            >
              <BellRing size={15} />
              REGISTER NOW
            </motion.button>
            <span className="chip" style={{ alignSelf: 'center', padding: '0.8rem 1.4rem' }}>
              <span className="dot" />
              REGISTRATION LINK DROPS SOON
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mono" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)', fontSize: '0.68rem', letterSpacing: '0.32em', color: 'var(--faint)', textTransform: 'uppercase' }}>
            {FESTIVAL.datesShort} // Swami Keshvanand Institute of Technology, Management & Gramothan, Jaipur
          </p>
        </Reveal>
      </div>
    </section>
  );
}

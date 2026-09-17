import { motion } from 'framer-motion';
import Counter from '../components/Counter';
import Reveal, { WordsReveal } from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { FESTIVAL, STATS } from '../data/content';

export default function About() {
  return (
    <section id="about" className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="aurora" />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeader
          index="01"
          label="ABOUT TECH PRAVAH"
          aside="Four days where engineering stops being coursework and becomes a movement."
        />

        {/* Monumental statement */}
        <h2 className="display" style={{ fontSize: 'clamp(2.6rem, 8vw, 7.6rem)', maxWidth: '14ch' }}>
          <WordsReveal text="INNOVATION" />
          <br />
          <span className="grad-text">
            <WordsReveal text="IN MOTION." delay={0.12} />
          </span>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: 'clamp(2rem, 5vw, 5rem)',
            marginTop: 'clamp(3rem, 6vw, 5rem)',
            alignItems: 'start',
          }}
        >
          <Reveal delay={0.1}>
            <p style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', lineHeight: 1.75, color: 'var(--muted)', maxWidth: '52ch' }}>
              <span style={{ color: 'var(--ink)' }}>Tech Pravah 2026</span> is the flagship technical
              festival of {FESTIVAL.hostFull}. Over four days, the campus transforms into a living
              circuit of competitions, workshops, showcases and late-night builds — a current of
              ideas moving through every branch of technology.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', lineHeight: 1.75, color: 'var(--muted)', maxWidth: '52ch' }}>
              {FESTIVAL.meaning} From code that competes at machine speed to machines that think,
              move and respond — Pravah is where SKIT's engineers step out of classrooms and into
              the arena.{' '}
              <span style={{ color: 'var(--ink)' }}>The flow is building. Join it.</span>
            </p>
          </Reveal>
        </div>

        {/* Stats band */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            border: '1px solid var(--line)',
            borderRadius: 22,
            overflow: 'hidden',
            marginTop: 'clamp(3.5rem, 7vw, 6rem)',
            background: 'linear-gradient(160deg, rgba(17,21,38,0.55), rgba(8,10,18,0.75))',
            backdropFilter: 'blur(12px)',
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ backgroundColor: 'rgba(34,211,238,0.05)' }}
              style={{
                padding: 'clamp(1.8rem, 3vw, 3rem)',
                borderRight: i < STATS.length - 1 ? '1px solid var(--line)' : 'none',
                borderBottom: '1px solid var(--line)',
                transition: 'background 0.4s',
              }}
            >
              <div className="display" style={{ fontSize: 'clamp(2.4rem, 4.6vw, 4.4rem)' }}>
                {stat.glyph ? (
                  <span className="grad-text">{stat.glyph}</span>
                ) : (
                  <>
                    <Counter value={stat.value} />
                    <span className="grad-text">{stat.suffix}</span>
                  </>
                )}
              </div>
              <p className="mono" style={{ fontSize: '0.64rem', letterSpacing: '0.28em', color: 'var(--muted)', marginTop: '0.9rem', textTransform: 'uppercase' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Building2, Cpu, Sparkles, Users } from 'lucide-react';
import Counter from '../components/Counter';
import ComingSoon from '../components/ComingSoon';
import CtaBand from '../components/CtaBand';
import Marquee from '../components/Marquee';
import PageHero from '../components/PageHero';
import Reveal, { WordsReveal } from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { FESTIVAL, STATS } from '../data/content';
import { ABOUT_PILLARS, ABOUT_STATEMENTS, ROUTES, WHY_PARTICIPATE } from '../data/pages';

const PILLAR_ICONS = { sparkles: Sparkles, cpu: Cpu, users: Users };

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="01"
        label="ABOUT TECH PRAVAH"
        title={['THE FLOW', 'BEGINS HERE.']}
        accentIndex={1}
        intro={`${FESTIVAL.name} ${FESTIVAL.edition} is the flagship technical festival of SKIT Jaipur — four days where engineering stops being coursework and becomes a movement.`}
        meta={[FESTIVAL.dates, 'FOUR DAYS', 'EIGHT ARENAS']}
        variant="icosa"
        hue="cyan"
        breadcrumb={[{ label: 'HOME', path: ROUTES.home }, { label: 'ABOUT' }]}
      />

      {/* ---------------------------------------------- WHAT IS PRAVAH */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader index="02" label="WHAT IS PRAVAH" aside="Pravah means flow — an unstoppable current of ideas set in motion." />

          <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 6.6vw, 6rem)', maxWidth: '16ch' }}>
            <WordsReveal text="A FESTIVAL" />
            <br />
            <span className="grad-text">
              <WordsReveal text="IN MOTION." delay={0.12} />
            </span>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: 'clamp(2rem, 5vw, 5rem)',
              marginTop: 'clamp(2.6rem, 5vw, 4rem)',
            }}
          >
            <Reveal>
              <p style={{ fontSize: 'clamp(1.02rem, 1.45vw, 1.28rem)', lineHeight: 1.8, color: 'var(--muted)' }}>
                <span style={{ color: 'var(--ink)' }}>Tech Pravah 2026</span> transforms the SKIT
                campus into a living circuit of competitions, workshops, showcases and late-night
                builds. Over four days, ideas move through every branch of technology — from
                competitive code to embedded systems, applied intelligence and product engineering.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p style={{ fontSize: 'clamp(1.02rem, 1.45vw, 1.28rem)', lineHeight: 1.8, color: 'var(--muted)' }}>
                {FESTIVAL.meaning} It is where engineers step out of classrooms and into the arena —
                building, defending, pitching and demonstrating in front of peers, faculty and
                visiting professionals.{' '}
                <span style={{ color: 'var(--ink)' }}>The flow is building. Join it.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ---------------------------------------------- VISION / MISSION */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="03"
            label="VISION & MISSION"
            title={<>DIRECTION <span className="outline-text">OF FLOW</span></>}
            aside="Official institutional statements are published by the organising committee — this space is reserved for them."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(1.2rem, 2.4vw, 2rem)',
            }}
          >
            {ABOUT_STATEMENTS.map((s) => (
              <ComingSoon
                key={s.id}
                label={s.label}
                title={s.pending ? 'CONTENT COMING SOON' : s.title}
                note={s.note}
                accent={s.id === 'vision' ? 'cyan' : 'violet'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- PILLARS */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="04"
            label="THE THREE CURRENTS"
            title={<>WHAT DRIVES <span className="grad-text">PRAVAH</span></>}
            aside="Innovation, technology and community — the three currents every arena is built around."
          />

          <div style={{ borderTop: '1px solid var(--line)' }}>
            {ABOUT_PILLARS.map((pillar, i) => {
              const Icon = PILLAR_ICONS[pillar.icon];
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="pillar-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr 1.2fr',
                    alignItems: 'center',
                    gap: 'clamp(1.2rem, 3vw, 3rem)',
                    padding: 'clamp(1.6rem, 3.4vw, 2.8rem) 0',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  <span
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 18,
                      border: '1px solid var(--line-strong)',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--cyan)',
                      background: 'rgba(34,211,238,0.06)',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={23} strokeWidth={1.5} />
                  </span>
                  <p className="display" style={{ fontSize: 'clamp(1.4rem, 3.4vw, 2.9rem)' }}>{pillar.title}</p>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 'clamp(0.9rem, 1.15vw, 1.05rem)' }}>
                    {pillar.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- STATISTICS */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader index="05" label="KEY STATISTICS" title="FESTIVAL SCALE" aside="The shape of Tech Pravah 2026 in numbers." />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              border: '1px solid var(--line)',
              borderRadius: 22,
              overflow: 'hidden',
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

      {/* ---------------------------------------------- WHY PARTICIPATE */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="06"
            label="WHY PARTICIPATE"
            title={<>FOUR REASONS <span className="outline-text">TO ENTER</span></>}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: 'clamp(1rem, 2vw, 1.6rem)',
            }}
          >
            {WHY_PARTICIPATE.map((item, i) => (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.09, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="glass"
                data-cursor
                style={{ padding: 'clamp(1.6rem, 2.6vw, 2.4rem)', position: 'relative', overflow: 'hidden' }}
              >
                <span
                  className="display"
                  style={{
                    position: 'absolute',
                    top: '-0.5rem',
                    right: '0.6rem',
                    fontSize: '4.4rem',
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(226,232,255,0.09)',
                    pointerEvents: 'none',
                  }}
                >
                  {item.n}
                </span>
                <p className="display" style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)', maxWidth: '14ch' }}>{item.title}</p>
                <p style={{ color: 'var(--muted)', marginTop: '0.8rem', lineHeight: 1.75, fontSize: '0.94rem' }}>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- SKIT JAIPUR */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader index="07" label="THE INSTITUTION" title="SKIT JAIPUR" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              alignItems: 'center',
            }}
          >
            <Reveal>
              <div
                className="glass"
                style={{
                  padding: 'clamp(2rem, 4vw, 3.4rem)',
                  display: 'grid',
                  placeItems: 'center',
                  gap: '1.6rem',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    width: 116,
                    height: 116,
                    borderRadius: 26,
                    background: '#f4f6ff',
                    display: 'grid',
                    placeItems: 'center',
                    padding: 12,
                    boxShadow: '0 0 50px rgba(34,211,238,0.18)',
                  }}
                >
                  <img src="/skit-logo.png" alt="SKIT Jaipur logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </span>
                <p className="display" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', lineHeight: 1.35 }}>
                  SWAMI KESHAVANAND INSTITUTE OF TECHNOLOGY, MANAGEMENT &amp; GRAMOTHAN
                </p>
                <span className="chip">
                  <span className="dot" />
                  JAIPUR, RAJASTHAN
                </span>
              </div>
            </Reveal>

            <div>
              <Reveal delay={0.1}>
                <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', lineHeight: 1.85, color: 'var(--muted)' }}>
                  Tech Pravah 2026 is hosted by{' '}
                  <span style={{ color: 'var(--ink)' }}>{FESTIVAL.hostFull}</span>. The festival is
                  the institute's flagship technical platform — organised on campus, powered by its
                  departments, student chapters and volunteer crews.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', marginTop: '1.8rem' }}>
                  <span className="chip">
                    <Building2 size={12} style={{ color: 'var(--cyan)' }} /> ON-CAMPUS FESTIVAL
                  </span>
                  <span className="chip amber">
                    <span className="dot" /> VENUE DETAILS COMING SOON
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="THE CURRENT IS BUILDING"
        title={['ENTER THE', 'ARENA.']}
        body="Eight arenas across four days. Explore what Tech Pravah 2026 has in motion."
        primary={{ label: 'EXPLORE EVENTS', to: ROUTES.events }}
        secondary={{ label: 'VIEW SCHEDULE', to: ROUTES.schedule }}
      />

      <style>{`
        @media (max-width: 820px) {
          .pillar-row { grid-template-columns: auto 1fr !important; }
          .pillar-row > p:last-child { grid-column: 1 / -1; }
        }
      `}</style>
    </>
  );
}

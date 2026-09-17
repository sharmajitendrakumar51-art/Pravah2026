import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarClock, CalendarDays, MapPin, Sparkles } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';
import CtaBand from '../components/CtaBand';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import Schedule from '../sections/Schedule';
import { FESTIVAL, SCHEDULE } from '../data/content';
import { ROUTES } from '../data/pages';

const EASE = [0.22, 1, 0.36, 1];

export default function SchedulePage() {
  const [active, setActive] = useState(0);
  const day = SCHEDULE[active];

  return (
    <>
      <PageHero
        index="03"
        label="FESTIVAL SCHEDULE"
        title={['FOUR DAYS', 'OF FLOW.']}
        accentIndex={1}
        intro="From the inauguration on 12 October to the Grand Finale on 15 October — the four-day arc of Tech Pravah 2026. Slot-wise timings are released with the detailed schedule."
        meta={[FESTIVAL.dates, '04 DAYS', 'TIMINGS COMING SOON']}
        variant="cone"
        hue="amber"
        breadcrumb={[{ label: 'HOME', path: ROUTES.home }, { label: 'SCHEDULE' }]}
      />

      {/* ---------------------------------------------- DAY SELECTOR */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="01"
            label="DAY SELECTION"
            title={<>CHOOSE A <span className="grad-text">DAY</span></>}
            aside="Select any festival day to see what runs — detailed session timings publish closer to the event."
          />

          {/* Date rail */}
          <div
            role="tablist"
            aria-label="Festival days"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(50%, 150px), 1fr))',
              gap: 'clamp(0.6rem, 1.2vw, 1rem)',
            }}
          >
            {SCHEDULE.map((d, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={d.day}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: i * 0.06, duration: 0.7, ease: EASE }}
                  data-cursor
                  style={{
                    position: 'relative',
                    padding: 'clamp(1rem, 2vw, 1.5rem)',
                    borderRadius: 18,
                    border: `1px solid ${isActive ? 'transparent' : 'var(--line)'}`,
                    background: isActive
                      ? 'linear-gradient(150deg, rgba(34,211,238,0.14), rgba(139,92,246,0.14))'
                      : 'rgba(10,13,24,0.45)',
                    textAlign: 'left',
                    overflow: 'hidden',
                    transition: 'border-color 0.4s, background 0.5s',
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="day-indicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 2,
                        background: 'var(--grad)',
                      }}
                    />
                  )}
                  <span className="mono" style={{ display: 'block', fontSize: '0.56rem', letterSpacing: '0.26em', color: 'var(--faint)' }}>
                    {d.day}
                  </span>
                  <span
                    className="display"
                    style={{
                      display: 'block',
                      marginTop: '0.5rem',
                      fontSize: 'clamp(1.2rem, 2.4vw, 1.8rem)',
                      color: isActive ? 'var(--cyan)' : 'var(--ink)',
                      transition: 'color 0.35s',
                    }}
                  >
                    {d.date}
                  </span>
                  <span className="mono" style={{ display: 'block', marginTop: '0.35rem', fontSize: '0.54rem', letterSpacing: '0.24em', color: 'var(--muted)' }}>
                    {d.weekday}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Active day panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="glass"
              style={{
                marginTop: 'clamp(1.4rem, 3vw, 2.2rem)',
                padding: 'clamp(1.8rem, 4vw, 3.4rem)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: 'var(--grad)',
                }}
              />
              <span
                aria-hidden="true"
                className="display"
                style={{
                  position: 'absolute',
                  right: 'clamp(1rem, 3vw, 3rem)',
                  bottom: '-1.5rem',
                  fontSize: 'clamp(5rem, 14vw, 12rem)',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(226,232,255,0.07)',
                  lineHeight: 1,
                  pointerEvents: 'none',
                }}
              >
                {day.date.split(' ')[0]}
              </span>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.8rem' }}>
                  <span className="chip">
                    <span className="dot" />
                    {day.day} — {day.date}
                  </span>
                  <span className="chip amber">
                    <span className="dot" />
                    {day.status}
                  </span>
                </div>

                <h3 className="display" style={{ fontSize: 'clamp(1.6rem, 5vw, 3.8rem)', marginTop: 'clamp(1.2rem, 2.6vw, 2rem)', maxWidth: '20ch' }}>
                  {day.title}
                </h3>
                <p style={{ color: 'var(--muted)', marginTop: '1rem', maxWidth: '54ch', lineHeight: 1.85, fontSize: 'clamp(0.95rem, 1.25vw, 1.1rem)' }}>
                  {day.note}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.4rem', marginTop: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                  {[
                    { Icon: CalendarClock, label: 'TIMINGS TBA' },
                    { Icon: MapPin, label: 'VENUE TBA' },
                    { Icon: Sparkles, label: 'EVENT LIST TBA' },
                  ].map(({ Icon, label }) => (
                    <span
                      key={label}
                      className="mono"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.62rem', letterSpacing: '0.2em', color: 'var(--faint)' }}
                    >
                      <Icon size={13} /> {label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ---------------------------------------------- CINEMATIC TIMELINE
          Reuses the homepage's pinned horizontal timeline so both
          surfaces stay visually identical. */}
      <Schedule />

      {/* ---------------------------------------------- DETAILED SCHEDULE */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="02"
            label="SLOT-WISE SCHEDULE"
            title={<>THE FULL <span className="outline-text">TIMETABLE</span></>}
            aside="Hour-by-hour scheduling across all arenas, workshops and ceremonies."
          />
          <ComingSoon
            icon={CalendarDays}
            label="DETAILED SCHEDULE"
            title="TIMETABLE COMING SOON"
            note="Session timings, venues and parallel-track scheduling are finalised by the organising committee and will be published here."
            size="lg"
            accent="amber"
          />

          <Reveal delay={0.1}>
            <p className="mono" style={{ marginTop: 'clamp(1.8rem, 3vw, 2.6rem)', fontSize: '0.66rem', letterSpacing: '0.3em', color: 'var(--faint)', textTransform: 'uppercase' }}>
              {FESTIVAL.dates} // {FESTIVAL.host}
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="FOUR DAYS, ONE CURRENT"
        title={['SEE THE', 'ARENAS.']}
        body="Eight event categories run across the festival week. Explore what each one holds."
        primary={{ label: 'EXPLORE EVENTS', to: ROUTES.events }}
        secondary={{ label: 'REGISTER NOW', to: ROUTES.register }}
      />
    </>
  );
}

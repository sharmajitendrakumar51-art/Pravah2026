import { CalendarDays, Mic2, Presentation } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';
import CtaBand from '../components/CtaBand';
import Marquee from '../components/Marquee';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { PlaceholderPersonCard, SessionCard, SpeakerCard } from '../components/WorkshopCards';
import { FESTIVAL } from '../data/content';
import { ROUTES, SESSIONS, SPEAKERS, WORKSHOP_MODULES } from '../data/pages';

export default function WorkshopsPage() {
  const hasSessions = SESSIONS.length > 0;
  const hasSpeakers = SPEAKERS.length > 0;

  return (
    <>
      <PageHero
        index="04"
        label="WORKSHOPS & SEMINARS"
        title={['KNOWLEDGE', 'IN TRANSMISSION.']}
        titleFont="Bleeding_Cowboys, sans-serif"
        accentIndex={1}
        intro="Connect with technology experts, researchers, entrepreneurs and industry leaders across the festival week. Session lineups are being finalised."
        meta={['14 OCT — WORKSHOP DAY', 'SESSIONS COMING SOON', 'SPEAKERS COMING SOON']}
        variant="torus"
        hue="violet"
        breadcrumb={[{ label: 'HOME', path: ROUTES.home }, { label: 'WORKSHOPS' }]}
      />

      {/* ---------------------------------------------- MODULE STATUS */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="01"
            label="PROGRAMME MODULES"
            title={<>THREE <span className="grad-text">TRANSMISSIONS</span></>}
            aside="Expert sessions, speaker profiles and slot-wise scheduling — each publishes independently as it is confirmed."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(1.1rem, 2vw, 1.7rem)',
            }}
          >
            {WORKSHOP_MODULES.map((mod, i) => (
              <ComingSoon
                key={mod.id}
                label={mod.label}
                title="COMING SOON"
                note={mod.note}
                icon={[Presentation, Mic2, CalendarDays][i] ?? Presentation}
                accent={['cyan', 'violet', 'amber'][i] ?? 'cyan'}
              />
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      {/* ---------------------------------------------- EXPERT SESSIONS */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="02"
            label="EXPERT SESSIONS"
            title={<>HANDS-ON <span className="outline-text">SESSIONS</span></>}
            aside="Builder-grade workshops across emerging technology tracks."
          />

          {hasSessions ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(1rem, 1.8vw, 1.5rem)',
              }}
            >
              {SESSIONS.map((session, i) => (
                <SessionCard key={session.title} session={session} i={i} />
              ))}
            </div>
          ) : (
            <ComingSoon
              icon={Presentation}
              label="SESSION LINEUP"
              title="EXPERT SESSIONS COMING SOON"
              note="Workshop titles, tracks, capacity and prerequisites will appear here once the programme is locked."
              size="lg"
            />
          )}
        </div>
      </section>

      {/* ---------------------------------------------- SPEAKERS */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="03"
            label="SPEAKERS"
            title={<>THE <span className="grad-text">VOICES</span></>}
            aside="Technology experts, researchers, entrepreneurs and industry leaders. Names are announced only once confirmed."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 210px), 1fr))',
              gap: 'clamp(0.9rem, 1.6vw, 1.4rem)',
            }}
          >
            {hasSpeakers
              ? SPEAKERS.map((speaker, i) => <SpeakerCard key={speaker.name} speaker={speaker} i={i} />)
              : Array.from({ length: 6 }).map((_, i) => (
                  <PlaceholderPersonCard key={i} i={i} icon={Mic2} label="SPEAKER TBA" />
                ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mono" style={{ marginTop: 'clamp(2rem, 3.5vw, 3rem)', fontSize: '0.68rem', letterSpacing: '0.3em', color: 'var(--faint)', textTransform: 'uppercase' }}>
              SPEAKER PROFILES — COMING SOON
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------- SESSION SCHEDULE */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="04"
            label="SESSION SCHEDULE"
            title="WHEN THEY RUN"
            aside={`Workshops and seminars are anchored to 14 October, with additional sessions across the festival week.`}
          />
          <ComingSoon
            icon={CalendarDays}
            label="SLOT TIMINGS"
            title="SCHEDULE COMING SOON"
            note="Slot-wise workshop timings publish alongside the detailed festival timetable."
            accent="amber"
            size="lg"
          />
          <Reveal delay={0.1}>
            <p className="mono" style={{ marginTop: 'clamp(1.6rem, 3vw, 2.4rem)', fontSize: '0.66rem', letterSpacing: '0.3em', color: 'var(--faint)', textTransform: 'uppercase' }}>
              {FESTIVAL.dates} // {FESTIVAL.host}
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="LEARN FROM BUILDERS"
        title={['SECURE YOUR', 'SEAT.']}
        body="Workshop registrations open with the main festival registration. Explore the arenas in the meantime."
        primary={{ label: 'REGISTER NOW', to: ROUTES.register }}
        secondary={{ label: 'VIEW SCHEDULE', to: ROUTES.schedule }}
      />
    </>
  );
}

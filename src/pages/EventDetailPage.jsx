import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Clock,
  Headset,
  MapPin,
  ScrollText,
  Ticket,
  Trophy,
  Users,
} from 'lucide-react';
import Accordion from '../components/Accordion';
import ComingSoon from '../components/ComingSoon';
import { EVENT_HUES, EVENT_ICONS } from '../components/EventCard';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { DETAIL_FIELDS, getAdjacentEvents, getEventBySlug } from '../data/events';
import { ROUTES } from '../data/pages';

const FIELD_ICONS = {
  calendar: CalendarDays,
  clock: Clock,
  pin: MapPin,
  trophy: Trophy,
  users: Users,
  badge: BadgeCheck,
  ticket: Ticket,
  headset: Headset,
};

// Each arena gets its own signature 3D form in the hero.
const SHAPE_BY_ID = {
  coding: 'box',
  'ai-ml': 'sphere',
  cyber: 'octa',
  startup: 'cone',
  webapp: 'dodeca',
  robotics: 'torus',
  gaming: 'icosa',
  exhibition: 'dodeca',
};

export default function EventDetailPage() {
  const { slug } = useParams();
  const event = getEventBySlug(slug);

  // Unknown slug → events index (no dead ends).
  if (!event) return <Navigate to={ROUTES.events} replace />;

  const { prev, next } = getAdjacentEvents(slug);
  const Icon = EVENT_ICONS[event.icon];
  const hue = EVENT_HUES[event.hue] ?? EVENT_HUES.cyan;
  const { details } = event;

  const hasRules = details.rules.length > 0;
  const hasFaqs = details.faqs.length > 0;
  const hasSubEvents = details.events.length > 0;

  return (
    <>
      <PageHero
        index={event.index}
        label={`ARENA ${event.index} — TECH PRAVAH 2026`}
        title={event.title.split(' & ').length > 1 ? event.title.split(' & ') : [event.title]}
        accentIndex={event.title.split(' & ').length > 1 ? 1 : 0}
        intro={event.overview}
        meta={event.tags}
        variant={SHAPE_BY_ID[event.id] ?? 'icosa'}
        hue={event.hue}
        breadcrumb={[
          { label: 'HOME', path: ROUTES.home },
          { label: 'EVENTS', path: ROUTES.events },
          { label: event.title },
        ]}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <Link className="btn btn-solid" to={ROUTES.register}>
            REGISTER NOW
            <ArrowUpRight size={15} />
          </Link>
          <Link className="btn btn-ghost" to={ROUTES.events}>
            <ArrowLeft size={15} />
            BACK TO EVENTS
          </Link>
          <span
            style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              border: `1px solid ${hue.text}`,
              display: 'grid',
              placeItems: 'center',
              color: hue.text,
              background: `${hue.soft}0.08)`,
              boxShadow: `0 0 30px ${hue.soft}0.28)`,
            }}
          >
            <Icon size={22} strokeWidth={1.6} />
          </span>
        </div>
      </PageHero>

      {/* ---------------------------------------------- KEY DETAILS */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="01"
            label="EVENT INFORMATION"
            title="KEY DETAILS"
            aside="Only confirmed information is shown. Pending fields are marked and will populate on announcement."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              border: '1px solid var(--line)',
              borderRadius: 22,
              overflow: 'hidden',
              background: 'linear-gradient(160deg, rgba(17,21,38,0.6), rgba(8,10,18,0.8))',
              backdropFilter: 'blur(12px)',
            }}
          >
            {DETAIL_FIELDS.map((field, i) => {
              const FieldIcon = FIELD_ICONS[field.icon];
              const value = details[field.key];
              return (
                <motion.div
                  key={field.key}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: Math.min(i * 0.06, 0.4), duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    padding: 'clamp(1.4rem, 2.4vw, 2rem)',
                    borderRight: '1px solid var(--line)',
                    borderBottom: '1px solid var(--line)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.9rem',
                  }}
                >
                  <span
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      border: '1px solid var(--line-strong)',
                      display: 'grid',
                      placeItems: 'center',
                      color: value ? hue.text : 'var(--faint)',
                    }}
                  >
                    <FieldIcon size={17} strokeWidth={1.5} />
                  </span>
                  <span className="mono" style={{ fontSize: '0.58rem', letterSpacing: '0.28em', color: 'var(--faint)', textTransform: 'uppercase' }}>
                    {field.label}
                  </span>
                  {value ? (
                    <span className="display" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)' }}>{value}</span>
                  ) : (
                    <span className="mono" style={{ fontSize: '0.66rem', letterSpacing: '0.2em', color: 'var(--muted)' }}>
                      COMING SOON
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- ABOUT THE ARENA */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))',
              gap: 'clamp(2rem, 5vw, 4.5rem)',
              alignItems: 'start',
            }}
          >
            <div>
              <Reveal>
                <span className="label">02 / ABOUT THIS ARENA</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 4.4vw, 3.4rem)', marginTop: '1.4rem', maxWidth: '18ch' }}>
                  {event.title}
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.4rem' }}>
                  {event.tags.map((tag) => (
                    <span key={tag} className="chip" style={{ fontSize: '0.56rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal delay={0.1}>
                <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', lineHeight: 1.85, color: 'var(--muted)' }}>
                  {event.overview}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ marginTop: '1.4rem', color: 'var(--muted)', lineHeight: 1.85, fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}>
                  {event.blurb}
                </p>
              </Reveal>
              <Reveal delay={0.28}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', marginTop: '1.8rem' }}>
                  <span className="chip amber">
                    <span className="dot" />
                    {event.status}
                  </span>
                  <Link to={ROUTES.rulebook} className="chip" style={{ cursor: 'pointer' }}>
                    <ScrollText size={12} style={{ color: 'var(--cyan)' }} />
                    VIEW RULEBOOK
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- SUB-EVENTS */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="03"
            label="EVENTS IN THIS ARENA"
            title={<>THE <span className="grad-text">LINEUP</span></>}
            aside="Individual events under this category, with formats and entry requirements."
          />

          {hasSubEvents ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: 'clamp(1rem, 1.8vw, 1.5rem)',
              }}
            >
              {details.events.map((sub) => (
                <div key={sub.name} className="glass" style={{ padding: 'clamp(1.5rem, 2.4vw, 2.2rem)' }}>
                  <p className="display" style={{ fontSize: '1.15rem' }}>{sub.name}</p>
                  {sub.format && (
                    <p className="mono" style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: 'var(--cyan)', marginTop: '0.6rem' }}>
                      {sub.format}
                    </p>
                  )}
                  {sub.note && (
                    <p style={{ color: 'var(--muted)', marginTop: '0.8rem', lineHeight: 1.7, fontSize: '0.92rem' }}>{sub.note}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <ComingSoon
              label="LINEUP"
              title="EVENTS COMING SOON"
              note={`Individual events under ${event.title} will be listed here with formats, team sizes and entry details.`}
              accent={event.hue}
              size="lg"
            />
          )}
        </div>
      </section>

      {/* ---------------------------------------------- RULES */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="04"
            label="RULES & ELIGIBILITY"
            title="THE GROUND RULES"
            aside="Official rules are published by the organising committee. Nothing here is provisional or unofficial."
          />

          {hasRules ? (
            <ul style={{ listStyle: 'none', display: 'grid', gap: '1rem', borderTop: '1px solid var(--line)', paddingTop: '1.6rem' }}>
              {details.rules.map((rule, i) => (
                <li key={i} style={{ display: 'flex', gap: '1.1rem', color: 'var(--muted)', lineHeight: 1.8 }}>
                  <span className="mono" style={{ color: hue.text, fontSize: '0.68rem' }}>{String(i + 1).padStart(2, '0')}</span>
                  {rule}
                </li>
              ))}
            </ul>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: 'clamp(1rem, 2vw, 1.6rem)',
              }}
            >
              <ComingSoon icon={ScrollText} label="EVENT RULES" title="RULES COMING SOON" note="Detailed rules for this arena will be published in the official Tech Pravah 2026 rulebook." accent="cyan" />
              <ComingSoon icon={BadgeCheck} label="ELIGIBILITY" title="CRITERIA COMING SOON" note="Eligibility, year restrictions and team composition rules will be announced with registration." accent="violet" />
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------- FAQ */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 1100 }}>
          <SectionHeader index="05" label="FAQ" title="COMMON QUESTIONS" />

          {hasFaqs ? (
            <Accordion items={details.faqs.map((f, i) => ({ id: f.q, n: String(i + 1).padStart(2, '0'), title: f.q, body: f.a }))} />
          ) : (
            <ComingSoon
              label="FAQ"
              title="QUESTIONS COMING SOON"
              note="Frequently asked questions for this arena will appear here once registrations open."
              accent="magenta"
            />
          )}
        </div>
      </section>

      {/* ---------------------------------------------- PREV / NEXT */}
      <section className="hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="container" style={{ paddingBlock: 'clamp(2.4rem, 5vw, 4rem)' }}>
          <div
            className="arena-nav"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              gap: 'clamp(1rem, 3vw, 2.5rem)',
            }}
          >
            {prev && (
              <Link
                to={`/events/${prev.slug}`}
                className="mono"
                style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', color: 'var(--muted)', fontSize: '0.66rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                <ArrowLeft size={15} />
                <span>
                  <span style={{ display: 'block', color: 'var(--faint)', fontSize: '0.56rem' }}>PREVIOUS ARENA</span>
                  <span className="display" style={{ fontSize: 'clamp(0.78rem, 1.5vw, 1.05rem)', letterSpacing: 0 }}>{prev.title}</span>
                </span>
              </Link>
            )}

            <Link className="btn btn-ghost arena-nav-mid" to={ROUTES.events} style={{ justifySelf: 'center' }}>
              ALL ARENAS
            </Link>

            {next && (
              <Link
                to={`/events/${next.slug}`}
                className="mono"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '0.9rem',
                  color: 'var(--muted)',
                  fontSize: '0.66rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  textAlign: 'right',
                }}
              >
                <span>
                  <span style={{ display: 'block', color: 'var(--faint)', fontSize: '0.56rem' }}>NEXT ARENA</span>
                  <span className="display" style={{ fontSize: 'clamp(0.78rem, 1.5vw, 1.05rem)', letterSpacing: 0 }}>{next.title}</span>
                </span>
                <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 720px) {
          .arena-nav { grid-template-columns: 1fr 1fr !important; row-gap: 1.6rem; }
          .arena-nav-mid { grid-column: 1 / -1; order: 3; }
        }
      `}</style>
    </>
  );
}

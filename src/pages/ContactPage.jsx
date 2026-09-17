import { motion } from 'framer-motion';
import {
  Building2,
  Handshake,
  Headset,
  Mail,
  MapPin,
  Megaphone,
  Ticket,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ComingSoon from '../components/ComingSoon';
import CtaBand from '../components/CtaBand';
import Marquee from '../components/Marquee';
import PageHero from '../components/PageHero';
import Reveal, { WordsReveal } from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { CONTACT_CHANNELS, FESTIVAL } from '../data/content';
import { COORDINATOR_DESKS, PRIMARY_NAV, ROUTES, SECONDARY_NAV } from '../data/pages';

const EASE = [0.22, 1, 0.36, 1];

const CHANNEL_ICONS = {
  mail: Mail,
  ticket: Ticket,
  handshake: Handshake,
};

const DESK_ICONS = {
  general: Headset,
  events: Ticket,
  registration: Users,
  sponsorship: Handshake,
  media: Megaphone,
  campus: MapPin,
};

// Official institutional address — the only address published for
// the festival. No phone numbers or email IDs are invented here.
const ADDRESS_LINES = [
  'Ramnagaria, Jagatpura',
  'Jaipur – 302017',
  'Rajasthan, India',
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="11"
        label="CONTACT"
        title={['GET IN', 'TOUCH.']}
        accentIndex={1}
        intro="Direct lines to the Tech Pravah 2026 control room open soon. The festival is hosted on the SKIT Jaipur campus — institutional details are below."
        meta={['SKIT JAIPUR', FESTIVAL.datesShort, 'CONTACT DETAILS COMING SOON']}
        variant="octa"
        hue="cyan"
        breadcrumb={[{ label: 'HOME', path: ROUTES.home }, { label: 'CONTACT' }]}
      />

      {/* ---------------------------------------------- INSTITUTION + ADDRESS */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="01"
            label="THE INSTITUTION"
            aside="Tech Pravah 2026 is an on-campus festival hosted by SKIT Jaipur."
          />

          <h2 className="display" style={{ fontSize: 'clamp(2rem, 6vw, 5.4rem)', maxWidth: '16ch' }}>
            <WordsReveal text="FIND US" />
            <br />
            <span className="grad-text">
              <WordsReveal text="ON CAMPUS." delay={0.12} />
            </span>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(1.2rem, 2.4vw, 2rem)',
              marginTop: 'clamp(2.6rem, 5vw, 4rem)',
              alignItems: 'stretch',
            }}
          >
            {/* Institution card */}
            <Reveal>
              <div
                className="glass"
                style={{
                  padding: 'clamp(1.8rem, 3.2vw, 2.8rem)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.4rem',
                }}
              >
                <span
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 20,
                    background: '#f4f6ff',
                    display: 'grid',
                    placeItems: 'center',
                    padding: 8,
                    boxShadow: '0 0 40px rgba(34,211,238,0.16)',
                  }}
                >
                  <img
                    src="/skit-logo.png"
                    alt="SKIT Jaipur logo"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </span>

                <div>
                  <span className="mono" style={{ fontSize: '0.58rem', letterSpacing: '0.28em', color: 'var(--faint)', textTransform: 'uppercase' }}>
                    HOST INSTITUTION
                  </span>
                  <p className="display" style={{ fontSize: 'clamp(1rem, 1.7vw, 1.4rem)', marginTop: '0.8rem', lineHeight: 1.35 }}>
                    SWAMI KESHAVANAND INSTITUTE OF TECHNOLOGY, MANAGEMENT &amp; GRAMOTHAN
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: 'auto' }}>
                  <span className="chip">
                    <Building2 size={12} style={{ color: 'var(--cyan)' }} />
                    SKIT JAIPUR
                  </span>
                  <span className="chip">
                    <span className="dot" />
                    ON-CAMPUS FESTIVAL
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Address card */}
            <Reveal delay={0.1}>
              <div
                className="glass"
                style={{
                  padding: 'clamp(1.8rem, 3.2vw, 2.8rem)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.4rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* subtle campus grid */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                      'linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)',
                    backgroundSize: '42px 42px',
                    maskImage: 'radial-gradient(circle at 70% 30%, black, transparent 74%)',
                    WebkitMaskImage: 'radial-gradient(circle at 70% 30%, black, transparent 74%)',
                    pointerEvents: 'none',
                  }}
                />
                <span
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 16,
                    border: '1px solid var(--line-strong)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--cyan)',
                    background: 'rgba(34,211,238,0.06)',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <MapPin size={22} strokeWidth={1.5} />
                </span>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <span className="mono" style={{ fontSize: '0.58rem', letterSpacing: '0.28em', color: 'var(--faint)', textTransform: 'uppercase' }}>
                    CAMPUS ADDRESS
                  </span>
                  <address
                    style={{
                      fontStyle: 'normal',
                      marginTop: '0.9rem',
                      color: 'var(--ink)',
                      fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                      lineHeight: 1.9,
                    }}
                  >
                    {ADDRESS_LINES.map((line) => (
                      <span key={line} style={{ display: 'block' }}>
                        {line}
                      </span>
                    ))}
                  </address>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: 'auto', position: 'relative', zIndex: 2 }}>
                  <span className="chip amber">
                    <span className="dot" />
                    VENUE-WISE DIRECTIONS COMING SOON
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ---------------------------------------------- CONTACT CHANNELS */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="02"
            label="CONTACT CHANNELS"
            title={<>REACH THE <span className="grad-text">RIGHT DESK</span></>}
            aside="Phone numbers and email addresses are published only once officially confirmed by the organising committee."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(1.1rem, 2vw, 1.6rem)',
            }}
          >
            {CONTACT_CHANNELS.map((channel, i) => {
              const Icon = CHANNEL_ICONS[channel.icon] ?? Mail;
              return (
                <motion.div
                  key={channel.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.32 }}
                  transition={{ delay: i * 0.1, duration: 0.9, ease: EASE }}
                  whileHover={{ y: -6, borderColor: 'rgba(34,211,238,0.4)' }}
                  className="glass"
                  data-cursor
                  style={{ padding: 'clamp(1.7rem, 2.8vw, 2.5rem)', transition: 'border-color 0.4s' }}
                >
                  <span
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 16,
                      border: '1px solid var(--line-strong)',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--cyan)',
                      background: 'rgba(34,211,238,0.06)',
                    }}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <p className="display" style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.45rem)', marginTop: '1.4rem' }}>
                    {channel.title}
                  </p>
                  <p style={{ color: 'var(--muted)', marginTop: '0.6rem', fontSize: 'clamp(0.88rem, 1.05vw, 0.98rem)', lineHeight: 1.7 }}>
                    {channel.desc}
                  </p>
                  <div style={{ marginTop: '1.5rem' }}>
                    <span className="chip amber">
                      <span className="dot" />
                      CONTACT DETAILS COMING SOON
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- COORDINATOR REGISTRY */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="03"
            label="COORDINATOR REGISTRY"
            title={<>SIX <span className="outline-text">DESKS</span></>}
            aside="Each desk handles a distinct scope. Named coordinators and their contact routes publish with the organising team."
          />

          <div style={{ borderTop: '1px solid var(--line)' }}>
            {COORDINATOR_DESKS.map((desk, i) => {
              const Icon = DESK_ICONS[desk.id] ?? Headset;
              return (
                <motion.div
                  key={desk.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: Math.min(i * 0.06, 0.35), duration: 0.8, ease: EASE }}
                  className="desk-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto 1fr auto',
                    alignItems: 'center',
                    gap: 'clamp(1rem, 2.4vw, 2.4rem)',
                    padding: 'clamp(1.2rem, 2.4vw, 1.9rem) 0',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  <span className="mono" style={{ fontSize: '0.66rem', letterSpacing: '0.2em', color: 'var(--faint)' }}>
                    /{String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="desk-icon"
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      border: '1px solid var(--line-strong)',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--muted)',
                      background: 'rgba(10,13,24,0.4)',
                    }}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span className="display" style={{ display: 'block', fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
                      {desk.label}
                    </span>
                    <span style={{ display: 'block', color: 'var(--muted)', marginTop: '0.35rem', fontSize: '0.92rem', lineHeight: 1.7 }}>
                      {desk.scope}
                    </span>
                  </span>
                  <span className="chip desk-status" style={{ fontSize: '0.54rem' }}>
                    <span className="dot" />
                    COMING SOON
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- QUICK NAVIGATION */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="04"
            label="QUICK NAVIGATION"
            title="JUMP ANYWHERE"
            aside="Every corner of the Tech Pravah 2026 platform, one tap away."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
              gap: 'clamp(0.7rem, 1.4vw, 1.1rem)',
            }}
          >
            {[...PRIMARY_NAV, ...SECONDARY_NAV].map((item, i) => (
              <motion.div
                key={`${item.id}-${i}`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: Math.min(i * 0.04, 0.35), duration: 0.7, ease: EASE }}
              >
                <Link
                  to={item.path}
                  data-cursor
                  className="quick-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '1rem 1.2rem',
                    borderRadius: 14,
                    border: '1px solid var(--line)',
                    background: 'rgba(10,13,24,0.45)',
                    transition: 'border-color 0.4s, transform 0.45s cubic-bezier(0.22,1,0.36,1), color 0.35s',
                  }}
                >
                  <span className="mono" style={{ fontSize: '0.64rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    {item.label}
                  </span>
                  <span className="mono" style={{ fontSize: '0.56rem', color: 'var(--faint)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- SOCIALS */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader index="05" label="SOCIAL CHANNELS" title="FOLLOW THE FLOW" />
          <ComingSoon
            icon={Megaphone}
            label="OFFICIAL HANDLES"
            title="SOCIALS COMING SOON"
            note="Official Tech Pravah 2026 social accounts will be linked here once announced. No unofficial handles are listed."
            size="lg"
            accent="magenta"
          />
          <Reveal delay={0.1}>
            <p className="mono" style={{ marginTop: 'clamp(1.8rem, 3vw, 2.6rem)', fontSize: '0.66rem', letterSpacing: '0.3em', color: 'var(--faint)', textTransform: 'uppercase' }}>
              {FESTIVAL.dates} // {FESTIVAL.tagline.join(' ')}
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="THE DOORS ARE OPENING"
        title={['JOIN', 'PRAVAH 2026.']}
        body="Registration opens soon. Explore the arenas and get your team ready."
        primary={{ label: 'REGISTER NOW', to: ROUTES.register }}
        secondary={{ label: 'EXPLORE EVENTS', to: ROUTES.events }}
      />

      <style>{`
        .quick-link:hover {
          border-color: var(--cyan) !important;
          color: var(--cyan);
          transform: translateY(-3px);
        }
        .desk-row:hover .desk-icon {
          color: var(--cyan);
          border-color: var(--cyan);
        }
        @media (max-width: 720px) {
          .desk-row { grid-template-columns: auto 1fr !important; }
          .desk-icon { display: none !important; }
          .desk-status { grid-column: 1 / -1; justify-self: start; }
        }
      `}</style>
    </>
  );
}

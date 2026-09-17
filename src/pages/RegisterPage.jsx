import { motion } from 'framer-motion';
import { BellRing, ClipboardList, Lock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ComingSoon from '../components/ComingSoon';
import Marquee from '../components/Marquee';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { FESTIVAL } from '../data/content';
import {
  REGISTRATION_FIELDS,
  REGISTRATION_OPEN,
  REGISTRATION_STEPS,
  REGISTRATION_URL,
  ROUTES,
} from '../data/pages';

const EASE = [0.22, 1, 0.36, 1];

// Disabled preview of the future form. Rendered as a real layout so
// the page is production-ready the moment registration opens, but
// intentionally inert — no fake endpoint, no fake payment.
function FormBlueprint() {
  return (
    <div
      className="glass"
      style={{ padding: 'clamp(1.6rem, 3.4vw, 3rem)', position: 'relative', overflow: 'hidden' }}
    >
      <span aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--grad)', opacity: 0.8 }} />

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <span className="label">FORM PREVIEW</span>
        <span className="chip amber">
          <Lock size={11} style={{ color: 'var(--amber)' }} />
          INACTIVE UNTIL REGISTRATION OPENS
        </span>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        aria-disabled="true"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
          marginTop: 'clamp(1.8rem, 3.4vw, 2.6rem)',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      >
        {REGISTRATION_FIELDS.map((field, i) => (
          <motion.label
            key={field.name}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: Math.min(i * 0.05, 0.35), duration: 0.7, ease: EASE }}
            style={{
              display: 'grid',
              gap: '0.6rem',
              gridColumn: field.span === 2 ? '1 / -1' : 'auto',
            }}
          >
            <span className="mono" style={{ fontSize: '0.58rem', letterSpacing: '0.24em', color: 'var(--faint)', textTransform: 'uppercase' }}>
              {field.label}
            </span>

            {field.type === 'textarea' ? (
              <textarea
                rows={3}
                disabled
                placeholder="—"
                style={{
                  background: 'rgba(5,6,10,0.6)',
                  border: '1px solid var(--line)',
                  borderRadius: 12,
                  padding: '0.9rem 1rem',
                  color: 'var(--ink)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  resize: 'none',
                }}
              />
            ) : field.type === 'select' ? (
              <div
                style={{
                  background: 'rgba(5,6,10,0.6)',
                  border: '1px solid var(--line)',
                  borderRadius: 12,
                  padding: '0.85rem 1rem',
                  color: 'var(--faint)',
                  fontSize: '0.92rem',
                }}
              >
                SELECT —
              </div>
            ) : (
              <input
                type={field.type}
                disabled
                placeholder="—"
                style={{
                  background: 'rgba(5,6,10,0.6)',
                  border: '1px solid var(--line)',
                  borderRadius: 12,
                  padding: '0.85rem 1rem',
                  color: 'var(--ink)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                }}
              />
            )}
          </motion.label>
        ))}

        <div style={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <button type="submit" className="btn btn-solid" disabled>
            SUBMIT REGISTRATION
          </button>
          <span className="mono" style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: 'var(--faint)', textTransform: 'uppercase' }}>
            FORM DISABLED — AWAITING OFFICIAL LAUNCH
          </span>
        </div>
      </form>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <>
      <PageHero
        index="09"
        label="REGISTRATION"
        title={['READY TO SHAPE', 'THE FUTURE?']}
        accentIndex={1}
        intro={`${FESTIVAL.name} ${FESTIVAL.edition} — ${FESTIVAL.host}. One campus, four days, eight arenas. Registration opens soon.`}
        meta={[FESTIVAL.datesShort, 'REGISTRATION OPENS SOON']}
        variant="sphere"
        hue="violet"
        breadcrumb={[{ label: 'HOME', path: ROUTES.home }, { label: 'REGISTER' }]}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          {REGISTRATION_OPEN && REGISTRATION_URL ? (
            <a className="btn btn-solid" href={REGISTRATION_URL} target="_blank" rel="noreferrer">
              REGISTER NOW
            </a>
          ) : (
            <button className="btn btn-solid" disabled>
              <BellRing size={15} />
              REGISTER NOW
            </button>
          )}
          <span className="chip">
            <span className="dot" />
            REGISTRATION WILL OPEN SOON
          </span>
        </div>
      </PageHero>

      {/* ---------------------------------------------- STATUS */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ComingSoon
            icon={ClipboardList}
            label="REGISTRATION STATUS"
            title="REGISTRATION WILL OPEN SOON"
            note="Official registration links, entry requirements and any applicable fees are announced by the organising committee. This page will activate automatically."
            size="lg"
            accent="violet"
          />
        </div>
      </section>

      <Marquee />

      {/* ---------------------------------------------- HOW IT WORKS */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="01"
            label="HOW IT WORKS"
            title={<>FOUR <span className="grad-text">STEPS</span></>}
            aside="The registration flow, from picking an arena to confirming your slot."
          />

          <div style={{ borderTop: '1px solid var(--line)' }}>
            {REGISTRATION_STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.08, duration: 0.85, ease: EASE }}
                className="step-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr 1.3fr',
                  alignItems: 'center',
                  gap: 'clamp(1.2rem, 3vw, 3rem)',
                  padding: 'clamp(1.4rem, 3vw, 2.4rem) 0',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <span className="mono" style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--cyan)' }}>
                  /{step.n}
                </span>
                <p className="display" style={{ fontSize: 'clamp(1.15rem, 2.8vw, 2.2rem)' }}>{step.title}</p>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 'clamp(0.9rem, 1.15vw, 1.02rem)' }}>{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- FORM BLUEPRINT */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="02"
            label="REGISTRATION FORM"
            title="WHAT YOU'LL NEED"
            aside="The fields the official form will collect. Nothing is submitted or stored while registration is closed."
          />
          <FormBlueprint />

          <Reveal delay={0.12}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.7rem',
                marginTop: 'clamp(1.6rem, 3vw, 2.4rem)',
              }}
            >
              <span className="chip">
                <ShieldCheck size={12} style={{ color: 'var(--cyan)' }} />
                NO PAYMENT PROCESSING ENABLED
              </span>
              <Link to={ROUTES.rulebook} className="chip" style={{ cursor: 'pointer' }}>
                <span className="dot" />
                READ THE RULEBOOK
              </Link>
              <Link to={ROUTES.terms} className="chip" style={{ cursor: 'pointer' }}>
                <span className="dot" />
                TERMS &amp; CONDITIONS
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------- FEES */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader index="03" label="ENTRY & FEES" title="ENTRY DETAILS" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(1.1rem, 2vw, 1.7rem)',
            }}
          >
            <ComingSoon label="REGISTRATION FEE" title="COMING SOON" note="Any applicable entry fees are announced with the official registration launch." accent="amber" />
            <ComingSoon label="TEAM RULES" title="COMING SOON" note="Team sizes and composition rules are defined per arena in the official rulebook." accent="cyan" />
            <ComingSoon label="DEADLINES" title="COMING SOON" note="Registration windows and cut-off dates will be published here." accent="magenta" />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .step-row { grid-template-columns: auto 1fr !important; }
          .step-row > p:last-child { grid-column: 1 / -1; }
        }
      `}</style>
    </>
  );
}

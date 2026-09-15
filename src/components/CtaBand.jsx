import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { FESTIVAL } from '../data/content';

// ============================================================
// CTA BAND — closing call-to-action reused at the end of pages.
// ============================================================
export default function CtaBand({
  eyebrow = 'JOIN THE CURRENT',
  title = ['READY TO', 'FLOW?'],
  body,
  primary = { label: 'REGISTER NOW', to: '/register' },
  secondary = { label: 'EXPLORE EVENTS', to: '/events' },
}) {
  return (
    <section
      className="hairline-t"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingBlock: 'clamp(4.5rem, 9vw, 8rem)',
        background: 'var(--bg)',
      }}
    >
      <div className="aurora" />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(46% 46% at 50% 50%, rgba(34,211,238,0.12), transparent 72%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Reveal>
          <span className="label" style={{ justifyContent: 'center' }}>{eyebrow}</span>
        </Reveal>

        <h2 className="display" style={{ fontSize: 'clamp(2.4rem, 8vw, 7rem)', marginTop: 'clamp(1.2rem, 3vw, 2rem)' }}>
          {title.map((line, i) => (
            <span key={line} style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span
                style={{ display: 'block' }}
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.1, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className={i === title.length - 1 ? 'grad-text' : ''}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        {body && (
          <Reveal delay={0.18}>
            <p
              style={{
                color: 'var(--muted)',
                maxWidth: '50ch',
                margin: 'clamp(1.4rem, 3vw, 2.2rem) auto 0',
                lineHeight: 1.8,
                fontSize: 'clamp(0.95rem, 1.25vw, 1.08rem)',
              }}
            >
              {body}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.26}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            {primary && (
              <Link className="btn btn-solid" to={primary.to}>
                {primary.label}
                <ArrowUpRight size={15} />
              </Link>
            )}
            {secondary && (
              <Link className="btn btn-ghost" to={secondary.to}>
                {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.34}>
          <p
            className="mono"
            style={{
              marginTop: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontSize: '0.62rem',
              letterSpacing: '0.32em',
              color: 'var(--faint)',
              textTransform: 'uppercase',
            }}
          >
            {FESTIVAL.datesShort} // {FESTIVAL.tagline.join(' ')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

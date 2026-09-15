import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, Home as HomeIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { FESTIVAL } from '../data/content';
import { PRIMARY_NAV, ROUTES } from '../data/pages';
import { useIsMobile } from '../hooks/useMediaQuery';

// Reuses the existing lightweight inner-page scene — no new 3D system.
const AmbientScene = lazy(() => import('../components/three/AmbientScene'));

const EASE = [0.22, 1, 0.36, 1];

function Line({ children, delay = 0, className = '', style = {} }) {
  return (
    <span style={{ display: 'block', overflow: 'hidden' }}>
      <motion.span
        className={className}
        style={{ display: 'block', ...style }}
        initial={{ y: '112%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function NotFoundPage() {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'calc(var(--nav-h) + clamp(3rem, 8vh, 6rem))',
        paddingBottom: 'clamp(4rem, 9vh, 7rem)',
      }}
    >
      {/* Atmosphere — identical language to the rest of the platform */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(115% 90% at 72% 20%, #0c1226 0%, #070a14 48%, #05060a 100%)',
        }}
      />
      <div className="aurora" />

      <Suspense fallback={null}>
        <AmbientScene
          variant="icosa"
          hue="magenta"
          quality={isMobile ? 'low' : 'high'}
          offset={isMobile ? [0, 1.8, -1.5] : [3.2, 0.1, 0]}
        />
      </Suspense>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(5,6,10,0.72) 0%, transparent 32%, rgba(5,6,10,0.82) 100%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
        {/* Status label */}
        <Line delay={0.12}>
          <span className="label">ERROR / 404</span>
        </Line>

        {/* Monumental code */}
        <h1
          className="display"
          style={{
            marginTop: 'clamp(1.2rem, 3vh, 2rem)',
            fontSize: 'clamp(5rem, 22vw, 18rem)',
            lineHeight: 0.86,
            letterSpacing: '-0.03em',
          }}
        >
          <Line delay={0.22}>
            <span className="grad-text" style={{ filter: 'drop-shadow(0 0 40px rgba(232,121,249,0.32))' }}>
              404
            </span>
          </Line>
        </h1>

        {/* Message */}
        <div className="display" style={{ marginTop: 'clamp(1rem, 3vh, 2rem)', fontSize: 'clamp(1.5rem, 5.4vw, 4.4rem)' }}>
          <Line delay={0.36}>SIGNAL LOST.</Line>
          <Line delay={0.46} className="outline-text">
            THE PRAVAH FLOW
          </Line>
          <Line delay={0.56}>HAS MOVED.</Line>
        </div>

        {/* Detail */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.95, ease: EASE }}
          style={{
            marginTop: 'clamp(1.4rem, 3vh, 2.2rem)',
            maxWidth: '52ch',
            color: 'var(--muted)',
            fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
            lineHeight: 1.8,
          }}
        >
          The page you were looking for is not part of the {FESTIVAL.name} {FESTIVAL.edition}{' '}
          platform — it may have been moved, renamed, or never existed in this current.
        </motion.p>

        {/* Requested path readout */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.82, duration: 0.9 }}
          className="mono"
          style={{
            marginTop: '1.1rem',
            fontSize: '0.66rem',
            letterSpacing: '0.2em',
            color: 'var(--faint)',
            wordBreak: 'break-all',
          }}
        >
          REQUESTED ROUTE: <span style={{ color: 'var(--magenta)' }}>{pathname}</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: 'clamp(1.8rem, 4vh, 2.8rem)' }}
        >
          <Link className="btn btn-solid" to={ROUTES.home}>
            <HomeIcon size={15} />
            BACK TO HOME
          </Link>
          <Link className="btn btn-ghost" to={ROUTES.events}>
            EXPLORE EVENTS
            <ArrowUpRight size={15} />
          </Link>
        </motion.div>

        {/* Recovery routes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 1 }}
          style={{ marginTop: 'clamp(2.4rem, 5vh, 3.6rem)' }}
        >
          <span
            className="mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              color: 'var(--faint)',
              textTransform: 'uppercase',
            }}
          >
            <Compass size={12} style={{ color: 'var(--cyan)' }} />
            OR REJOIN THE FLOW
          </span>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginTop: '1.1rem' }}>
            {PRIMARY_NAV.filter((item) => item.path !== ROUTES.home).map((item) => (
              <Link key={item.id} to={item.path} className="chip nf-chip" data-cursor style={{ cursor: 'pointer' }}>
                <span className="dot" />
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .nf-chip { transition: border-color 0.35s, color 0.35s, transform 0.4s cubic-bezier(0.22,1,0.36,1); }
        .nf-chip:hover { border-color: var(--cyan); color: var(--cyan); transform: translateY(-2px); }
      `}</style>
    </section>
  );
}

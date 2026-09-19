import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FESTIVAL } from '../data/content';
import { useIsMobile } from '../hooks/useMediaQuery';

const AmbientScene = lazy(() => import('./three/AmbientScene'));

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

// ============================================================
// PAGE HERO — shared inner-page hero.
// Same typographic scale, gradient language and 3D atmosphere as
// the homepage hero, at a calmer intensity so content leads.
// ============================================================
export default function PageHero({
  index,
  label,
  title = [],
  accentIndex = 1,
  intro,
  meta,
  variant = 'icosa',
  hue = 'cyan',
  breadcrumb = [],
  children,
  compact = false,
  titleFont,
}) {
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'calc(var(--nav-h) + clamp(3.5rem, 9vh, 7rem))',
        paddingBottom: compact ? 'clamp(3rem, 6vh, 5rem)' : 'clamp(4.5rem, 10vh, 8rem)',
        minHeight: compact ? 'auto' : '78svh',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid var(--line)',
      }}
    >
      {/* Atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(115% 85% at 78% 18%, #0c1226 0%, #070a14 48%, #05060a 100%)',
        }}
      />
      <div className="aurora" />

      <Suspense fallback={null}>
        <AmbientScene
          variant={variant}
          hue={hue}
          quality={isMobile ? 'low' : 'high'}
          offset={isMobile ? [0, 1.6, -1.5] : [3.1, 0.2, 0]}
        />
      </Suspense>

      {/* Legibility veil */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(5,6,10,0.7) 0%, transparent 30%, rgba(5,6,10,0.75) 100%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: 'clamp(1.2rem, 3vh, 2rem)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--faint)',
            }}
          >
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                {crumb.path ? (
                  <Link
                    to={crumb.path}
                    style={{ color: 'var(--muted)', transition: 'color 0.3s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ color: 'var(--ink)' }}>{crumb.label}</span>
                )}
                {i < breadcrumb.length - 1 && <ChevronRight size={11} style={{ opacity: 0.5 }} />}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Index / label */}
        <Line delay={0.14}>
          <span className="label">
            {index} / {label}
          </span>
        </Line>

        {/* Monumental title */}
        <h1
          className="display"
          style={{
            marginTop: 'clamp(1.2rem, 3vh, 2.2rem)',
            fontSize: title.some((t) => t.length > 13)
              ? 'clamp(2rem, 7vw, 6.2rem)'
              : 'clamp(2.6rem, 9.5vw, 8.6rem)',
            maxWidth: '18ch',
            fontFamily: titleFont || undefined,
          }}
        >
          {title.map((line, i) => (
            <Line
              key={line}
              delay={0.24 + i * 0.1}
              className={i === accentIndex ? 'grad-text' : ''}
              style={
                i === accentIndex
                  ? { filter: 'drop-shadow(0 0 30px rgba(139,92,246,0.3))' }
                  : {}
              }
            >
              {line}
            </Line>
          ))}
        </h1>

        {/* Intro */}
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.95, ease: EASE }}
            style={{
              marginTop: 'clamp(1.4rem, 3vh, 2.2rem)',
              maxWidth: '58ch',
              color: 'var(--muted)',
              fontSize: 'clamp(0.98rem, 1.35vw, 1.15rem)',
              lineHeight: 1.8,
            }}
          >
            {intro}
          </motion.p>
        )}

        {/* Meta strip */}
        {meta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.9, ease: EASE }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.7rem',
              marginTop: 'clamp(1.6rem, 3.5vh, 2.6rem)',
            }}
          >
            {meta.map((m) => (
              <span key={m} className="chip">
                <span className="dot" />
                {m}
              </span>
            ))}
          </motion.div>
        )}

        {/* Slot for CTAs */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
            style={{ marginTop: 'clamp(1.8rem, 4vh, 2.8rem)' }}
          >
            {children}
          </motion.div>
        )}

        {/* Festival signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mono"
          style={{
            marginTop: 'clamp(2rem, 5vh, 3.4rem)',
            fontSize: '0.62rem',
            letterSpacing: '0.32em',
            color: 'var(--faint)',
            textTransform: 'uppercase',
          }}
        >
          {FESTIVAL.datesShort} // {FESTIVAL.host}
        </motion.p>
      </div>
    </section>
  );
}

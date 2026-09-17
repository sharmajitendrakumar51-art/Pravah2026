import { lazy, Suspense, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Zap } from 'lucide-react';

// Code-split the WebGL scene so Three.js loads in its own chunk.
const HeroScene = lazy(() => import('../components/three/HeroScene'));
import { FESTIVAL } from '../data/content';
import { scrollToSection } from '../lib/scroll';
import { useIsMobile } from '../hooks/useMediaQuery';

const EASE = [0.22, 1, 0.36, 1];

function HeroLine({ children, delay, className = '', style = {} }) {
  return (
    <span style={{ display: 'block', overflow: 'hidden' }}>
      <motion.span
        className={className}
        style={{ display: 'block', ...style }}
        initial={{ y: '112%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.15, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const sceneScroll = useRef(0);

  // Camera dolly progress — shared with the WebGL scene.
  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height + window.innerHeight * 0.001;
        const progress = Math.min(Math.max(-rect.top / (total * 0.9), 0), 1);
        sceneScroll.current = progress;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Content parallax — hero type drifts up + fades as you scroll away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const typeY = useTransform(scrollYProgress, [0, 1], ['0%', '-34%']);
  const typeOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{ position: 'relative', height: '100svh', minHeight: '640px', overflow: 'hidden' }}
    >
      {/* Deep-space backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(120% 90% at 70% 20%, #0c1226 0%, #070a14 45%, #05060a 100%)',
        }}
      />
      <div className="aurora" />

      {/* 3D environment */}
      <Suspense fallback={null}>
        <HeroScene quality={isMobile ? 'low' : 'high'} scrollRef={sceneScroll} />
      </Suspense>

      {/* Legibility gradients */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(5,6,10,0.72) 0%, transparent 26%, transparent 62%, rgba(5,6,10,0.9) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 5,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: 'clamp(4.5rem, 9vh, 7rem)',
          y: typeY,
          opacity: typeOpacity,
        }}
        className="container"
      >
        {/* Eyebrow */}
        <motion.div style={{ opacity: metaOpacity, marginBottom: 'clamp(1.2rem, 3vh, 2.2rem)' }}>
          <HeroLine delay={0.15}>
            <span
              className="mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.9rem',
                fontSize: '0.72rem',
                letterSpacing: '0.34em',
                color: 'var(--muted)',
                textTransform: 'uppercase',
              }}
            >
              <Zap size={13} style={{ color: 'var(--cyan)' }} />
              {FESTIVAL.type} — {FESTIVAL.host}
            </span>
          </HeroLine>
        </motion.div>

        {/* Monumental wordmark */}
        <h1 className="display" style={{ userSelect: 'none' }}>
          <HeroLine delay={0.28} className="outline-text" style={{ fontSize: 'clamp(2.2rem, 7vw, 6rem)' }}>
            TECH
          </HeroLine>
          <HeroLine
            delay={0.4}
            style={{
              fontSize: 'clamp(4.2rem, 15.5vw, 14.5rem)',
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: '-0.015em',
            }}
          >
            <span className="grad-text" style={{ filter: 'drop-shadow(0 0 34px rgba(139,92,246,0.35))' }}>
              PRAVAH
            </span>
          </HeroLine>
          <HeroLine delay={0.52} style={{ fontSize: 'clamp(2.2rem, 7vw, 6rem)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5em', flexWrap: 'wrap' }}>
              <span className="outline-text">20</span>
              <span>26</span>
              <span
                className="mono"
                style={{
                  fontSize: 'clamp(0.62rem, 1.1vw, 0.8rem)',
                  letterSpacing: '0.3em',
                  color: 'var(--cyan)',
                  fontWeight: 400,
                  alignSelf: 'center',
                  paddingBottom: '0.4em',
                }}
              >
                {FESTIVAL.datesShort}
              </span>
            </span>
          </HeroLine>
        </h1>

        {/* Tagline + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 1, ease: EASE }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            marginTop: 'clamp(1.8rem, 4vh, 3rem)',
          }}
        >
          <p className="mono" style={{ fontSize: 'clamp(0.8rem, 1.4vw, 1rem)', letterSpacing: '0.18em', color: 'var(--muted)', lineHeight: 2 }}>
            {FESTIVAL.tagline[0]}
            <br />
            <span style={{ color: 'var(--ink)' }}>{FESTIVAL.tagline[1]}</span>
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button className="btn btn-solid" onClick={() => scrollToSection('#events')}>
              EXPLORE EVENTS
              <ArrowUpRight size={15} />
            </button>
            <button className="btn btn-ghost" onClick={() => scrollToSection('#register')}>
              REGISTER NOW
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToSection('#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="mono"
        style={{
          position: 'absolute',
          right: 'clamp(1.4rem, 4vw, 3.4rem)',
          bottom: 'clamp(4.5rem, 9vh, 7rem)',
          zIndex: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.9rem',
          fontSize: '0.62rem',
          letterSpacing: '0.4em',
          color: 'var(--muted)',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
        }}
      >
        SCROLL TO ENTER
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ writingMode: 'horizontal-tb' }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.button>

      {/* Side coordinates (desktop) */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mono"
          style={{
            position: 'absolute',
            left: 'clamp(1.4rem, 3vw, 2.6rem)',
            top: '50%',
            transform: 'translateY(-50%) rotate(180deg)',
            writingMode: 'vertical-rl',
            fontSize: '0.6rem',
            letterSpacing: '0.42em',
            color: 'var(--faint)',
            textTransform: 'uppercase',
            zIndex: 6,
          }}
        >
          26.2389° N — 73.0243° E // JAIPUR NODE ONLINE
        </motion.div>
      )}
    </section>
  );
}

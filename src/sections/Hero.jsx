import { lazy, Suspense, useEffect, useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
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

  // Cursor-reactive parallax for the PRAVAH wordmark.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springCfg = { stiffness: 140, damping: 18, mass: 0.5 };
  const logoRotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-16, 16]), springCfg);
  const logoRotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [11, -11]), springCfg);
  const logoTranslateX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-26, 26]), springCfg);
  const logoTranslateY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-16, 16]), springCfg);

  const handlePointerMove = (e) => {
    if (isMobile) return;
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ position: 'relative', minHeight: isMobile ? '100svh' : '100svh', height: isMobile ? 'auto' : '100svh', overflow: 'hidden' }}
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
          height: isMobile ? 'auto' : '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMobile ? 'flex-start' : 'center',
          paddingTop: 'calc(var(--nav-h) + clamp(0.1rem, 0.6vh, 0.4rem))',
          paddingBottom: isMobile ? '2.5rem' : 'clamp(1.5rem, 3.5vh, 2.8rem)',
          y: typeY,
          opacity: typeOpacity,
        }}
        className="container"
      >
        {/* Eyebrow */}
        <motion.div style={{ opacity: metaOpacity, marginBottom: isMobile ? '0.85rem' : 'clamp(0.7rem, 2.2vh, 1.6rem)' }}>
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
              {FESTIVAL.type} — Swami Keshvanand Institute of Technology, Management & Gramothan, Jaipur
            </span>
          </HeroLine>
        </motion.div>

        {/* Monumental wordmark */}
        <h1 className="display" style={{ userSelect: 'none' }}>
          <HeroLine delay={0.28} className="outline-text" style={{ fontSize: 'clamp(2.4rem, 6.4vw, 5.4rem)' }}>
            TECH
          </HeroLine>
          <HeroLine
            delay={0.4}
            style={{
              fontSize: 'clamp(4.2rem, 17.5vw, 16.8rem)',
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: '-0.015em',
            }}
          >
            <motion.img
              src="/PRAVAH_exact_same_image.svg"
              alt="PRAVAH"
              style={{
                display: 'block',
                width: 'auto',
                height: 'clamp(5.2rem, 17.5vw, 16.8rem)',
                rotateX: logoRotateX,
                rotateY: logoRotateY,
                x: logoTranslateX,
                y: logoTranslateY,
                transformPerspective: 1000,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                filter: 'drop-shadow(0 0 40px rgba(139,92,246,0.38))',
              }}
            />
          </HeroLine>
          <HeroLine delay={0.52} style={{ fontSize: 'clamp(2.4rem, 6.4vw, 5.4rem)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5em', flexWrap: 'wrap' }}>
              <span>2026</span>
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
            gap: '1.6rem',
            marginTop: 'clamp(1rem, 2.2vh, 1.8rem)',
          }}
        >
          <p className="mono" style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.96rem)', letterSpacing: '0.18em', color: 'var(--muted)', lineHeight: 1.8 }}>
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

        {/* Animated engineering circuit logo (right side / below content on mobile) */}
        <img
          className="hero-eng-logo"
          src="/pravah-animated-engineering-logo.svg"
          alt="PRAVAH animated engineering circuit logo"
          aria-hidden="true"
        />
      </motion.div>

      {/* Isolated styling for the engineering circuit logo — hero only */}
      <style>{`
        .hero-eng-logo {
          position: absolute;
          top: 50%;
          right: clamp(0rem, 2vw, 2.4rem);
          transform: translateY(-50%);
          width: clamp(230px, 27vw, 430px);
          height: auto;
          pointer-events: none;
          user-select: none;
          z-index: -1;
          filter: drop-shadow(0 0 40px rgba(32,168,202,0.22));
        }
        @media (max-width: 820px) {
          .hero-eng-logo {
            position: static;
            transform: none;
            z-index: auto;
            margin: clamp(1.2rem, 3vh, 2rem) auto 0;
            width: min(56vw, 220px);
          }
        }
      `}</style>
    </section>
  );
}

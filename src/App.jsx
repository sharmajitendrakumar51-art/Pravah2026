import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import FestivalIntro from './components/festival/FestivalIntro';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './sections/Footer';
import { setLenis } from './lib/scroll';

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import SchedulePage from './pages/SchedulePage';
import WorkshopsPage from './pages/WorkshopsPage';
import GalleryPage from './pages/GalleryPage';
import TeamPage from './pages/TeamPage';
import SponsorsPage from './pages/SponsorsPage';
import RegisterPage from './pages/RegisterPage';
import RulebookPage from './pages/RulebookPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';

gsap.registerPlugin(ScrollTrigger);

// Play the cinematic intro on every load of the base URL (the landing
// route) only. It is evaluated once when the app first mounts, so client-side
// navigation between routes never replays it — only an actual page load of
// "/" (e.g. a refresh) triggers it.
function shouldPlayIntro() {
  if (typeof window === 'undefined') return false;
  return window.location.pathname === '/';
}

export default function App() {
  // playIntro is captured once so route changes never retrigger the intro.
  const [playIntro] = useState(shouldPlayIntro);
  // revealed → homepage is visible; introDone → overlay has been removed.
  const [revealed, setRevealed] = useState(!playIntro);
  const [introDone, setIntroDone] = useState(!playIntro);

  const progressRef = useRef(null);
  const pageRef = useRef(null); // opacity wrapper (holds the fixed Navbar)
  const revealRef = useRef(null); // transient scale wrapper (main + footer)
  const location = useLocation();

  // Global scroll progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  useEffect(() => {
    const unsub = progress.on('change', (v) => {
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${v})`;
      }
    });
    return unsub;
  }, [progress]);

  // Smooth-scroll engine + ScrollTrigger sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    setLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Recalculate pins once webfonts settle (metrics shift)
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    const t = setTimeout(refresh, 900);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
      clearTimeout(t);
    };
  }, []);

  // Freeze the page (and block interaction) while the intro overlay is up.
  // Keyed on introDone so scrolling is restored only once the overlay is
  // actually removed — after completion, Skip, resize-abort, or failure.
  useEffect(() => {
    const lenis = window.__lenis;
    const pageEl = pageRef.current;
    if (!introDone) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      if (pageEl) pageEl.inert = true; // keep focus out of the hidden page
    } else {
      lenis?.start();
      document.body.style.overflow = '';
      if (pageEl) pageEl.inert = false;
      ScrollTrigger.refresh();
    }
  }, [introDone]);

  // Phase D — gentle homepage scale (1.04 → 1) on reveal. Applied to an
  // inner wrapper WITHOUT the fixed navbar, and the transform is cleared on
  // completion so it can never alter fixed-positioning afterwards. Skipped
  // for reduced motion and when the intro never played.
  useEffect(() => {
    if (!revealed || !playIntro) return;
    const el = revealRef.current;
    if (!el) return;
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const anim = gsap.fromTo(
      el,
      { scale: 1.04 },
      { scale: 1, duration: 0.9, ease: 'power2.out', clearProps: 'transform' }
    );
    return () => anim.kill();
  }, [revealed, playIntro]);

  // Dev-only replay hook: run window.__replayIntro() in the console.
  useEffect(() => {
    if (!import.meta.env?.DEV) return;
    window.__replayIntro = () => {
      setIntroDone(false);
      setRevealed(false);
    };
    return () => {
      delete window.__replayIntro;
    };
  }, []);

  return (
    <div className="noise" style={{ background: 'var(--bg)', minHeight: '100svh' }}>
      <Cursor />
      <ScrollToTop />

      {/* Intro overlay is a SIBLING of the page wrapper (never a descendant)
          so the page's transient reveal transform cannot shift the fixed
          overlay's positioning. It removes itself once complete. */}
      {!introDone && (
        <FestivalIntro
          onReveal={() => setRevealed(true)}
          onComplete={() => setIntroDone(true)}
        />
      )}

      <div ref={progressRef} className="scroll-progress" style={{ transform: 'scaleX(0)' }} />

      <motion.div
        ref={pageRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <Navbar />

        {/* Transient reveal-scale wrapper — excludes the fixed Navbar. */}
        <div ref={revealRef} style={{ transformOrigin: 'center center' }}>
          {/* Route transition: soft cross-fade so the 3D atmosphere
              never hard-cuts between pages. */}
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home active={revealed || introDone} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:slug" element={<EventDetailPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/workshops" element={<WorkshopsPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/sponsors" element={<SponsorsPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/rulebook" element={<RulebookPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<LegalPage pageKey="privacy" />} />
                <Route path="/terms" element={<LegalPage pageKey="terms" />} />
                <Route path="/refund" element={<LegalPage pageKey="refund" />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </motion.main>
          </AnimatePresence>

          <Footer />
        </div>
      </motion.div>
    </div>
  );
}

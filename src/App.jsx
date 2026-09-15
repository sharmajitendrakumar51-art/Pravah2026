import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
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

export default function App() {
  const [booted, setBooted] = useState(false);
  const progressRef = useRef(null);
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

  // Freeze page behind the preloader
  useEffect(() => {
    const lenis = window.__lenis;
    if (!booted) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
      ScrollTrigger.refresh();
    }
  }, [booted]);

  return (
    <div className="noise" style={{ background: 'var(--bg)', minHeight: '100svh' }}>
      <Cursor />
      <ScrollToTop />

      <AnimatePresence>
        {!booted && <Preloader onDone={() => setBooted(true)} />}
      </AnimatePresence>

      <div ref={progressRef} className="scroll-progress" style={{ transform: 'scaleX(0)' }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <Navbar />

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
              <Route path="/" element={<Home />} />
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
      </motion.div>
    </div>
  );
}

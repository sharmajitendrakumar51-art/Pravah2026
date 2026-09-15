import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '../lib/scroll';

// Resets scroll position and recalculates pinned triggers on every
// route change — required because Lenis + ScrollTrigger keep their
// own scroll state across navigation.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [pathname]);

  return null;
}

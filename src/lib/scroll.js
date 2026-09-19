// Shared smooth-scroll helpers.
// The Lenis instance lives on window so any component can scrollTo
// without prop drilling.

export function setLenis(lenis) {
  if (typeof window !== 'undefined') window.__lenis = lenis;
}

export function getLenis() {
  return typeof window !== 'undefined' ? window.__lenis : null;
}

export function scrollToSection(target, offset = -88) {
  const lenis = getLenis();
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.5 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export function scrollToTop() {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0, { duration: 1.6 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

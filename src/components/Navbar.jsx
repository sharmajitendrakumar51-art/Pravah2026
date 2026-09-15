import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FESTIVAL, NAV } from '../data/content';
import { PRIMARY_NAV, ROUTES, SECONDARY_NAV } from '../data/pages';
import { scrollToSection } from '../lib/scroll';

const EASE = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  // Transform on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy — only meaningful on the single-scroll homepage
  useEffect(() => {
    if (!isHome) return;
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-38% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  // Lock scroll while overlay is open
  useEffect(() => {
    const lenis = window.__lenis;
    if (open) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
  }, [open]);

  // Close overlay whenever the route changes
  useEffect(() => setOpen(false), [location.pathname]);

  const isActive = (item) => {
    if (isHome) {
      // On the homepage, highlight whichever section is in view.
      return activeSection === item.id;
    }
    if (item.path === '/') return false;
    return location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
  };

  // Homepage nav items scroll to their section; from any other route
  // they navigate to the dedicated page.
  const handleNavClick = (item) => (e) => {
    if (isHome && document.getElementById(item.id)) {
      e.preventDefault();
      setOpen(false);
      setTimeout(() => scrollToSection(`#${item.id}`), open ? 340 : 0);
    } else {
      setOpen(false);
    }
  };

  const goRoute = (path) => {
    setOpen(false);
    setTimeout(() => navigate(path), open ? 320 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 1, ease: EASE }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          transition: 'background 0.5s, border-color 0.5s, backdrop-filter 0.5s',
          background: scrolled || !isHome ? 'rgba(5, 6, 10, 0.62)' : 'transparent',
          backdropFilter: scrolled || !isHome ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled || !isHome ? 'blur(18px)' : 'none',
          borderBottom: `1px solid ${scrolled || !isHome ? 'var(--line)' : 'transparent'}`,
        }}
      >
        <div
          className="container"
          style={{
            height: 'var(--nav-h)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          {/* Brand */}
          <Link
            to={ROUTES.home}
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}
            aria-label="Techno Pravah 2026 — home"
          >
            <span
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: '#f4f6ff',
                display: 'grid',
                placeItems: 'center',
                padding: 4,
                boxShadow: scrolled ? '0 0 24px rgba(34,211,238,0.25)' : 'none',
                transition: 'box-shadow 0.5s',
              }}
            >
              <img src="/skit-logo.png" alt="SKIT logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </span>
            <span style={{ textAlign: 'left', lineHeight: 1.15 }}>
              <span className="display" style={{ fontSize: '0.95rem', letterSpacing: '0.08em', display: 'block' }}>
                PRAVAH <span className="grad-text">2026</span>
              </span>
              <span className="mono" style={{ fontSize: '0.56rem', letterSpacing: '0.3em', color: 'var(--muted)', display: 'block' }}>
                {FESTIVAL.host}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="mono nav-desktop"
            style={{
              display: 'flex',
              gap: 'clamp(0.9rem, 1.8vw, 1.8rem)',
              fontSize: '0.68rem',
              letterSpacing: '0.22em',
            }}
            aria-label="Primary"
          >
            {PRIMARY_NAV.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={handleNavClick(item)}
                  style={{
                    position: 'relative',
                    padding: '0.4rem 0.1rem',
                    color: active ? 'var(--cyan)' : 'var(--muted)',
                    transition: 'color 0.35s',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 1,
                      background: 'var(--grad)',
                      transform: active ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: '0 50%',
                      transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
            <Link
              className="btn btn-solid nav-cta"
              style={{ padding: '0.72rem 1.4rem', fontSize: '0.68rem' }}
              to={ROUTES.register}
            >
              REGISTER
              <ArrowUpRight size={13} />
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              style={{
                display: 'none',
                width: 44,
                height: 44,
                borderRadius: 12,
                border: '1px solid var(--line-strong)',
                placeItems: 'center',
                position: 'relative',
                zIndex: 1300,
              }}
              className="nav-burger"
            >
              <span style={{ display: 'grid', gap: 5 }}>
                <span
                  style={{
                    width: 18,
                    height: 1.6,
                    background: 'var(--ink)',
                    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                    transform: open ? 'translateY(3.3px) rotate(45deg)' : 'none',
                  }}
                />
                <span
                  style={{
                    width: 18,
                    height: 1.6,
                    background: 'var(--ink)',
                    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                    transform: open ? 'translateY(-3.3px) rotate(-45deg)' : 'none',
                  }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen navigation overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 38px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 38px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 38px)' }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1250,
              background: 'linear-gradient(160deg, #0a0e1c 0%, #05060a 70%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.5rem',
              padding: 'clamp(1.4rem, 5vw, 2.6rem)',
              paddingTop: 'calc(var(--nav-h) + 0.6rem)',
              overflowY: 'auto',
            }}
          >
            <div className="aurora" />

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', position: 'relative', zIndex: 2 }}>
              {PRIMARY_NAV.map((item, i) => (
                <span key={item.id} style={{ overflow: 'hidden' }}>
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%', transition: { duration: 0.3 } }}
                    transition={{ delay: 0.14 + i * 0.05, duration: 0.7, ease: EASE }}
                    style={{ display: 'block' }}
                  >
                    <Link
                      to={item.path}
                      onClick={handleNavClick(item)}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '1.1rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: 'clamp(1.5rem, 6.4vw, 3rem)',
                        textTransform: 'uppercase',
                        lineHeight: 1.28,
                        color: isActive(item) ? 'var(--cyan)' : 'var(--ink)',
                        transition: 'color 0.3s',
                      }}
                    >
                      <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--faint)', letterSpacing: '0.2em' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </Link>
                  </motion.span>
                </span>
              ))}
            </nav>

            {/* Secondary routes */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.6rem',
                position: 'relative',
                zIndex: 2,
                paddingTop: '1.2rem',
                borderTop: '1px solid var(--line)',
              }}
            >
              {SECONDARY_NAV.map((item) => (
                <button
                  key={item.id}
                  className="chip"
                  onClick={() => goRoute(item.path)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="dot" />
                  {item.label}
                </button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.58, duration: 0.7, ease: EASE }}
              style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 2 }}
            >
              <div>
                <p className="mono" style={{ fontSize: '0.62rem', letterSpacing: '0.3em', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  {FESTIVAL.datesShort}
                </p>
                <p className="display" style={{ fontSize: 'clamp(0.85rem, 3vw, 1.2rem)', marginTop: '0.5rem' }}>
                  {FESTIVAL.tagline[0]} {FESTIVAL.tagline[1]}
                </p>
              </div>
              <button className="btn btn-solid" onClick={() => goRoute(ROUTES.register)}>
                REGISTER NOW
                <ArrowUpRight size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1180px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: grid !important; }
        }
        @media (max-width: 520px) {
          .nav-cta { display: none !important; }
        }
      `}</style>
    </>
  );
}

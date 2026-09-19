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
        className={`site-header${scrolled || !isHome ? ' is-scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          transition: 'background 0.5s, border-color 0.5s, backdrop-filter 0.5s',
          background: scrolled || !isHome ? 'rgba(6, 12, 26, 0.74)' : 'rgba(6, 12, 26, 0.34)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: `1px solid ${scrolled || !isHome ? 'rgba(22,119,255,0.30)' : 'rgba(22,119,255,0.14)'}`,
        }}
      >
        <div
          className="container"
          style={{
            height: 'var(--nav-h)',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          {/* Brand */}
          <Link
            to={ROUTES.home}
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0, gridColumn: 1, justifySelf: 'start' }}
            aria-label="Tech Pravah 2026 — home"
          >
            <span
              style={{
                width: 50,
                height: 50,
                borderRadius: 16,
                background: '#f4f6ff',
                display: 'grid',
                placeItems: 'center',
                padding: 3,
                border: '1px solid rgba(22,119,255,0.28)',
                boxShadow: scrolled ? '0 0 22px rgba(22,119,255,0.35)' : '0 0 12px rgba(22,119,255,0.18)',
                transition: 'box-shadow 0.5s, border-color 0.5s',
              }}
            >
              <img src="/skit-logo.png" alt="SKIT logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </span>
            <span style={{ textAlign: 'left', lineHeight: 1.15 }}>
              <span className="display" style={{ fontSize: '1.05rem', letterSpacing: '0.09em', display: 'block' }}>
                PRAVAH <span className="grad-text">2026</span>
              </span>
              <span className="mono" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--muted)', display: 'block' }}>
                {FESTIVAL.host}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="mono nav-desktop"
            style={{
              display: 'flex',
              gap: 'clamp(0.3rem, 0.9vw, 0.75rem)',
              fontSize: '0.74rem',
              letterSpacing: '0.2em',
              gridColumn: 2,
              justifySelf: 'center',
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
                  className={`nav-link${active ? ' is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0, gridColumn: 3, justifySelf: 'end' }}>
            <Link
              className="nav-btn nav-register nav-cta"
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
                width: 46,
                height: 46,
                borderRadius: 12,
                border: '1px solid rgba(22,119,255,0.45)',
                background: 'rgba(22,119,255,0.08)',
                boxShadow: '0 0 16px rgba(22,119,255,0.25)',
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
                        color: isActive(item) ? '#1677FF' : 'var(--ink)',
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
              <button className="nav-btn nav-register" onClick={() => goRoute(ROUTES.register)}>
                REGISTER NOW
                <ArrowUpRight size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .site-header::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 1px;
          background: linear-gradient(90deg, transparent 6%, rgba(0,102,255,0.45), rgba(22,119,255,0.6), rgba(0,102,255,0.45), transparent 94%);
          opacity: 0;
          transition: opacity 0.6s var(--ease-out);
          pointer-events: none;
        }
        .site-header.is-scrolled::after { opacity: 1; }

        .nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 0.6rem 1.15rem;
          border-radius: 999px;
          color: rgba(207,222,255,0.7);
          border: 1px solid transparent;
          background: transparent;
          text-transform: uppercase;
          white-space: nowrap;
          transition: color 0.3s var(--ease-out), border-color 0.3s var(--ease-out), background 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out), transform 0.3s var(--ease-out);
        }
        .nav-link:hover {
          color: #eaf2ff;
          border-color: rgba(22,119,255,0.5);
          background: rgba(22,119,255,0.08);
          box-shadow: 0 0 16px rgba(22,119,255,0.3);
          transform: translateY(-1px);
        }
        .nav-link.is-active {
          color: #ffffff;
          border-color: rgba(22,119,255,0.9);
          background: rgba(22,119,255,0.14);
          box-shadow: 0 0 22px rgba(22,119,255,0.5), inset 0 0 12px rgba(22,119,255,0.18);
        }

        .nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          white-space: nowrap;
          cursor: pointer;
          transition: color 0.3s var(--ease-out), border-color 0.3s var(--ease-out), background 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out), transform 0.3s var(--ease-out);
        }
        .nav-login {
          padding: 0.72rem 1.35rem;
          color: #cfe0ff;
          border: 1px solid rgba(22,119,255,0.5);
          background: rgba(22,119,255,0.06);
        }
        .nav-login:hover {
          color: #ffffff;
          border-color: #1677FF;
          background: rgba(22,119,255,0.16);
          box-shadow: 0 0 20px rgba(22,119,255,0.5);
          transform: translateY(-1px);
        }
        .nav-register {
          padding: 0.78rem 1.5rem;
          color: #ffffff;
          border: 1px solid rgba(120,180,255,0.7);
          background: linear-gradient(120deg, #0066FF 0%, #1677FF 100%);
          box-shadow: 0 0 18px rgba(22,119,255,0.4);
        }
        .nav-register:hover {
          box-shadow: 0 0 28px rgba(22,119,255,0.65);
          transform: translateY(-1px);
        }

        @media (max-width: 1180px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: grid !important; }
        }
        @media (max-width: 640px) {
          .nav-cta { display: none !important; }
        }
      `}</style>
    </>
  );
}

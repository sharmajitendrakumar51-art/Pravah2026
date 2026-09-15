import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { FESTIVAL } from '../data/content';
import { LEGAL_NAV, PRIMARY_NAV, ROUTES, SECONDARY_NAV } from '../data/pages';
import { scrollToTop } from '../lib/scroll';

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="mono"
      style={{
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        color: 'var(--muted)',
        textTransform: 'uppercase',
        transition: 'color 0.3s',
        display: 'block',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
    >
      {children}
    </Link>
  );
}

function ColumnTitle({ children }) {
  return (
    <p
      className="mono"
      style={{
        fontSize: '0.62rem',
        letterSpacing: '0.3em',
        color: 'var(--faint)',
        marginBottom: '1.2rem',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </p>
  );
}

export default function Footer() {
  return (
    <footer className="hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
      <div className="aurora" />
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 'clamp(4rem, 8vw, 7rem)' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
            alignItems: 'start',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          {/* Brand block */}
          <div style={{ maxWidth: 380, gridColumn: 'span 1' }}>
            <Link to={ROUTES.home} style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: '#f4f6ff',
                  display: 'grid',
                  placeItems: 'center',
                  padding: 4,
                  flexShrink: 0,
                }}
              >
                <img src="/skit-logo.png" alt="SKIT logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </span>
              <span>
                <span className="display" style={{ fontSize: '1rem', display: 'block' }}>TECHNO PRAVAH 2026</span>
                <span className="mono" style={{ fontSize: '0.58rem', letterSpacing: '0.28em', color: 'var(--muted)', marginTop: '0.3rem', display: 'block' }}>
                  {FESTIVAL.host}
                </span>
              </span>
            </Link>
            <p style={{ color: 'var(--muted)', marginTop: '1.4rem', lineHeight: 1.8, fontSize: '0.92rem' }}>
              {FESTIVAL.meaning}
            </p>
            <button className="btn btn-ghost" style={{ marginTop: '1.6rem', padding: '0.75rem 1.4rem', fontSize: '0.64rem' }} onClick={scrollToTop}>
              BACK TO SURFACE
              <ArrowUp size={13} />
            </button>
          </div>

          {/* Explore */}
          <div>
            <ColumnTitle>EXPLORE</ColumnTitle>
            <nav style={{ display: 'grid', gap: '0.62rem' }}>
              {PRIMARY_NAV.map((item) => (
                <FooterLink key={item.id} to={item.path}>
                  {item.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Festival */}
          <div>
            <ColumnTitle>FESTIVAL</ColumnTitle>
            <nav style={{ display: 'grid', gap: '0.62rem' }}>
              {SECONDARY_NAV.map((item) => (
                <FooterLink key={item.id} to={item.path}>
                  {item.label}
                </FooterLink>
              ))}
              <FooterLink to={ROUTES.events}>ALL ARENAS</FooterLink>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <ColumnTitle>LEGAL</ColumnTitle>
            <nav style={{ display: 'grid', gap: '0.62rem' }}>
              {LEGAL_NAV.map((item) => (
                <FooterLink key={item.id} to={item.path}>
                  {item.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Transmission */}
          <div>
            <ColumnTitle>TRANSMISSION</ColumnTitle>
            <p className="mono" style={{ fontSize: '0.74rem', letterSpacing: '0.18em', color: 'var(--muted)', lineHeight: 2.2 }}>
              {FESTIVAL.datesShort}
              <br />
              {FESTIVAL.tagline[0]}
              <br />
              {FESTIVAL.tagline[1]}
            </p>
            <span className="chip" style={{ marginTop: '1.2rem' }}>
              <span className="dot" />
              SOCIALS COMING SOON
            </span>
          </div>
        </div>

        {/* Monumental wordmark */}
        <Reveal y={60}>
          <p
            className="display"
            aria-hidden="true"
            style={{
              fontSize: 'clamp(3.4rem, 13.5vw, 13rem)',
              textAlign: 'center',
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(226,232,255,0.14)',
              userSelect: 'none',
              paddingBottom: 'clamp(1rem, 2vw, 2rem)',
              whiteSpace: 'nowrap',
            }}
          >
            PRAVAH
            <span
              style={{
                WebkitTextStroke: '0px',
                background: 'var(--grad)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              2026
            </span>
          </p>
        </Reveal>

        {/* Bottom bar */}
        <div
          className="hairline-t"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingBlock: '1.6rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.24em',
            color: 'var(--faint)',
            textTransform: 'uppercase',
          }}
        >
          <span>© 2026 TECHNO PRAVAH — {FESTIVAL.host}</span>
          <span>DESIGNED AS A DIGITAL FESTIVAL EXPERIENCE</span>
        </div>
      </div>
    </footer>
  );
}

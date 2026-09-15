import { Link, Navigate } from 'react-router-dom';
import { FileText, Scale } from 'lucide-react';
import Accordion from '../components/Accordion';
import ComingSoon from '../components/ComingSoon';
import CtaBand from '../components/CtaBand';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { FESTIVAL } from '../data/content';
import { LEGAL_PAGES, LEGAL_NAV, ROUTES } from '../data/pages';

// ============================================================
// LEGAL PAGE — one reusable component for /privacy, /terms and
// /refund. Content is selected by route via `pageKey`.
//
// No policy text is fabricated: each page renders its official
// section structure, and every section that has not been released
// shows CONTENT COMING SOON. Readability is prioritised — narrower
// measure, larger line-height, calmer 3D presence.
// ============================================================

const HUES = {
  privacy: 'cyan',
  terms: 'violet',
  refund: 'amber',
};

const SHAPES = {
  privacy: 'dodeca',
  terms: 'box',
  refund: 'octa',
};

export default function LegalPage({ pageKey }) {
  const page = LEGAL_PAGES[pageKey];

  // Unknown key → home (never a dead end).
  if (!page) return <Navigate to={ROUTES.home} replace />;

  const hue = HUES[pageKey] ?? 'cyan';

  // Section records: official text is not authored here, so each
  // entry carries no body and renders its pending state.
  const items = page.sections.map((title, i) => ({
    id: `${pageKey}-${i}`,
    n: String(i + 1).padStart(2, '0'),
    title,
    items: [],
    note: `This section of the official ${page.label.toLowerCase()} has not been published yet.`,
  }));

  return (
    <>
      <PageHero
        index={page.index}
        label={page.label}
        title={page.title}
        accentIndex={1}
        intro={page.intro}
        meta={[`${String(page.sections.length).padStart(2, '0')} SECTIONS`, 'CONTENT COMING SOON']}
        variant={SHAPES[pageKey] ?? 'dodeca'}
        hue={hue}
        compact
        breadcrumb={[
          { label: 'HOME', path: ROUTES.home },
          { label: 'LEGAL' },
          { label: page.label },
        ]}
      />

      {/* ---------------------------------------------- STATUS */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>
          <ComingSoon
            icon={Scale}
            label={page.label}
            title="CONTENT COMING SOON"
            note={`The official ${page.label.toLowerCase()} for ${FESTIVAL.name} ${FESTIVAL.edition} is being finalised by ${FESTIVAL.host}. The section structure below is final; each section publishes as it is approved.`}
            size="lg"
            accent={hue}
          />
        </div>
      </section>

      {/* ---------------------------------------------- SECTION STRUCTURE */}
      <section
        className="section hairline-t"
        style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}
      >
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        {/* Reading column — deliberately narrow for legibility */}
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 980 }}>
          <SectionHeader
            index="01"
            label="DOCUMENT STRUCTURE"
            title={page.label}
            aside="Open any section to view its publication status."
          />

          <Accordion items={items} pendingLabel="CONTENT COMING SOON" />

          <Reveal delay={0.1}>
            <div
              style={{
                marginTop: 'clamp(2rem, 4vw, 3rem)',
                padding: 'clamp(1.3rem, 2.4vw, 2rem)',
                border: '1px dashed var(--line-strong)',
                borderRadius: 16,
                background: 'rgba(10,13,24,0.4)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 13,
                  border: '1px solid var(--line-strong)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--cyan)',
                  flexShrink: 0,
                }}
              >
                <FileText size={17} strokeWidth={1.5} />
              </span>
              <p style={{ color: 'var(--muted)', lineHeight: 1.85, maxWidth: '62ch', fontSize: 'clamp(0.9rem, 1.15vw, 1rem)' }}>
                This document is published by the organising committee of{' '}
                <span style={{ color: 'var(--ink)' }}>{FESTIVAL.hostFull}</span>. Once released, the
                official text on this page is authoritative. Any amendment will be reflected here.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------- OTHER LEGAL DOCS */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 980 }}>
          <SectionHeader index="02" label="RELATED DOCUMENTS" title="ALSO IN LEGAL" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: 'clamp(0.9rem, 1.6vw, 1.3rem)',
            }}
          >
            {LEGAL_NAV.map((doc, i) => {
              const isCurrent = doc.path === `/${pageKey}`;
              return (
                <Reveal key={doc.id} delay={i * 0.07}>
                  <Link
                    to={doc.path}
                    data-cursor
                    className="legal-link"
                    aria-current={isCurrent ? 'page' : undefined}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.7rem',
                      padding: 'clamp(1.2rem, 2.2vw, 1.7rem)',
                      borderRadius: 16,
                      border: `1px solid ${isCurrent ? 'var(--cyan)' : 'var(--line)'}`,
                      background: isCurrent ? 'rgba(34,211,238,0.06)' : 'rgba(10,13,24,0.45)',
                      transition: 'border-color 0.4s, transform 0.45s cubic-bezier(0.22,1,0.36,1)',
                      height: '100%',
                    }}
                  >
                    <span className="mono" style={{ fontSize: '0.56rem', letterSpacing: '0.24em', color: 'var(--faint)' }}>
                      {LEGAL_PAGES[doc.id]?.index ?? String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="display" style={{ fontSize: 'clamp(0.92rem, 1.5vw, 1.15rem)', lineHeight: 1.3 }}>
                      {doc.label}
                    </span>
                    <span className="mono" style={{ fontSize: '0.54rem', letterSpacing: '0.22em', color: isCurrent ? 'var(--cyan)' : 'var(--muted)', textTransform: 'uppercase' }}>
                      {isCurrent ? 'CURRENTLY VIEWING' : 'VIEW DOCUMENT'}
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="QUESTIONS?"
        title={['ASK THE', 'ORGANISERS.']}
        body="For clarifications on any published document, reach the festival desk."
        primary={{ label: 'CONTACT US', to: ROUTES.contact }}
        secondary={{ label: 'VIEW RULEBOOK', to: ROUTES.rulebook }}
      />

      <style>{`
        .legal-link:hover { border-color: var(--cyan) !important; transform: translateY(-4px); }
      `}</style>
    </>
  );
}

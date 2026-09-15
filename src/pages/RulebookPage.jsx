import { motion } from 'framer-motion';
import { Download, FileText, ScrollText, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import Accordion from '../components/Accordion';
import ComingSoon from '../components/ComingSoon';
import CtaBand from '../components/CtaBand';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { FESTIVAL } from '../data/content';
import { ROUTES, RULEBOOK_FILE, RULEBOOK_SECTIONS } from '../data/pages';

export default function RulebookPage() {
  const hasFile = Boolean(RULEBOOK_FILE);
  const publishedSections = RULEBOOK_SECTIONS.filter((s) => s.items.length > 0).length;

  return (
    <>
      <PageHero
        index="10"
        label="RULEBOOK"
        title={['PRAVAH 2026', 'RULEBOOK.']}
        accentIndex={1}
        intro="The official rules governing participation, judging and conduct at Techno Pravah 2026. Published by the organising committee — nothing here is provisional."
        meta={[`${String(RULEBOOK_SECTIONS.length).padStart(2, '0')} SECTIONS`, 'RULEBOOK COMING SOON']}
        variant="box"
        hue="cyan"
        breadcrumb={[{ label: 'HOME', path: ROUTES.home }, { label: 'RULEBOOK' }]}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          {hasFile ? (
            <a className="btn btn-solid" href={RULEBOOK_FILE} download>
              <Download size={15} />
              DOWNLOAD RULEBOOK
            </a>
          ) : (
            <button className="btn btn-solid" disabled>
              <FileText size={15} />
              RULEBOOK COMING SOON
            </button>
          )}
          <span className="chip amber">
            <span className="dot" />
            {publishedSections > 0
              ? `${String(publishedSections).padStart(2, '0')} / ${String(RULEBOOK_SECTIONS.length).padStart(2, '0')} SECTIONS PUBLISHED`
              : 'AWAITING PUBLICATION'}
          </span>
        </div>
      </PageHero>

      {/* ---------------------------------------------- STATUS */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ComingSoon
            icon={ScrollText}
            label="OFFICIAL RULEBOOK"
            title="RULEBOOK COMING SOON"
            note={`The complete rulebook for ${FESTIVAL.name} ${FESTIVAL.edition} is being finalised. The structure below shows exactly how it will be organised — each section publishes as it is approved.`}
            size="lg"
          />
        </div>
      </section>

      {/* ---------------------------------------------- STRUCTURE */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 1160 }}>
          <SectionHeader
            index="01"
            label="RULEBOOK STRUCTURE"
            title={<>NINE <span className="grad-text">SECTIONS</span></>}
            aside="Open any section to see its publication status. Approved content appears here automatically."
          />

          <Accordion
            items={RULEBOOK_SECTIONS.map((s) => ({
              id: s.id,
              n: s.n,
              title: s.title,
              items: s.items,
              note: 'This section of the official rulebook has not been released yet.',
            }))}
            pendingLabel="SECTION COMING SOON"
          />
        </div>
      </section>

      {/* ---------------------------------------------- NOTICES */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader index="02" label="IMPORTANT" title="BEFORE YOU COMPETE" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(1.1rem, 2vw, 1.7rem)',
            }}
          >
            {[
              {
                Icon: ShieldAlert,
                title: 'RULES ARE BINDING',
                body: 'Once published, the official rulebook is final and binding for all participants across every arena.',
              },
              {
                Icon: ScrollText,
                title: 'ARENA-SPECIFIC RULES',
                body: 'Each of the eight arenas carries its own event rules in addition to the general rules.',
              },
              {
                Icon: FileText,
                title: 'UPDATES',
                body: 'Any amendment issued by the organising committee will be reflected on this page.',
              },
            ].map((note, i) => (
              <motion.div
                key={note.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.09, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="glass"
                data-cursor
                style={{ padding: 'clamp(1.6rem, 2.6vw, 2.4rem)' }}
              >
                <span
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 15,
                    border: '1px solid var(--line-strong)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--cyan)',
                    background: 'rgba(34,211,238,0.06)',
                  }}
                >
                  <note.Icon size={21} strokeWidth={1.5} />
                </span>
                <p className="display" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', marginTop: '1.3rem' }}>{note.title}</p>
                <p style={{ color: 'var(--muted)', marginTop: '0.75rem', lineHeight: 1.75, fontSize: '0.93rem' }}>{note.body}</p>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', marginTop: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
              <Link to={ROUTES.terms} className="chip" style={{ cursor: 'pointer' }}>
                <span className="dot" /> TERMS &amp; CONDITIONS
              </Link>
              <Link to={ROUTES.events} className="chip" style={{ cursor: 'pointer' }}>
                <span className="dot" /> ARENA RULES BY EVENT
              </Link>
              <Link to={ROUTES.contact} className="chip" style={{ cursor: 'pointer' }}>
                <span className="dot" /> RULE CLARIFICATIONS
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="KNOW THE RULES"
        title={['THEN ENTER', 'THE ARENA.']}
        body="The rulebook publishes ahead of registration. Explore the arenas in the meantime."
        primary={{ label: 'EXPLORE EVENTS', to: ROUTES.events }}
        secondary={{ label: 'REGISTER NOW', to: ROUTES.register }}
      />
    </>
  );
}

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Aperture, Camera, Film, Maximize2 } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';
import CtaBand from '../components/CtaBand';
import FilterTabs from '../components/FilterTabs';
import Lightbox from '../components/Lightbox';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { GALLERY_CATEGORIES, GALLERY_MEDIA, GALLERY_PLACEHOLDERS, ROUTES } from '../data/pages';

// Deterministic gradient pairs — visual scaffolding only, never
// presented as real festival photography.
const HUE_PAIRS = [
  ['#0e7490', '#1e1b4b'],
  ['#6d28d9', '#0c1226'],
  ['#a21caf', '#140b22'],
  ['#155e75', '#05060a'],
  ['#7c3aed', '#0b0e1a'],
  ['#0891b2', '#101322'],
  ['#c026d3', '#0a0a14'],
  ['#2563eb', '#070a14'],
];

// Build the frame list: real media if present, otherwise category
// placeholders so the layout and lightbox are fully functional.
function buildFrames() {
  if (GALLERY_MEDIA.length > 0) return GALLERY_MEDIA;
  const frames = [];
  GALLERY_PLACEHOLDERS.forEach((group) => {
    for (let n = 0; n < group.count; n++) {
      const [a, b] = HUE_PAIRS[frames.length % HUE_PAIRS.length];
      frames.push({
        id: `${group.category}-${n}`,
        category: group.category,
        src: null,
        a,
        b,
        caption: 'MEDIA COMING SOON',
      });
    }
  });
  return frames;
}

const FRAMES = buildFrames();

function Frame({ frame, i, onOpen }) {
  // Vary heights to create the masonry rhythm.
  const spanTall = i % 5 === 0 || i % 7 === 3;

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ delay: Math.min((i % 6) * 0.06, 0.35), duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpen(i)}
      data-cursor
      className="frame"
      style={{
        position: 'relative',
        gridRow: spanTall ? 'span 2' : 'span 1',
        minHeight: spanTall ? 'clamp(280px, 34vw, 460px)' : 'clamp(180px, 20vw, 260px)',
        borderRadius: 18,
        overflow: 'hidden',
        border: '1px solid var(--line)',
        background: frame.src
          ? '#05060a'
          : `radial-gradient(120% 120% at ${25 + (i * 13) % 55}% ${18 + (i * 19) % 55}%, ${frame.a}55, ${frame.b} 78%)`,
        cursor: 'pointer',
        display: 'block',
        width: '100%',
        textAlign: 'left',
      }}
    >
      {frame.src && (
        <img
          src={frame.src}
          alt={frame.alt ?? ''}
          className="frame-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)' }}
        />
      )}

      {/* scanline */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent, rgba(34,211,238,0.07), transparent)',
          animation: 'scanline 5s linear infinite',
          animationDelay: `${i * 0.4}s`,
          pointerEvents: 'none',
        }}
      />

      {/* meta */}
      <span
        className="mono"
        style={{
          position: 'absolute',
          top: 13,
          left: 15,
          fontSize: '0.54rem',
          letterSpacing: '0.24em',
          color: 'rgba(226,232,255,0.45)',
          textTransform: 'uppercase',
        }}
      >
        PRV_{String(i + 1).padStart(3, '0')} / {frame.category}
      </span>

      {/* overlay */}
      {!frame.src && (
        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            background: 'rgba(5,6,10,0.32)',
          }}
        >
          <span style={{ textAlign: 'center' }}>
            <Aperture size={24} strokeWidth={1.2} style={{ color: 'var(--cyan)', margin: '0 auto', opacity: 0.82 }} />
            <span className="mono" style={{ display: 'block', marginTop: '0.65rem', fontSize: '0.54rem', letterSpacing: '0.3em', color: 'var(--muted)' }}>
              MEDIA COMING SOON
            </span>
          </span>
        </span>
      )}

      {/* hover expand */}
      <span
        className="frame-zoom"
        style={{
          position: 'absolute',
          bottom: 13,
          right: 14,
          width: 38,
          height: 38,
          borderRadius: '50%',
          border: '1px solid var(--line-strong)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--ink)',
          background: 'rgba(5,6,10,0.55)',
          backdropFilter: 'blur(6px)',
          opacity: 0,
          transform: 'translateY(8px)',
          transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <Maximize2 size={14} />
      </span>
    </motion.button>
  );
}

export default function GalleryPage() {
  const [category, setCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { scrollYProgress } = useScroll();
  const parallax = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  const visible = useMemo(
    () => (category === 'all' ? FRAMES : FRAMES.filter((f) => f.category === category)),
    [category]
  );

  const options = useMemo(
    () =>
      GALLERY_CATEGORIES.map((c) => ({
        ...c,
        count: c.id === 'all' ? FRAMES.length : FRAMES.filter((f) => f.category === c.id).length,
      })),
    []
  );

  const openAt = (i) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((v) => (v === null ? null : (v - 1 + visible.length) % visible.length));
  const next = () => setLightboxIndex((v) => (v === null ? null : (v + 1) % visible.length));

  return (
    <>
      <PageHero
        index="06"
        label="EVENT GALLERY"
        title={['MOMENTS', 'IN THE MAKING.']}
        accentIndex={1}
        intro="The visual archive of Techno Pravah 2026 — technology, innovation, competition and collaboration. Official photography publishes as the festival unfolds."
        meta={['04 CATEGORIES', 'MEDIA COMING SOON']}
        variant="dodeca"
        hue="magenta"
        breadcrumb={[{ label: 'HOME', path: ROUTES.home }, { label: 'GALLERY' }]}
      />

      {/* ---------------------------------------------- FEATURED */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="01"
            label="FEATURED FRAME"
            title={<>THE <span className="grad-text">HEADLINE</span> FRAME</>}
            aside="A hero visual from the festival will anchor this space."
          />

          <Reveal>
            <motion.div
              style={{
                position: 'relative',
                borderRadius: 26,
                overflow: 'hidden',
                border: '1px solid var(--line)',
                aspectRatio: '16 / 7',
                minHeight: 260,
                background:
                  'radial-gradient(120% 130% at 30% 25%, rgba(139,92,246,0.32), rgba(11,14,26,0.95) 72%)',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {/* parallax grid */}
              <motion.span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: '-10%',
                  y: parallax,
                  backgroundImage:
                    'linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)',
                  backgroundSize: '58px 58px',
                  maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 75%)',
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black, transparent 75%)',
                }}
              />
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent, rgba(34,211,238,0.06), transparent)',
                  animation: 'scanline 6s linear infinite',
                }}
              />
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '1.5rem' }}>
                <Camera size={30} strokeWidth={1.1} style={{ color: 'var(--cyan)', margin: '0 auto' }} />
                <p className="display grad-text" style={{ fontSize: 'clamp(1.5rem, 5vw, 3.6rem)', marginTop: '1.1rem' }}>
                  MEDIA COMING SOON
                </p>
                <p className="mono" style={{ marginTop: '0.9rem', fontSize: '0.62rem', letterSpacing: '0.32em', color: 'var(--muted)' }}>
                  TECHNO PRAVAH 2026 — VISUAL ARCHIVE
                </p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------- MASONRY */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="02"
            label="THE ARCHIVE"
            title={<>BROWSE BY <span className="outline-text">CATEGORY</span></>}
            aside="Filter the archive, then open any frame in the fullscreen viewer."
          />

          <div style={{ marginBottom: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
            <FilterTabs options={options} value={category} onChange={setCategory} layoutId="gallery-filter" />
          </div>

          <motion.div
            layout
            className="masonry"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))',
              gridAutoRows: 'minmax(120px, auto)',
              gap: 'clamp(0.8rem, 1.4vw, 1.2rem)',
            }}
          >
            <AnimatePresence mode="popLayout">
              {visible.map((frame, i) => (
                <Frame key={frame.id} frame={frame} i={i} onOpen={openAt} />
              ))}
            </AnimatePresence>
          </motion.div>

          <Reveal delay={0.1}>
            <p className="mono" style={{ marginTop: 'clamp(2rem, 3.5vw, 3rem)', fontSize: '0.66rem', letterSpacing: '0.3em', color: 'var(--faint)', textTransform: 'uppercase' }}>
              SHOWING {String(visible.length).padStart(2, '0')} PLACEHOLDER FRAMES — OFFICIAL PHOTOGRAPHY COMING SOON
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------- AFTERMOVIE */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader index="03" label="AFTERMOVIE" title="THE FESTIVAL FILM" />
          <ComingSoon
            icon={Film}
            label="AFTERMOVIE"
            title="FILM COMING SOON"
            note="The official Techno Pravah 2026 aftermovie will be released here following the Grand Finale."
            size="lg"
            accent="magenta"
          />
        </div>
      </section>

      <Lightbox items={visible} index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />

      <CtaBand
        eyebrow="BE IN THE FRAME"
        title={['MAKE THE', 'MOMENT.']}
        body="The archive fills with the people who show up. Register and be part of it."
        primary={{ label: 'REGISTER NOW', to: ROUTES.register }}
        secondary={{ label: 'EXPLORE EVENTS', to: ROUTES.events }}
      />

      <style>{`
        .frame:hover .frame-zoom { opacity: 1; transform: translateY(0); }
        .frame:hover .frame-img { transform: scale(1.06); }
      `}</style>
    </>
  );
}

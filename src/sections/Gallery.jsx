import { motion } from 'framer-motion';
import { Aperture } from 'lucide-react';
import Reveal, { WordsReveal } from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { GALLERY_TILES } from '../data/content';

// Deterministic generative gradients — stand-ins until real photography drops.
const TILE_HUES = [
  ['#0e7490', '#1e1b4b'],
  ['#6d28d9', '#0c1226'],
  ['#a21caf', '#140b22'],
  ['#155e75', '#05060a'],
  ['#7c3aed', '#0b0e1a'],
  ['#0891b2', '#101322'],
  ['#c026d3', '#0a0a14'],
  ['#2563eb', '#070a14'],
];

function Tile({ i }) {
  const [a, b] = TILE_HUES[i % TILE_HUES.length];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: (i % 4) * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 0.97 }}
      data-cursor
      style={{
        position: 'relative',
        aspectRatio: i % 5 === 0 ? '4 / 5' : '1 / 1',
        borderRadius: 18,
        overflow: 'hidden',
        border: '1px solid var(--line)',
        background: `radial-gradient(120% 120% at ${20 + (i * 11) % 60}% ${15 + (i * 17) % 60}%, ${a}55, ${b} 75%)`,
        cursor: 'pointer',
      }}
    >
      {/* scanline sweep */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent, rgba(34,211,238,0.08), transparent)',
          animation: 'scanline 4.5s linear infinite',
          animationDelay: `${i * 0.55}s`,
        }}
      />
      <span
        className="mono"
        style={{
          position: 'absolute',
          top: 14,
          left: 16,
          fontSize: '0.58rem',
          letterSpacing: '0.26em',
          color: 'rgba(226,232,255,0.4)',
        }}
      >
        PRV_{String(i + 1).padStart(3, '0')}
      </span>

      <span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          background: 'rgba(5,6,10,0.35)',
          backdropFilter: 'blur(1px)',
        }}
      >
        <span style={{ textAlign: 'center' }}>
          <Aperture size={26} strokeWidth={1.2} style={{ color: 'var(--cyan)', margin: '0 auto', opacity: 0.8 }} />
          <span
            className="mono"
            style={{ display: 'block', marginTop: '0.7rem', fontSize: '0.58rem', letterSpacing: '0.34em', color: 'var(--muted)' }}
          >
            COMING SOON
          </span>
        </span>
      </span>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeader
          index="06"
          label="EVENT GALLERY"
          aside="Frames are being captured. The visual archive of Pravah 2026 materializes here as the festival unfolds."
        />

        <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 6vw, 5.4rem)', maxWidth: '15ch', marginBottom: 'clamp(2.6rem, 5vw, 4.5rem)' }}>
          <WordsReveal text="MOMENTS" />{' '}
          <span className="grad-text"><WordsReveal text="IN THE MAKING." delay={0.1} /></span>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
            gap: 'clamp(0.9rem, 1.6vw, 1.4rem)',
          }}
        >
          {Array.from({ length: GALLERY_TILES }).map((_, i) => (
            <Tile key={i} i={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mono" style={{ marginTop: 'clamp(2.2rem, 4vw, 3.2rem)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--faint)', textTransform: 'uppercase' }}>
            PHOTOGRAPHY & AFTERMOVIE — COMING SOON
          </p>
        </Reveal>
      </div>
    </section>
  );
}

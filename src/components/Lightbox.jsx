import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ImageOff, X } from 'lucide-react';

// ============================================================
// LIGHTBOX — fullscreen media viewer.
// Works with real media records and with placeholder frames, so
// the interaction is fully built before official photography lands.
// ============================================================
export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const open = index !== null && index >= 0;
  const item = open ? items[index] : null;

  // Keyboard controls + scroll lock
  useEffect(() => {
    if (!open) return;
    const lenis = window.__lenis;
    lenis?.stop();
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [open, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2200,
            background: 'rgba(3, 4, 8, 0.94)',
            backdropFilter: 'blur(14px)',
            display: 'flex',
            flexDirection: 'column',
            padding: 'clamp(1rem, 3vw, 2.4rem)',
          }}
        >
          {/* Top bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexShrink: 0,
            }}
          >
            <span className="mono" style={{ fontSize: '0.64rem', letterSpacing: '0.28em', color: 'var(--muted)', textTransform: 'uppercase' }}>
              {item.category ?? 'PRAVAH'} — FRAME {String(index + 1).padStart(3, '0')} / {String(items.length).padStart(3, '0')}
            </span>
            <button
              onClick={onClose}
              aria-label="Close viewer"
              style={{
                width: 46,
                height: 46,
                borderRadius: '50%',
                border: '1px solid var(--line-strong)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--ink)',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Stage */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(0.6rem, 2vw, 2rem)',
              minHeight: 0,
              paddingBlock: 'clamp(1rem, 3vh, 2rem)',
            }}
          >
            <button
              onClick={onPrev}
              aria-label="Previous frame"
              className="lb-arrow"
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                border: '1px solid var(--line-strong)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--ink)',
                flexShrink: 0,
                transition: 'all 0.35s',
              }}
            >
              <ArrowLeft size={18} />
            </button>

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                flex: 1,
                maxWidth: 1100,
                height: '100%',
                borderRadius: 20,
                border: '1px solid var(--line)',
                overflow: 'hidden',
                display: 'grid',
                placeItems: 'center',
                background: item.src
                  ? '#05060a'
                  : `radial-gradient(120% 120% at 40% 30%, ${item.a ?? '#0e7490'}44, ${item.b ?? '#0b0e1a'} 76%)`,
                position: 'relative',
              }}
            >
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.alt ?? ''}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <ImageOff size={34} strokeWidth={1.1} style={{ color: 'var(--cyan)', margin: '0 auto', opacity: 0.85 }} />
                  <p className="display grad-text" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2.4rem)', marginTop: '1.2rem' }}>
                    MEDIA COMING SOON
                  </p>
                  <p className="mono" style={{ marginTop: '0.9rem', fontSize: '0.62rem', letterSpacing: '0.3em', color: 'var(--muted)' }}>
                    {item.category ?? 'TECH PRAVAH 2026'}
                  </p>
                </div>
              )}
            </motion.div>

            <button
              onClick={onNext}
              aria-label="Next frame"
              className="lb-arrow"
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                border: '1px solid var(--line-strong)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--ink)',
                flexShrink: 0,
                transition: 'all 0.35s',
              }}
            >
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Caption */}
          <div style={{ flexShrink: 0, textAlign: 'center' }}>
            <p className="mono" style={{ fontSize: '0.62rem', letterSpacing: '0.3em', color: 'var(--faint)', textTransform: 'uppercase' }}>
              {item.caption ?? 'ESC TO CLOSE — ARROW KEYS TO NAVIGATE'}
            </p>
          </div>

          <style>{`
            .lb-arrow:hover { background: var(--ink); color: #05060a; border-color: var(--ink); }
            @media (max-width: 620px) { .lb-arrow { display: none !important; } }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FESTIVAL } from '../data/content';

// Boot sequence: energy percentage counter + monumental wordmark,
// then the whole layer wipes upward to reveal the experience.
export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const DURATION = 1500;

    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onDone, 420);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        background: '#05060a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(1.4rem, 4vw, 3rem)',
        overflow: 'hidden',
      }}
      exit={{ y: '-100%', transition: { duration: 1, ease: [0.87, 0, 0.13, 1] } }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          color: 'var(--muted)',
          textTransform: 'uppercase',
        }}
      >
        <span>{FESTIVAL.host}</span>
        <span>{FESTIVAL.datesShort}</span>
      </div>

      <div style={{ textAlign: 'center' }}>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="display grad-text"
          style={{ fontSize: 'clamp(2.6rem, 9vw, 8rem)' }}
        >
          PRAVAH
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mono"
          style={{ letterSpacing: '0.5em', color: 'var(--muted)', marginTop: '1.2rem', fontSize: '0.75rem' }}
        >
          INITIALIZING EXPERIENCE
        </motion.p>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem' }}>
        <div
          style={{
            flex: 1,
            height: '1px',
            background: 'var(--line)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--grad)',
              transformOrigin: '0 50%',
              transform: `scaleX(${progress / 100})`,
            }}
          />
        </div>
        <span className="display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1 }}>
          {progress}
          <span className="grad-text">%</span>
        </span>
      </div>
    </motion.div>
  );
}

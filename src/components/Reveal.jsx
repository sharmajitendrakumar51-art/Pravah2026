import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

// Scroll-triggered reveal wrapper — rise + unblur, staggered via `delay`.
export default function Reveal({
  children,
  delay = 0,
  y = 44,
  once = true,
  className = '',
  amount = 0.35,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.05, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Word-by-word monumental headline reveal.
export function WordsReveal({ text, className = '', delay = 0, stagger = 0.045 }) {
  const words = text.split(' ');
  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            initial={{ y: '110%', rotate: 4 }}
            whileInView={{ y: '0%', rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

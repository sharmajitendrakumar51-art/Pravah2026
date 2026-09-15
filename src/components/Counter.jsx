import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

// Animated counter — springs to `value` when scrolled into view.
export default function Counter({ value, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 2200, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString('en-US');
    });
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

import { useEffect, useRef } from 'react';

// Physics-lagged custom cursor: dot follows instantly, ring trails.
// Auto-hides on touch devices via CSS.
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    const onOver = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], [data-cursor]');
      ringRef.current?.classList.toggle('is-active', Boolean(interactive));
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x - 3}px, ${pos.y - 3}px)`;
      }
      if (ringRef.current) {
        const size = ringRef.current.classList.contains('is-active') ? 32 : 19;
        ringRef.current.style.transform = `translate(${ring.x - size}px, ${ring.y - size}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

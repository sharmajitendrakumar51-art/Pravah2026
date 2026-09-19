import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import InfinityTechLogo from './InfinityTechLogo';
import './landing-logo-motion.css';

const RING_ANIMATIONS = [
  { part: 'rotating-ring', rotation: 360, duration: 24 },
  { part: 'outer-orbit', rotation: -360, duration: 36 },
  { part: 'outer-segments', rotation: 360, duration: 52 },
  { part: 'outer-ticks', rotation: -360, duration: 64 },
];

const BRANCH_NAMES = [
  'innovation',
  'software',
  'communication',
  'civil',
  'mechanical',
  'computing',
];

export default function LandingLogoMotion({ active = true, className = '', size = 512, style }) {
  const sceneRef = useRef(null);
  const spinRef = useRef(null);
  const tiltRef = useRef(null);
  const tlRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  // Viewport intersection observer (pauses when scrolled out of view)
  useEffect(() => {
    const el = sceneRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Document tab visibility listener (pauses when tab is backgrounded)
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      setTabVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Master GSAP Animation Setup
  useEffect(() => {
    const sceneEl = sceneRef.current;
    const spinEl = spinRef.current;
    const tiltEl = tiltRef.current;
    if (!sceneEl || !spinEl || !tiltEl) return;

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Reduced motion: neutral state, full lights, no timeline
        gsap.set([tiltEl, spinEl], { rotationX: 0, rotationY: 0, rotation: 0, clearProps: 'all' });
        const lights = sceneEl.querySelectorAll('circle[id$="-light"]');
        if (lights.length) gsap.set(lights, { opacity: 1 });
        return;
      }

      // Master timeline
      const tl = gsap.timeline({ paused: true });
      tlRef.current = tl;

      // 1. Infinity Spin (anticlockwise 0 -> -360)
      tl.to(spinEl, {
        rotation: -360,
        duration: 18,
        repeat: -1,
        ease: 'none',
      }, 0);

      // 2. Infinity 3D Tilt
      gsap.set(tiltEl, {
        rotationX: 14,
        rotationY: -26,
        transformOrigin: '50% 49.8405%',
      });
      tl.to(tiltEl, {
        rotationX: -10,
        rotationY: 26,
        duration: 5.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      }, 0);

      // 3. Ring Rotations (2D SVG groups around 627 625)
      RING_ANIMATIONS.forEach((ring) => {
        const ringEl = sceneEl.querySelector(`[data-part="${ring.part}"]`);
        if (ringEl) {
          gsap.set(ringEl, { svgOrigin: '627 625' });
          tl.to(ringEl, {
            rotation: ring.rotation,
            duration: ring.duration,
            repeat: -1,
            ease: 'none',
          }, 0);
        }
      });

      // 4. Branch Sway
      BRANCH_NAMES.forEach((name, i) => {
        const branchEl = sceneEl.querySelector(`[data-part="branch-${name}"]`);
        if (branchEl) {
          gsap.set(branchEl, { svgOrigin: '627 625' });
          tl.fromTo(
            branchEl,
            { rotation: -0.8 },
            {
              rotation: 0.8,
              duration: 3.6 + i * 0.17,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            },
            i * 0.24
          );
        }
      });

      // 5. Terminal Light Opacity Animation
      BRANCH_NAMES.forEach((name, i) => {
        const lights = sceneEl.querySelectorAll(`[data-part="terminals-${name}"] circle[id$="-light"]`);
        if (lights.length) {
          gsap.set(lights, { opacity: 1 });
          tl.to(
            lights,
            {
              opacity: 0.58,
              duration: 2.6,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              stagger: 0.14,
            },
            i * 0.32
          );
        }
      });

      // Approved Expressive Pace: Master timeScale 1.4x
      tl.timeScale(1.4);
    }, sceneRef);

    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, []);

  // Control Play / Pause state based on active, inView, tabVisible & reduced motion
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const shouldPlay = active && inView && tabVisible && !prefersReduced;

    if (shouldPlay) {
      if (tl.paused()) tl.play();
    } else {
      if (!tl.paused()) tl.pause();
    }
  }, [active, inView, tabVisible]);

  return (
    <div
      ref={sceneRef}
      className={`logo-scene ${className}`}
      style={style}
    >
      {/* Base SVG — logo artwork excluding infinity */}
      <div className="logo-base">
        <InfinityTechLogo hideInfinity={true} size={size} />
      </div>

      {/* 3D Infinity Tilt & Spin hierarchy */}
      <div ref={tiltRef} className="infinity-tilt">
        <div ref={spinRef} className="infinity-spin">
          <div className="infinity-depth">
            <InfinityTechLogo onlyInfinity={true} size={size} aria-hidden="true" />
          </div>
          <div className="infinity-front">
            <InfinityTechLogo onlyInfinity={true} size={size} />
          </div>
        </div>
      </div>
    </div>
  );
}

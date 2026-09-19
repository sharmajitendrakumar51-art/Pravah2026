import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

import FestivalLogo from './FestivalLogo';
import { INTRO, LOGO_VIEWBOX, LOGO_CORE } from '../../lib/festival-animation-config';
import './festival-intro.css';

// ============================================================
// FestivalIntro — the fixed cinematic entrance overlay.
//
// Choreography (one master GSAP timeline, windows from the config):
//   A  Logo appears        fade + gentle scale-in
//   B  Infinity rotation   ONLY the ∞ group spins 540° about (300,360)
//   C  Accelerating zoom    whole logo scales from its core, filling the view
//   D  Homepage reveal     overlay fades while the page behind appears
//
// Contract:
//   onReveal   — fired mid-timeline (and on skip/reduced-motion) so the
//                parent can start showing the homepage behind the overlay.
//   onComplete — fired once the overlay should be removed and the session
//                flag set. Idempotent on the parent side is not required;
//                this component guarantees a single call.
// ============================================================
export default function FestivalIntro({ onReveal, onComplete, config = INTRO }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const statusRef = useRef(null);
  const tlRef = useRef(null);
  const finishedRef = useRef(false);
  const endingRef = useRef(false);
  const endRef = useRef(null); // exposes the single safe-completion path to Skip

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const infinity = root.querySelector('[data-intro-infinity]');
    const core = root.querySelector('[data-intro-core]');
    const logo = root.querySelector('.fx-intro__logo');
    const progressFill = root.querySelector('[data-intro-progress]');
    const statusEl = statusRef.current;

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Idempotent finalize: single source of completion truth ---------
    const finalize = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      onReveal?.(); // ensure the page is shown even if skipped before reveal
      onComplete?.();
    };

    // Safely end the intro early (skip / resize / failure) with a short fade.
    const endIntro = (fade = 0.4) => {
      if (finishedRef.current || endingRef.current) return;
      endingRef.current = true;
      tlRef.current?.kill();
      onReveal?.();
      gsap.to(root, { autoAlpha: 0, duration: fade, ease: 'power1.out', onComplete: finalize });
    };
    endRef.current = endIntro;

    // Fit the logo box inside the viewport by BOTH width and height so it
    // stays centred and unclipped across portrait / landscape / desktop.
    // Lay out the logo: (1) fit the box inside the viewport by width AND
    // height, (2) MEASURE the actually-rendered glowing core and translate
    // the stage so the core lands exactly on the viewport centre, (3) pin the
    // transform-origin to the core so every scale (appear + zoom) keeps the
    // core locked to that centre. Measuring the real core means any asymmetry
    // in the art or SVG letterboxing is irrelevant — it is always centred.
    // Returns the final zoom scale (core must cover the viewport diagonal).
    const layout = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const fit = Math.min(
        (vw * config.logoMaxVW) / LOGO_VIEWBOX.width,
        (vh * config.logoMaxVH) / LOGO_VIEWBOX.height
      );
      // Neutral transform first so measurements are the natural rendered size.
      gsap.set(stage, {
        width: LOGO_VIEWBOX.width * fit,
        height: LOGO_VIEWBOX.height * fit,
        x: 0,
        y: 0,
        scale: 1,
        transformOrigin: '0px 0px',
      });
      const s = stage.getBoundingClientRect();
      const c = core ? core.getBoundingClientRect() : s;
      // Core centre expressed relative to the stage's own top-left (px).
      const originX = c.left - s.left + c.width / 2;
      const originY = c.top - s.top + c.height / 2;
      gsap.set(stage, {
        x: vw / 2 - (s.left + originX),
        y: vh / 2 - (s.top + originY),
        transformOrigin: `${originX}px ${originY}px`,
      });
      const diagonal = Math.hypot(vw, vh);
      const coreW = c.width || 1;
      return (diagonal * config.zoomSafetyMargin) / coreW;
    };

    let resizeTimer = null;
    const onResize = () => {
      // Deterministic strategy: never leave a half-zoomed overlay stuck.
      // Before the zoom starts we can simply re-fit; once motion is under
      // way we safely complete the intro instead of recomputing mid-flight.
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (finishedRef.current) return;
        const t = tlRef.current;
        if (t && t.time() >= config.phases.zoom[0]) {
          endIntro(0.3);
        } else {
          layout(); // re-fit + re-centre on the core before the zoom begins
        }
      }, 150);
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape') endIntro();
    };

    const ctx = gsap.context(() => {
      try {
        // Size, centre on the core, and get the final zoom scale in one pass.
        const finalScale = layout();

        // Reduced motion: bypass rotate + zoom, quietly reveal the homepage.
        if (prefersReduced) {
          onReveal?.();
          gsap.to(root, { autoAlpha: 0, duration: 0.35, delay: 0.15, onComplete: finalize });
          return;
        }

        const { appear, infinity: inf, zoom, reveal } = config.phases;

        // Scale about the core origin set by layout() — core stays centred.
        gsap.set(stage, { scale: 0.88, autoAlpha: 0 });
        if (infinity) gsap.set(infinity, { rotation: 0, svgOrigin: `${LOGO_CORE.x} ${LOGO_CORE.y}` });

        const tl = gsap.timeline({ onComplete: finalize });
        tlRef.current = tl;

        // Progress line = animation progress across the whole timeline.
        if (progressFill) {
          tl.to(progressFill, { scaleX: 1, duration: config.totalDuration, ease: 'none' }, 0);
        }

        // Phase A — logo appears.
        tl.to(stage, { autoAlpha: 1, scale: 1, duration: appear[1] - appear[0], ease: 'power2.out' }, appear[0]);

        // Phase B — only the infinity symbol rotates, about the true SVG centre.
        if (infinity) {
          tl.to(
            infinity,
            { rotation: config.infinityRotation, duration: inf[1] - inf[0], ease: 'power2.inOut' },
            inf[0]
          );
        }

        // Drop the glow filter just before the large zoom (cheap + sharp).
        if (logo) tl.set(logo, { filter: 'none' }, zoom[0]);

        // Phase C — accelerating travel into the core.
        tl.to(stage, { scale: finalScale, duration: zoom[1] - zoom[0], ease: 'power2.in' }, zoom[0]);

        // Homepage begins appearing before the zoom ends (no blank frame).
        tl.call(() => onReveal?.(), null, config.revealAt);

        // Phase D — overlay fades out over the reveal window.
        tl.to(root, { autoAlpha: 0, duration: reveal[1] - reveal[0], ease: 'power1.inOut' }, reveal[0]);

        // Subtle, non-verbose status cues (updated via ref, no re-renders).
        if (statusEl) {
          tl.call(() => (statusEl.textContent = 'ENTERING THE INFINITE'), null, inf[0] + 0.1);
        }
      } catch {
        // Fail-open: any animation/measurement error must not trap the user.
        finalize();
      }
    }, root);

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      window.removeEventListener('keydown', onKeyDown);
      ctx.revert(); // kills tweens + reverts inline styles (Strict Mode safe)
    };
    // Config is a stable module constant; effect runs once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Skip reuses the exact same idempotent completion path as everything else.
  const handleSkip = () => endRef.current?.(0.4);

  return (
    <div ref={rootRef} className="fx-intro" role="dialog" aria-modal="true" aria-label="Festival intro animation">
      <span className="fx-intro__label fx-intro__label--tl">SKIT JAIPUR</span>
      <span className="fx-intro__label fx-intro__label--tr">PRAVAH 2026</span>

      <div ref={stageRef} className="fx-intro__stage">
        <FestivalLogo className="fx-intro__logo" title="Pravah 2026 festival logo" />
      </div>

      <div className="fx-intro__status">
        <span ref={statusRef} className="fx-intro__status-text">
          AWAKENING
        </span>
        <span className="fx-intro__status-text" style={{ opacity: 0.7 }}>
          INFINITE POSSIBILITIES
        </span>
        <div className="fx-intro__progress" aria-hidden="true">
          <div className="fx-intro__progress-fill" data-intro-progress="" />
        </div>
      </div>

      <button type="button" className="fx-intro__skip" onClick={handleSkip}>
        Skip intro
      </button>
    </div>
  );
}

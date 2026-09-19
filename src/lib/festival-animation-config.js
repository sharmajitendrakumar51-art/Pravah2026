// ============================================================
// FESTIVAL INTRO — animation configuration
// A small, understandable set of knobs for the cinematic entrance.
// Tweak these to retune the intro without touching orchestration code.
// ============================================================

export const INTRO = {
  // Total master-timeline duration in seconds. All phase windows below
  // are expressed on this same timeline (see FestivalIntro.jsx).
  totalDuration: 3.6,

  // Degrees the infinity symbol rotates. 540° is intentional: the
  // symmetric ∞ shape visually settles back to a horizontal orientation.
  infinityRotation: 540,

  // Initial logo sizing. The rendered logo box is fitted inside the
  // viewport using BOTH available width and height (whichever is tighter),
  // so it stays centred and unclipped on portrait, landscape and desktop.
  logoMaxVW: 0.62,
  logoMaxVH: 0.7,

  // Zoom safety margin. The glowing core must cover the viewport diagonal
  // times this factor before the overlay fully disappears — accounts for
  // portrait/landscape and prevents a visible seam at the corners.
  zoomSafetyMargin: 1.18,

  // When (in seconds) the homepage behind the overlay begins to appear.
  // Deliberately before the zoom finishes, so there is no blank frame.
  revealAt: 2.55,

  // Phase windows on the master timeline [start, end] in seconds.
  // Overlapping windows are intentional so the motions blend.
  phases: {
    appear: [0.0, 0.55], // Phase A — logo fades/scales in
    infinity: [0.25, 2.0], // Phase B — only the ∞ rotates
    zoom: [1.85, 3.2], // Phase C — accelerating travel into the core
    reveal: [2.55, 3.6], // Phase D — homepage becomes visible
  },
};

// The supplied SVG's viewBox and the exact centre of its glowing core.
// The core is at the geometric centre of the viewBox (300/600, 360/720)
// = (0.5, 0.5), which is why a centred wrapper can zoom from its own
// centre and keep the core locked to the viewport centre.
export const LOGO_VIEWBOX = { width: 1254, height: 1254 };
export const LOGO_CORE = { x: 627, y: 625 };

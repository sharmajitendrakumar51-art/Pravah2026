import { forwardRef, useId } from 'react';

// ============================================================
// FestivalLogo — inline SVG recreation of the supplied layered logo.
//
// Rendered inline (not via <img>) so GSAP can target the internal
// groups. Geometry, viewBox, strokes and gradients are preserved
// exactly from the supplied asset (600 × 720 viewBox, core at 300,360).
//
// Animation hooks (queried by FestivalIntro, scoped to the overlay):
//   [data-intro-infinity] — the independently rotating ∞ group
//   [data-intro-core]      — the glowing core circle (measured for zoom)
//
// IDs (gradient / title / desc) are namespaced with a per-instance uid
// so the logo can safely appear more than once on a page.
// ============================================================

// The six circuit branches share one path; only colour + rotation differ.
const BRANCH_PATH =
  'M250 298 Q278 271 278 239 V174 L261 157 V128 M262 296 Q288 270 288 240 V151 M275 291 Q298 265 298 237 V109 M289 287 Q308 263 308 235 V162 M302 287 Q318 263 318 239 V186 L337 166 V130';

const BRANCH_COLORS = ['#ef9b20', '#79b33e', '#20a3ad', '#163d60', '#087cab', '#873293'];

// Node dots that terminate each branch (kept identical to the source art).
const BRANCH_NODES = [
  { cx: 261, cy: 128 },
  { cx: 288, cy: 151 },
  { cx: 308, cy: 162 },
  { cx: 337, cy: 130 },
];

const FestivalLogo = forwardRef(function FestivalLogo(
  { className, title = 'Pravah 2026 festival logo', ...rest },
  ref
) {
  // Unique per-instance suffix keeps gradient/title/desc IDs collision-free.
  const raw = useId();
  const uid = raw.replace(/:/g, '');
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;
  const coreGlowId = `${uid}-coreGlow`;

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 600 720"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      {...rest}
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>
        Six engineering branches surrounding a glowing core and an independent infinity symbol.
      </desc>
      <defs>
        <radialGradient id={coreGlowId}>
          <stop offset="0" stopColor="#fff" />
          <stop offset=".63" stopColor="#edffff" />
          <stop offset=".84" stopColor="#acecf3" />
          <stop offset="1" stopColor="#20a8ca" />
        </radialGradient>
      </defs>

      <g id="logo-art">
        {/* Six circuit branches — decorative for assistive tech. */}
        <g
          id="circuits"
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {BRANCH_COLORS.map((color, i) => (
            <g key={i} id={`branch-${i}`} stroke={color} transform={`rotate(${i * 60} 300 360)`}>
              <path d={BRANCH_PATH} />
              <g fill="white" strokeWidth="4">
                {BRANCH_NODES.map((n, j) => (
                  <circle key={j} cx={n.cx} cy={n.cy} r="5" />
                ))}
              </g>
            </g>
          ))}
        </g>

        {/* Surrounding engineering department icons. */}
        <g
          id="department-icons"
          fill="none"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <g id="icon-0" stroke="#ef9b20" transform="rotate(0 300 360)">
            <g transform="translate(300 64) rotate(-0)">
              <circle r="43" />
              <path d="M-14-6 C-14-27 14-27 14-6 C14 3 6 5 6 13 H-6 C-6 5-14 3-14-6 Z M-6 18 H6 M-3 23 H3 M0-32 V-37 M-24-22 L-28-26 M24-22 L28-26 M-24-3 H-30 M24-3 H30 M0 10 V-7 M-5-12 L0-7 L5-12" />
            </g>
          </g>
          <g id="icon-1" stroke="#79b33e" transform="rotate(60 300 360)">
            <g transform="translate(300 64) rotate(-60)">
              <circle r="43" />
              <path d="M-13-12 L-27 0 L-13 12 M13-12 L27 0 L13 12 M7-20 L-7 20" />
            </g>
          </g>
          <g id="icon-2" stroke="#20a3ad" transform="rotate(120 300 360)">
            <g transform="translate(300 64) rotate(-120)">
              <circle r="43" />
              <path d="M0-6 L-13 27 H13 Z M-7 13 H7 M-13 27 L7 13 M13 27 L-7 13 M-9-17 Q-17-7-9 3 M9-17 Q17-7 9 3 M-16-23 Q-28-7-16 10 M16-23 Q28-7 16 10" />
              <circle cy="-8" r="4" />
            </g>
          </g>
          <g id="icon-3" stroke="#163d60" transform="rotate(180 300 360)">
            <g transform="translate(300 64) rotate(-180)">
              <circle r="43" />
              <path d="M-30 11 H30 M-21-13 V23 M21-13 V23 M-27 11 Q-13 7-21-13 Q0 10 21-13 Q15 7 27 11 M-13 3 V11 M-5 6 V11 M5 6 V11 M13 3 V11" />
            </g>
          </g>
          <g id="icon-4" stroke="#087cab" transform="rotate(240 300 360)">
            <g transform="translate(300 64) rotate(-240)">
              <circle r="43" />
              <path d="M-7-26 H7 L9-18 L15-15 L23-17 L29-6 L23 0 L23 7 L29 13 L22 24 L14 21 L7 24 L5 31 H-7 L-9 23 L-15 20 L-23 22 L-29 11 L-23 5 V-2 L-29-8 L-22-19 L-14-16 L-8-19 Z" />
              <circle cy="2" r="11" />
            </g>
          </g>
          <g id="icon-5" stroke="#873293" transform="rotate(300 300 360)">
            <g transform="translate(300 64) rotate(-300)">
              <circle r="43" />
              <rect x="-19" y="-19" width="38" height="38" rx="2" />
              <rect x="-12" y="-12" width="24" height="24" />
              <path d="M-12-25 V-31 M-4-25 V-31 M4-25 V-31 M12-25 V-31 M-12 25 V31 M-4 25 V31 M4 25 V31 M12 25 V31 M-25-12 H-31 M-25-4 H-31 M-25 4 H-31 M-25 12 H-31 M25-12 H31 M25-4 H31 M25 4 H31 M25 12 H31" />
            </g>
          </g>
        </g>

        {/* Central glowing core. The inner glow circle is the zoom anchor. */}
        <g id="core" aria-hidden="true">
          <circle
            data-intro-core=""
            cx="300"
            cy="360"
            r="83"
            fill={`url(#${coreGlowId})`}
            stroke="#d9faff"
            strokeWidth="5"
          />
          <circle cx="300" cy="360" r="91" fill="none" stroke="#50c6d8" strokeOpacity=".45" strokeWidth="2" />
        </g>

        {/* Independent infinity symbol — the only group that spins. */}
        <g
          id="infinity"
          data-intro-infinity=""
          fill="none"
          stroke="#083954"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M300 360 C278 329 249 329 249 360 C249 391 278 391 300 360 C322 329 351 329 351 360 C351 391 322 391 300 360 Z" />
        </g>
      </g>
    </svg>
  );
});

export default FestivalLogo;

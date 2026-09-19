# Infinity Tech — website vector package

## What was found in the supplied file

The supplied `infinity-tech-logo-safe-layered.svg` is a hybrid SVG containing eight embedded PNG images, including a complete raster logo underneath seven raster overlays. It contains only four actual path elements. Its approximately 2.9 MB size largely comes from the embedded images. The underlying raster repeats the artwork being animated, so hiding or moving an overlay cannot truly isolate the original visual. Some rotated rectangular image patches can also obscure nearby details.

This package rebuilds that composition in vector geometry. It preserves the six disciplines, colours, circuit connections, cyan technology rings, and infinity motif. It is a close recreation, not a pixel-identical conversion: the original painted lighting, photographic textures, and 3D infinity highlights are simplified into scalable gradients and controlled glow. The original file has not been overwritten.

## Files

- `infinity-tech-master.svg`: editable, transparent, static pure-vector master. Use this as the source of truth.
- `InfinityTechLogo.jsx`: inline React component with per-instance IDs using React `useId` (React 18 or later).
- `infinity-tech-4096.png`: transparent 4096 × 4096 raster export for tools that do not support SVG. This PNG is not layered.
- `preview.html`: self-contained browser preview with layer visibility, individual rotation, and dark/light/checkerboard backgrounds.
- `layer-map.json`: complete element ID and group inventory.

The SVG has a `0 0 1254 1254` viewBox and a 4096 × 4096 intrinsic size. Its geometry remains sharp at other resolutions, including larger exports. CSS controls its displayed size; 4096 is not a limit on vector resolution. Glow remains a browser-rendered filter rather than an embedded bitmap.

## Independent layers

All visual shapes have unique IDs. Logical groups also have stable `data-part` values:

```text
logo-art
├── outer-technology-rings
│   ├── outer-segments
│   ├── outer-ticks
│   └── outer-orbit
├── engineering-branches
│   ├── branch-innovation
│   ├── branch-computing
│   ├── branch-software
│   ├── branch-mechanical
│   ├── branch-communication
│   └── branch-civil
├── hub
├── rotating-ring
└── infinity
```

Each branch contains `traces-NAME`, `terminals-NAME`, and `icon-NAME`. Each circuit trace, terminal rim, terminal light, icon outline, and icon-symbol shape can be targeted separately. Icon symbols use local coordinates inside a positioning group; animate the outer `icon-NAME` group, which carries its correct global centre coordinates.

The central animation origin is **627, 625**, in viewBox units. `infinity`, `rotating-ring`, and `outer-orbit` carry matching `data-center-x` and `data-center-y` attributes. The infinity is nested independently from the hub, so rotating it does not rotate the rings, icons, or circuits.

## React usage

```jsx
import InfinityTechLogo from './InfinityTechLogo';

<InfinityTechLogo
  size={512}
  className="festival-logo"
  style={{ width: 'min(80vw, 480px)', height: 'auto', display: 'block' }}
/>
```

Use the inline React component for internal animation. An `<img src="...svg">` works for static display, but its internal groups are not accessible to your page's GSAP selectors.

The React component prefixes IDs and gradient/filter references using `useId`, so multiple instances will not share those references. `data-part` values remain unchanged across instances. Scope selectors to a wrapper ref to avoid animating another instance.

```jsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import InfinityTechLogo from './InfinityTechLogo';

gsap.registerPlugin(useGSAP);

export function AnimatedFestivalLogo() {
  const root = useRef(null);

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to('[data-part="infinity"]', {
        svgOrigin: '627 625',
        rotation: 360,
        duration: 3,
        ease: 'power2.inOut',
      });
    });
    return () => motion.revert();
  }, { scope: root });

  return (
    <div ref={root}>
      <InfinityTechLogo size={512} style={{ width: '100%', height: 'auto' }} />
    </div>
  );
}
```

No animation runs inside the master by default. This avoids conflicts with an application's GSAP timeline and leaves reduced-motion behaviour under application control. In Next.js, put the animated wrapper in a client component.

The standalone SVG's IDs are unique within one file. If you paste multiple raw masters inline into one HTML document, prefix IDs and references for each copy or use the React component.

## Rendering and performance

- Transparent canvas; the central hub is intentionally dark and translucent.
- Designed primarily for a dark website background. Light and checkerboard modes expose transparency for inspection, rather than promising equal contrast on every colour.
- Named SVG gradients and two bounded glow filters. There are no external fonts, linked images, embedded PNGs, scripts, or external network dependencies in the master.
- Circuit geometry and icon positioning are fixed independently; no transform is baked into an animation target in a way that needs to be overwritten.
- Normal inner-layer rotation fits within the canvas. If zooming the entire logo through the viewport, let your intro overlay clip that zoom deliberately.
- Very small sizes naturally hide detailed ticks. Use a simplified mark for a favicon rather than shrinking the entire circuit composition to 16px.
- Animate wrapper transforms and opacity for a full-screen zoom. For low-powered devices, consider disabling the glow filters during extreme enlargement.

## Validation

Checked XML parsing, unique element IDs, internal gradient/filter references, zero embedded raster images, Chromium rendering on dark and light backgrounds, layer hide/show, infinity rotation, mobile page overflow, 256px rendering, and a transparent 4096px export. The preview produced no browser JavaScript errors. The React component is supplied as JSX source; it was not compiled against a React application in this workspace.

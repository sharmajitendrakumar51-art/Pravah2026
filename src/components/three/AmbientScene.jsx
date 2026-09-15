import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

// ============================================================
// AMBIENT SCENE — lightweight 3D environment for inner pages.
// Shares the hero's visual language (wire geometry + flowing
// particles) at a fraction of the cost, so every page feels part
// of the same universe without repeating the full hero core.
// ============================================================

const HUES = {
  cyan: '#22d3ee',
  violet: '#8b5cf6',
  magenta: '#e879f9',
  amber: '#fbbf24',
};

// Geometry varies per page so each route has its own signature form.
function Shell({ variant, color }) {
  const ref = useRef();
  const inner = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.12;
      ref.current.rotation.x = Math.sin(t * 0.2) * 0.16;
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.2;
      inner.current.rotation.z = t * 0.09;
    }
  });

  const geometry = useMemo(() => {
    switch (variant) {
      case 'torus':
        return <torusKnotGeometry args={[1.05, 0.28, 128, 20]} />;
      case 'octa':
        return <octahedronGeometry args={[1.45, 0]} />;
      case 'dodeca':
        return <dodecahedronGeometry args={[1.35, 0]} />;
      case 'sphere':
        return <sphereGeometry args={[1.3, 26, 18]} />;
      case 'box':
        return <boxGeometry args={[1.7, 1.7, 1.7, 4, 4, 4]} />;
      case 'cone':
        return <coneGeometry args={[1.25, 2.1, 5, 3]} />;
      default:
        return <icosahedronGeometry args={[1.35, 1]} />;
    }
  }, [variant]);

  return (
    <group>
      <mesh ref={ref}>
        {geometry}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.24} />
      </mesh>
      <mesh ref={inner} scale={0.55}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#0d1a2c"
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.25}
          transparent
          opacity={0.9}
        />
      </mesh>
      <pointLight position={[0, 0, 1.5]} intensity={12} distance={7} color={color} />
    </group>
  );
}

// Slow drifting field — the "flow" motif at ambient intensity.
function DriftField({ count, color }) {
  const ref = useRef();

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      seeds[i] = Math.random() * Math.PI * 2;
    }
    return { positions, seeds };
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const attr = ref.current?.geometry?.attributes?.position;
    if (!attr) return;
    const arr = attr.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += 0.0022 + Math.sin(seeds[i] + t * 0.4) * 0.0012;
      if (arr[i * 3 + 1] > 3.5) arr[i * 3 + 1] = -3.5;
    }
    attr.needsUpdate = true;
    if (ref.current) ref.current.rotation.y = t * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.024}
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function Rig({ children }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = state.pointer;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, p.x * 0.24, 2, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -p.y * 0.16, 2, delta);
  });

  return <group ref={group}>{children}</group>;
}

export default function AmbientScene({
  variant = 'icosa',
  hue = 'cyan',
  quality = 'high',
  offset = [2.6, 0, 0],
}) {
  const color = HUES[hue] ?? HUES.cyan;
  const isHigh = quality === 'high';

  return (
    <Canvas
      dpr={isHigh ? [1, 1.7] : [1, 1.3]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 5]} intensity={0.9} color="#e0f2fe" />
      <Rig>
        <group position={offset}>
          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.1}>
            <Shell variant={variant} color={color} />
          </Float>
        </group>
        <DriftField count={isHigh ? 700 : 280} color={color} />
      </Rig>
    </Canvas>
  );
}

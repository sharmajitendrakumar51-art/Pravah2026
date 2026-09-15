import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

// ============================================================
// PRAVAH CORE — original hero object
// A breathing energy core suspended inside a flowing particle
// vortex ("pravah" = flow), orbited by a neural node network.
// ============================================================

const CYAN = new THREE.Color('#22d3ee');
const VIOLET = new THREE.Color('#8b5cf6');
const MAGENTA = new THREE.Color('#e879f9');

// ------------------------------------------------ Energy core
function EnergyCore({ quality }) {
  const shellRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (shellRef.current) {
      shellRef.current.rotation.y = t * 0.18;
      shellRef.current.rotation.z = t * 0.07;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.12;
      wireRef.current.rotation.x = t * 0.05;
    }
  });

  return (
    <group>
      {/* Liquid inner core */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.18, quality === 'high' ? 24 : 10]} />
        <MeshDistortMaterial
          color="#0e2438"
          emissive="#155e75"
          emissiveIntensity={1.15}
          metalness={0.85}
          roughness={0.18}
          distort={0.42}
          speed={2.1}
        />
      </mesh>
      {/* Crystalline wire shell */}
      <mesh ref={wireRef} scale={1.5}>
        <icosahedronGeometry args={[1.18, 1]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.14} />
      </mesh>
      {/* Heart glow */}
      <pointLight position={[0, 0, 0]} intensity={26} distance={9} color="#22d3ee" />
    </group>
  );
}

// ------------------------------------------------ Particle vortex
// Points distributed along a spiral disc; per-frame they drift
// inward/outward and upward — a perpetual current of energy.
function VortexParticles({ count, radius = 3.4 }) {
  const ref = useRef();

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 4); // angle, radius, speed, y-offset
    for (let i = 0; i < count; i++) {
      const r = radius * (0.35 + Math.pow(Math.random(), 0.7) * 0.85);
      const angle = Math.random() * Math.PI * 2;
      seeds[i * 4 + 0] = angle;
      seeds[i * 4 + 1] = r;
      seeds[i * 4 + 2] = 0.12 + Math.random() * 0.35;
      seeds[i * 4 + 3] = (Math.random() - 0.5) * 2.4;
      positions[i * 3 + 0] = Math.cos(angle) * r;
      positions[i * 3 + 1] = seeds[i * 4 + 3];
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    return { positions, seeds };
  }, [count, radius]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const attr = ref.current?.geometry?.attributes?.position;
    if (!attr) return;
    const arr = attr.array;
    for (let i = 0; i < count; i++) {
      const angle = seeds[i * 4 + 0] + t * seeds[i * 4 + 2];
      const r = seeds[i * 4 + 1] + Math.sin(t * 0.5 + seeds[i * 4 + 0]) * 0.22;
      const yBase = seeds[i * 4 + 3];
      // rising flow, wrapping vertically
      const flow = ((t * 0.32 + yBase + 1.2) % 2.4) - 1.2;
      arr[i * 3 + 0] = Math.cos(angle) * r;
      arr[i * 3 + 1] = yBase * 0.35 + flow * 0.6;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color={CYAN}
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// ------------------------------------------------ Node network
function NodeNetwork({ count }) {
  const groupRef = useRef();

  const { nodes, lines } = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 1.6,
        (Math.random() - 0.5) * 2
      )
        .normalize()
        .multiplyScalar(2.6 + Math.random() * 1.2);
      nodes.push(v);
    }
    const pairs = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.45) pairs.push([nodes[i], nodes[j]]);
      }
    }
    const linePositions = new Float32Array(pairs.length * 6);
    pairs.forEach(([a, b], i) => {
      linePositions.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
    });
    return { nodes, lines: linePositions };
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06;
      groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.14;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? MAGENTA : i % 2 === 0 ? VIOLET : CYAN}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={VIOLET} transparent opacity={0.16} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

// ------------------------------------------------ Orbit rings
function OrbitRings() {
  const ringA = useRef();
  const ringB = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringA.current) {
      ringA.current.rotation.z = t * 0.22;
      ringA.current.rotation.x = 1.15 + Math.sin(t * 0.3) * 0.12;
    }
    if (ringB.current) {
      ringB.current.rotation.z = -t * 0.16;
      ringB.current.rotation.x = -0.9 + Math.cos(t * 0.24) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={ringA} rotation={[1.15, 0.3, 0]}>
        <torusGeometry args={[2.35, 0.006, 8, 128]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ringB} rotation={[-0.9, -0.5, 0]}>
        <torusGeometry args={[2.9, 0.005, 8, 128]} />
        <meshBasicMaterial color={MAGENTA} transparent opacity={0.35} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// ------------------------------------------------ Ambient dust
function DustField({ count }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.014;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#64748b"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ------------------------------------------------ Rig: parallax + scroll dolly
function Rig({ children, scrollRef }) {
  const group = useRef();
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const p = state.pointer;
    pointer.current.x = THREE.MathUtils.damp(pointer.current.x, p.x, 2.4, delta);
    pointer.current.y = THREE.MathUtils.damp(pointer.current.y, p.y, 2.4, delta);

    const g = group.current;
    if (g) {
      g.rotation.y = pointer.current.x * 0.22;
      g.rotation.x = -pointer.current.y * 0.14;
    }

    const cam = state.camera;
    const targetZ = 9 - (scrollRef?.current ?? 0) * 3.2;
    cam.position.z = THREE.MathUtils.damp(cam.position.z, targetZ, 2.2, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, (scrollRef?.current ?? 0) * 0.8, 2.2, delta);
    cam.lookAt(0, 0, 0);
  });

  return <group ref={group}>{children}</group>;
}

// ------------------------------------------------ Scene export
export default function HeroScene({ quality = 'high', scrollRef }) {
  const isHigh = quality === 'high';

  return (
    <Canvas
      dpr={isHigh ? [1, 1.8] : [1, 1.35]}
      camera={{ position: [0, 0.3, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <fog attach="fog" args={['#05060a', 9, 16]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[6, 8, 6]} intensity={1.1} color="#a5f3fc" />
      <directionalLight position={[-7, -4, 3]} intensity={0.6} color="#c4b5fd" />

      <Rig scrollRef={scrollRef}>
        <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.9}>
          <EnergyCore quality={quality} />
        </Float>
        <VortexParticles count={isHigh ? 2200 : 800} />
        <NodeNetwork count={isHigh ? 42 : 22} />
        <OrbitRings />
        <DustField count={isHigh ? 500 : 200} />
      </Rig>
    </Canvas>
  );
}

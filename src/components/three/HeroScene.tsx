'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Trail, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Theme colors
const COLORS = {
  orange: '#ff6b35',
  green: '#10b981',
  blue: '#3b82f6',
  purple: '#a855f7',
  cyan: '#06b6d4',
};

interface OrbitingSpheresProps {
  radius: number;
  speed: number;
  color: string;
  size: number;
  orbitPlane: 'XY' | 'XZ' | 'YZ' | 'diagonal';
  phaseOffset: number;
  orbitTilt: number;
}

function OrbitingSphere({
  radius,
  speed,
  color,
  size,
  orbitPlane,
  phaseOffset,
  orbitTilt,
}: OrbitingSpheresProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;

    const time = state.clock.elapsedTime * speed + phaseOffset;

    // Calculate position based on orbit plane
    let x = 0, y = 0, z = 0;

    switch (orbitPlane) {
      case 'XY':
        x = Math.cos(time) * radius;
        y = Math.sin(time) * radius;
        z = Math.sin(time * 0.5) * 0.3;
        break;
      case 'XZ':
        x = Math.cos(time) * radius;
        y = Math.sin(time * 0.5) * 0.3;
        z = Math.sin(time) * radius;
        break;
      case 'YZ':
        x = Math.sin(time * 0.5) * 0.3;
        y = Math.cos(time) * radius;
        z = Math.sin(time) * radius;
        break;
      case 'diagonal':
        x = Math.cos(time) * radius * 0.7;
        y = Math.sin(time) * radius * 0.7;
        z = Math.cos(time * 1.5) * radius * 0.5;
        break;
    }

    meshRef.current.position.set(x, y, z);

    // Mouse influence on orbit tilt
    const targetRotationX = pointer.y * 0.3 + orbitTilt;
    const targetRotationY = pointer.x * 0.3;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      0.02
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.02
    );
  });

  return (
    <group ref={groupRef}>
      <Trail
        width={size * 3}
        length={8}
        color={color}
        attenuation={(t) => t * t}
      >
        <mesh ref={meshRef}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshBasicMaterial
            color={color}
            toneMapped={false}
          />
        </mesh>
      </Trail>
    </group>
  );
}

// Configuration for all orbiting spheres
const sphereConfigs: OrbitingSpheresProps[] = [
  // Main orbits
  { radius: 2.5, speed: 0.6, color: COLORS.orange, size: 0.08, orbitPlane: 'XY', phaseOffset: 0, orbitTilt: 0.2 },
  { radius: 2.2, speed: 0.8, color: COLORS.blue, size: 0.06, orbitPlane: 'XZ', phaseOffset: Math.PI / 3, orbitTilt: -0.1 },
  { radius: 2.8, speed: 0.5, color: COLORS.green, size: 0.07, orbitPlane: 'YZ', phaseOffset: Math.PI / 2, orbitTilt: 0.3 },

  // Secondary orbits
  { radius: 1.8, speed: 1.0, color: COLORS.purple, size: 0.05, orbitPlane: 'diagonal', phaseOffset: Math.PI, orbitTilt: -0.2 },
  { radius: 2.0, speed: 0.7, color: COLORS.cyan, size: 0.06, orbitPlane: 'XY', phaseOffset: Math.PI * 1.5, orbitTilt: 0.1 },
  { radius: 2.4, speed: 0.9, color: COLORS.orange, size: 0.05, orbitPlane: 'XZ', phaseOffset: Math.PI / 4, orbitTilt: 0.25 },

  // Inner orbits (faster, smaller)
  { radius: 1.2, speed: 1.3, color: COLORS.blue, size: 0.04, orbitPlane: 'YZ', phaseOffset: Math.PI * 0.75, orbitTilt: -0.15 },
  { radius: 1.5, speed: 1.1, color: COLORS.green, size: 0.04, orbitPlane: 'diagonal', phaseOffset: Math.PI * 1.25, orbitTilt: 0.35 },

  // Outer orbits (slower, larger trails)
  { radius: 3.2, speed: 0.4, color: COLORS.purple, size: 0.09, orbitPlane: 'XY', phaseOffset: Math.PI * 0.5, orbitTilt: -0.3 },
  { radius: 3.0, speed: 0.45, color: COLORS.cyan, size: 0.08, orbitPlane: 'XZ', phaseOffset: Math.PI * 1.75, orbitTilt: 0.15 },
];

function CentralGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Subtle pulsing effect
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshBasicMaterial
        color={COLORS.orange}
        transparent
        opacity={0.15}
        toneMapped={false}
      />
    </mesh>
  );
}

function BackgroundParticles() {
  return (
    <Sparkles
      count={100}
      scale={15}
      size={1}
      speed={0.1}
      opacity={0.3}
      color="#ffffff"
    />
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={0.5} color={COLORS.orange} />

      <CentralGlow />

      {sphereConfigs.map((config, index) => (
        <OrbitingSphere key={index} {...config} />
      ))}

      <BackgroundParticles />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

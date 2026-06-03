"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";

/**
 * Floating distorted icosahedron — the hero's 3D accent. Lightweight (single
 * mesh) and lazy-loaded via next/dynamic from the hero. No orbit controls so it
 * never steals scroll.
 */
function Knot() {
  return (
    <Float speed={1.6} rotationIntensity={1.1} floatIntensity={1.4}>
      <Icosahedron args={[1.5, 6]}>
        <MeshDistortMaterial
          color="#00d9ff"
          emissive="#7b61ff"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.85}
          distort={0.38}
          speed={1.6}
        />
      </Icosahedron>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1.4} color="#00f5d4" />
      <directionalLight position={[-3, -2, 2]} intensity={1} color="#7b61ff" />
      <Suspense fallback={null}>
        <Knot />
      </Suspense>
    </Canvas>
  );
}

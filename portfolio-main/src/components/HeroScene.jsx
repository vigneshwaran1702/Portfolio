import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Subcomponent to animate particles with subtle drift
function ParticleField({ count = 800 }) {
  const pointsRef = useRef(null);
  
  // Create random positions for particles
  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 12; // x
      arr[i + 1] = (Math.random() - 0.5) * 12; // y
      arr[i + 2] = (Math.random() - 0.5) * 10; // z
    }
    return arr;
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Rotate particle field slowly
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.02;
      pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.05;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c084fc"
        size={0.03}
        sizeWrite={false}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// Subcomponent for the Distorted Sphere with Mouse Parallax
function DistortedSphere() {
  const meshRef = useRef(null);
  const { viewport } = useThree();
  const [mouse] = useState(() => new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse positions between -1 and 1
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouse]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      // Procedural floating motion
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.15;
      
      // Rotate based on time
      meshRef.current.rotation.y = time * 0.1;
      meshRef.current.rotation.x = Math.cos(time * 0.08) * 0.1;

      // Parallax hover reaction (interpolate positions)
      const targetX = mouse.x * (viewport.width * 0.05);
      const targetY = mouse.y * (viewport.height * 0.05);
      
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.8}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#eab308" // Gold/yellow sphere distort material
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.85}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

// WebGL availability checker hook
function useWebGLSupport() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const isSupported = !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setSupported(isSupported);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}

export default function HeroScene() {
  const isWebGLSupported = useWebGLSupport();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // WebGL Fallback layout or Reduced Motion fallback
  if (!isWebGLSupported || prefersReducedMotion) {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: 'radial-gradient(circle at 60% 40%, rgba(234, 179, 8, 0.15) 0%, rgba(253, 248, 226, 0) 60%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#fef08a" />
        <pointLight position={[-5, -3, -2]} intensity={1.0} color="#eab308" />
        
        <Suspense fallback={null}>
          <DistortedSphere />
          <ParticleField count={600} />
        </Suspense>
      </Canvas>
    </div>
  );
}

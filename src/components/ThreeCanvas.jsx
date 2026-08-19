import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Interactive Floating 3D Geometric Structure
function FloatingGeometry({ mouse }) {
  const meshRef = useRef();
  const wireframeRef = useRef();
  const torusRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotation based on time and mouse cursor
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.25;

      // Subtle position sway matching mouse coordinates
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.current.x * 2.5, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.current.y * 2.5, 0.05);
    }

    if (torusRef.current) {
      torusRef.current.rotation.x -= delta * 0.15;
      torusRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[3.2, 2]} />
        <meshBasicMaterial 
          wireframe 
          color="#ffffff" 
          transparent 
          opacity={0.07} 
        />
      </mesh>

      {/* Main Core Wireframe */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial 
          wireframe 
          color="#00f0ff" 
          emissive="#00f0ff"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Torus */}
      <mesh ref={torusRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Particle Field Background
function ParticleField() {
  const count = 600;
  const particlesRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 2;

      color.setHSL(0.5 + Math.random() * 0.2, 0.8, 0.7);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.03;
      particlesRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeCanvas() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#a855f7" />
        
        <FloatingGeometry mouse={mouse} />
        <ParticleField />
      </Canvas>
    </div>
  );
}

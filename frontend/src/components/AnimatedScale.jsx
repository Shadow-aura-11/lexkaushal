import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, Torus } from '@react-three/drei';

const AbstractJusticeElement = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        {/* Outer Ring */}
        <Torus args={[2.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
        </Torus>
        
        {/* Inner Ring */}
        <Torus args={[1.8, 0.02, 16, 100]} rotation={[0, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#b5952f" metalness={0.9} roughness={0.1} />
        </Torus>

        {/* Center Abstract Core */}
        <Sphere args={[0.8, 64, 64]}>
          <MeshDistortMaterial 
            color="#0a192f" 
            envMapIntensity={1} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            metalness={0.9} 
            roughness={0.1}
            distort={0.4} 
            speed={2} 
          />
        </Sphere>
      </Float>
    </group>
  );
};

export default function AnimatedScale() {
  return (
    <div className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#d4af37" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <AbstractJusticeElement />
      </Canvas>
    </div>
  );
}

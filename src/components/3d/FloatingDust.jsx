import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingDust() {
  const count = 500;
  const meshRef = useRef();

  const particles = useMemo(() => {
    return new Array(count).fill().map(() => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 10,
      speed: 0.002 + Math.random() * 0.005,
      factor: Math.random() * 100,
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let t = (particle.factor += particle.speed);
      dummy.position.set(
        particle.x + Math.sin(t) * 0.5,
        particle.y + Math.cos(t * 0.8) * 0.5,
        particle.z + Math.sin(t * 1.2) * 0.5
      );
      dummy.scale.setScalar(0.02 + Math.sin(t * 2) * 0.01);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} depthWrite={false} />
    </instancedMesh>
  );
}

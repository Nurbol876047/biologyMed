import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useSimulationStore';

const diseaseConfigs = {
  angina: { color: "#ef4444", shape: "capsule", size: 0.03, bounds: { x: 0.3, yOffset: 0.6, yRange: 0.2, z: 0.3 } }, // Горло/Шея (Красный)
  pneumonia: { color: "#06b6d4", shape: "capsule", size: 0.035, bounds: { x: 0.5, yOffset: 0.2, yRange: 0.4, z: 0.4 } }, // Легкие (Голубой)
  mrsa: { color: "#f97316", shape: "icosahedron", size: 0.04, bounds: { x: 0.6, yOffset: 0.1, yRange: 0.9, z: 0.5 } }, // Все тело (Оранжевый)
  flu: { color: "#eab308", shape: "sphere", size: 0.03, bounds: { x: 0.4, yOffset: 0.4, yRange: 0.5, z: 0.3 } }, // Голова/Грудь (Желтый)
  cold: { color: "#93c5fd", shape: "sphere", size: 0.02, bounds: { x: 0.3, yOffset: 0.7, yRange: 0.2, z: 0.3 } }, // Нос/Горло (Светло-синий)
  covid: { color: "#d946ef", shape: "icosahedron", size: 0.045, bounds: { x: 0.5, yOffset: 0.2, yRange: 0.4, z: 0.4 } }, // Легкие (Пурпурный колючий)
  bronchitis_viral: { color: "#22c55e", shape: "sphere", size: 0.035, bounds: { x: 0.4, yOffset: 0.1, yRange: 0.3, z: 0.3 } }, // Бронхи (Зеленый)
  chickenpox: { color: "#ef4444", shape: "sphere", size: 0.015, bounds: { x: 0.7, yOffset: 0.0, yRange: 1.0, z: 0.5 } }, // Кожа (Мелкий красный)
};

export default function BacteriaSwarm() {
  const count = 300;
  const meshRef = useRef();
  const phase = useStore(state => state.phase);
  const selectedDisease = useStore(state => state.selectedDisease) || 'angina';
  const selectedPatient = useStore(state => state.selectedPatient) || 'adult_male';
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const config = diseaseConfigs[selectedDisease] || diseaseConfigs.angina;
  
  const patientScales = { adult_male: 1.2, adult_female: 1.1, child: 0.7 };
  const ratio = (patientScales[selectedPatient] || 1.2) / 1.2;

  const particles = useMemo(() => {
    const { x, yOffset, yRange, z } = config.bounds;
    
    // Пересчет координат относительно "ног" модели (Y = -1.2), чтобы рой опускался вместе с ребенком
    const scaledYOffset = -1.2 + (yOffset + 1.2) * ratio;

    return new Array(count).fill().map(() => ({
      t: Math.random() * 100,
      speed: 0.01 + Math.random() / 150,
      x: (Math.random() - 0.5) * x * ratio,
      y: scaledYOffset + (Math.random() - 0.5) * yRange * ratio,
      z: (Math.random() - 0.5) * z * ratio,
    }))
  }, [count, selectedDisease, ratio]);

  useFrame(() => {
    if (!meshRef.current) return;
    
    particles.forEach((particle, i) => {
      let { t, speed, x, y, z } = particle;
      t = particle.t += speed;
      
      dummy.position.set(
        x + Math.sin(t) * 0.1 * ratio,
        y + Math.cos(t * 0.8) * 0.1 * ratio,
        z + Math.sin(t * 1.2) * 0.1 * ratio
      );

      const targetScale = phase === 'HEALING' ? 0 : config.size * ratio;
      dummy.scale.setScalar(THREE.MathUtils.lerp(dummy.scale.x || 0, targetScale, 0.05));
      
      dummy.rotation.set(t, t, t);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} castShadow>
      {config.shape === 'capsule' && <capsuleGeometry args={[1, 2, 16, 16]} />}
      {config.shape === 'sphere' && <sphereGeometry args={[1.5, 16, 16]} />}
      {config.shape === 'icosahedron' && <icosahedronGeometry args={[1.5, 0]} />}
      
      <meshPhysicalMaterial 
        color={config.color} 
        transmission={0.5} 
        roughness={0.2} 
        thickness={0.5} 
        emissive={config.color}
        emissiveIntensity={0.6}
      />
    </instancedMesh>
  );
}

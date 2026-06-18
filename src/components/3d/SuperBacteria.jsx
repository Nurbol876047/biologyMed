import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { useStore } from '../../store/useSimulationStore';

export default function SuperBacteria() {
  const meshRef = useRef();
  const selectedPatient = useStore(state => state.selectedPatient) || 'adult_male';
  
  const patientScales = { adult_male: 1.2, adult_female: 1.1, child: 0.7 };
  const ratio = (patientScales[selectedPatient] || 1.2) / 1.2;
  const scaledY = -1.2 + (0.4 + 1.2) * ratio; // Original Y was 0.4

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    const scale = (0.3 + Math.sin(state.clock.elapsedTime * 8) * 0.02) * ratio;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={[-0.2 * ratio, scaledY, 0.2 * ratio]} castShadow>
      <icosahedronGeometry args={[1, 32]} />
      <MeshDistortMaterial 
        color="#000000" 
        emissive="#ef4444" 
        emissiveIntensity={3.0} 
        distort={0.6}           
        speed={5}               
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useStore } from '../../store/useSimulationStore';
import antibioticsData from '../../data/antibiotics.json';

export default function SyringeModel() {
  const group = useRef();
  const plunger = useRef();
  const phase = useStore(state => state.phase);
  const selectedAntibiotic = useStore(state => state.selectedAntibiotic);

  const currentAntibiotic = antibioticsData.find(a => a.id === selectedAntibiotic) || antibioticsData[0];

  useEffect(() => {
    if (phase === 'INJECTING') {
      gsap.fromTo(group.current.position, 
        { x: 3, y: 1, z: 2 }, 
        { x: 0.8, y: 0.5, z: 0.5, duration: 1.5, ease: "power2.out" }
      );
      
      gsap.to(group.current.position, {
        x: 0.6, y: 0.5, z: 0.3, duration: 0.5, delay: 1.5, ease: "power1.in"
      });
      
      gsap.to(plunger.current.position, {
        y: -0.15, duration: 1.5, delay: 2, ease: "linear",
        onComplete: () => {
          useStore.getState().setPhase('SPREADING');
        }
      });
    }
  }, [phase]);

  return (
    <group ref={group} rotation={[-Math.PI / 4, 0, Math.PI / 4]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 32]} />
        <meshPhysicalMaterial transmission={1} roughness={0.05} thickness={0.05} ior={1.5} color="#ffffff" />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.2, 32]} />
        <meshStandardMaterial color={currentAntibiotic.color} emissive={currentAntibiotic.color} emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={plunger} position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.038, 0.038, 0.3, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.1, 8]} />
        <meshStandardMaterial color="#e2e8f0" metalness={1} roughness={0} />
      </mesh>
    </group>
  );
}

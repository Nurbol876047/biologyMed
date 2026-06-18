import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useSimulationStore';
import patientsData from '../../data/patients.json';
import gsap from 'gsap';

export default function PatientModel() {
  const group = useRef();
  const phase = useStore(state => state.phase);
  const selectedPatient = useStore(state => state.selectedPatient);
  
  const currentPatient = patientsData.find(p => p.id === selectedPatient) || patientsData[0];
  
  // Қайтадан скафандр моделін қосамыз
  const { scene, animations, materials } = useGLTF('/models/patient.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Пациент таңдалғанда масштабы өзгереді (бойы өседі не кішірейеді)
    if (group.current) {
      gsap.to(group.current.scale, {
        x: currentPatient.scale,
        y: currentPatient.scale,
        z: currentPatient.scale,
        duration: 1,
        ease: 'power3.out'
      });
    }
  }, [selectedPatient, currentPatient.scale]);

  useEffect(() => {
    // Анимацияны қосу (мысалы "Idle" - тыныс алу)
    if (actions && actions['Idle']) {
      actions['Idle'].play();
    }
    
    // Модельдің өз текстурасын қалдырып, тек жарқырауын (emissive) дайындаймыз
    if (materials) {
      Object.values(materials).forEach(mat => {
        if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
          // Текстуралары сақталады, скафандр көрінеді
          mat.transparent = false;
          mat.opacity = 1.0;
          mat.emissive = new THREE.Color('#000000');
          mat.emissiveIntensity = 0;
        }
      });
    }
  }, [actions, materials]);

  useFrame(() => {
    if (!materials) return;
    
    // Емдеу немесе мутация кезінде скафандр ақырын жарқырайды
    const targetGlow = (phase === 'SPREADING' || phase === 'HEALING') ? 0.3 : 0;
    
    Object.values(materials).forEach(mat => {
      if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
        if (phase === 'MUTATING') {
          mat.emissive.setHex(0xef4444); // қызыл жарқырау
          mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity || 0, 0.4, 0.05);
        } else {
          mat.emissive.setHex(0x3b82f6); // көк жарқырау
          mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity || 0, targetGlow, 0.05);
        }
      }
    });
  });

  return (
    <group ref={group} position={[0, -1.2, 0]} rotation={[0, Math.PI, 0]}>
       <primitive object={scene} castShadow receiveShadow />
    </group>
  );
}

useGLTF.preload('/models/patient.glb');

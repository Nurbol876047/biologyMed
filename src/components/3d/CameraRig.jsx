import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../../store/useSimulationStore';
import * as THREE from 'three';

export default function CameraRig() {
  const { camera } = useThree();
  const phase = useStore(state => state.phase);
  useEffect(() => {
    let pos;
    switch(phase) {
      case 'IDLE':
        pos = { x: 0, y: 0.5, z: 4 }; 
        break;
      case 'INJECTING':
        pos = { x: 1.5, y: 0.5, z: 1.5 }; 
        break;
      case 'SPREADING':
      case 'HEALING':
        pos = { x: 0, y: 0.5, z: 3 }; 
        break;
      case 'MUTATING':
        pos = { x: -0.5, y: 0.5, z: 1.5 }; 
        break;
    }

    gsap.to(camera.position, {
      x: pos.x, y: pos.y, z: pos.z,
      duration: 2.5,
      ease: 'power3.inOut'
    });
  }, [phase, camera]);

  return null;
}

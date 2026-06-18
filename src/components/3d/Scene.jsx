import { Environment, OrbitControls } from '@react-three/drei';
import { useStore } from '../../store/useSimulationStore';
import PatientModel from './PatientModel';
import SyringeModel from './SyringeModel';
import BacteriaSwarm from './BacteriaSwarm';
import SuperBacteria from './SuperBacteria';
import CameraRig from './CameraRig';
import Effects from './Effects';
import FloatingDust from './FloatingDust';

export default function Scene() {
  const phase = useStore(state => state.phase);

  return (
    <>
      <OrbitControls makeDefault enableDamping dampingFactor={0.05} maxPolarAngle={Math.PI / 1.5} />
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 2, 10]} />
      
      <ambientLight intensity={0.1} color="#ffffff" />
      <directionalLight position={[5, 10, 5]} intensity={2} castShadow color="#cbd5e1" />
      <spotLight position={[-5, 5, -2]} intensity={5} color="#3b82f6" penumbra={1} castShadow />
      
      <CameraRig />
      
      <PatientModel />
      {(phase === 'INJECTING' || phase === 'SPREADING') && <SyringeModel />}
      
      {phase !== 'HEALING' && <BacteriaSwarm />}
      {phase === 'MUTATING' && <SuperBacteria />}
      
      <FloatingDust />
      <Environment preset="city" />
      <Effects />
    </>
  );
}

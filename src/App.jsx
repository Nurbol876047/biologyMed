import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import Scene from './components/3d/Scene';
import OverlayPanel from './components/ui/OverlayPanel';
import DiagnosticChat from './components/ui/DiagnosticChat';
import MutationTree from './components/ui/MutationTree';
import CertificateCard from './components/ui/CertificateCard';
import Sidebar from './components/ui/Sidebar';
import { useStore } from './store/useSimulationStore';

export default function App() {
  const [isTreeOpen, setIsTreeOpen] = useState(false);
  const [certStatus, setCertStatus] = useState(null);
  const { phase, resistanceLevel, setPhase, resetResistance } = useStore();

  // Отслеживаем резистентность для сертификата поражения
  useEffect(() => {
    if (resistanceLevel >= 100 && certStatus !== 'defeat') {
      // Небольшая задержка, чтобы юзер увидел мутацию
      const timer = setTimeout(() => setCertStatus('defeat'), 2000);
      return () => clearTimeout(timer);
    }
  }, [resistanceLevel, certStatus]);

  // Отслеживаем успешное лечение
  useEffect(() => {
    if (phase === 'HEALING') {
      const timer = setTimeout(() => setCertStatus('victory'), 2000);
      return () => clearTimeout(timer);
    }
    // Автоматический переход от распространения лекарства к выздоровлению
    if (phase === 'SPREADING') {
      const timer = setTimeout(() => {
        setPhase('HEALING');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase, setPhase]);

  const handleCloseCert = () => {
    setCertStatus(null);
    resetResistance();
  };

  return (
    <div className="w-screen h-screen bg-black overflow-hidden font-sans">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <Sidebar />
      <OverlayPanel onOpenTree={() => setIsTreeOpen(true)} />
      <DiagnosticChat />
      <MutationTree isOpen={isTreeOpen} onClose={() => setIsTreeOpen(false)} />
      <CertificateCard status={certStatus} onClose={handleCloseCert} />
    </div>
  );
}

import { EffectComposer, Bloom, DepthOfField, Vignette, Noise } from '@react-three/postprocessing';
import { useStore } from '../../store/useSimulationStore';

export default function Effects() {
  const phase = useStore(state => state.phase);
  
  return (
    <EffectComposer disableNormalPass multisampling={4}>
      <Bloom 
        luminanceThreshold={0.1} 
        luminanceSmoothing={0.9} 
        intensity={phase === 'MUTATING' ? 3.5 : 1.5} 
        mipmapBlur 
      />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.2} />
    </EffectComposer>
  );
}

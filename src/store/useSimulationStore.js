import { create } from 'zustand';

const savedResistance = localStorage.getItem('amr_resistance') || 0;

export const useStore = create((set, get) => ({
  phase: 'IDLE', // Фазы: IDLE, INJECTING, SPREADING, HEALING, MUTATING
  resistanceLevel: parseInt(savedResistance, 10),
  selectedPatient: 'adult_male',
  selectedAntibiotic: 'penicillin',
  selectedDisease: 'angina',
  
  setSelectedPatient: (id) => set({ selectedPatient: id }),
  setSelectedAntibiotic: (id) => set({ selectedAntibiotic: id }),
  setSelectedDisease: (id) => set({ selectedDisease: id }),
  
  setPhase: (phase) => {
    if (phase === 'MUTATING') {
      // Увеличиваем глобальную резистентность на 25% при пропуске дозы
      const newRes = Math.min(get().resistanceLevel + 25, 100);
      localStorage.setItem('amr_resistance', newRes);
      set({ phase, resistanceLevel: newRes });
    } else {
      set({ phase });
    }
  },

  resetResistance: () => {
    localStorage.setItem('amr_resistance', 0);
    set({ resistanceLevel: 0, phase: 'IDLE' });
  }
}));

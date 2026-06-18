import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useSimulationStore';

export default function MutationTree({ isOpen, onClose }) {
  const { resistanceLevel } = useStore();

  const getStatus = (reqLevel) => {
    if (resistanceLevel >= reqLevel) return 'active';
    if (resistanceLevel + 25 >= reqLevel && resistanceLevel > 0) return 'next';
    return 'locked';
  };

  const Node = ({ title, desc, reqLevel, color, icon }) => {
    const status = getStatus(reqLevel);
    const isActive = status === 'active';
    const isNext = status === 'next';

    const activeStyles = {
      blue: 'bg-blue-900/40 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.4)]',
      amber: 'bg-amber-900/40 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.4)]',
      red: 'bg-red-900/40 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]'
    };

    return (
      <div className={`relative flex flex-col items-center p-4 rounded-2xl border-2 backdrop-blur-md transition-all duration-500 w-48 text-center
        ${isActive ? activeStyles[color] : 
          isNext ? 'bg-slate-800/40 border-slate-500/50 opacity-80' : 
          'bg-slate-900/20 border-slate-700 opacity-40 grayscale'}`}
      >
        <div className={`text-4xl mb-2 ${isActive ? '' : 'opacity-50'}`}>{icon}</div>
        <h3 className={`font-bold mb-1 ${isActive ? 'text-white' : 'text-slate-400'}`}>{title}</h3>
        <p className="text-xs text-slate-300 opacity-80">{desc}</p>
        
        {isActive && (
          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
            Ағымдағы
          </div>
        )}
      </div>
    );
  };

  const Arrow = ({ label, active }) => (
    <div className={`flex flex-col items-center justify-center px-4 ${active ? 'opacity-100' : 'opacity-30'}`}>
      <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider text-center max-w-[100px] mb-1">
        {label}
      </span>
      <div className={`h-1 w-16 md:w-24 rounded-full transition-all duration-500 ${active ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'bg-slate-700'}`}></div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 font-sans pointer-events-auto"
        >
          <div className="absolute top-6 right-6">
            <button onClick={onClose} className="text-white text-4xl hover:text-red-500 transition-colors">×</button>
          </div>

          <div className="flex flex-col items-center max-w-5xl w-full">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 text-center">Мутация Генеалогиясы</h2>
            <p className="text-slate-400 mb-12 text-center max-w-2xl">Бұл ағаш антибиотикті қате қолдану барысында бактериялардың қалай эволюцияға ұшырап, супербактерияға айналатынын ғылыми түрде көрсетеді.</p>

            <div className="flex flex-col md:flex-row items-center justify-center w-full gap-4 md:gap-0">
              
              <Node 
                title="Қарапайым Бактерия" 
                desc="Антибиотиктерге толық сезімтал. Емдеуге оңай көнеді."
                reqLevel={0}
                color="blue"
                icon="🦠"
              />

              <Arrow label="Курсты ерте тоқтату" active={resistanceLevel >= 25} />

              <Node 
                title="Шала Төзімді Штамм" 
                desc="Әлсіз бактериялар өлді, мықтылары тірі қалып көбейді."
                reqLevel={50}
                color="amber"
                icon="🧬"
              />

              <Arrow label="Дозаны өткізіп жіберу" active={resistanceLevel >= 75} />

              <Node 
                title="MRSA Супербактериясы" 
                desc="Барлық белгілі антибиотиктерге төзімді. Емделмейді."
                reqLevel={75}
                color="red"
                icon="☠️"
              />

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useStore } from '../../store/useSimulationStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function OverlayPanel({ onOpenTree }) {
  const { phase, setPhase, resistanceLevel, resetResistance } = useStore();

  return (
    <div className="absolute inset-0 pointer-events-none p-6 md:p-10 flex flex-col justify-between z-10 font-sans">
      <header className="flex justify-between items-start w-full">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-lg tracking-tight">AMR Vision</h1>
          <p className="text-slate-300 font-bold tracking-widest uppercase text-xs mt-2 opacity-90">Антибиотиктерге төзімділікпен күрестің цифрлық экожүйесі</p>
        </div>
        
        {/* Глобальный счетчик резистентности */}
        <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl w-64 text-right shadow-2xl pointer-events-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-xs font-bold uppercase tracking-wider">Глобалдық Резистенттілік</span>
            <span className={`text-xl font-black ${resistanceLevel >= 75 ? 'text-red-500 animate-pulse' : 'text-amber-400'}`}>
              {resistanceLevel}%
            </span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${resistanceLevel >= 75 ? 'bg-red-500' : 'bg-gradient-to-r from-amber-400 to-orange-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${resistanceLevel}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          {resistanceLevel > 0 && (
            <button onClick={resetResistance} className="text-slate-400 hover:text-white text-[10px] mt-2 underline opacity-70">
              Статистиканы нөлдеу (Reset)
            </button>
          )}
        </div>
      </header>

      <AnimatePresence>
        {phase === 'MUTATING' && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            className="absolute top-1/2 left-[45%] md:left-[40%] -translate-x-1/2 -translate-y-1/2 text-center w-[90vw] md:w-full px-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-700 animate-pulse drop-shadow-[0_0_50px_rgba(239,68,68,0.8)] whitespace-nowrap">
              МУТАЦИЯ АНЫҚТАЛДЫ
            </h2>
            <p className="text-red-200 font-bold text-xs sm:text-sm md:text-lg mt-4 tracking-[0.1em] md:tracking-[0.2em] uppercase">
              Аса қауіпті төзімділік деңгейіне жетті
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Основные кнопки управления (По центру) */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-4 pointer-events-auto w-full md:w-max px-4">
        <button 
          onClick={() => setPhase('INJECTING')}
          className="bg-black/60 hover:bg-emerald-600/80 backdrop-blur-xl border border-white/20 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl font-bold transition-all shadow-2xl text-sm md:text-base"
        >
          Дұрыс емдеу
        </button>
        <button 
          onClick={() => setPhase('MUTATING')}
          className="bg-black/60 hover:bg-red-600/80 backdrop-blur-xl border border-white/20 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl font-bold transition-all shadow-2xl text-sm md:text-base"
        >
          Дозаны өткізіп жіберу
        </button>
        <button 
          onClick={() => setPhase('IDLE')}
          className="bg-black/60 hover:bg-slate-600/80 backdrop-blur-xl border border-white/20 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl font-bold transition-all shadow-2xl text-sm md:text-base"
        >
          Қайта бастау
        </button>
      </div>

      {/* Дополнительные кнопки (Справа сверху, под счетчиком) */}
      <div className="absolute top-40 right-6 md:right-10 pointer-events-auto flex flex-col gap-4">
        <button 
          onClick={onOpenTree}
          className="bg-purple-900/60 hover:bg-purple-600/80 backdrop-blur-xl border border-purple-500/50 text-purple-100 px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold transition-all shadow-2xl flex items-center justify-center gap-2 text-sm md:text-base"
        >
          <span className="text-lg md:text-xl">🧬</span> Мутация Ағашы
        </button>
      </div>
    </div>
  );
}

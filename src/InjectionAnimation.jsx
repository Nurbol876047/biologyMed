import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function InjectionAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [statusText, setStatusText] = useState("Ожидание лечения...");

  const syringeControls = useAnimation();
  const fluidControls = useAnimation();
  const plungerControls = useAnimation();
  const glowControls = useAnimation();
  const bacteriaControls = useAnimation();
  const superbugAuraControls = useAnimation();

  const [bacteria] = useState(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: 165 + Math.random() * 70, 
      y: 160 + Math.random() * 100, 
      r: 4 + Math.random() * 3,
      delay: Math.random() * 2
    }))
  );

  const handleInject = async (isWrongTreatment) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setStatusText("Подготовка антибиотика...");

    bacteriaControls.set(i => ({ fill: '#10b981', scale: 1, opacity: 1 }));
    superbugAuraControls.set({ opacity: 0, scale: 0, rotate: 0 });
    syringeControls.set({ x: 400, y: -50, rotate: 60, opacity: 0 });
    fluidControls.set({ height: 78, y: -108 });
    plungerControls.set({ y: 0 });
    glowControls.set({ opacity: 0 });

    await syringeControls.start({ 
        x: 265, y: 210, rotate: 35, opacity: 1, 
        transition: { duration: 1, ease: "backOut" } 
    });

    setStatusText("Введение препарата...");

    fluidControls.start({ height: 0, y: -30, transition: { duration: 1.5, ease: "linear" } });
    await plungerControls.start({ y: 78, transition: { duration: 1.5, ease: "linear" } });

    syringeControls.start({ x: 450, y: 350, opacity: 0, transition: { duration: 0.8, ease: "easeIn" } });
    
    setStatusText("Распространение лекарства...");

    await glowControls.start({ opacity: [0, 0.6, 0], transition: { duration: 2, times: [0, 0.5, 1] } });

    if (isWrongTreatment) {
        setStatusText("КРИТИЧЕСКАЯ ОШИБКА: Обнаружена мутация!");
        
        bacteriaControls.start(i => ({
            fill: i === 0 ? '#7f1d1d' : '#ef4444', 
            scale: i === 0 ? 3 : 1.4,
            transition: { duration: 1.5, type: 'spring', bounce: 0.5, delay: i * 0.1 }
        }));
        
        superbugAuraControls.start({
            opacity: [0, 1], scale: [0, 3.5], rotate: [0, 360],
            transition: { 
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 1.5, type: 'spring' },
                opacity: { duration: 0.5 }
            }
        });
    } else {
        setStatusText("Лечение прошло успешно. Инфекция подавлена.");
        await bacteriaControls.start(i => ({
            scale: 0, opacity: 0,
            transition: { duration: 0.5, delay: i * 0.1 }
        }));
    }

    setTimeout(() => setIsAnimating(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-950 font-sans text-white w-full h-full">
      <div className="mb-6 text-center max-w-lg">
        <h1 className="text-3xl font-bold mb-2">Simulation Engine</h1>
        <p className="text-slate-400 text-sm">Процесс взаимодействия антибиотика с микрофлорой</p>
      </div>

      <div className="relative w-full max-w-md h-[500px] bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden mb-8 shadow-blue-900/20">
         <div className="absolute top-6 left-0 right-0 text-center z-10 px-4 flex justify-center">
            <motion.div 
              key={statusText}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-2 bg-slate-800/80 backdrop-blur rounded-full text-sm font-semibold text-slate-300 border border-slate-700/50 shadow-lg"
            >
              {statusText}
            </motion.div>
         </div>

         <svg width="100%" height="100%" viewBox="0 0 400 500" className="absolute inset-0">
            <g>
              <path d="M 170 160 Q 120 200 130 280" fill="none" stroke="#334155" strokeWidth="34" strokeLinecap="round"/>
              <path d="M 230 160 Q 280 200 270 280" fill="none" stroke="#334155" strokeWidth="34" strokeLinecap="round"/>
              <rect x="150" y="140" width="100" height="160" rx="40" fill="#1e293b" stroke="#334155" strokeWidth="6"/>
              <circle cx="200" cy="80" r="35" fill="#1e293b" stroke="#334155" strokeWidth="6"/>
            </g>

            <g>
              <path d="M 170 160 Q 120 200 130 280" fill="none" stroke="#1e293b" strokeWidth="26" strokeLinecap="round"/>
              <path d="M 230 160 Q 280 200 270 280" fill="none" stroke="#1e293b" strokeWidth="26" strokeLinecap="round"/>
              <rect x="153" y="143" width="94" height="154" rx="37" fill="#1e293b" stroke="none"/>
              <circle cx="200" cy="80" r="32" fill="#1e293b" stroke="none"/>
            </g>

            {bacteria.map((b, i) => (
              <g key={b.id} transform={`translate(${b.x}, ${b.y})`}>
                <motion.g 
                  animate={{ x: [0, Math.random()*6-3, 0], y: [0, Math.random()*6-3, 0] }} 
                  transition={{ repeat: Infinity, duration: 2 + b.delay, ease: "easeInOut" }}
                >
                  <motion.circle
                    custom={i}
                    animate={bacteriaControls}
                    initial={{ cx: 0, cy: 0, r: b.r, fill: '#10b981', scale: 1, opacity: 1 }}
                  />
                  {i === 0 && (
                    <motion.circle
                      animate={superbugAuraControls}
                      initial={{ cx: 0, cy: 0, r: b.r + 3, opacity: 0, scale: 0 }}
                      stroke="#f87171"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      fill="none"
                      style={{ transformOrigin: "0px 0px" }}
                    />
                  )}
                </motion.g>
              </g>
            ))}

            <motion.g animate={glowControls} initial={{ opacity: 0 }}>
              <path d="M 170 160 Q 120 200 130 280" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="26" strokeLinecap="round"/>
              <path d="M 230 160 Q 280 200 270 280" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="26" strokeLinecap="round"/>
              <rect x="153" y="143" width="94" height="154" rx="37" fill="rgba(59, 130, 246, 0.4)" />
              <circle cx="200" cy="80" r="32" fill="rgba(59, 130, 246, 0.4)" />
            </motion.g>

            <motion.g 
              animate={syringeControls} 
              initial={{ x: 400, y: -50, rotate: 60, opacity: 0 }}
              style={{ transformOrigin: "0px 0px" }}
            >
              <motion.g animate={plungerControls} initial={{ y: 0 }}>
                <rect x="-6" y="-150" width="12" height="45" fill="#475569" rx="2" />
                <rect x="-15" y="-155" width="30" height="5" fill="#475569" rx="2" />
              </motion.g>
              <rect x="-12" y="-110" width="24" height="85" rx="3" fill="rgba(255,255,255,0.15)" stroke="#cbd5e1" strokeWidth="2" />
              <motion.rect animate={fluidControls} initial={{ height: 78, y: -108 }} x="-10" width="20" fill="#3b82f6" rx="1" />
              <path d="M -6 -25 L 6 -25 L 2 -10 L -2 -10 Z" fill="#cbd5e1" />
              <line x1="0" y1="-10" x2="0" y2="0" stroke="#94a3b8" strokeWidth="2" />
            </motion.g>
         </svg>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
         <button 
            onClick={() => handleInject(false)} 
            disabled={isAnimating} 
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl transition-colors shadow-lg shadow-emerald-500/30"
         >
            Правильный курс
         </button>
         <button 
            onClick={() => handleInject(true)} 
            disabled={isAnimating} 
            className="flex-1 bg-red-500 hover:bg-red-400 disabled:bg-red-500/50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl transition-colors shadow-lg shadow-red-500/30"
         >
            Слабая доза (Ошибка)
         </button>
      </div>
    </div>
  );
}

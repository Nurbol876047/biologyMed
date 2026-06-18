import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ShieldAlert, Activity } from 'lucide-react';

export default function SuperBacteriaAlert({ isOpen, onClose }) {
  // Блокируем скролл при открытии
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md overflow-hidden font-sans"
        >
          {/* Тревожное красное свечение по краям экрана */}
          <motion.div 
            animate={{ 
              boxShadow: [
                "inset 0 0 50px rgba(239, 68, 68, 0.2)", 
                "inset 0 0 150px rgba(239, 68, 68, 0.6)", 
                "inset 0 0 50px rgba(239, 68, 68, 0.2)"
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
          />

          {/* Плавающие частицы заражения (SVG) */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.svg
                key={i}
                width="24" height="24" viewBox="0 0 24 24"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  scale: Math.random() * 0.5 + 0.5,
                  opacity: 0
                }}
                animate={{
                  y: [null, Math.random() * -200],
                  opacity: [0, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5
                }}
                className="absolute text-red-500 fill-current"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </motion.svg>
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center max-w-2xl w-full p-8">
            
            {/* ГЛАВНАЯ СУПЕРБАКТЕРИЯ (SVG) */}
            <motion.div
              initial={{ scale: 0.2, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 50, 
                damping: 10,
                delay: 0.2
              }}
              className="relative flex justify-center items-center mb-8"
            >
              {/* Пульсирующая аура */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-64 h-64 bg-red-600/30 rounded-full blur-3xl"
              />
              
              <svg width="200" height="200" viewBox="0 0 200 200" className="relative z-10">
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <radialGradient id="bugGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="80%" stopColor="#991b1b" />
                    <stop offset="100%" stopColor="#450a0a" />
                  </radialGradient>
                </defs>

                {/* Вращающиеся шипы (устойчивость) */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "100px 100px" }}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.path
                      key={i}
                      d="M 100 20 L 110 50 L 90 50 Z"
                      fill="#ef4444"
                      filter="url(#glow)"
                      transform={`rotate(${i * 30} 100 100)`}
                      animate={{ 
                        scaleY: [1, 1.5, 1],
                        y: [0, -10, 0]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        delay: i * 0.1 
                      }}
                    />
                  ))}
                </motion.g>

                {/* Ядро супербактерии */}
                <motion.circle
                  cx="100" cy="100" r="60"
                  fill="url(#bugGrad)"
                  filter="url(#glow)"
                  animate={{ 
                    r: [60, 65, 60] 
                  }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Внутренние "глаза" или структуру */}
                <circle cx="80" cy="90" r="12" fill="#fca5a5" opacity="0.8" />
                <circle cx="120" cy="90" r="12" fill="#fca5a5" opacity="0.8" />
                <path d="M 80 120 Q 100 140 120 120" fill="none" stroke="#fca5a5" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* ЗАГОЛОВОК И ТЕКСТ */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600 mb-4"
                animate={{ textShadow: ["0 0 20px rgba(239,68,68,0)", "0 0 20px rgba(239,68,68,0.8)", "0 0 20px rgba(239,68,68,0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                SUPER BACTERIA DETECTED
              </motion.h1>
              <p className="text-xl text-red-200 font-medium mb-10 max-w-lg mx-auto">
                Ошибка лечения привела к критической мутации. Инфекция приобрела полирезистентность.
              </p>

              {/* ПАНЕЛЬ ХАРАКТЕРИСТИК */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 1.2 }}
                  className="bg-red-950/50 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-400">
                    <Activity size={24} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-red-300/70 font-bold uppercase tracking-wider">Угроза сепсиса</div>
                    <div className="text-3xl font-black text-red-400">95%</div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 1.4 }}
                  className="bg-red-950/50 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-rose-500/20 rounded-full flex items-center justify-center text-rose-400">
                    <ShieldAlert size={24} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-red-300/70 font-bold uppercase tracking-wider">Устойчивость</div>
                    <div className="text-2xl font-black text-rose-400">Критическая</div>
                  </div>
                </motion.div>
              </div>

              {/* КНОПКА ВОЗВРАТА */}
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                onClick={onClose}
                className="group relative px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full overflow-hidden transition-all shadow-[0_0_40px_rgba(220,38,38,0.6)] hover:shadow-[0_0_60px_rgba(220,38,38,0.8)]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="flex items-center gap-2">
                  <AlertTriangle size={20} />
                  Начать экстренную терапию
                </span>
              </motion.button>
              
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

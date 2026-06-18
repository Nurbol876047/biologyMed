import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CertificateCard({ status, onClose }) {
  if (!status) return null;

  const isVictory = status === 'victory';

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 font-sans pointer-events-auto"
      >
        <div className={`relative max-w-2xl w-full rounded-3xl overflow-hidden border-2 ${isVictory ? 'border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.3)]' : 'border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.3)]'}`}>
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${isVictory ? 'from-emerald-900/40 to-slate-900' : 'from-red-900/40 to-slate-900'} z-0`}></div>
          
          <div className="relative z-10 p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{isVictory ? '🏆' : '☣️'}</div>
              <h2 className={`text-3xl md:text-5xl font-black mb-2 ${isVictory ? 'text-emerald-400' : 'text-red-400'}`}>
                {isVictory ? 'Сіз індеттің алдын алдыңыз!' : 'Супербактерия жасап шығардыңыз!'}
              </h2>
              <p className="text-slate-300 uppercase tracking-widest text-sm font-bold">
                {isVictory ? 'Сертификат: Сауатты Пациент' : 'Ескерту: Қауіпті Эволюция'}
              </p>
            </div>

            {/* Stats */}
            <div className="bg-black/50 rounded-2xl p-6 mb-8 border border-white/5">
              <h3 className="text-white font-bold mb-4 text-lg">📊 Нақты Статистика:</h3>
              <ul className="space-y-4">
                {isVictory ? (
                  <>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-1">✔</span>
                      <p className="text-slate-300 text-sm">Сіздің дұрыс әрекетіңіздің арқасында антибиотиктер өз күшін сақтап қалды.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-1">ℹ️</span>
                      <p className="text-slate-300 text-sm"><strong>ДДҰ мәліметі:</strong> Егер әр адам антибиотик курсын толық аяқтаса, әлемдегі дәрілердің тиімділігін 50 жылға дейін ұзартуға болады.</p>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">✖</span>
                      <p className="text-slate-300 text-sm">Антибиотикті үзу арқылы сіз бактерияларға «жаттығу» мүмкіндігін бердіңіз.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">ℹ️</span>
                      <p className="text-slate-300 text-sm"><strong>CDC және ДДҰ:</strong> Қазірдің өзінде әлемде жылына <strong>1.27 миллион</strong> адам антибиотикке төзімді бактериялардан көз жұмады. Ал 2050 жылға қарай бұл көрсеткіш 10 миллионға жетуі мүмкін.</p>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.print()}
                className={`px-8 py-3 rounded-xl font-bold text-white shadow-xl transition-transform hover:scale-105 ${isVictory ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'}`}
              >
                📥 Жүктеп алу / PDF
              </button>
              <button 
                onClick={onClose}
                className="px-8 py-3 rounded-xl font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Жаңа симуляция
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

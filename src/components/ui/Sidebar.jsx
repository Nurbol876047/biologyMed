import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useSimulationStore';
import clsx from 'clsx';
import { Pill, User, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import diseases from '../../data/diseases.json';
import antibiotics from '../../data/antibiotics.json';
import patients from '../../data/patients.json';

export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('meds');
  
  const { 
    selectedPatient, setSelectedPatient,
    selectedAntibiotic, setSelectedAntibiotic,
    selectedDisease, setSelectedDisease,
    setPhase
  } = useStore();

  const handleDiseaseSelect = (d) => {
    setSelectedDisease(d.id);
    // Сброс сцены при смене диагноза
    setPhase('IDLE');
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 bg-black/50 hover:bg-slate-800 backdrop-blur-md p-3 rounded-full text-white border border-white/10 shadow-lg"
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            className="fixed top-0 left-0 bottom-0 w-80 bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50 z-40 flex flex-col font-sans"
          >
            <div className="pt-20 pb-4 px-6 border-b border-slate-700/50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">AMR Control</h2>
              <div className="flex gap-2">
                <button onClick={() => i18n.changeLanguage('kk')} className={clsx("text-xs font-bold px-2 py-1 rounded", i18n.language === 'kk' ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400")}>KK</button>
                <button onClick={() => i18n.changeLanguage('ru')} className={clsx("text-xs font-bold px-2 py-1 rounded", i18n.language === 'ru' ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400")}>RU</button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex px-4 py-2 bg-slate-800/50">
              <button onClick={() => setActiveTab('meds')} className={clsx("flex-1 py-2 text-xs font-bold flex flex-col items-center gap-1 transition-colors", activeTab === 'meds' ? "text-blue-400" : "text-slate-500 hover:text-slate-300")}>
                <Pill size={16} /> {t('tab_meds')}
              </button>
              <button onClick={() => setActiveTab('patient')} className={clsx("flex-1 py-2 text-xs font-bold flex flex-col items-center gap-1 transition-colors", activeTab === 'patient' ? "text-emerald-400" : "text-slate-500 hover:text-slate-300")}>
                <User size={16} /> {t('tab_patient')}
              </button>
              <button onClick={() => setActiveTab('disease')} className={clsx("flex-1 py-2 text-xs font-bold flex flex-col items-center gap-1 transition-colors", activeTab === 'disease' ? "text-red-400" : "text-slate-500 hover:text-slate-300")}>
                <Activity size={16} /> {t('tab_disease')}
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
              
              {activeTab === 'meds' && antibiotics.map(a => (
                <div 
                  key={a.id} 
                  onClick={() => setSelectedAntibiotic(a.id)}
                  className={clsx("p-4 rounded-xl cursor-pointer border transition-all", selectedAntibiotic === a.id ? "bg-blue-900/30 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]" : "bg-slate-800/30 border-slate-700/50 hover:bg-slate-800")}
                >
                  <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: a.color }}></div>
                    {a.name_kk}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-300"><strong>Тағайындалуы:</strong> {a.indication_kk}</p>
                    <p className="text-[10px] text-slate-500">Механизмі: {a.mechanism_kk}</p>
                  </div>
                </div>
              ))}

              {activeTab === 'patient' && patients.map(p => (
                <div 
                  key={p.id} 
                  onClick={() => setSelectedPatient(p.id)}
                  className={clsx("p-4 rounded-xl cursor-pointer border transition-all", selectedPatient === p.id ? "bg-emerald-900/30 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "bg-slate-800/30 border-slate-700/50 hover:bg-slate-800")}
                >
                  <h3 className="text-white font-bold mb-1">{p.name_kk}</h3>
                  <p className="text-xs text-slate-400">Передозировка қаупі: {p.overdoseThreshold * 100}%</p>
                </div>
              ))}

              {activeTab === 'disease' && diseases.map(d => (
                <div 
                  key={d.id} 
                  onClick={() => handleDiseaseSelect(d)}
                  className={clsx("p-4 rounded-xl cursor-pointer border transition-all", selectedDisease === d.id ? "bg-red-900/30 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "bg-slate-800/30 border-slate-700/50 hover:bg-slate-800")}
                >
                  <h3 className="text-white font-bold mb-2">{d.name_kk}</h3>
                  <div className="text-xs space-y-2">
                    <div className="bg-slate-900/50 p-2 rounded border border-slate-700">
                      <span className="text-emerald-400 font-bold block mb-1">Дұрыс ем:</span>
                      <span className="text-slate-300">{d.explanation_kk}</span>
                    </div>
                    <div className="bg-slate-900/50 p-2 rounded border border-slate-700">
                      <span className="text-red-400 font-bold block mb-1">Қате шешім:</span>
                      <span className="text-slate-300">{d.wrongChoiceExplanation_kk}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

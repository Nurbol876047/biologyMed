import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useSimulationStore';
import diseasesData from '../../data/diseases.json';
import antibioticsData from '../../data/antibiotics.json';

export default function DiagnosticChat() {
  const { phase, selectedDisease, selectedAntibiotic } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Сәлеметсіз бе! Мен AntiBio Guard жасанды интеллект көмекшісімін. Қандай симптомдарыңыз бар? Мен диагноз қоюға және шешімдеріңіздің клиникалық салдарын түсіндіруге дайынмын.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const addAiMessage = (text) => {
    setMessages(prev => [...prev, { sender: 'ai', text }]);
    if (!isOpen) setUnread(prev => prev + 1);
  };

  useEffect(() => {
    const currentDisease = diseasesData.find(d => d.id === selectedDisease);
    const currentAntibiotic = antibioticsData.find(a => a.id === selectedAntibiotic);
    
    if (phase === 'INJECTING') {
      const isCorrect = currentDisease.correctAntibiotic === currentAntibiotic.id;
      
      if (isCorrect) {
        addAiMessage(`✅ Клиникалық Анализ: Сіз дұрыс шешім қабылдадыңыз!\n\nДиагноз: ${currentDisease.name_kk}\nДәрі: ${currentAntibiotic.name_kk}\n\nТүсініктеме: ${currentDisease.explanation_kk}`);
      } else {
        addAiMessage(`⚠️ ҚАТЕ ТАҢДАУ!\n\nСіз ${currentDisease.name_kk} ауруына ${currentAntibiotic.name_kk} бердіңіз.\n\nСалдары: ${currentDisease.wrongChoiceExplanation_kk}`);
        // Тут можно было бы принудительно перевести фазу в MUTATING, но оставим как информативное предупреждение
      }
      
      setIsOpen(true);
      setUnread(0);
    } else if (phase === 'MUTATING') {
      addAiMessage(`⚠️ КЛИНИКАЛЫҚ ҚАУІП: Дозаны өткізіп жібердіңіз!\n\nБұл ${currentDisease.name_kk} кезінде өте қауіпті. ${currentDisease.wrongChoiceExplanation_kk}\n\nНәтижесінде емделмейтін Супербактерия пайда болады.`);
      setIsOpen(true);
      setUnread(0);
    }
  }, [phase]);

  useEffect(() => {
    if (isOpen) setUnread(0);
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Имитация работы ИИ
    setTimeout(() => {
      const text = input.toLowerCase();
      let aiResponse = '';

      // Простая логика распознавания (NLP симуляциясы)
      if (text.includes('мұрын') || text.includes('су') || text.includes('түшкіру') || text.includes('бас ауыруы')) {
        aiResponse = 'Анализ нәтижесі: ВИРУСТЫҚ ИНФЕКЦИЯ ықтималдығы жоғары.\n\n⚠️ НАЗАР АУДАРЫҢЫЗ: Антибиотиктер вирустарды (соның ішінде тұмау, ЖРВИ) емдемейді! Оларды ішу тек сіздің иммунитетіңізді құртады және Супербактериялардың пайда болуына әкеледі. Көп сұйықтық ішіп, демалыңыз.';
      } else if (text.includes('ірің') || text.includes('39') || text.includes('40') || text.includes('көп күн') || text.includes('қан')) {
        aiResponse = 'Анализ нәтижесі: БАКТЕРИЯЛЫҚ ИНФЕКЦИЯ болуы мүмкін.\n\n✅ ҰСЫНЫС: Антибиотиктер қажет болуы мүмкін. Дереу дәрігерге қаралыңыз. Егер дәрігер антибиотик тағайындаса, курсты (мысалы, 7 күн) толық аяқтау міндетті! Ерте тоқтатсаңыз, мутация басталады.';
      } else {
        aiResponse = 'Симптомдарыңыз бойынша нақты шешім қабылдау қиын. Вирустық немесе бактериялық екенін анықтау үшін қан тапсыру қажет.\n\nЕсіңізде болсын: Антибиотикті тек дәрігердің нұсқауымен ғана қабылдаңыз!';
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 1000);
  };

  return (
    <>
      {/* Кнопка открытия чата */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 z-50 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 transition-transform hover:scale-105"
      >
        <span className="text-2xl">🤖</span>
        <span className="font-bold hidden md:inline">AntiBio Guard AI</span>
        {unread > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full animate-bounce shadow-lg border-2 border-slate-900">
            {unread}
          </span>
        )}
      </button>

      {/* Окно чата */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed right-6 bottom-24 z-50 w-[350px] md:w-[400px] h-[500px] bg-slate-900/90 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.2)] flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="bg-blue-600/20 border-b border-blue-500/30 p-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                  AI Diagnostics
                </h3>
                <p className="text-blue-300 text-xs">Симптомдарды талдау жүйесі</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-slate-800/50 border-t border-slate-700/50 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Симптомдарыңызды жазыңыз..." 
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-blue-600 disabled:bg-slate-700 text-white px-4 py-2 rounded-xl font-bold transition-colors"
              >
                ➔
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

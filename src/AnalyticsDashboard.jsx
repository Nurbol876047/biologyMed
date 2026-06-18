import React from 'react';
import { 
  AreaChart, Area, 
  LineChart, Line, 
  BarChart, Bar, 
  XAxis, YAxis, 
  CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend 
} from 'recharts';
import { Activity, ShieldAlert, Pill, HeartPulse } from 'lucide-react';

const simulationData = [
  { day: 1, normal: 2000, superbugs: 0, resistance: 5, effectiveness: 85, health: 90 },
  { day: 2, normal: 500, superbugs: 2, resistance: 8, effectiveness: 85, health: 92 },
  { day: 3, normal: 100, superbugs: 5, resistance: 15, effectiveness: 80, health: 95 },
  { day: 4, normal: 800, superbugs: 40, resistance: 35, effectiveness: 55, health: 85 },
  { day: 5, normal: 1500, superbugs: 250, resistance: 50, effectiveness: 30, health: 70 },
  { day: 6, normal: 2500, superbugs: 900, resistance: 75, effectiveness: 10, health: 45 },
  { day: 7, normal: 3000, superbugs: 2200, resistance: 95, effectiveness: 0, health: 15 },
];

export default function AnalyticsDashboard() {
  return (
    <div className="bg-[#F4F7FA] p-6 md:p-10 font-sans text-slate-900 w-full">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Панель Аналитики</h1>
            <p className="text-slate-500 font-medium mt-1">Отслеживание биометрии и мутаций в реальном времени</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 font-bold text-slate-700">
            Сценарий: <span className="text-rose-500">Раннее прекращение</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Динамика популяции" icon={<Activity />} color={{ bg: 'bg-emerald-100', text: 'text-emerald-600' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={simulationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSuper" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Area type="monotone" dataKey="normal" stroke="#10b981" strokeWidth={3} fill="url(#colorNormal)" name="Обычные" />
                <Area type="monotone" dataKey="superbugs" stroke="#ef4444" strokeWidth={3} fill="url(#colorSuper)" name="Супербактерии" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Уровень резистентности (%)" icon={<ShieldAlert />} color={{ bg: 'bg-amber-100', text: 'text-amber-500' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={simulationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="resistance" stroke="#f59e0b" strokeWidth={4} name="Сопротивляемость" dot={{ r: 5, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Эффективность лекарства (%)" icon={<Pill />} color={{ bg: 'bg-blue-100', text: 'text-blue-500' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={simulationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="effectiveness" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Эффективность" barSize={40}/>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Здоровье пациента (%)" icon={<HeartPulse />} color={{ bg: 'bg-rose-100', text: 'text-rose-500' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={simulationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="health" stroke="#f43f5e" strokeWidth={4} fill="url(#colorHealth)" name="Уровень здоровья" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, icon, color, children }) {
  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col h-[380px] hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-2xl ${color.bg} ${color.text}`}>
          {icon}
        </div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      </div>
      <div className="flex-1 w-full relative">
        {children}
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 min-w-[160px]">
        <p className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">День {label}</p>
        <div className="space-y-3">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-600">{entry.name}</span>
              </div>
              <span className="text-slate-900 font-black text-base">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

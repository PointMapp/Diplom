import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserStore } from "../store/useUserStore"; 
import { lessonsData } from "../constants/lessonsData"; 

const Dashboard = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  
  const { xp, completedLessons } = useUserStore();
  const totalLessons = lessonsData.length;
  const completionRate = Math.round((completedLessons.length / totalLessons) * 100);

  const progressData = [
    { day: 'Пн', progress: 20 },
    { day: 'Вт', progress: 45 },
    { day: 'Ср', progress: 60 },
    { day: 'Чт', progress: 75 },
    { day: 'Пт', progress: 90 },
    { day: 'Сб', progress: 85 },
    { day: 'Вс', progress: completionRate }
  ];

  const achievements = [
    {
      id: 1,
      title: "🚀 Первые шаги",
      description: "Завершите ваш первый урок",
      earned: completedLessons.length >= 1,
      rarity: "common"
    },
    {
      id: 2,
      title: "💻 Практик",
      description: "Решите 10 задач",
      earned: completedLessons.length >= 10,
      rarity: "rare"
    },
    {
      id: 3,
      title: "🔥 Серия побед",
      description: "Пройдите все уроки",
      earned: completedLessons.length === totalLessons && totalLessons > 0,
      rarity: "epic"
    }
  ];

  // ВАЖНО: Добавлен блок return
  return (
    <div className="min-h-screen text-white p-6 pt-24 max-w-6xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        Твой прогресс
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Карточка статистики */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="lg:col-span-1 bg-gray-800/50 p-6 rounded-3xl border border-white/10 backdrop-blur-md"
        >
          <h3 className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Всего опыта</h3>
          <p className="text-5xl font-black text-blue-400">{xp} <span className="text-xl">XP</span></p>
          <div className="mt-6">
            <h3 className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Завершено курсов</h3>
            <p className="text-3xl font-bold text-white">{completedLessons.length} / {totalLessons}</p>
          </div>
        </motion.div>

        {/* График прогресса */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-gray-800/50 p-6 rounded-3xl border border-white/10 backdrop-blur-md h-[300px]"
        >
          <h3 className="text-gray-400 text-sm mb-4 uppercase tracking-wider">Активность за неделю</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="day" stroke="#9CA3AF" axisLine={false} tickLine={false} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', borderRadius: '12px', border: 'none' }}
                itemStyle={{ color: '#60A5FA' }}
              />
              <Line 
                type="monotone" 
                dataKey="progress" 
                stroke="#3B82F6" 
                strokeWidth={4} 
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Список достижений */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Достижения</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <motion.div
              key={ach.id}
              whileHover={ach.earned ? { scale: 1.02 } : {}}
              className={`p-5 rounded-2xl border transition-all ${
                ach.earned 
                ? "bg-gray-800/80 border-blue-500/50 opacity-100" 
                : "bg-gray-900/50 border-white/5 opacity-40 grayscale"
              }`}
            >
              <div className="text-3xl mb-3">{ach.title.split(' ')[0]}</div>
              <h4 className="font-bold text-lg">{ach.title.split(' ').slice(1).join(' ')}</h4>
              <p className="text-gray-400 text-sm">{ach.description}</p>
              {ach.earned && <div className="mt-3 text-xs text-blue-400 font-bold">ОТКРЫТО ✅</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
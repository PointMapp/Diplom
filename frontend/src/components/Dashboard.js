// src/components/Dashboard.js
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [userProgress, setUserProgress] = useState({});

  // Загружаем прогресс пользователя из localStorage
  useEffect(() => {
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    const totalLessons = 3; // Общее количество уроков
    
    setUserProgress({
      completedLessons,
      totalLessons,
      completionRate: Math.round((completedLessons.length / totalLessons) * 100)
    });
  }, []);

  // Данные для графика прогресса
  const progressData = [
    { day: 'Пн', progress: 20 },
    { day: 'Вт', progress: 45 },
    { day: 'Ср', progress: 60 },
    { day: 'Чт', progress: 75 },
    { day: 'Пт', progress: 90 },
    { day: 'Сб', progress: 85 },
    { day: 'Вс', progress: userProgress.completionRate || 0 }
  ];

  // Достижения пользователя
  const achievements = [
    {
      id: 1,
      title: "🚀 Первые шаги",
      description: "Завершите ваш первый урок",
      earned: userProgress.completedLessons?.length >= 1,
      date: userProgress.completedLessons?.length >= 1 ? "2024-01-15" : null,
      details: "Это достижение открывает путь к более сложным задачам. Продолжайте в том же духе!",
      rarity: "common"
    },
    {
      id: 2,
      title: "💻 Практик",
      description: "Решите 10 задач в редакторе кода",
      earned: userProgress.completedLessons?.length >= 2,
      date: userProgress.completedLessons?.length >= 2 ? "2024-01-20" : null,
      details: "Вы показали отличные навыки практического программирования!",
      rarity: "rare"
    },
    {
      id: 3,
      title: "🔥 Серия побед",
      description: "Пройдите 3 урока подряд без ошибок",
      earned: userProgress.completedLessons?.length >= 3,
      date: userProgress.completedLessons?.length >= 3 ? "2024-01-25" : null,
      details: "Пройдите 3 последовательных урока с первой попытки для получения этого достижения",
      rarity: "epic"
    },
    {
      id: 4,
      title: "🎯 Снайпер",
      description: "Решите задачу с первой попытки",
      earned: true,
      date: "2024-01-18",
      details: "Идеальное решение! Ваш код был безупречен с первого раза.",
      rarity: "uncommon"
    }
  ];

  const openAchievementModal = (achievement) => {
    if (achievement.earned) {
      setSelectedAchievement(achievement);
    }
  };

  const closeModal = () => {
    setSelectedAchievement(null);
  };

  const getRarityColor = (rarity) => {
    const colors = {
      common: "from-gray-500/20 to-gray-600/20",
      uncommon: "from-green-500/20 to-teal-600/20",
      rare: "from-blue-500/20 to-purple-600/20",
      epic: "from-purple-500/20 to-pink-600/20",
      legendary: "from-yellow-500/20 to-orange-600/20"
    };
    return colors[rarity] || colors.common;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 pt-24">
      {/* Заголовок дашборда */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Мой Прогресс
        </h1>
        <p className="text-gray-400 mt-2">Отслеживайте ваши успехи в изучении JavaScript</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* График прогресса */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative p-6 rounded-2xl bg-gray-800 border border-gray-700 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>
          <div className="relative">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              📈 Прогресс обучения
              <span className="text-sm font-normal px-3 py-1 bg-green-500/20 text-green-400 rounded-full">
                {userProgress.completionRate || 0}% завершено
              </span>
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#EC4899' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Статистика */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          {/* Карточки статистики */}
          {[
            { 
              title: "Пройдено уроков", 
              value: userProgress.completedLessons?.length || 0, 
              icon: "📚", 
              change: `из ${userProgress.totalLessons || 0}` 
            },
            { 
              title: "Решено задач", 
              value: (userProgress.completedLessons?.length || 0) * 3, 
              icon: "💻", 
              change: "+8" 
            },
            { 
              title: "Текущая серия", 
              value: "3", 
              icon: "🔥", 
              change: "дня" 
            },
            { 
              title: "Уровень", 
              value: "Новичок", 
              icon: "⭐", 
              change: `${userProgress.completionRate || 0}%` 
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative p-4 rounded-xl bg-gray-800 border border-gray-700 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>
              <div className="relative">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.title}</div>
                <div className="text-xs text-green-400 mt-1">{stat.change}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Достижения */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 relative p-6 rounded-2xl bg-gray-800 border border-gray-700 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>
          <div className="relative">
            <h2 className="text-2xl font-bold mb-6">🏆 Мои Достижения</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: achievement.earned ? 1.02 : 1, y: achievement.earned ? -2 : 0 }}
                  onClick={() => openAchievementModal(achievement)}
                  className={`relative p-4 rounded-xl border overflow-hidden group cursor-${achievement.earned ? 'pointer' : 'default'} ${
                    achievement.earned 
                      ? 'bg-gray-700 border-gray-600 hover:border-purple-500' 
                      : 'bg-gray-900 border-gray-800 opacity-50'
                  } transition-all duration-300`}
                >
                  {/* Glow эффект для полученных достижений */}
                  {achievement.earned && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(achievement.rarity)} opacity-0 group-hover:opacity-100 blur-xl transition duration-500`}></div>
                  )}
                  
                  <div className="relative flex items-center gap-4">
                    <div className={`text-2xl ${!achievement.earned && 'grayscale'}`}>
                      {achievement.title.split(' ')[0]}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${achievement.earned ? 'text-white' : 'text-gray-500'}`}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {achievement.description}
                      </p>
                      {achievement.earned && achievement.date && (
                        <p className="text-xs text-green-400 mt-1">
                          Получено: {new Date(achievement.date).toLocaleDateString('ru-RU')}
                        </p>
                      )}
                    </div>
                    {achievement.earned ? (
                      <div className="text-2xl">✅</div>
                    ) : (
                      <div className="text-2xl">🔒</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Модальное окно достижения */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(selectedAchievement.rarity)} rounded-2xl opacity-20`}></div>
              
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-0 right-0 text-gray-400 hover:text-white transition-colors text-xl"
                >
                  ✕
                </button>
                
                <div className="text-4xl text-center mb-4">
                  {selectedAchievement.title.split(' ')[0]}
                </div>
                
                <h3 className="text-2xl font-bold text-center mb-2">
                  {selectedAchievement.title}
                </h3>
                
                <p className="text-gray-300 text-center mb-4">
                  {selectedAchievement.description}
                </p>
                
                <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-white mb-2">📖 Описание:</h4>
                  <p className="text-gray-300 text-sm">
                    {selectedAchievement.details}
                  </p>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Получено: {new Date(selectedAchievement.date).toLocaleDateString('ru-RU')}</span>
                  <span className="capitalize px-2 py-1 bg-gray-700 rounded">{selectedAchievement.rarity}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
import { motion } from "framer-motion";
import { useState } from "react";
import LevelUpModal from "../components/LevelUpModal";
import ProgressCircle from "../components/ProgressCircle";
import { AnimatePresence } from "framer-motion";


// ===========================
// 📌 1. ПОЛУЧАЕМ ДАННЫЕ
// ===========================

// Завершённые уроки
const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]");
const totalLessons = 3;

// XP по датам
const xpMap = JSON.parse(localStorage.getItem("xpByDate") || "{}");

// Берём сегодняшнюю дату
const today = new Date().toISOString().slice(0, 10);
const todayXP = xpMap[today] || 0;

// ===========================
// 📌 2. СТРИК (серия дней подряд)
// ===========================

function getStreak() {
  const dates = Object.keys(xpMap)
    .filter(date => xpMap[date] > 0)
    .sort()
    .reverse();

  if (dates.length === 0) return 0;

  let streak = 1;
  let prev = new Date(dates[0]);

  for (let i = 1; i < dates.length; i++) {
    const curr = new Date(dates[i]);
    const diff = (prev - curr) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
      prev = curr;
    } else {
      break;
    }
  }

  return streak;
}

const streak = getStreak();

// ===========================
// 📌 3. ВРЕМЯ ОБУЧЕНИЯ
// ===========================

const minutes = JSON.parse(localStorage.getItem("learningMinutes") || "0");

function formatTime(min) {
  if (min < 60) return `${min} минут`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h} ч ${m} мин`;
}

// Компонент Sparkle (заменяем @uidotdev/use-sparkles)
const Sparkle = ({ x, y }) => (
  <motion.div
    className="absolute w-2 h-2 bg-yellow-400 rounded-full pointer-events-none"
    initial={{ 
      scale: 0, 
      opacity: 0,
      x: x - 4,
      y: y - 4
    }}
    animate={{ 
      scale: [0, 1.5, 0],
      opacity: [0, 1, 0],
    }}
    transition={{ 
      duration: 0.8,
      ease: "easeOut"
    }}
    style={{
      left: x,
      top: y,
    }}
  />
);

// Компонент Sparkles wrapper (заменяем Sparkles из @uidotdev/use-sparkles)
const Sparkles = ({ children, density = 80, color = "#b26bff" }) => {
  const [localSparkles, setLocalSparkles] = useState([]);

  const handleMouseEnter = () => {
    const newSparkles = Array.from({ length: Math.min(density, 20) }).map(() => ({
      id: Math.random(),
      x: Math.random() * 100 + '%',
      y: Math.random() * 100 + '%',
    }));
    setLocalSparkles(newSparkles);
    
    setTimeout(() => setLocalSparkles([]), 1000);
  };

  return (
    <div 
      className="relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
    >
      <AnimatePresence>
        {localSparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute w-1 h-1 rounded-full pointer-events-none"
            initial={{ 
              scale: 0, 
              opacity: 0,
            }}
            animate={{ 
              scale: [0, 2, 0],
              opacity: [0, 0.8, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
            style={{
              left: sparkle.x,
              top: sparkle.y,
              backgroundColor: color,
            }}
          />
        ))}
      </AnimatePresence>
      {children}
    </div>
  );
};

export default function Profile() {
  const user = {
    username: "TestUser",
    points: 120,
    level: 3,
    nextLevelXP: 200,
  };

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  function levelUpTest() {
    setShowLevelUp(true);
    addSparkles();  
  }

  const progress = (user.points / user.nextLevelXP) * 100;
  
  function addSparkles() {
    const newSparkles = Array.from({ length: 6 }).map(() => ({
      id: Math.random(),
      x: Math.random() * 260 + 20,  // случайная позиция
      y: Math.random() * 120 + 20,
    }));

    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 800); // исчезают через 0.8 сек
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white px-6 pt-28 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-center">
        Профиль пользователя
      </h1>

      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        {/* Основная карточка */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="p-6 rounded-xl bg-gray-800 border border-gray-700 shadow-xl relative overflow-hidden group"
        >
          {/* Glow эффект */}
          <AnimatePresence>
            {sparkles.map((s) => (
              <Sparkle key={s.id} x={s.x} y={s.y} />
            ))}
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-br 
            from-blue-500/20 to-purple-600/20 opacity-0 
            group-hover:opacity-100 blur-2xl transition duration-500">
          </div>

          <motion.div
            className="p-6 rounded-xl bg-gray-800 border border-gray-700 shadow-xl flex items-center gap-6"
          >
            <ProgressCircle progress={progress} size={140} />

            <div>
              <h2 className="text-2xl font-semibold">{user.username}</h2>
              <p className="text-gray-400 mt-1">
                Уровень: <span className="text-blue-400">{user.level}</span>
              </p>
              <p className="text-gray-400">
                Прогресс уроков: {completedLessons.length} / {totalLessons}
              </p>
            </div>
          </motion.div>

          {/* Прогрессбар */}
          <div className="relative mt-6">
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-3 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {progress.toFixed(0)}% до следующего уровня
            </p>
          </div>
        </motion.div>

        <motion.button
          onClick={levelUpTest}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-lg font-semibold"
        >
          Level Up (test)
        </motion.button>

        {showLevelUp && (
          <LevelUpModal level={user.level + 1} onClose={() => setShowLevelUp(false)} />
        )}

        <ProgressCircle progress={45} size={140} />

        {/* Достижения */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Достижения</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Первый урок", "10 XP", "Первые шаги"].map((a, i) => (
              <Sparkles
                key={i}
                density={80}
                color="#b26bff"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="p-4 rounded-xl bg-gray-800 border border-gray-700 shadow-lg text-center relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br 
                    from-pink-500/20 to-purple-600/20 opacity-0 
                    group-hover:opacity-100 blur-xl transition duration-500">
                  </div>

                  <div className="relative">
                    <h3 className="font-semibold text-lg">{a}</h3>
                    <p className="text-gray-400 text-sm">Получено</p>
                  </div>
                </motion.div>
              </Sparkles>
            ))}
          </div>
        </div>

       {/* 📊 Блок статистики */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10"
          >
            <h2 className="text-2xl font-bold mb-4">Статистика обучения</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

              {/* Пройдено уроков */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-5 rounded-xl bg-gray-800 border border-gray-700 shadow-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

                <p className="text-gray-400 text-sm mt-1">
                  {completedLessons.length} / {totalLessons} завершено
                </p>

              </motion.div>

              {/* Streak */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-5 rounded-xl bg-gray-800 border border-gray-700 shadow-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

               <p className="text-gray-400 text-sm mt-1">
                {streak} дней подряд
                </p>

              </motion.div>

              {/* Время обучения */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-5 rounded-xl bg-gray-800 border border-gray-700 shadow-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-600/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

                <p className="text-gray-400 text-sm mt-1">
                  {formatTime(minutes)}
                </p>

              </motion.div>

              {/* XP сегодня */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-5 rounded-xl bg-gray-800 border border-gray-700 shadow-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

                <p className="text-gray-400 text-sm mt-1">
                  +{todayXP} XP
                </p>

              </motion.div>

            </div>
          </motion.div>

      </div>
    </motion.div>
  );
}
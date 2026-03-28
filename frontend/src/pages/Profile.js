import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import LevelUpModal from "../components/LevelUpModal";
import ProgressCircle from "../components/ProgressCircle";
import { useUserStore } from "../store/useUserStore";
import { lessonsData } from "../constants/lessonsData";
import PageWrapper from "../components/PageWrapper";

const Sparkle = ({ x, y }) => (
  <motion.div
    className="absolute w-2 h-2 bg-yellow-400 rounded-full pointer-events-none"
    initial={{ scale: 0, opacity: 0, x: x - 4, y: y - 4 }}
    animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    style={{ left: x, top: y }}
  />
);

const Sparkles = ({ children, density = 80, color = "#b26bff" }) => {
  const [localSparkles, setLocalSparkles] = useState([]);
  const handleMouseEnter = () => {
    const newSparkles = Array.from({ length: 15 }).map(() => ({
      id: Math.random(),
      x: Math.random() * 100 + '%',
      y: Math.random() * 100 + '%',
    }));
    setLocalSparkles(newSparkles);
    setTimeout(() => setLocalSparkles([]), 1000);
  };
  return (
    <div className="relative overflow-hidden" onMouseEnter={handleMouseEnter}>
      <AnimatePresence>
        {localSparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute w-1 h-1 rounded-full pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 0], opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ left: sparkle.x, top: sparkle.y, backgroundColor: color }}
          />
        ))}
      </AnimatePresence>
      {children}
    </div>
  );
};

export default function Profile() {
  const { user, xp, completedLessons } = useUserStore();
  const totalLessons = lessonsData.length;

  const XP_PER_LEVEL = 500;
  const currentLevel = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpInCurrentLevel = xp % XP_PER_LEVEL;
  const progress = (xpInCurrentLevel / XP_PER_LEVEL) * 100;

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  return (
    <PageWrapper>
      <motion.div
        className="min-h-screen bg-gray-900 text-white px-6 pt-28 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          
          <div className="text-center">
             <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
               Твой Профиль
             </h1>
             <p className="text-gray-500">Отслеживай свои достижения и прогресс</p>
          </div>

          {/* Основная карточка игрока */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="p-8 rounded-3xl bg-gray-800/50 border border-white/10 shadow-2xl relative overflow-hidden group backdrop-blur-sm"
          >
            <AnimatePresence>
              {sparkles.map((s) => <Sparkle key={s.id} x={s.x} y={s.y} />)}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              {/* Прогресс круг */}
              <div className="relative flex items-center justify-center">
                <ProgressCircle progress={progress} size={160} strokeWidth={10} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <motion.span 
                    key={currentLevel}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-black text-white leading-none"
                   >
                     {currentLevel}
                   </motion.span>
                   <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold mt-1">Уровень</span>
                </div>
              </div>

              <div className="text-center md:text-left flex-1">
                <h2 className="text-3xl font-bold mb-1">{user?.name || "Исследователь JS"}</h2>
                <p className="text-blue-400 font-medium mb-4 italic">
                  {xp < 500 ? "Новичок" : xp < 1500 ? "Junior" : "Мастер кода"}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
                    <p className="text-xs text-gray-500 uppercase font-bold">Всего опыта</p>
                    <p className="text-xl font-mono text-yellow-500">{xp} XP</p>
                  </div>
                  <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
                    <p className="text-xs text-gray-500 uppercase font-bold">Пройдено</p>
                    <p className="text-xl font-mono text-green-500">{completedLessons.length} / {totalLessons}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Прогрессбар */}
            <div className="mt-8">
              <div className="flex justify-between text-xs mb-2 px-1 text-gray-400">
                <span>Прогресс уровня</span>
                <span>{xpInCurrentLevel} / {XP_PER_LEVEL} XP</span>
              </div>
              <div className="w-full h-3 bg-gray-900 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Достижения */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-yellow-500">🏆</span> Достижения
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "Первый шаг", icon: "🚀", active: completedLessons.length > 0 },
                { title: "Коллекционер XP", icon: "💎", active: xp >= 100 },
                { title: "Отличник", icon: "🔥", active: totalLessons > 0 && completedLessons.length === totalLessons },
              ].map((achive, i) => (
                <Sparkles key={i} density={40} color={achive.active ? "#3b82f6" : "#374151"}>
                  <div className={`p-4 rounded-2xl border transition-all ${
                    achive.active ? "bg-gray-800 border-blue-500/50" : "bg-gray-800/20 border-white/5 grayscale"
                  }`}>
                    <div className="text-2xl mb-1">{achive.icon}</div>
                    <h3 className="font-bold text-sm">{achive.title}</h3>
                    <p className="text-[10px] text-gray-500">{achive.active ? "Получено" : "Закрыто"}</p>
                  </div>
                </Sparkles>
              ))}
            </div>
          </div>
        </div>

        {showLevelUp && (
          <LevelUpModal level={currentLevel} onClose={() => setShowLevelUp(false)} />
        )}
      </motion.div>
    </PageWrapper>
  );
}
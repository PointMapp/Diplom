import { useUserStore } from "../store/useUserStore";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { xp, level, completedLessons } = useUserStore();

  // Расчет прогресса до следующего уровня (допустим, каждый уровень = 100 XP)
  const progressToNextLevel = xp % 100;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-4xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
      >
        Ваш Прогресс
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Карточка Уровня */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center"
        >
          <div className="relative mb-4">
            <div className="text-6xl font-black text-blue-500">{level}</div>
            <div className="text-xs uppercase tracking-widest text-gray-400">Уровень</div>
          </div>
          <p className="text-gray-300">Всего накоплено: <span className="text-white font-bold">{xp} XP</span></p>
        </motion.div>

        {/* Секция прогресс-бара */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl"
        >
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-xl font-semibold">До следующего уровня</h2>
              <p className="text-sm text-gray-400">Нужно еще {100 - progressToNextLevel} XP</p>
            </div>
            <span className="text-blue-400 font-bold">{progressToNextLevel}%</span>
          </div>
          
          <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden p-1 border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressToNextLevel}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
          </div>
        </motion.div>

        {/* Список пройденных уроков */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-3 bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span>📚 Пройденные уроки</span>
            <span className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
              {completedLessons.length}
            </span>
          </h2>

          {completedLessons.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedLessons.map((lessonId) => (
                <div key={lessonId} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    ✓
                  </div>
                  <span className="font-medium text-gray-200">Урок №{lessonId}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Вы еще не завершили ни одного урока. Самое время начать!</p>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
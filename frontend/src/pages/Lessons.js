import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { useUserStore } from "../store/useUserStore"; 

export default function Lessons() {
  const completedLessons = useUserStore((state) => state.completedLessons || []);

  const lessons = [
    { id: 1, title: "Введение в JavaScript", description: "Основы языка, что такое JS и зачем он нужен." },
    { id: 2, title: "Переменные и типы данных", description: "let, const, var, типы данных и как они работают." },
    { id: 3, title: "Функции", description: "Function declaration, expression, стрелочные функции." },
    { id: 4, title: "Массивы и объекты", description: "Структуры данных, методы массива, создание объектов." },
    { id: 5, title: "DOM — Document Object Model", description: "Работа с HTML через JavaScript." },
    { id: 6, title: "Async JS: Promises & Async/Await", description: "Асинхронность, промисы и async/await." },
  ];

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto p-8 pt-24 min-h-screen">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Каталог уроков
        </motion.h1>

          {/* Секция прогресса */}
          <div className="mb-10 p-6 bg-gray-800/40 border border-gray-700 rounded-2xl">
            <div className="flex justify-between items-end mb-3">
              <div>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Общий прогресс курса</h2>
                <div className="text-2xl font-bold text-white">
                  {Math.round((completedLessons.length / lessons.length) * 100)}%
                </div>
              </div>
              <div className="text-right text-gray-400 text-sm">
                Пройдено: <span className="text-blue-400 font-bold">{completedLessons.length}</span> из {lessons.length}
              </div>
            </div>
            
            <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              />
            </div>
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }} 
                whileHover={{ y: -8 }}
              >
                <Link
                  to={`/lesson/${lesson.id}`}
                  className={`relative block h-full p-6 rounded-3xl border transition-all duration-300 backdrop-blur-md ${
                    isCompleted 
                    ? "bg-green-500/10 border-green-500/30 shadow-lg shadow-green-500/10" 
                    : "bg-white/5 border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20"
                  }`}
                >
                  {/* Индикатор "Пройдено" */}
                  {isCompleted && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                      Завершено ✓
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-2xl mb-4 flex items-center justify-center text-2xl ${
                    isCompleted ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                  }`}>
                    {lesson.id}
                  </div>

                  <h2 className={`text-2xl font-bold mb-3 ${isCompleted ? "text-green-300" : "text-white"}`}>
                    {lesson.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {lesson.description}
                  </p>

                  <div className="mt-6 flex items-center text-sm font-semibold text-blue-400 group">
                    Начать урок 
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserStore } from "../store/useUserStore"; 

export default function SidebarLessons({ current }) {
  // Достаем список завершенных ID
  const { completedLessons } = useUserStore();

  const lessons = [
    { id: 1, title: "Введение в JavaScript" },
    { id: 2, title: "Переменные и типы данных" },
    { id: 3, title: "Функции" },
    { id: 4, title: "Массивы и объекты" },
    { id: 5, title: "DOM – Document Object Model" },
    { id: 6, title: "Async JS: Promises" }
  ];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full lg:w-64 bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-xl rounded-2xl p-4 h-fit sticky top-28"
    >
      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
        Список уроков
      </h2>

      <ul className="space-y-2">
        {lessons.map((lesson) => {
          const isDone = completedLessons.includes(lesson.id);
          
          return (
            <li key={lesson.id}>
              <NavLink
                to={`/lesson/${lesson.id}`}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-300 ${
                    isActive || Number(current) === lesson.id
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20"
                      : "bg-gray-700/50 hover:bg-gray-600 text-gray-300 hover:text-white"
                  }`
                }
              >
                <span className="truncate">{lesson.title}</span>
                {isDone && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-2 text-green-400"
                  >
                    ✅
                  </motion.span>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
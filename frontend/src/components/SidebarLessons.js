import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function SidebarLessons({ current }) {
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
      className="w-64 bg-gray-800 shadow-xl rounded-xl p-4 h-fit sticky top-28 hidden lg:block"
    >
      <h2 className="text-xl font-bold text-blue-400 mb-4">Список уроков</h2>

      <ul className="space-y-2">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <NavLink
              to={`/lesson/${lesson.id}`}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md transition ${
                  isActive || Number(current) === lesson.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                }`
              }
            >
              {lesson.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

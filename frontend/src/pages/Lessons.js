import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

export default function Lessons() {
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
      <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Каталог уроков</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <Link
                to={`/lesson/${lesson.id}`}
                className="block bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-blue-500/30 transition"
              >
                <h2 className="text-2xl font-bold text-blue-400 mb-2">
                  {lesson.title}
                </h2>
                <p className="text-gray-300">{lesson.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

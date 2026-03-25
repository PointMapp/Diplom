import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen animated-bg text-white flex flex-col items-center justify-center px-6 pt-24">
      {/* Заголовок */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text"
      >
        Добро пожаловать в JS Learning Platform 
      </motion.h1>

      {/* Подзаголовок */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-300 max-w-2xl text-center mb-10"
      >
        Интерактивные уроки, редактор кода, тесты и геймификация — учись JavaScript
        легко, интересно и эффективно.
      </motion.p>

      {/* Кнопки */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex gap-4 flex-wrap justify-center"
      >
        {/* Кнопка Начать обучение */}
        <Link to="/register">
          <motion.div
            whileHover={{ scale: 1.07, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3 rounded-lg font-semibold text-white shadow-xl bg-gradient-to-r from-blue-500 to-blue-700 cursor-pointer">
            Начать обучение
          </motion.div>
        </Link>

        {/* Кнопка Войти */}
        <Link to="/login">
          <motion.div
            whileHover={{ scale: 1.07, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3 rounded-lg font-semibold text-white shadow-xl bg-gray-700 hover:bg-gray-800 cursor-pointer border border-white/10">
            Войти
          </motion.div>
        </Link>
        </motion.div>

      {/* Glow-карточки */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full"
      >
        {/* GLOW Card 1 */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative p-6 rounded-xl bg-gray-900 border border-gray-700 overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition duration-500"></div>
          <div className="relative">
            <h3 className="text-xl font-semibold mb-2">🎯 Уроки</h3>
            <p className="text-gray-400 text-sm">Пошаговые объяснения и примеры.</p>
          </div>
        </motion.div>

        {/* GLOW Card 2 */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative p-6 rounded-xl bg-gray-900 border border-gray-700 overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition duration-500"></div>
          <div className="relative">
            <h3 className="text-xl font-semibold mb-2">🧪 Практика</h3>
            <p className="text-gray-400 text-sm">Редактор кода прямо в браузере.</p>
          </div>
        </motion.div>

        {/* GLOW Card 3 */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative p-6 rounded-xl bg-gray-900 border border-gray-700 overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition duration-500"></div>
          <div className="relative">
            <h3 className="text-xl font-semibold mb-2">🔥 Геймификация</h3>
            <p className="text-gray-400 text-sm">Баллы, уровни, достижения.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
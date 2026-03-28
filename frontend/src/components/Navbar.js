import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useUserStore } from "../store/useUserStore"; // Добавим стор для проверки входа

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useUserStore(); // Допустим, в сторе есть объект user

  const navLinks = [
    { name: "Главная", path: "/" },
    { name: "Уроки", path: "/lessons" },
    { name: "Прогресс", path: "/dashboard" }, // Наш новый Dashboard
    { name: "Рейтинг", path: "/leaderboard" }, // Наш новый Leaderboard
    { name: "Профиль", path: "/profile" },
  ];

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-gray-900/80 backdrop-blur-md text-white shadow-lg fixed top-0 left-0 z-50 border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* ЛОГО */}
        <Link to="/" className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform">
          JS Learn
        </Link>

        {/* Десктопное меню */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors" 
              to={link.path}
            >
              {link.name}
            </Link>
          ))}
          
          <Link 
            className="ml-4 px-5 py-2 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm" 
            to="/login"
          >
            {user ? "Выйти" : "Войти"}
          </Link>
        </div>

        {/* Мобильная кнопка */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl p-2 bg-white/5 rounded-lg"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Мобильное меню */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-gray-900 border-t border-white/10 px-6 pb-6 shadow-xl"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              className="block py-4 border-b border-white/5 text-gray-300 font-medium" 
              to={link.path} 
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            className="block py-4 mt-4 text-center bg-blue-600 rounded-xl font-bold" 
            to="/login" 
            onClick={() => setOpen(false)}
          >
            {user ? "Выйти" : "Войти"}
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-gray-800 text-white shadow-lg fixed top-0 left-0 z-50"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* ЛОГО */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          JS Learn
        </Link>

        {/* Десктопное меню */}
        <div className="hidden md:flex items-center gap-8">
          <Link className="hover:text-blue-400 transition" to="/">Главная</Link>
          <Link className="hover:text-blue-400 transition" to="/lessons">Уроки</Link>
          <Link className="hover:text-blue-400 transition" to="/profile">Профиль</Link>
          <Link className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition" to="/login">
            Войти
          </Link>
        </div>

        {/* Мобильная кнопка */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl"
        >
          ☰
        </button>
      </div>

      {/* Мобильное меню */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-gray-900 px-6 pb-4"
        >
          <Link className="block py-2 border-b border-gray-700" to="/" onClick={() => setOpen(false)}>Главная</Link>
          <Link className="block py-2 border-b border-gray-700" to="/lessons" onClick={() => setOpen(false)}>Уроки</Link>
          <Link className="block py-2 border-b border-gray-700" to="/profile" onClick={() => setOpen(false)}>Профиль</Link>
          <Link className="block py-2 mt-2 text-center bg-blue-600 rounded-md" to="/login" onClick={() => setOpen(false)}>Войти</Link>
        </motion.div>
      )}
    </motion.nav>
  );
}

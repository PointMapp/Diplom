import { motion } from "framer-motion";

export default function LevelUpModal({ level, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Модальное окно */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 10,
        }}
        className="bg-gray-900 border border-purple-500/40 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center relative overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-2xl"></div>

        <div className="relative z-10">
          <motion.h1
            initial={{ scale: 0.7 }}
            animate={{ scale: 1.1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.2,
            }}
            className="text-4xl font-extrabold text-purple-400 mb-4"
          >
            LEVEL UP!
          </motion.h1>

          <p className="text-gray-300 text-lg mb-6">
            Поздравляем! Теперь у тебя уровень:
          </p>

          <p className="text-5xl font-bold text-white mb-6">{level}</p>

          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold shadow-lg"
          >
            Продолжить
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

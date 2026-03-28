import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserStore } from "../store/useUserStore";

const Home = () => {
  const { user } = useUserStore(); // Проверяем, авторизован ли юзер

  return (
    <div className="min-h-[calc(100vh-80px)] text-white flex flex-col items-center justify-center px-6">
      
      {/* Фоновое свечение для атмосферы */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -z-10"></div>

      {/* Заголовок */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-black mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-sm"
      >
        JS Learn Platform
      </motion.h1>

      {/* Подзаголовок */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg md:text-xl text-gray-400 max-w-2xl text-center mb-12 leading-relaxed"
      >
        Стань мастером JavaScript через практику. <br className="hidden md:block"/>
        Интерактивные уроки, живой код и система достижений.
      </motion.p>

      {/* Кнопки управления */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex gap-5 flex-wrap justify-center"
      >
        <Link to={user ? "/lessons" : "/register"}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl font-bold text-white bg-blue-600 shadow-lg transition-all"
          >
            {user ? "Продолжить обучение" : "Начать бесплатно"}
          </motion.button>
        </Link>

        {!user && (
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl font-bold text-white border border-white/10 backdrop-blur-sm transition-all"
            >
              Войти в аккаунт
            </motion.button>
          </Link>
        )}
      </motion.div>

      {/* Секция преимуществ */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full"
      >
        {[
          { 
            title: "🎯 Уроки", 
            desc: "От основ до продвинутых концепций JS.", 
            color: "from-blue-500/20 to-cyan-500/20",
            icon: "🚀" 
          },
          { 
            title: "🧪 Практика", 
            desc: "Пиши код и получай мгновенный результат.", 
            color: "from-purple-500/20 to-indigo-500/20",
            icon: "💻" 
          },
          { 
            title: "🏆 Рейтинг", 
            desc: "Соревнуйся с другими и копи достижения.", 
            color: "from-pink-500/20 to-rose-500/20",
            icon: "🔥" 
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="relative p-8 rounded-3xl bg-gray-800/40 border border-white/5 overflow-hidden group backdrop-blur-md"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <div className="relative">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
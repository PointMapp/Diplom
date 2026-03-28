import React from "react";
import { motion } from "framer-motion";
import { useUserStore } from "../store/useUserStore";
import PageWrapper from "../components/PageWrapper";

const Leaderboard = () => {
  const { xp, user } = useUserStore();

  // Имитация данных других пользователей для соревновательного эффекта
  const leaders = [
    { id: 1, name: "Darth Coder", xp: 2500, avatar: "👤", rank: "Master" },
    { id: 2, name: "JS Wizard", xp: 1800, avatar: "🧙‍♂️", rank: "Middle" },
    { id: 3, name: "React Queen", xp: 1200, avatar: "👸", rank: "Middle" },
    // Твой профиль вставляем динамически
    { id: "me", name: user?.name || "Вы", xp: xp, avatar: "🚀", rank: "You", isMe: true },
    { id: 4, name: "Junior Ninja", xp: 350, avatar: "🥷", rank: "Beginner" },
    { id: 5, name: "Bug Hunter", xp: 150, avatar: "🐛", rank: "Beginner" },
  ].sort((a, b) => b.xp - a.xp); // Сортируем по количеству очков

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-6 py-24 text-white">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">
            Таблица Лидеров
          </h1>
          <p className="text-gray-400">Стань лучшим среди разработчиков JavaScript!</p>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {/* Заголовки таблицы */}
          <div className="grid grid-cols-6 gap-4 p-6 border-b border-white/10 text-xs uppercase font-bold tracking-widest text-gray-500">
            <div className="col-span-1">Место</div>
            <div className="col-span-3">Пользователь</div>
            <div className="col-span-2 text-right">Опыт (XP)</div>
          </div>

          <div className="divide-y divide-white/5">
            {leaders.map((leader, index) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`grid grid-cols-6 gap-4 p-6 items-center transition-colors ${
                  leader.isMe ? "bg-blue-600/20 border-y border-blue-500/30" : "hover:bg-white/5"
                }`}
              >
                {/* Место */}
                <div className="col-span-1 flex items-center">
                  {index === 0 && <span className="text-2xl">🥇</span>}
                  {index === 1 && <span className="text-2xl">🥈</span>}
                  {index === 2 && <span className="text-2xl">🥉</span>}
                  {index > 2 && <span className="text-lg font-mono text-gray-500 ml-2">{index + 1}</span>}
                </div>

                {/* Аватар и Имя */}
                <div className="col-span-3 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl bg-gray-700 ${leader.isMe ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/50" : ""}`}>
                    {leader.avatar}
                  </div>
                  <div>
                    <div className={`font-bold ${leader.isMe ? "text-blue-400" : "text-white"}`}>
                      {leader.name} {leader.isMe && "(Вы)"}
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase font-black">{leader.rank}</div>
                  </div>
                </div>

                {/* Очки */}
                <div className="col-span-2 text-right">
                  <span className={`text-xl font-black ${leader.isMe ? "text-blue-400" : "text-yellow-500"}`}>
                    {leader.xp.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 ml-1 font-bold">XP</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Мотивационный футер */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-gray-500 text-sm italic"
        >
          Пройдите больше тестов, чтобы подняться выше в рейтинге!
        </motion.p>
      </div>
    </PageWrapper>
  );
};

export default Leaderboard;
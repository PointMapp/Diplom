import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { motion, AnimatePresence } from "framer-motion"; 
import { lessonsData } from "../constants/lessonsData";
import PageWrapper from "../components/PageWrapper";

export default function Quiz() {
  const { id } = useParams();
  const quizId = Number(id); // Превращаем строку из URL в число
  
  // 1. Находим нужный урок из общей базы данных
  const lesson = lessonsData.find(l => l.id === quizId);
  
  // 2. Достаем вопросы именно этого урока (из структуры, которую мы создали)
  const questions = lesson?.questions || [];

  const addXp = useUserStore((state) => state.addXp); 
  const completeLesson = useUserStore((state) => state.completeLesson);
  const completedLessons = useUserStore((state) => state.completedLessons || []);
  
  // Проверяем, был ли этот урок уже завершен
  const alreadyCompleted = completedLessons.includes(quizId);

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  // Если урок или вопросы не найдены
  if (!lesson || questions.length === 0) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
          <span className="text-6xl mb-4">🔍</span>
          <h2 className="text-2xl font-bold">Тест не найден</h2>
          <Link to="/lessons" className="mt-4 text-blue-400 hover:underline">Вернуться к списку</Link>
        </div>
      </PageWrapper>
    );
  }

  const handleAnswer = (index) => {
    // Проверка правильности (используем correctAnswer из нашей структуры)
    const isCorrect = index === questions[step].correctAnswer;
    let currentScore = score;

    if (isCorrect) {
      // Начисляем по 10 очков за каждый правильный ответ
      currentScore += 10; 
      setScore(currentScore);
    }

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      // Финиш теста
      if (!alreadyCompleted) {
        // Добавляем очки и помечаем урок выполненным в Zustand
        addXp(currentScore);
        completeLesson(quizId);
      }
      setStep("end");
    }
  };

  // Экран завершения
  if (step === "end") {
    return (
      <PageWrapper>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="min-h-screen flex flex-col items-center justify-center px-6 text-center text-white"
        >
          <div className="bg-gray-800/50 p-10 rounded-3xl border border-white/10 backdrop-blur-md">
            <h1 className="text-5xl mb-4 font-bold text-green-400 drop-shadow-lg">
              {score > 0 ? "Отличная работа! 🎉" : "Попробуй еще раз! 📚"}
            </h1>
            <p className="text-2xl mb-2">Тема: {lesson.title}</p>
            <p className="text-xl mb-8 opacity-80">Вы заработали: <span className="text-blue-400 font-bold">{score} XP</span></p>
            
            <div className="flex flex-col gap-4">
                <Link to="/lessons" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/50">
                К списку уроков
                </Link>
                
                <button onClick={() => window.location.reload()} className="text-gray-400 hover:text-white transition-colors">
                Пройти заново
                </button>
            </div>

            {alreadyCompleted && (
              <p className="text-yellow-400 text-sm mt-6 p-2 bg-yellow-400/10 rounded-lg">
                💡 Вы уже проходили этот тест. Очки опыта не были добавлены повторно.
              </p>
            )}
          </div>
        </motion.div>
      </PageWrapper>
    );
  }

  // Экран вопроса
  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-2xl w-full bg-gray-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
          
          {/* Прогресс-бар */}
          <div className="flex justify-between items-center mb-8">
            <span className="text-blue-400 font-medium text-sm uppercase tracking-wider">
              Вопрос {step + 1} из {questions.length}
            </span>
            <div className="h-1.5 w-32 bg-gray-700 rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
                 initial={{ width: 0 }}
                 animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
               ></motion.div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-8 leading-tight">
                {questions[step].text}
              </h2>

              <div className="grid gap-4">
                {questions[step].options.map((answer, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(i)}
                    className="w-full text-left px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-sm font-bold text-gray-400">
                            {String.fromCharCode(65 + i)}
                        </span>
                        {answer}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}
import { useState } from "react";
import { useParams, Link } from "react-router-dom"; // Добавили Link
import { useUserStore } from "../store/useUserStore";
import { motion, AnimatePresence } from "framer-motion"; // Для красоты

export default function Quiz() {
  const { id } = useParams();
  const quizId = Number(id);

  // Достаем функции из стора (убедись, что имена совпадают с useUserStore)
  const addXP = useUserStore((state) => state.addXp); 
  const completeLesson = useUserStore((state) => state.completeLesson);
  const completedLessons = useUserStore((state) => state.completedLessons || []);
  const alreadyCompleted = completedLessons.includes(quizId);

  const quizzes = {
    1: [
      { q: "Что такое JavaScript?", a: ["Язык разметки", "Язык программирования", "База данных"], correct: 1 },
      { q: "Где работает JavaScript?", a: ["В браузере", "Только на сервере", "Только в мобильных приложениях"], correct: 0 },
    ],
    2: [
      { q: "Как объявить переменную?", a: ["var", "let", "const", "все варианты верны"], correct: 3 },
    ],
  };

  const questions = quizzes[quizId] || [];
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl text-white">
        ❌ Тест не найден
      </div>
    );
  }

  const handleAnswer = (index) => {
    const isCorrect = index === questions[step].correct;
    let currentScore = score;

    if (isCorrect) {
      currentScore += 10; // Даем по 10 XP за верный ответ
      setScore(currentScore);
    }

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      // Если тест пройден впервые, начисляем XP
      if (!alreadyCompleted) {
        addXP(currentScore);
        completeLesson(quizId);
      }
      setStep("end");
    }
  };

  if (step === "end") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="text-5xl mb-4 font-bold text-green-400 drop-shadow-lg">Тест завершён! 🎉</h1>
        <p className="text-2xl mb-8">Результат: <span className="text-blue-400 font-bold">{score} XP</span></p>
        
        <Link to="/lessons" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/50">
          Вернуться к урокам
        </Link>

        {alreadyCompleted && (
          <p className="text-yellow-400 text-sm mt-4 opacity-80">
            ⚠️ Вы уже получали награду за этот тест.
          </p>
        )}
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-gray-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <span className="text-blue-400 font-medium">Вопрос {step + 1} из {questions.length}</span>
          <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
             <div 
               className="h-full bg-blue-500 transition-all duration-500" 
               style={{ width: `${((step + 1) / questions.length) * 100}%` }}
             ></div>
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
            <h2 className="text-2xl md:text-3xl font-semibold mb-8">{questions[step].q}</h2>

            <div className="grid gap-4">
              {questions[step].a.map((answer, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(i)}
                  className="w-full text-left px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-colors"
                >
                  {answer}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
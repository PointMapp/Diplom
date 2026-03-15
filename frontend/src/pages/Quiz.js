import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

export default function Quiz() {
  // получаем id из URL
  const { id } = useParams();

  // приводим id к числу
  const quizId = Number(id);

  const addXP = useUserStore((state) => state.addXP);
  const completeLesson = useUserStore((state) => state.completeLesson);
  const addDailyXP = useUserStore((state) => state.addDailyXP);
  const completedLessons = useUserStore((state) => state.completedLessons); // You need to get this from the store
  const alreadyCompleted = completedLessons.includes(quizId);

  const quizzes = {
    1: [
      {
        q: "Что такое JavaScript?",
        a: ["Язык разметки", "Язык программирования", "База данных"],
        correct: 1,
      },
      {
        q: "Где работает JavaScript?",
        a: ["В браузере", "Только на сервере", "Только в мобильных приложениях"],
        correct: 0,
      },
    ],

    2: [
      {
        q: "Как объявить переменную?",
        a: ["var", "let", "const", "все варианты верны"],
        correct: 3,
      },
    ],
  };

  const questions = quizzes[quizId] || [];
  
  const [step, setStep] = useState(0);
  const [points, setPoints] = useState(0);

  // если теста нет — выводим сообщение
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-3xl">
        ❌ Тест не найден
      </div>
    );
  }

  const handleAnswer = (index) => {
    const isCorrect = index === questions[step].correct;

    if (isCorrect) {
      setPoints((prev) => prev + 5);
    }

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const earnedXP = points + (isCorrect ? 5 : 0);

      addXP(earnedXP);
      addDailyXP(earnedXP);
      completeLesson(quizId);

      setStep("end");
    }
  };

  // конец теста
  if (step === "end") {
    return (
      <div className="min-h-screen bg-gray-900 text-white px-6 pt-28 pb-16 text-center">
        <h1 className="text-4xl mb-4 font-bold text-green-400">
          Тест завершён! 🎉
        </h1>

        <p className="text-2xl mb-6">
          Ты набрал: <span className="text-blue-400">{points}</span> очков
        </p>

        <a
          href="/lessons"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg"
        >
          Вернуться к урокам
        </a>

        {alreadyCompleted && (
          <p className="text-yellow-400 text-lg mt-2">
            ⚠️ Ты уже проходил этот тест — XP не начислены
          </p>
        )}
      </div>
    );
  }

  // сам тест
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">
        Вопрос {step + 1} из {questions.length}
      </h1>

      <p className="text-2xl mb-8">{questions[step].q}</p>

      <div className="space-y-4">
        {questions[step].a.map((answer, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="block w-full text-left px-6 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
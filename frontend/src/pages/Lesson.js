import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import SidebarLessons from "../components/SidebarLessons";
import { useUserStore } from "../store/useUserStore";
import { lessonsData } from "../constants/lessonsData";

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Работаем через Zustand (твой стор)
  const { addXp, completeLesson, completedLessons } = useUserStore();
  
  const lesson = lessonsData.find(l => l.id === Number(id));
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Сбрасываем код при смене урока
  useEffect(() => {
    if (lesson) {
      setCode(lesson.code);
      setOutput("");
    }
  }, [id, lesson]);

  const isCompleted = completedLessons.includes(Number(id));

  const runCode = () => {
    setRunning(true);
    setOutput("");
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    const iframeWindow = iframe.contentWindow;
    let outputText = "";

    try {
      iframeWindow.console.log = (...args) => {
        outputText += args.join(" ") + "\n";
      };
      iframeWindow.eval(code);
      
      // Если есть вывод и урок еще не пройден — завершаем его
      if (outputText.trim() && !isCompleted) {
        handleLessonFinish();
      }
    } catch (err) {
      outputText += "❌ Error: " + err.message;
    } finally {
      setOutput(outputText || "Код выполнен (нет вывода в консоль)");
      setRunning(false);
      setTimeout(() => document.body.removeChild(iframe), 50);
    }
  };

  const handleLessonFinish = () => {
    addXp(lesson.points);
    completeLesson(Number(id));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      легко: "from-green-500 to-emerald-600",
      средне: "from-yellow-500 to-amber-600", 
      сложно: "from-red-500 to-pink-600"
    };
    return colors[difficulty] || colors.легко;
  };

  if (!lesson) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Урок не найден</h2>
            <button onClick={() => navigate("/lessons")} className="bg-blue-600 px-4 py-2 rounded-lg">В каталог</button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8 pt-24">
        
        {/* Уведомление об успехе */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 px-6 py-3 rounded-xl shadow-lg"
            >
              🎉 Урок завершен! +{lesson.points} XP
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* Левая панель - Сайдбар */}
          <div className="xl:col-span-1">
            <SidebarLessons current={id} />
          </div>

          {/* Центральная часть - Контент и Редактор */}
          <div className="xl:col-span-3 space-y-6">
            
            {/* Хедер урока */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="flex gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase bg-gradient-to-r ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty}
                  </span>
                  {isCompleted && <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">✅ Пройдено</span>}
                </div>
                <h1 className="text-3xl font-bold">{lesson.title}</h1>
              </div>
              <div className="flex gap-2">
                <button onClick={() => navigate("/lessons")} className="bg-gray-700 px-4 py-2 rounded-xl text-sm">К списку</button>
                <button onClick={() => navigate(`/lesson/${id}/quiz`)} className="bg-blue-600 px-4 py-2 rounded-xl text-sm font-bold">Тест 🎯</button>
              </div>
            </div>

            {/* Блок теории */}
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-blue-400">Теория</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{lesson.content}</p>
            </div>

            {/* Редактор */}
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-green-400">Практика</h2>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-48 bg-black/50 p-4 font-mono text-green-400 rounded-xl border border-gray-600 focus:outline-none focus:border-green-500"
              />
              <div className="flex gap-4 mt-4">
                <button onClick={runCode} disabled={running} className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-xl font-bold transition-all">
                  {running ? "Запуск..." : "🚀 Выполнить"}
                </button>
                <button onClick={() => setCode(lesson.code)} className="bg-gray-700 px-6 py-2 rounded-xl">Сбросить</button>
              </div>
            </div>

            {/* Консоль */}
            <div className="bg-black/80 p-4 rounded-xl border border-gray-700 min-h-[100px]">
              <div className="text-xs text-gray-500 uppercase mb-2">Консоль</div>
              <pre className="text-sm font-mono text-white">{output || "> Ожидание запуска..."}</pre>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
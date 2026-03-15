// src/pages/Lesson.js
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import SidebarLessons from "../components/SidebarLessons";

const lessonsData = {
  1: {
    title: "Введение в JavaScript",
    content: `JavaScript — язык программирования, который делает веб-страницы интерактивными.
Он работает прямо в браузере и позволяет:
• менять текст
• реагировать на действия пользователя
• делать анимации
• отправлять запросы на сервер`,
    code: `// Нажмите "Run code" чтобы увидеть результат\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\nconsole.log(greet("Student"));`,
    difficulty: "легко",
    duration: "15 мин",
    points: 100,
    category: "basic"
  },
  2: {
    title: "Переменные и типы данных",
    content: `Переменные используются для хранения данных.
Типы данных: number, string, boolean, object, array.
let — можно менять
const — нельзя менять`,
    code: `let age = 18;\nconst name = "Alex";\nconsole.log(name + " is " + age + " years old");`,
    difficulty: "легко",
    duration: "20 мин",
    points: 150,
    category: "basic"
  },
  3: {
    title: "Функции",
    content: `Функции позволяют выполнять повторяющийся код.
Есть несколько способов их создания: function declaration, function expression, arrow functions.`,
    code: `// Пример стрелочной функции\nconst add = (a, b) => a + b;\nconsole.log(add(2, 3));`,
    difficulty: "средне",
    duration: "25 мин",
    points: 200,
    category: "functions"
  },
};

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lesson = lessonsData[id];
  const [code, setCode] = useState(lesson?.code || "");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Проверяем завершенность урока в localStorage
  useEffect(() => {
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    setIsCompleted(completedLessons.includes(parseInt(id)));
  }, [id]);

  if (!lesson) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 flex items-center justify-center pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold mb-2">Урок не найден</h2>
            <p className="text-gray-400 mb-6">Попробуйте вернуться к каталогу уроков.</p>
            <motion.a
              href="/lessons"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              Каталог уроков
            </motion.a>
          </motion.div>
        </div>
      </PageWrapper>
    );
  }

  const runCode = () => {
    setRunning(true);
    setOutput("");

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const iframeWindow = iframe.contentWindow;
    let outputText = "";

    try {
      // Перехватываем все методы console
      ['log', 'error', 'warn', 'info'].forEach(method => {
        iframeWindow.console[method] = function (...args) {
          outputText += args.join(" ") + "\n";
        };
      });

      // Выполнение кода
      iframeWindow.eval(code);
      
      // Проверяем успешное выполнение
      if (!outputText.includes('Error') && outputText.trim()) {
        // Если код выполнился успешно и есть вывод, отмечаем как выполненный
        markAsCompleted();
      }
    } catch (err) {
      outputText += "❌ Error: " + err.message + "\n";
    } finally {
      setOutput(outputText);
      setRunning(false);
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 50);
    }
  };

  const markAsCompleted = () => {
    if (!isCompleted) {
      setIsCompleted(true);
      const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      if (!completedLessons.includes(parseInt(id))) {
        completedLessons.push(parseInt(id));
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      легко: "from-green-500 to-emerald-600",
      средне: "from-yellow-500 to-amber-600", 
      сложно: "from-red-500 to-pink-600"
    };
    return colors[difficulty] || colors.легко;
  };

  function markLessonCompleted(id) {
  const saved = JSON.parse(localStorage.getItem("completedLessons") || "[]");

  if (!saved.includes(id)) {
    saved.push(id);
    localStorage.setItem("completedLessons", JSON.stringify(saved));
  }
}

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-6 lg:p-8">
        {/* Success Notification */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 rounded-2xl shadow-2xl shadow-green-500/25 flex items-center gap-3">
                <div className="text-2xl">🎉</div>
                <div>
                  <div className="font-bold">Урок завершен!</div>
                  <div className="text-sm opacity-90">+{lesson.points} очков опыта</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getDifficultyColor(lesson.difficulty)}`}>
                  {lesson.difficulty}
                </span>
                <span className="text-gray-400 text-sm">⭐ {lesson.points} очков</span>
                <span className="text-gray-400 text-sm">⏱️ {lesson.duration}</span>
                {isCompleted && (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-600">
                    ✅ Завершено
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {lesson.title}
              </h1>
              <p className="text-gray-400 mt-2">Урок #{id}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={() => navigate("/lessons")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 transition-all duration-300 font-semibold"
              >
                ← Назад
              </motion.button>

              <motion.button
                onClick={() => navigate(`/lesson/${id}/quiz`)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300"
              >
                Тест 🎯
              </motion.button>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* Sidebar */}
            <div className="xl:col-span-1">
              <SidebarLessons current={id} />
            </div>

            {/* Content Area */}
            <div className="xl:col-span-3 space-y-6 lg:space-y-8">
              {/* Lesson Content Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative bg-gray-800/50 rounded-2xl p-6 border border-gray-700 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">Теория</h2>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                      {lesson.content}
                    </p>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <span>📋</span>
                      Пример кода
                    </h3>
                    <div className="relative bg-black/80 rounded-xl p-4 border border-gray-600 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
                      <pre className="text-sm text-green-400 whitespace-pre-wrap relative font-mono leading-relaxed">
                        {lesson.code}
                      </pre>
                    </div>
                  </div>

                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 text-sm mt-6 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50"
                  >
                    💡 <strong>Совет:</strong> Попробуйте изменить код в редакторе ниже и нажмите «Run code» чтобы увидеть результат.
                  </motion.p>
                </div>
              </motion.div>

              {/* Code Editor Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative bg-gray-800/50 rounded-2xl p-6 border border-gray-700 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-green-400 to-teal-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">Практика</h2>
                  </div>

                  <div className="space-y-4">
                    <label className="text-lg font-semibold text-gray-300">Редактор кода</label>
                    
                    <motion.textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-64 bg-zinc-900/80 text-green-400 text-lg rounded-xl p-6 font-mono focus:outline-none focus:ring-2 focus:ring-green-500/50 border border-gray-600 resize-none transition-all duration-300"
                      placeholder="// Напишите ваш код здесь..."
                    />

                    <div className="flex flex-wrap gap-3 pt-4">
                      <motion.button
                        onClick={runCode}
                        disabled={running}
                        whileHover={!running ? { scale: 1.05 } : {}}
                        whileTap={!running ? { scale: 0.95 } : {}}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          running 
                            ? "bg-gray-600 cursor-not-allowed" 
                            : "bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-2xl hover:shadow-green-500/25"
                        }`}
                      >
                        {running ? (
                          <span className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            Выполняется...
                          </span>
                        ) : (
                          "🚀 Run Code"
                        )}
                      </motion.button>

                      <motion.button
                        onClick={() => {
                          setCode(lesson.code || "");
                          setOutput("");
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition-all duration-300 border border-gray-600"
                      >
                        🔄 Сбросить
                      </motion.button>

                      <motion.button
                          onClick={() => {
                              markLessonCompleted(id);
                              navigate(`/lesson/${id}/quiz`);
                            }}
                            className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold"
                          >
                            Пройти тест

                      </motion.button>
                    </div>

                    {/* Output Panel */}
                    <div className="mt-6 bg-black/80 rounded-xl p-4 border border-gray-600 min-h-32">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-full"></div>
                        <h4 className="text-lg font-semibold text-gray-300">Output</h4>
                      </div>
                      <pre className="text-lg text-white whitespace-pre-wrap font-mono leading-relaxed">
                        {output || "— Результат выполнения появится здесь —"}
                      </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Progress Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 lg:mt-12 p-6 bg-gray-800/50 rounded-2xl border border-gray-700"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Ваш прогресс</h3>
                <p className="text-gray-400">
                  {isCompleted ? "🎉 Вы завершили этот урок!" : "Продолжайте изучать материал и практиковаться"}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{lesson.points}</div>
                  <div className="text-sm text-gray-400">очков</div>
                </div>
                
                <div className="w-48 bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? '100%' : '30%' }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
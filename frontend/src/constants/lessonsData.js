export const lessonsData = [
  {
    id: 1,
    title: "Введение в JavaScript",
    difficulty: "легко",
    points: 100,
    duration: "10 мин",
    content: "JavaScript — это самый популярный язык программирования для веба...",
    code: "console.log(10);",
    expected: "10",
    questions: [
      {
        id: "q1_1",
        text: "Для чего в основном используется JavaScript в браузере?",
        options: [
          "Для верстки структуры сайта",
          "Для придания стилей и цветов",
          "Для создания интерактивности и логики",
          "Для работы с базами данных напрямую"
        ],
        correctAnswer: 2
      },
      {
        id: "q1_2",
        text: "Какая команда выводит данные в консоль браузера?",
        options: ["print()", "console.log()", "log.write()", "display()"],
        correctAnswer: 1
      }
    ]
  }, 
  {
    id: 2,
    title: "Переменные и типы данных",
    difficulty: "легко",
    points: 150,
    duration: "15 мин",
    content: "В современном JS для создания переменных используются ключевые слова let и const...",
    code: "let x = 5;\nconsole.log(x);",
    expected: "5",
    questions: [
      {
        id: "q2_1",
        text: "Какое ключевое слово используется для переменной, значение которой НЕ будет меняться?",
        options: ["var", "let", "const", "static"],
        correctAnswer: 2
      },
      {
        id: "q2_2",
        text: "Что произойдет, если попытаться изменить значение переменной, объявленной через const?",
        options: [
          "Значение успешно изменится",
          "Программа проигнорирует изменение",
          "Произойдет ошибка (TypeError)",
          "Переменная удалится"
        ],
        correctAnswer: 2
      }
    ]
  }, 
  {
    id: 3,
    title: "Функции",
    difficulty: "средне",
    points: 200,
    duration: "20 мин",
    content: "Функция — это блок кода, который можно вызывать многократно. Используйте ключевое слово function.",
    code: "function hello() {\n  return 'Привет';\n}\nconsole.log(hello());",
    expected: "Привет",
    questions: [
      {
        id: "q3_1",
        text: "Как правильно объявить функцию?",
        options: ["func myFunc()", "function myFunc()", "let function = ()", "def myFunc()"],
        correctAnswer: 1
      }
    ]
  } 
];
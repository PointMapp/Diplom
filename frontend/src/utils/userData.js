// =========================================
// 📌 ЕДИНЫЕ ДАННЫЕ ПРОЕКТА (LocalStorage)
// =========================================

const defaultData = {
  completedLessons: [],
  xp: 0,
  level: 1,
  xpByDate: {},
  learningMinutes: 0,
};

// Загружаем
export function loadUserData() {
  const data = JSON.parse(localStorage.getItem("userData"));
  return data || { ...defaultData };
}

// Сохраняем
export function saveUserData(data) {
  localStorage.setItem("userData", JSON.stringify(data));
}

// =========================================
// 📌 ФУНКЦИИ ОБНОВЛЕНИЯ
// =========================================

// ➤ Добавить завершённый урок
export function completeLesson(id) {
  const data = loadUserData();

  if (!data.completedLessons.includes(id)) {
    data.completedLessons.push(id);
    saveUserData(data);
  }
}

// ➤ Начислить XP
export function addXP(amount) {
  const data = loadUserData();
  data.xp += amount;

  // Проверяем на уровень
  const nextLevelXP = data.level * 100;

  if (data.xp >= nextLevelXP) {
    data.level += 1;
  }

  saveUserData(data);
}

// ➤ Сохранить прогресс по дате
export function addDailyXP(amount) {
  const data = loadUserData();

  const today = new Date().toISOString().slice(0, 10);

  data.xpByDate[today] = (data.xpByDate[today] || 0) + amount;

  saveUserData(data);
}

// ➤ Время обучения
export function addLearningMinutes(min) {
  const data = loadUserData();
  data.learningMinutes += min;
  saveUserData(data);
}

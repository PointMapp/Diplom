import { create } from "zustand";
import { loadUserData, saveUserData } from "../utils/userData";

export const useUserStore = create((set, get) => ({
  // Загружаем данные при старте
  ...loadUserData(),

  // =============================
  //   ⭐ ОБНОВЛЕНИЕ ПРОГРЕССА
  // =============================

  completeLesson: (id) => {
    const data = get();

    if (!data.completedLessons.includes(id)) {
      const updated = {
        ...data,
        completedLessons: [...data.completedLessons, id],
      };

      saveUserData(updated);
      set(updated);
    }
  },

  addXP: (amount) => {
    const data = get();
    let newXP = data.xp + amount;
    let newLevel = data.level;

    const nextLevelXP = data.level * 100;

    if (newXP >= nextLevelXP) {
      newLevel++;
      newXP -= nextLevelXP;
    }

    const updated = {
      ...data,
      xp: newXP,
      level: newLevel,
    };

    saveUserData(updated);
    set(updated);
  },

  addDailyXP: (amount) => {
    const data = get();
    const today = new Date().toISOString().slice(0, 10);

    const updated = {
      ...data,
      xpByDate: {
        ...data.xpByDate,
        [today]: (data.xpByDate[today] || 0) + amount,
      },
    };

    saveUserData(updated);
    set(updated);
  },

  addLearningMinutes: (min) => {
    const data = get();

    const updated = {
      ...data,
      learningMinutes: data.learningMinutes + min,
    };

    saveUserData(updated);
    set(updated);
  }
}));

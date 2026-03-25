import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      xp: 0,
      level: 1,
      completedLessons: [],
      
      setUser: (userData) => set({ user: userData }),
      addXp: (amount) => set((state) => {
        const newXp = state.xp + amount;
        const newLevel = Math.floor(newXp / 100) + 1; // Уровень каждые 100 XP
        return { xp: newXp, level: newLevel };
      }),
      completeLesson: (lessonId) => set((state) => ({
        completedLessons: [...state.completedLessons, lessonId]
      })),
      logout: () => set({ user: null, xp: 0, level: 1, completedLessons: [] }),
    }),
    {
      name: 'user-storage', // Имя ключа в localStorage
    }
  )
);
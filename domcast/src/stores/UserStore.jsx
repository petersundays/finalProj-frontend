import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      user: {
        id: null,
        sessionToken: '',
        firstName: '',
        lastName: '',
        nickname: '',
        photo: '',
        biography: '',
        visible: false,
        workplace: '',
        interests: [],
        skills: [],
      },
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({
        user: {
          id: null,
          sessionToken: '',
          firstName: '',
          lastName: '',
          nickname: '',
          photo: '',
          biography: '',
          visible: false,
          workplace: '',
          interests: [],
          skills: [],
        }
      })
    }),
        {
        name: "userStore",
        storage: createJSONStorage(() => sessionStorage),
      }
  )
);
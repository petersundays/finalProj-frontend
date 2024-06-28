import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      user: {
        validationToken: '',
        firstName: '',
        lastName: '',
        workplace: '',
        nickname: '',
        biography: '',
        visible: false,
        interests: [],
        skills: [],
        interestDtos: [],
        skillDtos: [],
      },
      photo: null,
      setUser: (newUser) => set((state) => ({ user: { ...state.user, ...newUser } })),
      setPhoto: (newPhoto) => set(() => ({ photo: newPhoto })),
      clearUser: () => set(() => ({
        user: {
          validationToken: '',
          firstName: '',
          lastName: '',
          workplace: '',
          nickname: '',
          biography: '',
          visible: false,
          interests: [],
          skills: [],
          interestDtos: [],
          skillDtos: [],
        },
        photo: null,
      })),
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
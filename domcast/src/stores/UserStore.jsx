import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import defaultProfilePic from "../../src/multimedia/default-profile-pic.png";


export const userStore = create(
  persist(
    (set) => ({
      unconfirmedUser: {
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
      unconfirmedPhoto: null,
      loggedUser: {
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
      loggedPhoto: null,
      setUnconfirmedUser: (newUser) =>
        set((state) => ({
          unconfirmedUser: { ...state.unconfirmedUser, ...newUser },
        })),
      setLoggedUser: (newUser) =>
        set((state) => ({
          loggedUser: { ...state.loggedUser, ...newUser },
        })),
      setUnconfirmedPhoto: (photo) => set(() => ({ unconfirmedPhoto: photo })),
      setLoggedPhoto: (photo) => set(() => ({ loggedPhoto: photo })),
      clearUnconfirmedUser: () => set(() => ({
        unconfirmedUser: {
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
      })),
      setDefaultUnconfirmedPhoto: () => set(() => ({ unconfirmedPhoto: defaultProfilePic })),
      setDefaultLoggedPhoto: () => set(() => ({ loggedPhoto: defaultProfilePic })),
      clearLoggedUser: () => {
        set(() => ({
          loggedUser: {
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
          loggedPhoto: null,
        }));

        sessionStorage.removeItem('loggedUser');
      }
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

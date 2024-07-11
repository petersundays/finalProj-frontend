import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import defaultProfilePic from "../../src/multimedia/default-profile-pic.png";

export const userStore = create(
  persist(
    (set) => ({
      unconfirmedUser: {
        validationToken: "",
        firstName: "",
        lastName: "",
        workplace: "",
        nickname: "",
        biography: "",
        visible: false,
        interests: [],
        skills: [],
        interestDtos: [],
        skillDtos: [],
      },
      unconfirmedPhoto: defaultProfilePic,
      loggedUser: {
        id: null,
        type: null,
        sessionToken: "",
        firstName: "",
        lastName: "",
        nickname: "",
        photo: "",
        biography: "",
        visible: false,
        workplace: "",
        interests: [],
        skills: [],
      },
      updatePhoto: null,
      userList: [],
      setUnconfirmedUser: (newUser) =>
        set((state) => ({
          unconfirmedUser: { ...state.unconfirmedUser, ...newUser },
        })),
      setUnconfirmedPhoto: (photo) => set(() => ({ unconfirmedPhoto: photo })),
      setDefaultUnconfirmedPhoto: () =>
        set(() => ({ unconfirmedPhoto: defaultProfilePic })),
      setLoggedUser: (newUser) =>
        set((state) => {
          const updatedUser = { ...state.loggedUser, ...newUser };
          console.log("Updated user:", updatedUser); // Check the state here
          return { loggedUser: updatedUser };
        }),
      setUserList: (usersData) => set({ userList: usersData }),
      clearUnconfirmedUser: () =>
        set(() => ({
          unconfirmedUser: {
            validationToken: "",
            firstName: "",
            lastName: "",
            workplace: "",
            nickname: "",
            biography: "",
            visible: false,
            interests: [],
            skills: [],
            interestDtos: [],
            skillDtos: [],
          },
          unconfirmedPhoto: defaultProfilePic,
        })),
      clearLoggedUser: () => {
        set(() => ({
          loggedUser: {
            id: null,
            sessionToken: "",
            firstName: "",
            lastName: "",
            nickname: "",
            photo: "",
            biography: "",
            visible: false,
            workplace: "",
            interests: [],
            skills: [],
          },
        }));
        sessionStorage.removeItem("userStore");
      },
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

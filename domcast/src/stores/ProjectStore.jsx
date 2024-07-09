import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const projectStore = create(
  persist(
    (set) => ({
      detailedProject: {
        name: "",
        description: "",
        labId: null,
        id: null,
        state: null,
        projectedStartDate: null,
        deadline: null,
        keywords: [],
        skills: [],
        resources: [],
        mainManager: "",
        collaborators: [],
        tasks: [],
      },
      setDetailedProject: (detailedProject) => set({ detailedProject }),
      resetDetailedProject: () =>
        set({
          detailedProject: {
            name: "",
            description: "",
            labId: null,
            id: null,
            state: null,
            projectedStartDate: null,
            deadline: null,
            keywords: [],
            skills: [],
            resources: [],
            mainManager: "",
            collaborators: [],
            tasks: [],
          },
        }),
      newProject: {
        name: "",
        description: "",
        labId: null,
        projectedStartDate: null,
        deadline: null,
        keywords: [],
        existentSkills: [],
        existentResources: [],
        maxMembers: 4,
      },
      setNewProject: (newProject) => set({ newProject }),
      resetNewProject: () =>
        set({
          newProject: {
            name: "",
            description: "",
            labId: null,
            projectedStartDate: null,
            deadline: null,
            keywords: [],
            existentSkills: [],
            existentResources: [],
            maxMembers: 4,
          },
        }),
      team: [],
      setTeam: (team) => set({ team }),
      resetTeam: () => set({ team: [] }),
      components: [],
      setComponents: (components) => set({ components }),
      resetComponents: () => set({ components: [] }),
      skills: [],
      setSkills: (skills) => set({ skills }),
      resetSkills: () => set({ skills: [] }),
      projects: [],
      setProjects: (projects) => set({ projects }),
      resetProjects: () => set({ projects: [] }),
      visibleRows: 1,
      setVisibleRows: (visibleRows) => set({ visibleRows }),
      resetVisibleRows: () => set({ visibleRows: 1 }),
    }),
    {
      name: "projectStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useProjectStore = create(
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
      projects: [],
      setProjects: (projects) => set({ projects }),
      resetProjects: () => set({ projects: [] }),
      visibleRows: 1,
      setVisibleRows: (visibleRows) => set({ visibleRows }),
      resetVisibleRows: () => set({ visibleRows: 1 }),
    }),
    {
      name: "project-storage",
      getStorage: createJSONStorage(),
    }
  )
);

import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CurrentProject {
    id: string
    name: string
}

interface CurrentProjectState {
    currentProject: CurrentProject | null
    setCurrentProject: (project: CurrentProject | null) => void
    clearCurrentProject: () => void
}

export const useCurrentProjectStore = create<CurrentProjectState>()(
    persist(
        (set) => ({
            currentProject: null,
            setCurrentProject: (project) => set({ currentProject: project }),
            clearCurrentProject: () => set({ currentProject: null }),
        }),
        {
            name: 'current-project-storage',
            storage: createJSONStorage(() => localStorage), 
        }
    )
)
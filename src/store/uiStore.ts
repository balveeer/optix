import { create } from 'zustand';

interface UIState {
    isTrailerModalOpen: boolean;
    currentTrailerKey: string | null;
    isSidebarOpen: boolean;
    openTrailerModal: (key: string) => void;
    closeTrailerModal: () => void;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isTrailerModalOpen: false,
    currentTrailerKey: null,
    isSidebarOpen: false,

    openTrailerModal: (key) => set({ isTrailerModalOpen: true, currentTrailerKey: key }),

    closeTrailerModal: () => set({ isTrailerModalOpen: false, currentTrailerKey: null }),

    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

    setSidebarOpen: (open) => set({ isSidebarOpen: open }),
}));

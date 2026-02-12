import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WatchlistItem } from '@/types/movie';

interface WatchlistState {
    items: WatchlistItem[];
    addToWatchlist: (item: Omit<WatchlistItem, 'addedAt'>) => void;
    removeFromWatchlist: (id: number, mediaType?: 'movie' | 'tv') => void;
    isInWatchlist: (id: number, mediaType?: 'movie' | 'tv') => boolean;
    clearWatchlist: () => void;
}

export const useWatchlistStore = create<WatchlistState>()(
    persist(
        (set, get) => ({
            items: [],

            addToWatchlist: (item) => {
                const type = item.media_type || 'movie';
                const exists = get().items.some((i) => i.id === item.id && (i.media_type || 'movie') === type);

                if (!exists) {
                    set((state) => ({
                        items: [
                            ...state.items,
                            { ...item, media_type: type, addedAt: new Date().toISOString() },
                        ],
                    }));
                }
            },

            removeFromWatchlist: (id, mediaType = 'movie') => {
                set((state) => ({
                    items: state.items.filter((item) => !(item.id === id && (item.media_type || 'movie') === mediaType)),
                }));
            },

            isInWatchlist: (id, mediaType = 'movie') => {
                return get().items.some((item) => item.id === id && (item.media_type || 'movie') === mediaType);
            },

            clearWatchlist: () => {
                set({ items: [] });
            },
        }),
        {
            name: 'optix-watchlist',
        }
    )
);

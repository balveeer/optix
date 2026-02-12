// API Configuration
export const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

// Image sizes
export const IMAGE_SIZES = {
    poster: {
        small: 'w185',
        medium: 'w342',
        large: 'w500',
        original: 'original',
    },
    backdrop: {
        small: 'w300',
        medium: 'w780',
        large: 'w1280',
        original: 'original',
    },
    profile: {
        small: 'w45',
        medium: 'w185',
        large: 'h632',
        original: 'original',
    },
} as const;

// Navigation links
export const NAV_LINKS = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'Search', href: '/search', icon: 'search' },
    { name: 'Profile', href: '/profile', icon: 'user' },
] as const;

// App metadata
export const APP_NAME = 'Optix';
export const APP_DESCRIPTION = 'Discover and track your favorite movies';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;

// Debounce delay for search
export const SEARCH_DEBOUNCE_MS = 300;

// Genre ID to Name mapping (from TMDB)
export const GENRE_MAP: { [key: number]: string } = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
};

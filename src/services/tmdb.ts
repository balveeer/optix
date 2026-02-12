import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '@/lib/constants';
import type {
    Movie,
    MovieDetails,
    PaginatedResponse,
    CreditsResponse,
    VideosResponse,
    MovieImagesResponse,
    GenresResponse,
    PersonDetails,
    PersonMovieCreditsResponse,
    TVShow,
    TVShowDetails,
    SeasonDetails
} from '@/types/movie';

// Create axios instance with default config
const tmdbApi = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    },
});

// Get trending movies
export async function getTrendingMovies(
    timeWindow: 'day' | 'week' = 'week'
): Promise<PaginatedResponse<Movie>> {
    const response = await tmdbApi.get<PaginatedResponse<Movie>>(
        `/trending/movie/${timeWindow}`
    );
    return response.data;
}

// Get popular movies
export async function getPopularMovies(
    page: number = 1
): Promise<PaginatedResponse<Movie>> {
    const response = await tmdbApi.get<PaginatedResponse<Movie>>('/movie/popular', {
        params: { page },
    });
    return response.data;
}

// Get top rated movies
export async function getTopRatedMovies(
    page: number = 1
): Promise<PaginatedResponse<Movie>> {
    const response = await tmdbApi.get<PaginatedResponse<Movie>>('/movie/top_rated', {
        params: { page },
    });
    return response.data;
}

// Get now playing movies
export async function getNowPlayingMovies(
    page: number = 1
): Promise<PaginatedResponse<Movie>> {
    const response = await tmdbApi.get<PaginatedResponse<Movie>>('/movie/now_playing', {
        params: { page },
    });
    return response.data;
}

// Get upcoming movies
export async function getUpcomingMovies(
    page: number = 1
): Promise<PaginatedResponse<Movie>> {
    const response = await tmdbApi.get<PaginatedResponse<Movie>>('/movie/upcoming', {
        params: { page },
    });
    return response.data;
}

// Search movies
export async function searchMovies(
    query: string,
    page: number = 1
): Promise<PaginatedResponse<Movie>> {
    const response = await tmdbApi.get<PaginatedResponse<Movie>>('/search/movie', {
        params: { query, page },
    });
    return response.data;
}

// Get movie details
export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
    const response = await tmdbApi.get<MovieDetails>(`/movie/${movieId}`);
    return response.data;
}

// Get movie credits (cast and crew)
export async function getMovieCredits(movieId: number): Promise<CreditsResponse> {
    const response = await tmdbApi.get<CreditsResponse>(`/movie/${movieId}/credits`);
    return response.data;
}

// Get movie videos (trailers, etc.)
export async function getMovieVideos(movieId: number): Promise<VideosResponse> {
    const response = await tmdbApi.get<VideosResponse>(`/movie/${movieId}/videos`);
    return response.data;
}

// Get similar movies
export async function getSimilarMovies(
    movieId: number,
    page: number = 1
): Promise<PaginatedResponse<Movie>> {
    const response = await tmdbApi.get<PaginatedResponse<Movie>>(
        `/movie/${movieId}/similar`,
        { params: { page } }
    );
    return response.data;
}

// Get movie recommendations
export async function getMovieRecommendations(
    movieId: number,
    page: number = 1
): Promise<PaginatedResponse<Movie>> {
    const response = await tmdbApi.get<PaginatedResponse<Movie>>(
        `/movie/${movieId}/recommendations`,
        { params: { page } }
    );
    return response.data;
}

// Get movie images (logos, posters, backdrops)
export async function getMovieImages(movieId: number): Promise<MovieImagesResponse> {
    const response = await tmdbApi.get<MovieImagesResponse>(
        `/movie/${movieId}/images`,
        { params: { include_image_language: 'en,null' } }
    );
    return response.data;
}

// Get movie genres list
export async function getGenres(): Promise<GenresResponse> {
    const response = await tmdbApi.get<GenresResponse>('/genre/movie/list');
    return response.data;
}

// Get movies by genre
export async function getMoviesByGenre(
    genreId: number,
    page: number = 1
): Promise<PaginatedResponse<Movie>> {
    const response = await tmdbApi.get<PaginatedResponse<Movie>>('/discover/movie', {
        params: {
            with_genres: genreId,
            page,
            sort_by: 'popularity.desc'
        },
    });
    return response.data;
}

// Helper to get full image URL
export function getImageUrl(
    path: string | null,
    size: string = 'w500'
): string {
    if (!path) {
        return '/images/placeholder-movie.svg';
    }
    return `https://image.tmdb.org/t/p/${size}${path}`;
}

// Helper to get YouTube video URL
export function getYouTubeUrl(key: string): string {
    return `https://www.youtube.com/watch?v=${key}`;
}

// Helper to get YouTube embed URL
export function getYouTubeEmbedUrl(key: string): string {
    return `https://www.youtube.com/embed/${key}`;
}

// Get person details (biography, profile, etc.)
export async function getPersonDetails(personId: number): Promise<PersonDetails> {
    const response = await tmdbApi.get<PersonDetails>(`/person/${personId}`);
    return response.data;
}

// Get person movie credits (filmography)
export async function getPersonMovieCredits(personId: number): Promise<PersonMovieCreditsResponse> {
    const response = await tmdbApi.get<PersonMovieCreditsResponse>(`/person/${personId}/movie_credits`);
    return response.data;
}

// --- TV Series Functions ---

// Get trending TV shows
export async function getTrendingTV(
    timeWindow: 'day' | 'week' = 'week'
): Promise<PaginatedResponse<TVShow>> {
    const response = await tmdbApi.get<PaginatedResponse<TVShow>>(
        `/trending/tv/${timeWindow}`
    );
    return response.data;
}

// Get popular TV shows
export async function getPopularTV(
    page: number = 1
): Promise<PaginatedResponse<TVShow>> {
    const response = await tmdbApi.get<PaginatedResponse<TVShow>>('/tv/popular', {
        params: { page },
    });
    return response.data;
}

// Get top rated TV shows
export async function getTopRatedTV(
    page: number = 1
): Promise<PaginatedResponse<TVShow>> {
    const response = await tmdbApi.get<PaginatedResponse<TVShow>>('/tv/top_rated', {
        params: { page },
    });
    return response.data;
}

// Get airing today TV shows
export async function getAiringTodayTV(
    page: number = 1
): Promise<PaginatedResponse<TVShow>> {
    const response = await tmdbApi.get<PaginatedResponse<TVShow>>('/tv/airing_today', {
        params: { page },
    });
    return response.data;
}

// Search TV shows
export async function searchTV(
    query: string,
    page: number = 1
): Promise<PaginatedResponse<TVShow>> {
    const response = await tmdbApi.get<PaginatedResponse<TVShow>>('/search/tv', {
        params: { query, page },
    });
    return response.data;
}

// Get TV show details
export async function getTVDetails(tvId: number): Promise<TVShowDetails> {
    const response = await tmdbApi.get<TVShowDetails>(`/tv/${tvId}`);
    return response.data;
}

// Get TV credits
export async function getTVCredits(tvId: number): Promise<CreditsResponse> {
    const response = await tmdbApi.get<CreditsResponse>(`/tv/${tvId}/credits`);
    return response.data;
}

// Get TV videos
export async function getTVVideos(tvId: number): Promise<VideosResponse> {
    const response = await tmdbApi.get<VideosResponse>(`/tv/${tvId}/videos`);
    return response.data;
}

// Get similar TV shows
export async function getSimilarTV(
    tvId: number,
    page: number = 1
): Promise<PaginatedResponse<TVShow>> {
    const response = await tmdbApi.get<PaginatedResponse<TVShow>>(
        `/tv/${tvId}/similar`,
        { params: { page } }
    );
    return response.data;
}

// Get TV images
export async function getTVImages(tvId: number): Promise<MovieImagesResponse> {
    const response = await tmdbApi.get<MovieImagesResponse>(
        `/tv/${tvId}/images`,
        { params: { include_image_language: 'en,null' } }
    );
    return response.data;
}

// Get TV genres
export async function getTVGenres(): Promise<GenresResponse> {
    const response = await tmdbApi.get<GenresResponse>('/genre/tv/list');
    return response.data;
}

// Get TV shows by genre
export async function getTVByGenre(
    genreId: number,
    page: number = 1
): Promise<PaginatedResponse<TVShow>> {
    const response = await tmdbApi.get<PaginatedResponse<TVShow>>('/discover/tv', {
        params: {
            with_genres: genreId,
            page,
            sort_by: 'popularity.desc'
        },
    });
    return response.data;
}

// Get Season Details
export async function getSeasonDetails(
    tvId: number,
    seasonNumber: number
): Promise<SeasonDetails> {
    const response = await tmdbApi.get<SeasonDetails>(
        `/tv/${tvId}/season/${seasonNumber}`
    );
    return response.data;
}

export default tmdbApi;

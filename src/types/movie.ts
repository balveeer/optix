// Base movie type from TMDB API
export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    adult: boolean;
    genre_ids: number[];
    original_language: string;
    video: boolean;
    media_type?: 'movie';
}

// Base TV Show type
export interface TVShow {
    id: number;
    name: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    original_language: string;
    origin_country: string[];
    media_type?: 'tv';
}

export type MediaItem = Movie | TVShow;

// Movie image (logo, poster, backdrop)
export interface MovieImage {
    aspect_ratio: number;
    height: number;
    width: number;
    file_path: string;
    vote_average: number;
    vote_count: number;
    iso_639_1: string | null;
}

export interface MovieImagesResponse {
    id: number;
    backdrops: MovieImage[];
    logos: MovieImage[];
    posters: MovieImage[];
}

// Extended movie details
export interface MovieDetails extends Movie {
    budget: number;
    genres: Genre[];
    homepage: string | null;
    imdb_id: string | null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    revenue: number;
    runtime: number | null;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string | null;
    belongs_to_collection: Collection | null;
}

export interface TVShowDetails extends TVShow {
    created_by: Creator[];
    episode_run_time: number[];
    genres: Genre[];
    homepage: string;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: Episode;
    next_episode_to_air: Episode | null;
    networks: Network[];
    number_of_episodes: number;
    number_of_seasons: number;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    seasons: Season[];
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    type: string;
}

export interface Creator {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
}

export interface Network {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
}

export interface Season {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
}

export interface SeasonDetails extends Season {
    episodes: Episode[];
}

export interface Episode {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
    crew: Crew[];
    guest_stars: Cast[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface Collection {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
}

// Cast and crew
export interface Cast {
    id: number;
    name: string;
    original_name: string;
    character: string;
    profile_path: string | null;
    order: number;
    adult: boolean;
    gender: number | null;
    known_for_department: string;
    popularity: number;
    cast_id: number;
    credit_id: string;
}

export interface Crew {
    id: number;
    name: string;
    original_name: string;
    job: string;
    department: string;
    profile_path: string | null;
    adult: boolean;
    gender: number | null;
    known_for_department: string;
    popularity: number;
    credit_id: string;
}

export interface Credits {
    cast: Cast[];
    crew: Crew[];
}

// Videos (trailers, etc.)
export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    iso_639_1: string;
    iso_3166_1: string;
}

// API Response types
export interface PaginatedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface VideosResponse {
    id: number;
    results: Video[];
}

export interface CreditsResponse {
    id: number;
    cast: Cast[];
    crew: Crew[];
}

export interface GenresResponse {
    genres: Genre[];
}

// Watchlist item (for local storage)
export interface WatchlistItem {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    genre_ids: number[];
    addedAt: string;
    media_type?: 'movie' | 'tv';
}

// Person types for cast/crew pages
export interface PersonDetails {
    id: number;
    name: string;
    biography: string;
    birthday: string | null;
    deathday: string | null;
    place_of_birth: string | null;
    profile_path: string | null;
    known_for_department: string;
    popularity: number;
    adult: boolean;
    also_known_as: string[];
    homepage: string | null;
    imdb_id: string | null;
    gender: number;
}

export interface PersonMovieCast {
    id: number;
    title: string;
    character: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    popularity: number;
    genre_ids: number[];
    credit_id: string;
    order: number;
}

export interface PersonMovieCrew {
    id: number;
    title: string;
    job: string;
    department: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    popularity: number;
    genre_ids: number[];
    credit_id: string;
}

export interface PersonMovieCreditsResponse {
    id: number;
    cast: PersonMovieCast[];
    crew: PersonMovieCrew[];
}


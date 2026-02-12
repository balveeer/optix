import {
  getTrendingMovies, getPopularMovies, getNowPlayingMovies, getTopRatedMovies, getGenres, getMovieImages,
  getTrendingTV, getPopularTV, getAiringTodayTV, getTopRatedTV, getTVGenres, getTVImages
} from '@/services/tmdb';
import { HomeContent } from '@/components/home/HomeContent';
import type { MovieImage, MediaItem } from '@/types/movie';

export const revalidate = 3600; // Revalidate every hour

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { type } = await searchParams;
  const initialType = type === 'tv' ? 'tv' : 'movie';

  // Fetch all data in parallel — use allSettled so one failure doesn't crash the page
  const [
    trendingMoviesRes, popularMoviesRes, nowPlayingMoviesRes, topRatedMoviesRes, genresMoviesRes,
    trendingTVRes, popularTVRes, airingTodayTVRes, topRatedTVRes, genresTVRes
  ] = await Promise.allSettled([
    getTrendingMovies('week'),
    getPopularMovies(),
    getNowPlayingMovies(),
    getTopRatedMovies(),
    getGenres(),
    getTrendingTV('week'),
    getPopularTV(),
    getAiringTodayTV(),
    getTopRatedTV(),
    getTVGenres(),
  ]);

  // Process Movie Data
  const trendingMovies = trendingMoviesRes.status === 'fulfilled' ? trendingMoviesRes.value.results : [];
  const popularMovies = popularMoviesRes.status === 'fulfilled' ? popularMoviesRes.value.results : [];
  const nowPlayingMovies = nowPlayingMoviesRes.status === 'fulfilled' ? nowPlayingMoviesRes.value.results : [];
  const topRatedMovies = topRatedMoviesRes.status === 'fulfilled' ? topRatedMoviesRes.value.results : [];
  const genresMovie = genresMoviesRes.status === 'fulfilled' ? genresMoviesRes.value.genres : [];

  // Process TV Data
  const trendingTV = trendingTVRes.status === 'fulfilled' ? trendingTVRes.value.results : [];
  const popularTV = popularTVRes.status === 'fulfilled' ? popularTVRes.value.results : [];
  const airingTodayTV = airingTodayTVRes.status === 'fulfilled' ? airingTodayTVRes.value.results : [];
  const topRatedTV = topRatedTVRes.status === 'fulfilled' ? topRatedTVRes.value.results : [];
  const genresTV = genresTVRes.status === 'fulfilled' ? genresTVRes.value.genres : [];

  // Helper to fetch logos
  async function fetchLogos(items: MediaItem[], type: 'movie' | 'tv') {
    const heroItems = items.slice(0, 6);
    const logoPromises = heroItems.map(async (item) => {
      try {
        const images = type === 'movie' ? await getMovieImages(item.id) : await getTVImages(item.id);
        const logo = images.logos.find(l => l.iso_639_1 === 'en') || images.logos[0] || null;
        return { id: item.id, logo };
      } catch {
        return { id: item.id, logo: null };
      }
    });

    const results = await Promise.all(logoPromises);
    const logos: { [id: number]: MovieImage | null } = {};
    results.forEach(result => {
      logos[result.id] = result.logo;
    });
    return logos;
  }

  const [movieLogos, tvLogos] = await Promise.all([
    fetchLogos(trendingMovies, 'movie'),
    fetchLogos(trendingTV, 'tv')
  ]);

  return (
    <HomeContent
      initialMediaType="movie"
      movieData={{
        trending: trendingMovies,
        popular: popularMovies,
        topRated: topRatedMovies,
        nowPlaying: nowPlayingMovies,
        genres: genresMovie,
        logos: movieLogos
      }}
      tvData={{
        trending: trendingTV,
        popular: popularTV,
        topRated: topRatedTV,
        airingToday: airingTodayTV,
        genres: genresTV,
        logos: tvLogos
      }}
    />
  );
}

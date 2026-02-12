import { notFound } from 'next/navigation';
import { getMovieDetails, getMovieCredits, getMovieVideos, getSimilarMovies, getMovieImages } from '@/services/tmdb';
import { HeroSection } from '@/components/movies/HeroSection';
import { CastList } from '@/components/movies/CastList';
import { CrewList } from '@/components/movies/CrewList';
import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { WatchSection } from '@/components/movies/WatchSection';
import type { Metadata } from 'next';
import type { MovieImage } from '@/types/movie';

interface MoviePageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const movie = await getMovieDetails(parseInt(id));
        return {
            title: movie.title,
            description: movie.overview,
            openGraph: {
                title: movie.title,
                description: movie.overview,
                images: movie.backdrop_path
                    ? [`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`]
                    : [],
            },
        };
    } catch {
        return {
            title: 'Movie Not Found',
        };
    }
}

export default async function MoviePage({ params }: MoviePageProps) {
    const { id } = await params;
    const movieId = parseInt(id);

    if (isNaN(movieId)) {
        notFound();
    }

    try {
        // Fetch all movie data in parallel
        // Fetch all movie data in parallel
        const [movieResult, creditsResult, videosResult, similarResult, imagesResult] = await Promise.allSettled([
            getMovieDetails(movieId),
            getMovieCredits(movieId),
            getMovieVideos(movieId),
            getSimilarMovies(movieId),
            getMovieImages(movieId),
        ]);

        if (movieResult.status === 'rejected') {
            throw new Error('Movie not found');
        }

        const movie = movieResult.value;
        const credits = creditsResult.status === 'fulfilled' ? creditsResult.value : { cast: [], crew: [] };
        const videos = videosResult.status === 'fulfilled' ? videosResult.value : { results: [] };
        const similar = similarResult.status === 'fulfilled' ? similarResult.value : { results: [] };
        const images = imagesResult.status === 'fulfilled' ? imagesResult.value : { logos: [], posters: [], backdrops: [] };

        // Find official trailer
        const trailer = videos.results.find(
            (v) => v.type === 'Trailer' && v.site === 'YouTube' && v.official
        ) || videos.results.find(
            (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );

        // Find the best logo (prefer English, then highest vote average)
        const logo: MovieImage | undefined = images.logos.find(
            (l) => l.iso_639_1 === 'en'
        ) || images.logos[0];

        return (
            <div className="min-h-screen">
                {/* Hero Section with Movie Details */}
                <HeroSection movie={movie} trailer={trailer} logo={logo} />

                {/* Watch Section */}
                <WatchSection mediaId={movie.id} title={movie.title} mediaType="movie" />

                {/* Additional Content */}
                <div className="container mx-auto px-4 py-8 space-y-10">
                    {/* Cast */}
                    {credits.cast.length > 0 && (
                        <CastList cast={credits.cast} />
                    )}

                    {/* Directors & Producers */}
                    {credits.crew.length > 0 && (
                        <CrewList crew={credits.crew} />
                    )}

                    {/* Similar Movies */}
                    {similar.results.length > 0 && (
                        <MovieCarousel
                            title="Similar Movies"
                            movies={similar.results}
                        />
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Failed to load movie:', error);
        notFound();
    }
}

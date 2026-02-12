import { Metadata } from 'next';
import { getGenres, getMoviesByGenre, getTVGenres, getTVByGenre } from '@/services/tmdb';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { notFound } from 'next/navigation';

interface GenrePageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params, searchParams }: GenrePageProps): Promise<Metadata> {
    const { id } = await params;
    const { type } = await searchParams;
    const mediaType = type === 'tv' ? 'tv' : 'movie';
    const genreId = parseInt(id);

    const genresData = mediaType === 'movie' ? await getGenres() : await getTVGenres();
    const genre = genresData.genres.find(g => g.id === genreId);

    return {
        title: genre ? `${genre.name} ${mediaType === 'movie' ? 'Movies' : 'TV Series'}` : 'Genre',
        description: genre ? `Browse ${genre.name} ${mediaType === 'movie' ? 'movies' : 'TV series'} on Optix` : 'Browse by genre',
    };
}

export default async function GenrePage({ params, searchParams }: GenrePageProps) {
    const { id } = await params;
    const { type } = await searchParams;
    const mediaType = type === 'tv' ? 'tv' : 'movie';
    const genreId = parseInt(id);

    if (isNaN(genreId)) {
        notFound();
    }

    const [genresResult, contentResult] = await Promise.allSettled([
        mediaType === 'movie' ? getGenres() : getTVGenres(),
        mediaType === 'movie' ? getMoviesByGenre(genreId) : getTVByGenre(genreId),
    ]);

    const genresData = genresResult.status === 'fulfilled' ? genresResult.value : { genres: [] };
    const contentData = contentResult.status === 'fulfilled' ? contentResult.value : { results: [] };

    const genre = genresData.genres.find(g => g.id === genreId);

    if (!genre) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {mediaType === 'movie' ? '🎬' : '📺'} {genre.name} {mediaType === 'movie' ? 'Movies' : 'Series'}
                </h1>
                <p className="text-muted-foreground">
                    Discover the best {genre.name.toLowerCase()} {mediaType === 'movie' ? 'movies' : 'shows'}
                </p>
            </div>

            <MovieGrid
                movies={contentData.results}
                mediaType={mediaType}
                emptyMessage={`No ${genre.name} ${mediaType === 'movie' ? 'movies' : 'series'} found`}
            />
        </div>
    );
}

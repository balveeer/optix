'use client';

import { MovieCard } from './MovieCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader } from '@/components/ui/Loader';
import type { MediaItem } from '@/types/movie';

interface MovieGridProps {
    movies: MediaItem[];
    isLoading?: boolean;
    emptyMessage?: string;
    showLoader?: boolean;
    mediaType?: 'movie' | 'tv';
}

export function MovieGrid({
    movies,
    isLoading = false,
    emptyMessage = 'No movies found',
    showLoader = false,
    mediaType = 'movie'
}: MovieGridProps) {
    if (isLoading && showLoader) {
        return <Loader text="Finding movies..." fullScreen={false} />;
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex flex-col space-y-0 rounded-xl overflow-hidden bg-card/30">
                        <Skeleton className="aspect-[2/3] w-full rounded-none" />
                        <div className="p-3 space-y-2">
                            <Skeleton className="h-4 w-3/4 bg-white/5" />
                            <Skeleton className="h-3 w-1/2 bg-white/5" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!movies.length) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                    <span className="text-4xl">🎬</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{emptyMessage}</h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                    Try searching for something else or browse trending movies.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} mediaType={mediaType} />
            ))}
        </div>
    );
}

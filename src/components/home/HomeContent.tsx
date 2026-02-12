'use client';

import { useState } from 'react';
import { ContentToggle } from '@/components/ui/ContentToggle';
import { HeroCarousel } from '@/components/movies/HeroCarousel';
import { Top10Section } from '@/components/movies/Top10Section';
import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { GenreCards } from '@/components/movies/GenreCards';
import type { MediaItem, MovieImage, Genre } from '@/types/movie';

interface HomeContentProps {
    initialMediaType?: 'movie' | 'tv';
    movieData: {
        trending: MediaItem[];
        popular: MediaItem[];
        topRated: MediaItem[];
        nowPlaying: MediaItem[];
        genres: Genre[];
        logos: { [id: number]: MovieImage | null };
    };
    tvData: {
        trending: MediaItem[];
        popular: MediaItem[];
        topRated: MediaItem[];
        airingToday: MediaItem[];
        genres: Genre[];
        logos: { [id: number]: MovieImage | null };
    };
}

export function HomeContent({ initialMediaType = 'movie', movieData, tvData }: HomeContentProps) {
    const [mediaType, setMediaType] = useState<'movie' | 'tv'>(initialMediaType);

    const data = mediaType === 'movie' ? movieData : tvData;
    const items = {
        trending: data.trending,
        popular: data.popular,
        topRated: data.topRated,
        latest: mediaType === 'movie' ? movieData.nowPlaying : tvData.airingToday,
        genres: data.genres,
        logos: data.logos,
        latestTitle: mediaType === 'movie' ? '🎬 Now Playing in Theaters' : '📺 Airing Today'
    };

    return (
        <main className="min-h-screen pb-20">
            <HeroCarousel
                movies={items.trending}
                movieLogos={items.logos}
                mediaType={mediaType}
            />

            <ContentToggle mediaType={mediaType} onToggle={setMediaType} />

            <div className="container mx-auto px-4 space-y-8">
                <Top10Section
                    movies={items.trending}
                    title={`🔥 Top 10 ${mediaType === 'movie' ? 'Movies' : 'Series'} This Week`}
                    mediaType={mediaType}
                />

                <GenreCards genres={items.genres} mediaType={mediaType} />

                <MovieCarousel
                    title="🚀 Popular Now"
                    movies={items.popular}
                    mediaType={mediaType}
                />

                <MovieCarousel
                    title="⭐ Top Rated"
                    movies={items.topRated}
                    mediaType={mediaType}
                />

                <MovieCarousel
                    title={items.latestTitle}
                    movies={items.latest}
                    mediaType={mediaType}
                />
            </div>
        </main>
    );
}

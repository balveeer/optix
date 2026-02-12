'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieCard } from './MovieCard';
import type { MediaItem } from '@/types/movie';

interface MovieCarouselProps {
    title: string;
    movies: MediaItem[];
    priority?: boolean;
    mediaType?: 'movie' | 'tv';
}

export function MovieCarousel({ title, movies, priority = false, mediaType = 'movie' }: MovieCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (!movies.length) return null;

    return (
        <section className="relative group/carousel">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
                <div className="hidden sm:flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scroll('left')}
                        className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scroll('right')}
                        className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Movies Scroll Container */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {movies.map((movie, index) => (
                    <div
                        key={movie.id}
                        className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px]"
                    >
                        <MovieCard movie={movie} priority={priority && index < 4} mediaType={mediaType} />
                    </div>
                ))}
            </div>

            {/* Scroll Indicators (Mobile) */}
            <div className="sm:hidden flex justify-center gap-1 mt-2">
                <div className="w-8 h-1 rounded-full bg-primary/40" />
                <div className="w-8 h-1 rounded-full bg-muted" />
                <div className="w-8 h-1 rounded-full bg-muted" />
            </div>
        </section>
    );
}

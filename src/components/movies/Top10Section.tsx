'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/services/tmdb';
import type { MediaItem } from '@/types/movie';

interface Top10SectionProps {
    movies: MediaItem[];
    title?: string;
    mediaType?: 'movie' | 'tv';
}

export function Top10Section({ movies, title = "🔥 Top 10 This Week", mediaType = 'movie' }: Top10SectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    // Take first 10 movies
    const top10 = movies.slice(0, 10);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.7; // Scroll 70% of view
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="py-2 relative group/section">
            <div className="flex items-center justify-between mb-2 px-4">
                <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scroll('left')}
                        className="h-10 w-10 rounded-full bg-background/50 hover:bg-primary/20 hover:text-primary backdrop-blur-sm border border-white/10"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scroll('right')}
                        className="h-10 w-10 rounded-full bg-background/50 hover:bg-primary/20 hover:text-primary backdrop-blur-sm border border-white/10"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide py-10 -mx-4 px-4 snap-x snap-mandatory"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {top10.map((movie, index) => {
                    const title = 'title' in movie ? movie.title : movie.name;
                    const linkHref = mediaType === 'movie' ? `/movie/${movie.id}` : `/series/${movie.id}`;

                    return (
                        <Link
                            key={movie.id}
                            href={linkHref}
                            className="flex-shrink-0 snap-center group relative"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative flex items-end pl-8"
                            >
                                {/* Ranking Number */}
                                {/* Positioned to the left, partially overlapping */}
                                {/* Z-Index: Default 0 (behind), Hover 20 (front) */}
                                <div className="relative -mr-6 z-0 transition-all duration-300 group-hover:z-20 group-hover:scale-110 origin-bottom-right">
                                    <span
                                        className="text-[120px] md:text-[140px] font-black leading-[0.85] select-none"
                                        style={{
                                            WebkitTextStroke: '2px rgba(168, 85, 247, 0.5)', // Purple stroke
                                            WebkitTextFillColor: 'transparent',
                                            textShadow: '0 0 2px transparent'
                                        }}
                                    >
                                        {index + 1}
                                    </span>
                                    <span
                                        className="absolute inset-0 text-[120px] md:text-[140px] font-black leading-[0.8] select-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: 'linear-gradient(180deg, #A855F7 0%, #7C3AED 100%)', // Purple gradient fill
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            WebkitTextStroke: '0px',
                                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
                                        }}
                                    >
                                        {index + 1}
                                    </span>
                                </div>

                                {/* Movie Poster */}
                                {/* Z-Index: 10 (always middle of the stack, unless number jumps on top) */}
                                <div className="relative z-10 w-[140px] md:w-[160px] aspect-[2/3] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-primary/30">
                                    <Image
                                        src={getImageUrl(movie.poster_path, 'w500')}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Hover info overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                                        <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="text-white font-bold text-md line-clamp-2 mb-1">{title}</p>
                                            <p className="text-white text-sm font-semibold">⭐ {movie.vote_average.toFixed(1)}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    )
                })}
            </div>
        </section>
    );
}

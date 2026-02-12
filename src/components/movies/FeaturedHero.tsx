'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Star, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getImageUrl } from '@/services/tmdb';
import type { Movie } from '@/types/movie';

interface FeaturedHeroProps {
    movie: Movie;
}

export function FeaturedHero({ movie }: FeaturedHeroProps) {
    const releaseYear = movie.release_date?.split('-')[0] || 'N/A';
    const rating = movie.vote_average?.toFixed(1) || 'N/A';

    return (
        <section className="relative h-[70vh] md:h-[85vh] flex items-end overflow-hidden">
            {/* Backdrop Image */}
            <div className="absolute inset-0">
                <Image
                    src={getImageUrl(movie.backdrop_path, 'original')}
                    alt={movie.title}
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative container mx-auto px-4 pb-16 md:pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl"
                >
                    {/* Badge */}
                    <Badge className="mb-4 bg-primary/20 text-primary border-none">
                        🔥 Featured Movie
                    </Badge>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        {movie.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-foreground">{rating}</span>
                        </div>
                        <span>{releaseYear}</span>
                    </div>

                    {/* Overview */}
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3 md:line-clamp-4">
                        {movie.overview}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <Link href={`/movie/${movie.id}`}>
                            <Button size="lg" className="gradient-purple hover:opacity-90">
                                <Info className="w-5 h-5 mr-2" />
                                View Details
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Animated gradient accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 gradient-purple opacity-60" />
        </section>
    );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, Check, Star, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getImageUrl } from '@/services/tmdb';
import { useWatchlistStore } from '@/store/watchlistStore';
import { useUIStore } from '@/store/uiStore';
import type { MovieDetails, Video, MovieImage } from '@/types/movie';

interface HeroSectionProps {
    movie: MovieDetails;
    trailer?: Video;
    logo?: MovieImage;
}

export function HeroSection({ movie, trailer, logo }: HeroSectionProps) {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
    const { openTrailerModal } = useUIStore();
    const inWatchlist = isInWatchlist(movie.id);

    const handleWatchlistClick = () => {
        if (inWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                release_date: movie.release_date,
                genre_ids: movie.genres?.map(g => g.id) || movie.genre_ids || [],
                media_type: 'movie',
            });
        }
    };

    const releaseYear = movie.release_date?.split('-')[0] || 'N/A';
    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A';

    return (
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end">
            {/* Backdrop Image */}
            <div className="absolute inset-0">
                <Image
                    src={getImageUrl(movie.backdrop_path, 'original')}
                    alt={movie.title}
                    fill
                    className="object-cover object-top"
                    priority
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative container mx-auto px-4 pb-8 md:pb-16 pt-32">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                    {/* Poster (Hidden on mobile, shown on desktop) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="hidden md:block w-64 flex-shrink-0"
                    >
                        <div className="aspect-[2/3] relative rounded-xl overflow-hidden shadow-2xl shadow-primary/20">
                            <Image
                                src={getImageUrl(movie.poster_path, 'w500')}
                                alt={movie.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Movie Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 max-w-2xl"
                    >
                        {/* Genres */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {movie.genres?.slice(0, 3).map((genre) => (
                                <Badge key={genre.id} variant="secondary" className="bg-primary/20 text-primary border-none">
                                    {genre.name}
                                </Badge>
                            ))}
                        </div>

                        {/* Title or Logo */}
                        {logo ? (
                            <div className="mb-4">
                                <Image
                                    src={getImageUrl(logo.file_path, 'w500')}
                                    alt={movie.title}
                                    width={logo.width}
                                    height={logo.height}
                                    className="max-h-24 md:max-h-32 w-auto object-contain"
                                    priority
                                />
                            </div>
                        ) : (
                            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                                {movie.title}
                            </h1>
                        )}

                        {/* Tagline */}
                        {movie.tagline && (
                            <p className="text-lg text-primary/80 italic mb-4">&ldquo;{movie.tagline}&rdquo;</p>
                        )}

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold text-foreground">{movie.vote_average?.toFixed(1)}</span>
                                <span>/ 10</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{releaseYear}</span>
                            </div>
                            {movie.runtime && (
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{runtime}</span>
                                </div>
                            )}
                        </div>

                        {/* Overview */}
                        <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-4 md:line-clamp-none">
                            {movie.overview}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            {trailer && (
                                <Button
                                    size="lg"
                                    className="gradient-purple hover:opacity-90 transition-opacity"
                                    onClick={() => openTrailerModal(trailer.key)}
                                >
                                    <Play className="w-5 h-5 mr-2 fill-current" />
                                    Watch Trailer
                                </Button>
                            )}

                            <Button
                                size="lg"
                                className="bg-white text-black hover:bg-white/90 transition-colors"
                                onClick={() => {
                                    document.getElementById('watch-section')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <Play className="w-5 h-5 mr-2 fill-current" />
                                Watch Movie
                            </Button>

                            <Button
                                size="lg"
                                variant={inWatchlist ? 'default' : 'outline'}
                                onClick={handleWatchlistClick}
                                className={inWatchlist ? 'bg-primary/20 text-primary hover:bg-primary/30' : ''}
                            >
                                {inWatchlist ? (
                                    <>
                                        <Check className="w-5 h-5 mr-2" />
                                        In Watchlist
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5 mr-2" />
                                        Add to Watchlist
                                    </>
                                )}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

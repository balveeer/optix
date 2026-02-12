'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getImageUrl } from '@/services/tmdb';
import { useWatchlistStore } from '@/store/watchlistStore';
import type { MediaItem } from '@/types/movie';

interface MovieCardProps {
    movie: MediaItem;
    priority?: boolean;
    mediaType?: 'movie' | 'tv';
}

export function MovieCard({ movie, priority = false, mediaType = 'movie' }: MovieCardProps) {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
    // Check if in watchlist using both ID and media type
    const inWatchlist = isInWatchlist(movie.id, mediaType);

    // Handle different property names for Movie vs TV
    const title = 'title' in movie ? movie.title : movie.name;
    const releaseDate = 'release_date' in movie ? movie.release_date : movie.first_air_date;
    const linkHref = mediaType === 'movie' ? `/movie/${movie.id}` : `/series/${movie.id}`;

    const handleWatchlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (inWatchlist) {
            removeFromWatchlist(movie.id, mediaType);
        } else {
            addToWatchlist({
                id: movie.id,
                title: 'title' in movie ? movie.title : movie.name,
                name: 'name' in movie ? movie.name : movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                release_date: 'release_date' in movie ? movie.release_date : movie.first_air_date,
                first_air_date: 'first_air_date' in movie ? movie.first_air_date : movie.release_date,
                genre_ids: movie.genre_ids,
                media_type: mediaType,
            });
        }
    };

    const releaseYear = releaseDate?.split('-')[0] || 'N/A';
    const rating = movie.vote_average?.toFixed(1) || 'N/A';

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
        >
            <Link
                href={linkHref}
                className="group block relative rounded-xl overflow-hidden card-hover"
            >
                {/* Poster Image */}
                <div className="aspect-[2/3] relative bg-surface">
                    <Image
                        src={getImageUrl(movie.poster_path, 'w500')}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform group-hover:scale-105"
                        priority={priority}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Watchlist Button */}
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={handleWatchlistClick}
                        className={`absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-all ${inWatchlist ? 'bg-primary text-white' : 'bg-black/60 text-white hover:bg-primary'
                            }`}
                    >
                        {inWatchlist ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </Button>

                    {/* Rating Badge */}
                    <Badge
                        className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white border-none"
                    >
                        <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {rating}
                    </Badge>
                </div>

                {/* Movie Info */}
                <div className="p-3 bg-card">
                    <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{releaseYear}</p>
                </div>
            </Link>
        </motion.div>
    );
}

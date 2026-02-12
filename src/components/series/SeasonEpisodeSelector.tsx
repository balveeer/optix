'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getImageUrl } from '@/services/tmdb';
import type { Season, Episode } from '@/types/movie';
import Image from 'next/image';

interface SeasonEpisodeSelectorProps {
    seasons: Season[];
    currentSeasonNumber: number;
    episodes: Episode[];
    currentEpisodeNumber: number;
    onSeasonChange: (seasonNumber: number) => void;
    onEpisodeChange: (episode: Episode) => void;
    isLoading?: boolean;
}

export function SeasonEpisodeSelector({
    seasons,
    currentSeasonNumber,
    episodes,
    currentEpisodeNumber,
    onSeasonChange,
    onEpisodeChange,
    isLoading = false
}: SeasonEpisodeSelectorProps) {
    const currentSeason = seasons.find(s => s.season_number === currentSeasonNumber) || seasons[0];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Episodes</h2>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="min-w-[140px] justify-between">
                            {currentSeason ? `Season ${currentSeason.season_number}` : 'Select Season'}
                            <ChevronDown className="ml-2 h-4 w-4" opacity={0.5} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px] max-h-[300px] overflow-y-auto">
                        {seasons.map((season) => (
                            <DropdownMenuItem
                                key={season.id}
                                onClick={() => onSeasonChange(season.season_number)}
                                className={season.season_number === currentSeasonNumber ? 'bg-primary/20' : ''}
                            >
                                <div className="flex flex-col">
                                    <span>Season {season.season_number}</span>
                                    <span className="text-xs text-muted-foreground">{season.episode_count} Episodes</span>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-24 bg-muted/20 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence mode="popLayout">
                        {episodes.map((episode) => (
                            <motion.div
                                key={episode.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <button
                                    onClick={() => onEpisodeChange(episode)}
                                    className={`w-full text-left group relative overflow-hidden rounded-xl border transition-all hover:border-primary/50
                                        ${episode.episode_number === currentEpisodeNumber
                                            ? 'bg-primary/10 border-primary'
                                            : 'bg-card border-white/5 hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex gap-4 p-3">
                                        {/* Episode Thumbnail */}
                                        <div className="relative w-32 aspect-video flex-shrink-0 rounded-lg overflow-hidden bg-black/50">
                                            {episode.still_path ? (
                                                <Image
                                                    src={getImageUrl(episode.still_path, 'w500')}
                                                    alt={episode.name}
                                                    fill
                                                    className="object-cover transition-transform group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                                    <Play className="w-8 h-8 opacity-50" />
                                                </div>
                                            )}

                                            {/* Playing Overlay */}
                                            {episode.episode_number === currentEpisodeNumber && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-pulse">
                                                        <Play className="w-4 h-4 text-white fill-current" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Episode Info */}
                                        <div className="flex-1 min-w-0 py-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-medium text-primary">
                                                    Episode {episode.episode_number}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {episode.runtime ? `${episode.runtime}m` : 'N/A'}
                                                </span>
                                            </div>
                                            <h3 className={`font-semibold text-sm truncate mb-1 ${episode.episode_number === currentEpisodeNumber ? 'text-primary' : 'text-white'
                                                }`}>
                                                {episode.name}
                                            </h3>
                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                                {episode.overview || "No overview available."}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

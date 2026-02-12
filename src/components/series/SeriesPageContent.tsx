'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl, getSeasonDetails } from '@/services/tmdb';
import { WatchSection } from '@/components/movies/WatchSection';
import { SeasonEpisodeSelector } from '@/components/series/SeasonEpisodeSelector';
import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Star, Calendar, Clock, Plus, Check } from 'lucide-react';
import type { TVShowDetails, Video, Credits, MediaItem, SeasonDetails, Episode } from '@/types/movie';
import { useUIStore } from '@/store/uiStore';
import { useWatchlistStore } from '@/store/watchlistStore';

interface SeriesPageContentProps {
    tvShow: TVShowDetails;
    videos: Video[];
    credits: Credits;
    similar: MediaItem[];
    initialSeason: SeasonDetails;
    mediaLogos?: any;
}

export function SeriesPageContent({ tvShow, videos, credits, similar, initialSeason, mediaLogos }: SeriesPageContentProps) {
    const [currentSeasonDetails, setCurrentSeasonDetails] = useState<SeasonDetails>(initialSeason);
    const [currentEpisode, setCurrentEpisode] = useState<Episode>(initialSeason.episodes?.[0] || {} as Episode);
    const [isLoadingSeason, setIsLoadingSeason] = useState(false);

    // UI Store for trailer modal
    const { openTrailerModal } = useUIStore();
    const trailer = videos.find(v => v.type === 'Trailer' || v.type === 'Teaser');

    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
    const inWatchlist = isInWatchlist(tvShow.id, 'tv');

    const handleWatchlistToggle = () => {
        if (inWatchlist) {
            removeFromWatchlist(tvShow.id, 'tv');
        } else {
            addToWatchlist({
                id: tvShow.id,
                name: tvShow.name,
                poster_path: tvShow.poster_path,
                vote_average: tvShow.vote_average,
                first_air_date: tvShow.first_air_date,
                genre_ids: tvShow.genres?.map(g => g.id) || [],
                media_type: 'tv',
            });
        }
    };

    const handleSeasonChange = async (seasonNumber: number) => {
        if (seasonNumber === currentSeasonDetails.season_number) return;

        setIsLoadingSeason(true);
        try {
            const newSeason = await getSeasonDetails(tvShow.id, seasonNumber);
            setCurrentSeasonDetails(newSeason);
            if (newSeason.episodes && newSeason.episodes.length > 0) {
                setCurrentEpisode(newSeason.episodes[0]);
            }
        } catch (error) {
            console.error('Failed to fetch season details', error);
        } finally {
            setIsLoadingSeason(false);
        }
    };

    const handleEpisodeChange = (episode: Episode) => {
        setCurrentEpisode(episode);
        // Scroll to watch section?
        document.getElementById('watch-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const logo = mediaLogos?.[tvShow.id];

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section (Integrated locally for now or extract later) */}
            <div className="relative h-[80vh] w-full">
                <div className="absolute inset-0">
                    <Image
                        src={getImageUrl(tvShow.backdrop_path, 'original')}
                        alt={tvShow.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-20">
                    <div className="max-w-3xl space-y-6">
                        {logo ? (
                            <div className="relative w-64 h-32 mb-6">
                                <Image
                                    src={getImageUrl(logo.file_path, 'w500')}
                                    alt={tvShow.name}
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        ) : (
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">{tvShow.name}</h1>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/20">
                                <Star className="w-4 h-4 mr-1 fill-current" />
                                {tvShow.vote_average.toFixed(1)}
                            </Badge>
                            <Badge variant="outline">
                                <Calendar className="w-4 h-4 mr-1" />
                                {tvShow.first_air_date.split('-')[0]}
                            </Badge>
                            <Badge variant="outline">
                                <Clock className="w-4 h-4 mr-1" />
                                {tvShow.number_of_seasons} Seasons
                            </Badge>
                            <div className="flex gap-2">
                                {tvShow.genres?.map(g => (
                                    <span key={g.id} className="text-muted-foreground px-2 py-0.5 rounded-full bg-secondary/30 text-xs border border-white/10">
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <p className="text-lg text-gray-300 line-clamp-3 md:line-clamp-4 max-w-2xl">
                            {tvShow.overview}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button
                                size="lg"
                                className="gap-2 text-lg px-8 bg-primary hover:bg-primary/90"
                                onClick={() => document.getElementById('watch-section')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                <Play className="w-5 h-5 fill-current" />
                                Watch S{currentSeasonDetails.season_number} E{currentEpisode.episode_number}
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="gap-2 text-lg px-6 bg-white/5 border-white/10 hover:bg-white/10"
                                onClick={handleWatchlistToggle}
                            >
                                {inWatchlist ? (
                                    <>
                                        <Check className="w-5 h-5" />
                                        Added
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5" />
                                        Watchlist
                                    </>
                                )}
                            </Button>

                            {trailer && (
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="gap-2 text-lg px-8 bg-white/5 border-white/10 hover:bg-white/10"
                                    onClick={() => openTrailerModal(trailer.key)}
                                >
                                    <Play className="w-5 h-5" />
                                    Trailer
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 space-y-12 -mt-10 relative z-20">
                {/* Watch Section */}
                <WatchSection
                    mediaId={tvShow.id}
                    title={tvShow.name}
                    mediaType="tv"
                    season={currentSeasonDetails.season_number}
                    episode={currentEpisode.episode_number}
                />

                {/* Season & Episode Selector */}
                <SeasonEpisodeSelector
                    seasons={tvShow.seasons}
                    currentSeasonNumber={currentSeasonDetails.season_number}
                    episodes={currentSeasonDetails.episodes || []}
                    currentEpisodeNumber={currentEpisode.episode_number}
                    onSeasonChange={handleSeasonChange}
                    onEpisodeChange={handleEpisodeChange}
                    isLoading={isLoadingSeason}
                />

                {/* Cast */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">Cast</h2>
                    <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                        {credits.cast.slice(0, 15).map((castMember) => (
                            <Link href={`/person/${castMember.id}`} key={castMember.id} className="flex-shrink-0 w-32 md:w-40 group">
                                <div className="aspect-[2/3] relative rounded-xl overflow-hidden mb-3 bg-secondary/20">
                                    {castMember.profile_path ? (
                                        <Image
                                            src={getImageUrl(castMember.profile_path, 'w342')}
                                            alt={castMember.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                                    {castMember.name}
                                </h3>
                                <p className="text-xs text-muted-foreground truncate">
                                    {castMember.character}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Similar Shows */}
                <MovieCarousel title="Similar Shows" movies={similar} mediaType="tv" />
            </div>
        </div>
    );
}

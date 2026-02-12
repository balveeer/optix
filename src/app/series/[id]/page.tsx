import {
    getTVDetails, getTVCredits, getTVVideos, getSimilarTV, getTVImages, getSeasonDetails
} from '@/services/tmdb';
import { SeriesPageContent } from '@/components/series/SeriesPageContent';
import type { MovieImage } from '@/types/movie';

interface SeriesPageProps {
    params: Promise<{
        id: string;
    }>;
}

import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: SeriesPageProps) {
    const { id } = await params;
    try {
        const tvShow = await getTVDetails(parseInt(id));
        return {
            title: `${tvShow.name} - OptixMovies`,
            description: tvShow.overview,
        };
    } catch (error) {
        return {
            title: 'Series Not Found - OptixMovies',
            description: 'The requested TV series could not be found.',
        };
    }
}

export default async function SeriesPage({ params }: SeriesPageProps) {
    const { id } = await params;
    const tvId = parseInt(id);

    if (isNaN(tvId)) {
        notFound();
    }

    try {
        // Fetch details first to get season info
        const tvShow = await getTVDetails(tvId);

        // Determine the first season to fetch (usually season 1, or season 0 for specials if 1 doesn't exist?)
        // TMDB usually lists specials as season 0. Regular seasons start at 1.
        // Let's pick the first season in the seasons array that has a season_number > 0, or just the first one.
        const firstSeason = tvShow.seasons.find(s => s.season_number > 0) || tvShow.seasons[0];
        const initialSeasonNumber = firstSeason ? firstSeason.season_number : 1;

        // Fetch parallel data including the initial season details which has episodes
        const [videos, credits, similar, images, initialSeasonDetails] = await Promise.all([
            getTVVideos(tvId),
            getTVCredits(tvId),
            getSimilarTV(tvId),
            getTVImages(tvId),
            getSeasonDetails(tvId, initialSeasonNumber)
        ]);

        // Process logo
        const logo = images.logos.find(l => l.iso_639_1 === 'en') || images.logos[0] || null;
        const mediaLogos = { [tvId]: logo };

        return (
            <SeriesPageContent
                tvShow={tvShow}
                videos={videos.results}
                credits={credits}
                similar={similar.results}
                initialSeason={initialSeasonDetails}
                mediaLogos={mediaLogos}
            />
        );
    } catch (error) {
        console.error('Failed to fetch TV series data:', error);
        notFound();
    }
}

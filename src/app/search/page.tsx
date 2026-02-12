'use client';

import { useState, useCallback, useEffect } from 'react';
import { searchMovies, getTrendingMovies, searchTV, getTrendingTV } from '@/services/tmdb';
import { SearchBar } from '@/components/search/SearchBar';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { ContentToggle } from '@/components/ui/ContentToggle';
import type { Movie, TVShow, MediaItem } from '@/types/movie';

export default function SearchPage() {
    const [results, setResults] = useState<MediaItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [trending, setTrending] = useState<MediaItem[]>([]);
    const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
    const [query, setQuery] = useState('');

    // Load trending items when mediaType changes or on first load
    useEffect(() => {
        setIsLoading(true);
        const fetchTrending = async () => {
            try {
                const data = mediaType === 'movie'
                    ? await getTrendingMovies('week')
                    : await getTrendingTV('week');
                setTrending(data.results.slice(0, 12));
            } catch (error) {
                console.error('Failed to fetch trending', error);
            } finally {
                setIsLoading(false);
            }
        };

        // If we have a query, perform search instead
        if (query.trim()) {
            handleSearch(query);
        } else {
            fetchTrending();
        }
    }, [mediaType]);

    const handleSearch = useCallback(async (searchQuery: string) => {
        setQuery(searchQuery);
        if (!searchQuery.trim()) {
            setResults([]);
            setHasSearched(false);
            // Re-fetch trending when clearing search? 
            // The useEffect on mediaType handles trending, but here we just want to reset to trending view
            return;
        }

        setIsLoading(true);
        setHasSearched(true);

        try {
            const data = mediaType === 'movie'
                ? await searchMovies(searchQuery)
                : await searchTV(searchQuery);
            setResults(data.results);
        } catch (error) {
            console.error('Search failed:', error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, [mediaType]);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                    Search {mediaType === 'movie' ? 'Movies' : 'TV Series'}
                </h1>
                <p className="text-muted-foreground">
                    Find your next favorite {mediaType === 'movie' ? 'movie' : 'show'}
                </p>

                <ContentToggle mediaType={mediaType} onToggle={setMediaType} />
            </div>

            {/* Search Bar */}
            <div className="mb-8">
                <SearchBar onSearch={handleSearch} autoFocus />
            </div>

            {/* Results */}
            {hasSearched ? (
                <div>
                    <h2 className="text-lg font-semibold mb-4">
                        {isLoading ? 'Searching...' : `${results.length} results found`}
                    </h2>
                    <MovieGrid movies={results} isLoading={isLoading} mediaType={mediaType} />
                </div>
            ) : (
                <div>
                    <h2 className="text-lg font-semibold mb-4">🔥 Trending {mediaType === 'movie' ? 'Movies' : 'TV Series'}</h2>
                    <MovieGrid movies={trending} isLoading={isLoading} mediaType={mediaType} />
                </div>
            )}
        </div>
    );
}

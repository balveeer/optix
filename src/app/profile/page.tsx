'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LogIn, Trash2, Star, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/authStore';
import { useWatchlistStore } from '@/store/watchlistStore';
import { getImageUrl } from '@/services/tmdb';
import { GENRE_MAP } from '@/lib/constants';

export default function ProfilePage() {
    const { user } = useAuthStore();
    const { items, removeFromWatchlist, clearWatchlist } = useWatchlistStore();
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

    // Get unique genres from watchlist items
    const availableGenres = useMemo(() => {
        const genreSet = new Set<number>();
        items.forEach(item => {
            item.genre_ids?.forEach(genreId => {
                if (GENRE_MAP[genreId]) {
                    genreSet.add(genreId);
                }
            });
        });
        return Array.from(genreSet).sort((a, b) =>
            (GENRE_MAP[a] || '').localeCompare(GENRE_MAP[b] || '')
        );
    }, [items]);

    // Filter items by selected genre
    const filteredItems = useMemo(() => {
        if (!selectedGenre) return items;
        return items.filter(item => item.genre_ids?.includes(selectedGenre));
    }, [items, selectedGenre]);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Profile Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                    My Profile
                </h1>
                <p className="text-muted-foreground">
                    Manage your watchlist and account
                </p>
            </div>

            {/* User Info or Login Prompt */}
            {user ? (
                <Card className="mb-8 bg-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                                {user.photoURL ? (
                                    <Image
                                        src={user.photoURL}
                                        alt={user.displayName || 'User'}
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <span className="text-2xl font-bold text-primary">
                                        {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{user.displayName || 'User'}</h2>
                                <p className="text-muted-foreground text-sm">{user.email}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="mb-8 bg-card border-border">
                    <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                            <LogIn className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Sign in to sync your watchlist</h2>
                        <p className="text-muted-foreground text-sm mb-4">
                            Your watchlist is saved locally. Sign in to sync across devices.
                        </p>
                        <Link href="/auth/login">
                            <Button className="gradient-purple">Sign In</Button>
                        </Link>
                    </CardContent>
                </Card>
            )}

            {/* Watchlist Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">
                        My Watchlist ({filteredItems.length}{selectedGenre ? ` of ${items.length}` : ''})
                    </h2>
                    {items.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearWatchlist}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Clear All
                        </Button>
                    )}
                </div>

                {/* Genre Filter Capsules */}
                {availableGenres.length > 0 && (
                    <div className="mb-6 -mx-4 px-4">
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {/* All filter */}
                            <button
                                onClick={() => setSelectedGenre(null)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${selectedGenre === null
                                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                    : 'bg-card border border-border hover:border-primary/50 hover:bg-card/80'
                                    }`}
                            >
                                All
                            </button>

                            {/* Genre filters */}
                            {availableGenres.map((genreId) => {
                                const itemCount = items.filter(item =>
                                    item.genre_ids?.includes(genreId)
                                ).length;

                                return (
                                    <button
                                        key={genreId}
                                        onClick={() => setSelectedGenre(genreId === selectedGenre ? null : genreId)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${selectedGenre === genreId
                                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                            : 'bg-card border border-border hover:border-primary/50 hover:bg-card/80'
                                            }`}
                                    >
                                        {GENRE_MAP[genreId]} ({itemCount})
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                <Separator className="mb-6" />

                {items.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl">🎬</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Your watchlist is empty</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Start adding movies to keep track of what you want to watch.
                        </p>
                        <Link href="/">
                            <Button className="gradient-purple">Browse Movies</Button>
                        </Link>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl">🔍</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No movies in this genre</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Try selecting a different genre or clear the filter.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => setSelectedGenre(null)}
                        >
                            Show All Movies
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.03 }}
                                    layout
                                >
                                    <Card className="bg-card border-border overflow-hidden group hover:border-primary/50 transition-colors">
                                        <CardContent className="p-0">
                                            <Link href={item.media_type === 'tv' ? `/series/${item.id}` : `/movie/${item.id}`} className="flex gap-4">
                                                {/* Poster */}
                                                <div className="w-20 h-28 flex-shrink-0 relative">
                                                    <Image
                                                        src={getImageUrl(item.poster_path, 'w185')}
                                                        alt={item.title || item.name || 'Poster'}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 py-3 pr-4">
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                                            {item.title || item.name}
                                                        </h3>
                                                        <span className="text-[10px] uppercase tracking-wider bg-white/10 px-1.5 py-0.5 rounded text-muted-foreground">
                                                            {item.media_type === 'tv' ? 'TV' : 'Movie'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                            <span>{item.vote_average?.toFixed(1)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            <span>{(item.release_date || item.first_air_date)?.split('-')[0]}</span>
                                                        </div>
                                                    </div>
                                                    {/* Genre tags */}
                                                    {item.genre_ids && item.genre_ids.length > 0 && (
                                                        <div className="flex flex-wrap gap-1">
                                                            {item.genre_ids.slice(0, 3).map(genreId => (
                                                                GENRE_MAP[genreId] && (
                                                                    <span
                                                                        key={genreId}
                                                                        className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary"
                                                                    >
                                                                        {GENRE_MAP[genreId]}
                                                                    </span>
                                                                )
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Remove Button */}
                                                <div className="flex items-center pr-3">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            removeFromWatchlist(item.id, item.media_type);
                                                        }}
                                                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}

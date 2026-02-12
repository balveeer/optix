'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Genre } from '@/types/movie';

interface GenreCardsProps {
    genres: Genre[];
    mediaType?: 'movie' | 'tv';
}

// Genre icon mapping with gradients
const genreStyles: { [key: number]: { icon: string; gradient: string } } = {
    // ... existing genres ...
    28: { icon: '💥', gradient: 'from-red-500 to-orange-500' },      // Action
    12: { icon: '🗺️', gradient: 'from-green-500 to-emerald-500' },   // Adventure
    16: { icon: '🎨', gradient: 'from-pink-500 to-purple-500' },     // Animation
    35: { icon: '😂', gradient: 'from-yellow-400 to-orange-400' },   // Comedy
    80: { icon: '🔪', gradient: 'from-gray-600 to-gray-800' },       // Crime
    99: { icon: '📹', gradient: 'from-blue-400 to-cyan-400' },       // Documentary
    18: { icon: '🎭', gradient: 'from-purple-500 to-pink-500' },     // Drama
    10751: { icon: '👨‍👩‍👧‍👦', gradient: 'from-blue-400 to-green-400' }, // Family
    14: { icon: '🧙', gradient: 'from-violet-500 to-purple-600' },   // Fantasy
    36: { icon: '📜', gradient: 'from-amber-600 to-yellow-600' },    // History
    27: { icon: '👻', gradient: 'from-gray-700 to-red-900' },        // Horror
    10402: { icon: '🎵', gradient: 'from-pink-400 to-rose-500' },    // Music
    9648: { icon: '🔍', gradient: 'from-slate-600 to-blue-700' },    // Mystery
    10749: { icon: '💕', gradient: 'from-pink-400 to-red-400' },     // Romance
    878: { icon: '🚀', gradient: 'from-blue-500 to-cyan-500' },      // Science Fiction
    10770: { icon: '📺', gradient: 'from-indigo-400 to-purple-500' },// TV Movie
    53: { icon: '😰', gradient: 'from-gray-700 to-slate-800' },      // Thriller
    10752: { icon: '⚔️', gradient: 'from-green-700 to-gray-700' },   // War
    37: { icon: '🤠', gradient: 'from-amber-500 to-yellow-600' },    // Western
    // TV Specific Genres
    10759: { icon: '🥋', gradient: 'from-red-600 to-orange-600' },   // Action & Adventure
    10762: { icon: '🧸', gradient: 'from-blue-300 to-pink-300' },    // Kids
    10763: { icon: '📰', gradient: 'from-gray-500 to-slate-600' },   // News
    10764: { icon: '🎤', gradient: 'from-yellow-500 to-orange-500' }, // Reality
    10765: { icon: '👽', gradient: 'from-indigo-600 to-purple-600' }, // Sci-Fi & Fantasy
    10766: { icon: '🧼', gradient: 'from-pink-500 to-rose-500' },    // Soap
    10767: { icon: '🗣️', gradient: 'from-blue-500 to-cyan-500' },    // Talk
    10768: { icon: '⚔️', gradient: 'from-red-700 to-gray-800' },     // War & Politics
};

const defaultStyle = { icon: '🎬', gradient: 'from-purple-500 to-violet-600' };

export function GenreCards({ genres, mediaType = 'movie' }: GenreCardsProps) {
    return (
        <section className="py-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">🎭 Browse by Genre</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {genres.map((genre, index) => {
                    const style = genreStyles[genre.id] || defaultStyle;
                    const href = mediaType === 'movie'
                        ? `/genre/${genre.id}`
                        : `/genre/${genre.id}?type=tv`;

                    return (
                        <Link key={genre.id} href={href}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className={`
                  relative overflow-hidden rounded-2xl p-5
                  bg-gradient-to-br ${style.gradient}
                  cursor-pointer group
                  shadow-lg hover:shadow-xl hover:shadow-primary/20
                  transition-shadow duration-300
                `}
                            >
                                {/* Background pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute -right-4 -bottom-4 text-8xl transform rotate-12 opacity-30">
                                        {style.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <span className="text-3xl mb-2 block">{style.icon}</span>
                                    <h3 className="font-bold text-sm md:text-base text-white drop-shadow-md">
                                        {genre.name}
                                    </h3>
                                </div>

                                {/* Shine effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

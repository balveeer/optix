'use client';

import { motion } from 'framer-motion';
import { Monitor, Film } from 'lucide-react';

interface ContentToggleProps {
    mediaType: 'movie' | 'tv';
    onToggle: (type: 'movie' | 'tv') => void;
}

export function ContentToggle({ mediaType, onToggle }: ContentToggleProps) {
    return (
        <div className="flex items-center justify-center py-6 relative z-20">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-1 rounded-full flex relative">
                <button
                    onClick={() => onToggle('movie')}
                    className={`
                        relative z-10 flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200
                        ${mediaType === 'movie' ? 'text-white' : 'text-gray-400 hover:text-white'}
                    `}
                >
                    <Film className="w-4 h-4" />
                    <span>Movies</span>
                </button>
                <button
                    onClick={() => onToggle('tv')}
                    className={`
                        relative z-10 flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200
                        ${mediaType === 'tv' ? 'text-white' : 'text-gray-400 hover:text-white'}
                    `}
                >
                    <Monitor className="w-4 h-4" />
                    <span>Series</span>
                </button>

                {/* Sliding Background */}
                <motion.div
                    className="absolute top-1 bottom-1 bg-primary rounded-full"
                    initial={false}
                    animate={{
                        x: mediaType === 'movie' ? 0 : '100%',
                        width: '50%'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            </div>
        </div>
    );
}

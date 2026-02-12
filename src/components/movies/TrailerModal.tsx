'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/store/uiStore';
import { getYouTubeEmbedUrl } from '@/services/tmdb';

export function TrailerModal() {
    const { isTrailerModalOpen, currentTrailerKey, closeTrailerModal } = useUIStore();

    if (!isTrailerModalOpen || !currentTrailerKey) return null;

    return (
        <AnimatePresence>
            {isTrailerModalOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeTrailerModal}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-5xl aspect-video">
                            {/* Close Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={closeTrailerModal}
                                className="absolute -top-12 right-0 text-white hover:bg-white/10"
                            >
                                <X className="w-6 h-6" />
                            </Button>

                            {/* YouTube Embed */}
                            <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-primary/20">
                                <iframe
                                    src={`${getYouTubeEmbedUrl(currentTrailerKey)}?autoplay=1&rel=0`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                    title="Movie Trailer"
                                />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

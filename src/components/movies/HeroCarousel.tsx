'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Plus, Check, ChevronLeft, ChevronRight, Info, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWatchlistStore } from '@/store/watchlistStore';
import { useUIStore } from '@/store/uiStore';
import { getImageUrl } from '@/services/tmdb';
import type { MediaItem, MovieImage } from '@/types/movie';

interface HeroCarouselProps {
    movies: MediaItem[];
    movieLogos: { [movieId: number]: MovieImage | null };
    mediaType?: 'movie' | 'tv';
}

export function HeroCarousel({ movies, movieLogos, mediaType = 'movie' }: HeroCarouselProps) {
    const [[page, direction], setPage] = useState([0, 0]);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
    const { openTrailerModal: openTrailer } = useUIStore();
    const router = useRouter(); // Restored
    const isScrolling = useRef(false);
    const isDragging = useRef(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Calculate current index with wrap logic
    const movieIndex = ((page % movies.length) + movies.length) % movies.length;
    const currentMovie = movies[movieIndex];
    const inWatchlist = currentMovie ? isInWatchlist(currentMovie.id, mediaType) : false;
    const currentLogo = currentMovie ? movieLogos[currentMovie.id] : null;

    // Auto-advance carousel
    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(() => {
            paginate(1);
        }, 6000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, page]); // Depend on page instead of index

    const paginate = useCallback((newDirection: number) => {
        setPage([page + newDirection, newDirection]);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, [page]);

    const goToSlide = useCallback((index: number) => {
        const direction = index > movieIndex ? 1 : -1;
        setPage([index, direction]); // Simple jump logic for dots, assumes closer path is better but simple jump is fine
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, [movieIndex]);

    const goToPrevious = useCallback(() => {
        paginate(-1);
    }, [paginate]);

    const goToNext = useCallback(() => {
        paginate(1);
    }, [paginate]);

    // Swipe handling logic
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const handleWatchlistClick = () => {
        if (!currentMovie) return;
        if (inWatchlist) {
            removeFromWatchlist(currentMovie.id);
        } else {
            addToWatchlist({
                id: currentMovie.id,
                title: 'title' in currentMovie ? currentMovie.title : undefined,
                name: 'name' in currentMovie ? currentMovie.name : undefined,
                poster_path: currentMovie.poster_path,
                vote_average: currentMovie.vote_average,
                release_date: 'release_date' in currentMovie ? currentMovie.release_date : undefined,
                first_air_date: 'first_air_date' in currentMovie ? currentMovie.first_air_date : undefined,
                genre_ids: currentMovie.genre_ids || [],
                media_type: mediaType,
            });
        }
    };

    const handlePlayTrailer = () => {
        const prefix = mediaType === 'movie' ? 'movie' : 'tv';
        openTrailer(`${prefix}-${currentMovie.id}`);
    };

    if (!currentMovie) return null;

    const title = 'title' in currentMovie ? currentMovie.title : currentMovie.name;
    const releaseDate = 'release_date' in currentMovie ? currentMovie.release_date : currentMovie.first_air_date;
    const releaseYear = releaseDate?.split('-')[0];
    const linkHref = mediaType === 'movie' ? `/movie/${currentMovie.id}` : `/series/${currentMovie.id}`;

    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0
            };
        }
    };

    const posterVariants = {
        enter: { y: '100%', opacity: 0 },
        center: { y: 0, opacity: 1 },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };

    return (
        <section
            className="relative h-[72vh] md:h-[85vh] min-h-[500px] overflow-hidden cursor-pointer"
            onWheel={(e) => {
                if (isScrolling.current) return;

                if (Math.abs(e.deltaX) > 30) {
                    isScrolling.current = true;
                    if (e.deltaX > 0) paginate(1);
                    else paginate(-1);

                    // Cooldown to prevent rapid scrolling
                    setTimeout(() => {
                        isScrolling.current = false;
                    }, 500);
                }
            }}
        >
            {/* Full-width draggable area for swipe/drag */}
            <motion.div
                className="absolute inset-0 z-20"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragStart={() => {
                    isDragging.current = true;
                }}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                    }

                    // Reset dragging state after a small delay to prevent click/tap firing
                    setTimeout(() => {
                        isDragging.current = false;
                    }, 100);
                }}
                onTap={(e, info) => {
                    // Navigate only if it's a tap, not a drag
                    if (isDragging.current) return;
                    router.push(linkHref);
                }}
            />
            {/* Background Images with Transition */}
            <AnimatePresence initial={false} custom={direction} mode="sync">
                {/* Use sync mode so background can animate in over the old one if needed, or wait */}
                <motion.div
                    key={page}
                    custom={direction}
                    variants={posterVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        y: { type: "spring", stiffness: 300, damping: 30, delay: 0.2 }, // Delay background slightly
                        opacity: { duration: 0.5 }
                    }}
                    className="absolute inset-0 z-0"
                >
                    {/* Desktop Backdrop */}
                    <div className="hidden md:block w-full h-full relative">
                        <Image
                            src={getImageUrl(currentMovie.backdrop_path, 'original')}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    {/* Mobile Poster as Background */}
                    <div className="md:hidden w-full h-full relative">
                        <Image
                            src={getImageUrl(currentMovie.poster_path, 'original')}
                            alt={title}
                            fill
                            className="object-cover object-top" // Focus on top part of poster
                            priority
                        />
                        {/* Stronger overlay for mobile poster readability */}
                        <div className="absolute inset-0 bg-black/70" />
                    </div>

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="absolute inset-0 flex items-center z-10">
                <div className="container mx-auto px-4 h-full flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 h-full md:h-auto justify-center">
                        {/* Left side - Text content */}
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={page}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="max-w-xl space-y-4 md:space-y-6 order-2 md:order-1 text-center md:text-left items-center md:items-start w-full pointer-events-none"
                            >


                                {/* Movie Logo or Title */}
                                {/* Mobile Poster - Above title */}
                                <div className="md:hidden flex justify-center mb-4">
                                    <motion.div
                                        initial={{ y: -50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="relative w-32 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl"
                                        style={{
                                            boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.4), 0 0 0 1px rgba(168, 85, 247, 0.1)',
                                        }}
                                    >
                                        <Image
                                            src={getImageUrl(currentMovie.poster_path, 'w342')}
                                            alt={title}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </div>

                                {/* Movie Logo or Title */}
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center md:text-left select-none pointer-events-none">
                                    {title}
                                </h1>

                                {/* Meta info */}
                                <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center md:justify-start select-none pointer-events-none">
                                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                                        ⭐ {currentMovie.vote_average.toFixed(1)}
                                    </Badge>
                                    {releaseYear && (
                                        <Badge variant="outline" className="border-white/20">
                                            {releaseYear}
                                        </Badge>
                                    )}
                                    <Badge variant="outline" className="border-white/20">
                                        Trending #{movieIndex + 1}
                                    </Badge>
                                </div>

                                {/* Overview */}
                                <p className="text-sm md:text-base lg:text-lg text-gray-300 line-clamp-2 md:line-clamp-3 leading-relaxed text-center md:text-left select-none pointer-events-none">
                                    {currentMovie.overview}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-3 md:gap-4 pt-2 justify-center md:justify-start relative z-30 pointer-events-auto">
                                    <Link href={`${linkHref}#watch`}>
                                        <Button
                                            size="lg"
                                            className="gradient-purple hover:opacity-90 transition-all gap-2 text-sm md:text-base px-4 md:px-8"
                                        >
                                            <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                                            <span className="hidden sm:inline">Watch</span> {mediaType === 'movie' ? 'Movie' : 'Series'}
                                        </Button>
                                    </Link>

                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white/30 hover:bg-white/10 gap-2 text-sm md:text-base"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent slide click
                                            handlePlayTrailer();
                                        }}
                                    >
                                        <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                                        <span className="hidden sm:inline">Watch</span> Trailer
                                    </Button>

                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className={`h-10 w-10 md:h-12 md:w-12 rounded-full border-white/30 hover:bg-white/10 ${mounted && inWatchlist ? 'bg-primary/20 border-primary' : ''
                                            }`}
                                        onClick={handleWatchlistClick}
                                    >
                                        {mounted && inWatchlist ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5" />}
                                    </Button>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Right side - Desktop Poster */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`poster-${page}`}
                                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                exit={{ opacity: 0, x: -50, rotateY: 15 }}
                                transition={{ duration: 0.4, delay: 0.15 }}
                                className="hidden md:block order-1 md:order-2"
                            >
                                <div
                                    className="relative group"
                                    style={{ perspective: '1000px' }}
                                >
                                    {/* Glow effect behind poster */}
                                    <div
                                        className="absolute -inset-6 rounded-3xl opacity-50 blur-2xl transition-opacity group-hover:opacity-70"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(124, 58, 237, 0.4) 100%)',
                                        }}
                                    />

                                    {/* Shadow layers for depth */}
                                    <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-black/40 blur-xl" />
                                    <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-black/30 blur-lg" />

                                    {/* Main poster */}
                                    <motion.div
                                        whileHover={{ scale: 1.02, rotateY: 5 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-56 lg:w-72 aspect-[2/3] rounded-2xl overflow-hidden"
                                        style={{
                                            boxShadow: `
                        0 50px 100px -20px rgba(0, 0, 0, 0.6),
                        0 30px 60px -30px rgba(168, 85, 247, 0.4),
                        0 0 0 1px rgba(255, 255, 255, 0.1),
                        inset 0 1px 0 0 rgba(255, 255, 255, 0.1)
                      `,
                                        }}
                                    >
                                        <Image
                                            src={getImageUrl(currentMovie.poster_path, 'w500')}
                                            alt={title}
                                            fill
                                            className="object-cover"
                                        />

                                        {/* Subtle shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

                                        {/* Border glow on hover */}
                                        <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-primary/30 transition-colors" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
            <button
                onClick={goToPrevious}
                className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all group"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button
                onClick={goToNext}
                className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all group"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                {movies.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === movieIndex
                            ? 'w-8 h-2 bg-primary'
                            : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

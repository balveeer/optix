'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Server, ChevronDown, Check, Zap, Settings, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WatchSectionProps {
    mediaId: number;
    title: string;
    mediaType?: 'movie' | 'tv';
    season?: number;
    episode?: number;
}

interface GameServer {
    id: string;
    name: string;
    description: string;
    color: string;
    urlTemplate: (id: number, season?: number, episode?: number) => string;
}

// Map agent names to colors (approximate Valorant agent colors)
const agentColors: Record<string, string> = {
    Neon: '#4deaff', // Electric Blue
    Yoru: '#3b4da1', // Rift Blue
    Cypher: '#d1d1d1', // White/Grey
    Sage: '#5ee4c9', // Jade
    Jett: '#d2e8f0', // Cloud White
    Reyna: '#b8426d', // Empress Pink
    Breach: '#d66e28', // Fault Line Orange
    Vyse: '#8a6fa3', // Liquid Metal Purple
    Killjoy: '#f5d442', // Turret Yellow
    Harbor: '#1f6e63', // Cove Green
    Chamber: '#c9a15b', // Tour de Force Gold
    Fade: '#5c6b7f', // Nightmare Blue/Grey
    Gekko: '#a8e063', // Mosh Pit Green
    Kayo: '#5f8bd1', // Zero/Point Blue
    Raze: '#ff5722', // Paint Shell Orange
    Phoenix: '#ff9800', // Blaze Orange
    Astra: '#512da8', // Astral Purple
};

const servers: GameServer[] = [
    {
        id: 'chamber',
        name: 'Chamber',
        description: 'High Quality • vidlink.pro',
        color: agentColors.Chamber,
        urlTemplate: (id, s, e) => s && e
            ? `https://vidlink.pro/tv/${id}/${s}/${e}`
            : `https://vidlink.pro/movie/${id}`,
    },
    {
        id: 'reyna',
        name: 'Reyna',
        description: 'Popular • vidsrc.icu',
        color: agentColors.Reyna,
        urlTemplate: (id, s, e) => s && e
            ? `https://vidsrc.icu/embed/tv/${id}/${s}/${e}`
            : `https://vidsrc.icu/embed/movie/${id}`,
    }, {
        id: 'neon',
        name: 'Neon',
        description: 'Super Fast • vidsrc.rip',
        color: agentColors.Neon,
        urlTemplate: (id, s, e) => s && e
            ? `https://vidsrc.rip/embed/tv/${id}/${s}/${e}`
            : `https://vidsrc.rip/embed/movie/${id}`,
    },
    {
        id: 'breach',
        name: 'Breach',
        description: 'Reliable • embed.su',
        color: agentColors.Breach,
        urlTemplate: (id, s, e) => s && e
            ? `https://embed.su/embed/tv/${id}/${s}/${e}`
            : `https://embed.su/embed/movie/${id}`,
    },
    {
        id: 'yoru',
        name: 'Yoru',
        description: '4K Support • vidsrc.to',
        color: agentColors.Yoru,
        urlTemplate: (id, s, e) => s && e
            ? `https://vidsrc.to/embed/tv/${id}/${s}/${e}`
            : `https://vidsrc.to/embed/movie/${id}`,
    },
    {
        id: 'harbor',
        name: 'Harbor',
        description: 'Standard • vidsrc.me',
        color: agentColors.Harbor,
        urlTemplate: (id, s, e) => s && e
            ? `https://vidsrc.me/embed/tv/${id}/${s}/${e}`
            : `https://vidsrc.me/embed/movie/${id}`,
    },
    {
        id: 'sage',
        name: 'Sage',
        description: 'Backup • vidsrc.cc',
        color: agentColors.Sage,
        urlTemplate: (id, s, e) => s && e
            ? `https://vidsrc.cc/v2/embed/tv/${id}/${s}/${e}`
            : `https://vidsrc.cc/v2/embed/movie/${id}`,
    },
    {
        id: 'jett',
        name: 'Jett',
        description: 'Fast Load • multiembed',
        color: agentColors.Jett,
        urlTemplate: (id, s, e) => s && e
            ? `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${s}&e=${e}`
            : `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
    },
    {
        id: 'cypher',
        name: 'Cypher',
        description: 'Alternative • moviesapi',
        color: agentColors.Cypher,
        urlTemplate: (id, s, e) => s && e
            ? `https://moviesapi.club/tv/${id}-${s}-${e}`
            : `https://moviesapi.club/movie/${id}`,
    },
    {
        id: 'viper',
        name: 'Viper',
        description: 'Premium • 2embed',
        color: '#1b5e20', // Viper Green
        urlTemplate: (id, s, e) => s && e
            ? `https://www.2embed.cc/embedtv/${id}&s=${s}&e=${e}`
            : `https://www.2embed.cc/embed/${id}`,
    },
    {
        id: 'killjoy',
        name: 'Killjoy',
        description: 'German/Eng • vidsrc.net',
        color: agentColors.Killjoy,
        urlTemplate: (id, s, e) => s && e
            ? `https://vidsrc.net/embed/tv/${id}/${s}/${e}`
            : `https://vidsrc.net/embed/movie/${id}`,
    },
    {
        id: 'fade',
        name: 'Fade',
        description: 'Hindi/Eng • superembed',
        color: agentColors.Fade,
        urlTemplate: (id, s, e) => s && e
            ? `https://superembed.stream/tv/${id}/${s}/${e}`
            : `https://superembed.stream/movie/${id}`,
    },
    {
        id: 'astra',
        name: 'Astra',
        description: 'Auto Embed • autoembed',
        color: agentColors.Astra,
        urlTemplate: (id, s, e) => s && e
            ? `https://autoembed.to/tv/tmdb/${id}-${s}-${e}`
            : `https://autoembed.to/movie/tmdb/${id}`,
    },
    {
        id: 'phoenix',
        name: 'Phoenix',
        description: 'WarezCDN',
        color: agentColors.Phoenix,
        urlTemplate: (id, s, e) => s && e
            ? `https://warezcdn.com/embed/tv/${id}/${s}/${e}`
            : `https://warezcdn.com/embed/movie/${id}`,
    },
    {
        id: 'kayo',
        name: 'Kayo',
        description: 'Movie Web',
        color: agentColors.Kayo,
        urlTemplate: (id, s, e) => s && e
            ? `https://movie-web.app/media/tmdb-tv-${id}/${s}/${e}`
            : `https://movie-web.app/media/tmdb-movie-${id}`,
    },
    {
        id: 'vyse',
        name: 'Vyse',
        description: 'Smashy Stream',
        color: agentColors.Vyse,
        urlTemplate: (id, s, e) => s && e
            ? `https://player.smashy.stream/tv/${id}?s=${s}&e=${e}`
            : `https://player.smashy.stream/movie/${id}`,
    },
];

export function WatchSection({ mediaId, title, mediaType = 'movie', season, episode }: WatchSectionProps) {
    // Default to Neon (first server)
    const [selectedServer, setSelectedServer] = useState<GameServer>(servers[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [iframeKey, setIframeKey] = useState(0); // To force reload iframe

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleServerSelect = (server: GameServer) => {
        if (server.id !== selectedServer.id) {
            setSelectedServer(server);
            setIframeKey(prev => prev + 1); // Reload iframe
        }
        setIsDropdownOpen(false);
    };

    const handleRetry = () => {
        setIframeKey(prev => prev + 1);
    };

    return (
        <section id="watch-section" className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-900/5 to-background pointer-events-none" />
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-[${selectedServer.color}]/10 blur-[120px] rounded-full transition-colors duration-700`} />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header & Controls */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold flex items-center gap-3">
                                <Play className="fill-primary text-primary w-8 h-8" />
                                Watch {mediaType === 'movie' ? 'Movie' : `S${season} E${episode}`}
                            </h2>
                            <p className="text-muted-foreground mt-2">
                                Streaming via secure providers. Select a server below.
                            </p>
                        </div>

                        {/* Server Selector Dropdown */}
                        <div className="relative z-50" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-3 bg-secondary/50 hover:bg-secondary/80 border border-white/10 rounded-xl px-4 py-3 min-w-[280px] transition-all duration-200 group"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <div
                                        className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] transition-colors duration-300"
                                        style={{ color: selectedServer.color, backgroundColor: selectedServer.color }}
                                    />
                                    <div className="text-left">
                                        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Current Server</div>
                                        <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                                            {selectedServer.name}
                                        </div>
                                    </div>
                                </div>
                                <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300", isDropdownOpen && "rotate-180")} />
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 md:right-auto md:left-0 top-full mt-2 w-full md:w-[320px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                                    >
                                        <div className="p-3 border-b border-white/5 bg-white/5">
                                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2">Select Server</div>
                                        </div>
                                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2 space-y-1">
                                            {servers.map((server) => (
                                                <button
                                                    key={server.id}
                                                    onClick={() => handleServerSelect(server)}
                                                    className={cn(
                                                        "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group relative overflow-hidden",
                                                        selectedServer.id === server.id
                                                            ? "bg-primary/10 text-primary"
                                                            : "hover:bg-white/5 text-foreground/80 hover:text-foreground"
                                                    )}
                                                >
                                                    {selectedServer.id === server.id && (
                                                        <motion.div
                                                            layoutId="activeServerBg"
                                                            className="absolute inset-0 bg-primary/10 rounded-lg" // Fallback if layoutId acts weird
                                                        />
                                                    )}

                                                    <div
                                                        className="w-2 h-2 rounded-full transition-colors relative z-10"
                                                        style={{ backgroundColor: server.color }}
                                                    />

                                                    <div className="flex-1 text-left relative z-10">
                                                        <div className="font-medium text-sm">{server.name}</div>
                                                        <div className="text-xs text-muted-foreground opacity-70 group-hover:opacity-100 transition-opacity">
                                                            {server.description}
                                                        </div>
                                                    </div>

                                                    {selectedServer.id === server.id && (
                                                        <Check className="w-4 h-4 relative z-10" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Video Player */}
                    <div className="relative group">
                        {/* Glow Effect */}
                        <div
                            className="absolute -inset-1 rounded-2xl opacity-20 group-hover:opacity-40 blur-xl transition-all duration-1000"
                            style={{ background: `linear-gradient(to right, ${selectedServer.color}, ${selectedServer.color}00)` }}
                        />

                        <Card className="relative overflow-hidden bg-black/80 border-white/10 shadow-2xl rounded-2xl aspect-video w-full z-10">
                            <iframe
                                key={iframeKey}
                                src={selectedServer.urlTemplate(mediaId, season, episode)}
                                className="w-full h-full border-0"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                title={`Watching ${title} on ${selectedServer.name}`}
                            />

                            {/* Overlay Controls (Hidden when playing usually, but good for aesthetics before load) */}
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="h-8 w-8 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white border border-white/10"
                                    onClick={handleRetry}
                                    title="Reload Player"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </Button>
                                <div className="h-8 px-3 flex items-center gap-2 bg-black/50 backdrop-blur-md text-xs font-medium text-white border border-white/10 rounded-md">
                                    <Server className="w-3 h-3" />
                                    {selectedServer.name}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground bg-secondary/20 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span>If the current server is slow or buffering, please switch to another one.</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="hover:text-primary transition-colors flex items-center gap-1.5">
                                <Settings className="w-4 h-4" />
                                Report Issue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

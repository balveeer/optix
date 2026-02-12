'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/services/tmdb';
import type { Crew } from '@/types/movie';

interface CrewListProps {
    crew: Crew[];
    title?: string;
}

export function CrewList({ crew, title = 'Directors & Producers' }: CrewListProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    // Filter for directors and producers
    const keyCrewRoles = ['Director', 'Producer', 'Executive Producer', 'Writer', 'Screenplay'];
    const keyCrew = crew.filter(person => keyCrewRoles.includes(person.job));

    // Remove duplicates (same person with multiple roles)
    const uniqueCrew = keyCrew.reduce((acc, person) => {
        const existing = acc.find(p => p.id === person.id);
        if (existing) {
            // Append job to existing person
            existing.job = `${existing.job}, ${person.job}`;
        } else {
            acc.push({ ...person });
        }
        return acc;
    }, [] as Crew[]);

    if (!uniqueCrew.length) return null;

    return (
        <section className="relative group/crew">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
                {uniqueCrew.length > 4 && (
                    <div className="hidden sm:flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => scroll('left')}
                            className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => scroll('right')}
                            className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Crew Scroll Container */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {uniqueCrew.map((person) => (
                    <Link
                        key={`${person.id}-${person.job}`}
                        href={`/person/${person.id}`}
                        className="flex-shrink-0 w-[120px] text-center group"
                    >
                        {/* Profile Image */}
                        <div className="aspect-square relative rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-colors">
                            <Image
                                src={getImageUrl(person.profile_path, 'w185')}
                                alt={person.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Name & Role */}
                        <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">{person.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                            {person.job}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}

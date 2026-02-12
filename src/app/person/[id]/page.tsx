import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Film, Star } from 'lucide-react';
import { getPersonDetails, getPersonMovieCredits, getImageUrl } from '@/services/tmdb';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

interface PersonPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PersonPageProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const person = await getPersonDetails(parseInt(id));
        return {
            title: `${person.name} | Optix`,
            description: person.biography?.slice(0, 160) || `View ${person.name}'s profile and filmography`,
            openGraph: {
                title: person.name,
                description: person.biography?.slice(0, 160) || `View ${person.name}'s profile and filmography`,
                images: person.profile_path
                    ? [`https://image.tmdb.org/t/p/w500${person.profile_path}`]
                    : [],
            },
        };
    } catch {
        return {
            title: 'Person Not Found',
        };
    }
}

export default async function PersonPage({ params }: PersonPageProps) {
    const { id } = await params;
    const personId = parseInt(id);

    if (isNaN(personId)) {
        notFound();
    }

    try {
        // Fetch person data and credits in parallel
        // Fetch person data and credits in parallel
        const [personResult, creditsResult] = await Promise.allSettled([
            getPersonDetails(personId),
            getPersonMovieCredits(personId),
        ]);

        if (personResult.status === 'rejected') {
            throw new Error('Person not found');
        }

        const person = personResult.value;
        const credits = creditsResult.status === 'fulfilled' ? creditsResult.value : { cast: [], crew: [] };

        // Sort movies by popularity and filter out those without posters
        const actingCredits = credits.cast
            .filter(movie => movie.poster_path)
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 20);

        const crewCredits = credits.crew
            .filter(movie => movie.poster_path)
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 10);

        // Format birthday
        const formatDate = (dateStr: string | null) => {
            if (!dateStr) return null;
            return new Date(dateStr).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        };

        // Calculate age
        const calculateAge = (birthday: string | null, deathday: string | null) => {
            if (!birthday) return null;
            const endDate = deathday ? new Date(deathday) : new Date();
            const birthDate = new Date(birthday);
            let age = endDate.getFullYear() - birthDate.getFullYear();
            const monthDiff = endDate.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && endDate.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        };

        const age = calculateAge(person.birthday, person.deathday);

        return (
            <div className="min-h-screen pt-20 pb-12">
                <div className="container mx-auto px-4">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row gap-8 mb-12">
                        {/* Profile Image */}
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                            <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden border-4 border-primary/30 shadow-xl shadow-primary/20">
                                <Image
                                    src={getImageUrl(person.profile_path, 'w500')}
                                    alt={person.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">{person.name}</h1>

                            <Badge variant="secondary" className="mb-4">
                                {person.known_for_department}
                            </Badge>

                            {/* Meta Info */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-6">
                                {person.birthday && (
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {formatDate(person.birthday)}
                                            {age && !person.deathday && ` (${age} years old)`}
                                        </span>
                                    </div>
                                )}
                                {person.deathday && (
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Died: {formatDate(person.deathday)} (age {age})</span>
                                    </div>
                                )}
                                {person.place_of_birth && (
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{person.place_of_birth}</span>
                                    </div>
                                )}
                            </div>

                            {/* Biography */}
                            {person.biography && (
                                <div className="max-w-3xl">
                                    <h2 className="text-lg font-semibold mb-2">Biography</h2>
                                    <p className="text-muted-foreground leading-relaxed line-clamp-[8] md:line-clamp-none">
                                        {person.biography}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Acting Credits */}
                    {actingCredits.length > 0 && (
                        <section className="mb-12">
                            <div className="flex items-center gap-2 mb-6">
                                <Film className="w-5 h-5 text-primary" />
                                <h2 className="text-xl md:text-2xl font-bold">Known For</h2>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {actingCredits.map((movie) => (
                                    <Link
                                        key={movie.credit_id}
                                        href={`/movie/${movie.id}`}
                                        className="group"
                                    >
                                        <div className="aspect-[2/3] relative rounded-lg overflow-hidden mb-2 border border-border group-hover:border-primary transition-colors">
                                            <Image
                                                src={getImageUrl(movie.poster_path, 'w342')}
                                                alt={movie.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {/* Rating Badge */}
                                            {movie.vote_average > 0 && (
                                                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-md px-1.5 py-0.5 flex items-center gap-1">
                                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                                            {movie.title}
                                        </h3>
                                        {movie.character && (
                                            <p className="text-xs text-muted-foreground line-clamp-1">
                                                as {movie.character}
                                            </p>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Crew Credits (for directors, producers, etc.) */}
                    {crewCredits.length > 0 && (
                        <section>
                            <div className="flex items-center gap-2 mb-6">
                                <Film className="w-5 h-5 text-primary" />
                                <h2 className="text-xl md:text-2xl font-bold">
                                    {person.known_for_department === 'Acting' ? 'Also Worked On' : 'Filmography'}
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {crewCredits.map((movie) => (
                                    <Link
                                        key={movie.credit_id}
                                        href={`/movie/${movie.id}`}
                                        className="group"
                                    >
                                        <div className="aspect-[2/3] relative rounded-lg overflow-hidden mb-2 border border-border group-hover:border-primary transition-colors">
                                            <Image
                                                src={getImageUrl(movie.poster_path, 'w342')}
                                                alt={movie.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <h3 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                                            {movie.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground line-clamp-1">
                                            {movie.job}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Failed to load person:', error);
        notFound();
    }
}

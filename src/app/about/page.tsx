import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Film, Users, Globe, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about Optix — your ultimate movie and series discovery platform.',
};

const stats = [
    { label: 'Movies & Shows', value: '500K+', icon: Film },
    { label: 'Active Users', value: '10K+', icon: Users },
    { label: 'Countries', value: '190+', icon: Globe },
    { label: 'Daily Updates', value: '24/7', icon: Sparkles },
];

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Header */}
            <div className="mb-10">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
                <h1 className="text-4xl font-bold gradient-text mb-4">About Optix</h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    Optix is a modern movie and series discovery platform designed for cinephiles who love
                    exploring new content, building watchlists, and staying up-to-date with trending entertainment.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="p-6 rounded-xl bg-card border border-border text-center hover:border-primary/30 transition-colors"
                        >
                            <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                            <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    );
                })}
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none space-y-8">
                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We believe that discovering great movies and series should be effortless and enjoyable.
                        Our mission is to provide a beautifully designed platform that helps you find your next
                        favorite film, track what you&apos;ve watched, and connect with a community of fellow
                        movie enthusiasts.
                    </p>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">What We Offer</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Curated collections of trending, top-rated, and now-playing movies</li>
                        <li>Detailed movie and series information powered by TMDB</li>
                        <li>Personalized watchlists to keep track of what you want to watch</li>
                        <li>Smart search with genre filtering and recommendations</li>
                        <li>Beautiful, responsive design that works on any device</li>
                    </ul>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">Data Attribution</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        This product uses the TMDB API but is not endorsed or certified by{' '}
                        <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            TMDB
                        </a>
                        . All movie data, images, and related content are provided by The Movie Database (TMDB)
                        and are the property of their respective owners.
                    </p>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">Get in Touch</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Have questions, suggestions, or feedback? We&apos;d love to hear from you! Reach out to us
                        at{' '}
                        <a href="mailto:hello@optix.com" className="text-primary hover:underline">
                            hello@optix.com
                        </a>{' '}
                        or visit our{' '}
                        <Link href="/contact" className="text-primary hover:underline">
                            Contact page
                        </Link>
                        .
                    </p>
                </section>
            </div>
        </div>
    );
}

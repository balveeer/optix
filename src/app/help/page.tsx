import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, Search, BookmarkPlus, User, Film } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Help Center',
    description: 'Find answers to common questions about using Optix.',
};

const helpTopics = [
    {
        icon: Search,
        title: 'Searching for Movies',
        description: 'Use the search bar to find any movie or series by title. You can also browse by genre using the genre cards on the homepage.',
    },
    {
        icon: BookmarkPlus,
        title: 'Managing Your Watchlist',
        description: 'Sign in to save movies to your watchlist. Click the bookmark icon on any movie card or detail page to add or remove it from your list.',
    },
    {
        icon: User,
        title: 'Account & Profile',
        description: 'Sign in with Google to create your account. Your profile stores your watchlist and preferences, accessible from the Profile tab.',
    },
    {
        icon: Film,
        title: 'Movie Information',
        description: 'Click on any movie to view detailed information including cast, crew, ratings, trailers, and similar recommendations.',
    },
];

export default function HelpPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Header */}
            <div className="mb-10">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center">
                        <HelpCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold gradient-text">Help Center</h1>
                        <p className="text-sm text-muted-foreground">Find answers to common questions</p>
                    </div>
                </div>
            </div>

            {/* Help Topics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {helpTopics.map((topic) => {
                    const Icon = topic.icon;
                    return (
                        <div
                            key={topic.title}
                            className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                        >
                            <Icon className="w-8 h-8 text-primary mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">{topic.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{topic.description}</p>
                        </div>
                    );
                })}
            </div>

            {/* Still need help */}
            <div className="p-8 rounded-xl bg-card border border-border text-center">
                <h2 className="text-xl font-semibold text-foreground mb-3">Still need help?</h2>
                <p className="text-muted-foreground mb-6">
                    Can&apos;t find what you&apos;re looking for? Our team is here to help.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium gradient-purple rounded-lg hover:opacity-90 transition-opacity text-white"
                >
                    Contact Support
                </Link>
            </div>
        </div>
    );
}

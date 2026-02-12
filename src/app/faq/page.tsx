'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, MessageCircleQuestion } from 'lucide-react';

const faqs = [
    {
        question: 'Is Optix free to use?',
        answer: 'Yes! Optix is completely free to use. You can browse movies, manage your watchlist, and explore trending content without paying anything.',
    },
    {
        question: 'Do I need an account to use Optix?',
        answer: 'You can browse movies without an account, but signing in with Google allows you to save movies to your watchlist and sync it across devices.',
    },
    {
        question: 'Where does the movie data come from?',
        answer: 'All movie and series data is sourced from The Movie Database (TMDB), a community-built movie and TV database. We use the TMDB API to provide up-to-date information.',
    },
    {
        question: 'Can I watch movies on Optix?',
        answer: 'Optix is a movie discovery and tracking platform, not a streaming service. We help you find great content and keep track of what you want to watch, but actual viewing happens on your preferred streaming platform.',
    },
    {
        question: 'How do I add movies to my watchlist?',
        answer: 'Simply sign in and click the bookmark icon on any movie card or movie detail page. The movie will be saved to your watchlist, which you can access from your Profile.',
    },
    {
        question: 'Can I filter my watchlist by genre?',
        answer: 'Yes! Your watchlist supports genre filtering. Use the genre capsules at the top of your watchlist to filter movies by their genre.',
    },
    {
        question: 'How often is the movie data updated?',
        answer: 'Movie data is refreshed every hour to ensure you always have access to the latest trending movies, ratings, and newly released content.',
    },
    {
        question: 'Is my data secure?',
        answer: 'Absolutely. We use Firebase Authentication for secure sign-in, and we never share your personal information with third parties. Please review our Privacy Policy for more details.',
    },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-border rounded-xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left bg-card hover:bg-surface-hover transition-colors"
            >
                <span className="text-sm font-medium text-foreground pr-4">{question}</span>
                <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
            >
                <div className="p-5 pt-0 bg-card">
                    <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
                </div>
            </div>
        </div>
    );
}

export default function FAQPage() {
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
                        <MessageCircleQuestion className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold gradient-text">Frequently Asked Questions</h1>
                        <p className="text-sm text-muted-foreground">Quick answers to common questions</p>
                    </div>
                </div>
            </div>

            {/* FAQ Items */}
            <div className="space-y-3 mb-12">
                {faqs.map((faq) => (
                    <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                ))}
            </div>

            {/* Still have questions */}
            <div className="p-8 rounded-xl bg-card border border-border text-center">
                <h2 className="text-xl font-semibold text-foreground mb-3">Still have questions?</h2>
                <p className="text-muted-foreground mb-6">
                    If you couldn&apos;t find the answer you were looking for, feel free to contact us.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium gradient-purple rounded-lg hover:opacity-90 transition-opacity text-white"
                >
                    Contact Us
                </Link>
            </div>
        </div>
    );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Star } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Feedback',
    description: 'Share your feedback to help us improve Optix.',
};

export default function FeedbackPage() {
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
                        <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold gradient-text">Feedback</h1>
                        <p className="text-sm text-muted-foreground">Help us make Optix better</p>
                    </div>
                </div>
            </div>

            {/* Feedback Form */}
            <div className="p-8 rounded-xl bg-card border border-border">
                <form className="space-y-6">
                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                            How would you rate your experience?
                        </label>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="p-1 text-muted-foreground hover:text-yellow-400 transition-colors"
                                >
                                    <Star className="w-8 h-8" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-lg text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                        >
                            <option value="">Select a category</option>
                            <option value="feature">Feature Request</option>
                            <option value="bug">Bug Report</option>
                            <option value="ui">UI/Design</option>
                            <option value="performance">Performance</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="feedback" className="block text-sm font-medium text-foreground mb-2">
                            Your Feedback
                        </label>
                        <textarea
                            id="feedback"
                            rows={6}
                            placeholder="Tell us what you think, what you'd like to see, or what we can improve..."
                            className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium gradient-purple rounded-lg hover:opacity-90 transition-opacity text-white"
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
}

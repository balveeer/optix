import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Clock, Send } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with the Optix team for questions, feedback, or support.',
};

const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@optix.com', href: 'mailto:hello@optix.com' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: null },
    { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: null },
];

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Header */}
            <div className="mb-10">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
                <h1 className="text-4xl font-bold gradient-text mb-4">Contact Us</h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    Have a question or feedback? We&apos;d love to hear from you. Fill out the form below or
                    reach out through any of our contact channels.
                </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {contactInfo.map((info) => {
                    const Icon = info.icon;
                    return (
                        <div
                            key={info.label}
                            className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                        >
                            <Icon className="w-6 h-6 text-primary mb-3" />
                            <h3 className="text-sm font-semibold text-foreground mb-1">{info.label}</h3>
                            {info.href ? (
                                <a href={info.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {info.value}
                                </a>
                            ) : (
                                <p className="text-sm text-muted-foreground">{info.value}</p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Contact Form */}
            <div className="p-8 rounded-xl bg-card border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-6">Send us a message</h2>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your name"
                                className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="your@email.com"
                                className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            placeholder="What is this about?"
                            className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={5}
                            placeholder="Tell us what's on your mind..."
                            className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium gradient-purple rounded-lg hover:opacity-90 transition-opacity text-white"
                    >
                        <Send className="w-4 h-4" />
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}

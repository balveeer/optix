import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Briefcase, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Careers',
    description: 'Join the Optix team and help build the future of movie discovery.',
};

const openings = [
    {
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
    },
    {
        title: 'UI/UX Designer',
        department: 'Design',
        location: 'San Francisco, CA',
        type: 'Full-time',
    },
    {
        title: 'Backend Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
    },
    {
        title: 'Content Curator',
        department: 'Content',
        location: 'Remote',
        type: 'Part-time',
    },
];

export default function CareersPage() {
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
                        <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold gradient-text">Careers at Optix</h1>
                        <p className="text-sm text-muted-foreground">Join us in building the future of movie discovery</p>
                    </div>
                </div>
            </div>

            {/* Why Join Us */}
            <div className="p-8 rounded-xl bg-card border border-border mb-10">
                <h2 className="text-xl font-semibold text-foreground mb-4">Why Join Optix?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                    At Optix, we&apos;re passionate about movies and technology. We&apos;re building a platform that
                    millions of cinephiles love, and we&apos;re looking for talented people who share our enthusiasm.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h4 className="text-sm font-semibold text-foreground mb-1">🌍 Remote-First</h4>
                        <p className="text-xs text-muted-foreground">Work from anywhere in the world</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h4 className="text-sm font-semibold text-foreground mb-1">📈 Growth</h4>
                        <p className="text-xs text-muted-foreground">Learning budget & career development</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h4 className="text-sm font-semibold text-foreground mb-1">🎬 Perks</h4>
                        <p className="text-xs text-muted-foreground">Free streaming subscriptions & more</p>
                    </div>
                </div>
            </div>

            {/* Open Positions */}
            <h2 className="text-xl font-semibold text-foreground mb-6">Open Positions</h2>
            <div className="space-y-4 mb-12">
                {openings.map((job) => (
                    <div
                        key={job.title}
                        className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group cursor-pointer"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div>
                                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {job.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">{job.department}</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {job.type}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* No fit? */}
            <div className="p-8 rounded-xl bg-card border border-border text-center">
                <h2 className="text-xl font-semibold text-foreground mb-3">Don&apos;t see the right role?</h2>
                <p className="text-muted-foreground mb-6">
                    We&apos;re always looking for talented people. Send us your resume and we&apos;ll keep you in mind.
                </p>
                <a
                    href="mailto:careers@optix.com"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium gradient-purple rounded-lg hover:opacity-90 transition-opacity text-white"
                >
                    Send Your Resume
                </a>
            </div>
        </div>
    );
}

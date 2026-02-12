import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Read the terms and conditions for using the Optix platform.',
};

export default function TermsPage() {
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
                        <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold gradient-text">Terms of Service</h1>
                        <p className="text-sm text-muted-foreground">Last updated: February 10, 2026</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none space-y-8">
                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        By accessing and using Optix, you accept and agree to be bound by the terms and provisions
                        of this agreement. If you do not agree to abide by these terms, please do not use this service.
                    </p>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">2. Use of Service</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        You agree to use the service only for lawful purposes and in accordance with these Terms. You agree not to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Use the service in any way that violates any applicable law or regulation</li>
                        <li>Attempt to gain unauthorized access to any part of the service</li>
                        <li>Use the service to transmit any harmful or malicious content</li>
                        <li>Interfere with or disrupt the integrity or performance of the service</li>
                        <li>Attempt to reverse-engineer any aspect of the service</li>
                    </ul>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">3. User Accounts</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        When you create an account with us, you must provide accurate, complete, and current
                        information at all times. You are responsible for safeguarding the password that you use
                        to access the service and for any activities or actions under your password.
                    </p>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">4. Content</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Our service allows you to browse movie and series information sourced from third-party databases.
                        All movie data, images, and related content are the property of their respective owners.
                        Optix does not claim ownership of any third-party content displayed on the platform.
                    </p>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">5. Intellectual Property</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The service and its original content (excluding content provided by users and third parties),
                        features, and functionality are and will remain the exclusive property of Optix. The service
                        is protected by copyright, trademark, and other laws.
                    </p>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">6. Termination</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We may terminate or suspend your account immediately, without prior notice or liability,
                        for any reason whatsoever, including without limitation if you breach the Terms.
                        Upon termination, your right to use the service will immediately cease.
                    </p>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        In no event shall Optix, nor its directors, employees, partners, agents, suppliers, or
                        affiliates, be liable for any indirect, incidental, special, consequential, or punitive
                        damages, including without limitation, loss of profits, data, use, or goodwill.
                    </p>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">8. Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions about these Terms, please contact us at{' '}
                        <a href="mailto:legal@optix.com" className="text-primary hover:underline">
                            legal@optix.com
                        </a>
                        .
                    </p>
                </section>
            </div>
        </div>
    );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Learn how Optix collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
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
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold gradient-text">Privacy Policy</h1>
                        <p className="text-sm text-muted-foreground">Last updated: February 10, 2026</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none space-y-8">
                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We collect information you provide directly to us, such as when you create an account,
                        update your profile, use interactive features, or contact us. This may include your name,
                        email address, profile picture, and watchlist preferences.
                    </p>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Personalize your experience with tailored recommendations</li>
                        <li>Send you updates, newsletters, and marketing communications</li>
                        <li>Monitor and analyze trends, usage, and activities</li>
                        <li>Detect, investigate, and prevent security incidents</li>
                    </ul>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">3. Information Sharing</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We do not sell, trade, or otherwise transfer your personally identifiable information to
                        outside parties. This does not include trusted third parties who assist us in operating our
                        website, conducting our business, or serving our users, so long as those parties agree to
                        keep this information confidential.
                    </p>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Security</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We implement a variety of security measures to maintain the safety of your personal
                        information. Your personal information is contained behind secured networks and is only
                        accessible by a limited number of persons who have special access rights to such systems.
                    </p>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">5. Cookies</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We use cookies to enhance your experience, gather general visitor information, and track
                        visits to our website. You can choose to disable cookies through your individual browser
                        options. Please refer to our Cookie Policy for more detailed information.
                    </p>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">6. Your Rights</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        You have the right to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Access, correct, or delete your personal data</li>
                        <li>Object to the processing of your personal data</li>
                        <li>Request a copy of your personal data</li>
                        <li>Withdraw consent at any time</li>
                    </ul>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">7. Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us at{' '}
                        <a href="mailto:privacy@optix.com" className="text-primary hover:underline">
                            privacy@optix.com
                        </a>
                        .
                    </p>
                </section>
            </div>
        </div>
    );
}

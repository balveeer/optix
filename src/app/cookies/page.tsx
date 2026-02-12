import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Cookie Policy',
    description: 'Understand how Optix uses cookies and similar technologies.',
};

export default function CookiePolicyPage() {
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
                        <Cookie className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold gradient-text">Cookie Policy</h1>
                        <p className="text-sm text-muted-foreground">Last updated: February 10, 2026</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none space-y-8">
                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">1. What Are Cookies</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Cookies are small text files that are placed on your computer or mobile device when you
                        visit a website. They are widely used to make websites work more efficiently, as well as
                        to provide information to the owners of the site.
                    </p>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Cookies</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                        We use cookies for the following purposes:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li><strong className="text-foreground">Essential cookies:</strong> Required for the operation of our website</li>
                        <li><strong className="text-foreground">Authentication cookies:</strong> To recognize you when you sign in</li>
                        <li><strong className="text-foreground">Preference cookies:</strong> To remember your settings and preferences</li>
                        <li><strong className="text-foreground">Analytics cookies:</strong> To understand how visitors interact with our website</li>
                    </ul>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">3. Types of Cookies We Use</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-muted-foreground">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 pr-4 text-foreground font-semibold">Cookie Type</th>
                                    <th className="text-left py-3 pr-4 text-foreground font-semibold">Purpose</th>
                                    <th className="text-left py-3 text-foreground font-semibold">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border/50">
                                    <td className="py-3 pr-4">Session</td>
                                    <td className="py-3 pr-4">Keep you logged in during your visit</td>
                                    <td className="py-3">Session</td>
                                </tr>
                                <tr className="border-b border-border/50">
                                    <td className="py-3 pr-4">Preferences</td>
                                    <td className="py-3 pr-4">Remember your theme and display preferences</td>
                                    <td className="py-3">1 year</td>
                                </tr>
                                <tr className="border-b border-border/50">
                                    <td className="py-3 pr-4">Analytics</td>
                                    <td className="py-3 pr-4">Understand how you interact with our site</td>
                                    <td className="py-3">2 years</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">4. Managing Cookies</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Most web browsers allow you to control cookies through their settings. You can set your
                        browser to refuse cookies or delete certain cookies. However, please note that if you
                        disable or refuse cookies, some parts of our website may become inaccessible or not
                        function properly.
                    </p>
                </section>

                <section className="p-6 rounded-xl bg-card border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-3">5. Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions about our use of cookies, please contact us at{' '}
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

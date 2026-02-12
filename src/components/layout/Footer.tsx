'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Instagram, Youtube, Mail, Heart } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

const footerLinks = {
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Careers', href: '/careers' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
    ],
    support: [
        { name: 'Help Center', href: '/help' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Feedback', href: '/feedback' },
    ],
    explore: [
        { name: 'Trending', href: '/' },
        { name: 'Top Rated', href: '/' },
        { name: 'Genres', href: '/' },
    ],
};

const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-border bg-[#0a0a0d] hidden md:block">
            {/* Gradient accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="container mx-auto px-4">
                {/* Main footer content */}
                <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/images/optixlogot.png"
                                alt={APP_NAME}
                                width={100}
                                height={33}
                                className="opacity-80 hover:opacity-100 transition-opacity"
                            />
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            Your ultimate destination for discovering, tracking, and exploring movies & series.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Explore Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                            Explore
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.explore.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter / CTA Section */}
                <div className="py-8 border-t border-white/5">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-4 h-4 text-primary" />
                            <span>Stay updated with the latest movies and features</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all w-64"
                            />
                            <button className="px-5 py-2 text-sm font-medium gradient-purple rounded-lg hover:opacity-90 transition-opacity text-white">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-white/5">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <span>© {currentYear} {APP_NAME}. All rights reserved.</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>Made with</span>
                            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                            <span>by Optix Team</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                            <Link href="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

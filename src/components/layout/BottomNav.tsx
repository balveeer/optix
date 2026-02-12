'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, User, Tv } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
    { href: '/', icon: Home, label: 'Home' },

    { href: '/search', icon: Search, label: 'Search' },
    { href: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-border">
            <div className="flex items-center justify-around h-16 px-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex flex-col items-center gap-1 py-2 px-4"
                        >
                            <div className="relative">
                                <Icon
                                    className={`w-6 h-6 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'
                                        }`}
                                />
                                {isActive && (
                                    <motion.div
                                        layoutId="bottomNavIndicator"
                                        className="absolute -inset-2 bg-primary/20 rounded-xl -z-10"
                                        initial={false}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 500,
                                            damping: 30,
                                        }}
                                    />
                                )}
                            </div>
                            <span
                                className={`text-xs font-medium transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

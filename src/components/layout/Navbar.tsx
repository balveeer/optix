'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/store/authStore';
import { logOut } from '@/services/firebase';

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const { user } = useAuthStore();

    const handleLogout = async () => {
        await logOut();
        router.push('/');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    {/* Mobile Logo (square) */}
                    <Image
                        src="/images/optixlogomobilet.png"
                        alt="Optix"
                        width={40}
                        height={40}
                        className="hidden"
                        priority
                    />
                    {/* Desktop Logo (3:1 ratio) */}
                    <Image
                        src="/images/optixlogot.png"
                        alt="Optix"
                        width={120}
                        height={40}
                        className="block"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="/"
                        className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/' ? 'text-primary' : 'text-muted-foreground'
                            }`}
                    >
                        Movies
                    </Link>
                    <Link
                        href="/?type=tv"
                        className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/' && type === 'tv' ? 'text-primary' : 'text-muted-foreground'
                            }`}
                    >
                        Series
                    </Link>
                    <Link
                        href="/search"
                        className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/search' ? 'text-primary' : 'text-muted-foreground'
                            }`}
                    >
                        Search
                    </Link>
                    <Link
                        href="/profile"
                        className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'
                            }`}
                    >
                        Watchlist
                    </Link>
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3">
                    {/* Search Button (Mobile) */}


                    {/* User Menu */}
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10 border-2 border-primary">
                                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                                        <AvatarFallback className="bg-primary/20 text-primary">
                                            {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <div className="flex items-center gap-2 p-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.photoURL || undefined} />
                                        <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{user.displayName || 'User'}</span>
                                        <span className="text-xs text-muted-foreground">{user.email}</span>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile">My Watchlist</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="text-destructive focus:text-destructive cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/auth/login">
                            <Button className="gradient-purple hover:opacity-90 transition-opacity">
                                Sign In
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

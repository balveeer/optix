'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SEARCH_DEBOUNCE_MS } from '@/lib/constants';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    initialValue?: string;
    autoFocus?: boolean;
}

export function SearchBar({
    onSearch,
    placeholder = 'Search movies...',
    initialValue = '',
    autoFocus = false
}: SearchBarProps) {
    const [query, setQuery] = useState(initialValue);
    const [debouncedQuery, setDebouncedQuery] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus on mount if autoFocus is true
    useEffect(() => {
        if (autoFocus && inputRef.current) {
            // Small delay to ensure the component is fully mounted
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [autoFocus]);

    // Debounce the search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, SEARCH_DEBOUNCE_MS);

        return () => clearTimeout(timer);
    }, [query]);

    // Call onSearch when debounced query changes
    useEffect(() => {
        onSearch(debouncedQuery);
    }, [debouncedQuery, onSearch]);

    const handleClear = () => {
        setQuery('');
        setDebouncedQuery('');
        // Refocus after clearing
        inputRef.current?.focus();
    };

    return (
        <div className="relative max-w-2xl mx-auto">
            {/* Search Icon - hidden on mobile */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hidden sm:block">
                <Search className="w-5 h-5" />
            </div>

            {/* Input - less padding on mobile since no icon */}
            <Input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="pl-4 sm:pl-12 pr-12 py-6 text-lg bg-surface border-border focus:border-primary focus:ring-primary rounded-xl"
            />

            {/* Clear Button */}
            {query && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClear}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-primary/20 hover:text-primary"
                >
                    <X className="w-4 h-4" />
                </Button>
            )}
        </div>
    );
}

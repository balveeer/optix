'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { onAuthChange } from '@/services/firebase';
import { toAuthUser } from '@/types/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { setUser, setLoading } = useAuthStore();

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthChange((user) => {
            if (user) {
                setUser(toAuthUser(user));
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        // Cleanup on unmount
        return () => unsubscribe();
    }, [setUser, setLoading]);

    return <>{children}</>;
}

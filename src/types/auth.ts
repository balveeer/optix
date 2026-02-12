import { User } from 'firebase/auth';

export interface AuthUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
}

export interface AuthState {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    displayName: string;
}

// Helper to convert Firebase User to AuthUser
export function toAuthUser(user: User): AuthUser {
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
    };
}

import { initializeApp, getApps } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    type User
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (prevent multiple initializations)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Auth functions
export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return { user: result.user, error: null };
    } catch (error) {
        console.error('Google sign-in error:', error);
        return { user: null, error: (error as Error).message };
    }
}

export async function signInWithEmail(email: string, password: string) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return { user: result.user, error: null };
    } catch (error) {
        console.error('Email sign-in error:', error);
        return { user: null, error: getAuthErrorMessage((error as { code: string }).code) };
    }
}

export async function signUpWithEmail(email: string, password: string, displayName: string) {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);

        // Update display name
        await updateProfile(result.user, { displayName });

        // Create user document in Firestore with timeout
        try {
            const createDocPromise = setDoc(doc(db, 'users', result.user.uid), {
                email,
                displayName,
                createdAt: new Date().toISOString(),
                watchlist: [],
            });

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Firestore creation timed out')), 5000)
            );

            await Promise.race([createDocPromise, timeoutPromise]);
        } catch (dbError) {
            console.warn('Firestore profile creation failed or timed out:', dbError);
            // Continue execution. User is created in Auth, even if Firestore fails.
        }

        return { user: result.user, error: null };
    } catch (error) {
        console.error('Email sign-up error:', error);
        return { user: null, error: getAuthErrorMessage((error as { code: string }).code) };
    }
}

export async function logOut() {
    try {
        await signOut(auth);
        return { error: null };
    } catch (error) {
        console.error('Sign-out error:', error);
        return { error: (error as Error).message };
    }
}

// Auth state observer
export function onAuthChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}

// Firestore functions for watchlist sync
export async function syncWatchlistToFirestore(userId: string, watchlist: unknown[]) {
    try {
        await setDoc(doc(db, 'users', userId), { watchlist }, { merge: true });
        return { error: null };
    } catch (error) {
        console.error('Sync watchlist error:', error);
        return { error: (error as Error).message };
    }
}

export async function getWatchlistFromFirestore(userId: string) {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { watchlist: docSnap.data().watchlist || [], error: null };
        }
        return { watchlist: [], error: null };
    } catch (error) {
        console.error('Get watchlist error:', error);
        return { watchlist: [], error: (error as Error).message };
    }
}

// Helper to get user-friendly error messages
function getAuthErrorMessage(errorCode: string): string {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email is already registered. Try signing in instead.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/operation-not-allowed':
            return 'This sign-in method is not enabled.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters.';
        case 'auth/user-disabled':
            return 'This account has been disabled.';
        case 'auth/user-not-found':
            return 'No account found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/invalid-credential':
            return 'Invalid email or password. Please try again.';
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later.';
        case 'auth/popup-closed-by-user':
            return 'Sign-in was cancelled.';
        default:
            return 'An error occurred. Please try again.';
    }
}

export default app;

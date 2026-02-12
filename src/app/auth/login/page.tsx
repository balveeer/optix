import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import LoginForm from './login-form';

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-[calc(100vh-8rem)] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
            <LoginForm />
        </Suspense>
    );
}

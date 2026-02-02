import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SignUpForm from '@/components/auth/SignUpForm';
import SignInForm from '@/components/auth/SignInForm';
import { AuthMode } from '@/types';

const Auth = () => {
    const [mode, setMode] = useState<AuthMode>('signup');

    return (
        <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-xl">E</span>
                        </div>
                        <span className="font-display text-2xl font-semibold text-foreground">
                            EventFlow
                        </span>
                    </div>
                    <p className="text-muted-foreground">
                        {mode === 'signup'
                            ? 'Create your account to get started'
                            : 'Welcome back! Sign in to continue'}
                    </p>
                </div>

                {/* Card */}
                <div className="card-elevated p-6 sm:p-8 border border-border/50">
                    {/* Toggle Tabs */}
                    <div className="flex gap-2 p-1 bg-muted rounded-lg mb-6">
                        <button
                            onClick={() => setMode('signup')}
                            className={`flex-1 py-2.5 rounded-md font-medium text-sm transition-all ${mode === 'signup'
                                    ? 'bg-card text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => setMode('signin')}
                            className={`flex-1 py-2.5 rounded-md font-medium text-sm transition-all ${mode === 'signin'
                                    ? 'bg-card text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Forms */}
                    <AnimatePresence mode="wait">
                        {mode === 'signup' ? (
                            <SignUpForm key="signup" />
                        ) : (
                            <SignInForm key="signin" />
                        )}
                    </AnimatePresence>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        {mode === 'signup' ? (
                            <p>
                                Already have an account?{' '}
                                <button
                                    onClick={() => setMode('signin')}
                                    className="text-accent hover:underline font-medium"
                                >
                                    Sign in
                                </button>
                            </p>
                        ) : (
                            <p>
                                Don't have an account?{' '}
                                <button
                                    onClick={() => setMode('signup')}
                                    className="text-accent hover:underline font-medium"
                                >
                                    Sign up
                                </button>
                            </p>
                        )}
                    </div>
                </div>

                {/* Trust Message */}
                <p className="text-center text-xs text-muted-foreground mt-6">
                    By continuing, you agree to EventFlow's Terms of Service and Privacy Policy
                </p>
            </motion.div>
        </div>
    );
};

export default Auth;

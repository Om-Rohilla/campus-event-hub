import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockSignIn } from '@/lib/authUtils';
import { SignInData } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuthModal } from '@/contexts/AuthModalContext';

const SignInForm = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { closeAuth } = useAuthModal();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<SignInData>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Partial<SignInData>>({});

    const validate = (): boolean => {
        const newErrors: Partial<SignInData> = {};

        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            const result = mockSignIn(formData);

            if (result.success && result.user) {
                toast({
                    title: 'Welcome back!',
                    description: 'Redirecting to your dashboard...',
                    duration: 3000,
                });

                // Navigate based on role
                const dashboardPath = result.user.role === 'student'
                    ? '/dashboard/student'
                    : '/dashboard/organizer';

                closeAuth();
                navigate(dashboardPath);
            } else {
                toast({
                    title: 'Error',
                    description: result.message,
                    variant: 'destructive',
                    duration: 3000,
                });
            }

            setLoading(false);
        }, 800);
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-card text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                        placeholder="you@college.edu"
                    />
                </div>
                {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-card text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                        placeholder="••••••••"
                    />
                </div>
                {errors.password && (
                    <p className="text-sm text-destructive mt-1">{errors.password}</p>
                )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
                <button
                    type="button"
                    className="text-sm text-accent hover:underline"
                >
                    Forgot password?
                </button>
            </div>

            {/* Demo Credentials Info */}
            <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
                <p className="text-xs font-medium text-foreground mb-1">Quick Dev Access:</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                    <p>Student: <span className="font-mono text-foreground">student@gmail.com</span> / <span className="font-mono text-foreground">student</span></p>
                    <p>Organizer: <span className="font-mono text-foreground">organizer@gmail.com</span> / <span className="font-mono text-foreground">organizer</span></p>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Signing In...
                    </>
                ) : (
                    <>
                        Sign In
                        <ArrowRight className="w-5 h-5" />
                    </>
                )}
            </button>
        </motion.form>
    );
};

export default SignInForm;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { mockSignUp } from '@/lib/authUtils';
import { SignUpData } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuthModal } from '@/contexts/AuthModalContext';

const SignUpForm = () => {
    const { setStep } = useAuthModal();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<SignUpData>({
        email: '',
        phone: '',
        password: '',
    });

    const [errors, setErrors] = useState<Partial<SignUpData>>({});

    const validate = (): boolean => {
        const newErrors: Partial<SignUpData> = {};

        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }

        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Valid 10-digit phone number required';
        }

        if (!formData.password || formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
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
            const result = mockSignUp(formData);

            if (result.success) {
                toast({
                    title: 'OTP Sent',
                    description: 'Check your email for the verification code',
                    duration: 3000,
                });
                setStep('otp');
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

            {/* Phone */}
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                </label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        maxLength={10}
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-card text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                        placeholder="9876543210"
                    />
                </div>
                {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone}</p>
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

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Account...
                    </>
                ) : (
                    <>
                        Continue
                        <ArrowRight className="w-5 h-5" />
                    </>
                )}
            </button>
        </motion.form>
    );
};

export default SignUpForm;

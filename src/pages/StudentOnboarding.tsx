import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, CreditCard, ArrowRight, Loader2 } from 'lucide-react';
import { completeSignUp } from '@/lib/authUtils';
import { StudentOnboardingData } from '@/types';
import { useToast } from '@/hooks/use-toast';

const StudentOnboarding = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<StudentOnboardingData>({
        name: '',
        collegeId: '',
    });

    const [errors, setErrors] = useState<Partial<StudentOnboardingData>>({});

    const validate = (): boolean => {
        const newErrors: Partial<StudentOnboardingData> = {};

        if (!formData.name || formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        setTimeout(() => {
            try {
                completeSignUp('student', formData);

                toast({
                    title: 'Welcome to EventFlow!',
                    description: 'Your account has been created successfully',
                });

                navigate('/dashboard/student');
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to create account. Please try again.',
                    variant: 'destructive',
                });
            }

            setLoading(false);
        }, 800);
    };

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
                    <h1 className="font-display text-2xl font-semibold text-foreground mb-2">
                        Complete Your Profile
                    </h1>
                    <p className="text-muted-foreground">
                        Tell us a bit about yourself
                    </p>
                </div>

                {/* Card */}
                <div className="card-elevated p-6 sm:p-8 border border-border/50">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Full Name <span className="text-destructive">*</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-card text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-sm text-destructive mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* College ID (Optional) */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                College ID <span className="text-muted-foreground text-xs">(Optional)</span>
                            </label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={formData.collegeId}
                                    onChange={(e) => setFormData({ ...formData, collegeId: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-card text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                                    placeholder="IILM2024001"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Continue to Dashboard
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default StudentOnboarding;

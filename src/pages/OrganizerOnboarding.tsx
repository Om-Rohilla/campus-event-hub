import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Building2, ArrowRight, Loader2 } from 'lucide-react';
import { completeSignUp } from '@/lib/authUtils';
import { OrganizerOnboardingData } from '@/types';
import { useToast } from '@/hooks/use-toast';

const OrganizerOnboarding = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<OrganizerOnboardingData>({
        name: '',
        organizerRole: 'teacher',
        department: '',
    });

    const [errors, setErrors] = useState<Partial<OrganizerOnboardingData>>({});

    const validate = (): boolean => {
        const newErrors: Partial<OrganizerOnboardingData> = {};

        if (!formData.name || formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.department || formData.department.length < 2) {
            newErrors.department = 'Department/Club name is required';
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
                completeSignUp('organizer', formData);

                toast({
                    title: 'Welcome to EventFlow!',
                    description: 'Your organizer account has been created',
                });

                navigate('/dashboard/organizer');
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
                        Set up your organizer account
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
                                    placeholder="Dr. Jane Smith"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-sm text-destructive mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Your Role <span className="text-destructive">*</span>
                            </label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <select
                                    value={formData.organizerRole}
                                    onChange={(e) => setFormData({ ...formData, organizerRole: e.target.value as 'teacher' | 'club_lead' })}
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-card text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="teacher">Teacher / Faculty</option>
                                    <option value="club_lead">Club Lead / Student Coordinator</option>
                                </select>
                            </div>
                        </div>

                        {/* Department/Club */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Department or Club Name <span className="text-destructive">*</span>
                            </label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-card text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                                    placeholder="Computer Science Department"
                                />
                            </div>
                            {errors.department && (
                                <p className="text-sm text-destructive mt-1">{errors.department}</p>
                            )}
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

export default OrganizerOnboarding;

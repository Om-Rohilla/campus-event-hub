import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users } from 'lucide-react';
import { UserRole } from '@/types';

const RoleSelection = () => {
    const navigate = useNavigate();

    const handleRoleSelect = (role: UserRole) => {
        sessionStorage.setItem('selected_role', role);

        if (role === 'student') {
            navigate('/onboarding/student');
        } else {
            navigate('/onboarding/organizer');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl"
            >
                {/* Logo */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-xl">E</span>
                        </div>
                        <span className="font-display text-2xl font-semibold text-foreground">
                            EventFlow
                        </span>
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-3">
                        How will you use EventFlow?
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Choose your role to personalize your experience
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Student Card */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        onClick={() => handleRoleSelect('student')}
                        className="group card-elevated p-8 border-2 border-border/50 hover:border-accent transition-all text-left"
                    >
                        <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <GraduationCap className="w-8 h-8 text-accent" />
                        </div>

                        <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                            Student
                        </h2>

                        <p className="text-muted-foreground mb-6">
                            Discover and register for campus events, track your attendance, and stay connected with campus activities.
                        </p>

                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                Browse upcoming events
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                Quick QR-based registration
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                Track your event history
                            </li>
                        </ul>
                    </motion.button>

                    {/* Organizer Card */}
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        onClick={() => handleRoleSelect('organizer')}
                        className="group card-elevated p-8 border-2 border-border/50 hover:border-primary transition-all text-left"
                    >
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Users className="w-8 h-8 text-primary" />
                        </div>

                        <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                            Organizer
                        </h2>

                        <p className="text-muted-foreground mb-6">
                            Create and manage campus events, track registrations, and automate attendance with QR codes.
                        </p>

                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Create events in minutes
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Real-time attendance tracking
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Analytics and insights
                            </li>
                        </ul>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default RoleSelection;

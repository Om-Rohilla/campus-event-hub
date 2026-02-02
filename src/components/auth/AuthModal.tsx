import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import { useAuthModal } from '@/contexts/AuthModalContext';
import SignUpForm from '@/components/auth/SignUpForm';
import SignInForm from '@/components/auth/SignInForm';
import OTPInput from '@/components/auth/OTPInput';
import { useState } from 'react';
import { AuthMode } from '@/types';
import { validateOTP } from '@/lib/authUtils';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Users, User, CreditCard, Briefcase, Building2, ArrowRight, Loader2, Mail } from 'lucide-react';
import { UserRole, StudentOnboardingData, OrganizerOnboardingData } from '@/types';
import { completeSignUp } from '@/lib/authUtils';
import { useNavigate } from 'react-router-dom';

const AuthModal = () => {
    const { isOpen, currentStep, closeAuth, setStep } = useAuthModal();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [authMode, setAuthMode] = useState<AuthMode>('signup');
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [loading, setLoading] = useState(false);
    const [studentData, setStudentData] = useState<StudentOnboardingData>({ name: '', collegeId: '' });
    const [organizerData, setOrganizerData] = useState<OrganizerOnboardingData>({
        name: '',
        organizerRole: 'teacher',
        department: ''
    });
    const [errors, setErrors] = useState<any>({});

    const handleOTPVerify = () => {
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            toast({ title: 'Invalid OTP', description: 'Please enter all 6 digits', variant: 'destructive', duration: 3000 });
            return;
        }
        setLoading(true);
        setTimeout(() => {
            if (validateOTP(otpString)) {
                toast({ title: 'Verification Successful', description: 'Your email has been verified', duration: 3000 });
                setStep('role');
            } else {
                toast({ title: 'Invalid OTP', description: 'Please check the code and try again', variant: 'destructive', duration: 3000 });
                setOtp(Array(6).fill(''));
            }
            setLoading(false);
        }, 1000);
    };

    const handleRoleSelect = (role: UserRole) => {
        sessionStorage.setItem('selected_role', role);
        setStep(role === 'student' ? 'student-onboarding' : 'organizer-onboarding');
    };

    const handleStudentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!studentData.name || studentData.name.length < 2) {
            setErrors({ name: 'Name must be at least 2 characters' });
            return;
        }
        setLoading(true);
        setTimeout(() => {
            try {
                completeSignUp('student', studentData);
                toast({ title: 'Welcome to EventFlow!', description: 'Your account has been created successfully', duration: 3000 });
                closeAuth();
                navigate('/dashboard/student');
            } catch (error) {
                toast({ title: 'Error', description: 'Failed to create account', variant: 'destructive', duration: 3000 });
            }
            setLoading(false);
        }, 800);
    };

    const handleOrganizerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: any = {};
        if (!organizerData.name || organizerData.name.length < 2) newErrors.name = 'Name required';
        if (!organizerData.department || organizerData.department.length < 2) newErrors.department = 'Department required';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);
        setTimeout(() => {
            try {
                completeSignUp('organizer', organizerData);
                toast({ title: 'Welcome to EventFlow!', description: 'Your organizer account has been created', duration: 3000 });
                closeAuth();
                navigate('/dashboard/organizer');
            } catch (error) {
                toast({ title: 'Error', description: 'Failed to create account', variant: 'destructive', duration: 3000 });
            }
            setLoading(false);
        }, 800);
    };

    const renderContent = () => {
        switch (currentStep) {
            case 'auth':
                return (
                    <div className="w-full max-w-md mx-auto">
                        <div className="text-center mb-4">
                            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                                {authMode === 'signup' ? 'Create your account' : 'Welcome back!'}
                            </h2>
                            <p className="text-muted-foreground">
                                {authMode === 'signup' ? 'Get started with EventFlow' : 'Sign in to continue'}
                            </p>
                        </div>
                        <div className="flex gap-2 p-1 bg-muted rounded-lg mb-4">
                            <button onClick={() => setAuthMode('signup')} className={`flex-1 py-2.5 rounded-md font-medium text-sm transition-all ${authMode === 'signup' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}>
                                Sign Up
                            </button>
                            <button onClick={() => setAuthMode('signin')} className={`flex-1 py-2.5 rounded-md font-medium text-sm transition-all ${authMode === 'signin' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}>
                                Sign In
                            </button>
                        </div>
                        <AnimatePresence mode="wait">
                            {authMode === 'signup' ? <SignUpForm key="signup" /> : <SignInForm key="signin" />}
                        </AnimatePresence>
                    </div>
                );

            case 'otp':
                return (
                    <div className="w-full max-w-md mx-auto">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                                <Mail className="w-8 h-8 text-accent" />
                            </div>
                        </div>
                        <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-2">Verify Your Email</h2>
                        <p className="text-muted-foreground text-center mb-6">Enter the 6-digit code sent to your email</p>
                        <div className="mb-4"><OTPInput value={otp} onChange={setOtp} /></div>
                        <button onClick={handleOTPVerify} disabled={loading || otp.join('').length !== 6} className="w-full btn-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4">
                            {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Verifying...</> : <>Verify Email<ArrowRight className="w-5 h-5" /></>}
                        </button>
                        <p className="text-center text-xs text-muted-foreground">For demo: any 6-digit code works</p>
                    </div>
                );

            case 'role':
                return (
                    <div className="w-full max-w-3xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="font-display text-3xl font-semibold text-foreground mb-3">How will you use EventFlow?</h2>
                            <p className="text-muted-foreground text-lg">Choose your role to personalize your experience</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => handleRoleSelect('student')} className="group card-elevated p-6 border-2 border-border/50 hover:border-accent transition-all text-left">
                                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <GraduationCap className="w-7 h-7 text-accent" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-foreground mb-2">Student</h3>
                                <p className="text-muted-foreground text-sm">Discover and register for campus events</p>
                            </motion.button>
                            <motion.button initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onClick={() => handleRoleSelect('organizer')} className="group card-elevated p-6 border-2 border-border/50 hover:border-primary transition-all text-left">
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Users className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-foreground mb-2">Organizer</h3>
                                <p className="text-muted-foreground text-sm">Create and manage campus events</p>
                            </motion.button>
                        </div>
                    </div>
                );

            case 'student-onboarding':
                return (
                    <div className="w-full max-w-md mx-auto">
                        <div className="text-center mb-4">
                            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">Complete Your Profile</h2>
                            <p className="text-muted-foreground">Tell us a bit about yourself</p>
                        </div>
                        <form onSubmit={handleStudentSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Full Name <span className="text-destructive">*</span></label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input type="text" value={studentData.name} onChange={(e) => setStudentData({ ...studentData, name: e.target.value })} className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-card text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all" placeholder="John Doe" />
                                </div>
                                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">College ID <span className="text-muted-foreground text-xs">(Optional)</span></label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input type="text" value={studentData.collegeId} onChange={(e) => setStudentData({ ...studentData, collegeId: e.target.value })} className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-card text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all" placeholder="IILM2024001" />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} className="w-full btn-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6">
                                {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Creating Account...</> : <>Continue to Dashboard<ArrowRight className="w-5 h-5" /></>}
                            </button>
                        </form>
                    </div>
                );

            case 'organizer-onboarding':
                return (
                    <div className="w-full max-w-md mx-auto">
                        <div className="text-center mb-4">
                            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">Complete Your Profile</h2>
                            <p className="text-muted-foreground">Set up your organizer account</p>
                        </div>
                        <form onSubmit={handleOrganizerSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Full Name <span className="text-destructive">*</span></label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input type="text" value={organizerData.name} onChange={(e) => setOrganizerData({ ...organizerData, name: e.target.value })} className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-card text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all" placeholder="Dr. Jane Smith" />
                                </div>
                                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Your Role <span className="text-destructive">*</span></label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <select value={organizerData.organizerRole} onChange={(e) => setOrganizerData({ ...organizerData, organizerRole: e.target.value as 'teacher' | 'club_lead' })} className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-card text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all appearance-none cursor-pointer">
                                        <option value="teacher">Teacher / Faculty</option>
                                        <option value="club_lead">Club Lead / Student Coordinator</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Department or Club Name <span className="text-destructive">*</span></label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input type="text" value={organizerData.department} onChange={(e) => setOrganizerData({ ...organizerData, department: e.target.value })} className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-card text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all" placeholder="Computer Science Department" />
                                </div>
                                {errors.department && <p className="text-sm text-destructive mt-1">{errors.department}</p>}
                            </div>
                            <button type="submit" disabled={loading} className="w-full btn-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6">
                                {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Creating Account...</> : <>Continue to Dashboard<ArrowRight className="w-5 h-5" /></>}
                            </button>
                        </form>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop with blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeAuth}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                            className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Back Button */}
                            <button
                                onClick={closeAuth}
                                className="absolute top-4 left-4 z-10 p-2 rounded-lg bg-muted/80 hover:bg-muted transition-colors group"
                            >
                                <ArrowLeft className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                            </button>

                            {/* Content */}
                            <div className="p-6">
                                {renderContent()}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;

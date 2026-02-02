import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import OTPInput from '@/components/auth/OTPInput';
import { validateOTP } from '@/lib/authUtils';
import { useToast } from '@/hooks/use-toast';

const OTPVerification = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [loading, setLoading] = useState(false);

    const handleVerify = () => {
        const otpString = otp.join('');

        if (otpString.length !== 6) {
            toast({
                title: 'Invalid OTP',
                description: 'Please enter all 6 digits',
                variant: 'destructive',
            });
            return;
        }

        setLoading(true);

        // Simulate API verification
        setTimeout(() => {
            if (validateOTP(otpString)) {
                toast({
                    title: 'Verification Successful',
                    description: 'Your email has been verified',
                });
                navigate('/onboarding/role');
            } else {
                toast({
                    title: 'Invalid OTP',
                    description: 'Please check the code and try again',
                    variant: 'destructive',
                });
                setOtp(Array(6).fill(''));
            }
            setLoading(false);
        }, 1000);
    };

    const handleResend = () => {
        toast({
            title: 'OTP Resent',
            description: 'A new code has been sent to your email',
        });
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
                </div>

                {/* Card */}
                <div className="card-elevated p-6 sm:p-8 border border-border/50">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                            <Mail className="w-8 h-8 text-accent" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="font-display text-2xl font-semibold text-foreground text-center mb-2">
                        Verify Your Email
                    </h1>
                    <p className="text-muted-foreground text-center mb-8">
                        Enter the 6-digit code sent to your email
                    </p>

                    {/* OTP Input */}
                    <div className="mb-6">
                        <OTPInput value={otp} onChange={setOtp} />
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}
                        disabled={loading || otp.join('').length !== 6}
                        className="w-full btn-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            <>
                                Verify Email
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    {/* Resend */}
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            Didn't receive the code?{' '}
                            <button
                                onClick={handleResend}
                                className="text-accent hover:underline font-medium"
                            >
                                Resend
                            </button>
                        </p>
                    </div>
                </div>

                {/* Help Text */}
                <p className="text-center text-xs text-muted-foreground mt-6">
                    For demo purposes, any 6-digit code will work
                </p>
            </motion.div>
        </div>
    );
};

export default OTPVerification;

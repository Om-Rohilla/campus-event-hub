import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type AuthStep = 'auth' | 'otp' | 'role' | 'student-onboarding' | 'organizer-onboarding' | null;

interface AuthModalContextType {
    isOpen: boolean;
    currentStep: AuthStep;
    openAuth: () => void;
    closeAuth: () => void;
    setStep: (step: AuthStep) => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState<AuthStep>(null);

    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const openAuth = () => {
        setCurrentStep('auth');
        setIsOpen(true);
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    };

    const closeAuth = () => {
        setIsOpen(false);
        setCurrentStep(null);
        // Restore body scroll
        document.body.style.overflow = 'unset';
    };

    const setStep = (step: AuthStep) => {
        setCurrentStep(step);
    };

    return (
        <AuthModalContext.Provider value={{ isOpen, currentStep, openAuth, closeAuth, setStep }}>
            {children}
        </AuthModalContext.Provider>
    );
};

export const useAuthModal = () => {
    const context = useContext(AuthModalContext);
    if (!context) {
        throw new Error('useAuthModal must be used within AuthModalProvider');
    }
    return context;
};

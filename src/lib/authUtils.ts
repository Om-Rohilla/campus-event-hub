import { User, SignUpData, SignInData } from '@/types';
import { findUserByEmail, saveUser, setCurrentUser } from './mockData';

// Mock OTP - in production this would be sent via email
const MOCK_OTP = '123456';

export const validateOTP = (otp: string): boolean => {
    // In production, this would verify against server-sent OTP
    return otp === MOCK_OTP || otp.length === 6; // Accept any 6-digit code for demo
};

export const mockSignUp = (data: SignUpData): { success: boolean; message: string } => {
    const existingUser = findUserByEmail(data.email);

    if (existingUser) {
        return { success: false, message: 'Email already registered' };
    }

    // Store signup data temporarily for OTP verification
    sessionStorage.setItem('pending_signup', JSON.stringify(data));

    return { success: true, message: 'OTP sent to your email' };
};

export const mockSignIn = (data: SignInData): { success: boolean; message: string; user?: User } => {
    // Demo accounts for quick development access
    if (data.email === 'student@gmail.com' && data.password === 'student') {
        const demoStudent: User = {
            id: 'demo-student',
            email: 'student@gmail.com',
            phone: '1234567890',
            role: 'student',
            name: 'Demo Student',
            collegeId: 'DEMO2024',
            createdAt: new Date().toISOString(),
        };
        setCurrentUser(demoStudent);
        return { success: true, message: 'Sign in successful', user: demoStudent };
    }

    if (data.email === 'organizer@gmail.com' && data.password === 'organizer') {
        const demoOrganizer: User = {
            id: 'demo-organizer',
            email: 'organizer@gmail.com',
            phone: '9876543210',
            role: 'organizer',
            name: 'Demo Organizer',
            organizerRole: 'teacher',
            department: 'Computer Science',
            createdAt: new Date().toISOString(),
        };
        setCurrentUser(demoOrganizer);
        return { success: true, message: 'Sign in successful', user: demoOrganizer };
    }

    // Check for existing users in localStorage
    const user = findUserByEmail(data.email);

    if (!user) {
        return { success: false, message: 'User not found' };
    }

    // In production, verify password hash
    // For demo, just check if email exists
    setCurrentUser(user);

    return { success: true, message: 'Sign in successful', user };
};

export const completeSignUp = (role: 'student' | 'organizer', additionalData: any): User => {
    const pendingSignup = sessionStorage.getItem('pending_signup');

    if (!pendingSignup) {
        throw new Error('No pending signup found');
    }

    const signupData: SignUpData = JSON.parse(pendingSignup);

    const user: User = {
        id: `user_${Date.now()}`,
        email: signupData.email,
        phone: signupData.phone,
        role,
        name: additionalData.name,
        createdAt: new Date().toISOString(),
        ...(role === 'student' && { collegeId: additionalData.collegeId }),
        ...(role === 'organizer' && {
            organizerRole: additionalData.organizerRole,
            department: additionalData.department,
        }),
    };

    saveUser(user);
    sessionStorage.removeItem('pending_signup');

    return user;
};

export const isAuthenticated = (): boolean => {
    return localStorage.getItem('eventflow_current_user') !== null;
};

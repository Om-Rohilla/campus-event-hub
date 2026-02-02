export interface User {
    id: string;
    email: string;
    phone: string;
    role: 'student' | 'organizer';
    name: string;
    collegeId?: string;
    organizerRole?: 'teacher' | 'club_lead';
    department?: string;
    createdAt: string;
}

export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    category: 'Technology' | 'Cultural' | 'Career' | 'Sports' | 'Academic';
    attendees: number;
    capacity: number;
    description: string;
    organizerId?: string;
    organizerName?: string;
    status: 'upcoming' | 'ongoing' | 'completed';
}

export interface SignUpData {
    email: string;
    phone: string;
    password: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface StudentOnboardingData {
    name: string;
    collegeId?: string;
}

export interface OrganizerOnboardingData {
    name: string;
    organizerRole: 'teacher' | 'club_lead';
    department: string;
}

export type AuthMode = 'signup' | 'signin';
export type UserRole = 'student' | 'organizer';

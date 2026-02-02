export interface User {
    id: string;
    email: string;
    phone: string;
    role: 'student' | 'organizer' | 'volunteer';
    name: string;
    collegeId?: string;
    organizerRole?: 'teacher' | 'club_lead';
    department?: string;
    createdAt: string;
}

export interface Registration {
    id: string;
    eventId: string;
    userId: string;
    userName: string;
    userEmail: string;
    userPhone?: string;
    studentId?: string;
    registeredAt: string;
    checkedIn: boolean;
    checkedInAt?: string;
    qrCode: string;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    endTime?: string;
    location: string;
    venue?: string;
    category: 'Technology' | 'Cultural' | 'Career' | 'Sports' | 'Academic' | 'Workshop' | 'Seminar' | 'Other';
    attendees: number;
    capacity: number;
    organizerId: string;
    organizerName: string;
    status: 'draft' | 'upcoming' | 'live' | 'completed' | 'cancelled';
    registrationLink?: string;
    eventQRCode?: string;
    isRegistrationOpen: boolean;
    createdAt: string;
    updatedAt: string;
    registrations?: Registration[];
    checkedInCount?: number;
}

export interface CreateEventData {
    title: string;
    description: string;
    date: string;
    time: string;
    endTime?: string;
    location: string;
    category: Event['category'];
    capacity: number;
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
export type UserRole = 'student' | 'organizer' | 'volunteer';
export type EventStatus = 'draft' | 'upcoming' | 'live' | 'completed' | 'cancelled';
export type EventCategory = 'Technology' | 'Cultural' | 'Career' | 'Sports' | 'Academic' | 'Workshop' | 'Seminar' | 'Other';

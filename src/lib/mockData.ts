import { Event, User } from '@/types';

export const mockEvents: Event[] = [
    {
        id: '1',
        title: 'Tech Innovation Summit 2026',
        date: 'Feb 15, 2026',
        time: '10:00 AM',
        location: 'Main Auditorium',
        category: 'Technology',
        attendees: 234,
        capacity: 300,
        description: 'Annual tech summit featuring industry leaders and innovative startups',
        organizerName: 'Dr. Sharma',
        status: 'upcoming',
    },
    {
        id: '2',
        title: 'Cultural Fest: Harmony 2026',
        date: 'Feb 20, 2026',
        time: '4:00 PM',
        location: 'Open Ground',
        category: 'Cultural',
        attendees: 567,
        capacity: 800,
        description: 'Three-day cultural extravaganza celebrating diversity and talent',
        organizerName: 'Cultural Committee',
        status: 'upcoming',
    },
    {
        id: '3',
        title: 'Career Fair & Networking',
        date: 'Feb 25, 2026',
        time: '9:00 AM',
        location: 'Conference Hall',
        category: 'Career',
        attendees: 189,
        capacity: 250,
        description: 'Meet top recruiters and explore career opportunities',
        organizerName: 'Placement Cell',
        status: 'upcoming',
    },
    {
        id: '4',
        title: 'Inter-College Basketball Tournament',
        date: 'Mar 5, 2026',
        time: '2:00 PM',
        location: 'Sports Complex',
        category: 'Sports',
        attendees: 145,
        capacity: 500,
        description: 'Annual basketball championship with teams from 12 colleges',
        organizerName: 'Sports Department',
        status: 'upcoming',
    },
    {
        id: '5',
        title: 'AI & Machine Learning Workshop',
        date: 'Mar 10, 2026',
        time: '11:00 AM',
        location: 'Lab 301',
        category: 'Academic',
        attendees: 78,
        capacity: 100,
        description: 'Hands-on workshop on latest AI/ML frameworks and techniques',
        organizerName: 'CS Department',
        status: 'upcoming',
    },
];

export const mockOrganizerEvents: Event[] = [
    {
        id: '101',
        title: 'Startup Pitch Competition',
        date: 'Mar 15, 2026',
        time: '3:00 PM',
        location: 'Innovation Hub',
        category: 'Technology',
        attendees: 92,
        capacity: 150,
        description: 'Students pitch their startup ideas to industry experts',
        organizerId: 'current-user',
        organizerName: 'You',
        status: 'upcoming',
    },
    {
        id: '102',
        title: 'Annual Science Exhibition',
        date: 'Mar 20, 2026',
        time: '10:00 AM',
        location: 'Science Block',
        category: 'Academic',
        attendees: 156,
        capacity: 200,
        description: 'Showcase of innovative science projects by students',
        organizerId: 'current-user',
        organizerName: 'You',
        status: 'upcoming',
    },
];

// Mock user storage
const USERS_KEY = 'eventflow_users';
const CURRENT_USER_KEY = 'eventflow_current_user';

export const saveUser = (user: User): void => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const getUsers = (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User): void => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const clearCurrentUser = (): void => {
    localStorage.removeItem(CURRENT_USER_KEY);
};

export const findUserByEmail = (email: string): User | undefined => {
    const users = getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

import { Event, User, Registration, CreateEventData } from '@/types';

// Storage keys
const USERS_KEY = 'eventflow_users';
const CURRENT_USER_KEY = 'eventflow_current_user';
const EVENTS_KEY = 'eventflow_events';
const REGISTRATIONS_KEY = 'eventflow_registrations';

// Generate unique ID
export const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Generate QR code data (in production, this would be a signed token)
export const generateQRCode = (eventId: string, registrationId?: string): string => {
    const data = registrationId
        ? `eventflow://event/${eventId}/registration/${registrationId}`
        : `eventflow://event/${eventId}`;
    return btoa(data);
};

// Generate registration link
export const generateRegistrationLink = (eventId: string): string => {
    return `${window.location.origin}/event/${eventId}/register`;
};

// Mock student events (for student dashboard)
export const mockEvents: Event[] = [
    {
        id: 'event-1',
        title: 'Tech Innovation Summit 2026',
        date: '2026-02-15',
        time: '10:00',
        endTime: '17:00',
        location: 'Main Auditorium, Block A',
        category: 'Technology',
        attendees: 234,
        capacity: 300,
        description: 'Annual tech summit featuring industry leaders and innovative startups. Join us for keynote speeches, panel discussions, and networking opportunities with tech pioneers.',
        organizerId: 'org-1',
        organizerName: 'Dr. Sharma',
        status: 'upcoming',
        isRegistrationOpen: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        checkedInCount: 0,
    },
    {
        id: 'event-2',
        title: 'Cultural Fest: Harmony 2026',
        date: '2026-02-20',
        time: '16:00',
        endTime: '22:00',
        location: 'Open Air Theatre',
        category: 'Cultural',
        attendees: 567,
        capacity: 800,
        description: 'Three-day cultural extravaganza celebrating diversity and talent. Experience music, dance, drama, and art from students across all departments.',
        organizerId: 'org-2',
        organizerName: 'Cultural Committee',
        status: 'upcoming',
        isRegistrationOpen: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        checkedInCount: 0,
    },
    {
        id: 'event-3',
        title: 'Career Fair & Networking',
        date: '2026-02-25',
        time: '09:00',
        endTime: '16:00',
        location: 'Conference Hall, Admin Block',
        category: 'Career',
        attendees: 189,
        capacity: 250,
        description: 'Meet top recruiters from Fortune 500 companies and explore exciting career opportunities. Bring your resume and dress professionally!',
        organizerId: 'org-3',
        organizerName: 'Placement Cell',
        status: 'upcoming',
        isRegistrationOpen: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        checkedInCount: 0,
    },
    {
        id: 'event-4',
        title: 'Inter-College Basketball Tournament',
        date: '2026-03-05',
        time: '14:00',
        endTime: '20:00',
        location: 'Sports Complex',
        category: 'Sports',
        attendees: 145,
        capacity: 500,
        description: 'Annual basketball championship with teams from 12 colleges competing for the trophy. Come cheer for your favorite team!',
        organizerId: 'org-4',
        organizerName: 'Sports Department',
        status: 'upcoming',
        isRegistrationOpen: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        checkedInCount: 0,
    },
    {
        id: 'event-5',
        title: 'AI & Machine Learning Workshop',
        date: '2026-03-10',
        time: '11:00',
        endTime: '16:00',
        location: 'Computer Lab 301',
        category: 'Workshop',
        attendees: 78,
        capacity: 100,
        description: 'Hands-on workshop covering TensorFlow, PyTorch, and real-world ML applications. Laptops required. Prerequisites: Basic Python knowledge.',
        organizerId: 'org-5',
        organizerName: 'CS Department',
        status: 'upcoming',
        isRegistrationOpen: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        checkedInCount: 0,
    },
    {
        id: 'event-6',
        title: 'Entrepreneurship Seminar',
        date: '2026-03-12',
        time: '10:00',
        endTime: '13:00',
        location: 'Seminar Hall B',
        category: 'Seminar',
        attendees: 45,
        capacity: 150,
        description: 'Learn from successful startup founders about their journey, challenges, and tips for aspiring entrepreneurs. Q&A session included.',
        organizerId: 'org-6',
        organizerName: 'E-Cell',
        status: 'upcoming',
        isRegistrationOpen: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        checkedInCount: 0,
    },
    {
        id: 'event-7',
        title: 'Photography Contest',
        date: '2026-03-15',
        time: '09:00',
        endTime: '18:00',
        location: 'Art Gallery',
        category: 'Other',
        attendees: 32,
        capacity: 100,
        description: 'Campus-wide photography contest. Theme: "Moments of Campus Life". Submit your best shots and win exciting prizes!',
        organizerId: 'org-7',
        organizerName: 'Media Club',
        status: 'upcoming',
        isRegistrationOpen: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        checkedInCount: 0,
    },
    {
        id: 'event-8',
        title: 'Annual Science Exhibition',
        date: '2026-03-20',
        time: '10:00',
        endTime: '17:00',
        location: 'Science Block',
        category: 'Academic',
        attendees: 120,
        capacity: 300,
        description: 'Showcase of innovative science projects by students from Physics, Chemistry, and Biology departments. Open to all!',
        organizerId: 'org-8',
        organizerName: 'Science Faculty',
        status: 'upcoming',
        isRegistrationOpen: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        checkedInCount: 0,
    },
];

// Initialize mock events in localStorage on first load
const initializeMockEvents = () => {
    const stored = localStorage.getItem(EVENTS_KEY);
    if (!stored) {
        localStorage.setItem(EVENTS_KEY, JSON.stringify(mockEvents));
    } else {
        // Merge mock events with stored events (avoid duplicates)
        const storedEvents: Event[] = JSON.parse(stored);
        const storedIds = new Set(storedEvents.map(e => e.id));
        const newMockEvents = mockEvents.filter(e => !storedIds.has(e.id));
        if (newMockEvents.length > 0) {
            localStorage.setItem(EVENTS_KEY, JSON.stringify([...storedEvents, ...newMockEvents]));
        }
    }
};

// Run initialization
initializeMockEvents();

// Initialize organizer events if not exists
const initializeOrganizerEvents = (organizerId: string): Event[] => {
    const stored = localStorage.getItem(EVENTS_KEY);
    if (stored) {
        const allEvents = JSON.parse(stored);
        return allEvents.filter((e: Event) => e.organizerId === organizerId);
    }

    // Create default events for new organizers
    const defaultEvents: Event[] = [
        {
            id: generateId(),
            title: 'Startup Pitch Competition',
            date: '2026-03-15',
            time: '15:00',
            endTime: '18:00',
            location: 'Innovation Hub',
            category: 'Technology',
            attendees: 92,
            capacity: 150,
            description: 'Students pitch their startup ideas to industry experts and VCs. Winners get seed funding and mentorship opportunities.',
            organizerId: organizerId,
            organizerName: 'You',
            status: 'upcoming',
            isRegistrationOpen: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            checkedInCount: 0,
        },
        {
            id: generateId(),
            title: 'Annual Science Exhibition',
            date: '2026-03-20',
            time: '10:00',
            endTime: '17:00',
            location: 'Science Block',
            category: 'Academic',
            attendees: 156,
            capacity: 200,
            description: 'Showcase of innovative science projects by students from all departments.',
            organizerId: organizerId,
            organizerName: 'You',
            status: 'upcoming',
            isRegistrationOpen: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            checkedInCount: 0,
        },
    ];

    // Store in localStorage
    const allEvents = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
    localStorage.setItem(EVENTS_KEY, JSON.stringify([...allEvents, ...defaultEvents]));

    return defaultEvents;
};

// Mock registrations for events
const generateMockRegistrations = (eventId: string, count: number): Registration[] => {
    const names = ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Gupta', 'Vikram Singh', 'Ananya Roy', 'Arjun Mehta', 'Kavya Reddy'];
    const registrations: Registration[] = [];

    for (let i = 0; i < Math.min(count, names.length); i++) {
        registrations.push({
            id: `reg-${eventId}-${i}`,
            eventId,
            userId: `user-${i}`,
            userName: names[i],
            userEmail: `${names[i].toLowerCase().replace(' ', '.')}@iilm.edu`,
            studentId: `IILM${2024000 + i}`,
            registeredAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            checkedIn: Math.random() > 0.5,
            checkedInAt: Math.random() > 0.5 ? new Date().toISOString() : undefined,
            qrCode: generateQRCode(eventId, `reg-${eventId}-${i}`),
        });
    }

    return registrations;
};

// User management functions
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

// Event management functions
export const getOrganizerEvents = (organizerId: string): Event[] => {
    const stored = localStorage.getItem(EVENTS_KEY);
    if (!stored) {
        return initializeOrganizerEvents(organizerId);
    }

    const allEvents: Event[] = JSON.parse(stored);
    const organizerEvents = allEvents.filter(e => e.organizerId === organizerId);

    if (organizerEvents.length === 0) {
        return initializeOrganizerEvents(organizerId);
    }

    return organizerEvents;
};

export const getAllEvents = (): Event[] => {
    const stored = localStorage.getItem(EVENTS_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const getEventById = (eventId: string): Event | null => {
    const events = getAllEvents();
    return events.find(e => e.id === eventId) || null;
};

export const createEvent = (data: CreateEventData, organizer: User): Event => {
    const eventId = generateId();
    const newEvent: Event = {
        id: eventId,
        ...data,
        attendees: 0,
        organizerId: organizer.id,
        organizerName: organizer.name,
        status: 'upcoming',
        isRegistrationOpen: true,
        registrationLink: generateRegistrationLink(eventId),
        eventQRCode: generateQRCode(eventId),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        checkedInCount: 0,
    };

    const events = getAllEvents();
    events.push(newEvent);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));

    return newEvent;
};

export const updateEvent = (eventId: string, updates: Partial<Event>): Event | null => {
    const events = getAllEvents();
    const index = events.findIndex(e => e.id === eventId);

    if (index === -1) return null;

    events[index] = {
        ...events[index],
        ...updates,
        updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    return events[index];
};

export const deleteEvent = (eventId: string): boolean => {
    const events = getAllEvents();
    const filtered = events.filter(e => e.id !== eventId);

    if (filtered.length === events.length) return false;

    localStorage.setItem(EVENTS_KEY, JSON.stringify(filtered));
    return true;
};

export const toggleRegistration = (eventId: string): Event | null => {
    const event = getEventById(eventId);
    if (!event) return null;

    return updateEvent(eventId, { isRegistrationOpen: !event.isRegistrationOpen });
};

// Registration management
export const getEventRegistrations = (eventId: string): Registration[] => {
    const stored = localStorage.getItem(REGISTRATIONS_KEY);
    if (!stored) {
        // Generate mock registrations for demo
        const event = getEventById(eventId);
        if (event && event.attendees > 0) {
            const mockRegs = generateMockRegistrations(eventId, Math.min(event.attendees, 8));
            const allRegs = JSON.parse(localStorage.getItem(REGISTRATIONS_KEY) || '[]');
            localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify([...allRegs, ...mockRegs]));
            return mockRegs;
        }
        return [];
    }

    const allRegistrations: Registration[] = JSON.parse(stored);
    const eventRegs = allRegistrations.filter(r => r.eventId === eventId);

    // If no registrations exist for this event, generate mock ones
    if (eventRegs.length === 0) {
        const event = getEventById(eventId);
        if (event && event.attendees > 0) {
            const mockRegs = generateMockRegistrations(eventId, Math.min(event.attendees, 8));
            const allRegs = JSON.parse(localStorage.getItem(REGISTRATIONS_KEY) || '[]');
            localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify([...allRegs, ...mockRegs]));
            return mockRegs;
        }
    }

    return eventRegs;
};

export const checkInRegistration = (registrationId: string): Registration | null => {
    const stored = localStorage.getItem(REGISTRATIONS_KEY);
    if (!stored) return null;

    const registrations: Registration[] = JSON.parse(stored);
    const index = registrations.findIndex(r => r.id === registrationId);

    if (index === -1) return null;

    registrations[index] = {
        ...registrations[index],
        checkedIn: true,
        checkedInAt: new Date().toISOString(),
    };

    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));

    // Update event checked-in count
    const eventId = registrations[index].eventId;
    const event = getEventById(eventId);
    if (event) {
        const eventRegs = registrations.filter(r => r.eventId === eventId);
        const checkedInCount = eventRegs.filter(r => r.checkedIn).length;
        updateEvent(eventId, { checkedInCount });
    }

    return registrations[index];
};

export const manualCheckIn = (eventId: string, userName: string, userEmail: string): Registration => {
    const registration: Registration = {
        id: generateId(),
        eventId,
        userId: generateId(),
        userName,
        userEmail,
        registeredAt: new Date().toISOString(),
        checkedIn: true,
        checkedInAt: new Date().toISOString(),
        qrCode: generateQRCode(eventId, generateId()),
    };

    const registrations = JSON.parse(localStorage.getItem(REGISTRATIONS_KEY) || '[]');
    registrations.push(registration);
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));

    // Update event attendee count
    const event = getEventById(eventId);
    if (event) {
        updateEvent(eventId, {
            attendees: event.attendees + 1,
            checkedInCount: (event.checkedInCount || 0) + 1,
        });
    }

    return registration;
};

// Student registration for an event
export const registerForEvent = (
    eventId: string,
    studentData: {
        name: string;
        email: string;
        phone?: string;
        studentId?: string;
    }
): Registration | null => {
    const event = getEventById(eventId);
    if (!event) return null;
    if (!event.isRegistrationOpen) return null;
    if (event.attendees >= event.capacity) return null;

    // Check if already registered
    const existingRegs = getEventRegistrations(eventId);
    const alreadyRegistered = existingRegs.find(
        r => r.userEmail.toLowerCase() === studentData.email.toLowerCase()
    );
    if (alreadyRegistered) return alreadyRegistered;

    const registrationId = generateId();
    const registration: Registration = {
        id: registrationId,
        eventId,
        userId: generateId(),
        userName: studentData.name,
        userEmail: studentData.email,
        userPhone: studentData.phone,
        studentId: studentData.studentId,
        registeredAt: new Date().toISOString(),
        checkedIn: false,
        qrCode: generateQRCode(eventId, registrationId),
    };

    const registrations = JSON.parse(localStorage.getItem(REGISTRATIONS_KEY) || '[]');
    registrations.push(registration);
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));

    // Update event attendee count
    updateEvent(eventId, { attendees: event.attendees + 1 });

    return registration;
};

// Get registration by ID
export const getRegistrationById = (registrationId: string): Registration | null => {
    const stored = localStorage.getItem(REGISTRATIONS_KEY);
    if (!stored) return null;

    const registrations: Registration[] = JSON.parse(stored);
    return registrations.find(r => r.id === registrationId) || null;
};

// Parse QR code data
export const parseQRCode = (qrData: string): { eventId: string; registrationId?: string } | null => {
    try {
        let decoded = qrData;

        try {
            decoded = atob(qrData);
        } catch {
            decoded = qrData;
        }

        // Format: eventflow://event/{eventId}/registration/{registrationId}
        // or: eventflow://event/{eventId}
        const pattern = /eventflow:\/\/event\/([^\/]+)(?:\/registration\/([^\/]+))?/;
        const match = decoded.match(pattern) || qrData.match(pattern);
        if (match) {
            return {
                eventId: match[1],
                registrationId: match[2],
            };
        }

        return null;
    } catch {
        return null;
    }
};

// Check in by QR code scan
export const checkInByQR = (qrData: string): { success: boolean; message: string; registration?: Registration } => {
    const parsed = parseQRCode(qrData);
    if (!parsed) {
        return { success: false, message: 'Invalid QR code format' };
    }

    const { eventId, registrationId } = parsed;

    // Get event
    const event = getEventById(eventId);
    if (!event) {
        return { success: false, message: 'Event not found' };
    }

    // If registration ID is provided, check in that specific registration
    if (registrationId) {
        const registration = getRegistrationById(registrationId);
        if (!registration) {
            return { success: false, message: 'Registration not found' };
        }

        if (registration.eventId !== eventId) {
            return { success: false, message: 'Registration does not match event' };
        }

        if (registration.checkedIn) {
            return {
                success: false,
                message: `Already checked in at ${new Date(registration.checkedInAt!).toLocaleTimeString()}`,
                registration
            };
        }

        const updated = checkInRegistration(registrationId);
        if (updated) {
            return {
                success: true,
                message: `Successfully checked in ${registration.userName}`,
                registration: updated
            };
        }
    }

    return { success: false, message: 'Could not process check-in' };
};

// Find registration by email for an event
export const findRegistrationByEmail = (eventId: string, email: string): Registration | null => {
    const registrations = getEventRegistrations(eventId);
    return registrations.find(r => r.userEmail.toLowerCase() === email.toLowerCase()) || null;
};

// Find registration by student ID for an event
export const findRegistrationByStudentId = (eventId: string, studentId: string): Registration | null => {
    const registrations = getEventRegistrations(eventId);
    return registrations.find(r => r.studentId === studentId) || null;
};

// Get all registrations for a user by email
export const getUserRegistrations = (userEmail: string): (Registration & { event: Event | null })[] => {
    const allEvents = getAllEvents();
    const userRegistrations: (Registration & { event: Event | null })[] = [];

    allEvents.forEach(event => {
        const registrations = getEventRegistrations(event.id);
        const userReg = registrations.find(r => r.userEmail.toLowerCase() === userEmail.toLowerCase());
        if (userReg) {
            userRegistrations.push({
                ...userReg,
                event: event
            });
        }
    });

    return userRegistrations;
};

// Legacy export for backward compatibility
export const mockOrganizerEvents: Event[] = [];

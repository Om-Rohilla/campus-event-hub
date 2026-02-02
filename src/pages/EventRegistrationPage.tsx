import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    MapPin,
    Users,
    ArrowLeft,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Home
} from 'lucide-react';
import { getEventById, registerForEvent, findRegistrationByEmail } from '@/lib/mockData';
import { Event, Registration } from '@/types';
import logo from '@/assets/logo.svg';

const EventRegistrationPage = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();

    const [event, setEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [existingRegistration, setExistingRegistration] = useState<Registration | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        studentId: '',
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!eventId) {
            setError('Invalid event link');
            setIsLoading(false);
            return;
        }

        const eventData = getEventById(eventId);
        if (!eventData) {
            setError('Event not found');
            setIsLoading(false);
            return;
        }

        setEvent(eventData);
        setIsLoading(false);
    }, [eventId]);

    const formatDate = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch {
            return dateStr;
        }
    };

    const formatTime = (timeStr: string) => {
        try {
            const [hours, minutes] = timeStr.split(':');
            const date = new Date();
            date.setHours(parseInt(hours), parseInt(minutes));
            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } catch {
            return timeStr;
        }
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email';
        }

        if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            errors.phone = 'Please enter a valid 10-digit phone number';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm() || !eventId) return;

        setIsSubmitting(true);

        // Check if already registered
        const existing = findRegistrationByEmail(eventId, formData.email);
        if (existing) {
            setExistingRegistration(existing);
            setIsSubmitting(false);
            return;
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const registration = registerForEvent(eventId, {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || undefined,
            studentId: formData.studentId || undefined,
        });

        setIsSubmitting(false);

        if (registration) {
            // Navigate to confirmation page with registration data
            navigate(`/event/${eventId}/confirmation`, {
                state: { registration, event }
            });
        } else {
            setError('Registration failed. The event may be full or closed.');
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    // Error state
    if (error || !event) {
        return (
            <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
                <div className="text-center max-w-sm mx-auto">
                    <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-destructive mx-auto mb-4" />
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                        {error || 'Event Not Found'}
                    </h1>
                    <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                        The event you're looking for doesn't exist or has been removed.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="btn-primary px-6 py-3 rounded-xl w-full sm:w-auto"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    // Already registered state
    if (existingRegistration) {
        return (
            <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center"
                >
                    <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                        Already Registered!
                    </h1>
                    <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                        You're already registered for this event with {existingRegistration.userEmail}
                    </p>
                    <button
                        onClick={() => navigate(`/event/${eventId}/confirmation`, {
                            state: { registration: existingRegistration, event }
                        })}
                        className="btn-primary px-6 py-3 rounded-xl w-full"
                    >
                        View My Ticket
                    </button>
                </motion.div>
            </div>
        );
    }

    // Registration closed state
    if (!event.isRegistrationOpen) {
        return (
            <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
                <div className="text-center max-w-sm mx-auto">
                    <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500 mx-auto mb-4" />
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                        Registration Closed
                    </h1>
                    <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                        Registration for this event is currently closed.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="btn-primary px-6 py-3 rounded-xl w-full sm:w-auto"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    // Event full state
    if (event.attendees >= event.capacity) {
        return (
            <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
                <div className="text-center max-w-sm mx-auto">
                    <Users className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500 mx-auto mb-4" />
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                        Event Full
                    </h1>
                    <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                        This event has reached maximum capacity.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="btn-primary px-6 py-3 rounded-xl w-full sm:w-auto"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    const spotsLeft = event.capacity - event.attendees;

    return (
        <div className="min-h-screen bg-gradient-surface">
            {/* Header */}
            <header className="bg-white border-b border-border/50 sticky top-0 z-40">
                <div className="max-w-3xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Left: Back + Logo */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 rounded-lg hover:bg-muted transition-colors"
                                aria-label="Go back"
                            >
                                <ArrowLeft className="w-5 h-5 text-foreground" />
                            </button>
                            <img
                                src={logo}
                                alt="EventFlow"
                                className="h-7 sm:h-8 w-auto cursor-pointer"
                                onClick={() => navigate('/')}
                            />
                        </div>

                        {/* Right: Home Button */}
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm font-medium text-foreground"
                        >
                            <Home className="w-4 h-4" />
                            <span className="hidden sm:inline">Home</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
                {/* Mobile: Event Info Card (shown first on mobile) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:hidden bg-white rounded-2xl shadow-lg p-4 sm:p-5 mb-6"
                >
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                            {event.category}
                        </span>
                        <span className="text-xs text-green-600 font-medium">
                            {spotsLeft} spots left
                        </span>
                    </div>

                    <h1 className="font-display text-lg sm:text-xl font-bold text-foreground mb-3">
                        {event.title}
                    </h1>

                    <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{formatTime(event.time)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
                    {/* Event Info - Left Side (Desktop only) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden lg:block lg:col-span-2"
                    >
                        <div className="bg-white rounded-2xl shadow-lg p-5 sticky top-20">
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                                {event.category}
                            </span>

                            <h1 className="font-display text-xl font-bold text-foreground mb-4">
                                {event.title}
                            </h1>

                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Calendar className="w-4 h-4 flex-shrink-0" />
                                    <span>{formatDate(event.date)}</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Clock className="w-4 h-4 flex-shrink-0" />
                                    <span>
                                        {formatTime(event.time)}
                                        {event.endTime && ` - ${formatTime(event.endTime)}`}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Users className="w-4 h-4 flex-shrink-0" />
                                    <span>{spotsLeft} spots left</span>
                                </div>
                            </div>

                            {event.description && (
                                <div className="mt-4 pt-4 border-t border-border/50">
                                    <p className="text-sm text-muted-foreground line-clamp-4">
                                        {event.description}
                                    </p>
                                </div>
                            )}

                            <div className="mt-4 pt-4 border-t border-border/50">
                                <p className="text-xs text-muted-foreground">
                                    Organized by <span className="font-medium">{event.organizerName}</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Registration Form - Right Side / Full width on mobile */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-3"
                    >
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                            <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
                                Register for Event
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        placeholder="Enter your full name"
                                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm sm:text-base ${formErrors.name ? 'border-destructive' : 'border-border'
                                            } bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                                    />
                                    {formErrors.name && (
                                        <p className="text-xs sm:text-sm text-destructive mt-1">{formErrors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        placeholder="your.email@example.com"
                                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm sm:text-base ${formErrors.email ? 'border-destructive' : 'border-border'
                                            } bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                                    />
                                    {formErrors.email && (
                                        <p className="text-xs sm:text-sm text-destructive mt-1">{formErrors.email}</p>
                                    )}
                                </div>

                                {/* Phone & Student ID Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            placeholder="10-digit number"
                                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm sm:text-base ${formErrors.phone ? 'border-destructive' : 'border-border'
                                                } bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                                        />
                                        {formErrors.phone && (
                                            <p className="text-xs sm:text-sm text-destructive mt-1">{formErrors.phone}</p>
                                        )}
                                    </div>

                                    {/* Student ID */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                                            Student ID
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.studentId}
                                            onChange={(e) => handleChange('studentId', e.target.value)}
                                            placeholder="e.g., IILM2024001"
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-border bg-background text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-primary py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Registering...
                                        </>
                                    ) : (
                                        'Register Now'
                                    )}
                                </button>

                                <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
                                    By registering, you agree to receive updates about this event.
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default EventRegistrationPage;

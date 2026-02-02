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
    User,
    Mail,
    Phone,
    CreditCard,
    Sparkles,
    Shield,
    Ticket
} from 'lucide-react';
import { getCurrentUser, getEventById, registerForEvent, findRegistrationByEmail } from '@/lib/mockData';
import { Event, Registration } from '@/types';

const EventRegistrationPage = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();

    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

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
        const user = getCurrentUser();
        if (user?.role === 'student') {
            setCurrentUserEmail(user.email);
            setFormData(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: user.email || prev.email,
                phone: user.phone || prev.phone,
                studentId: user.collegeId || prev.studentId,
            }));
        }

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
                weekday: 'long',
                month: 'long',
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
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
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

        const emailToUse = currentUserEmail || formData.email;

        setIsSubmitting(true);

        // Check if already registered
        const existing = findRegistrationByEmail(eventId, emailToUse);
        if (existing) {
            setExistingRegistration(existing);
            setIsSubmitting(false);
            return;
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const registration = registerForEvent(eventId, {
            name: formData.name,
            email: emailToUse,
            phone: formData.phone || undefined,
            studentId: formData.studentId || undefined,
        });

        setIsSubmitting(false);

        if (registration) {
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
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading event details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !event) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-border/50"
                >
                    <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-3">
                        {error || 'Event Not Found'}
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        The event you're looking for doesn't exist or has been removed.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all"
                    >
                        Back to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    // Already registered state
    if (existingRegistration) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-border/50"
                >
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-3">
                        Already Registered!
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        You're already registered for this event with<br />
                        <span className="font-medium text-foreground">{existingRegistration.userEmail}</span>
                    </p>
                    <button
                        onClick={() => navigate(`/event/${eventId}/confirmation`, {
                            state: { registration: existingRegistration, event }
                        })}
                        className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                    >
                        <Ticket className="w-5 h-5" />
                        View My Ticket
                    </button>
                </motion.div>
            </div>
        );
    }

    // Registration closed state
    if (!event.isRegistrationOpen) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-border/50"
                >
                    <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-10 h-10 text-orange-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-3">
                        Registration Closed
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        Registration for this event is currently closed.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all"
                    >
                        Back to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    // Event full state
    if (event.attendees >= event.capacity) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-border/50"
                >
                    <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-6">
                        <Users className="w-10 h-10 text-orange-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-3">
                        Event Full
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        This event has reached maximum capacity.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all"
                    >
                        Back to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    const spotsLeft = event.capacity - event.attendees;
    const spotsPercentage = ((event.capacity - spotsLeft) / event.capacity) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-x-hidden overflow-y-auto">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="text-sm font-medium">Back</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-muted-foreground">Secure Registration</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                    {/* Left: Event Details Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="order-2 lg:order-1 h-full"
                    >
                        <div className="bg-white rounded-2xl shadow-lg border border-border/50 overflow-hidden h-full">
                            {/* Event Header with Gradient */}
                            <div className="bg-gradient-to-br from-primary via-primary to-accent p-6 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                                <div className="relative z-10">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-medium rounded-full mb-3">
                                        <Sparkles className="w-3 h-3" />
                                        {event.category}
                                    </span>
                                    <h1 className="text-xl sm:text-2xl font-bold mb-1 leading-tight">
                                        {event.title}
                                    </h1>
                                    <p className="text-white/80 text-sm">
                                        by {event.organizerName}
                                    </p>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="p-6 space-y-4">
                                {/* Date */}
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Date</p>
                                        <p className="font-medium text-foreground text-sm">{formatDate(event.date)}</p>
                                    </div>
                                </div>

                                {/* Time */}
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-5 h-5 text-accent" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Time</p>
                                        <p className="font-medium text-foreground text-sm">
                                            {formatTime(event.time)}
                                            {event.endTime && ` - ${formatTime(event.endTime)}`}
                                        </p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Location</p>
                                        <p className="font-medium text-foreground text-sm">{event.location}</p>
                                    </div>
                                </div>

                                {/* Capacity Bar */}
                                <div className="pt-4 border-t border-border/50">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-muted-foreground">Availability</span>
                                        <span className="text-xs font-semibold text-foreground">{spotsLeft} spots left</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                                            style={{ width: `${spotsPercentage}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1.5">
                                        {event.attendees} of {event.capacity} registered
                                    </p>
                                </div>

                                {/* Description */}
                                {event.description && (
                                    <div className="pt-4 border-t border-border/50">
                                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">About</p>
                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                            {event.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Registration Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="order-1 lg:order-2 h-full"
                    >
                        <div className="bg-white rounded-2xl shadow-lg border border-border/50 overflow-hidden h-full">
                            {/* Form Header */}
                            <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-6 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                                <div className="relative z-10">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-sm text-xs font-medium rounded-full mb-3">
                                        <Ticket className="w-3 h-3" />
                                        Free Registration
                                    </span>
                                    <h2 className="text-xl sm:text-2xl font-bold mb-1">
                                        Register Now
                                    </h2>
                                    <p className="text-white/70 text-sm">
                                        Secure your spot for this event
                                    </p>
                                </div>
                            </div>

                            {/* Form Content */}
                            <div className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                                placeholder="Enter your full name"
                                                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm transition-all ${
                                                    formErrors.name
                                                        ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-200'
                                                        : 'border-border bg-background focus:border-primary focus:ring-primary/20'
                                                } focus:outline-none focus:ring-4`}
                                            />
                                        </div>
                                        {formErrors.name && (
                                            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {formErrors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                                placeholder="your.email@example.com"
                                                readOnly={!!currentUserEmail}
                                                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm transition-all ${
                                                    formErrors.email
                                                        ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-200'
                                                        : 'border-border bg-background focus:border-primary focus:ring-primary/20'
                                                } focus:outline-none focus:ring-4`}
                                            />
                                        </div>
                                        {formErrors.email && (
                                            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {formErrors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone & Student ID in row */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {/* Phone */}
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                                Phone <span className="text-muted-foreground font-normal text-xs">(Optional)</span>
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => handleChange('phone', e.target.value)}
                                                    placeholder="10-digit"
                                                    className={`w-full pl-10 pr-3 py-3 rounded-xl border-2 text-sm transition-all ${
                                                        formErrors.phone
                                                            ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-200'
                                                            : 'border-border bg-background focus:border-primary focus:ring-primary/20'
                                                    } focus:outline-none focus:ring-4`}
                                                />
                                            </div>
                                            {formErrors.phone && (
                                                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    Invalid
                                                </p>
                                            )}
                                        </div>

                                        {/* Student ID */}
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                                Student ID <span className="text-muted-foreground font-normal text-xs">(Optional)</span>
                                            </label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="text"
                                                    value={formData.studentId}
                                                    onChange={(e) => handleChange('studentId', e.target.value)}
                                                    placeholder="IILM2024001"
                                                    className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-border bg-background text-sm focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-primary to-accent text-white py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none mt-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Registering...
                                            </>
                                        ) : (
                                            <>
                                                <Ticket className="w-5 h-5" />
                                                Register Now
                                            </>
                                        )}
                                    </button>

                                    {/* Trust indicators */}
                                    <div className="flex items-center justify-center gap-4 pt-3 border-t border-border/50 mt-4">
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Shield className="w-3.5 h-3.5 text-green-500" />
                                            Secure
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                            Instant
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Ticket className="w-3.5 h-3.5 text-green-500" />
                                            Free
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Help Text */}
                <p className="text-center text-xs text-muted-foreground mt-6 px-4">
                    By registering, you agree to receive updates about this event.
                </p>
            </main>
        </div>
    );
};

export default EventRegistrationPage;

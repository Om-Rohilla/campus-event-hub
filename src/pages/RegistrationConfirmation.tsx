import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    MapPin,
    CheckCircle2,
    ArrowLeft,
    Share2,
    Download,
    Home
} from 'lucide-react';
import { Event, Registration } from '@/types';
import { getEventById } from '@/lib/mockData';
import QRCodeDisplay from '@/components/shared/QRCodeDisplay';

const RegistrationConfirmation = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const location = useLocation();
    const navigate = useNavigate();

    const [event, setEvent] = useState<Event | null>(null);
    const [registration, setRegistration] = useState<Registration | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Try to get data from navigation state first
        const state = location.state as { registration?: Registration; event?: Event } | null;

        if (state?.registration && state?.event) {
            setRegistration(state.registration);
            setEvent(state.event);
            setIsLoading(false);
            return;
        }

        // Otherwise, load from storage
        if (eventId) {
            const eventData = getEventById(eventId);
            setEvent(eventData);
        }

        setIsLoading(false);
    }, [eventId, location.state]);

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

    const handleShare = async () => {
        if (!event) return;

        const shareData = {
            title: `I'm attending ${event.title}!`,
            text: `Join me at ${event.title} on ${formatDate(event.date)} at ${event.location}`,
            url: window.location.origin + `/event/${event.id}/register`
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(
                    `${shareData.title}\n${shareData.text}\nRegister: ${shareData.url}`
                );
                alert('Link copied to clipboard!');
            }
        } catch (err) {
            console.error('Share failed:', err);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!registration || !event) {
        return (
            <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
                <div className="text-center max-w-sm mx-auto">
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                        Registration Not Found
                    </h1>
                    <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                        We couldn't find your registration details.
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

    // QR data for check-in (the encoded registration QR)
    const qrData = registration.qrCode;
    // Decode for display
    const decodedQR = atob(qrData);

    return (
        <div className="min-h-screen bg-gradient-surface overflow-x-hidden overflow-y-auto">
            {/* Header */}
            <header className="bg-white border-b border-border/50 sticky top-0 z-40">
                <div className="max-w-xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
                    <div className="flex items-center justify-between">
                        {/* Left: Back Button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-foreground" />
                        </button>

                        {/* Right: Home Button */}
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm font-medium text-foreground"
                        >
                            <Home className="w-4 h-4" />
                            <span className="hidden xs:inline">Home</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-xl mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-8 sm:pb-12">
                {/* Success Message */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6 sm:mb-8"
                >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                    </div>
                    <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                        Registration Confirmed!
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        You're all set for the event
                    </p>
                </motion.div>

                {/* Ticket Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden"
                >
                    {/* Event Banner */}
                    <div className="bg-gradient-to-r from-primary to-accent p-4 sm:p-6 text-white">
                        <span className="inline-block px-2.5 sm:px-3 py-1 bg-white/20 text-xs sm:text-sm font-medium rounded-full mb-2 sm:mb-3">
                            {event.category}
                        </span>
                        <h2 className="font-display text-lg sm:text-xl font-bold mb-1 sm:mb-2 leading-tight">
                            {event.title}
                        </h2>
                        <p className="text-white/80 text-xs sm:text-sm">
                            Organized by {event.organizerName}
                        </p>
                    </div>

                    {/* Event Details */}
                    <div className="p-4 sm:p-6 border-b border-border/50">
                        {/* Date & Time Row */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="flex items-start gap-2 sm:gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] sm:text-xs text-muted-foreground">Date</p>
                                    <p className="font-medium text-foreground text-xs sm:text-sm truncate">
                                        {formatDate(event.date)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 sm:gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] sm:text-xs text-muted-foreground">Time</p>
                                    <p className="font-medium text-foreground text-xs sm:text-sm truncate">
                                        {formatTime(event.time)}
                                        {event.endTime && ` - ${formatTime(event.endTime)}`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Location Row */}
                        <div className="flex items-start gap-2 sm:gap-3 mt-3 sm:mt-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] sm:text-xs text-muted-foreground">Location</p>
                                <p className="font-medium text-foreground text-xs sm:text-sm">
                                    {event.location}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Attendee Info */}
                    <div className="p-4 sm:p-6 border-b border-border/50 bg-muted/30">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                            <div>
                                <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Attendee</p>
                                <p className="font-semibold text-foreground truncate">{registration.userName}</p>
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Email</p>
                                <p className="font-medium text-foreground truncate">{registration.userEmail}</p>
                            </div>
                            {registration.studentId && (
                                <div>
                                    <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Student ID</p>
                                    <p className="font-medium text-foreground">{registration.studentId}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Booking ID</p>
                                <p className="font-mono text-foreground text-[10px] sm:text-xs">{registration.id.slice(0, 12)}</p>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="p-4 sm:p-6">
                        <div className="text-center mb-4 sm:mb-6">
                            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-0.5 sm:mb-1">Your Entry Pass</h3>
                            <p className="text-[10px] sm:text-xs text-muted-foreground">
                                Show this QR code at the venue for check-in
                            </p>
                        </div>

                        {/* QR Code with responsive sizing */}
                        <div className="flex justify-center mb-4 sm:mb-6">
                            <QRCodeDisplay
                                data={decodedQR}
                                title=""
                                size={200}
                                showActions={true}
                                className=""
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 sm:gap-3">
                            <button
                                onClick={handleShare}
                                className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-muted text-foreground font-medium text-xs sm:text-sm hover:bg-muted/80 transition-colors"
                            >
                                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span>Share Event</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Instructions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-xl"
                >
                    <h4 className="font-semibold text-blue-900 text-sm sm:text-base mb-1.5 sm:mb-2">Important Instructions</h4>
                    <ul className="text-xs sm:text-sm text-blue-800 space-y-0.5 sm:space-y-1">
                        <li>• Screenshot or save your ticket for offline access</li>
                        <li>• Arrive 15 minutes before the event starts</li>
                        <li>• Show this QR code at the entrance for check-in</li>
                        <li>• Carry a valid ID for verification if required</li>
                    </ul>
                </motion.div>
            </main>
        </div>
    );
};

export default RegistrationConfirmation;

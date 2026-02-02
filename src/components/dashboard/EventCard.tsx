import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { Event } from '@/types';

interface EventCardProps {
    event: Event;
    index?: number;
}

const categoryColors: Record<string, { bar: string; badge: string }> = {
    Technology: { bar: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700' },
    Cultural: { bar: 'bg-purple-500', badge: 'bg-purple-50 text-purple-700' },
    Career: { bar: 'bg-green-500', badge: 'bg-green-50 text-green-700' },
    Sports: { bar: 'bg-orange-500', badge: 'bg-orange-50 text-orange-700' },
    Academic: { bar: 'bg-indigo-500', badge: 'bg-indigo-50 text-indigo-700' },
    Workshop: { bar: 'bg-teal-500', badge: 'bg-teal-50 text-teal-700' },
    Seminar: { bar: 'bg-pink-500', badge: 'bg-pink-50 text-pink-700' },
    Other: { bar: 'bg-gray-500', badge: 'bg-gray-50 text-gray-700' },
};

const EventCard = ({ event, index = 0 }: EventCardProps) => {
    const navigate = useNavigate();
    const colors = categoryColors[event.category] || categoryColors.Other;

    const formatDate = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', {
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
            // Check if already formatted (contains AM/PM)
            if (timeStr.includes('AM') || timeStr.includes('PM')) {
                return timeStr;
            }
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

    const handleRegister = () => {
        navigate(`/event/${event.id}/register`);
    };

    const spotsLeft = event.capacity - event.attendees;
    const isFull = spotsLeft <= 0;
    const isAlmostFull = spotsLeft > 0 && spotsLeft <= 10;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group card-elevated overflow-hidden border border-border/50 h-full hover:shadow-lg transition-shadow duration-300"
        >
            {/* Category Banner */}
            <div className={`h-1.5 ${colors.bar}`} />

            <div className="p-5 sm:p-6 flex flex-col h-full">
                {/* Header: Category + Status */}
                <div className="flex items-center justify-between mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                        {event.category}
                    </span>
                    {!event.isRegistrationOpen && (
                        <span className="text-xs text-red-600 font-medium">Registration Closed</span>
                    )}
                    {event.isRegistrationOpen && isFull && (
                        <span className="text-xs text-red-600 font-medium">Full</span>
                    )}
                    {event.isRegistrationOpen && isAlmostFull && !isFull && (
                        <span className="text-xs text-orange-600 font-medium">{spotsLeft} spots left</span>
                    )}
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {event.title}
                </h3>

                {/* Event Details */}
                <div className="space-y-2.5 mb-4 flex-grow">
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">
                            {formatTime(event.time)}
                            {event.endTime && ` - ${formatTime(event.endTime)}`}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{event.attendees} / {event.capacity} registered</span>
                    </div>
                </div>

                {/* Organizer */}
                <p className="text-xs text-muted-foreground mb-4">
                    By <span className="font-medium">{event.organizerName}</span>
                </p>

                {/* Action Button */}
                <div className="pt-4 border-t border-border/50">
                    <button
                        onClick={handleRegister}
                        disabled={!event.isRegistrationOpen || isFull}
                        className={`w-full py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                            !event.isRegistrationOpen || isFull
                                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                        }`}
                    >
                        {!event.isRegistrationOpen ? 'Registration Closed' : isFull ? 'Event Full' : (
                            <>
                                Register Now
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default EventCard;

import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    MapPin,
    Users,
    MoreVertical,
    Link2,
    QrCode,
    Edit,
    Trash2,
    Eye,
    UserCheck,
    ToggleLeft,
    ToggleRight,
    Copy,
    Check,
    Download
} from 'lucide-react';
import { Event } from '@/types';
import { useState } from 'react';

interface OrganizerEventCardProps {
    event: Event;
    index: number;
    onViewDetails: (event: Event) => void;
    onEdit: (event: Event) => void;
    onDelete: (eventId: string) => void;
    onToggleRegistration: (eventId: string) => void;
    onViewRegistrations: (event: Event) => void;
    onCopyLink: (link: string) => void;
    onDownloadQR: (event: Event) => void;
}

const categoryColors: Record<string, { bg: string; text: string; badge: string }> = {
    Technology: { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-500' },
    Cultural: { bg: 'bg-purple-50', text: 'text-purple-700', badge: 'bg-purple-500' },
    Career: { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-500' },
    Sports: { bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-500' },
    Academic: { bg: 'bg-indigo-50', text: 'text-indigo-700', badge: 'bg-indigo-500' },
    Workshop: { bg: 'bg-teal-50', text: 'text-teal-700', badge: 'bg-teal-500' },
    Seminar: { bg: 'bg-pink-50', text: 'text-pink-700', badge: 'bg-pink-500' },
    Other: { bg: 'bg-gray-50', text: 'text-gray-700', badge: 'bg-gray-500' },
};

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
    draft: { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
    upcoming: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
    live: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500 animate-pulse' },
    completed: { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
};

const OrganizerEventCard = ({
    event,
    index,
    onViewDetails,
    onEdit,
    onDelete,
    onToggleRegistration,
    onViewRegistrations,
    onCopyLink,
    onDownloadQR
}: OrganizerEventCardProps) => {
    const [showMenu, setShowMenu] = useState(false);
    const [copied, setCopied] = useState(false);

    const colors = categoryColors[event.category] || categoryColors.Other;
    const status = statusColors[event.status] || statusColors.upcoming;

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

    const handleCopyLink = () => {
        const link = event.registrationLink || `${window.location.origin}/event/${event.id}/register`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        onCopyLink(link);
    };

    const registrationPercentage = Math.min((event.attendees / event.capacity) * 100, 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
        >
            <div className="card-elevated overflow-hidden border border-border/50 h-full hover:shadow-lg transition-shadow duration-300">
                {/* Top color bar */}
                <div className={`h-1.5 ${colors.badge}`} />

                <div className="p-5">
                    {/* Header: Category + Status + Menu */}
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                                {event.category}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </span>
                        </div>

                        {/* More Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                            >
                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                            </button>

                            {showMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowMenu(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-border/50 py-1 z-20"
                                    >
                                        <button
                                            onClick={() => {
                                                onViewDetails(event);
                                                setShowMenu(false);
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => {
                                                onEdit(event);
                                                setShowMenu(false);
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit Event
                                        </button>
                                        <button
                                            onClick={() => {
                                                onViewRegistrations(event);
                                                setShowMenu(false);
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                                        >
                                            <UserCheck className="w-4 h-4" />
                                            View Registrations
                                        </button>
                                        <hr className="my-1 border-border/50" />
                                        <button
                                            onClick={() => {
                                                onDelete(event.id);
                                                setShowMenu(false);
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete Event
                                        </button>
                                    </motion.div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {event.title}
                    </h3>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>
                                {formatTime(event.time)}
                                {event.endTime && ` - ${formatTime(event.endTime)}`}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                        </div>
                    </div>

                    {/* Registration Progress */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1.5">
                            <span className="text-muted-foreground flex items-center gap-1.5">
                                <Users className="w-4 h-4" />
                                Registrations
                            </span>
                            <span className="font-medium text-foreground">
                                {event.attendees} / {event.capacity}
                            </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${registrationPercentage >= 90 ? 'bg-red-500' :
                                        registrationPercentage >= 70 ? 'bg-orange-500' :
                                            'bg-primary'
                                    }`}
                                style={{ width: `${registrationPercentage}%` }}
                            />
                        </div>
                        {event.checkedInCount !== undefined && (
                            <p className="text-xs text-muted-foreground mt-1">
                                {event.checkedInCount} checked in
                            </p>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                        <button
                            onClick={handleCopyLink}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-muted/50 hover:bg-muted text-sm font-medium text-foreground transition-colors"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 text-green-500" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Link2 className="w-4 h-4" />
                                    Copy Link
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => onDownloadQR(event)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-muted/50 hover:bg-muted text-sm font-medium text-foreground transition-colors"
                        >
                            <QrCode className="w-4 h-4" />
                            QR Code
                        </button>
                        <button
                            onClick={() => onToggleRegistration(event.id)}
                            className={`p-2 rounded-lg transition-colors ${event.isRegistrationOpen
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                }`}
                            title={event.isRegistrationOpen ? 'Close Registration' : 'Open Registration'}
                        >
                            {event.isRegistrationOpen ? (
                                <ToggleRight className="w-4 h-4" />
                            ) : (
                                <ToggleLeft className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default OrganizerEventCard;

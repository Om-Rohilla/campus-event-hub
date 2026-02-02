import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Calendar,
    Clock,
    MapPin,
    Users,
    Link2,
    QrCode,
    Copy,
    Check,
    UserCheck,
    UserX,
    Search,
    Download,
    Mail,
    Phone,
    CreditCard,
    Plus,
    Camera,
    Keyboard,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { Event, Registration } from '@/types';
import { getEventRegistrations, checkInRegistration, manualCheckIn, checkInByQR, generateRegistrationLink } from '@/lib/mockData';
import QRCodeDisplay from '@/components/shared/QRCodeDisplay';
import QRScanner from '@/components/shared/QRScanner';
import { toast } from 'sonner';

interface EventDetailsModalProps {
    event: Event | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdate?: () => void;
}

type TabType = 'details' | 'registrations' | 'checkin';

const EventDetailsModal = ({ event, isOpen, onClose, onUpdate }: EventDetailsModalProps) => {
    const [activeTab, setActiveTab] = useState<TabType>('details');
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [copied, setCopied] = useState(false);
    const [manualCheckInData, setManualCheckInData] = useState({ name: '', email: '' });
    const [showManualCheckIn, setShowManualCheckIn] = useState(false);
    const [checkInMode, setCheckInMode] = useState<'scan' | 'manual'>('scan');
    const [scanResult, setScanResult] = useState<{ success: boolean; message: string } | null>(null);
    const [showEventQR, setShowEventQR] = useState(false);

    useEffect(() => {
        if (event && isOpen) {
            const regs = getEventRegistrations(event.id);
            setRegistrations(regs);
        }
    }, [event, isOpen]);

    if (!event || !isOpen) return null;

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

    const handleCopyLink = () => {
        const link = event.registrationLink || `${window.location.origin}/event/${event.id}/register`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCheckIn = (registrationId: string) => {
        const updated = checkInRegistration(registrationId);
        if (updated) {
            setRegistrations(prev =>
                prev.map(r => r.id === registrationId ? updated : r)
            );
            onUpdate?.();
        }
    };

    const handleManualCheckIn = () => {
        if (!manualCheckInData.name || !manualCheckInData.email) return;

        const newReg = manualCheckIn(event.id, manualCheckInData.name, manualCheckInData.email);
        setRegistrations(prev => [...prev, newReg]);
        setManualCheckInData({ name: '', email: '' });
        setShowManualCheckIn(false);
        onUpdate?.();
        toast.success(`${manualCheckInData.name} checked in successfully!`);
    };

    const handleQRScan = (qrData: string) => {
        const result = checkInByQR(qrData);
        setScanResult({ success: result.success, message: result.message });

        if (result.success && result.registration) {
            setRegistrations(prev =>
                prev.map(r => r.id === result.registration!.id ? result.registration! : r)
            );
            onUpdate?.();
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }

        // Clear result after 3 seconds
        setTimeout(() => setScanResult(null), 3000);
    };

    const filteredRegistrations = registrations.filter(r =>
        r.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.studentId && r.studentId.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const checkedInCount = registrations.filter(r => r.checkedIn).length;

    const tabs = [
        { id: 'details' as TabType, label: 'Details' },
        { id: 'registrations' as TabType, label: `Registrations (${registrations.length})` },
        { id: 'checkin' as TabType, label: `Check-in (${checkedInCount})` },
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between px-6 py-4 border-b border-border/50">
                        <div className="flex-1 pr-4">
                            <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                                {event.title}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {event.category} • {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                            <X className="w-5 h-5 text-muted-foreground" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-border/50 px-6">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {activeTab === 'details' && (
                            <div className="space-y-6">
                                {/* Event Info */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                                        <Calendar className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Date</p>
                                            <p className="font-medium text-foreground">{formatDate(event.date)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                                        <Clock className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Time</p>
                                            <p className="font-medium text-foreground">
                                                {formatTime(event.time)}
                                                {event.endTime && ` - ${formatTime(event.endTime)}`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                                        <MapPin className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Location</p>
                                            <p className="font-medium text-foreground">{event.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                                        <Users className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Capacity</p>
                                            <p className="font-medium text-foreground">{event.attendees} / {event.capacity}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Description</h3>
                                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                                </div>

                                {/* Quick Actions */}
                                <div>
                                    <h3 className="font-semibold text-foreground mb-3">Share Event</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={handleCopyLink}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium text-sm"
                                        >
                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            {copied ? 'Copied!' : 'Copy Registration Link'}
                                        </button>
                                        <button
                                            onClick={() => setShowEventQR(!showEventQR)}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted hover:bg-muted/80 transition-colors font-medium text-sm text-foreground"
                                        >
                                            <QrCode className="w-4 h-4" />
                                            {showEventQR ? 'Hide QR Code' : 'Show QR Code'}
                                        </button>
                                    </div>
                                </div>

                                {/* Event QR Code */}
                                {showEventQR && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="border border-border/50 rounded-xl p-6 bg-muted/30"
                                    >
                                        <QRCodeDisplay
                                            data={generateRegistrationLink(event.id)}
                                            title="Event Registration QR"
                                            subtitle="Students can scan this to register"
                                            size={200}
                                        />
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {activeTab === 'registrations' && (
                            <div className="space-y-4">
                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, email or ID..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>

                                {/* Registrations List */}
                                {filteredRegistrations.length > 0 ? (
                                    <div className="space-y-2">
                                        {filteredRegistrations.map(reg => (
                                            <div
                                                key={reg.id}
                                                className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${reg.checkedIn ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
                                                        }`}>
                                                        {reg.checkedIn ? (
                                                            <UserCheck className="w-5 h-5" />
                                                        ) : (
                                                            <UserX className="w-5 h-5" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-foreground">{reg.userName}</p>
                                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                            <span className="flex items-center gap-1">
                                                                <Mail className="w-3 h-3" />
                                                                {reg.userEmail}
                                                            </span>
                                                            {reg.studentId && (
                                                                <span className="flex items-center gap-1">
                                                                    <CreditCard className="w-3 h-3" />
                                                                    {reg.studentId}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    {reg.checkedIn ? (
                                                        <span className="text-xs text-green-600 font-medium">Checked In</span>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">Registered</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        {searchQuery ? 'No matching registrations found' : 'No registrations yet'}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'checkin' && (
                            <div className="space-y-4">
                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center p-4 rounded-xl bg-muted/50">
                                        <p className="text-2xl font-bold text-foreground">{registrations.length}</p>
                                        <p className="text-xs text-muted-foreground">Registered</p>
                                    </div>
                                    <div className="text-center p-4 rounded-xl bg-green-50">
                                        <p className="text-2xl font-bold text-green-600">{checkedInCount}</p>
                                        <p className="text-xs text-green-600">Checked In</p>
                                    </div>
                                    <div className="text-center p-4 rounded-xl bg-orange-50">
                                        <p className="text-2xl font-bold text-orange-600">{registrations.length - checkedInCount}</p>
                                        <p className="text-xs text-orange-600">Pending</p>
                                    </div>
                                </div>

                                {/* Check-in Mode Toggle */}
                                <div className="flex items-center gap-2 p-1 bg-muted rounded-xl">
                                    <button
                                        onClick={() => setCheckInMode('scan')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                            checkInMode === 'scan'
                                                ? 'bg-white shadow-sm text-foreground'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        <Camera className="w-4 h-4" />
                                        Scan QR
                                    </button>
                                    <button
                                        onClick={() => setCheckInMode('manual')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                            checkInMode === 'manual'
                                                ? 'bg-white shadow-sm text-foreground'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        <Keyboard className="w-4 h-4" />
                                        Manual
                                    </button>
                                </div>

                                {/* QR Scanner Mode */}
                                {checkInMode === 'scan' && (
                                    <div className="border border-border/50 rounded-xl p-4">
                                        <h3 className="font-semibold text-foreground mb-4 text-center">Scan Attendee QR Code</h3>

                                        {/* Scan Result */}
                                        {scanResult && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`flex items-center gap-3 p-4 rounded-xl mb-4 ${
                                                    scanResult.success ? 'bg-green-50' : 'bg-red-50'
                                                }`}
                                            >
                                                {scanResult.success ? (
                                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                                ) : (
                                                    <XCircle className="w-6 h-6 text-red-600" />
                                                )}
                                                <p className={`font-medium ${
                                                    scanResult.success ? 'text-green-700' : 'text-red-700'
                                                }`}>
                                                    {scanResult.message}
                                                </p>
                                            </motion.div>
                                        )}

                                        <QRScanner
                                            onScan={handleQRScan}
                                            onError={(error) => toast.error(error)}
                                            isActive={activeTab === 'checkin' && checkInMode === 'scan'}
                                        />
                                    </div>
                                )}

                                {/* Manual Check-in Mode */}
                                {checkInMode === 'manual' && (
                                    <>
                                        {/* Manual Check-in Form */}
                                        <div className="border border-border/50 rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold text-foreground">Add New Attendee</h3>
                                                <button
                                                    onClick={() => setShowManualCheckIn(!showManualCheckIn)}
                                                    className="text-sm text-primary hover:underline flex items-center gap-1"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    {showManualCheckIn ? 'Cancel' : 'Add'}
                                                </button>
                                            </div>

                                            {showManualCheckIn && (
                                                <div className="space-y-3 pt-3 border-t border-border/50">
                                                    <input
                                                        type="text"
                                                        placeholder="Full Name"
                                                        value={manualCheckInData.name}
                                                        onChange={(e) => setManualCheckInData(prev => ({ ...prev, name: e.target.value }))}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                    />
                                                    <input
                                                        type="email"
                                                        placeholder="Email Address"
                                                        value={manualCheckInData.email}
                                                        onChange={(e) => setManualCheckInData(prev => ({ ...prev, email: e.target.value }))}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                    />
                                                    <button
                                                        onClick={handleManualCheckIn}
                                                        disabled={!manualCheckInData.name || !manualCheckInData.email}
                                                        className="w-full py-2.5 rounded-xl bg-primary text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        Check In & Register
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Pending Check-ins List */}
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-3">Pending Check-ins</h3>
                                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                                {registrations.filter(r => !r.checkedIn).map(reg => (
                                                    <div
                                                        key={reg.id}
                                                        className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors"
                                                    >
                                                        <div>
                                                            <p className="font-medium text-foreground">{reg.userName}</p>
                                                            <p className="text-xs text-muted-foreground">{reg.userEmail}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleCheckIn(reg.id)}
                                                            className="px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors text-sm font-medium"
                                                        >
                                                            Check In
                                                        </button>
                                                    </div>
                                                ))}
                                                {registrations.filter(r => !r.checkedIn).length === 0 && (
                                                    <div className="text-center py-8">
                                                        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                                                        <p className="text-muted-foreground text-sm">
                                                            All attendees have been checked in!
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default EventDetailsModal;

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    LogOut,
    Search,
    LayoutDashboard,
    Compass,
    CalendarCheck,
    QrCode,
    User,
    Menu,
    X,
    Calendar,
    Clock,
    MapPin,
    ChevronRight,
    Download,
    Eye
} from 'lucide-react';
import { getCurrentUser, clearCurrentUser, getAllEvents, getUserRegistrations } from '@/lib/mockData';
import { User as UserType, Event, Registration } from '@/types';
import EventCard from '@/components/dashboard/EventCard';
import EmptyState from '@/components/dashboard/EmptyState';
import QRCodeDisplay from '@/components/shared/QRCodeDisplay';
import logo from '@/assets/logo.svg';

type TabType = 'dashboard' | 'explore' | 'registrations' | 'qr-passes' | 'profile';

interface RegistrationWithEvent extends Registration {
    event: Event | null;
}

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserType | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userRegistrations, setUserRegistrations] = useState<RegistrationWithEvent[]>([]);
    const [selectedQR, setSelectedQR] = useState<RegistrationWithEvent | null>(null);

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser || currentUser.role !== 'student') {
            navigate('/');
            return;
        }
        setUser(currentUser);

        // Load all events
        const allEvents = getAllEvents();
        const sortedEvents = allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setEvents(sortedEvents);
        setFilteredEvents(sortedEvents);

        // Load user registrations
        if (currentUser.email) {
            const registrations = getUserRegistrations(currentUser.email);
            setUserRegistrations(registrations);
        }
    }, [navigate]);

    // Filter events
    useEffect(() => {
        let filtered = events;

        if (searchQuery) {
            filtered = filtered.filter(e =>
                e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.organizerName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (categoryFilter !== 'all') {
            filtered = filtered.filter(e => e.category === categoryFilter);
        }

        setFilteredEvents(filtered);
    }, [events, searchQuery, categoryFilter]);

    const handleLogout = () => {
        clearCurrentUser();
        navigate('/');
    };

    const formatDate = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
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

    const menuItems = [
        { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'explore' as TabType, label: 'Explore Events', icon: Compass },
        { id: 'registrations' as TabType, label: 'My Registrations', icon: CalendarCheck },
        { id: 'qr-passes' as TabType, label: 'QR Passes', icon: QrCode },
        { id: 'profile' as TabType, label: 'Profile', icon: User },
    ];

    if (!user) return null;

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white rounded-xl p-4 border border-border/50 shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <CalendarCheck className="w-5 h-5 text-primary" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-foreground">{userRegistrations.length}</p>
                                <p className="text-xs text-muted-foreground">Registered Events</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-border/50 shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                        <Compass className="w-5 h-5 text-green-600" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-foreground">{events.length}</p>
                                <p className="text-xs text-muted-foreground">Available Events</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-border/50 shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <QrCode className="w-5 h-5 text-accent" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-foreground">{userRegistrations.filter(r => !r.checkedIn).length}</p>
                                <p className="text-xs text-muted-foreground">Pending Check-ins</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-border/50 shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-orange-600" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-foreground">{userRegistrations.filter(r => r.checkedIn).length}</p>
                                <p className="text-xs text-muted-foreground">Events Attended</p>
                            </div>
                        </div>

                        {/* Upcoming Registrations */}
                        <div>
                            <h2 className="text-lg font-semibold text-foreground mb-4">Your Upcoming Events</h2>
                            {userRegistrations.length > 0 ? (
                                <div className="space-y-3">
                                    {userRegistrations.slice(0, 3).map((reg) => reg.event && (
                                        <div key={reg.id} className="bg-white rounded-xl p-4 border border-border/50 shadow-sm flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Calendar className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-foreground">{reg.event.title}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {formatDate(reg.event.date)} • {formatTime(reg.event.time)}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setSelectedQR(reg);
                                                    setActiveTab('qr-passes');
                                                }}
                                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                                            >
                                                <QrCode className="w-4 h-4" />
                                                View QR
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl p-8 border border-border/50 text-center">
                                    <CalendarCheck className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                    <p className="text-muted-foreground mb-4">No registered events yet</p>
                                    <button
                                        onClick={() => setActiveTab('explore')}
                                        className="btn-primary px-4 py-2 rounded-lg text-sm"
                                    >
                                        Explore Events
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div>
                            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <button
                                    onClick={() => setActiveTab('explore')}
                                    className="bg-white rounded-xl p-4 border border-border/50 shadow-sm hover:shadow-md transition-shadow text-center"
                                >
                                    <Compass className="w-6 h-6 text-primary mx-auto mb-2" />
                                    <p className="text-sm font-medium text-foreground">Find Events</p>
                                </button>
                                <button
                                    onClick={() => setActiveTab('registrations')}
                                    className="bg-white rounded-xl p-4 border border-border/50 shadow-sm hover:shadow-md transition-shadow text-center"
                                >
                                    <CalendarCheck className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                    <p className="text-sm font-medium text-foreground">My Events</p>
                                </button>
                                <button
                                    onClick={() => setActiveTab('qr-passes')}
                                    className="bg-white rounded-xl p-4 border border-border/50 shadow-sm hover:shadow-md transition-shadow text-center"
                                >
                                    <QrCode className="w-6 h-6 text-accent mx-auto mb-2" />
                                    <p className="text-sm font-medium text-foreground">QR Passes</p>
                                </button>
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className="bg-white rounded-xl p-4 border border-border/50 shadow-sm hover:shadow-md transition-shadow text-center"
                                >
                                    <User className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                                    <p className="text-sm font-medium text-foreground">Profile</p>
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'explore':
                return (
                    <div>
                        {/* Search & Filter */}
                        <div className="mb-6">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search events..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                    />
                                </div>
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="px-4 py-2.5 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Cultural">Cultural</option>
                                    <option value="Career">Career</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Academic">Academic</option>
                                    <option value="Workshop">Workshop</option>
                                    <option value="Seminar">Seminar</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
                        </p>

                        {filteredEvents.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                {filteredEvents.map((event, index) => (
                                    <EventCard key={event.id} event={event} index={index} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                title="No Matching Events"
                                description="Try adjusting your search or filters"
                                icon="calendar"
                            />
                        )}
                    </div>
                );

            case 'registrations':
                return (
                    <div>
                        <p className="text-sm text-muted-foreground mb-4">
                            {userRegistrations.length} {userRegistrations.length === 1 ? 'registration' : 'registrations'}
                        </p>

                        {userRegistrations.length > 0 ? (
                            <div className="space-y-4">
                                {userRegistrations.map((reg) => reg.event && (
                                    <motion.div
                                        key={reg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white rounded-xl border border-border/50 shadow-sm overflow-hidden"
                                    >
                                        <div className="p-4 sm:p-5">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                                            {reg.event.category}
                                                        </span>
                                                        {reg.checkedIn && (
                                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                                Checked In
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="font-semibold text-foreground text-lg mb-2">{reg.event.title}</h3>
                                                    <div className="space-y-1 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{formatDate(reg.event.date)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{formatTime(reg.event.time)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="w-4 h-4" />
                                                            <span>{reg.event.location}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex sm:flex-col gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedQR(reg);
                                                            setActiveTab('qr-passes');
                                                        }}
                                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                                                    >
                                                        <QrCode className="w-4 h-4" />
                                                        View QR
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/event/${reg.eventId}/confirmation`, {
                                                            state: { registration: reg, event: reg.event }
                                                        })}
                                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4 sm:px-5 py-3 bg-muted/30 border-t border-border/50 text-xs text-muted-foreground">
                                            Booking ID: {reg.id.slice(0, 12)} • Registered on {new Date(reg.registeredAt).toLocaleDateString()}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                title="No Registrations Yet"
                                description="Register for events to see them here"
                                icon="calendar"
                                actionLabel="Explore Events"
                                onAction={() => setActiveTab('explore')}
                            />
                        )}
                    </div>
                );

            case 'qr-passes':
                return (
                    <div>
                        {userRegistrations.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {userRegistrations.map((reg) => reg.event && (
                                    <motion.div
                                        key={reg.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white rounded-2xl border border-border/50 shadow-lg overflow-hidden"
                                    >
                                        {/* Event Header */}
                                        <div className="bg-gradient-to-r from-primary to-accent p-4 text-white">
                                            <span className="inline-block px-2 py-0.5 bg-white/20 text-xs font-medium rounded-full mb-2">
                                                {reg.event.category}
                                            </span>
                                            <h3 className="font-semibold text-lg">{reg.event.title}</h3>
                                            <p className="text-white/80 text-sm">{formatDate(reg.event.date)} • {formatTime(reg.event.time)}</p>
                                        </div>

                                        {/* QR Code */}
                                        <div className="p-6 flex flex-col items-center">
                                            <QRCodeDisplay
                                                data={atob(reg.qrCode)}
                                                title=""
                                                size={180}
                                                showActions={true}
                                            />
                                            <p className="text-xs text-muted-foreground mt-4 text-center">
                                                Show this QR code at the venue for check-in
                                            </p>
                                        </div>

                                        {/* Footer */}
                                        <div className="px-4 py-3 bg-muted/30 border-t border-border/50 text-center">
                                            <p className="text-xs text-muted-foreground">
                                                {reg.userName} • {reg.userEmail}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                title="No QR Passes"
                                description="Register for events to get your QR passes"
                                icon="qr"
                                actionLabel="Explore Events"
                                onAction={() => setActiveTab('explore')}
                            />
                        )}
                    </div>
                );

            case 'profile':
                return (
                    <div className="max-w-2xl">
                        <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                            {/* Profile Header */}
                            <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold">{user.name}</h2>
                                        <p className="text-white/80">Student</p>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Details */}
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="text-xs text-muted-foreground uppercase tracking-wide">Email</label>
                                    <p className="text-foreground font-medium">{user.email}</p>
                                </div>
                                {user.studentId && (
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase tracking-wide">Student ID</label>
                                        <p className="text-foreground font-medium">{user.studentId}</p>
                                    </div>
                                )}
                                <div>
                                    <label className="text-xs text-muted-foreground uppercase tracking-wide">Account Created</label>
                                    <p className="text-foreground font-medium">{new Date(user.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="px-6 py-4 bg-muted/30 border-t border-border/50">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-foreground">{userRegistrations.length}</p>
                                        <p className="text-xs text-muted-foreground">Registered</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-foreground">{userRegistrations.filter(r => r.checkedIn).length}</p>
                                        <p className="text-xs text-muted-foreground">Attended</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-foreground">{userRegistrations.filter(r => !r.checkedIn).length}</p>
                                        <p className="text-xs text-muted-foreground">Upcoming</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-surface overflow-x-hidden">
            {/* Mobile Header */}
            <header className="lg:hidden bg-white border-b border-border/50 sticky top-0 z-40">
                <div className="px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                        <Menu className="w-5 h-5 text-foreground" />
                    </button>
                    <img src={logo} alt="EventFlow" className="h-8 w-auto" />
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                        <LogOut className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar - Desktop */}
                <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-border/50">
                    {/* Logo */}
                    <div className="p-6 border-b border-border/50">
                        <img src={logo} alt="EventFlow" className="h-10 w-auto" />
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                    activeTab === item.id
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-border/50">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                            />
                            <motion.aside
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="lg:hidden fixed inset-y-0 left-0 w-64 bg-white z-50 flex flex-col"
                            >
                                {/* Logo */}
                                <div className="p-4 border-b border-border/50 flex items-center justify-between">
                                    <img src={logo} alt="EventFlow" className="h-9 w-auto" />
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                                    >
                                        <X className="w-5 h-5 text-foreground" />
                                    </button>
                                </div>

                                {/* Navigation */}
                                <nav className="flex-1 p-4 space-y-1">
                                    {menuItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setActiveTab(item.id);
                                                setSidebarOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                                activeTab === item.id
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                            }`}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            {item.label}
                                        </button>
                                    ))}
                                </nav>

                                {/* Logout */}
                                <div className="p-4 border-t border-border/50">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-all"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Logout
                                    </button>
                                </div>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <main className="flex-1 lg:ml-64">
                    <div className="p-4 sm:p-6 lg:p-8">
                        {/* Page Header */}
                        <div className="mb-6">
                            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                                {activeTab === 'dashboard' && `Welcome back, ${user.name.split(' ')[0]}!`}
                                {activeTab === 'explore' && 'Explore Events'}
                                {activeTab === 'registrations' && 'My Registrations'}
                                {activeTab === 'qr-passes' && 'QR Passes'}
                                {activeTab === 'profile' && 'My Profile'}
                            </h1>
                            <p className="text-muted-foreground text-sm mt-1">
                                {activeTab === 'dashboard' && 'Here\'s what\'s happening with your events'}
                                {activeTab === 'explore' && 'Discover and register for upcoming campus events'}
                                {activeTab === 'registrations' && 'View all your event registrations'}
                                {activeTab === 'qr-passes' && 'Your QR codes for event check-in'}
                                {activeTab === 'profile' && 'Manage your account settings'}
                            </p>
                        </div>

                        {/* Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentDashboard;

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    LogOut,
    Plus,
    Bell,
    BarChart3,
    Calendar,
    Users,
    TrendingUp,
    CheckCircle,
    Search,
    Filter,
    RefreshCw,
    Home
} from 'lucide-react';
import {
    getCurrentUser,
    clearCurrentUser,
    getOrganizerEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    toggleRegistration
} from '@/lib/mockData';
import { User, Event, CreateEventData } from '@/types';
import OrganizerEventCard from '@/components/dashboard/OrganizerEventCard';
import CreateEventModal from '@/components/dashboard/CreateEventModal';
import EventDetailsModal from '@/components/dashboard/EventDetailsModal';
import EmptyState from '@/components/dashboard/EmptyState';
import { toast } from 'sonner';
import logo from '@/assets/logo.svg';

const OrganizerDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [isLoading, setIsLoading] = useState(true);

    // Modal states
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Load user and events
    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser || currentUser.role !== 'organizer') {
            navigate('/');
            return;
        }
        setUser(currentUser);
        loadEvents(currentUser.id);
    }, [navigate]);

    const loadEvents = useCallback((organizerId: string) => {
        setIsLoading(true);
        // Simulate loading delay
        setTimeout(() => {
            const organizerEvents = getOrganizerEvents(organizerId);
            setEvents(organizerEvents);
            setFilteredEvents(organizerEvents);
            setIsLoading(false);
        }, 300);
    }, []);

    // Filter events based on search and status
    useEffect(() => {
        let filtered = events;

        if (searchQuery) {
            filtered = filtered.filter(e =>
                e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(e => e.status === statusFilter);
        }

        setFilteredEvents(filtered);
    }, [events, searchQuery, statusFilter]);

    const handleLogout = () => {
        clearCurrentUser();
        navigate('/');
    };

    const handleCreateEvent = (data: CreateEventData) => {
        if (!user) return;

        const newEvent = createEvent(data, user);
        setEvents(prev => [newEvent, ...prev]);
        setShowCreateModal(false);
        toast.success('Event created successfully!', {
            description: 'Your event is now live and accepting registrations.'
        });
    };

    const handleEditEvent = (event: Event) => {
        setSelectedEvent(event);
        // For now, we'll just show the details modal
        // In a full implementation, you'd have an edit modal
        setShowDetailsModal(true);
    };

    const handleDeleteEvent = (eventId: string) => {
        if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
            const success = deleteEvent(eventId);
            if (success) {
                setEvents(prev => prev.filter(e => e.id !== eventId));
                toast.success('Event deleted successfully');
            }
        }
    };

    const handleToggleRegistration = (eventId: string) => {
        const updated = toggleRegistration(eventId);
        if (updated) {
            setEvents(prev => prev.map(e => e.id === eventId ? updated : e));
            toast.success(updated.isRegistrationOpen ? 'Registration opened' : 'Registration closed');
        }
    };

    const handleViewDetails = (event: Event) => {
        setSelectedEvent(event);
        setShowDetailsModal(true);
    };

    const handleViewRegistrations = (event: Event) => {
        setSelectedEvent(event);
        setShowDetailsModal(true);
    };

    const handleCopyLink = (link: string) => {
        toast.success('Link copied to clipboard!');
    };

    const handleDownloadQR = async (event: Event) => {
        try {
            const QRCode = await import('qrcode');
            const registrationLink = `${window.location.origin}/event/${event.id}/register`;

            const qrDataUrl = await QRCode.toDataURL(registrationLink, {
                width: 400,
                margin: 2,
                color: { dark: '#000000', light: '#FFFFFF' }
            });

            // Create download link
            const link = document.createElement('a');
            link.download = `${event.title.replace(/\s+/g, '-').toLowerCase()}-qr.png`;
            link.href = qrDataUrl;
            link.click();

            toast.success('QR Code downloaded!', {
                description: `QR code for "${event.title}" has been saved.`
            });
        } catch (error) {
            toast.error('Failed to generate QR code');
        }
    };

    const handleRefresh = () => {
        if (user) {
            loadEvents(user.id);
            toast.success('Events refreshed');
        }
    };

    // Calculate stats
    const stats = {
        totalEvents: events.length,
        totalRegistrations: events.reduce((sum, e) => sum + e.attendees, 0),
        upcomingEvents: events.filter(e => e.status === 'upcoming').length,
        avgAttendance: events.length > 0
            ? Math.round(events.reduce((sum, e) => sum + e.attendees, 0) / events.length)
            : 0
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-surface overflow-x-hidden overflow-y-auto">
            {/* Header */}
            <header className="bg-card border-b border-border/50 sticky top-0 z-40 backdrop-blur-xl bg-card/95">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo - Clickable to go home */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                        >
                            <img src={logo} alt="EventFlow" className="h-10 w-auto" />
                        </button>

                        {/* Actions */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                title="Go to Home"
                            >
                                <Home className="w-5 h-5" />
                                <span className="hidden sm:inline text-sm font-medium">Home</span>
                            </button>
                            <button
                                onClick={handleRefresh}
                                className="p-2 rounded-lg hover:bg-muted transition-colors"
                                title="Refresh"
                            >
                                <RefreshCw className="w-5 h-5 text-muted-foreground" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-muted transition-colors relative">
                                <Bell className="w-5 h-5 text-muted-foreground" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline text-sm font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 sm:mb-8"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1">
                                Welcome back, {user.name.split(' ')[0]}! 👋
                            </h1>
                            <p className="text-muted-foreground">
                                {user.department} • {user.organizerRole === 'teacher' ? 'Faculty' : 'Club Lead'}
                            </p>
                        </div>

                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="btn-primary px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <Plus className="w-5 h-5" />
                            Create Event
                        </button>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
                >
                    <div className="card-elevated p-4 sm:p-5 border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-primary" />
                            </div>
                        </div>
                        <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">{stats.totalEvents}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Total Events</p>
                    </div>

                    <div className="card-elevated p-4 sm:p-5 border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                <Users className="w-5 h-5 text-accent" />
                            </div>
                        </div>
                        <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">{stats.totalRegistrations}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Total Registrations</p>
                    </div>

                    <div className="card-elevated p-4 sm:p-5 border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                        <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">{stats.upcomingEvents}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Upcoming Events</p>
                    </div>

                    <div className="card-elevated p-4 sm:p-5 border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-orange-600" />
                            </div>
                        </div>
                        <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">{stats.avgAttendance}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Avg. Attendance</p>
                    </div>
                </motion.div>

                {/* My Events Section */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-5 sm:mb-6"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-1">
                                    My Events
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Manage and track your events
                                </p>
                            </div>

                            {/* Search and Filter */}
                            <div className="flex items-center gap-3">
                                <div className="relative flex-1 sm:flex-none">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search events..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                    />
                                </div>

                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm cursor-pointer"
                                >
                                    <option value="all">All Status</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="live">Live</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>

                    {/* Events Grid */}
                    {isLoading ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="card-elevated p-5 border border-border/50 animate-pulse">
                                    <div className="h-2 bg-muted rounded mb-4" />
                                    <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                                    <div className="space-y-2">
                                        <div className="h-4 bg-muted rounded w-1/2" />
                                        <div className="h-4 bg-muted rounded w-2/3" />
                                        <div className="h-4 bg-muted rounded w-1/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredEvents.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {filteredEvents.map((event, index) => (
                                <OrganizerEventCard
                                    key={event.id}
                                    event={event}
                                    index={index}
                                    onViewDetails={handleViewDetails}
                                    onEdit={handleEditEvent}
                                    onDelete={handleDeleteEvent}
                                    onToggleRegistration={handleToggleRegistration}
                                    onViewRegistrations={handleViewRegistrations}
                                    onCopyLink={handleCopyLink}
                                    onDownloadQR={handleDownloadQR}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title={searchQuery || statusFilter !== 'all' ? "No Matching Events" : "No Events Yet"}
                            description={
                                searchQuery || statusFilter !== 'all'
                                    ? "Try adjusting your search or filters"
                                    : "Create your first event to get started with EventFlow"
                            }
                            icon="calendar"
                            actionLabel="Create Event"
                            onAction={() => setShowCreateModal(true)}
                        />
                    )}
                </section>
            </main>

            {/* Modals */}
            <CreateEventModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateEvent}
            />

            <EventDetailsModal
                event={selectedEvent}
                isOpen={showDetailsModal}
                onClose={() => {
                    setShowDetailsModal(false);
                    setSelectedEvent(null);
                }}
                onUpdate={() => {
                    if (user) loadEvents(user.id);
                }}
            />
        </div>
    );
};

export default OrganizerDashboard;

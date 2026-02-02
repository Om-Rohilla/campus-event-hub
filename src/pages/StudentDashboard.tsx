import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Search, Home } from 'lucide-react';
import { getCurrentUser, clearCurrentUser, getAllEvents } from '@/lib/mockData';
import { User, Event } from '@/types';
import EventCard from '@/components/dashboard/EventCard';
import EmptyState from '@/components/dashboard/EmptyState';
import logo from '@/assets/logo.svg';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser || currentUser.role !== 'student') {
            navigate('/');
            return;
        }
        setUser(currentUser);

        // Load all events from localStorage (includes mock events)
        const allEvents = getAllEvents();
        // Sort by date, upcoming first
        const sortedEvents = allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setEvents(sortedEvents);
        setFilteredEvents(sortedEvents);
    }, [navigate]);

    // Filter events based on search and category
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

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-surface">
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
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
                        Welcome back, {user.name.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Discover and register for upcoming campus events
                    </p>
                </motion.div>

                {/* Search & Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1 max-w-xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search events by name, location, or organizer..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                            />
                        </div>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
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
                </motion.div>

                {/* Upcoming Events Section */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="font-display text-2xl font-semibold text-foreground mb-1">
                                    {searchQuery || categoryFilter !== 'all' ? 'Search Results' : 'Upcoming Events'}
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Events Grid */}
                    {filteredEvents.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEvents.map((event, index) => (
                                <EventCard key={event.id} event={event} index={index} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title={searchQuery || categoryFilter !== 'all' ? "No Matching Events" : "No Events Yet"}
                            description={
                                searchQuery || categoryFilter !== 'all'
                                    ? "Try adjusting your search or filters"
                                    : "There are no upcoming events at the moment. Check back soon!"
                            }
                            icon="calendar"
                        />
                    )}
                </section>
            </main>
        </div>
    );
};

export default StudentDashboard;

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Search } from 'lucide-react';
import { getCurrentUser, clearCurrentUser, mockEvents } from '@/lib/mockData';
import { User, Event } from '@/types';
import EventCard from '@/components/dashboard/EventCard';
import EmptyState from '@/components/dashboard/EmptyState';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [events] = useState<Event[]>(mockEvents);

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser || currentUser.role !== 'student') {
            navigate('/auth');
            return;
        }
        setUser(currentUser);
    }, [navigate]);

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
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center">
                                <span className="text-primary-foreground font-bold">E</span>
                            </div>
                            <span className="font-display text-xl font-semibold text-foreground">
                                EventFlow
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                                <Bell className="w-5 h-5 text-muted-foreground" />
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

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="relative max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                        />
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
                        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                            Upcoming Events
                        </h2>
                        <p className="text-muted-foreground">
                            {events.length} events happening soon
                        </p>
                    </motion.div>

                    {/* Events Grid */}
                    {events.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event, index) => (
                                <EventCard key={event.id} event={event} index={index} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No Events Yet"
                            description="There are no upcoming events at the moment. Check back soon!"
                            icon="calendar"
                        />
                    )}
                </section>
            </main>
        </div>
    );
};

export default StudentDashboard;

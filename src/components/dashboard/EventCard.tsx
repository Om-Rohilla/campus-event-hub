import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Event } from '@/types';

interface EventCardProps {
    event: Event;
    index?: number;
}

const EventCard = ({ event, index = 0 }: EventCardProps) => {
    const categoryColors = {
        Technology: 'bg-primary',
        Cultural: 'bg-accent',
        Career: 'bg-primary',
        Sports: 'bg-secondary',
        Academic: 'bg-primary',
    };

    const categoryBgColors = {
        Technology: 'bg-primary/10 text-primary',
        Cultural: 'bg-accent/10 text-accent',
        Career: 'bg-primary/10 text-primary',
        Sports: 'bg-secondary/10 text-secondary',
        Academic: 'bg-primary/10 text-primary',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group card-elevated overflow-hidden border border-border/50 h-full"
        >
            {/* Category Banner */}
            <div className={`h-2 ${categoryColors[event.category]}`} />

            <div className="p-5 sm:p-6">
                {/* Category Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${categoryBgColors[event.category]}`}>
                    {event.category}
                </span>

                {/* Title */}
                <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {event.title}
                </h3>

                {/* Event Details */}
                <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{event.attendees} registered</span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-border/50">
                    <button className="w-full py-2.5 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default EventCard;

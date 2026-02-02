import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

const sampleEvents = [
  {
    title: "Tech Innovation Summit 2025",
    date: "Feb 15, 2025",
    time: "10:00 AM",
    location: "Main Auditorium",
    attendees: 234,
    category: "Technology",
    color: "bg-primary",
  },
  {
    title: "Cultural Fest: Harmony",
    date: "Feb 20, 2025",
    time: "4:00 PM",
    location: "Open Ground",
    attendees: 567,
    category: "Cultural",
    color: "bg-accent",
  },
  {
    title: "Career Fair & Networking",
    date: "Feb 25, 2025",
    time: "9:00 AM",
    location: "Conference Hall",
    attendees: 189,
    category: "Career",
    color: "bg-primary",
  },
];

const PreviewSection = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Preview
          </span>
          <h2 className="section-title">
            Upcoming campus events
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            See what's happening on campus. All events, one place.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="card-elevated overflow-hidden border border-border/50 h-full">
                {/* Category banner */}
                <div className={`h-2 ${event.color}`} />
                
                <div className="p-6">
                  {/* Category badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                    event.color === "bg-accent" 
                      ? "bg-accent/10 text-accent" 
                      : "bg-primary/10 text-primary"
                  }`}>
                    {event.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  {/* Event details */}
                  <div className="space-y-3">
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

                  {/* Register button */}
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <button className="w-full py-2.5 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-muted-foreground mt-12"
        >
          These are sample events. Your campus events will appear here once you get started.
        </motion.p>
      </div>
    </section>
  );
};

export default PreviewSection;

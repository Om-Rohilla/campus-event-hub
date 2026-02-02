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
    <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="section-container px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider mb-3 sm:mb-4">
            Preview
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-semibold text-foreground leading-tight mb-3 sm:mb-4">
            Upcoming campus events
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            See what's happening on campus. All events, one place.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                <div className={`h-1.5 sm:h-2 ${event.color}`} />
                
                <div className="p-4 sm:p-5 lg:p-6">
                  {/* Category badge */}
                  <span className={`inline-block px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold mb-3 sm:mb-4 ${
                    event.color === "bg-accent" 
                      ? "bg-accent/10 text-accent" 
                      : "bg-primary/10 text-primary"
                  }`}>
                    {event.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-display text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  {/* Event details */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2.5 sm:gap-3 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3 text-muted-foreground">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{event.attendees} registered</span>
                    </div>
                  </div>

                  {/* Register button */}
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border/50">
                    <button className="w-full py-2 sm:py-2.5 rounded-lg bg-primary/10 text-primary font-medium text-xs sm:text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300">
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
          className="text-center text-xs sm:text-sm text-muted-foreground mt-8 sm:mt-12"
        >
          These are sample events. Your campus events will appear here once you get started.
        </motion.p>
      </div>
    </section>
  );
};

export default PreviewSection;
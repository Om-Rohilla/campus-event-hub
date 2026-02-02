import { motion } from "framer-motion";
import { GraduationCap, Users, Sparkles, BarChart3, QrCode, Bell } from "lucide-react";

const audiences = [
  {
    title: "For Students",
    icon: GraduationCap,
    description: "Never miss an event again. Discover, register, and attend with ease.",
    features: [
      { icon: Sparkles, text: "Discover campus events in one place" },
      { icon: QrCode, text: "Register in seconds, get your QR" },
      { icon: Bell, text: "Enter events with a simple scan" },
    ],
    accent: "accent",
  },
  {
    title: "For Organizers",
    icon: Users,
    description: "Focus on the event, not the paperwork. We handle the logistics.",
    features: [
      { icon: Sparkles, text: "Create events with one form" },
      { icon: BarChart3, text: "Track registrations in real-time" },
      { icon: QrCode, text: "Automated attendance capture" },
    ],
    accent: "primary",
  },
];

const AudienceSection = () => {
  return (
    <section id="audience" className="py-16 sm:py-20 lg:py-28 bg-gradient-surface relative">
      <div className="section-container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider mb-3 sm:mb-4">
            For Everyone
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-semibold text-foreground leading-tight mb-3 sm:mb-4">
            Built for everyone on campus
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're discovering events or organizing them, EventFlow has you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-elevated p-5 sm:p-6 lg:p-8 h-full border border-border/50 relative overflow-hidden">
                {/* Background gradient */}
                <div 
                  className={`absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${
                    audience.accent === "accent" ? "bg-accent" : "bg-primary"
                  }`}
                />
                
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div 
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${
                        audience.accent === "accent" 
                          ? "bg-accent/10" 
                          : "bg-primary/10"
                      }`}
                    >
                      <audience.icon 
                        className={`w-6 h-6 sm:w-7 sm:h-7 ${
                          audience.accent === "accent" 
                            ? "text-accent" 
                            : "text-primary"
                        }`} 
                      />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
                      {audience.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-5 sm:mb-6 lg:mb-8 leading-relaxed">
                    {audience.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 sm:space-y-4">
                    {audience.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature.text}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + featureIndex * 0.1 }}
                        className="flex items-center gap-2.5 sm:gap-3"
                      >
                        <div 
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            audience.accent === "accent" 
                              ? "bg-accent/10" 
                              : "bg-primary/10"
                          }`}
                        >
                          <feature.icon 
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                              audience.accent === "accent" 
                                ? "text-accent" 
                                : "text-primary"
                            }`} 
                          />
                        </div>
                        <span className="text-sm sm:text-base text-foreground font-medium">
                          {feature.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
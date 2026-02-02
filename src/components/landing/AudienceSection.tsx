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
    <section id="audience" className="py-24 lg:py-32 bg-gradient-surface relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            For Everyone
          </span>
          <h2 className="section-title">
            Built for everyone on campus
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Whether you're discovering events or organizing them, EventFlow has you covered.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-elevated p-8 lg:p-10 h-full border border-border/50 relative overflow-hidden">
                {/* Background gradient */}
                <div 
                  className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${
                    audience.accent === "accent" ? "bg-accent" : "bg-primary"
                  }`}
                />
                
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        audience.accent === "accent" 
                          ? "bg-accent/10" 
                          : "bg-primary/10"
                      }`}
                    >
                      <audience.icon 
                        className={`w-7 h-7 ${
                          audience.accent === "accent" 
                            ? "text-accent" 
                            : "text-primary"
                        }`} 
                      />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      {audience.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {audience.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-4">
                    {audience.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature.text}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + featureIndex * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div 
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            audience.accent === "accent" 
                              ? "bg-accent/10" 
                              : "bg-primary/10"
                          }`}
                        >
                          <feature.icon 
                            className={`w-4 h-4 ${
                              audience.accent === "accent" 
                                ? "text-accent" 
                                : "text-primary"
                            }`} 
                          />
                        </div>
                        <span className="text-foreground font-medium">
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

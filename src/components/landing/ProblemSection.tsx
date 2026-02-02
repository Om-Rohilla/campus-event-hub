import { motion } from "framer-motion";
import { MessageSquare, ClipboardList, UserX } from "lucide-react";

const problems = [
  {
    icon: MessageSquare,
    title: "Scattered Information",
    description:
      "Event info lives across WhatsApp groups, posters, and word of mouth. Students miss important details.",
  },
  {
    icon: ClipboardList,
    title: "Manual Everything",
    description:
      "Registrations tracked in spreadsheets, attendance taken by hand. Organizers drown in admin work.",
  },
  {
    icon: UserX,
    title: "Lost Control",
    description:
      "No real-time visibility. Who registered? Who showed up? Organizers are always guessing.",
  },
];

const ProblemSection = () => {
  return (
    <section id="problem" className="py-24 lg:py-32 bg-gradient-surface relative">
      {/* Subtle decorative element */}
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
            The Problem
          </span>
          <h2 className="section-title">
            Campus events are harder{" "}
            <br className="hidden sm:block" />
            than they should be
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-elevated p-8 h-full border border-border/50">
                <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <problem.icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

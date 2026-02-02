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
    <section id="problem" className="py-16 sm:py-20 lg:py-28 bg-gradient-surface relative">
      <div className="section-container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider mb-3 sm:mb-4">
            The Problem
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-semibold text-foreground leading-tight">
            Campus events are harder{" "}
            <br className="hidden sm:block" />
            than they should be
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-elevated p-5 sm:p-6 lg:p-8 h-full border border-border/50">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <problem.icon className="w-6 h-6 sm:w-7 sm:h-7 text-destructive" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                  {problem.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
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
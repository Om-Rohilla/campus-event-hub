import { motion } from "framer-motion";
import { FileText, QrCode, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Create Your Event",
    description:
      "Fill out one simple form. Add event details, timing, venue, and capacity. Done in minutes.",
  },
  {
    icon: QrCode,
    title: "Share & Register",
    description:
      "Platform auto-generates registration link and unique QR codes. Students register in seconds.",
  },
  {
    icon: CheckCircle,
    title: "Scan & Track",
    description:
      "QR scan at entry marks attendance automatically. Real-time dashboard shows who's in.",
  },
];

const SolutionSection = () => {
  return (
    <section id="solution" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl hidden sm:block" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl hidden sm:block" />
      
      <div className="section-container px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider mb-3 sm:mb-4">
            The Solution
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-semibold text-foreground leading-tight mb-3 sm:mb-4">
            One simple flow.{" "}
            <span className="text-gradient-gold">End-to-end automation.</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            From creation to completion, EventFlow handles everything automatically.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Content card */}
              <div className="card-elevated p-5 sm:p-6 border border-border/50">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
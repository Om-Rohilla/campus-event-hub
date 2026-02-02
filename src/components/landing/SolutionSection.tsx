import { motion } from "framer-motion";
import { FileText, QrCode, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Create Your Event",
    description:
      "Fill out one simple form. Add event details, timing, venue, and capacity. Done in minutes.",
  },
  {
    number: "02",
    icon: QrCode,
    title: "Share & Register",
    description:
      "Platform auto-generates registration link and unique QR codes. Students register in seconds.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Scan & Track",
    description:
      "QR scan at entry marks attendance automatically. Real-time dashboard shows who's in.",
  },
];

const SolutionSection = () => {
  return (
    <section id="solution" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            The Solution
          </span>
          <h2 className="section-title">
            One simple flow.{" "}
            <span className="text-gradient-gold">End-to-end automation.</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            From creation to completion, EventFlow handles everything automatically.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line - desktop only */}
          <div className="hidden lg:block absolute top-24 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-primary/20 via-accent/40 to-primary/20" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step indicator */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-display font-bold text-lg z-10 relative">
                      {step.number}
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg" />
                  </div>
                  
                  {/* Arrow to next step - desktop only */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex items-center flex-1">
                      <div className="flex-1" />
                      <ArrowRight className="w-5 h-5 text-accent absolute -right-6 top-1/2 -translate-y-1/2" />
                    </div>
                  )}
                </div>

                {/* Content card */}
                <div className="card-elevated p-6 border border-border/50 h-[calc(100%-4rem)]">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;

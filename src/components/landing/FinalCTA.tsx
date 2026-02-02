import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

const FinalCTA = () => {
  return (
    <section id="cta" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden bg-muted/30">
      <div className="section-container px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl lg:max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
            Start using EventFlow{" "}
            <span className="text-accent">today</span>
          </h2>
          
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed px-2">
            Join students and organizers already using EventFlow to run seamless campus events.
          </p>

          {/* CTA Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto px-4 sm:px-0"
          >
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <input
                type="email"
                placeholder="Enter your college email"
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-card text-foreground text-sm sm:text-base border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              />
            </div>
            <button className="btn-primary w-full sm:w-auto whitespace-nowrap py-3 sm:py-4 px-6 sm:px-8 group text-sm sm:text-base">
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6"
          >
            Get started in under 2 minutes.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
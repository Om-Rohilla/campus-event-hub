import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

const FinalCTA = () => {
  return (
    <section id="cta" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      <div className="section-container px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl lg:max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-primary-foreground/90">
              Free for campus communities
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight mb-4 sm:mb-6">
            Start using EventFlow{" "}
            <span className="text-accent">today</span>
          </h2>
          
          <p className="text-sm sm:text-base lg:text-lg text-primary-foreground/80 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed px-2">
            Join hundreds of students and organizers already using EventFlow to run seamless campus events.
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
                placeholder="Enter your email"
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-card text-foreground text-sm sm:text-base border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              />
            </div>
            <button className="btn-primary w-full sm:w-auto whitespace-nowrap py-3 sm:py-4 px-6 sm:px-8 group text-sm sm:text-base">
              Sign Up Free
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs sm:text-sm text-primary-foreground/60 mt-4 sm:mt-6"
          >
            No credit card required. Get started in under 2 minutes.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
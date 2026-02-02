import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { BackgroundPlus } from "@/components/ui/background-plus";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Plus pattern background */}
      <BackgroundPlus 
        className="absolute inset-0"
        plusColor="#4a4a4a"
        plusSize={48}
        fade={true}
        style={{ opacity: 0.5 }}
      />
      
      {/* Subtle accent glows */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Now live at IILM campuses
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] mb-6"
          >
            Run campus events{" "}
            <span className="relative">
              <span className="text-gradient-gold">without chaos</span>
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2 8C50 4 150 2 298 8"
                  stroke="hsl(var(--accent))"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Create events once. Registration, QR entry, and attendance—automated.
            The complete platform for campus event management.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#cta" className="btn-primary group">
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#solution" className="btn-secondary group">
              <Play className="w-4 h-4" />
              How It Works
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 pt-8"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by campus communities
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2 text-muted-foreground/60">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="font-display font-bold text-primary text-sm">100+</span>
                </div>
                <span className="text-sm">Events Hosted</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground/60">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="font-display font-bold text-primary text-sm">5K+</span>
                </div>
                <span className="text-sm">Students</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground/60">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="font-display font-bold text-primary text-sm">98%</span>
                </div>
                <span className="text-sm">Satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

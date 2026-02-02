import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import collegeBuilding from "@/assets/college-building.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* College Building Background - Crystal Clear */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={collegeBuilding} 
          alt="College Campus" 
          className="w-full h-full object-cover object-center"
        />
        {/* Very light overlay - just enough for text readability */}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-16">
        <div className="flex flex-col items-center text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/90 shadow-lg mb-10"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-foreground tracking-wide">
              Now live at IILM campuses
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[1.1] mb-8"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.4)' }}
          >
            <span className="text-white">Run campus events</span>
            <br />
            <span className="text-accent italic">without chaos</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
          >
            Create events once. Registration, QR entry, and attendance—automated.
            <br className="hidden sm:block" />
            The complete platform for campus event management.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <a 
              href="#cta" 
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold rounded-full bg-accent text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="#solution" 
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold rounded-full bg-white/90 text-foreground shadow-lg hover:bg-white transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              How It Works
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-20 pt-8 border-t border-white/10 w-full max-w-2xl"
          >
            <p className="text-sm text-white/60 mb-6 uppercase tracking-widest font-medium">
              Trusted by campus communities
            </p>
            <div className="flex items-center justify-center gap-10 sm:gap-16">
              <div className="flex flex-col items-center gap-1">
                <span className="text-3xl sm:text-4xl font-display font-bold text-white">100+</span>
                <span className="text-sm text-white/70">Events Hosted</span>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-3xl sm:text-4xl font-display font-bold text-white">5K+</span>
                <span className="text-sm text-white/70">Students</span>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-3xl sm:text-4xl font-display font-bold text-white">98%</span>
                <span className="text-sm text-white/70">Satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
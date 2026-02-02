import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import campusVideo from "@/assets/campus-life.mp4";
import { useAuthModal } from "@/contexts/AuthModalContext";

const Hero = () => {
  const { openAuth } = useAuthModal();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video Container - Contained Size */}
      <div className="absolute inset-2 sm:inset-4 md:inset-6 lg:inset-8 xl:inset-10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'none',
            imageRendering: 'crisp-edges',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        >
          <source src={campusVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-lg mb-6 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-foreground tracking-wide">
              Now live at IILM campuses
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight sm:leading-[1.1] mb-4 sm:mb-6"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
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
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light px-2"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
          >
            Create events once. Registration, QR entry, and attendance—automated.
            The complete platform for campus event management.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <button
              onClick={openAuth}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-full bg-accent text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#solution"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-full bg-white/90 text-foreground shadow-lg hover:bg-white transition-all duration-300"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              How It Works
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/20 w-full max-w-xl"
          >
            <p className="text-xs sm:text-sm text-white/70 mb-4 sm:mb-6 uppercase tracking-widest font-medium">
              Trusted by campus communities
            </p>
            <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-16">
              <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                <span className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white">100+</span>
                <span className="text-xs sm:text-sm text-white/70">Events</span>
              </div>
              <div className="w-px h-8 sm:h-12 bg-white/20" />
              <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                <span className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white">5K+</span>
                <span className="text-xs sm:text-sm text-white/70">Students</span>
              </div>
              <div className="w-px h-8 sm:h-12 bg-white/20" />
              <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                <span className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white">98%</span>
                <span className="text-xs sm:text-sm text-white/70">Satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
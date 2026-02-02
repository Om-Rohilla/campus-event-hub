import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-8 sm:py-10 lg:py-12 bg-background">
      <div className="section-container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 sm:gap-8"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs sm:text-sm">E</span>
            </div>
            <span className="font-display text-lg sm:text-xl font-semibold text-foreground">
              EventFlow
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
            <a
              href="#problem"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Why EventFlow
            </a>
            <a
              href="#solution"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="#audience"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              For You
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            © 2025 EventFlow. Built for campus communities.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              EventFlow
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a
              href="#problem"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Why EventFlow
            </a>
            <a
              href="#solution"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="#audience"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              For You
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2025 EventFlow. Built for campus communities.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

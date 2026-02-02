import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-card/90 backdrop-blur-xl rounded-full px-4 lg:px-6 shadow-lg border border-border/50">
        <div className="flex items-center justify-center gap-6 lg:gap-8 h-14 lg:h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              EventFlow
            </span>
          </a>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#problem"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Why EventFlow
            </a>
            <a
              href="#solution"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="#audience"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              For You
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#cta" className="btn-primary text-sm rounded-full px-5 py-2">
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-border/50"
        >
          <div className="flex flex-col gap-3">
            <a
              href="#problem"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted/50"
              onClick={() => setIsOpen(false)}
            >
              Why EventFlow
            </a>
            <a
              href="#solution"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted/50"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#audience"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted/50"
              onClick={() => setIsOpen(false)}
            >
              For You
            </a>
            <a href="#cta" className="btn-primary text-sm w-full text-center rounded-full mt-2" onClick={() => setIsOpen(false)}>
              Get Started
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

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
      className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-auto max-w-[95vw]"
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-full px-4 sm:px-6 py-2 shadow-lg border border-border/30">
        <div className="flex items-center justify-between sm:justify-center gap-4 sm:gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm sm:text-base">E</span>
            </div>
            <span className="font-display text-lg sm:text-xl font-semibold text-foreground">
              EventFlow
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <a
              href="#problem"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              Why EventFlow
            </a>
            <a
              href="#solution"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              How It Works
            </a>
            <a
              href="#audience"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              For You
            </a>
          </div>

          {/* CTA Button */}
          <a href="#cta" className="hidden md:inline-flex btn-primary text-sm rounded-full px-4 lg:px-5 py-2 shrink-0">
            Get Started
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground -mr-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-border/30"
        >
          <div className="flex flex-col gap-1">
            <a
              href="#problem"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-3 rounded-lg hover:bg-muted/50"
              onClick={() => setIsOpen(false)}
            >
              Why EventFlow
            </a>
            <a
              href="#solution"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-3 rounded-lg hover:bg-muted/50"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#audience"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-3 rounded-lg hover:bg-muted/50"
              onClick={() => setIsOpen(false)}
            >
              For You
            </a>
            <a 
              href="#cta" 
              className="btn-primary text-sm w-full text-center rounded-full mt-2" 
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
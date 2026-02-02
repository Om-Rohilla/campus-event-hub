import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Detect active section
      const sections = ["problem", "solution", "audience", "cta"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#problem", label: "Why EventFlow", id: "problem" },
    { href: "#solution", label: "How It Works", id: "solution" },
    { href: "#audience", label: "For You", id: "audience" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50"
      >

        <div className="flex justify-center px-4 pt-4">
          {/* Unified Navbar Container */}
          <div className="hidden md:flex items-center gap-6 bg-gray-100 rounded-full px-3 py-2 shadow-lg">
            {/* Logo */}
            <a href="#" className="flex items-center group pl-2">
              <img
                src={logo}
                alt="EventFlow Logo"
                className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </a>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-300" />

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-300"
                >
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-white rounded-full shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      activeSection === link.id
                        ? "text-primary"
                        : "text-gray-600 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-300" />

            {/* CTA Button */}
            <a
              href="#cta"
              className="group relative inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white overflow-hidden rounded-full transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full transition-transform duration-500 group-hover:scale-105" />
              <span className="relative z-10">Get Started</span>
              <Sparkles className="relative z-10 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </div>

          {/* Mobile Navbar */}
          <div className="flex md:hidden items-center justify-between w-full bg-gray-100 rounded-full px-3 py-2 shadow-lg">
            {/* Logo */}
            <a href="#" className="flex items-center pl-1">
              <img
                src={logo}
                alt="EventFlow Logo"
                className="h-12 w-auto object-contain"
              />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-gray-50 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} className="text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} className="text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-50 md:hidden shadow-2xl"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 to-transparent" />

              <div className="relative h-full flex flex-col p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <img
                      src={logo}
                      alt="EventFlow Logo"
                      className="h-14 w-auto object-contain"
                    />
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <X size={18} className="text-foreground" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                        activeSection === link.id
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activeSection === link.id ? "bg-accent" : "bg-muted-foreground/30"
                        }`}
                      />
                      {link.label}
                    </motion.a>
                  ))}
                </nav>

                {/* Spacer */}
                <div className="flex-1" />

                {/* CTA Button */}
                <motion.a
                  href="#cta"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-accent to-primary text-white font-semibold rounded-xl shadow-lg"
                >
                  Get Started
                  <Sparkles className="w-4 h-4" />
                </motion.a>

                {/* Footer text */}
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Now live at IILM campuses
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Home, Briefcase, Code, Layers, GraduationCap, FileText } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  variant?: "default" | "light";
}

export default function Navbar({ variant = "default" }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Experience", href: "/experience", icon: Briefcase },
    { name: "Education", href: "/education", icon: GraduationCap },
    { name: "Projects", href: "/projects", icon: Code },
    { name: "Literature", href: "/literature", icon: FileText },
    { name: "Tech Stack", href: "/tech-stack", icon: Layers }
  ];

  const isActive = (href: string) => pathname === href;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldBeScrolled = scrollPosition > 100;
      
      // Close mobile menu when transitioning between navbar states
      if (shouldBeScrolled !== isScrolled && isMenuOpen) {
        setIsMenuOpen(false);
      }
      
      setIsScrolled(shouldBeScrolled);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled, isMenuOpen]);

  return (
    <>
      {/* Regular Navbar */}
      <motion.nav
        initial={{ opacity: 0.8, y: 0 }}
        animate={{ 
          opacity: isScrolled ? 0 : 1,
          y: isScrolled ? -100 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`relative w-full z-50 ${
          variant === "light" 
            ? "bg-white/80 backdrop-blur-md border-b border-gray-200" 
            : "bg-background/90 backdrop-blur-sm"
        } ${isScrolled ? "pointer-events-none" : ""}`}
      >
        <div className="w-full">
          {/* Main Navbar */}
          <div className="py-4 px-6">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={closeMenu}>
                <motion.div
                  className={`text-2xl font-bold font-playfair cursor-pointer ${
                    variant === "light" ? "text-gray-900" : "text-primary"
                  }`}
                >
                  Harry Barnish
                </motion.div>
              </Link>
              
              <div className="flex items-center space-x-6">
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  {navigationItems.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <motion.div
                        className={`cursor-pointer transition-colors font-merriweather ${
                          isActive(item.href)
                            ? variant === "light"
                              ? "text-blue-600 font-semibold"
                              : "text-primary font-semibold"
                            : variant === "light"
                              ? "text-gray-600 hover:text-orange-600"
                              : "text-foreground/70 hover:text-primary"
                        }`}
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  ))}
                </div>
                
                {/* Theme Toggle */}
                <ThemeToggle />
                
                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMenu}
                  className={`md:hidden p-2 rounded-lg transition-colors ${
                    variant === "light"
                      ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      : "text-foreground/70 hover:text-foreground hover:bg-foreground/10"
                  }`}
                  aria-label="Toggle menu"
                >
                  <motion.div
                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </motion.div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMenuOpen && !isScrolled && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`md:hidden overflow-hidden ${
                  variant === "light"
                    ? "bg-white/95 backdrop-blur-md border-t border-gray-200"
                    : "bg-background/95 backdrop-blur-sm border-t border-border/50"
                }`}
              >
                <div className="py-4">
                  {navigationItems.map((item, index) => (
                    <Link key={item.name} href={item.href} onClick={closeMenu}>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className={`block px-6 py-3 text-lg font-merriweather transition-colors ${
                          isActive(item.href)
                            ? variant === "light"
                              ? "text-blue-600 font-semibold bg-blue-50/50"
                              : "text-primary font-semibold bg-primary/10"
                            : variant === "light"
                              ? "text-gray-700 hover:text-orange-600"
                              : "text-foreground/80 hover:text-primary"
                        }`}
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Floating Pill Navbar */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 400, damping: 30 }}
            className="fixed left-1/2 transform -translate-x-1/2 z-50"
            style={{ top: 'max(10px, env(safe-area-inset-top, 0px) + 0px)' }}
          >
            <div className={`
              px-8 py-3 rounded-full shadow-lg border backdrop-blur-md min-w-[800px] max-w-6xl hidden sm:flex
              ${variant === "light" 
                ? "bg-white/50 border-gray-200/20 shadow-gray-200/5" 
                : "bg-background/50 border-border/20 shadow-black/5"
              }
            `}>
              <div className="flex items-center justify-between w-full">
                {/* Left side - Name */}
                <div className="flex items-center">
                  <div className={`text-lg font-semibold font-playfair ${
                    variant === "light" ? "text-gray-900" : "text-primary"
                  }`}>
                    Harry Barnish
                  </div>
                </div>

                {/* Center/Right side - Navigation Links */}
                <div className="flex items-center space-x-3">
                  {/* Desktop Navigation Text Links */}
                  <div className="flex items-center space-x-1">
                    {navigationItems.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <motion.div
                          whileTap={{ scale: 0.95 }}
                          className={`
                            px-3 py-1.5 rounded-full transition-all duration-200 text-sm font-medium font-merriweather
                            ${isActive(item.href)
                              ? variant === "light"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-primary/20 text-primary"
                              : variant === "light"
                                ? "hover:bg-orange-50 text-gray-600"
                                : "hover:bg-orange-500/10 text-foreground/70"
                            }
                          `}
                        >
                          {item.name}
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                  
                  {/* Divider */}
                  <div className={`w-px h-6 ${
                    variant === "light" ? "bg-gray-300" : "bg-border"
                  }`} />
                  
                  {/* Theme Toggle */}
                  <ThemeToggle />
                </div>
              </div>
            </div>

            {/* Mobile Floating Pill - Compact Design */}
            <div className={`
              px-4 py-2.5 rounded-full shadow-lg border backdrop-blur-md
              ${variant === "light" 
                ? "bg-white/50 border-gray-200/20 shadow-gray-200/5" 
                : "bg-background/50 border-border/20 shadow-black/5"
              }
              sm:hidden flex items-center justify-center space-x-2 min-w-[240px]
            `}>
              {/* All navigation icons for mobile */}
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    p-2 rounded-full transition-colors
                    ${isActive("/")
                      ? variant === "light"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-primary/20 text-primary"
                      : variant === "light"
                        ? "text-gray-600 hover:bg-orange-50"
                        : "text-foreground/70 hover:bg-orange-500/10"
                    }
                  `}
                >
                  <Home className="h-4 w-4" />
                </motion.div>
              </Link>
              
              <Link href="/experience">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    p-2 rounded-full transition-colors
                    ${isActive("/experience")
                      ? variant === "light"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-primary/20 text-primary"
                      : variant === "light"
                        ? "text-gray-600 hover:bg-orange-50"
                        : "text-foreground/70 hover:bg-orange-500/10"
                    }
                  `}
                >
                  <Briefcase className="h-4 w-4" />
                </motion.div>
              </Link>

              <Link href="/projects">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    p-2 rounded-full transition-colors
                    ${isActive("/projects")
                      ? variant === "light"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-primary/20 text-primary"
                      : variant === "light"
                        ? "text-gray-600 hover:bg-orange-50"
                        : "text-foreground/70 hover:bg-orange-500/10"
                    }
                  `}
                >
                  <Code className="h-4 w-4" />
                </motion.div>
              </Link>

              <Link href="/education">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    p-2 rounded-full transition-colors
                    ${isActive("/education")
                      ? variant === "light"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-primary/20 text-primary"
                      : variant === "light"
                        ? "text-gray-600 hover:bg-orange-50"
                        : "text-foreground/70 hover:bg-orange-500/10"
                    }
                  `}
                >
                  <GraduationCap className="h-4 w-4" />
                </motion.div>
              </Link>

              <Link href="/literature">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    p-2 rounded-full transition-colors
                    ${isActive("/literature")
                      ? variant === "light"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-primary/20 text-primary"
                      : variant === "light"
                        ? "text-gray-600 hover:bg-orange-50"
                        : "text-foreground/70 hover:bg-orange-500/10"
                    }
                  `}
                >
                  <FileText className="h-4 w-4" />
                </motion.div>
              </Link>

              <Link href="/tech-stack">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    p-2 rounded-full transition-colors
                    ${isActive("/tech-stack")
                      ? variant === "light"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-primary/20 text-primary"
                      : variant === "light"
                        ? "text-gray-600 hover:bg-orange-50"
                        : "text-foreground/70 hover:bg-orange-500/10"
                    }
                  `}
                >
                  <Layers className="h-4 w-4" />
                </motion.div>
              </Link>
              
              {/* Divider */}
              <div className={`w-px h-5 ${
                variant === "light" ? "bg-gray-300" : "bg-border"
              }`} />
              
              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 
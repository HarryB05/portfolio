"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  variant?: "default" | "light";
}

export default function Navbar({ variant = "default" }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Experience", href: "/experience" },
    { name: "Projects", href: "/projects" },
    { name: "Tech Stack", href: "/tech-stack" }
  ];

  const isActive = (href: string) => pathname === href;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`fixed top-0 w-full z-50 ${
          variant === "light" 
            ? "bg-white/80 backdrop-blur-md border-b border-gray-200" 
            : "bg-background/90 backdrop-blur-sm"
        }`}
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
                        whileHover={{ y: -1 }}
                        className={`cursor-pointer transition-colors font-merriweather ${
                          isActive(item.href)
                            ? variant === "light"
                              ? "text-blue-600 font-semibold"
                              : "text-primary font-semibold"
                            : variant === "light"
                              ? "text-gray-600 hover:text-gray-900"
                              : "text-foreground/70 hover:text-foreground"
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
            {isMenuOpen && (
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
                              ? "text-gray-700 hover:text-gray-900 hover:bg-gray-50/50"
                              : "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
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

      {/* Invisible Click-Outside Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ top: '100px' }} // Start below the navbar
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
} 
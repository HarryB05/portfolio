"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  variant?: "default" | "light";
}

export default function Navbar({ variant = "default" }: NavbarProps) {
  const pathname = usePathname();
  
  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Experience", href: "/experience" },
    { name: "Projects", href: "/projects" },
    { name: "Tech Stack", href: "/tech-stack" }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 ${
        variant === "light" 
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200" 
          : "bg-background/90 backdrop-blur-sm"
      }`}
    >
      <div className="w-full py-4 px-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`text-2xl font-bold font-playfair cursor-pointer ${
                variant === "light" ? "text-gray-900" : "text-primary"
              }`}
            >
              Harry Barnish
            </motion.div>
          </Link>
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
        </div>
      </div>
    </motion.nav>
  );
} 
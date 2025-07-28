"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/yourusername",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/yourusername",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:your.email@example.com",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-sm"
      >
        <div className="w-full py-6 px-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-primary font-playfair cursor-pointer"
              >
                Harry Barnish
              </motion.div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: "Home", href: "/" },
                { name: "Experience", href: "/experience" },
                { name: "Projects", href: "/projects" },
                { name: "Tech Stack", href: "/tech-stack" }
              ].map((item) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ y: -1 }}
                    className="text-foreground/70 hover:text-foreground cursor-pointer transition-colors font-merriweather"
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen px-6 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-8 text-foreground font-playfair"
            >
              Hi, I'm Harry
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed font-merriweather"
            >
              Computer Science student passionate about building innovative solutions and creating impactful projects.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors font-merriweather"
            >
              View Projects
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border border-primary/30 text-primary px-8 py-4 rounded-lg font-medium hover:bg-primary/10 transition-colors font-merriweather"
            >
              Tech Stack
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center gap-2"
          >
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-foreground/70"
                title={social.name}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center bg-background/90 backdrop-blur-sm border-t border-border/20">
        <p className="text-foreground/60 text-sm font-merriweather">
          Built by Harry Barnish
        </p>
      </footer>
    </div>
  );
}

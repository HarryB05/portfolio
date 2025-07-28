"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0.8 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0.7, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/HarryB05",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/harry-barnish",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen px-6 pt-16">
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
              Hi, I&apos;m Harry
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed font-merriweather"
            >
              Computer Science and Management student at Queen Mary University of London, focused on software development, data systems, and technology-driven business solutions.
            </motion.p>
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

      <Footer />
    </div>
  );
}

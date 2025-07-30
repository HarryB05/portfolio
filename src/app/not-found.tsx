"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      
      <div 
        className="relative flex items-start justify-center min-h-[calc(100vh-200px)] pt-16"
      >
        {/* Main content */}
        <div className="text-center px-6 max-w-4xl mx-auto">
          {/* 404 text */}
          <motion.div
            className="relative mb-8"
          >
            <motion.h1 
              className="text-9xl md:text-[12rem] font-playfair font-bold text-primary relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              404
            </motion.h1>
          </motion.div>

          {/* Interactive message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4 text-foreground">
              Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl font-merriweather text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for seems to have vanished into the digital void. 
              But don't worry, let's get you back to where you need to be.
            </p>
          </motion.div>



          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/">
              <button
                className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-merriweather font-medium text-lg shadow-lg"
              >
                <Home className="w-5 h-5" />
                Take Me Home
              </button>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-3 px-8 py-4 bg-secondary text-foreground rounded-full font-merriweather font-medium text-lg border border-border"
            >
              <RotateCcw className="w-5 h-5" />
              Go Back
            </button>
          </motion.div>




        </div>
      </div>
      
      <Footer />
    </div>
  );
}
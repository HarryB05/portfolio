"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const themes = [
    { name: 'light', icon: Sun, label: 'Light' },
    { name: 'dark', icon: Moon, label: 'Dark' },
    { name: 'system', icon: Monitor, label: 'System' },
  ] as const;

  const currentThemeIndex = themes.findIndex(t => t.name === theme);
  const nextTheme = themes[(currentThemeIndex + 1) % themes.length];

  const handleToggle = () => {
    setIsAnimating(true);
    setTheme(nextTheme.name);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const IconComponent = themes[currentThemeIndex]?.icon || Sun;

  return (
    <motion.button
      onClick={handleToggle}
      className="relative p-2 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${nextTheme.label} theme`}
      aria-label={`Current theme: ${themes[currentThemeIndex]?.label || 'Light'}. Click to switch to ${nextTheme.label} theme.`}
    >
      <AnimatePresence mode="wait">
        {isAnimating ? (
          <motion.div
            key={`${theme}-animating`}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <IconComponent className="w-5 h-5 text-foreground" />
          </motion.div>
        ) : (
          <motion.div
            key={`${theme}-static`}
            initial={{ opacity: 1, rotate: 0 }}
            animate={{ opacity: 1, rotate: 0 }}
          >
            <IconComponent className="w-5 h-5 text-foreground" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}; 
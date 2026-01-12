"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function TechStack() {
  useEffect(() => {
    document.title = "Harry Barnish - Skills";
  }, []);

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

  // Calculate years of experience from start year
  const calculateYears = (startYear: string): number => {
    const currentYear = 2025;
    const start = parseInt(startYear);
    return Math.max(1, currentYear - start);
  };

  // Calculate progress percentage based on max years in the category
  const calculateProgress = (years: number, maxYearsInCategory: number): number => {
    if (maxYearsInCategory === 0) return 0;
    return Math.min(100, (years / maxYearsInCategory) * 100);
  };

  // Format years text
  const formatYears = (years: number): string => {
    return `${years}+ years`;
  };

  const techCategories = [
    {
      title: "Languages",
      items: [
        { name: "Python", years: "2017" },
        { name: "HTML5", years: "2018" },
        { name: "CSS3", years: "2018" },
        { name: "C", years: "2022" },
        { name: "C++", years: "2022" },
        { name: "SQL", years: "2023" },
        { name: "JavaScript", years: "2024" },
        { name: "Java", years: "2024" },
        { name: "Bash", years: "2024" },
        { name: "PHP", years: "2025" },
        { name: "TypeScript", years: "2025" },
      ],
    },
    {
      title: "Frameworks & Libraries",
      items: [
        { name: "FastAPI", years: "2023" },
        { name: "Flask", years: "2023" },
        { name: "ReactJS", years: "2025" },
        { name: "NextJS", years: "2025" },
        { name: "Electron", years: "2025" },
        { name: "Tailwind CSS", years: "2025" },
        { name: "SQLAlchemy", years: "2025" },
        { name: "Java Swing", years: "2025" },
      ],
    },
    {
      title: "Software & Tools",
      items: [
        { name: "Git", years: "2019" },
        { name: "GitHub", years: "2019" },
        { name: "Linux", years: "2022" },
        { name: "Docker", years: "2023" },
        { name: "Docker Compose", years: "2023" },
        { name: "pnpm", years: "2025" },
        { name: "npm", years: "2025" },
      ],
    },
    {
      title: "Cloud Computing",
      items: [
        { name: "GCP", years: "2024" },
        { name: "Supabase", years: "2025" },
        { name: "Vercel", years: "2025" },
        { name: "Cloudflare", years: "2025" },
      ],
    },
    {
      title: "Databases",
      items: [
        { name: "MySQL", years: "2023" },
        { name: "PostgreSQL", years: "2023" },
      ],
    },
    {
      title: "Hardware & Embedded",
      items: [
        { name: "ESP32", years: "2023" },
        { name: "Arduino", years: "2023" },
        { name: "MQTT", years: "2023" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main className="pt-20 sm:pt-24 px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0.8, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-foreground font-playfair"
            >
              Tech Stack
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed font-merriweather px-4"
            >
              A showcase of my technical skills, frameworks, tools, and development experience.
            </motion.p>
          </motion.div>

          {/* Tech Categories */}
          <div className="space-y-8 sm:space-y-12">
            {techCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0.7, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.3,
                }}
                className="relative"
              >
                {/* Category Header */}
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-playfair mb-2">
                    {category.title}
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-full"></div>
                </div>

                {/* Tech Items List with Progress Bars */}
                <div className="space-y-4 sm:space-y-5">
                  {(() => {
                    // Calculate max years for this category
                    const maxYearsInCategory = Math.max(
                      ...category.items.map((item) => calculateYears(item.years))
                    );

                    return category.items.map((item, itemIndex) => {
                      const years = calculateYears(item.years);
                      const progress = calculateProgress(years, maxYearsInCategory);
                      const yearsText = formatYears(years);

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0.7, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                          duration: 0.2,
                          delay: (categoryIndex * 0.02) + (itemIndex * 0.01),
                        }}
                        className="w-full"
                      >
                        {/* Tech Name and Years */}
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-base sm:text-lg font-semibold text-foreground font-merriweather">
                            {item.name}
                          </h3>
                          <p className="text-sm sm:text-base text-foreground/70 font-merriweather">
                            {yearsText}
                          </p>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-2 sm:h-2.5 bg-muted/30 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{
                              duration: 0.8,
                              delay: (categoryIndex * 0.02) + (itemIndex * 0.01) + 0.2,
                              ease: "easeOut",
                            }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </motion.div>
                    );
                  });
                  })()}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Section */}
          <motion.div
            initial={{ opacity: 0.7, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.3 }}
            className="mt-12 sm:mt-16 text-center px-4"
          >
            <p className="text-sm sm:text-base text-foreground/80 font-merriweather">
              This list highlights my main technologies and tools, but is not exhaustive.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 
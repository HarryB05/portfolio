"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function TechStack() {
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

  const techCategories = [
    {
      title: "Languages",
      items: [
        { name: "HTML5", years: "2018" },
        { name: "CSS3", years: "2018" },
        { name: "JavaScript", years: "2024" },
        { name: "PHP", years: "2025" },
        { name: "TypeScript", years: "2025" },
        { name: "Java", years: "2024" },
        { name: "Python", years: "2017" },
        { name: "C", years: "2022" },
        { name: "C++", years: "2022" },
        { name: "Bash", years: "2024" },
      ],
    },
    {
      title: "Frameworks & Libraries",
      items: [
        { name: "ReactJS", years: "2025" },
        { name: "NextJS", years: "2025" },
        { name: "Electron", years: "2025" },
        { name: "Tailwind CSS", years: "2025" },
        { name: "FastAPI", years: "2023" },
        { name: "Flask", years: "2023" },
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
        { name: "pnpm", years: "2025" },
        { name: "npm", years: "2025" },
        { name: "Docker", years: "2023" },
        { name: "Docker Compose", years: "2023" },
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
      <main className="pt-24 pb-20 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 text-foreground font-playfair"
            >
              Skills
            </motion.h1>
            <motion.p
              className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed font-merriweather"
            >
              A showcase of my technical skills, frameworks, tools, and development experience.
            </motion.p>
          </motion.div>

          {/* Tech Categories */}
          <div className="space-y-12">
            {techCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="relative"
              >
                {/* Category Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground font-playfair mb-2">
                    {category.title}
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-full"></div>
                </div>

                {/* Tech Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0.7, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: (categoryIndex * 0.02) + (itemIndex * 0.01),
                      }}
                      className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground font-merriweather">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-sm text-foreground/60 font-merriweather mt-1">
                        {item.years}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <p className="text-foreground/80 font-merriweather">
              This list highlights my main technologies and tools, but is not exhaustive.
            </p>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
} 
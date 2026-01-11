"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Play, Download, Package } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ImageCarousel } from "@/components/ImageCarousel";
import projectsAndLiteratureData from "@/data/projects-and-literature.json";

interface CarouselImage {
  light: string;
  dark: string;
  alt: string;
}

interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
  technologies: string[];
  links?: {
    github?: string;
    website?: string;
    play?: string;
    pdf?: string;
    npm?: string;
    demo?: string;
  };
  status: "current" | "past";
  image?: string;
  carousel?: CarouselImage[];
  collaborators?: {
    name: string;
    github?: string;
  }[];
}

export default function Projects() {
  useEffect(() => {
    document.title = "Harry Barnish - Projects";
  }, []);

  const projects: Project[] = projectsAndLiteratureData.projects as Project[];

  const currentProjects = projects.filter(p => p.status === "current");
  const pastProjects = projects
    .filter(p => p.status === "past")
    .sort((a, b) => {
      // Extract the start date from period (format: "MM/YYYY" or "MM/YYYY - ...")
      const getDateFromPeriod = (period: string): number => {
        const startDate = period.split(" - ")[0]; // Get the first part before " - "
        const [month, year] = startDate.split("/").map(Number);
        return year * 12 + month; // Convert to a sortable number
      };
      
      return getDateFromPeriod(b.period) - getDateFromPeriod(a.period); // Descending order (most recent first)
    });

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

  const ProjectCard = ({ project }: { project: Project }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
      <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden">
        {(project.image || project.carousel) && (
          <div className="mb-4">
            {project.carousel ? (
              <ImageCarousel 
                images={project.carousel} 
              />
            ) : project.image ? (
              <div 
                className="relative aspect-[3/2] overflow-hidden rounded-t-lg bg-muted"
              >
                {/* Loading skeleton */}
                {!imageLoaded && !imageError && (
                  <div className="absolute inset-0 bg-muted animate-pulse rounded-t-lg" />
                )}
                
                {/* Image */}
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  className={`object-cover rounded-t-lg transition-all duration-500 ${
                    imageLoaded 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  } hover:scale-105`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              </div>
            ) : null}
          </div>
        )}
      
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 font-merriweather leading-tight">
              {project.title}
            </h3>
            <p className="text-sm text-foreground/60 font-merriweather">
              {project.period}
            </p>
          </div>
          {project.status === "current" && (
            <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium self-start whitespace-nowrap">
              Current
            </span>
          )}
        </div>
        
        <p className="text-sm sm:text-base text-foreground/80 mb-3 leading-relaxed font-merriweather">
          {project.description}
        </p>
        
        {project.collaborators && project.collaborators.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-foreground/60 font-merriweather">
              Built with{" "}
              {project.collaborators.map((collaborator, index) => (
                <span key={collaborator.name}>
                  {collaborator.github ? (
                    <a
                      href={collaborator.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-primary transition-colors underline decoration-1 underline-offset-2"
                    >
                      {collaborator.name}
                    </a>
                  ) : (
                    <span className="text-foreground/70">{collaborator.name}</span>
                  )}
                  {index < project.collaborators!.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-3 py-1 text-xs bg-background/50 text-foreground/70 rounded-full border border-border/50 font-merriweather"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {project.links && (
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather text-sm sm:text-base"
              >
                <span>View Code</span>
                <Github className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </a>
            )}
            {project.links.website && (
              <a
                href={project.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather text-sm sm:text-base"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </a>
            )}
            {project.links.play && (
              <a
                href={project.links.play}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather text-sm sm:text-base"
              >
                <span>Play Game</span>
                <Play className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </a>
            )}
            {project.links.pdf && (
              <>
                <a
                  href={project.links.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather text-sm sm:text-base"
                >
                  <span>View PDF</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </a>
                <a
                  href={project.links.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather text-sm sm:text-base"
                >
                  <span>Download PDF</span>
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </a>
              </>
            )}
            {project.links.npm && (
              <a
                href={project.links.npm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather text-sm sm:text-base"
              >
                <span>View on NPM</span>
                <Package className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather text-sm sm:text-base"
              >
                <span>View Demo</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main className="pt-20 sm:pt-24 px-4 sm:px-6 pb-16 sm:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-foreground font-playfair">
              Projects
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed font-merriweather px-4">
              See my past and current projects.
            </p>
          </motion.div>

          {/* Currently Working On */}
          {currentProjects.length > 0 && (
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-playfair mb-2">
                  Currently Working On
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Past Projects */}
          {pastProjects.length > 0 && (
            <motion.div variants={itemVariants}>
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-playfair mb-2">
                  Past Projects
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-full"></div>
              </div>
              <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-6">
                {pastProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: (currentProjects.length * 0.1) + (index * 0.1) }}
                    className="break-inside-avoid mb-4 sm:mb-6"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
} 
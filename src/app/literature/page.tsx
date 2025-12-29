"use client";

import { motion } from "framer-motion";
import { ExternalLink, Download, FileText } from "lucide-react";
import { useEffect } from "react";
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

interface Writing {
  id: string;
  title: string;
  date: string;
  description: string;
  type: "paper" | "blog" | "article";
  tags?: string[];
  links?: {
    website?: string;
    pdf?: string;
  };
  image?: string;
  carousel?: CarouselImage[];
  publication?: string;
  authors?: {
    name: string;
    link?: string;
  }[];
}

export default function Literature() {
  useEffect(() => {
    document.title = "Harry Barnish - Literature";
  }, []);

  const writings: Writing[] = projectsAndLiteratureData.literature as Writing[];

  const papers = writings.filter(w => w.type === "paper");
  const blogs = writings.filter(w => w.type === "blog" || w.type === "article");

  const sortedWritings = (writings: Writing[]) => {
    return [...writings].sort((a, b) => {
      // Extract the date (format: "MM/YYYY")
      const getDateFromString = (date: string): number => {
        const [month, year] = date.split("/").map(Number);
        return year * 12 + month; // Convert to a sortable number
      };
      
      return getDateFromString(b.date) - getDateFromString(a.date); // Descending order (most recent first)
    });
  };

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

  const WritingCard = ({ writing }: { writing: Writing }) => (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden">
      {(writing.image || writing.carousel) && (
        <div className="mb-4">
          {writing.carousel ? (
            <ImageCarousel images={writing.carousel} />
          ) : writing.image ? (
            <div className="relative aspect-[3/2] overflow-hidden rounded-t-lg bg-muted">
              <Image
                src={writing.image}
                alt={`${writing.title} cover`}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : null}
        </div>
      )}
      
      <div className="p-4 sm:p-6">
        <div className="mb-3">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 font-merriweather leading-tight">
            {writing.title}
          </h3>
          <p className="text-sm text-foreground/60 font-merriweather">
            {writing.date}
          </p>
        </div>
        
        <p className="text-sm sm:text-base text-foreground/80 mb-3 leading-relaxed font-merriweather">
          {writing.description}
        </p>

        {writing.publication && (
          <p className="text-xs text-foreground/60 font-merriweather mb-3 italic">
            Published in: {writing.publication}
          </p>
        )}

        {writing.authors && writing.authors.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-foreground/60 font-merriweather">
              Authors:{" "}
              {writing.authors.map((author, index) => (
                <span key={author.name}>
                  {author.link ? (
                    <a
                      href={author.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-primary transition-colors underline decoration-1 underline-offset-2"
                    >
                      {author.name}
                    </a>
                  ) : (
                    <span className="text-foreground/70">{author.name}</span>
                  )}
                  {index < writing.authors!.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
        )}
        
        {writing.tags && writing.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
            {writing.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-3 py-1 text-xs bg-background/50 text-foreground/70 rounded-full border border-border/50 font-merriweather"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {writing.links && (
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {writing.links.website && (
              <a
                href={writing.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather text-sm sm:text-base"
              >
                <span>Read Online</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </a>
            )}
            {writing.links.pdf && (
              <>
                <a
                  href={writing.links.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather text-sm sm:text-base"
                >
                  <span>View PDF</span>
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </a>
                <a
                  href={writing.links.pdf}
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
          </div>
        )}
      </div>
    </div>
  );

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
              Literature
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed font-merriweather px-4">
              Research papers, blog posts, and articles I've written.
            </p>
          </motion.div>

          {/* Papers */}
          {sortedWritings(papers).length > 0 && (
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-playfair mb-2">
                  Papers
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {sortedWritings(papers).map((writing, index) => (
                  <motion.div
                    key={writing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <WritingCard writing={writing} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Blogs & Articles */}
          {sortedWritings(blogs).length > 0 && (
            <motion.div variants={itemVariants}>
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-playfair mb-2">
                  Blogs & Articles
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {sortedWritings(blogs).map((writing, index) => (
                  <motion.div
                    key={writing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: (sortedWritings(papers).length * 0.1) + (index * 0.1) }}
                  >
                    <WritingCard writing={writing} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {writings.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <p className="text-foreground/60 font-merriweather">
                No literature yet. Check back soon!
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}


"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BookOpen, Calendar, ChevronDown, ChevronUp, ExternalLink, GraduationCap } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import educationAndExperienceData from "@/data/education-and-experience.json";

// TypeScript interfaces for education data
interface Course {
  name: string;
  period: string;
  description?: string;
  grade?: string;
  mark?: number;
}

interface EducationEntry {
  institution: string;
  logo: string;
  darkLogo?: string;
  period: string;
  type: string;
  degree?: string;
  institutionDescription?: string;
  link?: string;
  courses?: Course[];
  description?: string;
}

interface EducationData {
  undergrad: EducationEntry[];
  highSchool: EducationEntry[];
}

export default function Education() {
  const [expandedYears, setExpandedYears] = useState<{ [key: string]: boolean }>({
    "Year 1": true,
    "Year 2": false,
    "Year 3": false,
  });

  useEffect(() => {
    document.title = "Harry Barnish - Education";
  }, []);

  // Helper function to convert grade to numeric value
  const gradeToNumeric = (grade: string): number => {
    if (grade === "1st") return 75; // Average of 70-100
    if (grade === "2:1") return 65; // Average of 60-70
    if (grade === "2:2") return 55; // Average of 50-60
    return 0;
  };

  // Helper function to convert numeric value back to grade
  const numericToGrade = (numeric: number): string => {
    if (numeric >= 70) return "1st";
    if (numeric >= 60) return "2:1";
    return "2:2";
  };

  // Calculate average grade for a list of courses
  const calculateAverageGrade = (courses: Course[]): string => {
    const gradesWithValues = courses
      .filter((c) => c.grade && c.grade !== "TBC")
      .map((c) => gradeToNumeric(c.grade!));
    
    if (gradesWithValues.length === 0) return "";
    
    const average = gradesWithValues.reduce((sum, val) => sum + val, 0) / gradesWithValues.length;
    return numericToGrade(average);
  };

  // Group courses by year
  const groupCoursesByYear = (courses: Course[]): { [year: string]: Course[] } => {
    const grouped: { [year: string]: Course[] } = {};
    courses.forEach((course) => {
      const year = course.period;
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(course);
    });
    return grouped;
  };

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
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

  const educationData: EducationData = educationAndExperienceData.education;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main className="pt-20 sm:pt-24 px-4 sm:px-6 pb-16 sm:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Page Header */}
          <motion.div variants={itemVariants} className="mb-12 sm:mb-16 text-center">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-foreground font-playfair"
            >
              Education
            </motion.h1>
            
            <motion.p
              className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed font-merriweather px-4"
            >
              My educational background
            </motion.p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line - Hidden on mobile, visible on larger screens */}
            <div className="hidden sm:block absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10"></div>

            {/* Undergrad */}
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-background border-4 border-primary/10 flex items-center justify-center mr-4 sm:mr-6 relative z-10">
                  <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-playfair">Undergrad</h2>
                  <p className="text-sm sm:text-base text-foreground/60 font-merriweather">University education</p>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {educationData.undergrad.map((entry, index) => (
                  <motion.div
                    key={`${entry.institution}-${index}`}
                    variants={itemVariants}
                    className="relative sm:pl-16"
                  >
                    {/* Timeline Dot - Hidden on mobile */}
                    <div className="hidden sm:block absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                    
                    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-border/50 hover:border-primary/30 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                        <div className="flex items-center">
                          {entry.logo.endsWith('.png') || entry.logo.endsWith('.jpeg') || entry.logo.endsWith('.jpg') ? (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 mr-3 relative flex-shrink-0 rounded-lg overflow-hidden">
                              {entry.darkLogo ? (
                                <ThemeAwareLogo
                                  lightSrc={entry.logo}
                                  darkSrc={entry.darkLogo}
                                  alt={`${entry.institution} logo`}
                                  width={48}
                                  height={48}
                                  className="object-contain"
                                />
                              ) : (
                                <Image
                                  src={entry.logo}
                                  alt={`${entry.institution} logo`}
                                  fill
                                  className="object-contain"
                                  sizes="(max-width: 640px) 40px, 48px"
                                />
                              )}
                            </div>
                          ) : (
                            <span className="text-xl sm:text-2xl mr-3">{entry.logo}</span>
                          )}
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground font-playfair leading-tight">{entry.institution}</h3>
                            <p className="text-base sm:text-lg text-primary font-merriweather">{entry.period}</p>
                          </div>
                        </div>
                        <div className="flex justify-start sm:justify-end">
                          <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full font-merriweather whitespace-nowrap">
                            {entry.type}
                          </span>
                        </div>
                      </div>

                      {/* Institution Description */}
                      {entry.institutionDescription && (
                        <p className="text-sm sm:text-base text-foreground/80 font-merriweather leading-relaxed mb-4">
                          {entry.institutionDescription}
                        </p>
                      )}

                      {/* Degree */}
                      {entry.degree && (
                        <div className="mb-4">
                          <h4 className="text-base sm:text-lg font-semibold text-foreground font-playfair mb-2">{entry.degree}</h4>
                          {entry.description && (
                            <p className="text-sm sm:text-base text-foreground/80 font-merriweather leading-relaxed">
                              {entry.description}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Courses */}
                      {entry.courses && entry.courses.length > 0 && (
                        <div className="space-y-4 mt-4">
                          {Object.entries(groupCoursesByYear(entry.courses))
                            .sort(([yearA], [yearB]) => {
                              // Sort years in descending order: Year 3, Year 2, Year 1
                              const numA = parseInt(yearA.replace("Year ", ""));
                              const numB = parseInt(yearB.replace("Year ", ""));
                              // Handle non-year periods (like "A-Level") by putting them last
                              if (isNaN(numA) && isNaN(numB)) return 0;
                              if (isNaN(numA)) return 1;
                              if (isNaN(numB)) return -1;
                              return numB - numA;
                            })
                            .map(([year, yearCourses]) => {
                              const averageGrade = calculateAverageGrade(yearCourses);
                              const isExpanded = expandedYears[year] ?? false;
                              
                              return (
                                <div key={year} className="border border-border/50 rounded-lg overflow-hidden">
                                  {/* Year Header - Collapsible */}
                                  <button
                                    onClick={() => toggleYear(year)}
                                    className="w-full flex items-center justify-between p-4 bg-card/30 hover:bg-card/50 transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      <h4 className="text-base sm:text-lg font-semibold text-foreground font-playfair">
                                        {year} Modules
                                      </h4>
                                      {averageGrade && (
                                        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full font-merriweather">
                                          Avg: {averageGrade}
                                        </span>
                                      )}
                                    </div>
                                    {isExpanded ? (
                                      <ChevronUp className="w-5 h-5 text-foreground/60" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-foreground/60" />
                                    )}
                                  </button>
                                  
                                  {/* Year Courses - Collapsible Content */}
                                  <AnimatePresence initial={false}>
                                    {isExpanded && (
                                      <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ 
                                          height: "auto", 
                                          opacity: 1,
                                          transition: {
                                            height: {
                                              duration: 0.4,
                                              ease: [0.04, 0.62, 0.23, 0.98]
                                            },
                                            opacity: {
                                              duration: 0.3,
                                              ease: "easeOut"
                                            }
                                          }
                                        }}
                                        exit={{ 
                                          height: 0, 
                                          opacity: 0,
                                          transition: {
                                            height: {
                                              duration: 0.35,
                                              ease: [0.04, 0.62, 0.23, 0.98]
                                            },
                                            opacity: {
                                              duration: 0.25,
                                              ease: "easeIn"
                                            }
                                          }
                                        }}
                                        className="overflow-hidden"
                                      >
                                        <motion.div 
                                          className="p-4 space-y-4"
                                          initial={{ y: -10 }}
                                          animate={{ y: 0 }}
                                          exit={{ y: -5 }}
                                          transition={{ duration: 0.3, ease: "easeOut" }}
                                        >
                                          {yearCourses.map((course, courseIndex) => (
                                            <motion.div 
                                              key={courseIndex} 
                                              className="border-l-2 border-primary/20 pl-3 sm:pl-4"
                                              initial={{ opacity: 0, x: -10 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              exit={{ opacity: 0, x: -5 }}
                                              transition={{ 
                                                duration: 0.2, 
                                                delay: courseIndex * 0.05,
                                                ease: "easeOut"
                                              }}
                                            >
                                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 space-y-1 sm:space-y-0">
                                                <h4 className="text-base sm:text-lg font-semibold text-foreground font-playfair">{course.name}</h4>
                                                {course.grade && (
                                                  <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full font-merriweather">
                                                    {course.grade}
                                                    {course.mark && ` (${course.mark.toFixed(1)}%)`}
                                                  </span>
                                                )}
                                              </div>
                                              {course.description && (
                                                <p className="text-sm sm:text-base text-foreground/80 font-merriweather leading-relaxed">
                                                  {course.description}
                                                </p>
                                              )}
                                            </motion.div>
                                          ))}
                                        </motion.div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                        </div>
                      )}

                      {entry.link && (
                        <a
                          href={entry.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather text-sm sm:text-base mt-4"
                        >
                          Learn more <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* High School */}
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-background border-4 border-primary/10 flex items-center justify-center mr-4 sm:mr-6 relative z-10">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-playfair">High School</h2>
                  <p className="text-sm sm:text-base text-foreground/60 font-merriweather">Secondary education</p>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {educationData.highSchool.map((entry, index) => (
                  <motion.div
                    key={`${entry.institution}-${index}`}
                    variants={itemVariants}
                    className="relative sm:pl-16"
                  >
                    {/* Timeline Dot - Hidden on mobile */}
                    <div className="hidden sm:block absolute left-6 top-6 w-4 h-4 bg-primary/70 rounded-full border-4 border-background"></div>
                    
                    <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-border/30 hover:border-primary/20 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                        <div className="flex items-center">
                          {entry.logo.endsWith('.png') || entry.logo.endsWith('.jpeg') || entry.logo.endsWith('.jpg') ? (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 mr-3 relative flex-shrink-0 rounded-lg overflow-hidden">
                              {entry.darkLogo ? (
                                <ThemeAwareLogo
                                  lightSrc={entry.logo}
                                  darkSrc={entry.darkLogo}
                                  alt={`${entry.institution} logo`}
                                  width={48}
                                  height={48}
                                  className="object-contain"
                                />
                              ) : (
                                <Image
                                  src={entry.logo}
                                  alt={`${entry.institution} logo`}
                                  fill
                                  className="object-contain"
                                  sizes="(max-width: 640px) 40px, 48px"
                                />
                              )}
                            </div>
                          ) : (
                            <span className="text-xl sm:text-2xl mr-3">{entry.logo}</span>
                          )}
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground font-playfair leading-tight">{entry.institution}</h3>
                            <p className="text-base sm:text-lg text-primary font-merriweather">{entry.period}</p>
                          </div>
                        </div>
                        <div className="flex justify-start sm:justify-end">
                          <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full font-merriweather whitespace-nowrap">
                            {entry.type}
                          </span>
                        </div>
                      </div>

                      {/* Institution Description */}
                      {entry.institutionDescription && (
                        <p className="text-sm sm:text-base text-foreground/80 font-merriweather leading-relaxed mb-4">
                          {entry.institutionDescription}
                        </p>
                      )}

                      {/* Degree */}
                      {entry.degree && (
                        <div className="mb-4">
                          <h4 className="text-base sm:text-lg font-semibold text-foreground font-playfair mb-2">{entry.degree}</h4>
                          {entry.description && (
                            <p className="text-sm sm:text-base text-foreground/80 font-merriweather leading-relaxed">
                              {entry.description}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Courses */}
                      {entry.courses && entry.courses.length > 0 && (
                        <div className="space-y-4 mt-4">
                          {entry.courses.map((course, courseIndex) => (
                            <div key={courseIndex} className="border-l-2 border-primary/20 pl-3 sm:pl-4">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 space-y-1 sm:space-y-0">
                                <h4 className="text-base sm:text-lg font-semibold text-foreground font-playfair">{course.name}</h4>
                                <div className="flex items-center gap-2">
                                  <p className="text-xs sm:text-sm text-foreground/60 font-merriweather">{course.period}</p>
                                  {course.grade && (
                                    <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full font-merriweather">
                                      {course.grade}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {course.description && (
                                <p className="text-sm sm:text-base text-foreground/80 font-merriweather leading-relaxed">
                                  {course.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {entry.link && (
                        <a
                          href={entry.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather text-sm sm:text-base mt-4"
                        >
                          Learn more <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}


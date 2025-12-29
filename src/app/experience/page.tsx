"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { Calendar, ExternalLink, Building2, Heart } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import educationAndExperienceData from "@/data/education-and-experience.json";

// TypeScript interfaces for experience data
interface Position {
  role: string;
  period: string;
  description: string;
  technologies?: string[];
}

interface BaseRole {
  company: string;
  logo: string;
  darkLogo?: string;
  period: string;
  type: string;
  companyDescription?: string;
  link?: string;
}

interface CoFounder {
  name: string;
  link: string;
}

interface SingleRole extends BaseRole {
  role: string;
  description: string;
  technologies?: string[];
  coFounders?: CoFounder[];
}

interface MultiPositionRole extends BaseRole {
  positions: Position[];
}

type ExperienceRole = SingleRole | MultiPositionRole;

interface VolunteerRole {
  organization: string;
  logo: string;
  role: string;
  period: string;
  description?: string;
}

interface ExperienceData {
  currentRoles: ExperienceRole[];
  previousEmployment: ExperienceRole[];
  volunteering: VolunteerRole[];
}

export default function Experience() {
  useEffect(() => {
    document.title = "Harry Barnish - Experience";
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

  // Type guard to check if role has positions
  const hasPositions = (role: ExperienceRole): role is MultiPositionRole => {
    return 'positions' in role;
  };

  const experienceData: ExperienceData = educationAndExperienceData.experience;

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
              Experience
            </motion.h1>
            
            <motion.p
              className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed font-merriweather px-4"
            >
              My professional journey and work experience
            </motion.p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line - Hidden on mobile, visible on larger screens */}
            <div className="hidden sm:block absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10"></div>

            {/* Current Roles */}
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-background border-4 border-primary/10 flex items-center justify-center mr-4 sm:mr-6 relative z-10">
                  <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-playfair">Current Roles</h2>
                  <p className="text-sm sm:text-base text-foreground/60 font-merriweather">Active positions and ongoing projects</p>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {experienceData.currentRoles.map((role, index) => (
                  <motion.div
                    key={`${role.company}-${index}`}
                    variants={itemVariants}
                    className="relative sm:pl-16"
                  >
                    {/* Timeline Dot - Hidden on mobile */}
                    <div className="hidden sm:block absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                    
                    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-border/50 hover:border-primary/30 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                        <div className="flex items-center">
                          {role.logo.endsWith('.png') || role.logo.endsWith('.jpeg') || role.logo.endsWith('.jpg') ? (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 mr-3 relative flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={role.logo}
                                alt={`${role.company} logo`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 40px, 48px"
                              />
                            </div>
                          ) : (
                            <span className="text-xl sm:text-2xl mr-3">{role.logo}</span>
                          )}
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground font-playfair leading-tight">{role.company}</h3>
                            <p className="text-base sm:text-lg text-primary font-merriweather">{role.period}</p>
                          </div>
                        </div>
                        <div className="flex justify-start sm:justify-end">
                          <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full font-merriweather whitespace-nowrap">
                            {role.type}
                          </span>
                        </div>
                      </div>

                      {/* Company Description */}
                      {role.companyDescription && (
                        <p className="text-sm sm:text-base text-foreground/80 font-merriweather leading-relaxed mb-4">
                          {role.companyDescription}
                        </p>
                      )}

                      {/* Positions */}
                      {hasPositions(role) ? (
                        <div className="space-y-4">
                          {role.positions?.map((position, posIndex) => (
                            <div key={posIndex} className="border-l-2 border-primary/20 pl-3 sm:pl-4">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 space-y-1 sm:space-y-0">
                                <h4 className="text-base sm:text-lg font-semibold text-foreground font-playfair">{position.role}</h4>
                                <p className="text-xs sm:text-sm text-foreground/60 font-merriweather">{position.period}</p>
                              </div>
                              <div className="text-sm sm:text-base text-foreground/80 font-merriweather leading-relaxed mb-3 space-y-3">
                                {position.description.split('\n\n').map((paragraph, idx) => (
                                  <p key={idx}>{paragraph}</p>
                                ))}
                              </div>
                              {position.technologies && (
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                                  {position.technologies.map((tech: string) => (
                                    <span
                                      key={tech}
                                      className="px-2 sm:px-3 py-1 text-xs bg-background/50 text-foreground/70 rounded-full border border-border/50 font-merriweather"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        // Fallback for single position roles (like LucidTrack)
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 space-y-1 sm:space-y-0">
                            <h4 className="text-base sm:text-lg font-semibold text-foreground font-playfair">{role.role}</h4>
                            <p className="text-xs sm:text-sm text-foreground/60 font-merriweather">{role.period}</p>
                          </div>
                          <div className="text-sm sm:text-base text-foreground/80 font-merriweather leading-relaxed mb-4 space-y-3">
                            {role.description.split('\n\n').map((paragraph, idx) => (
                              <p key={idx}>{paragraph}</p>
                            ))}
                          </div>
                          {role.technologies && (
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                              {role.technologies.map((tech: string) => (
                                <span
                                  key={tech}
                                  className="px-2 sm:px-3 py-1 text-xs bg-background/50 text-foreground/70 rounded-full border border-border/50 font-merriweather"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          {role.coFounders && role.coFounders.length > 0 && (
                            <div className="mb-4 pt-4 border-t border-border/30">
                              <p className="text-xs sm:text-sm text-foreground/60 font-merriweather mb-2">
                                Co-founders:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {role.coFounders.map((founder) => (
                                  <a
                                    key={founder.name}
                                    href={founder.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary/80 transition-colors font-merriweather text-sm"
                                  >
                                    {founder.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {role.link && (
                        <a
                          href={role.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather text-sm sm:text-base"
                        >
                          {role.company === "LucidTrack" ? "Visit site" : "Learn more"} <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Previous Employment */}
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-background border-4 border-primary/10 flex items-center justify-center mr-4 sm:mr-6 relative z-10">
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-playfair">Previous Employment</h2>
                  <p className="text-sm sm:text-base text-foreground/60 font-merriweather">Past roles and experiences</p>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {experienceData.previousEmployment.map((role, index) => (
                  <motion.div
                    key={`${role.company}-${index}`}
                    variants={itemVariants}
                    className="relative sm:pl-16"
                  >
                    {/* Timeline Dot - Hidden on mobile */}
                    <div className="hidden sm:block absolute left-6 top-6 w-4 h-4 bg-primary/70 rounded-full border-4 border-background"></div>
                    
                    <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-border/30 hover:border-primary/20 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                        <div className="flex items-center">
                          {role.logo.endsWith('.png') || role.logo.endsWith('.jpeg') || role.logo.endsWith('.jpg') ? (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 mr-3 relative flex-shrink-0 rounded-lg overflow-hidden">
                              {role.company === "CyanoCapture" && role.darkLogo ? (
                                <ThemeAwareLogo
                                  lightSrc={role.logo}
                                  darkSrc={role.darkLogo}
                                  alt={`${role.company} logo`}
                                  width={48}
                                  height={48}
                                  className="object-contain"
                                />
                              ) : (
                                <Image
                                  src={role.logo}
                                  alt={`${role.company} logo`}
                                  fill
                                  className="object-contain"
                                  sizes="(max-width: 640px) 40px, 48px"
                                />
                              )}
                            </div>
                          ) : (
                            <span className="text-xl sm:text-2xl mr-3">{role.logo}</span>
                          )}
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground font-playfair leading-tight">{role.company}</h3>
                            <p className="text-base sm:text-lg text-primary font-merriweather">{role.period}</p>
                          </div>
                        </div>
                        <div className="flex justify-start sm:justify-end">
                          <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full font-merriweather whitespace-nowrap">
                            {role.type}
                          </span>
                        </div>
                      </div>

                      {/* Company Description */}
                      {role.companyDescription && (
                        <p className="text-sm sm:text-base text-foreground/80 font-merriweather leading-relaxed mb-4">
                          {role.companyDescription}
                        </p>
                      )}

                      {/* Positions */}
                      {hasPositions(role) ? (
                        <div className="space-y-4">
                          {role.positions?.map((position, posIndex) => (
                            <div key={posIndex} className="border-l-2 border-primary/20 pl-3 sm:pl-4">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 space-y-1 sm:space-y-0">
                                <h4 className="text-base sm:text-lg font-semibold text-foreground font-playfair">{position.role}</h4>
                                <p className="text-xs sm:text-sm text-foreground/60 font-merriweather">{position.period}</p>
                              </div>
                              <div className="text-sm sm:text-base text-foreground/80 font-merriweather leading-relaxed mb-3 space-y-3">
                                {position.description.split('\n\n').map((paragraph, idx) => (
                                  <p key={idx}>{paragraph}</p>
                                ))}
                              </div>
                              {position.technologies && (
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                                  {position.technologies.map((tech: string) => (
                                    <span
                                      key={tech}
                                      className="px-2 sm:px-3 py-1 text-xs bg-background/30 text-foreground/60 rounded-full border border-border/30 font-merriweather"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        // Fallback for single position roles
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 space-y-1 sm:space-y-0">
                            <h4 className="text-base sm:text-lg font-semibold text-foreground font-playfair">{role.role}</h4>
                            <p className="text-xs sm:text-sm text-foreground/60 font-merriweather">{role.period}</p>
                          </div>
                          <div className="text-sm sm:text-base text-foreground/80 font-merriweather leading-relaxed mb-4 space-y-3">
                            {role.description.split('\n\n').map((paragraph, idx) => (
                              <p key={idx}>{paragraph}</p>
                            ))}
                          </div>
                          {role.technologies && (
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                              {role.technologies.map((tech: string) => (
                                <span
                                  key={tech}
                                  className="px-2 sm:px-3 py-1 text-xs bg-background/30 text-foreground/60 rounded-full border border-border/30 font-merriweather"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          {role.coFounders && role.coFounders.length > 0 && (
                            <div className="mb-4 pt-4 border-t border-border/20">
                              <p className="text-xs sm:text-sm text-foreground/60 font-merriweather mb-2">
                                Co-founders:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {role.coFounders.map((founder) => (
                                  <a
                                    key={founder.name}
                                    href={founder.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary/80 transition-colors font-merriweather text-sm"
                                  >
                                    {founder.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {role.link && (
                        <a
                          href={role.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather text-sm sm:text-base"
                        >
                          Learn more <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Volunteering */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-background border-4 border-primary/10 flex items-center justify-center mr-4 sm:mr-6 relative z-10">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-playfair">Volunteering</h2>
                  <p className="text-sm sm:text-base text-foreground/60 font-merriweather">Giving back to the community</p>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {experienceData.volunteering.map((volunteer) => (
                  <motion.div
                    key={`${volunteer.organization}-${volunteer.role}`}
                    variants={itemVariants}
                    className="relative sm:pl-16"
                  >
                    {/* Timeline Dot - Hidden on mobile */}
                    <div className="hidden sm:block absolute left-6 top-6 w-4 h-4 bg-primary/50 rounded-full border-4 border-background"></div>
                    
                    <div className="bg-card/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-border/20 hover:border-primary/10 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                        <div className="flex items-center">
                          {volunteer.logo.endsWith('.png') || volunteer.logo.endsWith('.jpeg') || volunteer.logo.endsWith('.jpg') ? (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 mr-3 relative flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={volunteer.logo}
                                alt={`${volunteer.organization} logo`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 40px, 48px"
                              />
                            </div>
                          ) : (
                            <span className="text-xl sm:text-2xl mr-3">{volunteer.logo}</span>
                          )}
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground font-playfair leading-tight">{volunteer.organization}</h3>
                            <p className="text-base sm:text-lg text-primary font-merriweather">{volunteer.period}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 space-y-1 sm:space-y-0">
                        <h4 className="text-base sm:text-lg font-semibold text-foreground font-playfair">{volunteer.role}</h4>
                      </div>
                      
                      <p className="text-sm sm:text-base text-foreground/80 font-merriweather leading-relaxed">
                        {volunteer.description}
                      </p>
                      
                      {volunteer.organization === "NHS Blood and Transplant" && (
                        <a
                          href="https://www.blood.co.uk"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather mt-3 text-sm sm:text-base"
                        >
                          Donate now <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
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
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ExternalLink, Building2, Users, Heart } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Experience() {
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

  const experienceData = {
    currentRoles: [
      {
        company: "Queen Mary University of London",
        logo: "/logos/qmul_logo.png",
        role: "Computer Systems and Networks Demonstrator",
        period: " Sep 2025 - Present",
        type: "Part-Time",
        description: "Providing front-line support for student learning by helping students overcome difficulties with course material, supporting laboratory work and formative exercises, providing individual feedback on student work, and assisting with marking coursework and in-class assessments.",
      },
      {
        company: "LucidTrack",
        logo: "/logos/lucidtrack_logo.png",
        role: "Co-founder",
        period: "Apr 2025 - Present",
        type: "Startup",
        companyDescription: "A startup focused on revolutionizing the internship application process by providing students and job seekers with comprehensive tools to track applications, manage interviews, and visualize their career progress.",
        description: "Co-founder of LucidTrack, an all-in-one platform for managing internship applications, interviews, and deadlines. LucidTrack helps students and job seekers track their applications, schedule interviews, set deadline reminders, and visualize their progress with analytics. The platform features a collaborative dashboard, powerful search, and sharing tools to streamline the internship search process. Launching August 2025.",
        link: "https://lucidtrack.dev",
        technologies: ["React", "Next.js", "Supabase", "Vercel", "Tailwind CSS"]
      },
      {
        company: "Hyperlink London",
        logo: "/logos/hyperlink_logo.jpeg",
        period: "Sep 2024 - Present",
        type: "Student Society",
        companyDescription: "A student-led engineering society at Queen Mary University of London building London's first fully operational Hyperloop pod prototype. The team focuses on developing financially feasible, scalable Hyperloop technology while researching social sustainability, safety systems, and community integration to bring Hyperloop implementation closer to reality in Europe.",
        link: "https://www.hyperlinklondon.com",
        positions: [
          {
            role: "Head of Electrical & Treasurer",
            period: "Sep 2025 - Present",
            description: "Leading electrical systems and financial management for Hyperlink London's IoT projects.",
            technologies: ["IoT", "Electrical Systems", "Financial Management"]
          },
          {
            role: "Head of Software",
            period: "Sep 2024 - Aug 2025",
            description: "Managed a team of 10 people to develop a modular end-to-end IoT system at Hyperlink, integrating ESP32-based embedded sensors with a local backend infrastructure. Designed and implemented a finite state machine (FSM) architecture to govern sensor behaviour and edge decision-making. Built a FastAPI-based RESTful API connected to a PostgreSQL database via SQLModel, supporting asynchronous data collection and structured storage. Utilised Docker to containerise backend services for consistent local deployment. Additionally, developed a real-time user interface using Electron to visualise and interact with live sensor data.",
            technologies: ["Python", "FastAPI", "PostgreSQL", "Docker", "ESP32", "Electron", "IoT"]
          }
        ]
      }
    ],
    previousEmployment: [
      {
        company: "CyanoCapture",
        logo: "/logos/cyanocapture_logo.png",
        period: "Jan 2023 - Aug 2024",
        type: "Full-Time",
        companyDescription: "A pioneering climate tech company that won Elon Musk's XPRIZE 2021 and Shell New Energy Challenge 2023 for their revolutionary photosynthetic biomanufacturing platform. CyanoCapture uses genetically engineered cyanobacteria to synthesize high-value compounds directly from CO2 and sunlight.",
        link: "https://www.cyanocapture.com",
        positions: [
          {
            role: "Software Engineer",
            period: "Sep 2023 - Aug 2024",
            description: "Managed the development of a cloud-native industrial IoT system engineered for real-time data processing and communication, leveraging MQTT for efficient data transmission, Docker for deployment portability, and an integrated Solara FastAPI stack for streamlined cloud-based IoT services. Deployed on Google Cloud Platform (GCP) to ensure scalability and reliability.",
            technologies: ["Python", "FastAPI", "MQTT", "Docker", "GCP", "IoT", "Solara"]
          },
          {
            role: "Software Engineer Summer Intern",
            period: "Aug 2023 - Sep 2023",
            description: "Summer internship focused on software development and IoT systems.",
            technologies: ["Python", "IoT"]
          },
          {
            role: "Software Engineer Intern",
            period: "Jan 2023 - May 2023",
            description: "Part-time internship in software engineering and development.",
            technologies: ["Python", "IoT"]
          }
        ]
      }
    ],
    volunteering: [
      {
        organization: "NHS England",
        logo: "/logos/nhs_logo.png",
        role: "Expert by Experience",
        period: "Aug 2024 - Present",
        description: "Providing expert insights and feedback to improve NHS services and patient experience."
      },
      {
        organization: "NHS Blood and Transplant",
        logo: "/logos/nhs_blood_logo.png",
        role: "Platelet donor",
        period: "Feb 2023 - Present",
      },
      {
        organization: "The Oxbridge Foundation",
        logo: "/logos/oxbridge_foundation_logo.png",
        role: "Charity Work",
        period: "Feb 2022",
        description: "Volunteering and charity work to support educational initiatives."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main className="pt-24 px-6 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Page Header */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 text-foreground font-playfair"
            >
              Experience
            </motion.h1>
            
            <motion.p
              className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed font-merriweather"
            >
              My professional journey and work experience
            </motion.p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10"></div>

            {/* Current Roles */}
            <motion.div variants={itemVariants} className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 rounded-full bg-background border-4 border-primary/10 flex items-center justify-center mr-6 relative z-10">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground font-playfair">Current Roles</h2>
                  <p className="text-foreground/60 font-merriweather">Active positions and ongoing projects</p>
                </div>
              </div>

              <div className="space-y-8">
                {experienceData.currentRoles.map((role, index) => (
                  <motion.div
                    key={`${role.company}-${index}`}
                    variants={itemVariants}
                    className="relative pl-16"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                    
                    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50 hover:border-primary/30 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          {role.logo.endsWith('.png') || role.logo.endsWith('.jpeg') || role.logo.endsWith('.jpg') ? (
                            <div className="w-12 h-12 mr-3 relative flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={role.logo}
                                alt={`${role.company} logo`}
                                fill
                                className="object-contain"
                                sizes="48px"
                              />
                            </div>
                          ) : (
                            <span className="text-2xl mr-3">{role.logo}</span>
                          )}
                          <div>
                            <h3 className="text-xl font-bold text-foreground font-playfair">{role.company}</h3>
                            <p className="text-lg text-primary font-merriweather">{role.period}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full font-merriweather">
                            {role.type}
                          </span>
                        </div>
                      </div>

                      {/* Company Description */}
                      {role.companyDescription && (
                        <p className="text-foreground/80 font-merriweather leading-relaxed mb-4">
                          {role.companyDescription}
                        </p>
                      )}

                      {/* Positions */}
                      {'positions' in role ? (
                        <div className="space-y-4">
                          {role.positions?.map((position, posIndex) => (
                            <div key={posIndex} className="border-l-2 border-primary/20 pl-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-lg font-semibold text-foreground font-playfair">{position.role}</h4>
                                <p className="text-sm text-foreground/60 font-merriweather">{position.period}</p>
                              </div>
                              <p className="text-foreground/80 font-merriweather leading-relaxed mb-3">
                                {position.description}
                              </p>
                              {position.technologies && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {position.technologies.map((tech: string) => (
                                    <span
                                      key={tech}
                                      className="px-3 py-1 text-xs bg-background/50 text-foreground/70 rounded-full border border-border/50 font-merriweather"
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
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-lg font-semibold text-foreground font-playfair">{role.role}</h4>
                            <p className="text-sm text-foreground/60 font-merriweather">{role.period}</p>
                          </div>
                          <p className="text-foreground/80 font-merriweather leading-relaxed mb-4">
                            {role.description}
                          </p>
                          {role.technologies && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {role.technologies.map((tech: string) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 text-xs bg-background/50 text-foreground/70 rounded-full border border-border/50 font-merriweather"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {role.link && (
                        <a
                          href={role.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather"
                        >
                          {role.company === "LucidTrack" ? "Visit site" : "Learn more"} <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Previous Employment */}
            <motion.div variants={itemVariants} className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 rounded-full bg-background border-4 border-primary/10 flex items-center justify-center mr-6 relative z-10">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground font-playfair">Previous Employment</h2>
                  <p className="text-foreground/60 font-merriweather">Past roles and experiences</p>
                </div>
              </div>

              <div className="space-y-8">
                {experienceData.previousEmployment.map((role, index) => (
                  <motion.div
                    key={`${role.company}-${index}`}
                    variants={itemVariants}
                    className="relative pl-16"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 top-6 w-4 h-4 bg-primary/70 rounded-full border-4 border-background"></div>
                    
                    <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/30 hover:border-primary/20 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          {role.logo.endsWith('.png') || role.logo.endsWith('.jpeg') || role.logo.endsWith('.jpg') ? (
                            <div className="w-12 h-12 mr-3 relative flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={role.logo}
                                alt={`${role.company} logo`}
                                fill
                                className="object-contain"
                                sizes="48px"
                              />
                            </div>
                          ) : (
                            <span className="text-2xl mr-3">{role.logo}</span>
                          )}
                          <div>
                            <h3 className="text-xl font-bold text-foreground font-playfair">{role.company}</h3>
                            <p className="text-lg text-primary font-merriweather">{role.period}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full font-merriweather">
                            {role.type}
                          </span>
                        </div>
                      </div>

                      {/* Company Description */}
                      {role.companyDescription && (
                        <p className="text-foreground/80 font-merriweather leading-relaxed mb-4">
                          {role.companyDescription}
                        </p>
                      )}

                      {/* Positions */}
                      {'positions' in role ? (
                        <div className="space-y-4">
                          {role.positions?.map((position, posIndex) => (
                            <div key={posIndex} className="border-l-2 border-primary/20 pl-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-lg font-semibold text-foreground font-playfair">{position.role}</h4>
                                <p className="text-sm text-foreground/60 font-merriweather">{position.period}</p>
                              </div>
                              <p className="text-foreground/80 font-merriweather leading-relaxed mb-3">
                                {position.description}
                              </p>
                              {position.technologies && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {position.technologies.map((tech: string) => (
                                    <span
                                      key={tech}
                                      className="px-3 py-1 text-xs bg-background/30 text-foreground/60 rounded-full border border-border/30 font-merriweather"
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
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-lg font-semibold text-foreground font-playfair">{role.role}</h4>
                            <p className="text-sm text-foreground/60 font-merriweather">{role.period}</p>
                          </div>
                          <p className="text-foreground/80 font-merriweather leading-relaxed mb-4">
                            {role.description}
                          </p>
                          {role.technologies && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {role.technologies.map((tech: string) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 text-xs bg-background/30 text-foreground/60 rounded-full border border-border/30 font-merriweather"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {role.link && (
                        <a
                          href={role.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather"
                        >
                          Learn more <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Volunteering */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 rounded-full bg-background border-4 border-primary/10 flex items-center justify-center mr-6 relative z-10">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground font-playfair">Volunteering</h2>
                  <p className="text-foreground/60 font-merriweather">Giving back to the community</p>
                </div>
              </div>

              <div className="space-y-8">
                {experienceData.volunteering.map((volunteer, index) => (
                  <motion.div
                    key={`${volunteer.organization}-${volunteer.role}`}
                    variants={itemVariants}
                    className="relative pl-16"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 top-6 w-4 h-4 bg-primary/50 rounded-full border-4 border-background"></div>
                    
                    <div className="bg-card/20 backdrop-blur-sm rounded-lg p-6 border border-border/20 hover:border-primary/10 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          {volunteer.logo.endsWith('.png') || volunteer.logo.endsWith('.jpeg') || volunteer.logo.endsWith('.jpg') ? (
                            <div className="w-12 h-12 mr-3 relative flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={volunteer.logo}
                                alt={`${volunteer.organization} logo`}
                                fill
                                className="object-contain"
                                sizes="48px"
                              />
                            </div>
                          ) : (
                            <span className="text-2xl mr-3">{volunteer.logo}</span>
                          )}
                          <div>
                            <h3 className="text-xl font-bold text-foreground font-playfair">{volunteer.organization}</h3>
                            <p className="text-lg text-primary font-merriweather">{volunteer.period}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold text-foreground font-playfair">{volunteer.role}</h4>
                      </div>
                      
                      <p className="text-foreground/80 font-merriweather leading-relaxed">
                        {volunteer.description}
                      </p>
                      
                      {volunteer.organization === "NHS Blood and Transplant" && (
                        <a
                          href="https://www.blood.co.uk"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-merriweather mt-3"
                        >
                          Donate now <ExternalLink className="w-4 h-4 ml-1" />
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
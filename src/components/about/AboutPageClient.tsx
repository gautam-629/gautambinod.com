'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, MapPin, Clock, Briefcase, GraduationCap, Award, CheckCircle, ExternalLink } from "lucide-react";
import { calculateDuration } from "@/utils/calculateDuration";
import { formatDate } from "@/utils/format";

import type { AboutSection, Experience, Education, Certificate, Skill } from "@prisma/client";

interface Props {
  about: AboutSection | null;
  experiences: Experience[];
  education: Education[];
  certificates: Certificate[];
  skills: Skill[];
}

// Stagger variants for list container
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

// Item transitions
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } }
};

export function AboutPageClient({ about, experiences, education, certificates, skills }: Props) {
  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="container py-20 max-w-4xl mx-auto px-4 space-y-20 select-none"
    >
      
      {/* Intro Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <span className="text-primary text-xs font-semibold uppercase tracking-wider">Biography</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              About Me
            </h1>
            <div className="w-12 h-1 bg-primary rounded-full mt-2" />
          </div>

          {about?.headline && (
            <h2 className="text-lg sm:text-xl font-bold text-muted-foreground leading-relaxed">
              {about.headline}
            </h2>
          )}

          {about?.biography && (
            <div
              className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed text-muted-foreground/90 space-y-4"
              dangerouslySetInnerHTML={{ __html: about.biography }}
            />
          )}

          {/* Quick Info Tags */}
          <div className="flex flex-wrap gap-4 pt-2">
            {about?.location && (
              <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border/40 bg-muted/20 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                {about.location}
              </span>
            )}
            {about?.availability && (
              <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 dark:text-emerald-400">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                {about.availability}
              </span>
            )}
          </div>

          {about?.resumeUrl && (
            <a
              href={about.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-xl bg-primary hover:bg-primary/95 px-5 py-3 text-xs font-bold text-primary-foreground transition-all duration-300 shadow-md shadow-primary/10 hover:scale-102"
            >
              <Download className="h-3.5 w-3.5 shrink-0" /> Download Resume
            </a>
          )}
        </motion.div>

        {/* Profile photo container */}
        {about?.profileImage && (
          <motion.div 
            variants={itemVariants} 
            className="flex justify-center md:justify-end"
          >
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-indigo-500 blur-xl opacity-30 group-hover:opacity-45 transition-opacity duration-500 -z-10" />
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border border-border/40 bg-muted shadow-lg">
                <Image
                  src={about.profileImage}
                  alt="Profile"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  sizes="208px"
                  priority
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Core Skills Segment */}
      {skills.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="space-y-1">
            <span className="text-primary text-xs font-bold uppercase tracking-wider">Expertise</span>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Core Skills</h2>
          </div>
          
          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill) => (
              <motion.span
                key={skill.id}
                variants={skillVariants}
                whileHover={{ scale: 1.05 }}
                className="px-3.5 py-2 rounded-xl bg-card border border-border/50 text-foreground text-xs font-bold shadow-sm transition-colors hover:border-primary/20"
              >
                {skill.name}
              </motion.span>
            ))}
          </div>

          <Link 
            href="/skills" 
            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline pt-2"
          >
            View All Skills →
          </Link>
        </motion.div>
      )}

      {/* Timeline Experience Segment */}
      {experiences.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="space-y-1">
            <span className="text-primary text-xs font-bold uppercase tracking-wider">Journey</span>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Work History</h2>
          </div>

          {/* Timeline stack */}
          <div className="relative pl-6 sm:pl-8 border-l border-border/60 ml-2.5 space-y-10">
            {experiences.map((exp, i) => (
              <motion.div 
                key={exp.id} 
                variants={itemVariants}
                className="relative group"
              >
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-primary bg-background flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-base text-foreground leading-snug group-hover:text-primary transition-colors">
                      {exp.jobTitle}
                    </h3>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold bg-primary/10 border border-primary/25 text-primary px-2.5 py-0.5 rounded-md">
                      {exp.employmentType.replace(/_/g, " ")}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground/80 leading-none">
                    <Briefcase className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span>{exp.companyName}</span>
                  </div>

                  <p className="text-[10px] font-mono text-muted-foreground mt-1">
                    {formatDate(exp.startDate)} –{" "}
                    {exp.currentlyWorking ? "Present" : exp.endDate ? formatDate(exp.endDate) : ""}
                    {" · "}
                    {calculateDuration(exp.startDate, exp.endDate)}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </p>

                  {exp.shortDescription && (
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                      {exp.shortDescription}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <Link 
            href="/experience" 
            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline pt-2"
          >
            View Full Experience →
          </Link>
        </motion.div>
      )}

      {/* Education Segment */}
      {education.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="space-y-1">
            <span className="text-primary text-xs font-bold uppercase tracking-wider">Education</span>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Academic Profile</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {education.map((edu) => (
              <motion.div 
                key={edu.id} 
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="p-5 rounded-2xl border border-border/50 bg-card/65 backdrop-blur-sm flex flex-col justify-between hover:border-primary/20 transition-all duration-300 shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <GraduationCap className="h-4 w-4 shrink-0" />
                    <span>{edu.institution}</span>
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-foreground leading-snug">
                    {edu.degree}
                    {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/20">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {formatDate(edu.startDate)} – {edu.current ? "Present" : edu.endDate ? formatDate(edu.endDate) : ""}
                  </span>

                  {edu.grade && (
                    <span className="text-[9px] uppercase tracking-wider font-extrabold bg-muted px-2 py-0.5 rounded border border-border/30 text-muted-foreground">
                      Grade: {edu.grade}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Certificates Segment */}
      {certificates.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="space-y-1">
            <span className="text-primary text-xs font-bold uppercase tracking-wider">Achievements</span>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <motion.div 
                key={cert.id} 
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="p-5 rounded-2xl border border-border/50 bg-card/65 backdrop-blur-sm flex flex-col justify-between hover:border-primary/20 transition-all duration-300 shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <Award className="h-4 w-4 shrink-0" />
                    <span>{cert.issuer}</span>
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-foreground leading-snug">
                    {cert.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/20 select-none">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {formatDate(cert.issueDate)}
                  </span>
                  
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-primary hover:underline inline-flex items-center gap-0.5"
                    >
                      Verify
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

    </motion.div>
  );
}

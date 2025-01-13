"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Associate Full Stack Developer",
    organisation: "Jobaxle.Pvt.Ltd",
    startDate: "Jul 2023",
    endDate: "Apr 2024",
    experiences: [
      "Proposed and developed Seeker Details and Resume Builder features, enhancing user profiles and simplifying resume creation.",
      "Enhanced job search with advanced filtering, including save, unsave, archive, and apply job functionalities.",
      "Optimized authentication processes for enhanced user experience and security.",
      "Utilized Next.js for streamlined server-side rendering, MySQL for resilient data storage, Prisma ORM for seamless interactions, TypeScript for secure development, and Mantine UI for intuitive interfaces.",
    ],
  },
  {
    role: "Junior Full Stack Developer",
    organisation: "RPA Nepal.Pvt.Ltd",
    startDate: "Apr 2024",
    endDate: "Present",
    experiences: [
      "Migrated React app to Next.js and built an admin dashboard from scratch using React, TypeScript, Ant Design, TailwindCSS, and React Query for reporting purposes.",
      "Developed Kumeji Map, a digital map for Kumejima Island, from scratch using React, TailwindCSS, and Leaflet.js, featuring 3D/VR content and interactive quizzes to boost user engagement.",
      "Built a chat application from scratch using Next.js, TypeScript, Shadcdn, TailwindCSS, React, and React Query, focusing on seamless real-time communication.",
      "Enhanced the Khumbu app by contributing to the design and development, connecting partners and providers using React, Redux, and TypeScript, improving service accessibility and collaboration.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and achievements
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <CardTitle className="text-xl">{exp.role}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{exp.organisation}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      <Calendar className="h-3 w-3 mr-1" />
                      {exp.startDate} - {exp.endDate}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {exp.experiences.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="text-muted-foreground flex gap-2"
                      >
                        <span className="text-primary">•</span>
                        <span className="flex-1">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;

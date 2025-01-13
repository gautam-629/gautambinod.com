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
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    semester: "4th sem",
    title: "Ecommerce",
    description:
      "Built a full-stack e-commerce application where users can search, filter, and order products. Admins can perform CRUD operations on products, users, and categories, with integrated payment functionality.",
    skills: ["React", "Express", "Node", "MongoDB"],
    source: "https://github.com/gautam-629/MERN-Ecommerce",
    image: "/api/placeholder/800/400", // Using placeholder for demo
  },
  {
    semester: "6th sem",
    title: "Shayogi",
    description:
      "MERN Stack web application connecting service seekers and service providers. Service seekers can search for services, while service providers can create services and request to hire service seekers.",
    skills: ["React", "Express", "Node", "MongoDB", "TailwindCSS"],
    source: "https://github.com/gautam-629/Sayogi",
    image: "/api/placeholder/800/400", // Using placeholder for demo
  },
  {
    semester: "8th sem",
    title: "Eco-Tracking",
    description:
      "Eco-Trekking is a dynamic web platform connecting outdoor enthusiasts with sustainable hiking experiences. The application features interactive route planning, eco-friendly accommodation listings, and community-driven content.",
    skills: ["React", "Express", "TypeScript", "TailwindCSS", "Next.js"],
    source: "https://github.com/gautam-629/eco-tracking-server.git",
    image: "/api/placeholder/800/400", // Using placeholder for demo
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent development work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full flex flex-col overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      asChild
                    >
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Project
                      </a>
                    </Button>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1">
                        {project.title}
                      </CardTitle>
                      <CardDescription>{project.semester}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      asChild
                    >
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source code"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-2 py-0.5 text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;

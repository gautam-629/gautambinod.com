"use client";

import { Github, Linkedin, Mail, Phone, ExternalLink, Code2, Database, Wrench, Award, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Portfolio() {
  const workExperience = [
    {
      company: "RPA Nepal.Ltd.Pvt",
      role: "Frontend Developer with Backend Integration",
      period: "Apr 2024 - Present",
      achievements: [
        "Developed the Kumeji Map PWA using React, Tailwind CSS, and Leaflet.js with integrated 3D/VR map experiences",
        "Built a real-time chat interface with Next.js, TypeScript, and ShadCN, connected through Socket.io APIs",
        "Designed a scalable and modular frontend architecture for an HRM system, utilizing Next.js and React Query",
        "Enhanced the Mobile Khaata application UI with Redux and Tailwind CSS",
        "Migrated existing React projects to Next.js, resulting in improved SEO performance",
        "Collaborated with the backend team on Express.js and NestJS API routes with PostgreSQL database integration"
      ]
    },
    {
      company: "Jobaxle.Pvt.Ltd",
      role: "Frontend Developer with Backend Integration",
      period: "Sep 2023 - Apr 2024",
      achievements: [
        "Created responsive, SEO-optimized job portal interfaces using Next.js and Mantine UI",
        "Implemented advanced filtering, search, and resume builder features",
        "Integrated OAuth (Google, GitHub) and secure cookie-based authentication",
        "Improved API integration using TanStack Query and caching strategies"
      ]
    }
  ];

  const projects = [
    {
      name: "Kumeji Map",
      description: "Interactive tourism map with 3D/VR and quizzes",
      tech: ["React", "Leaflet.js", "Tailwind CSS"],
      link: "https://join-kumejima.com/map/app"
    },
    {
      name: "Connexo Chat",
      description: "Real-time updates and backend communication",
      tech: ["Next.js", "TypeScript", "Socket.io", "Express.js"],
      link: "https://connexo.app"
    },
    {
      name: "HRM Dashboard",
      description: "Scalable and modular frontend architecture for HRM system",
      tech: ["Next.js", "React Query", "Tailwind CSS"],
      link: "https://rpa.hamrohr.com"
    },
    {
      name: "Khumbu",
      description: "Khumbu connects the restaurant tech world",
      tech: ["React", "Node.js"],
      link: "https://www.khumbu.com"
    },
    {
      name: "Mobile Khaata",
      description: "Frontend for digital ledger app",
      tech: ["React", "Redux", "Tailwind CSS", "Express"],
      link: "https://business.mobilekhaata.com"
    }
  ];

  const skills = {
    Frontend: ["React.js", "Next.js", "Redux", "TanStack Query", "Zustand", "Tailwind CSS", "Ant Design", "ShadCN", "Mantine UI", "Leaflet.js"],
    Backend: ["Node.js", "Express.js", "NestJS"],
    Languages: ["JavaScript (ES6+)", "TypeScript"],
    Databases: ["MySQL", "MongoDB", "PostgreSQL", "Prisma ORM", "TypeORM"],
    Tools: ["Git", "Docker", "Postman"],
    Other: ["Responsive Design", "API Integration", "State Management", "SEO Optimization"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

        <section className="mb-20 text-center">
          <div className="inline-block animate-fade-in">
            <h1 className="text-5xl sm:text-7xl font-bold text-slate-900 mb-4 tracking-tight">
              Binod Gautam
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6"></div>
          </div>

          <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Frontend-focused Full Stack Developer with strong expertise in React.js, Next.js, TypeScript, and modern UI frameworks
          </p>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
            Skilled at building responsive, high-performance web interfaces and integrating APIs efficiently.
            Passionate about delivering smooth user experiences and writing clean code.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button asChild variant="default" size="lg" className="gap-2">
              <a href="mailto:gautambinod629@gmail.com">
                <Mail className="w-5 h-5" />
                Email Me
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href="https://wa.me/9779815835831" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </Button>
          </div>

          <div className="flex justify-center gap-6">
            <a href="https://github.com/gautam-629" target="_blank" rel="noopener noreferrer"
               className="text-slate-600 hover:text-slate-900 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/gautambinod" target="_blank" rel="noopener noreferrer"
               className="text-slate-600 hover:text-slate-900 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold text-slate-900">Work Experience</h2>
          </div>

          <div className="space-y-6">
            {workExperience.map((job, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">{job.company}</CardTitle>
                  <CardDescription className="text-lg">
                    {job.role} • {job.period}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="flex gap-3 text-slate-700">
                        <span className="text-blue-500 font-bold mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Code2 className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold text-slate-900">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {project.name}
                    {project.link !== "#" && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                         className="text-blue-600 hover:text-blue-700">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </CardTitle>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <Badge key={i} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Wrench className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold text-slate-900">Skills & Technologies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <Card key={category} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    {category === "Frontend" && <Code2 className="w-5 h-5 text-blue-600" />}
                    {category === "Backend" && <Database className="w-5 h-5 text-blue-600" />}
                    {category === "Databases" && <Database className="w-5 h-5 text-blue-600" />}
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <Badge key={i} variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Education</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xl font-semibold mb-2">Tribhuvan University</p>
              <p className="text-lg">BCA (Bachelor of Computer Applications)</p>
              <p className="text-blue-100">Oct 2019 - Nov 2023</p>
            </CardContent>
          </Card>
        </section>

        <section className="text-center">
          <Card className="border-2 border-blue-200 bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-3xl">Let&apos;s Work Together</CardTitle>
              <CardDescription className="text-lg">
                I&apos;m always interested in hearing about new projects and opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <a href="mailto:gautambinod629@gmail.com">
                    <Mail className="w-5 h-5" />
                    gautambinod629@gmail.com
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a href="https://wa.me/9779815835831" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp: 9815835831
                  </a>
                </Button>
              </div>
              <Separator className="my-6" />
              <div className="flex justify-center gap-6">
                <a href="https://github.com/gautam-629" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                  <Github className="w-5 h-5" />
                  <span className="text-sm font-medium">gautam-629</span>
                </a>
                <a href="https://linkedin.com/in/gautambinod" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm font-medium">gautambinod</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-16 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Binod Gautam. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

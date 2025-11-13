"use client";

import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Code2,
  Database,
  Wrench,
  Award,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
        "Collaborated with the backend team on Express.js and NestJS API routes with PostgreSQL database integration",
      ],
    },
    {
      company: "Jobaxle.Pvt.Ltd",
      role: "Frontend Developer with Backend Integration",
      period: "Sep 2023 - Apr 2024",
      achievements: [
        "Created responsive, SEO-optimized job portal interfaces using Next.js and Mantine UI",
        "Implemented advanced filtering, search, and resume builder features",
        "Integrated OAuth (Google, GitHub) and secure cookie-based authentication",
        "Improved API integration using TanStack Query and caching strategies",
      ],
    },
  ];

  const projects = [
    {
      name: "Kumeji Map",
      description: "Interactive tourism map with 3D/VR and quizzes",
      tech: ["React", "Leaflet.js", "Tailwind CSS"],
      link: "https://join-kumejima.com/map/app",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Connexo Chat",
      description: "Real-time updates and backend communication",
      tech: ["Next.js", "TypeScript", "Socket.io", "Express.js"],
      link: "https://connexo.app",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "HRM Dashboard",
      description: "Scalable and modular frontend architecture for HRM system",
      tech: ["Next.js", "React Query", "Tailwind CSS"],
      link: "https://rpa.hamrohr.com",
      gradient: "from-green-500 to-emerald-500",
    },

    {
      name: "Mobile Khaata",
      description: "Frontend for digital ledger app",
      tech: ["React", "Redux", "Tailwind CSS", "Express"],
      link: "https://business.mobilekhaata.com",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      name: "Job Portal",
      description: "Job Portal Website",
      tech: ["React", "Next Js", "Mysql"],
      link: "https://jobaxle.com/auth/login",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      name: "Khumbu",
      description: "Khumbu connects the restaurant tech world",
      tech: ["React", "Node.js"],
      link: "https://www.khumbu.com",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const skills = {
    Frontend: [
      "React.js",
      "Next.js",
      "Redux",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "Ant Design",
      "ShadCN",
      "Mantine UI",
      "Leaflet.js",
    ],
    Backend: ["Node.js", "Express.js", "NestJS"],
    Languages: ["JavaScript (ES6+)", "TypeScript"],
    Databases: ["MySQL", "MongoDB", "PostgreSQL", "Prisma ORM", "TypeORM"],
    Tools: ["Git", "Docker", "Postman"],
    Other: [
      "Responsive Design",
      "API Integration",
      "State Management",
      "SEO Optimization",
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Animated background gradient */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
        }}
      />

      {/* Mesh gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950/20 via-slate-950 to-purple-950/20 pointer-events-none" />

      {/* Grid pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center mb-32">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">
                Available for opportunities
              </span>
            </div>

            <h1 className="text-6xl sm:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient bg-300%">
              Binod Gautam
            </h1>

            <div
              className="h-1 w-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-8 rounded-full"
              style={{
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />

            <p className="text-2xl sm:text-3xl text-slate-300 max-w-4xl mx-auto mb-6 leading-relaxed font-light">
              Full Stack Developer
            </p>

            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Full Stack Developer with expertise in React.js, Next.js,
              TypeScript, NestJS, Express.js, and databases. Experienced in
              building scalable web applications with clean code, efficient
              APIs, and responsive user interfaces.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 group"
              >
                <a href="mailto:gautambinod629@gmail.com">
                  <Mail className="w-5 h-5" />
                  Get in Touch
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-slate-700 bg-[#25D366] hover:bg-[#20bd5a] text-white border-none gap-2"
              >
                <a
                  href="https://wa.me/9779815835831"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>
              </Button>
            </div>

            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/gautam-629"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-all hover:scale-110"
              >
                <Github className="w-7 h-7" />
              </a>
              <a
                href="https://linkedin.com/in/gautambinod"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-all hover:scale-110"
              >
                <Linkedin className="w-7 h-7" />
              </a>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <Terminal className="w-8 h-8 text-blue-400" />
            <h2 className="text-4xl sm:text-5xl font-bold">Work Experience</h2>
          </div>

          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <CardTitle className="text-2xl text-white group-hover:text-blue-400 transition-colors">
                      {job.company}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-blue-500/10 text-blue-400 border-blue-500/20 w-fit"
                    >
                      {job.period}
                    </Badge>
                  </div>
                  <CardDescription className="text-lg text-slate-300">
                    {job.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {job.achievements.map((achievement, i) => (
                      <div
                        key={i}
                        className="flex gap-3 text-slate-300 hover:text-white transition-colors group/item"
                      >
                        <Zap className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover/item:text-yellow-400 transition-colors" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <Code2 className="w-8 h-8 text-purple-400" />
            <h2 className="text-4xl sm:text-5xl font-bold">
              Featured Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-slate-700 transition-all duration-300 group overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white group-hover:text-blue-400 transition-colors">
                    {project.name}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-all hover:scale-110"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-400 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <Wrench className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl sm:text-5xl font-bold">
              Skills & Technologies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <Card
                key={category}
                className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all"
              >
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-white">
                    {category === "Frontend" && (
                      <Code2 className="w-5 h-5 text-blue-400" />
                    )}
                    {category === "Backend" && (
                      <Database className="w-5 h-5 text-green-400" />
                    )}
                    {category === "Databases" && (
                      <Database className="w-5 h-5 text-purple-400" />
                    )}
                    {category === "Languages" && (
                      <Terminal className="w-5 h-5 text-yellow-400" />
                    )}
                    {category === "Tools" && (
                      <Wrench className="w-5 h-5 text-cyan-400" />
                    )}
                    {category === "Other" && (
                      <Sparkles className="w-5 h-5 text-pink-400" />
                    )}
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-300 transition-all"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-32">
          <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Award className="w-8 h-8 text-blue-400" />
                <CardTitle className="text-3xl text-center text-white">
                  Education
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-semibold mb-2 text-white">
                Tribhuvan University
              </p>
              <p className="text-xl text-slate-200 mb-2">
                BCA (Bachelor of Computer Applications)
              </p>
              <p className="text-slate-300">Oct 2019 - Nov 2023</p>
            </CardContent>
          </Card>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-4xl mb-4 text-white">
                Let's Build Something Amazing
              </CardTitle>
              <CardDescription className="text-lg text-slate-200">
                I'm always excited to collaborate on innovative projects and
                opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 gap-2 group"
                >
                  <a href="mailto:gautambinod629@gmail.com">
                    <Mail className="w-5 h-5" />
                    gautambinod629@gmail.com
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-slate-700 bg-[#25D366] hover:bg-[#20bd5a] text-white border-none gap-2"
                >
                  <a
                    href="https://wa.me/9779815835831"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp: 9815835831
                  </a>
                </Button>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />

              <div className="flex justify-center gap-6">
                <a
                  href="https://github.com/gautam-629"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-all hover:scale-110"
                >
                  <Github className="w-6 h-6" />
                  <span className="font-medium">gautam-629</span>
                </a>
                <a
                  href="https://linkedin.com/in/gautambinod"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-all hover:scale-110"
                >
                  <Linkedin className="w-6 h-6" />
                  <span className="font-medium">gautambinod</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-20 text-center text-slate-500 text-sm pb-8">
          <p>
            &copy; {new Date().getFullYear()} Binod Gautam. Crafted with passion
            and code.
          </p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .bg-300\\% {
          background-size: 300%;
        }
      `}</style>
    </div>
  );
}

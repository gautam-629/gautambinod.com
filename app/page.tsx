"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Database,
  Wrench,
  Award,
  ArrowRight,
  Sparkles,
  Terminal,
  Zap,
  ChevronDown,
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
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js Scene Setup
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Floating geometry shapes
    const geometries = [
      new THREE.TorusGeometry(0.7, 0.2, 16, 100),
      new THREE.OctahedronGeometry(0.7),
      new THREE.IcosahedronGeometry(0.7),
    ];

    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xec4899,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    ];

    const meshes = geometries.map((geo, i) => {
      const mesh = new THREE.Mesh(geo, materials[i]);
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5
      );
      scene.add(mesh);
      return mesh;
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      meshes.forEach((mesh, i) => {
        mesh.rotation.x += 0.003 * (i + 1);
        mesh.rotation.y += 0.002 * (i + 1);
        mesh.position.y =
          Math.sin(Date.now() * 0.001 + i) * 0.3 + mesh.position.y * 0.99;
      });

      camera.position.x +=
        (mousePosition.x * 0.0001 - camera.position.x) * 0.05;
      camera.position.y +=
        (-mousePosition.y * 0.0001 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const workExperience = [
    {
      company: "RPA Nepal.Ltd.Pvt",
      role: "Full Stack Developer",
      period: "Apr 2024 - Present",
      achievements: [
        "Worked as a Full Stack Developer delivering end to end features across frontend and backend systems",
        "Built the Kumeji Map PWA using React, Tailwind CSS, and Leaflet.js with immersive 3D and VR map experiences",
        "Developed a real time chat application using Next.js, TypeScript, Express.js, and Socket.io",
        "Designed a scalable and modular HRM system architecture using Next.js ,Nest js and React Query for efficient data handling",
        "Improved the Mobile Khaata application by enhancing UI responsiveness with Redux and Tailwind CSS and integrating REST APIs",
        "Collaborated on Express.js and NestJS backend APIs with PostgreSQL database integration to ensure consistent data flow",
      ],
    },
    {
      company: "Jobaxle.Pvt.Ltd",
      role: "Full Stack Developer",
      period: "Sep 2023 - Apr 2024",
      achievements: [
        "Worked end to end on a job portal platform as a Full Stack Developer",
        "Developed responsive and SEO optimized interfaces using Next.js and Mantine UI",
        "Implemented advanced search, filtering, and resume builder features across frontend and backend",
        "Integrated OAuth authentication using Google and GitHub with secure cookie based sessions",
        "Optimized API integration and performance using TanStack Query and effective caching strategies",
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
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      <div className="fixed inset-0 bg-gradient-to-br from-blue-950/30 via-slate-950/50 to-purple-950/30 pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm mb-8 animate-pulse-slow">
              <Sparkles className="w-4 h-4 text-blue-400 animate-spin-slow" />
              <span className="text-sm text-blue-300 font-medium">
                Available for opportunities
              </span>
            </div>

            <h1 className="text-6xl sm:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient bg-300% tracking-tight">
              Binod Gautam
            </h1>

            <div className="relative mb-8">
              <div className="h-1 w-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full animate-pulse-glow" />
              <div className="absolute inset-0 h-1 w-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full blur-xl opacity-50 animate-pulse" />
            </div>

            <p className="text-2xl sm:text-4xl text-slate-200 max-w-4xl mx-auto mb-6 leading-relaxed font-light tracking-wide">
              Full Stack Developer
            </p>

            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Crafting scalable web applications with modern technologies.
              Specialized in React.js, Next.js, TypeScript, and Node.js
              ecosystems with a passion for clean architecture and exceptional
              user experiences.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white gap-2 group shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
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
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white border-none gap-2 shadow-lg shadow-green-500/30 transition-all hover:shadow-xl hover:shadow-green-500/40 hover:scale-105"
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

            <div className="flex justify-center gap-6 mb-12">
              <a
                href="https://github.com/gautam-629"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-all hover:scale-110 p-3 rounded-full hover:bg-slate-800/50 backdrop-blur-sm"
              >
                <Github className="w-7 h-7" />
              </a>
              <a
                href="https://linkedin.com/in/gautambinod"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-all hover:scale-110 p-3 rounded-full hover:bg-slate-800/50 backdrop-blur-sm"
              >
                <Linkedin className="w-7 h-7" />
              </a>
            </div>

            <div className="animate-bounce mt-16">
              <ChevronDown className="w-8 h-8 text-slate-400 mx-auto" />
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-32 scroll-mt-20">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 rounded-xl bg-blue-500/10 backdrop-blur-sm border border-blue-500/20">
              <Terminal className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 text-transparent bg-clip-text">
              Work Experience
            </h2>
          </div>

          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-500 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <CardTitle className="text-2xl text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-400" />
                      {job.company}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-blue-500/10 text-blue-400 border-blue-500/20 w-fit backdrop-blur-sm px-4 py-1"
                    >
                      {job.period}
                    </Badge>
                  </div>
                  <CardDescription className="text-lg text-slate-300 font-medium">
                    {job.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {job.achievements.map((achievement, i) => (
                      <div
                        key={i}
                        className="flex gap-3 text-slate-300 hover:text-white transition-all group/item pl-3 py-2 rounded-lg hover:bg-slate-800/30"
                      >
                        <div className="mt-1">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover/item:scale-150 transition-transform" />
                        </div>
                        <span className="leading-relaxed">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-32 scroll-mt-20">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 rounded-xl bg-purple-500/10 backdrop-blur-sm border border-purple-500/20">
              <Code2 className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 text-transparent bg-clip-text">
              Featured Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-slate-700 transition-all duration-500 group overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div
                  className={`h-2 bg-gradient-to-r ${project.gradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white group-hover:text-purple-400 transition-colors text-xl">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      {project.name}
                    </span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-all hover:scale-110 p-2 rounded-lg hover:bg-slate-800/50"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </CardTitle>
                  <CardDescription className="text-slate-400 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-slate-700 text-slate-300 hover:border-purple-500 hover:text-purple-400 transition-all hover:scale-110 backdrop-blur-sm"
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
        <section className="mb-32 scroll-mt-20">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 rounded-xl bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20">
              <Wrench className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 text-transparent bg-clip-text">
              Skills & Technologies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <Card
                key={category}
                className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-white group-hover:text-cyan-400 transition-colors">
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
                        className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-300 transition-all hover:scale-110 cursor-default backdrop-blur-sm"
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
        <section className="mb-32 scroll-mt-20">
          <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-[1.02] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
            <CardHeader className="relative">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10 backdrop-blur-sm border border-blue-500/20">
                  <Award className="w-8 h-8 text-blue-400" />
                </div>
                <CardTitle className="text-3xl text-center text-white">
                  Education
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-center relative">
              <p className="text-2xl font-semibold mb-2 text-white">
                Tribhuvan University
              </p>
              <p className="text-xl text-slate-200 mb-2">
                BCA (Bachelor of Computer Applications)
              </p>
              <Badge
                variant="secondary"
                className="bg-blue-500/10 text-blue-400 border-blue-500/20 mt-2"
              >
                Oct 2019 - Nov 2023
              </Badge>
            </CardContent>
          </Card>
        </section>

        {/* Contact CTA */}
        <section className="text-center scroll-mt-20">
          <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative">
              <CardTitle className="text-4xl mb-4 text-white bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Let's Build Something Amazing
              </CardTitle>
              <CardDescription className="text-lg text-slate-200">
                I'm always excited to collaborate on innovative projects and
                opportunities. Let's create something extraordinary together.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 relative">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 gap-2 group/btn shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                >
                  <a href="mailto:gautambinod629@gmail.com">
                    <Mail className="w-5 h-5" />
                    gautambinod629@gmail.com
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white border-none gap-2 shadow-lg shadow-green-500/30 transition-all hover:shadow-xl hover:shadow-green-500/40 hover:scale-105"
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
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-all hover:scale-110 p-3 rounded-lg hover:bg-slate-800/50 backdrop-blur-sm"
                >
                  <Github className="w-6 h-6" />
                  <span className="font-medium">gautam-629</span>
                </a>
                <a
                  href="https://linkedin.com/in/gautambinod"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-all hover:scale-110 p-3 rounded-lg hover:bg-slate-800/50 backdrop-blur-sm"
                >
                  <Linkedin className="w-6 h-6" />
                  <span className="font-medium">gautambinod</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-20 text-center text-slate-500 text-sm pb-8">
          <p className="flex items-center justify-center gap-2">
            &copy; {new Date().getFullYear()} Binod Gautam.
            <span className="inline-flex items-center gap-1">
              Crafted with{" "}
              <Sparkles className="w-4 h-4 text-purple-400 inline animate-pulse" />{" "}
              and code.
            </span>
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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .bg-300\\% {
          background-size: 300%;
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

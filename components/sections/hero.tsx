"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const socialButtonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  return (
    <section id="home" className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <motion.div
          className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content Section */}
          <motion.div className="flex-1 text-center lg:text-left space-y-6 max-w-3xl mx-auto lg:mx-0">
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
                  Binod Gautam
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-medium">
                Full Stack Developer
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              Full Stack Developer passionate about building impactful web
              applications. Experience in React, Node.js, Express, Next.js,
              MongoDB, and MySQL. I enjoy solving complex problems with clean,
              efficient code and stay current with the latest tech trends.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="min-w-[140px]" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-w-[140px]"
                asChild
              >
                <a href="#projects">View Projects</a>
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-6 justify-center lg:justify-start pt-4"
            >
              {[
                {
                  href: "https://github.com/gautam-629",
                  icon: <Github className="h-5 w-5" />,
                  label: "GitHub",
                },
                {
                  href: "https://www.linkedin.com/in/gautambinod/",
                  icon: <Linkedin className="h-5 w-5" />,
                  label: "LinkedIn",
                },
                {
                  href: "mailto:gautambinod629@gmail.com",
                  icon: <Mail className="h-5 w-5" />,
                  label: "Email",
                },
              ].map((social) => (
                <motion.div
                  key={social.label}
                  variants={socialButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12"
                    asChild
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Avatar Section */}
          <motion.div
            variants={avatarVariants}
            className="flex-shrink-0 w-48 sm:w-56 lg:w-72"
          >
            <Avatar className="w-full h-full">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/109918405?v=4"
                alt="Binod Gautam"
                className="object-cover"
              />
              <AvatarFallback className="text-4xl">BG</AvatarFallback>
            </Avatar>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;

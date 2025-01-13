"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Server,
  Layout,
  Box,
  FileJson,
  Layers,
  LucideIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface Skill {
  title: string;
  icon?: LucideIcon;
}

const skills: Skill[] = [
  { title: "HTML", icon: Layout },
  { title: "CSS", icon: Globe },
  { title: "React", icon: Code2 },
  { title: "Node", icon: Server },
  { title: "MongoDB", icon: Database },
  { title: "Next.js", icon: Box },
  { title: "Express.js", icon: Server },
  { title: "TypeScript", icon: FileJson },
  { title: "MySQL", icon: Layers },
  { title: "Docker" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive list of my technical skills and expertise
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {skills.map((skill) => (
            <motion.div key={skill.title} variants={item}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  {skill.icon && (
                    <skill.icon className="w-8 h-8 mx-auto mb-2" />
                  )}
                  <CardTitle className="text-base">{skill.title}</CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { personalInfo } from "@/data/portfolio";
import { Code2, Server, Database } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-8" />

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {personalInfo.summary}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I love turning complex problems into simple, beautiful, and intuitive solutions.
                When I'm not coding, you'll find me exploring new technologies and contributing to
                open-source projects.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Code2, label: "Frontend", desc: "React, Next.js, TypeScript" },
                { icon: Server, label: "Backend", desc: "Node.js, NestJS, Express" },
                { icon: Database, label: "Database", desc: "PostgreSQL, MongoDB, Redis" },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="glass-card p-4 flex items-center gap-4 hover:border-primary/50 transition-colors">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{label}</h3>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/data/portfolio";

const categoryColors: Record<string, string> = {
  Frontend: "border-primary/40 text-primary",
  Backend: "border-secondary/40 text-secondary",
  Languages: "border-yellow-500/40 text-yellow-400",
  Databases: "border-orange-500/40 text-orange-400",
  Tools: "border-pink-500/40 text-pink-400",
  Other: "border-violet-500/40 text-violet-400",
};

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-10" />

          <div className="space-y-8">
            {Object.entries(skills).map(([category, items], ci) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: ci * 0.1 }}
              >
                <h3 className="font-mono text-sm text-muted-foreground mb-3">{`// ${category}`}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: ci * 0.1 + si * 0.03 }}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg border bg-muted/50 hover:bg-muted transition-colors cursor-default ${
                        categoryColors[category] || "border-border text-foreground"
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { education } from "@/data/portfolio";
import { GraduationCap } from "lucide-react";

const EducationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding">
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Education</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-10" />

          <div className="glass-card p-6 md:p-8 flex items-start gap-5">
            <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
              <GraduationCap size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold">{education.institution}</h3>
              <p className="text-primary font-mono text-sm mt-1">{education.degree}</p>
              <p className="text-muted-foreground text-sm mt-1 font-mono">{education.period}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;

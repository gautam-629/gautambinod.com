import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/data/portfolio";
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [filter, setFilter] = useState<string>("All");

  const allTechs = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tech)))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.tech.includes(filter));

  const openProject = (i: number) => {
    setSelected(i);
    setActiveImg(0);
  };

  const navigateProject = (dir: number) => {
    if (selected === null) return;
    const newIdx = (selected + dir + filtered.length) % filtered.length;
    setSelected(newIdx);
    setActiveImg(0);
  };

  const selectedProject = selected !== null ? filtered[selected] : null;

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto max-w-5xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-8" />

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {allTechs.slice(0, 10).map((tech) => (
              <button
                key={tech}
                onClick={() => { setFilter(tech); setSelected(null); }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border ${
                  filter === tech
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  onClick={() => openProject(i)}
                  className="group glass-card overflow-hidden hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 cursor-pointer hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.2)]"
                >
                  {/* Project image as card header */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={project.images[0]}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20 group-hover:opacity-10 transition-opacity`} />
                    {/* Image count badge */}
                    {project.images.length > 1 && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-mono bg-background/70 backdrop-blur-sm text-foreground border border-border">
                        {project.images.length} images
                      </span>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">View Details</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{project.name}</h3>
                      <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs font-mono px-2 py-1 rounded-md bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Project detail modal with image gallery */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-background/60 backdrop-blur-sm text-foreground hover:bg-background/80 transition-colors"
              >
                <X size={16} />
              </button>

              {/* Main image */}
              <div className="relative h-56 md:h-72 overflow-hidden shrink-0">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={selectedProject.images[activeImg]}
                    alt={`${selectedProject.name} screenshot ${activeImg + 1}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className={`absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent`} />

                {/* Image nav arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg((activeImg - 1 + selectedProject.images.length) % selectedProject.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 backdrop-blur-sm text-foreground hover:bg-background/80 transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setActiveImg((activeImg + 1) % selectedProject.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 backdrop-blur-sm text-foreground hover:bg-background/80 transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <span className="absolute bottom-3 right-3 px-2 py-1 rounded-full text-xs font-mono bg-background/60 backdrop-blur-sm text-foreground">
                  {activeImg + 1} / {selectedProject.images.length}
                </span>
              </div>

              {/* Thumbnail strip */}
              {selectedProject.images.length > 1 && (
                <div className="flex gap-2 px-6 pt-4 shrink-0">
                  {selectedProject.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className={`relative w-16 h-10 md:w-20 md:h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        idx === activeImg
                          ? "border-primary ring-1 ring-primary/30 scale-105"
                          : "border-border opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Project info */}
              <div className="p-6 overflow-y-auto">
                <h3 className="text-2xl font-bold mb-2">{selectedProject.name}</h3>
                <p className="text-muted-foreground mb-5">{selectedProject.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-lg border border-primary/30 text-primary bg-primary/5">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink size={16} />
                    View Live Project
                  </a>

                  {/* Project navigation */}
                  {filtered.length > 1 && (
                    <div className="flex gap-1 ml-auto">
                      <button
                        onClick={() => navigateProject(-1)}
                        className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => navigateProject(1)}
                        className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;

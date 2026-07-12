'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Code, 
  Cloud, 
  Palette, 
  Smartphone, 
  Database, 
  Zap, 
  Check, 
  Clock, 
  Send, 
  Activity, 
  Terminal 
} from "lucide-react";
import { formatCurrency } from "@/utils/format";
import type { Service } from "@prisma/client";
import type { ElementType } from "react";

const iconMap: Record<string, ElementType> = {
  Code, 
  Cloud, 
  Palette, 
  Smartphone, 
  Database, 
  Zap
};

interface Props {
  services: Service[];
}

export function ServicesOverview({ services }: Props) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  if (!services.length) return null;

  const parseJsonArray = (jsonVal: any): string[] => {
    if (!jsonVal) return [];
    if (typeof jsonVal === "string") {
      try {
        const parsed = JSON.parse(jsonVal);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return Array.isArray(jsonVal) ? jsonVal : [];
  };

  const activeService = services[activeIdx];
  const features = parseJsonArray(activeService.features);
  const technologies = parseJsonArray(activeService.technologies);

  return (
    <section className="py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-2">My Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Capabilities & Services
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Professional end-to-end full-stack development, low-latency messaging design, and high-performance database optimization.
          </p>
        </div>

        {/* Dynamic Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Tab-style Selection Cards */}
          <div className="lg:col-span-5 space-y-4">
            {services.map((service, i) => {
              const Icon = (service.icon ? iconMap[service.icon] : null) ?? Code;
              const isActive = activeIdx === i;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveIdx(i)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative flex gap-4 items-center focus-visible:outline-none ${
                    isActive 
                      ? "bg-card border-primary/40 shadow-lg shadow-primary/5 scale-102" 
                      : "bg-muted/10 hover:bg-muted/20 border-border/30"
                  }`}
                >
                  {/* Left Accent indicator for active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceBar"
                      className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-r"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-sm sm:text-base leading-snug truncate ${
                      isActive ? "text-foreground font-extrabold" : "text-muted-foreground"
                    }`}>
                      {service.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 font-mono text-[10px]">
                      {service.startingPrice && (
                        <span className="text-primary font-semibold">
                          From {formatCurrency(service.startingPrice)}
                        </span>
                      )}
                      {service.timeline && (
                        <span className="text-muted-foreground">
                          · {service.timeline}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${
                    isActive ? "text-primary translate-x-1" : "text-muted-foreground/40 opacity-0 group-hover:opacity-100"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Details & Animated Mockup Visuals */}
          <div className="lg:col-span-7 rounded-3xl border border-border/50 bg-card/65 backdrop-blur-md overflow-hidden relative shadow-xl shadow-black/5 flex flex-col justify-between min-h-[580px]">
            <div className="p-6 sm:p-8 space-y-6">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  {/* Top Heading */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">{activeService.title}</h3>
                    {activeService.shortDesc && (
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                        {activeService.shortDesc}
                      </p>
                    )}
                  </div>

                  {/* Dynamic Interactive Demos */}
                  <div className="rounded-xl border border-border/40 bg-muted/20 overflow-hidden shadow-inner">
                    <ServiceVisualDemo slug={activeService.slug} />
                  </div>

                  {/* Core Features */}
                  {features.length > 0 && (
                    <div className="space-y-2.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Deliverables & Features</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs">
                            <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-muted-foreground leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies utilized */}
                  {technologies.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Tech Stack Stack</p>
                      <div className="flex flex-wrap gap-1.5">
                        {technologies.map((tech, idx) => (
                          <span key={idx} className="text-[10px] bg-muted/65 border border-border/30 px-2 py-0.5 rounded text-muted-foreground font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Footer Summary Card */}
            <div className="p-6 bg-muted/30 border-t border-border/40 flex items-center justify-between">
              {activeService.startingPrice ? (
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Starting price</p>
                  <span className="text-base sm:text-lg font-bold text-primary font-mono">
                    {formatCurrency(activeService.startingPrice)}
                    {activeService.priceUnit && <span className="text-xs text-muted-foreground font-normal"> / {activeService.priceUnit}</span>}
                  </span>
                </div>
              ) : <div />}

              <Link
                href={`/contact?service=${encodeURIComponent(activeService.title)}`}
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-bold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-103 shadow-md shadow-primary/10 group"
              >
                Book Consultation 
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// Live Interactive Visual Widgets mapping to Services
// ─────────────────────────────────────────────────────────
// Real-Time Chat Simulation Loop Component
function RealTimeDemo() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "System", text: "WebSocket connecting to ws://api.devfolio.io..." },
  ]);
  const chatSequence = [
    { sender: "System", text: "✓ Socket connection established (Session ID: s_98x1)" },
    { sender: "Client", text: "Hi Binod, can we coordinate real-time tracking?" },
    { sender: "Binod", text: "Hey! Yes, Socket.io is handling coordinate streams." },
    { sender: "Client", text: "Awesome, updates are fast! What is the latency?" },
    { sender: "Binod", text: "Under 15ms. Low-latency buffers are running perfectly." },
    { sender: "System", text: "Heartbeat ping: 12ms (Active)" }
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < chatSequence.length) {
        setMessages(prev => [...prev, chatSequence[index]]);
        index++;
      } else {
        setMessages([
          { sender: "System", text: "WebSocket connecting to ws://api.devfolio.io..." }
        ]);
        index = 0;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 font-mono text-[10px] sm:text-xs text-foreground bg-black/90 min-h-[160px] flex flex-col justify-between">
      <div className="flex justify-between items-center pb-2 border-b border-white/10 text-white/50">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span>ws_sync_session</span>
        </div>
        <Activity className="h-3.5 w-3.5 text-green-500" />
      </div>
      
      <div className="space-y-1.5 my-3 flex-1 overflow-y-auto max-h-[110px] custom-scrollbar scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'Client' ? 'justify-end' : 'justify-start'}`}>
            <span className={`px-2 py-1 rounded max-w-[85%] leading-normal ${
              msg.sender === 'System' 
                ? 'text-yellow-500' 
                : msg.sender === 'Client' 
                ? 'bg-blue-600/20 border border-blue-500/30 text-blue-300' 
                : 'bg-green-600/20 border border-green-500/30 text-green-300'
            }`}>
              {msg.sender !== 'System' && <strong className="mr-1">{msg.sender}:</strong>}
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 items-center pt-2 border-t border-white/10 text-white/40">
        <span className="flex-1 truncate">Type message and broadcast...</span>
        <Send className="h-3 w-3" />
      </div>
    </div>
  );
}

// Database Query trace & Benchmark Simulation Component
function DatabaseDemo() {
  const [benchmarkStep, setBenchmarkStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBenchmarkStep(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 font-mono text-[10px] sm:text-xs text-foreground bg-black/90 min-h-[160px] flex flex-col justify-between">
      <div className="flex justify-between items-center pb-2 border-b border-white/10 text-white/50">
        <div className="flex items-center gap-1.5">
          <Terminal className="h-3.5 w-3.5 text-orange-500" />
          <span>query_optimizer_trace</span>
        </div>
        <span className="text-[9px] uppercase bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/20 font-bold">PostgreSQL</span>
      </div>

      <div className="py-3 flex-1 flex flex-col justify-center space-y-3">
        <div>
          <span className="text-white/40">SQL Query:</span>
          <code className="block text-white/90 bg-white/5 p-1.5 rounded text-[9px] sm:text-[10px] mt-1 break-all select-all">
            SELECT * FROM "orders" WHERE "status" = 'PAID' ORDER BY "createdAt" DESC LIMIT 100;
          </code>
        </div>

        <AnimatePresence mode="wait">
          {benchmarkStep === 0 && (
            <motion.div
              key="trace0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-1"
            >
              <div className="flex justify-between items-center text-red-400">
                <span>↳ EXPLAIN: Seq Scan on "orders"</span>
                <span className="font-bold">382 ms ⚠️</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded overflow-hidden">
                <div className="bg-red-500 h-full w-[90%]" />
              </div>
            </motion.div>
          )}
          {benchmarkStep === 1 && (
            <motion.div
              key="trace1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-1"
            >
              <div className="flex justify-between text-yellow-400">
                <span>↳ ADD INDEX: idx_orders_status_createdat</span>
                <span>Applying...</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded overflow-hidden">
                <div className="bg-yellow-500 h-full w-full animate-pulse" />
              </div>
            </motion.div>
          )}
          {benchmarkStep === 2 && (
            <motion.div
              key="trace2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-1"
            >
              <div className="flex justify-between items-center text-green-400">
                <span>↳ EXPLAIN: Index Scan using "idx_orders_status_createdat"</span>
                <span className="font-bold">4.2 ms 🔥 90x Faster</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded overflow-hidden">
                <div className="bg-green-500 h-full w-[5%]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-[9px] text-white/30 flex justify-between">
        <span>Schema Optimization Active</span>
        <span>Buffer hits: 100%</span>
      </div>
    </div>
  );
}

// Full-Stack Web Development: IDE Editor typing snippet Component
function ServerEditorDemo({ slug }: { slug: string }) {
  const [typedCode, setTypedCode] = useState("");
  const codeSnippet = `const app = express();
app.use(authMiddleware);

app.get('/api/projects', async (req, res) => {
  const list = await prisma.project.findMany({
    where: { isActive: true },
    include: { category: true }
  });
  return res.json(list);
});`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < codeSnippet.length) {
        setTypedCode(codeSnippet.slice(0, i + 1));
        i++;
      } else {
        setTypedCode("");
        i = 0;
      }
    }, 40);
    return () => clearInterval(interval);
  }, [slug]);

  return (
    <div className="p-4 font-mono text-[10px] sm:text-xs text-foreground bg-black/90 min-h-[160px] flex flex-col justify-between">
      <div className="flex justify-between items-center pb-2 border-b border-white/10 text-white/50">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500 shrink-0" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 shrink-0" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500 shrink-0" />
          <span className="ml-1.5">server.ts</span>
        </div>
        <span className="text-[9px] uppercase bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20 font-bold">TypeScript</span>
      </div>

      <div className="py-2.5 flex-1 select-none">
        <pre className="text-blue-400 text-[9px] sm:text-[10px] overflow-x-auto whitespace-pre-wrap leading-normal">
          {typedCode}
          <span className="w-1.5 h-3 bg-white ml-0.5 inline-block animate-pulse" />
        </pre>
      </div>

      <div className="text-[9px] text-white/30 flex justify-between items-center pt-1">
        <span>Ln 8, Col 24</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}

function ServiceVisualDemo({ slug }: { slug: string }) {
  if (slug.includes("real-time")) {
    return <RealTimeDemo />;
  }
  if (slug.includes("api") || slug.includes("database")) {
    return <DatabaseDemo />;
  }
  return <ServerEditorDemo slug={slug} />;
}

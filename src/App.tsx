import cvFile from "./assets/ppm_cv.pdf";
import "./App.css";
import {
  ExternalLink,
  Code2,
  Database,
  Layers,
  Server,
  Search,
  ShoppingCart,
  Terminal,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  // Custom cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const skills = [
    { name: "Express.js", category: "Backend", icon: <Server className="w-4 h-4" /> },
    { name: "NestJS", category: "Backend", icon: <Server className="w-4 h-4" /> },
    { name: "Go", category: "Backend (Learning)", icon: <Server className="w-4 h-4" /> },
    { name: "REST API", category: "Backend", icon: <Database className="w-4 h-4" /> },
    { name: "React / Vite", category: "Frontend", icon: <Code2 className="w-4 h-4" /> },
    { name: "Next.js", category: "Frontend", icon: <Layers className="w-4 h-4" /> },
    { name: "TypeScript", category: "Language", icon: <Code2 className="w-4 h-4" /> },
    { name: "Tailwind CSS", category: "Styling", icon: <Layers className="w-4 h-4" /> },
    { name: "Git", category: "Version Control", icon: <Code2 className="w-4 h-4" /> },
  ];

  const projects = [
    {
      title: "Sipman",
      url: "https://www.sipman.asia/",
      description:
        "Digital beverage-management platform for HORECA businesses: real-time inventory tracking, digital/printable beverage menus, and supplier workflow — built for wine bars, restaurants and retail shops. Powered by a scalable backend and analytics-driven ordering tools.",
      tags: ["TypeScript", "Node", "NextJS", "PostgreSQL"],
      metrics: "High Concurrency Handling",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      title: "Shwekhit Estate",
      url: "https://shwekhitestate.com/",
      description:
        "Real estate marketplace. Architected RESTful APIs and implemented complex search logic to handle large-scale property listings.",
      tags: ["Go", "Gin", "REST API", "NextJS"],
      metrics: "Optimized Search Logic",
      icon: <Search className="w-5 h-5" />,
    },
  ];

  // Light streaks animation (keeping your existing code)
  type LightStreak = {
    x: number;
    y: number;
    direction: "horizontal" | "vertical";
    progress: number;
    speed: number;
    length: number;
    active: boolean;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lightStreaks: LightStreak[] = [];
    const GRID_SIZE = 40;

    const initLightStreaks = () => {
      const streaks: LightStreak[] = [];
      const numHorizontal = Math.ceil(canvas.height / GRID_SIZE) * 1.5;
      const numVertical = Math.ceil(canvas.width / GRID_SIZE) * 1.5;

      for (let i = 0; i < numHorizontal; i++) {
        const y = Math.random() * canvas.height;
        streaks.push({
          x: -100,
          y: y,
          direction: "horizontal",
          progress: Math.random(),
          speed: 0.001 + Math.random() * 0.002,
          length: 80 + Math.random() * 120,
          active: true,
        });
      }

      for (let i = 0; i < numVertical; i++) {
        const x = Math.random() * canvas.width;
        streaks.push({
          x: x,
          y: -100,
          direction: "vertical",
          progress: Math.random(),
          speed: 0.001 + Math.random() * 0.002,
          length: 80 + Math.random() * 120,
          active: true,
        });
      }

      return streaks;
    };

    const drawGrid = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.beginPath();
      ctx.strokeStyle = "rgba(128, 128, 128, 0.08)";
      ctx.lineWidth = 0.5;

      for (let x = 0; x <= width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawLightStreaks = () => {
      for (let i = 0; i < lightStreaks.length; i++) {
        const streak = lightStreaks[i];
        streak.progress += streak.speed;

        if (streak.progress >= 1) {
          streak.progress = 0;
          if (streak.direction === "horizontal") {
            streak.y = Math.random() * canvas.height;
          } else {
            streak.x = Math.random() * canvas.width;
          }
          streak.speed = 0.001 + Math.random() * 0.002;
          streak.length = 80 + Math.random() * 120;
        }

        let startX, startY, endX, endY;
        const alpha = Math.sin(streak.progress * Math.PI) * 0.15;

        if (streak.direction === "horizontal") {
          const startProgress = Math.max(0, streak.progress - streak.length / canvas.width);
          const endProgress = streak.progress;
          startX = startProgress * canvas.width;
          endX = endProgress * canvas.width;
          startY = streak.y;
          endY = streak.y;
          const gridY = Math.round(streak.y / GRID_SIZE) * GRID_SIZE;
          startY = gridY;
          endY = gridY;
        } else {
          const startProgress = Math.max(0, streak.progress - streak.length / canvas.height);
          const endProgress = streak.progress;
          startX = streak.x;
          endX = streak.x;
          startY = startProgress * canvas.height;
          endY = endProgress * canvas.height;
          const gridX = Math.round(streak.x / GRID_SIZE) * GRID_SIZE;
          startX = gridX;
          endX = gridX;
        }

        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${alpha * 0.6})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${alpha})`);
        gradient.addColorStop(0.7, `rgba(255, 255, 255, ${alpha * 0.6})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5 + Math.sin(streak.progress * Math.PI) * 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(endX, endY, 2 + Math.sin(streak.progress * Math.PI * 4) * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(endX, endY, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
        ctx.fill();
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      lightStreaks = initLightStreaks();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      drawLightStreaks();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-slate-300 font-mono selection:bg-blue-500/30 relative overflow-hidden">
      {/* Custom Cursor - Hide on mobile */}
      <motion.div
        className="fixed w-8 h-8 border-2 border-blue-500 rounded-full pointer-events-none z-50 hidden lg:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: cursorVariant === "hover" ? 1.5 : 1,
          opacity: cursorVariant === "hover" ? 0.8 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-50 hidden lg:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 28 }}
      />

      {/* Canvas for animated white light streaks */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.5 }} />
      <div className="fixed inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-24 border-b border-white/5 pb-8"
        >
          <div className="flex items-center gap-4">
            <span className="text-white font-bold tracking-widest text-sm inline-flex items-center gap-2">
              <Terminal className="w-4 h-4" /> PYAE PHYO MAUNG
            </span>
          </div>
          <div className="flex gap-6 text-xs font-medium uppercase tracking-widest">
            {["GitHub", "Email"].map((item, idx) => (
              <motion.a
                key={item}
                href={item === "GitHub" ? "https://github.com/pyaephyomaung1" : "mailto:pyaephyomg.ppm06@gmail.com"}
                target="_blank"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                whileHover={{ scale: 1.1, color: "#ffffff" }}
                whileTap={{ scale: 0.95 }}
                className="hover:text-white transition-colors"
                onHoverStart={() => setCursorVariant("hover")}
                onHoverEnd={() => setCursorVariant("default")}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 text-blue-500 mb-6 font-bold text-xs tracking-widest uppercase"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1.5 h-1.5 bg-blue-500 rounded-full"
              />
              <span>Web Developer</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-none"
            >
              I build <span className="text-slate-500">fast RESTful APIs</span>{" "}
              & modern web applications.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-slate-400 mb-10 leading-relaxed font-sans max-w-2xl"
            >
              Web Developer with 1+ year of experience. Specialize in Express.js, NestJS, 
              and React/Next.js. Currently learning Go to build even faster backends.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {[
                { text: "View Work", href: "#projects", icon: <ChevronRight className="w-4 h-4" />, primary: true },
                { text: "Hire Me", href: "mailto:pyaephyomg.ppm06@gmail.com", icon: null, primary: false },
                { text: "Download CV", href: cvFile, icon: null, primary: false, download: true },
              ].map((btn) => (
                <motion.a
                  key={btn.text}
                  href={btn.href}
                  download={btn.download}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setCursorVariant("hover")}
                  onHoverEnd={() => setCursorVariant("default")}
                  className={`px-6 py-3 text-xs font-bold uppercase rounded-sm transition-all flex items-center gap-2 ${
                    btn.primary
                      ? "bg-white text-black hover:bg-slate-200"
                      : "border border-white/10 text-white hover:bg-white/5"
                  }`}
                >
                  {btn.text} {btn.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Technical Stack - No hover effects or animations */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
            Technical Stack <span className="h-px flex-1 bg-white/5"></span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-[#0a0a0b] p-8 flex flex-col gap-4 transition-colors duration-300"
              >
                <div className="text-white opacity-40 group-hover:opacity-100 transition-opacity">
                  {skill.icon}
                </div>
                <div>
                  <div className="text-white text-sm font-bold mb-1">{skill.name}</div>
                  <div className="text-slate-600 text-[10px] uppercase tracking-widest font-bold">
                    {skill.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects with hover effects */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          id="projects"
          className="mb-32"
        >
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
            Production Work <span className="h-px flex-1 bg-white/5"></span>
          </h2>
          <div className="space-y-6">
            <AnimatePresence>
              {projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  onHoverStart={() => {
                    setHoveredProject(idx);
                    setCursorVariant("hover");
                  }}
                  onHoverEnd={() => {
                    setHoveredProject(null);
                    setCursorVariant("default");
                  }}
                  className="group relative border border-white/5 bg-white/1 p-8 md:p-12 rounded-sm transition-all duration-300 cursor-pointer"
                  style={{
                    borderColor: hoveredProject === idx ? "rgba(59, 130, 246, 0.5)" : "rgba(255,255,255,0.05)",
                    boxShadow: hoveredProject === idx ? "0 0 30px rgba(59, 130, 246, 0.1)" : "none",
                  }}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-blue-500">{project.icon}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          {project.metrics}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 mb-8 font-sans leading-relaxed max-w-xl transition-all duration-300">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {project.tags.map((tag, tagIdx) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: tagIdx * 0.05 }}
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                            className="text-[10px] px-2 py-1 bg-white/5 text-slate-400 rounded-sm font-bold uppercase transition-all duration-300 cursor-pointer"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <motion.a
                        href={project.url}
                        target="_blank"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 border border-white/10 rounded-sm hover:bg-white hover:text-black transition-all"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href={project.url}
                        target="_blank"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProject === idx ? 1 : 0 }}
                        className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-white transition-colors"
                      >
                        Live Preview <ArrowUpRight className="w-3 h-3 inline" />
                      </motion.a>
                    </div>
                  </div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredProject === idx ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-blue-500 via-purple-500 to-transparent"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/5 pt-24 pb-12"
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl font-bold text-white mb-4 tracking-tight"
              >
                Looking for new challenges.
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-500 text-sm font-sans mb-8"
              >
                Currently open to junior/mid fullstack roles specializing in Go and the React ecosystem.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex gap-4"
              >
                <motion.a
                  href="mailto:pyaephyomg.ppm06@gmail.com"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setCursorVariant("hover")}
                  onHoverEnd={() => setCursorVariant("default")}
                  className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase rounded-sm hover:bg-slate-200 transition-all"
                >
                  Contact Me
                </motion.a>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-end items-end gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-600"
            >
              <p>Pyae Phyo Maung — {new Date().getFullYear()}</p>
              <p className="text-slate-800">Designed for performance</p>
            </motion.div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default App;
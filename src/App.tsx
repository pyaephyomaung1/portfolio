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
} from "lucide-react";
import { useEffect, useRef } from "react";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const skills = [
    {
      name: "Go / Gin",
      category: "Backend",
      icon: <Server className="w-4 h-4" />,
    },
    {
      name: "GORM",
      category: "Backend",
      icon: <Database className="w-4 h-4" />,
    },
    {
      name: "PostgreSQL",
      category: "Database",
      icon: <Database className="w-4 h-4" />,
    },
    {
      name: "TypeScript",
      category: "Language",
      icon: <Code2 className="w-4 h-4" />,
    },
    {
      name: "React / Next.js",
      category: "Frontend",
      icon: <Layers className="w-4 h-4" />,
    },
    { name: "Tailwind", category: "CSS", icon: <Layers className="w-4 h-4" /> },
  ];

  const projects = [
    {
      title: "Sipman",
      url: "https://www.sipman.asia/",
      description:
        "E-commerce platform for premium wine. Focused on high-concurrency e-commerce logic and backend performance optimization using Go.",
      tags: ["Go", "Gin", "Next.js", "PostgreSQL"],
      metrics: "High Concurrency Handling",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      title: "Shwekhit Estate",
      url: "https://shwekhitestate.com/",
      description:
        "Real estate marketplace. Architected RESTful APIs and implemented complex search logic to handle large-scale property listings.",
      tags: ["Next.js", "TypeScript", "REST API", "GORM"],
      metrics: "Optimized Search Logic",
      icon: <Search className="w-5 h-5" />,
    },
  ];

  // Animated white light streaks along grid lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Light streak objects
    let lightStreaks: Array<{
      x: number;
      y: number;
      direction: "horizontal" | "vertical";
      progress: number;
      speed: number;
      length: number;
      active: boolean;
    }> = [];

    const GRID_SIZE = 40;

    const initLightStreaks = () => {
      const streaks = [];
      const numHorizontal = Math.ceil(canvas.height / GRID_SIZE) * 1.5;
      const numVertical = Math.ceil(canvas.width / GRID_SIZE) * 1.5;

      // Create horizontal streaks (moving left to right)
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

      // Create vertical streaks (moving top to bottom)
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

      // Draw vertical lines
      for (let x = 0; x <= width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw horizontal lines
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

        // Update progress
        streak.progress += streak.speed;

        // Reset if finished
        if (streak.progress >= 1) {
          streak.progress = 0;
          // Randomize new position
          if (streak.direction === "horizontal") {
            streak.y = Math.random() * canvas.height;
          } else {
            streak.x = Math.random() * canvas.width;
          }
          // Randomize speed slightly
          streak.speed = 0.001 + Math.random() * 0.002;
          // Randomize length
          streak.length = 80 + Math.random() * 120;
        }

        // Calculate position
        let startX, startY, endX, endY;
        // Very low opacity for subtle effect
        const alpha = Math.sin(streak.progress * Math.PI) * 0.15;

        if (streak.direction === "horizontal") {
          const startProgress = Math.max(
            0,
            streak.progress - streak.length / canvas.width,
          );
          const endProgress = streak.progress;

          startX = startProgress * canvas.width;
          endX = endProgress * canvas.width;
          startY = streak.y;
          endY = streak.y;

          // Snap to nearest grid line for better alignment
          const gridY = Math.round(streak.y / GRID_SIZE) * GRID_SIZE;
          startY = gridY;
          endY = gridY;
        } else {
          const startProgress = Math.max(
            0,
            streak.progress - streak.length / canvas.height,
          );
          const endProgress = streak.progress;

          startX = streak.x;
          endX = streak.x;
          startY = startProgress * canvas.height;
          endY = endProgress * canvas.height;

          // Snap to nearest grid line
          const gridX = Math.round(streak.x / GRID_SIZE) * GRID_SIZE;
          startX = gridX;
          endX = gridX;
        }

        // Draw the light streak with white gradient at low opacity
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

        // Draw subtle glowing core at the head
        ctx.beginPath();
        ctx.arc(
          endX,
          endY,
          2 + Math.sin(streak.progress * Math.PI * 4) * 0.5,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.fill();

        // Add very subtle glow effect
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
      {/* Canvas for animated white light streaks */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.5 }}
      />

      {/* Additional subtle glow overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <nav className="flex justify-between items-center mb-24 border-b border-white/5 pb-8">
          <div className="flex items-center gap-4">
            <span className="text-white font-bold tracking-widest text-sm">
              PYAE PHYO MAUNG
            </span>
          </div>
          <div className="flex gap-6 text-xs font-medium uppercase tracking-widest">
            <a
              href="https://github.com/pyaephyomaung1"
              target="_blank"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:pyaephyomg.ppm06@gmail.com"
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="mb-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-blue-500 mb-6 font-bold text-xs tracking-widest uppercase">
              <Terminal className="w-4 h-4" />
              <span>Full Stack Engineer</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-none">
              I build{" "}
              <span className="text-slate-500">high-performance backends</span>{" "}
              in Go & sleek frontends in React.
            </h1>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed font-sans max-w-2xl">
              Junior Developer with 1+ year of experience. Currently focused on
              building scalable architectures and learning challenging new
              systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-white text-black text-xs font-bold uppercase rounded-sm hover:bg-slate-200 transition-all flex items-center gap-2"
              >
                Browse Projects <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:pyaephyomg.ppm06@gmail.com"
                className="px-6 py-3 border border-white/10 text-white text-xs font-bold uppercase rounded-sm hover:bg-white/5 transition-all"
              >
                Get in touch
              </a>
            </div>
          </div>
        </section>

        {/* Technical Stack - Minimal Grid */}
        <section className="mb-32">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
            Technical Stack <span className="h-[1px] flex-1 bg-white/5"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-[#0a0a0b] p-8 flex flex-col gap-4 group hover:bg-white/[0.02] transition-colors relative overflow-hidden"
              >
                <div className="text-white opacity-40 group-hover:opacity-100 transition-opacity">
                  {skill.icon}
                </div>
                <div>
                  <div className="text-white text-sm font-bold mb-1">
                    {skill.name}
                  </div>
                  <div className="text-slate-600 text-[10px] uppercase tracking-widest font-bold">
                    {skill.category}
                  </div>
                </div>
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
        </section>

        {/* Projects - List Style */}
        <section id="projects" className="mb-32">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
            Production Work <span className="h-[1px] flex-1 bg-white/5"></span>
          </h2>
          <div className="space-y-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group relative border border-white/5 bg-white/[0.01] p-8 md:p-12 rounded-sm hover:border-white/20 transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-blue-500">{project.icon}</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {project.metrics}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 mb-8 font-sans leading-relaxed max-w-xl">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-1 bg-white/5 text-slate-400 rounded-sm font-bold uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <a
                      href={project.url}
                      target="_blank"
                      className="p-4 border border-white/10 rounded-sm hover:bg-white hover:text-black transition-all"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a
                      href={project.url}
                      target="_blank"
                      className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                    >
                      Live Preview _
                    </a>
                  </div>
                </div>
                {/* Subtle border glow on hover */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-sm transition-all pointer-events-none" />
              </div>
            ))}
          </div>
        </section>

        {/* Footer / Contact */}
        <footer className="border-t border-white/5 pt-24 pb-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                Looking for new challenges.
              </h3>
              <p className="text-slate-500 text-sm font-sans mb-8">
                Currently open to junior/mid fullstack roles specializing in Go
                and the React ecosystem.
              </p>
              <div className="flex gap-4">
                <a
                  href="mailto:pyaephyomg.ppm06@gmail.com"
                  className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase rounded-sm hover:bg-slate-200 transition-all"
                >
                  Contact Me
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-end items-end gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
              <p>Pyae Phyo Maung — 2024</p>
              <p className="text-slate-800">Designed for performance</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;

"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Smartphone, Monitor, Server, Palette, Brain, Code2, Database, Layers,
} from "lucide-react";
import { SKILLS } from "@/constants/data";
import { Reveal } from "@/components/animations/Reveal";
import { AnimeHeading } from "@/components/animations/AnimeHeading";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Smartphone, Monitor, Server, Palette, Brain, Code2, Database, Layers,
};

const EXPO = [0.22, 1, 0.36, 1] as const;

// ─── Tilt card ────────────────────────────────────────────────────────────────

function TiltCard({
  group,
  idx,
}: {
  group: (typeof SKILLS)[number];
  idx: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = ICON_MAP[group.icon] || Code2;

  // Normalised mouse position: -0.5 → 0.5
  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const x = useSpring(xRaw, { stiffness: 180, damping: 26 });
  const y = useSpring(yRaw, { stiffness: 180, damping: 26 });

  // Rotation — no preserve-3d so overflow-hidden works correctly
  const rotateX = useTransform(y, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-7deg", "7deg"]);

  // Reactive spotlight position (useMotionTemplate makes it update on every frame)
  const spotX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const spotY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);
  const spotBg = useMotionTemplate`radial-gradient(circle at ${spotX} ${spotY}, rgba(139,92,246,0.14) 0%, transparent 62%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    xRaw.set((e.clientX - r.left) / r.width - 0.5);
    yRaw.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    xRaw.set(0);
    yRaw.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: EXPO, delay: idx * 0.08 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
        className="group relative p-7 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/[0.15] backdrop-blur-sm cursor-default overflow-hidden"
      >
        {/* Reactive cursor spotlight — uses useMotionTemplate so it updates every frame */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotBg }}
        />

        {/* Inset glow border on hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: "inset 0 0 0 1px rgba(139,92,246,0.3)" }}
        />

        {/* Card content */}
        <div className="relative z-10">
          {/* Icon badge */}
          <div
            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center mb-5 shadow-md ${group.glow}`}
          >
            <Icon size={20} className="text-white" />
          </div>

          {/* Category label */}
          <h3 className="font-bold text-white text-base mb-3">{group.category}</h3>

          {/* Skill chips */}
          <div className="flex flex-wrap gap-1.5">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 text-[11px] font-medium bg-white/5 border border-white/10 text-zinc-400 rounded-md hover:border-violet-500/30 hover:text-zinc-200 hover:bg-violet-500/6 transition-all duration-200 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* BG glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-blue-600/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-violet-600/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">Skills</span>
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.05}>
          <AnimeHeading
            tag="h2"
            scramble
            className="text-4xl sm:text-5xl font-black text-white mb-2 leading-tight"
          >
            Tools & technologies
          </AnimeHeading>
          <div className="overflow-hidden mb-4">
            <motion.div
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                I work with
              </span>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-zinc-500 text-lg mb-16 max-w-lg">
            From React &amp; Next.js web apps to Flutter mobile apps and Python backends — the full stack I use to ship real products.
          </p>
        </Reveal>

        {/* Card grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((group, idx) => (
            <TiltCard key={group.category} group={group} idx={idx} />
          ))}
        </div>

        {/* Tech marquee */}
        <Reveal delay={0.2} className="mt-20">
          <div
            className="relative overflow-hidden rounded-2xl border border-white/6 bg-white/[0.02] py-5"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <div className="flex gap-10 animate-marquee-slow whitespace-nowrap">
              {[
                "React.js", "·", "Next.js", "·", "Flutter", "·", "Node.js", "·", "Python", "·", "Django",
                "·", "PHP", "·", "MySQL", "·", "PostgreSQL", "·", "Firebase", "·", "Supabase", "·", "Tailwind CSS",
                "React.js", "·", "Next.js", "·", "Flutter", "·", "Node.js", "·", "Python", "·", "Django",
                "·", "PHP", "·", "MySQL", "·", "PostgreSQL", "·", "Firebase", "·", "Supabase", "·", "Tailwind CSS",
              ].map((tech, i) => (
                <span
                  key={i}
                  className={
                    tech === "·"
                      ? "text-violet-500/35 text-[10px]"
                      : "text-zinc-600 text-sm font-medium"
                  }
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Smartphone, Monitor, Server, Palette, Brain, Code2, Database, Layers,
} from "lucide-react";
import { SKILLS } from "@/constants/data";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { fadeUp, scaleIn } from "@/lib/motion";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Smartphone, Monitor, Server, Palette, Brain, Code2, Database, Layers,
};

export function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* BG glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-blue-600/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-violet-600/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">Skills</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Tools & technologies
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              I work with
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-zinc-500 text-lg mb-16 max-w-lg">
            From React &amp; Next.js web apps to Flutter mobile apps and Python backends — the full stack I use to ship real products.
          </p>
        </Reveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((group) => {
            const Icon = ICON_MAP[group.icon] || Code2;
            return (
              <motion.div
                key={group.category}
                variants={scaleIn}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative p-7 rounded-2xl bg-white/3 border border-white/8 hover:border-white/15 backdrop-blur-sm transition-all hover:shadow-xl cursor-default overflow-hidden"
              >
                {/* Animated gradient border on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${group.color}`}
                  style={{ padding: "1px" }}
                >
                  <div className="absolute inset-[1px] rounded-2xl bg-zinc-950" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center mb-5 shadow-lg ${group.glow}`}>
                    <Icon size={22} className="text-white" />
                  </div>

                  <h3 className="font-bold text-white text-lg mb-4">{group.category}</h3>

                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.08 }}
                        className="px-3 py-1.5 text-xs font-medium bg-white/6 border border-white/10 text-zinc-300 rounded-lg hover:border-white/20 hover:text-white transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </StaggerContainer>

        {/* Tech bar marquee */}
        <Reveal delay={0.2} className="mt-20">
          <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-white/2 py-6">
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
              {[
                "React.js", "Next.js", "Flutter", "Node.js", "Python", "Django",
                "PHP", "MySQL", "PostgreSQL", "Firebase", "Supabase", "Tailwind CSS",
                "React.js", "Next.js", "Flutter", "Node.js", "Python", "Django",
                "PHP", "MySQL", "PostgreSQL", "Firebase", "Supabase", "Tailwind CSS",
              ].map((tech, i) => (
                <span key={i} className="text-zinc-600 text-sm font-medium px-4">
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

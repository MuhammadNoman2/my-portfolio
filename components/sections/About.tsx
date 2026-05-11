"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Smartphone, Star, Users, Coffee, Globe } from "lucide-react";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Reveal } from "@/components/animations/Reveal";
import { fadeUp, fadeLeft, scaleIn } from "@/lib/motion";

const STATS = [
  { value: "4+", label: "Years Experience", icon: Star },
  { value: "7+", label: "Live Products", icon: Globe },
  { value: "10+", label: "Happy Clients", icon: Users },
  { value: "∞", label: "Cups of Coffee", icon: Coffee },
];

const CARDS = [
  {
    icon: Code2,
    title: "Full-Stack Engineer",
    desc: "I build end-to-end products — React & Next.js frontends, Node.js / Python / PHP backends, and PostgreSQL or Supabase databases. CTO of Tech Triggers.",
    gradient: "from-violet-500/10 to-purple-500/10",
    border: "border-violet-500/20 hover:border-violet-500/50",
    glow: "hover:shadow-violet-500/10",
  },
  {
    icon: Smartphone,
    title: "Mobile App Developer",
    desc: "7+ Flutter apps live on Google Play & the App Store — from education platforms with 500+ downloads to productivity and utility apps for Pakistani clients.",
    gradient: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/20 hover:border-blue-500/50",
    glow: "hover:shadow-blue-500/10",
  },
  {
    icon: Palette,
    title: "Design-Driven CTO",
    desc: "I lead Tech Triggers with a designer&apos;s eye — obsessing over UX, visual hierarchy, and motion so every product we ship looks and feels premium.",
    gradient: "from-pink-500/10 to-rose-500/10",
    border: "border-pink-500/20 hover:border-pink-500/50",
    glow: "hover:shadow-pink-500/10",
  },
];

export function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-violet-500" />
            <span className="text-violet-400 text-sm font-medium tracking-widest uppercase">About</span>
          </div>
        </Reveal>

        {/* Headline + intro */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <Reveal>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                Turning ideas into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  beautiful experiences
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-zinc-400 text-lg leading-relaxed">
                I&apos;m Muhammad Noman — Software Developer and CTO of{" "}
                <a href="https://techtrigger.org/" target="_blank" rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300 transition-colors font-semibold">
                  Tech Triggers
                </a>
                , a 3-person AI-powered software studio based in Islamabad, Pakistan.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-zinc-500 leading-relaxed">
                I build full-stack web apps with React, Next.js &amp; Node.js, cross-platform mobile
                apps with Flutter (live on Google Play &amp; App Store), and robust backends with
                Python, Django, PHP, MySQL &amp; Supabase. Every product I ship is fast, beautiful, and production-ready.
              </p>
            </Reveal>
          </div>

          {/* Stats grid */}
          <StaggerContainer className="grid grid-cols-2 gap-4">
            {STATS.map(({ value, label, icon: Icon }) => (
              <motion.div
                key={label}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -4 }}
                className="relative group p-6 rounded-2xl bg-white/3 border border-white/8 hover:border-violet-500/30 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-violet-500/10 cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Icon size={20} className="text-violet-400 mb-3" />
                <p className="text-3xl font-black text-white">{value}</p>
                <p className="text-zinc-500 text-sm mt-1">{label}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>

        {/* Cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-5">
          {CARDS.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group relative p-7 rounded-2xl bg-gradient-to-br ${card.gradient} border ${card.border} backdrop-blur-sm transition-all hover:shadow-xl ${card.glow} cursor-default overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <card.icon size={24} className="text-zinc-300 mb-5 relative z-10" />
              <h3 className="font-bold text-white text-lg mb-3 relative z-10">{card.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed relative z-10">{card.desc}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

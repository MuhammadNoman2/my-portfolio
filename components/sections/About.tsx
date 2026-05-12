"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { animate } from "animejs";
import {
  Code2, Palette, Smartphone, Star, Users, Coffee, Globe, ArrowUpRight,
} from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { PERSONAL_INFO } from "@/constants/data";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "4+",  label: "Years Exp.",    icon: Star },
  { value: "7+",  label: "Live Products", icon: Globe },
  { value: "10+", label: "Happy Clients", icon: Users },
  { value: "∞",   label: "Cups of Coffee",icon: Coffee },
];

const CARDS = [
  {
    icon: Code2,
    title: "Full-Stack Engineer",
    desc: "End-to-end products — React & Next.js frontends, Node.js / Python / PHP backends, PostgreSQL or Supabase databases.",
    accent: "from-violet-500/15 to-purple-500/8",
    border: "border-violet-500/20 hover:border-violet-500/45",
    glow: "hover:shadow-violet-500/12",
    iconGrad: "from-violet-500 to-purple-600",
  },
  {
    icon: Smartphone,
    title: "Mobile App Developer",
    desc: "7+ Flutter apps live on Google Play — from education platforms (500+ downloads) to productivity and utility apps.",
    accent: "from-blue-500/15 to-cyan-500/8",
    border: "border-blue-500/20 hover:border-blue-500/45",
    glow: "hover:shadow-blue-500/12",
    iconGrad: "from-blue-500 to-cyan-600",
  },
  {
    icon: Palette,
    title: "Design-Driven CTO",
    desc: "Leading Tech Triggers with a designer's eye — obsessing over UX, visual hierarchy, and motion so every product feels premium.",
    accent: "from-fuchsia-500/15 to-rose-500/8",
    border: "border-fuchsia-500/20 hover:border-fuchsia-500/45",
    glow: "hover:shadow-fuchsia-500/12",
    iconGrad: "from-fuchsia-500 to-rose-500",
  },
];

const EXPO = [0.22, 1, 0.36, 1] as const;

// ─── Stat card with tilt + count-up ──────────────────────────────────────────

function StatCard({
  stat,
  idx,
  runAnim,
}: {
  stat: (typeof STATS)[number];
  idx: number;
  runAnim: boolean;
}) {
  const Icon = stat.icon;
  const valRef = useRef<HTMLParagraphElement>(null);
  const done = useRef(false);
  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const x = useSpring(xRaw, { stiffness: 180, damping: 26 });
  const y = useSpring(yRaw, { stiffness: 180, damping: 26 });
  const rotateX = useTransform(y, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-8deg", "8deg"]);

  useEffect(() => {
    if (!runAnim || done.current || !valRef.current) return;
    const num = parseInt(stat.value.replace(/\D/g, ""), 10);
    if (isNaN(num)) return;
    done.current = true;
    const suffix = stat.value.replace(/\d/g, "");
    const obj = { n: 0 };
    animate(obj, {
      n: num,
      duration: 1400,
      ease: "outExpo",
      delay: idx * 110,
      onUpdate: () => {
        if (valRef.current) valRef.current.textContent = Math.round(obj.n) + suffix;
      },
    });
  }, [runAnim, stat.value, idx]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    xRaw.set((e.clientX - r.left) / r.width - 0.5);
    yRaw.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EXPO, delay: idx * 0.09 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={() => { xRaw.set(0); yRaw.set(0); }}
        style={{ rotateX, rotateY, transformPerspective: 800, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.2 }}
        className="group relative p-6 rounded-2xl bg-white/3 border border-white/8 hover:border-violet-500/30 backdrop-blur-sm hover:shadow-lg hover:shadow-violet-500/10 cursor-default overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
        <div style={{ transform: "translateZ(10px)" }} className="relative z-10">
          <Icon size={18} className="text-violet-400 mb-3" />
          <p
            ref={valRef}
            className="text-3xl font-black text-white tabular-nums"
          >
            {stat.value}
          </p>
          <p className="text-zinc-500 text-sm mt-1">{stat.label}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef as React.RefObject<Element>, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-violet-600/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-violet-500" />
            <span className="text-violet-400 text-sm font-medium tracking-widest uppercase">About</span>
          </div>
        </Reveal>

        {/* Headline + bio + stats */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">

          {/* Left — text */}
          <div className="space-y-6">
            <Reveal>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-[1.08]">
                Turning ideas into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 animate-gradient-x">
                  beautiful experiences
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-zinc-400 text-lg leading-relaxed">
                I&apos;m Muhammad Noman — Software Developer and CTO of{" "}
                <a
                  href={PERSONAL_INFO.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300 transition-colors font-semibold inline-flex items-center gap-1 group"
                >
                  Tech Triggers
                  <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                , a 3-person AI-powered software studio in Islamabad, Pakistan.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-zinc-500 leading-relaxed">
                I build full-stack web apps with React, Next.js &amp; Node.js, cross-platform mobile
                apps with Flutter (live on Google Play), and robust backends with Python, Django, PHP, MySQL &amp; Supabase.
                Every product I ship is fast, beautiful, and production-ready.
              </p>
            </Reveal>

            {/* CTA row */}
            <Reveal delay={0.28}>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white rounded-xl bg-violet-500/12 border border-violet-500/25 hover:bg-violet-500/20 hover:border-violet-500/50 transition-all duration-200 backdrop-blur-sm mt-2"
              >
                Let&apos;s work together
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </Reveal>
          </div>

          {/* Right — stat grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} idx={i} runAnim={inView} />
            ))}
          </div>
        </div>

        {/* What I do — cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {CARDS.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EXPO, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group relative p-7 rounded-2xl bg-gradient-to-br ${card.accent} border ${card.border} backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${card.glow} cursor-default overflow-hidden`}
            >
              {/* Hover shimmer */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.iconGrad} flex items-center justify-center mb-5 relative z-10 shadow-lg`}
              >
                <card.icon size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-3 relative z-10">{card.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed relative z-10">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

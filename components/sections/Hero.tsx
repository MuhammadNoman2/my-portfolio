"use client";

import {
  useEffect, useRef, useState, useCallback,
} from "react";
import {
  motion,
  useScroll, useTransform, useMotionValue, useSpring,
  AnimatePresence, MotionValue,
} from "framer-motion";
import Image from "next/image";
import { ArrowRight, MapPin, Mail, Sparkles, Code2, Smartphone, Palette, Zap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { PERSONAL_INFO } from "@/constants/data";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { easeOutExpo, easeOutQuart, springSnappy } from "@/lib/motion";

// ─── Constants ───────────────────────────────────────────────────────────────

const ROLES = ["Software Developer", "CTO @ Tech Triggers", "Full-Stack Engineer", "Mobile App Developer"];

const ORBIT_CARDS = [
  { icon: Code2, label: "Next.js", sub: "Frontend", color: "from-violet-500 to-purple-600", delay: 0.7 },
  { icon: Smartphone, label: "Flutter", sub: "Mobile", color: "from-blue-500 to-cyan-600", delay: 0.85 },
  { icon: Zap, label: "Node.js", sub: "Backend", color: "from-emerald-500 to-teal-600", delay: 1.0 },
  { icon: Palette, label: "Supabase", sub: "Database", color: "from-amber-500 to-orange-600", delay: 1.15 },
];

const STATS = [
  { value: "4+", label: "Years" },
  { value: "7+", label: "Live Apps" },
  { value: "3", label: "Team @ TT" },
];

// ─── Spotlight Cursor ─────────────────────────────────────────────────────────

function SpotlightCursor() {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 22, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 22, mass: 0.6 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!active) setActive(true);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [active, mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0 top-0 left-0 will-change-transform"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.07) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

// ─── Aurora Background ────────────────────────────────────────────────────────

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blob 1 — violet, top-left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 0.6, 0.4, 0.6],
          scale: [0.8, 1.1, 1, 1.1],
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.33, 0.66, 1] }}
        className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(109,40,217,0.18) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Blob 2 — purple, top-right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: [0, 0.4, 0.6, 0.4],
          scale: [0.9, 1, 1.15, 0.9],
          x: [0, -40, 20, 0],
          y: [0, 30, -10, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2, times: [0, 0.33, 0.66, 1] }}
        className="absolute -top-20 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, rgba(192,132,252,0.06) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      {/* Blob 3 — fuchsia, bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.25, 0.4, 0.25],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4, times: [0, 0.33, 0.66, 1] }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(217,70,239,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
        }}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}

// ─── Split Text ───────────────────────────────────────────────────────────────

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

function SplitText({ text, className = "", delay = 0, staggerDelay = 0.035 }: SplitTextProps) {
  return (
    <span className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: easeOutExpo,
              delay: delay + i * staggerDelay,
            }}
            className="inline-block"
            style={{ willChange: "transform" }}
          >
            {char === " " ? " " : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── Role Word Cycler ─────────────────────────────────────────────────────────

function RoleCycler() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="h-8 sm:h-9 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 32, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -32, opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
          className="block text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── Orbit Cards ─────────────────────────────────────────────────────────────

const ORBIT_POSITIONS = [
  { top: "-10%", right: "-22%", float: { y: [-6, 6, -6] }, duration: 4.5 },
  { top: "25%", right: "-28%", float: { y: [6, -6, 6] }, duration: 5.2 },
  { bottom: "20%", right: "-24%", float: { y: [-5, 7, -5] }, duration: 4.8 },
  { bottom: "-5%", right: "-10%", float: { y: [7, -5, 7] }, duration: 5.5 },
];

function OrbitCards() {
  return (
    <>
      {ORBIT_CARDS.map(({ icon: Icon, label, sub, color, delay }, i) => {
        const pos = ORBIT_POSITIONS[i];
        return (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.7, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo, delay }}
            className="absolute hidden lg:block"
            style={{ top: pos.top, right: pos.right, bottom: pos.bottom }}
          >
            <motion.div
              animate={{ y: pos.float.y }}
              transition={{ duration: pos.duration, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-xl shadow-black/30 cursor-default group hover:border-white/20 transition-colors"
            >
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                <Icon size={14} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none mb-0.5">{label}</p>
                <p className="text-zinc-500 text-[11px] leading-none">{sub}</p>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: easeOutExpo, delay: 0.35 }}
      className="relative w-full flex items-center justify-center lg:justify-end"
    >
      <div className="relative">
        {/* Outer ambient glow */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
            filter: "blur(30px)",
            transform: "scale(1.4)",
          }}
        />

        {/* Rotating dashed ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-5 rounded-full"
          style={{
            border: "1px dashed rgba(139,92,246,0.25)",
          }}
        />

        {/* Rotating solid gradient ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(139,92,246,0.9) 20%, transparent 40%, rgba(168,85,247,0.7) 60%, transparent 80%)",
          }}
        />

        {/* Inner shadow separator */}
        <div className="absolute -inset-2 rounded-full bg-black" style={{ inset: "calc(-0.5rem + 2px)" }} />

        {/* Avatar circle */}
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-violet-500/20 overflow-hidden">
          {/* Profile photo */}
          <Image
            src="/profile.png"
            alt="Muhammad Noman"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          {/* Subtle overlay to blend with theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-violet-950/30 via-transparent to-transparent" />
        </div>

        {/* Status badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: "spring" as const, stiffness: 500, damping: 50, mass: 0.8 }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/90 border border-emerald-500/30 rounded-full px-4 py-2 shadow-2xl backdrop-blur-sm whitespace-nowrap"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span className="text-xs font-semibold text-emerald-400">Available for work</span>
        </motion.div>

        {/* Orbit cards */}
        <OrbitCards />
      </div>
    </motion.div>
  );
}

// ─── Scroll Indicator ─────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
    >
      <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-700 font-medium">
        Scroll to explore
      </span>
      {/* Animated mouse */}
      <div className="w-5 h-8 rounded-full border border-zinc-700 flex items-start justify-center pt-1.5">
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-0.5 h-1.5 rounded-full bg-zinc-500"
        />
      </div>
    </motion.div>
  );
}

// ─── Horizontal Rule Reveal ───────────────────────────────────────────────────

function LineReveal({ delay }: { delay: number }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: easeOutExpo, delay }}
        className="h-px bg-gradient-to-r from-violet-500/60 via-purple-500/30 to-transparent w-full"
      />
    </div>
  );
}

// ─── Stats Strip ─────────────────────────────────────────────────────────────

function StatsStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeOutExpo, delay: 1.7 }}
      className="flex items-center gap-6"
    >
      {STATS.map(({ value, label }, i) => (
        <div key={label} className="flex items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="text-xl font-black text-white leading-none">{value}</p>
            <p className="text-xs text-zinc-600 mt-0.5">{label}</p>
          </div>
          {i < STATS.length - 1 && (
            <div className="w-px h-6 bg-white/8" />
          )}
        </div>
      ))}
    </motion.div>
  );
}

// ─── Parallax Wrapper ─────────────────────────────────────────────────────────

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [0, distance]);
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Multi-layer parallax
  const bgY = useParallax(scrollYProgress, 80);
  const textY = useParallax(scrollYProgress, 120);
  const visualY = useParallax(scrollYProgress, 60);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background layers */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <AuroraBackground />
      </motion.div>

      {/* Spring cursor spotlight */}
      <SpotlightCursor />

      {/* Main content — full height */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex-1 flex items-center"
      >
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-24">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

            {/* ── LEFT: Text Content ────────────────────────────────── */}
            <motion.div style={{ y: textY }} className="flex flex-col gap-7 max-w-2xl">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: easeOutQuart, delay: 0.1 }}
                className="w-fit"
              >
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="relative flex items-center gap-2.5 px-4 py-2 rounded-full overflow-hidden cursor-default group"
                >
                  {/* Animated gradient border */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "conic-gradient(from 0deg, rgba(139,92,246,0.8), rgba(168,85,247,0.4), rgba(217,70,239,0.6), rgba(139,92,246,0.8))",
                      padding: "1px",
                    }}
                  />
                  <div className="absolute inset-[1px] rounded-full bg-black/80 backdrop-blur-sm" />
                  <Sparkles size={12} className="text-violet-400 relative z-10" />
                  <span className="text-xs font-semibold text-violet-300 relative z-10 tracking-wide">
                    Open to work · Flutter & Design
                  </span>
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-violet-400 relative z-10"
                  />
                </motion.div>
              </motion.div>

              {/* Headline */}
              <div>
                <h1 className="text-6xl sm:text-7xl xl:text-8xl font-black tracking-[-0.03em] leading-[0.9]">
                  {/* "Muhammad" — character-by-character in white */}
                  <span className="text-white block">
                    <SplitText text="Muhammad" delay={0.25} staggerDelay={0.03} />
                  </span>
                  {/* "Noman" — whole word slide with gradient */}
                  <span className="overflow-hidden block">
                    <motion.span
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1.0, ease: easeOutExpo, delay: 0.62 }}
                      className="block text-transparent bg-clip-text bg-gradient-to-br from-violet-300 via-purple-200 to-zinc-400"
                      style={{ willChange: "transform" }}
                    >
                      Noman
                    </motion.span>
                  </span>
                </h1>
              </div>

              {/* Separator line */}
              <LineReveal delay={0.85} />

              {/* Role */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <RoleCycler />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: easeOutExpo, delay: 1.1 }}
                className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-lg"
              >
                {PERSONAL_INFO.description}
              </motion.p>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex items-center gap-1.5 text-zinc-600 text-sm"
              >
                <MapPin size={13} />
                <span>{PERSONAL_INFO.location}</span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: easeOutExpo, delay: 1.35 }}
                className="flex flex-wrap items-center gap-3"
              >
                <MagneticButton strength={0.25}>
                  <motion.button
                    onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="group relative flex items-center gap-2.5 px-7 py-4 text-white font-bold rounded-2xl overflow-hidden text-sm"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #a855f7 100%)",
                      boxShadow: "0 0 0 1px rgba(139,92,246,0.4), 0 8px 32px rgba(109,40,217,0.4)",
                    }}
                  >
                    {/* Shimmer sweep */}
                    <motion.div
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.6, ease: easeOutQuart }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12"
                    />
                    <span className="relative z-10">View Projects</span>
                    <ArrowRight size={15} className="relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </MagneticButton>

                <MagneticButton strength={0.25}>
                  <motion.a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    whileHover={{ scale: 1.04, borderColor: "rgba(139,92,246,0.5)" }}
                    whileTap={{ scale: 0.96 }}
                    className="group flex items-center gap-2.5 px-7 py-4 bg-white/4 border border-white/10 text-white font-bold rounded-2xl backdrop-blur-md text-sm transition-colors"
                  >
                    <Mail size={15} className="text-zinc-400 group-hover:text-violet-400 transition-colors" />
                    <span>Get in Touch</span>
                  </motion.a>
                </MagneticButton>
              </motion.div>

              {/* Social + stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.55, duration: 0.7 }}
                className="flex flex-wrap items-center gap-5 pt-1"
              >
                {/* Socials */}
                <div className="flex items-center gap-2">
                  {[
                    { icon: GithubIcon, href: PERSONAL_INFO.github, label: "GitHub" },
                    { icon: LinkedinIcon, href: PERSONAL_INFO.linkedin, label: "LinkedIn" },
                  ].map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/40 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                    >
                      <Icon size={15} />
                    </motion.a>
                  ))}
                </div>

                <div className="w-px h-6 bg-white/8 hidden sm:block" />

                {/* Stats */}
                <StatsStrip />
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Visual ─────────────────────────────────────── */}
            <motion.div
              style={{ y: visualY }}
              className="flex justify-center lg:justify-end"
            >
              <Avatar />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}

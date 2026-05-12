"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MapPin, Mail, Sparkles, Code2, Smartphone, Zap, ChevronDown, Database } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { PERSONAL_INFO } from "@/constants/data";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { AnimeCounter } from "@/components/animations/AnimeCounter";

// ─── Constants ────────────────────────────────────────────────────────────────

const ROLES = ["Software Developer", "CTO @ Tech Triggers", "Full-Stack Engineer", "Mobile App Developer"];
const STATS = [{ value: "4+", label: "Years" }, { value: "7+", label: "Live Apps" }, { value: "3", label: "Team @ TT" }];

const EXPO  = [0.22, 1, 0.36, 1] as const;
const QUART = [0.25, 1, 0.5, 1] as const;

// Four cards — top-right, bottom-right, top-left, bottom-left
const ORBIT_CARDS = [
  { icon: Code2,      label: "Next.js",  sub: "Frontend", color: "from-violet-500 to-purple-600", corner: "tr" },
  { icon: Smartphone, label: "Flutter",  sub: "Mobile",   color: "from-blue-500 to-cyan-600",    corner: "br" },
  { icon: Zap,        label: "Node.js",  sub: "Backend",  color: "from-emerald-500 to-teal-600", corner: "tl" },
  { icon: Database,   label: "Supabase", sub: "Database", color: "from-teal-500 to-emerald-600", corner: "bl" },
] as const;

// ─── Cursor spotlight ─────────────────────────────────────────────────────────

function SpotlightCursor() {
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const sx = useSpring(mx, { stiffness: 90, damping: 24 });
  const sy = useSpring(my, { stiffness: 90, damping: 24 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fn = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); if (!on) setOn(true); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [on, mx, my]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 will-change-transform"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", zIndex: 1 }}
      animate={{ opacity: on ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="w-96 h-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)" }}
      />
    </motion.div>
  );
}

// ─── Role cycler ─────────────────────────────────────────────────────────────

function RoleCycler() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % ROLES.length), 3200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="h-8 sm:h-9 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: 36, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -36, opacity: 0 }}
          transition={{ duration: 0.45, ease: QUART }}
          className="block text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── Profile image — clean, no clutter ───────────────────────────────────────

function ProfileImage() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth  - 0.5) * 14);
      my.set((e.clientY / window.innerHeight - 0.5) * 10);
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mx, my]);

  return (
    <motion.div style={{ x: sx, y: sy }} className="relative will-change-transform">

      {/* Soft ambient glow behind image */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-10 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      {/* Clean gradient ring */}
      <div
        className="absolute -inset-[3px] rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.7) 0%, rgba(168,85,247,0.3) 50%, rgba(217,70,239,0.6) 100%)",
        }}
      />

      {/* Photo */}
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden bg-zinc-950">
        <Image
          src="/profile.png"
          alt="Muhammad Noman"
          fill
          className="object-cover object-top"
          priority
          unoptimized
        />
        {/* Subtle inner vignette */}
        <div className="absolute inset-0 rounded-full" style={{ boxShadow: "inset 0 -30px 40px rgba(0,0,0,0.35)" }} />
      </div>

      {/* Available badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 480, damping: 48 }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-zinc-950/95 border border-emerald-500/30 rounded-full px-4 py-2 shadow-xl backdrop-blur-md whitespace-nowrap"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-xs font-semibold text-emerald-400">Available for work</span>
      </motion.div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <>
      <SpotlightCursor />

      <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-40 pointer-events-none z-10"
          style={{ background: "linear-gradient(to top, #000 0%, transparent 100%)" }}
        />

        <div className="flex-1 flex items-center relative z-10">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-24">
            <div className="grid lg:grid-cols-[1fr_auto] gap-16 lg:gap-20 items-center">

              {/* ── LEFT: text ─────────────────────────────────────────── */}
              <div className="flex flex-col gap-7 max-w-2xl">

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -16, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.65, ease: EXPO, delay: 0.05 }}
                  className="w-fit"
                >
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    className="relative flex items-center gap-2.5 px-4 py-2 rounded-full overflow-hidden cursor-default"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "conic-gradient(from 0deg, rgba(139,92,246,0.9), rgba(168,85,247,0.4), rgba(217,70,239,0.7), rgba(139,92,246,0.9))",
                        padding: "1px",
                      }}
                    />
                    <div className="absolute inset-[1px] rounded-full bg-black/85 backdrop-blur-sm" />
                    <Sparkles size={12} className="text-violet-400 relative z-10" />
                    <span className="text-xs font-semibold text-violet-300 relative z-10 tracking-wide">
                      Open to work · Flutter &amp; Design
                    </span>
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-violet-400 relative z-10"
                    />
                  </motion.div>
                </motion.div>

                {/* Name */}
                <div>
                  <h1 className="text-6xl sm:text-7xl xl:text-8xl font-black tracking-[-0.03em] leading-[0.88]">
                    <span className="block overflow-hidden">
                      <motion.span
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.85, ease: EXPO, delay: 0.15 }}
                        className="block text-white will-change-transform"
                      >
                        Muhammad
                      </motion.span>
                    </span>
                    <span className="block overflow-hidden">
                      <motion.span
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.85, ease: EXPO, delay: 0.28 }}
                        className="block text-transparent bg-clip-text bg-gradient-to-br from-violet-300 via-purple-200 to-fuchsia-300 will-change-transform"
                      >
                        Noman
                      </motion.span>
                    </span>
                  </h1>
                </div>

                {/* Separator */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, ease: QUART, delay: 0.42 }}
                  style={{ originX: 0 }}
                  className="h-px bg-gradient-to-r from-violet-500/70 via-purple-500/30 to-transparent"
                />

                {/* Role + description + location */}
                <motion.div
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: EXPO, delay: 0.48 }}
                  className="flex flex-col gap-3"
                >
                  <RoleCycler />
                  <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-lg">
                    {PERSONAL_INFO.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-zinc-600 text-sm">
                    <MapPin size={13} />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                </motion.div>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EXPO, delay: 0.58 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <MagneticButton strength={0.25}>
                    <motion.button
                      onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                      whileHover={{ scale: 1.04, boxShadow: "0 0 0 1px rgba(139,92,246,0.6),0 12px 40px rgba(109,40,217,0.5)" }}
                      whileTap={{ scale: 0.96 }}
                      className="group relative flex items-center gap-2.5 px-7 py-4 text-white font-bold rounded-2xl overflow-hidden text-sm cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg,#7c3aed 0%,#9333ea 50%,#a855f7 100%)",
                        boxShadow: "0 0 0 1px rgba(139,92,246,0.4),0 8px 32px rgba(109,40,217,0.35)",
                      }}
                    >
                      <motion.div
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "220%" }}
                        transition={{ duration: 0.55, ease: QUART }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/18 to-transparent skew-x-12"
                      />
                      <span className="relative z-10">View Projects</span>
                      <ArrowRight size={15} className="relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                    </motion.button>
                  </MagneticButton>

                  <MagneticButton strength={0.25}>
                    <motion.a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      whileHover={{ scale: 1.04, borderColor: "rgba(139,92,246,0.45)" }}
                      whileTap={{ scale: 0.96 }}
                      className="group flex items-center gap-2.5 px-7 py-4 bg-white/4 border border-white/10 text-white font-bold rounded-2xl backdrop-blur-md text-sm transition-colors cursor-pointer"
                    >
                      <Mail size={15} className="text-zinc-400 group-hover:text-violet-400 transition-colors duration-200" />
                      <span>Get in Touch</span>
                    </motion.a>
                  </MagneticButton>
                </motion.div>

                {/* Socials + stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EXPO, delay: 0.68 }}
                  className="flex flex-wrap items-center gap-5 pt-1"
                >
                  <div className="flex items-center gap-2">
                    {[
                      { icon: GithubIcon,   href: PERSONAL_INFO.github,   label: "GitHub"   },
                      { icon: LinkedinIcon, href: PERSONAL_INFO.linkedin, label: "LinkedIn" },
                    ].map(({ icon: Icon, href, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        whileHover={{ scale: 1.14, y: -2 }}
                        whileTap={{ scale: 0.92 }}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/40 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer"
                      >
                        <Icon size={16} />
                      </motion.a>
                    ))}
                  </div>
                  <div className="w-px h-6 bg-white/8 hidden sm:block" />
                  <AnimeCounter stats={STATS} />
                </motion.div>
              </div>

              {/* ── RIGHT: fixed container — profile centred, cards at 4 corners ── */}
              <div className="hidden lg:flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, x: 48, scale: 0.94 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.9, ease: EXPO, delay: 0.2 }}
                  /* Fixed 480×420 space — profile sits in the middle, cards anchor to corners */
                  className="relative"
                  style={{ width: 480, height: 420 }}
                >
                  {/* Profile — absolutely centred */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ProfileImage />
                  </div>

                  {/* Orbit cards — one per corner, no overlap */}
                  {ORBIT_CARDS.map(({ icon: Icon, label, sub, color, corner }, idx) => {
                    const pos: React.CSSProperties = {
                      position: "absolute",
                      ...(corner === "tr" && { top: 0,    right: 0   }),
                      ...(corner === "br" && { bottom: 0, right: 0   }),
                      ...(corner === "tl" && { top: 0,    left: 0    }),
                      ...(corner === "bl" && { bottom: 0, left: 0    }),
                    };
                    const floatDir = corner === "tr" || corner === "tl" ? -6 : 6;
                    const initX    = corner === "tr" || corner === "br" ? 20 : -20;

                    return (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, scale: 0.8, x: initX }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: QUART, delay: 0.5 + idx * 0.12 }}
                        style={pos}
                      >
                        <motion.div
                          animate={{ y: [0, floatDir, 0] }}
                          transition={{ duration: 4 + idx * 0.6, repeat: Infinity, ease: "easeInOut" }}
                          whileHover={{ scale: 1.08, y: 0 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl cursor-default whitespace-nowrap transition-all duration-300"
                          style={{
                            background: "rgba(9,9,11,0.85)",
                            borderColor: "rgba(255,255,255,0.1)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.4)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(109,40,217,0.25), inset 0 1px 0 rgba(255,255,255,0.08)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)";
                          }}
                        >
                          {/* Icon with glow */}
                          <div
                            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                          >
                            <Icon size={15} className="text-white" />
                          </div>
                          <div>
                            <p className="text-white text-sm font-bold leading-none mb-1">{label}</p>
                            <p className="text-zinc-500 text-[11px] font-medium leading-none">{sub}</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Mobile — just the profile, no orbit cards */}
              <div className="lg:hidden flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, ease: EXPO, delay: 0.2 }}
                >
                  <ProfileImage />
                </motion.div>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="relative z-10 flex flex-col items-center gap-2 pb-10 pointer-events-none"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-600">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <ChevronDown size={16} className="text-zinc-600" />
          </motion.div>
        </motion.div>

      </section>
    </>
  );
}

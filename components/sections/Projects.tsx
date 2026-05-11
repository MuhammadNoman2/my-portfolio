"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion, AnimatePresence, useInView,
} from "framer-motion";
import {
  ArrowUpRight, X, Lock, ExternalLink,
  Smartphone, Globe, Brain, Star, Download,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { PROJECTS, PRIVATE_PROJECTS } from "@/constants/data";
import { easeOutExpo, easeOutQuart } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Project = typeof PROJECTS[number];
type Filter = "All" | "Mobile App" | "Web App" | "AI / ML";

// ─── Config ───────────────────────────────────────────────────────────────────

const FILTERS: Filter[] = ["All", "Mobile App", "Web App", "AI / ML"];

const CATEGORY_ICON: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "Mobile App": Smartphone,
  "Web App": Globe,
  "AI / ML": Brain,
};

const CATEGORY_EMOJI: Record<string, string> = {
  "Mobile App": "📱",
  "Web App": "🌐",
  "Desktop App": "🖥️",
  "AI / ML": "🤖",
};

// abstract dot / grid patterns keyed by accent color
const VISUAL_PATTERNS: Record<string, { dots: string; grid: string; orb1: string; orb2: string }> = {
  violet: { dots: "rgba(167,139,250,0.25)", grid: "rgba(139,92,246,0.12)", orb1: "#7c3aed", orb2: "#9333ea" },
  blue:   { dots: "rgba(147,197,253,0.25)", grid: "rgba(59,130,246,0.12)",  orb1: "#2563eb", orb2: "#0ea5e9" },
  emerald:{ dots: "rgba(110,231,183,0.25)", grid: "rgba(16,185,129,0.12)", orb1: "#059669", orb2: "#0d9488" },
  pink:   { dots: "rgba(249,168,212,0.25)", grid: "rgba(236,72,153,0.12)", orb1: "#db2777", orb2: "#e11d48" },
  amber:  { dots: "rgba(253,211,77,0.25)",  grid: "rgba(245,158,11,0.12)", orb1: "#d97706", orb2: "#ea580c" },
  slate:  { dots: "rgba(203,213,225,0.2)",  grid: "rgba(100,116,139,0.12)",orb1: "#475569", orb2: "#374151" },
};

// ─── Project Visual Panel ──────────────────────────────────────────────────────

function ProjectVisual({ project, hover }: { project: Project; hover: boolean }) {
  const [errored, setErrored] = useState(false);
  const pat = VISUAL_PATTERNS[project.accent] ?? VISUAL_PATTERNS.violet;
  const hasIcon = !!project.iconUrl && !errored;
  const iconRadius = project.platform === "Android" ? "22%" : "18%";

  return (
    <div className="relative w-full h-full overflow-hidden">

      {/* ── Layer 1: blurred full-bleed icon as background ── */}
      {hasIcon ? (
        <motion.div
          animate={hover ? { scale: 1.12 } : { scale: 1.04 }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="absolute inset-0"
        >
          <Image
            src={project.iconUrl!}
            alt=""
            fill
            className="object-cover"
            style={{ filter: "blur(28px) saturate(1.4) brightness(0.55)" }}
            onError={() => setErrored(true)}
            unoptimized
            aria-hidden
          />
        </motion.div>
      ) : (
        /* Fallback gradient background */
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-70`} />
      )}

      {/* ── Layer 2: dark vignette so icon pops ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

      {/* ── Layer 3: dot grid texture ── */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(${pat.dots} 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* ── Layer 4: sharp icon centred and large ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <motion.div
          animate={hover ? { scale: 1.08, y: -4 } : { scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOutQuart }}
          className="flex flex-col items-center gap-3"
        >
          {hasIcon ? (
            <div
              className="overflow-hidden"
              style={{
                width: 120,
                height: 120,
                borderRadius: iconRadius,
                boxShadow:
                  "0 12px 48px rgba(0,0,0,0.7), 0 0 0 1.5px rgba(255,255,255,0.18)",
              }}
            >
              <Image
                src={project.iconUrl!}
                alt={project.title}
                width={120}
                height={120}
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>
          ) : (
            <div
              className="flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20"
              style={{
                width: 100, height: 100, borderRadius: 22,
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              <span className="text-5xl select-none">{CATEGORY_EMOJI[project.category] ?? "✦"}</span>
            </div>
          )}

          {/* Platform pill */}
          <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/15">
            <span className="text-[10px] text-white/80 font-semibold tracking-wider uppercase">
              {project.platform === "Android" ? "Android · iOS" : project.category}
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Corner brackets ── */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-white/25 rounded-tl" />
      <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-white/25 rounded-tr" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-white/25 rounded-bl" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-white/25 rounded-br" />

      {/* Top shimmer */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
    </div>
  );
}

// ─── Side Drawer ───────────────────────────────────────────────────────────────

function ProjectDrawer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg bg-zinc-950 border-l border-white/8 overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Visual header */}
            <div className="relative h-60 flex-shrink-0">
              <ProjectVisual project={project} hover={false} />

              {/* Close button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/60 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X size={15} />
              </motion.button>

              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-violet-500/40 backdrop-blur-md">
                  <Star size={11} className="text-violet-400 fill-violet-400" />
                  <span className="text-[11px] text-violet-300 font-semibold tracking-wide">Featured</span>
                </div>
              )}

              {/* Bottom gradient fade into content */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent" />
            </div>

            {/* Content */}
            <div className="px-8 pb-12 space-y-6">
              {/* Meta */}
              <div>
                <span className="text-xs text-zinc-600 font-medium tracking-widest uppercase">{project.category}</span>
                <h2 className="text-2xl font-black text-white mt-2 leading-tight">{project.title}</h2>
              </div>

              {/* Status + platform + downloads row */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <span className="text-xs text-emerald-400 font-semibold">{project.status}</span>
                </div>
                {project.platform === "Android" && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <span className="text-[11px]">🤖</span>
                    <span className="text-xs text-zinc-400 font-medium">Google Play</span>
                  </div>
                )}
                {project.platform === "Android" && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <span className="text-[11px]">🍎</span>
                    <span className="text-xs text-zinc-400 font-medium">App Store</span>
                  </div>
                )}
                {project.platform === "Web" && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <Globe size={11} className="text-zinc-500" />
                    <span className="text-xs text-zinc-400 font-medium">Web Platform</span>
                  </div>
                )}
                {project.downloads && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25">
                    <Download size={11} className="text-violet-400" />
                    <span className="text-xs text-violet-300 font-semibold">{project.downloads} downloads</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-zinc-400 leading-relaxed text-[15px]">{project.description}</p>

              {/* Separator */}
              <div className="h-px bg-white/6" />

              {/* Tags */}
              <div>
                <p className="text-xs text-zinc-600 font-medium tracking-widest uppercase mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06, duration: 0.3, ease: easeOutQuart }}
                      className="px-3 py-1.5 text-xs font-semibold bg-white/5 border border-white/10 text-zinc-300 rounded-xl"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTA row */}
              <div className="flex flex-col gap-2.5 pt-1">
                {/* Live link — primary */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2.5 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-violet-500/20"
                  >
                    <ExternalLink size={15} />
                    {project.platform === "Android" ? "View on Play Store" : "Visit Live Site"}
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
                {/* GitHub — secondary */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2.5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/40 text-white rounded-2xl font-semibold text-sm transition-all"
                  >
                    <GithubIcon size={15} />
                    View Source Code
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="py-3 text-zinc-600 hover:text-zinc-400 text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Small Project Icon (used inline in cards) ─────────────────────────────────

function ProjectIcon({ project, size }: { project: Project; size: number }) {
  const [errored, setErrored] = useState(false);
  if (!project.iconUrl || errored) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br ${project.color}`}
        style={{ width: size, height: size }}
      >
        <span style={{ fontSize: size * 0.45 }}>{CATEGORY_EMOJI[project.category] ?? "✦"}</span>
      </div>
    );
  }
  return (
    <Image
      src={project.iconUrl}
      alt={project.title}
      width={size}
      height={size}
      className="object-cover w-full h-full"
      unoptimized
      onError={() => setErrored(true)}
    />
  );
}

// ─── Featured Card (horizontal) ────────────────────────────────────────────────

function FeaturedCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hover, setHover] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: easeOutExpo, delay: index * 0.1 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(project)}
      className="group relative grid lg:grid-cols-[1fr_1.1fr] rounded-3xl border border-white/8 overflow-hidden cursor-pointer"
      style={{ background: "rgba(255,255,255,0.018)" }}
    >
      {/* Animated glow border on hover */}
      <motion.div
        animate={hover ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.35 }}
        className={`absolute inset-0 rounded-3xl pointer-events-none`}
        style={{
          boxShadow: `inset 0 0 0 1px rgba(139,92,246,0.35), 0 0 80px rgba(139,92,246,0.08)`,
        }}
      />

      {/* ── LEFT: text ──────────────────────────────────── */}
      <div className="relative flex flex-col justify-between p-8 lg:p-10 gap-6 z-10">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-zinc-700 tracking-[0.2em]">{num}</span>
            <span className="w-px h-3 bg-zinc-800" />
            <span className="text-[11px] font-semibold text-zinc-600 tracking-widest uppercase">{project.category}</span>
          </div>
          <div className="flex items-center gap-2">
            {project.featured && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/25">
                <Star size={9} className="text-violet-400 fill-violet-400" />
                <span className="text-[10px] font-bold text-violet-300 tracking-widest">FEATURED</span>
              </div>
            )}
            <motion.div
              animate={hover ? { rotate: 45, color: "#fff" } : { rotate: 0, color: "#52525b" }}
              transition={{ duration: 0.25 }}
            >
              <ArrowUpRight size={18} />
            </motion.div>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-start gap-4">
          {/* Inline icon for featured card */}
          <div
            className="flex-shrink-0 overflow-hidden mt-0.5"
            style={{
              width: 48, height: 48,
              borderRadius: project.platform === "Android" ? 11 : 9,
              boxShadow: "0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            <ProjectIcon project={project} size={48} />
          </div>
          <div>
            <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-2">{project.title}</h3>
            <p className="text-zinc-500 text-[15px] leading-relaxed line-clamp-3">{project.description}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.07, duration: 0.4, ease: easeOutQuart }}
              className="px-3 py-1.5 text-[11px] font-semibold bg-white/5 border border-white/8 text-zinc-400 rounded-xl hover:border-white/16 hover:text-zinc-300 transition-colors"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={hover ? { x: 0, opacity: 1 } : { x: -6, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutQuart }}
            className="flex items-center gap-2 text-sm font-bold text-violet-400"
          >
            <span>View Project</span>
            <ArrowUpRight size={14} />
          </motion.div>
          <span className="text-zinc-700 text-xs">↑ Click to open</span>
        </div>
      </div>

      {/* ── RIGHT: visual ────────────────────────────────── */}
      <div className="relative h-56 lg:h-auto overflow-hidden">
        <ProjectVisual project={project} hover={hover} />

        {/* Left-side bleed gradient */}
        <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-zinc-950/50 to-transparent z-10 lg:block hidden" />
      </div>
    </motion.div>
  );
}

// ─── Standard Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project, index, onOpen,
}: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hover, setHover] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: easeOutExpo, delay: (index % 3) * 0.1 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(project)}
      className="group relative flex flex-col rounded-3xl border border-white/8 overflow-hidden cursor-pointer"
      style={{ background: "rgba(255,255,255,0.018)" }}
    >
      {/* Hover glow border */}
      <motion.div
        animate={hover ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-3xl pointer-events-none z-10"
        style={{ boxShadow: "inset 0 0 0 1px rgba(139,92,246,0.3)" }}
      />

      {/* Visual panel */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <ProjectVisual project={project} hover={hover} />
      </div>

      {/* Gradient fade top of content */}
      <div className="h-px bg-white/6" />

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Meta row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-zinc-700 tracking-[0.18em]">{num}</span>
            <span className="w-px h-2.5 bg-zinc-800" />
            <span className="text-[10px] font-semibold text-zinc-600 tracking-widest uppercase">{project.category}</span>
          </div>
          <motion.div
            animate={hover ? { rotate: 45 } : { rotate: 0 }}
            transition={{ duration: 0.25, ease: easeOutQuart }}
            className="text-zinc-700 group-hover:text-white transition-colors"
          >
            <ArrowUpRight size={15} />
          </motion.div>
        </div>

        {/* Title + desc */}
        <div className="flex-1">
          <h3 className="font-black text-white text-lg leading-tight mb-2">{project.title}</h3>
          <p className="text-zinc-600 text-[13px] leading-relaxed line-clamp-2">{project.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2.5 py-1 text-[11px] font-medium bg-white/4 border border-white/8 text-zinc-500 rounded-lg">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2.5 py-1 text-[11px] text-zinc-700 rounded-lg">+{project.tags.length - 3}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Private Vault ─────────────────────────────────────────────────────────────

function PrivateVault() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: easeOutExpo }}
      className="relative rounded-3xl border border-white/8 overflow-hidden"
      style={{ background: "rgba(255,255,255,0.012)" }}
    >
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0.018 }}
      >
        <span className="text-white font-black text-[120px] tracking-widest rotate-[-8deg]">PRIVATE</span>
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Lock size={14} className="text-zinc-500" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Private / NDA Projects</p>
              <p className="text-zinc-600 text-xs mt-0.5">Confidential work — details on request</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/3 border border-white/8">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            <span className="text-[11px] text-zinc-600 font-medium">{PRIVATE_PROJECTS.length} projects</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRIVATE_PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: easeOutQuart }}
              className="group relative flex items-center gap-3 p-4 rounded-2xl bg-white/3 border border-white/6 hover:border-white/12 transition-colors overflow-hidden"
            >
              {/* Lock icon */}
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0">
                <Lock size={11} className="text-zinc-600" />
              </div>
              <div className="min-w-0">
                <p className="text-zinc-400 text-[13px] font-semibold leading-tight truncate">{p.title}</p>
                <p className="text-zinc-700 text-[11px] mt-0.5">{p.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Filter Tabs ───────────────────────────────────────────────────────────────

function FilterTabs({ active, onChange }: { active: Filter; onChange: (f: Filter) => void }) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/3 border border-white/8 backdrop-blur-sm w-fit flex-wrap">
      {FILTERS.map((f) => {
        const Icon = CATEGORY_ICON[f];
        const isActive = f === active;
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            className="relative px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
          >
            {isActive && (
              <motion.div
                layoutId="filter-pill"
                className="absolute inset-0 rounded-xl bg-white/8 border border-white/12"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            <span className={`relative z-10 flex items-center gap-1.5 transition-colors ${isActive ? "text-white" : "text-zinc-600 hover:text-zinc-400"}`}>
              {Icon && <Icon size={12} />}
              {f}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Section Counter ───────────────────────────────────────────────────────────

function SectionHeader({ filtered }: { filtered: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-6 mb-14">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: easeOutQuart }}
        className="flex items-center gap-3"
      >
        <div className="w-8 h-px bg-violet-500" />
        <span className="text-violet-400 text-xs font-semibold tracking-[0.2em] uppercase">Selected Work</span>
      </motion.div>

      {/* Headline + count */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: easeOutExpo, delay: 0.08 }}
        >
          <h2 className="text-5xl sm:text-6xl font-black text-white leading-[0.9] tracking-tight">
            Things I&apos;ve
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400">
              built &amp; shipped
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: easeOutExpo, delay: 0.18 }}
          className="flex flex-col items-start lg:items-end gap-3"
        >
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs lg:text-right">
            Flutter apps, web platforms &amp; ML experiments.
            <br />Click any card to explore details.
          </p>
          {/* Animated project count */}
          <div className="flex items-center gap-2 text-zinc-700">
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-700 tabular-nums">
              {String(filtered.length).padStart(2, "0")}
            </span>
            <span className="text-sm font-medium">projects</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Projects (main) ───────────────────────────────────────────────────────────

export function Projects() {
  const [active, setActive] = useState<Filter>("All");
  const [drawer, setDrawer] = useState<Project | null>(null);

  const filtered = active === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active);

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-violet-600/5 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[400px] bg-fuchsia-600/4 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <SectionHeader filtered={filtered} />

        {/* Filter tabs */}
        <div className="mb-10">
          <FilterTabs active={active} onChange={setActive} />
        </div>

        {/* Featured cards — full-width horizontal */}
        <AnimatePresence mode="popLayout">
          {featured.length > 0 && (
            <motion.div
              key="featured"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-5 mb-5"
            >
              {featured.map((p, i) => (
                <FeaturedCard
                  key={p.id}
                  project={p}
                  index={i}
                  onOpen={setDrawer}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Standard grid */}
        <AnimatePresence mode="popLayout">
          {rest.length > 0 && (
            <motion.div
              key="grid"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10"
            >
              {rest.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={i}
                  onOpen={setDrawer}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-24 gap-3"
            >
              <span className="text-4xl">🔍</span>
              <p className="text-zinc-600 text-sm">No projects in this category yet.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Private Vault */}
        <PrivateVault />
      </div>

      {/* Side drawer */}
      <ProjectDrawer project={drawer} onClose={() => setDrawer(null)} />
    </section>
  );
}

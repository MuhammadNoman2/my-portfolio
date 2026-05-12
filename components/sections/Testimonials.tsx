"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/constants/data";
import { Reveal } from "@/components/animations/Reveal";

// Duplicate items for a seamless infinite loop
const ROW_1 = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
const ROW_2 = [...TESTIMONIALS].reverse().concat([...TESTIMONIALS].reverse(), [...TESTIMONIALS].reverse());

// ─── Single testimonial card ───────────────────────────────────────────────────

function TestimonialCard({ t, idx }: { t: (typeof TESTIMONIALS)[number]; idx: number }) {
  return (
    <div
      className="group relative flex-shrink-0 w-80 p-6 rounded-2xl bg-white/3 border border-white/8 hover:border-white/18 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/8 cursor-default overflow-hidden mx-2.5"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-fuchsia-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      <div className="relative z-10">
        {/* Top row: quote + stars */}
        <div className="flex items-start justify-between mb-4">
          <Quote size={22} className="text-violet-500/35 flex-shrink-0" />
          <div className="flex gap-0.5">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>

        {/* Content */}
        <p className="text-zinc-400 text-sm leading-relaxed mb-5 italic line-clamp-3">
          &ldquo;{t.content}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/6">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow-md"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
          >
            {t.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold leading-tight truncate">{t.name}</p>
            <p className="text-zinc-500 text-xs truncate">{t.role} · {t.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Marquee row ──────────────────────────────────────────────────────────────

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof ROW_1;
  reverse?: boolean;
}) {
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex ${reverse ? "animate-marquee-reverse" : "animate-marquee-slow"}`}
        style={{ willChange: "transform" }}
      >
        {items.map((t, i) => (
          <TestimonialCard key={i} t={t} idx={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-violet-600/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 mb-14">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-amber-500" />
            <span className="text-amber-400 text-sm font-medium tracking-widest uppercase">Testimonials</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            What clients{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              say about me
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-zinc-500 text-lg max-w-lg">
            Real feedback from people I&apos;ve collaborated with on web, mobile, and design projects.
          </p>
        </Reveal>
      </div>

      {/* Marquee rows — edge fade masks */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col gap-5"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <MarqueeRow items={ROW_1} />
        <MarqueeRow items={ROW_2} reverse />
      </motion.div>
    </section>
  );
}

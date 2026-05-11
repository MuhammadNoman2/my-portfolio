"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/constants/data";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { fadeUp } from "@/lib/motion";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-600/4 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
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
          <p className="text-zinc-500 text-lg mb-16 max-w-lg">
            Real feedback from people I&apos;ve collaborated with on Flutter apps and design projects.
          </p>
        </Reveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative p-7 rounded-2xl bg-white/3 border border-white/8 hover:border-amber-500/30 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-amber-500/10 cursor-default overflow-hidden"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative z-10">
                {/* Quote icon */}
                <Quote size={24} className="text-amber-500/40 mb-5" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Star size={13} className="text-amber-400 fill-amber-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 italic">&ldquo;{t.content}&rdquo;</p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white text-xs font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-zinc-500 text-xs">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, CheckCircle2, ArrowUpRight } from "lucide-react";
import { EXPERIENCE } from "@/constants/data";
import { Reveal } from "@/components/animations/Reveal";

const EXPO = [0.22, 1, 0.36, 1] as const;

export function Experience() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* BG glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-600/4 rounded-full filter blur-[130px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-teal-600/4 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-emerald-500" />
            <span className="text-emerald-400 text-sm font-medium tracking-widest uppercase">Experience</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            My journey &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              milestones
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-zinc-500 text-lg mb-20 max-w-lg">
            From academic projects to freelance client work — here&apos;s how I&apos;ve grown as a developer and designer.
          </p>
        </Reveal>

        {/* Timeline */}
        <div className="relative">

          {/* Animated vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.0, 0.0, 0.2, 1] }}
            style={{ originY: 0 }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/70 via-teal-500/30 to-transparent"
          />

          <div className="space-y-14">
            {EXPERIENCE.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="relative flex flex-col md:flex-row items-start gap-8">

                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.12, type: "spring", stiffness: 320, damping: 26 }}
                    className="absolute left-6 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 top-0 z-10"
                  >
                    {/* Outer ring pulse */}
                    <motion.div
                      animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.4 }}
                      className="absolute inset-0 rounded-2xl bg-emerald-500/30"
                    />
                    <div className="w-12 h-12 rounded-2xl bg-zinc-950 border-2 border-emerald-500/55 flex items-center justify-center shadow-lg shadow-emerald-500/15 relative z-10">
                      {exp.type === "work" ? (
                        <Briefcase size={16} className="text-emerald-400" />
                      ) : (
                        <GraduationCap size={16} className="text-teal-400" />
                      )}
                    </div>
                  </motion.div>

                  {/* Content card */}
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isLeft ? "md:pr-16 md:text-right" : "md:ml-auto md:pl-16"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.7, ease: EXPO, delay: i * 0.1 }}
                      whileHover={{ scale: 1.02, y: -3 }}
                      className="group relative p-7 rounded-2xl bg-white/3 border border-white/8 hover:border-emerald-500/35 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/8 cursor-default"
                    >
                      {/* Hover glow overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                      {/* Left accent bar */}
                      <div className={`absolute top-7 bottom-7 w-0.5 bg-gradient-to-b from-emerald-500/60 to-transparent rounded-full ${isLeft ? "md:right-0 left-0 md:left-auto" : "left-0"}`} />

                      <div className="relative z-10">
                        {/* Period */}
                        <span className="text-xs font-semibold text-zinc-600 tracking-widest uppercase">{exp.period}</span>

                        {/* Role */}
                        <h3 className="font-bold text-white text-lg mt-2 mb-1 leading-tight">{exp.role}</h3>

                        {/* Company */}
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm font-medium mb-4 transition-colors group/link"
                          >
                            {exp.company}
                            <ArrowUpRight size={11} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          <p className="text-emerald-400 text-sm font-medium mb-4">{exp.company}</p>
                        )}

                        {/* Description */}
                        <p className="text-zinc-400 text-sm leading-relaxed mb-5">{exp.description}</p>

                        {/* Highlights */}
                        <ul className={`space-y-2 ${isLeft ? "md:items-end flex flex-col" : ""}`}>
                          {exp.highlights.map((h) => (
                            <li key={h} className="flex items-center gap-2 text-xs text-zinc-500">
                              <CheckCircle2 size={11} className="text-emerald-500 flex-shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

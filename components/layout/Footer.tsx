"use client";

import { motion } from "framer-motion";
import { Mail, Heart, ArrowUp, Zap, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { PERSONAL_INFO } from "@/constants/data";

const EXPO = [0.22, 1, 0.36, 1] as const;

const socials = [
  { icon: GithubIcon,  href: PERSONAL_INFO.github,   label: "GitHub"   },
  { icon: LinkedinIcon,href: PERSONAL_INFO.linkedin,  label: "LinkedIn" },
  { icon: Mail,        href: `mailto:${PERSONAL_INFO.email}`, label: "Email" },
];

export function Footer() {
  return (
    <>
      {/* ── Pre-footer CTA ─────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/8 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-violet-600/8 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EXPO }}
            className="flex flex-col items-center gap-8"
          >
            {/* Animated orb above text */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-violet-500/40"
            >
              <Zap size={22} className="text-white" />
            </motion.div>

            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight">
                Ready to build
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400">
                  something great?
                </span>
              </h2>
              <p className="text-zinc-500 text-lg max-w-md mx-auto leading-relaxed">
                I&apos;m currently open to new projects. Let&apos;s turn your idea into a premium digital product.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href={`mailto:${PERSONAL_INFO.email}`}
                whileHover={{ scale: 1.04, boxShadow: "0 0 0 1px rgba(139,92,246,0.7), 0 16px 48px rgba(109,40,217,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex items-center gap-2.5 px-8 py-4 text-white font-bold rounded-2xl overflow-hidden text-sm cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #a855f7 100%)",
                  boxShadow: "0 0 0 1px rgba(139,92,246,0.45), 0 8px 32px rgba(109,40,217,0.35)",
                }}
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "220%" }}
                  transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/18 to-transparent skew-x-12"
                />
                <Mail size={15} className="relative z-10" />
                <span className="relative z-10">Start a Project</span>
                <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>

              <motion.a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, borderColor: "rgba(139,92,246,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-7 py-4 bg-white/4 border border-white/10 text-white font-semibold rounded-2xl backdrop-blur-md text-sm transition-colors cursor-pointer"
              >
                <LinkedinIcon size={15} />
                <span>LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="relative border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/8 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EXPO }}
            className="flex flex-col items-center gap-7"
          >
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Zap size={13} className="text-white" />
              </div>
              <span className="font-bold text-white text-base">
                Noman<span className="text-violet-400">.</span>dev
              </span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/8 hover:border-violet-500/35 transition-all duration-200 cursor-pointer"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/5" />

            {/* Bottom row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
              <p className="text-zinc-700 text-xs flex items-center gap-1.5">
                Made with <Heart size={10} className="text-rose-500 fill-rose-500" /> by Muhammad Noman
              </p>
              <p className="text-zinc-700 text-xs">© {new Date().getFullYear()} All rights reserved.</p>
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-violet-400 transition-colors cursor-pointer"
              >
                <ArrowUp size={12} />
                Back to top
              </motion.button>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}

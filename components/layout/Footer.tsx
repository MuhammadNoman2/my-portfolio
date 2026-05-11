"use client";

import { motion } from "framer-motion";
import { Mail, Heart, ArrowUp, Zap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { PERSONAL_INFO } from "@/constants/data";
import { staggerContainer, fadeUp } from "@/lib/motion";

const socials = [
  { icon: GithubIcon, href: PERSONAL_INFO.github, label: "GitHub" },
  { icon: LinkedinIcon, href: PERSONAL_INFO.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black/30 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center gap-8"
        >
          {/* Logo */}
          <motion.div variants={fadeUp} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Zap size={15} className="text-white" />
            </div>
            <span className="font-bold text-white text-lg">
              Noman<span className="text-violet-400">.</span>dev
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p variants={fadeUp} className="text-zinc-500 text-sm text-center max-w-xs">
            Software Developer &amp; CTO of{" "}
            <a href="https://techtrigger.org/" target="_blank" rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors">
              Tech Triggers
            </a>
            {" "}· Islamabad, Pakistan.
          </motion.p>

          {/* Social Links */}
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-violet-500/40 transition-all"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeUp} className="w-full h-px bg-white/5" />

          {/* Bottom row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full"
          >
            <p className="text-zinc-600 text-xs flex items-center gap-1.5">
              Made with <Heart size={11} className="text-rose-500 fill-rose-500" /> by Muhammad Noman
            </p>
            <p className="text-zinc-600 text-xs">© {new Date().getFullYear()} All rights reserved.</p>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
            >
              <ArrowUp size={13} />
              Back to top
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { NAV_LINKS } from "@/constants/data";
import { MagneticButton } from "@/components/animations/MagneticButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function scrollTo(href: string) {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      >
        <motion.nav
          animate={scrolled ? "scrolled" : "top"}
          variants={{
            top: {
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: "rgba(255,255,255,0)",
            },
            scrolled: {
              backgroundColor: "rgba(0,0,0,0.55)",
              borderColor: "rgba(255,255,255,0.07)",
            },
          }}
          transition={{ duration: 0.4 }}
          style={{ backdropFilter: scrolled ? "blur(24px)" : "none" }}
          className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl border"
        >
          {/* Logo */}
          <MagneticButton strength={0.2}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
                <Zap size={15} className="text-white" />
              </div>
              <span className="font-bold text-white text-sm tracking-wide">
                Noman<span className="text-violet-400">.</span>dev
              </span>
            </button>
          </MagneticButton>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="relative px-4 py-2 text-sm font-medium transition-colors group"
              >
                <span
                  className={`transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </span>
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/8 rounded-lg border border-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <MagneticButton strength={0.15}>
              <button
                onClick={() => scrollTo("#contact")}
                className="relative px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
              >
                Hire Me
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-zinc-300 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-4 right-4 z-40 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-3 text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 }}
                onClick={() => scrollTo("#contact")}
                className="mt-2 w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl"
              >
                Hire Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

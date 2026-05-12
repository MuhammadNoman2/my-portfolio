"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { NAV_LINKS } from "@/constants/data";
import { MagneticButton } from "@/components/animations/MagneticButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 120) setHidden(y > lastY.current);
      lastY.current = y;
    };
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
        animate={{ y: hidden ? -120 : 0, opacity: 1 }}
        transition={{ duration: hidden ? 0.4 : 0.6, ease: [0.22, 1, 0.36, 1] }}
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
              backgroundColor: "rgba(0,0,0,0.65)",
              borderColor: "rgba(255,255,255,0.08)",
            },
          }}
          transition={{ duration: 0.4 }}
          style={{ backdropFilter: scrolled ? "blur(28px) saturate(1.6)" : "none" }}
          className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl border"
        >
          {/* Logo */}
          <MagneticButton strength={0.2}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/55 transition-shadow duration-300">
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
                className="relative px-4 py-2 text-sm font-medium transition-colors group cursor-pointer"
              >
                <span
                  className={`transition-colors duration-200 ${
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
                className="relative px-5 py-2 text-sm font-semibold text-white rounded-xl overflow-hidden cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
                  boxShadow: "0 0 0 1px rgba(139,92,246,0.4), 0 4px 20px rgba(109,40,217,0.35)",
                }}
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12"
                />
                <span className="relative z-10">Hire Me</span>
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-zinc-300 hover:text-white transition-colors cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-4 right-4 z-40 bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl shadow-black/60"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-3 text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium cursor-pointer"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.055 }}
                onClick={() => scrollTo("#contact")}
                className="mt-2 w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl cursor-pointer"
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

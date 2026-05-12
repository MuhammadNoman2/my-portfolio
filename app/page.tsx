"use client";

import { useLenis } from "@/hooks/useLenis";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { SkillTicker } from "@/components/ui/SkillTicker";

export default function Home() {
  useLenis();

  return (
    <main className="relative bg-black min-h-screen overflow-x-hidden">

      {/* ── CSS ambient background — GPU-composited, zero JS ─────────────── */}
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
        {/* Violet orb — top left */}
        <div className="bg-orb bg-orb-violet" />
        {/* Blue orb — bottom right */}
        <div className="bg-orb bg-orb-blue" />
        {/* Fuchsia accent — center */}
        <div className="bg-orb bg-orb-fuchsia" />
      </div>

      {/* ── Dot grid overlay ─────────────────────────────────────────────── */}
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none dot-grid opacity-60" />

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <Hero />
      </div>

      {/* ── Skill ticker ─────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <SkillTicker />
      </div>

      {/* ── Sections ─────────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <About />
      </div>
      <div className="relative z-10">
        <Skills />
      </div>
      <div className="relative z-10">
        <Projects />
      </div>
      <div className="relative z-10">
        <Experience />
      </div>
      <div className="relative z-10">
        <Testimonials />
      </div>
      <div className="relative z-10">
        <Contact />
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}

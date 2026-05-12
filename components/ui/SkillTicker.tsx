"use client";

import { useEffect, useRef } from "react";

const ITEMS = [
  "React", "⬡", "Next.js", "★", "Flutter", "⬡", "Node.js", "★",
  "TypeScript", "⬡", "Supabase", "★", "Python", "⬡", "TailwindCSS", "★",
  "PostgreSQL", "⬡", "Firebase", "★", "Docker", "⬡", "REST APIs", "★",
  "Figma", "⬡", "Supabase", "★", "Framer Motion", "⬡", "Django", "★",
];

export function SkillTicker() {
  const track1 = useRef<HTMLDivElement>(null);
  const track2 = useRef<HTMLDivElement>(null);

  // CSS animation via style injection — zero JS overhead at runtime
  return (
    <div
      className="relative overflow-hidden py-4 border-y border-white/6 bg-black/40 backdrop-blur-sm"
      style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
    >
      {/* Row 1 — scrolls left */}
      <div ref={track1} className="flex gap-8 whitespace-nowrap ticker-row">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className={
              item === "⬡" || item === "★"
                ? "text-violet-500/60 text-xs"
                : "text-zinc-400 text-sm font-medium tracking-wide hover:text-violet-300 transition-colors duration-300 cursor-default"
            }
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        .ticker-row {
          display: flex;
          gap: 2rem;
          white-space: nowrap;
          animation: ticker-left 38s linear infinite;
          will-change: transform;
        }

        @keyframes ticker-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-row { animation: none; }
        }
      `}</style>
    </div>
  );
}

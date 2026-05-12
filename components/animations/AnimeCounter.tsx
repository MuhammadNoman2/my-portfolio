"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { useInView } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
}

interface AnimeCounterProps {
  stats: StatItem[];
  className?: string;
}

// Extracts leading number from strings like "4+" or "7+" or "3"
function parseNum(s: string): number {
  return parseInt(s.replace(/\D/g, ""), 10) || 0;
}

export function AnimeCounter({ stats, className = "" }: AnimeCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const animated = useRef(false);

  useEffect(() => {
    if (!isInView || animated.current || !containerRef.current) return;
    animated.current = true;

    const numEls = containerRef.current.querySelectorAll<HTMLElement>("[data-count]");

    numEls.forEach((el) => {
      const target = parseInt(el.dataset.count ?? "0", 10);
      const suffix = el.dataset.suffix ?? "";
      const obj = { val: 0 };

      animate(obj, {
        val: target,
        duration: 1800,
        ease: "outExpo",
        delay: parseInt(el.dataset.delay ?? "0", 10),
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + suffix;
        },
      });
    });

    // Animate the labels with stagger
    const labels = containerRef.current.querySelectorAll<HTMLElement>("[data-label]");
    if (labels.length) {
      animate(labels, {
        opacity: [0, 1],
        translateY: ["8px", "0px"],
        duration: 600,
        ease: "outQuart",
        delay: stagger(120, { start: 400 }),
      });
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className={`flex items-center gap-6 ${className}`}>
      {stats.map(({ value, label }, i) => {
        const num    = parseNum(value);
        const suffix = value.replace(/\d/g, "");
        return (
          <div key={label} className="flex items-center gap-6">
            <div className="text-center sm:text-left">
              <p
                data-count={num}
                data-suffix={suffix}
                data-delay={i * 150}
                className="text-xl font-black text-white leading-none tabular-nums"
              >
                {value}
              </p>
              <p data-label className="text-xs text-zinc-600 mt-0.5">
                {label}
              </p>
            </div>
            {i < stats.length - 1 && (
              <div className="w-px h-6 bg-white/8" />
            )}
          </div>
        );
      })}
    </div>
  );
}

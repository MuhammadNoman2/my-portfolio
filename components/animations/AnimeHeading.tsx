"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { useInView } from "framer-motion";

interface AnimeHeadingProps {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4";
  delay?: number;
  scramble?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function AnimeHeading({
  children,
  className = "",
  tag: Tag = "h2",
  delay = 0,
  scramble = false,
}: AnimeHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const animated = useRef(false);

  useEffect(() => {
    if (!inView || animated.current || !ref.current) return;
    animated.current = true;

    const el = ref.current;
    const text = children;
    const chars = text.split("");

    // Build spans around each character
    el.innerHTML = chars
      .map((ch) =>
        ch === " "
          ? `<span class="inline-block" style="min-width:0.3em">&nbsp;</span>`
          : `<span class="inline-block" data-char="${ch}">${scramble ? randomChar() : ch}</span>`
      )
      .join("");

    const spans = el.querySelectorAll<HTMLSpanElement>("[data-char]");

    if (scramble) {
      // Scramble then resolve each char
      spans.forEach((span, i) => {
        const target = span.dataset.char ?? "";
        let counter = 0;
        const interval = setInterval(() => {
          span.textContent = randomChar();
          counter++;
          if (counter > 6 + i * 2) {
            clearInterval(interval);
            span.textContent = target;
          }
        }, 40);
      });

      animate(spans, {
        opacity: [0, 1],
        duration: 300,
        ease: "outQuad",
        delay: stagger(30, { start: delay }),
      });
    } else {
      // Slide-up reveal stagger
      animate(spans, {
        opacity: [0, 1],
        translateY: ["60%", "0%"],
        duration: 700,
        ease: "outExpo",
        delay: stagger(28, { start: delay }),
      });
    }
  }, [inView, children, delay, scramble]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement>}
      className={className}
      aria-label={children}
    />
  );
}

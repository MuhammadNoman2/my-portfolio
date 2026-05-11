"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

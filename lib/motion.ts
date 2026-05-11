import { Variants } from "framer-motion";

export const ease = [0.25, 0.1, 0.25, 1] as const;
export const easeOut = [0.0, 0.0, 0.2, 1] as const;
export const easeInOut = [0.4, 0, 0.2, 1] as const;

// Apple-grade exponential easings
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutExpo = [0.87, 0, 0.13, 1] as const;
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;

export const spring = { type: "spring", stiffness: 300, damping: 30 };
export const springGentle = { type: "spring", stiffness: 100, damping: 20 };
export const springSnappy = { type: "spring", stiffness: 500, damping: 50, mass: 0.8 };
export const springSmooth = { type: "spring", stiffness: 60, damping: 18, mass: 1 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -4, transition: { duration: 0.3, ease: easeOut } },
};

export const glowPulse: Variants = {
  initial: { opacity: 0.5, scale: 1 },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.05, 1],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export const textReveal: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const navbarVariants: Variants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
    backdropFilter: "blur(0px)",
    borderColor: "rgba(255,255,255,0)",
    boxShadow: "none",
  },
  scrolled: {
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(20px)",
    borderColor: "rgba(255,255,255,0.06)",
    boxShadow: "0 0 40px rgba(0,0,0,0.4)",
  },
};

export const viewportConfig = {
  once: true,
  margin: "-80px",
};

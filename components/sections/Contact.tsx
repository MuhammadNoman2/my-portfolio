"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { PERSONAL_INFO } from "@/constants/data";
import { Reveal } from "@/components/animations/Reveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { fadeUp, staggerContainer } from "@/lib/motion";

const INFO = [
  { icon: Mail, label: "Email", value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
  { icon: MapPin, label: "Location", value: PERSONAL_INFO.location, href: null as string | null },
  { icon: GithubIcon, label: "GitHub", value: "github.com/MuhammadNoman2", href: PERSONAL_INFO.github },
  { icon: LinkedinIcon, label: "LinkedIn", value: "muhammadnomanflutter", href: PERSONAL_INFO.linkedin },
];

function AnimatedInput({
  label, name, type = "text", placeholder, required, multiline = false,
}: {
  label: string; name: string; type?: string; placeholder: string; required?: boolean; multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const shared = {
    id: name,
    name,
    placeholder,
    required,
    value,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.target.value),
    className:
      "w-full bg-transparent text-white placeholder-zinc-600 text-sm outline-none py-3.5 px-4 resize-none",
  };

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-zinc-400 text-xs font-medium tracking-wide">
        {label}
      </label>
      <motion.div
        animate={focused ? { borderColor: "rgba(139,92,246,0.6)", boxShadow: "0 0 0 3px rgba(139,92,246,0.1)" } : { borderColor: "rgba(255,255,255,0.08)", boxShadow: "none" }}
        transition={{ duration: 0.2 }}
        className="rounded-xl border bg-white/3 backdrop-blur-sm overflow-hidden"
      >
        {multiline ? (
          <textarea {...shared} rows={5} style={{ minHeight: 120 }} />
        ) : (
          <input {...shared} type={type} />
        )}
      </motion.div>
    </div>
  );
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `[Portfolio] ${data.subject}`,
          from_name: data.name,
          email: data.email,
          message: `From: ${data.name} <${data.email}>\nSubject: ${data.subject}\n\n${data.message}`,
          botcheck: "",
        }),
      });
      const json = await res.json();
      setStatus(json.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/6 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-violet-500" />
            <span className="text-violet-400 text-sm font-medium tracking-widest uppercase">Contact</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Let&apos;s build something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              amazing
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-zinc-500 text-lg mb-16 max-w-lg">
            Have a project in mind? Looking for a full-stack or mobile developer? Let&apos;s talk.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="lg:col-span-2 space-y-4"
          >
            {INFO.map(({ icon: Icon, label, value, href }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover={{ x: 4 }}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white/3 border border-white/8 hover:border-violet-500/30 transition-all backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-violet-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-zinc-600 text-xs font-medium">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 text-sm hover:text-violet-400 transition-colors truncate block"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-zinc-300 text-sm truncate">{value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Form */}
          <Reveal delay={0.15} className="lg:col-span-3">
            <div className="p-8 rounded-2xl bg-white/3 border border-white/8 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-5 py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 250, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center"
                    >
                      <CheckCircle size={28} className="text-emerald-400" />
                    </motion.div>
                    <div>
                      <p className="text-white font-bold text-xl mb-2">Message sent!</p>
                      <p className="text-zinc-500 text-sm">I&apos;ll get back to you within 24 hours.</p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-violet-400 hover:text-violet-300 text-sm transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="space-y-5">
                    {/* Error banner */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex flex-wrap items-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-sm"
                        >
                          <span className="font-semibold">Failed to send.</span>
                          <span className="text-rose-500/80">Please try again or email me directly.</span>
                          <button onClick={() => setStatus("idle")} className="ml-auto text-rose-600 hover:text-rose-400 transition-colors text-xs underline">Dismiss</button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <AnimatedInput label="Your Name" name="name" placeholder="Muhammad Ahmed" required />
                      <AnimatedInput label="Email Address" name="email" type="email" placeholder="you@example.com" required />
                    </div>
                    <AnimatedInput label="Subject" name="subject" placeholder="Let's build a Flutter app" required />
                    <AnimatedInput label="Message" name="message" placeholder="Tell me about your project..." required multiline />

                    <MagneticButton strength={0.1} className="w-full">
                      <motion.button
                        type="submit"
                        disabled={status === "sending"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2.5 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:from-violet-800 disabled:to-purple-800 text-white font-semibold rounded-xl shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 transition-all"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </MagneticButton>
                  </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, CheckCircle, Loader2, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { PERSONAL_INFO } from "@/constants/data";
import { Reveal } from "@/components/animations/Reveal";
import { MagneticButton } from "@/components/animations/MagneticButton";

const EXPO = [0.22, 1, 0.36, 1] as const;

const INFO = [
  { icon: Mail,        label: "Email",    value: PERSONAL_INFO.email,              href: `mailto:${PERSONAL_INFO.email}` },
  { icon: MapPin,      label: "Location", value: PERSONAL_INFO.location,           href: null as string | null },
  { icon: GithubIcon,  label: "GitHub",   value: "github.com/MuhammadNoman2",       href: PERSONAL_INFO.github },
  { icon: LinkedinIcon,label: "LinkedIn", value: "muhammadnomanflutter",            href: PERSONAL_INFO.linkedin },
];

// ─── Form field ───────────────────────────────────────────────────────────────

function Field({
  label, name, type = "text", placeholder, required, multiline = false,
}: {
  label: string; name: string; type?: string; placeholder: string; required?: boolean; multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const shared = {
    id: name, name, placeholder, required, value,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.target.value),
    className: "w-full bg-transparent text-white placeholder-zinc-600 text-sm outline-none py-3.5 px-4 resize-none",
  };

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-zinc-400 text-xs font-medium tracking-wide">{label}</label>
      <motion.div
        animate={
          focused
            ? { borderColor: "rgba(139,92,246,0.65)", boxShadow: "0 0 0 3px rgba(139,92,246,0.1)" }
            : { borderColor: "rgba(255,255,255,0.08)", boxShadow: "none" }
        }
        transition={{ duration: 0.2 }}
        className="rounded-xl border bg-white/3 backdrop-blur-sm overflow-hidden"
      >
        {multiline ? <textarea {...shared} rows={5} style={{ minHeight: 120 }} /> : <input {...shared} type={type} />}
      </motion.div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem("name")    as HTMLInputElement).value,
      email:   (form.elements.namedItem("email")   as HTMLInputElement).value,
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
      {/* BG glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-violet-600/6 rounded-full filter blur-[160px] pointer-events-none" />

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

          {/* ── Left: info panel ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Decorative card on top */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EXPO }}
              className="relative p-6 rounded-2xl overflow-hidden border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 mb-6"
            >
              {/* Animated orb inside the card */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.65, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)", filter: "blur(20px)" }}
              />
              <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
                Currently <span className="text-emerald-400 font-semibold">available</span> for new projects and collaborations.
                Based in Islamabad — working with clients globally.
              </p>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-1.5 mt-4 text-violet-400 hover:text-violet-300 text-sm font-semibold transition-colors group relative z-10"
              >
                Start a conversation
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </motion.div>

            {/* Info items */}
            {INFO.map(({ icon: Icon, label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EXPO, delay: i * 0.08 }}
                whileHover={{ x: 4 }}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/3 border border-white/8 hover:border-violet-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-violet-400" />
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
          </div>

          {/* ── Right: form ── */}
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
                      transition={{ type: "spring", stiffness: 260, delay: 0.1 }}
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
                      className="text-violet-400 hover:text-violet-300 text-sm transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
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
                          <button onClick={() => setStatus("idle")} className="ml-auto text-rose-600 hover:text-rose-400 text-xs underline cursor-pointer">Dismiss</button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Your Name"      name="name"    placeholder="Muhammad Ahmed"          required />
                      <Field label="Email Address"  name="email"   type="email" placeholder="you@example.com" required />
                    </div>
                    <Field label="Subject" name="subject" placeholder="Let's build a Flutter app" required />
                    <Field label="Message" name="message" placeholder="Tell me about your project..." required multiline />

                    <MagneticButton strength={0.1} className="w-full">
                      <motion.button
                        type="submit"
                        disabled={status === "sending"}
                        whileHover={{ scale: 1.02, boxShadow: "0 0 0 1px rgba(139,92,246,0.6), 0 12px 40px rgba(109,40,217,0.45)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2.5 py-4 font-semibold text-white rounded-xl transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
                        style={{
                          background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #a855f7 100%)",
                          boxShadow: "0 0 0 1px rgba(139,92,246,0.4), 0 8px 28px rgba(109,40,217,0.3)",
                        }}
                      >
                        <motion.div
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "200%" }}
                          transition={{ duration: 0.55 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12"
                        />
                        <span className="relative z-10 flex items-center gap-2.5">
                          {status === "sending" ? (
                            <><Loader2 size={16} className="animate-spin" />Sending...</>
                          ) : (
                            <><Send size={15} />Send Message</>
                          )}
                        </span>
                      </motion.button>
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

'use client'

import { useRef, useState, type FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { personalInfo } from '@/lib/data'

type FormState = 'idle' | 'sending' | 'success' | 'error'

const socialLinks = [
  {
    label: 'LinkedIn',
    href: personalInfo.linkedin,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${personalInfo.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-10 7L2 7"/>
      </svg>
    ),
  },
  {
    label: 'Phone',
    href: `tel:${personalInfo.phone.replace(/\D/g, '')}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.19 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormState('sending')

    // ─────────────────────────────────────────────────────────────────────
    // TODO: Wire up email delivery here. Two options:
    //
    // Option A — EmailJS (zero backend, free tier):
    //   1. npm install @emailjs/browser
    //   2. import emailjs from '@emailjs/browser'
    //   3. Replace the timeout below with:
    //      await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
    //
    // Option B — AWS SES via API Route (recommended for Phase 2):
    //   1. Create app/api/contact/route.ts
    //   2. Use @aws-sdk/client-ses to send via SES
    //   3. Replace the timeout below with:
    //      await fetch('/api/contact', { method:'POST', body: JSON.stringify(form) })
    // ─────────────────────────────────────────────────────────────────────
    await new Promise((res) => setTimeout(res, 1500))

    // Simulated success — replace with real send logic above
    setFormState('success')
    setForm({ name: '', email: '', subject: '', message: '' })

    setTimeout(() => setFormState('idle'), 5000)
  }

  const inputClass =
    'form-input w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 transition-all duration-200'

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 lg:px-20">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(6,182,212,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sm font-mono text-violet-400 mb-3 tracking-widest uppercase">04 — Contact</p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Let&apos;s build something<br />
            <span className="gradient-text">remarkable.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* ── Left: Contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass-card gradient-border rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-6">Send a message</h3>

              {formState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                >
                  <div className="text-5xl">🎉</div>
                  <h4 className="text-xl font-bold text-white">Message sent!</h4>
                  <p className="text-slate-400 text-sm">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5 ml-1">Name *</label>
                      <input
                        required
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5 ml-1">Email *</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5 ml-1">Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ appearance: 'none' }}
                    >
                      <option value="" disabled>Select a topic...</option>
                      <option value="job-opportunity">Job Opportunity</option>
                      <option value="consulting">Consulting / Freelance</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5 ml-1">Message *</label>
                    <textarea
                      required
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell me about the opportunity or project..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="btn-primary w-full py-3.5 rounded-xl font-semibold text-white text-sm"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {formState === 'sending' ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"/>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                          </svg>
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* ── Right: Cal.com + Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Schedule a meeting card */}
            <div className="glass-card gradient-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.2)' }}>
                  📅
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Schedule a Meeting</h3>
                  <p className="text-xs text-slate-500">30-min intro call</p>
                </div>
              </div>

              <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                Skip the back-and-forth. Book a time directly on my calendar and let&apos;s talk.
              </p>

              {/* ── Cal.com embed iframe ──
                  Replace the href below with your actual Cal.com booking link.
                  To embed inline: uncomment the iframe block below and set the src.
                  Sign up free at cal.com → create event → copy your booking URL.
              */}
              <a
                href={personalInfo.calcomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary block text-center py-3 rounded-xl font-semibold text-sm text-white"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Book a 30-min Call
                </span>
              </a>

              {/*
                ── Cal.com Inline Embed (Phase 2) ──
                Replace the button above with this iframe once you have your Cal.com URL:

                <iframe
                  src="https://cal.com/sangeeth-k-mohan/meet?embed=true"
                  width="100%"
                  height="500"
                  style={{ border: 'none', borderRadius: '12px' }}
                  title="Schedule a meeting"
                />
              */}
            </div>

            {/* Quick contact info */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Or reach out directly</h3>
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all group"
                  whileHover={{ x: 4 }}
                >
                  <span className="text-violet-400 group-hover:text-violet-300 transition-colors">
                    {link.icon}
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">{link.label}</p>
                    <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                      {link.label === 'LinkedIn'
                        ? 'linkedin.com/in/sangeethkumarmohan'
                        : link.label === 'Email'
                        ? personalInfo.email
                        : personalInfo.phone}
                    </p>
                  </div>
                  <svg className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* Availability tag */}
            <div className="flex items-center gap-2 px-4 py-3 glass-card rounded-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-sm text-slate-400">
                Based in <span className="text-slate-200">Herndon, VA</span> · Open to remote & hybrid roles
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { personalInfo } from '@/lib/data'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/[0.06] py-12 px-6 md:px-12 lg:px-20">
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.3), transparent)' }} />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <button onClick={scrollToTop} className="text-2xl font-black gradient-text tracking-tight">
              Sangeeth Kumar Mohan
            </button>
            <p className="text-sm text-slate-600">Senior Full Stack Engineer · Herndon, VA</p>
          </div>

          {/* Center: Nav */}
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: Social + back to top */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-slate-400 hover:text-violet-400 hover:border-violet-500/30 transition-all"
              aria-label="LinkedIn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              aria-label="Email"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-10 7L2 7"/>
              </svg>
            </a>

            <motion.button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              whileHover={{ y: -2 }}
              aria-label="Back to top"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 pt-6 border-t border-white/[0.04] flex items-center justify-center text-xs text-slate-600">
          <span>© {year} Sangeeth Kumar Mohan. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

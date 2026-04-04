'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { personalInfo } from '@/lib/data'

// ── Letter-by-letter stagger animation ──
const nameVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.6,
    },
  },
}

const letterVariants = {
  hidden: { y: 60, opacity: 0, rotateX: -40 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: 'spring',
      damping: 18,
      stiffness: 180,
    },
  },
}

const fadeUp = (delay: number) => ({
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  },
})

// ── Scramble text hook ──
function useScramble(target: string, startDelay = 400) {
  const [display, setDisplay] = useState('')
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  useEffect(() => {
    let frame = 0
    let rafId: number
    const totalFrames = 40
    const startFrame = Math.floor((startDelay / 1000) * 60)

    const animate = () => {
      frame++
      if (frame < startFrame) {
        rafId = requestAnimationFrame(animate)
        return
      }

      const progress = Math.min((frame - startFrame) / totalFrames, 1)
      const revealedCount = Math.floor(progress * target.length)

      let result = ''
      for (let i = 0; i < target.length; i++) {
        if (target[i] === ' ') {
          result += ' '
        } else if (i < revealedCount) {
          result += target[i]
        } else {
          result += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      setDisplay(result)

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      } else {
        setDisplay(target)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [target, startDelay])

  return display
}

// ── Roles typewriter ──
const roles = [
  'Senior Full Stack Engineer',
  'React & Node.js Architect',
  'AWS Cloud Builder',
  'Auth Systems Expert',
]

function useTypewriter(strings: string[], delay = 2000) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = strings[idx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), delay)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIdx((i) => (i + 1) % strings.length)
    } else {
      const speed = deleting ? 40 : 80
      timeout = setTimeout(() => {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, idx, strings, delay])

  return text
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const role = useTypewriter(roles, 2200)

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Gradient Orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-violet" />
        <div className="orb orb-cyan" />
        <div className="orb orb-small" />
      </div>

      {/* ── Grid pattern overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full glass-card gradient-border"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-sm text-slate-300 font-medium">Open to new opportunities</span>
        </motion.div>

        {/* Name — letter-by-letter */}
        <motion.div
          variants={nameVariants}
          initial="hidden"
          animate="visible"
          className="overflow-hidden mb-4"
          style={{ perspective: 1000 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
            {'Sangeeth Kumar Mohan'.split('').map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className={`inline-block ${char === ' ' ? 'mr-4 md:mr-6' : ''} ${
                  i < 8 ? 'text-white' : i < 14 ? 'gradient-text' : 'text-white'
                }`}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.div
          variants={fadeUp(1.4)}
          initial="hidden"
          animate="visible"
          className="h-10 flex items-center justify-center mb-6"
        >
          <p className="text-xl md:text-2xl text-slate-400 font-light">
            <span className="gradient-text font-semibold">{role}</span>
            <span className="animate-pulse text-violet-500 ml-0.5">|</span>
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp(1.7)}
          initial="hidden"
          animate="visible"
          className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          14+ years building end-to-end systems — from pixel-perfect UIs to distributed infrastructure — serving{' '}
          <span className="text-slate-300 font-medium">1M+ users daily</span> across{' '}
          <span className="text-slate-300 font-medium">telecom, healthcare & finance</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp(2.0)}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary px-8 py-4 rounded-xl text-base font-semibold text-white"
            whileTap={{ scale: 0.96 }}
          >
            <span className="flex items-center gap-2">
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </motion.button>

          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline px-8 py-4 rounded-xl text-base font-semibold text-white"
            whileTap={{ scale: 0.96 }}
          >
            Let&apos;s Connect
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp(2.3)}
          initial="hidden"
          animate="visible"
          className="mt-16 flex items-center justify-center gap-8 md:gap-16"
        >
          {[
            { value: '14+', label: 'Years' },
            { value: '1M+', label: 'Daily Users' },
            { value: '7', label: 'Companies' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-black gradient-text">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-600 uppercase tracking-[0.2em]">Scroll</span>
        <div className="scroll-indicator w-5 h-8 border border-slate-700 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-violet-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}

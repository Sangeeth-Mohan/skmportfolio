'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { personalInfo, domains, education, certifications } from '@/lib/data'

// ── Animated counter ──
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1800
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

// ── Magnetic tilt photo card ──
function PhotoCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { damping: 20, stiffness: 200 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    x.set(nx)
    y.set(ny)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    // Wrapper adds padding so badges (which overflow the card) are never clipped
    <div className="relative pt-8 pb-8 pl-6 pr-6 select-none mx-auto" style={{ width: 'fit-content' }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '800px' }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-56 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden"
      >
      {/* Spinning gradient ring border */}
      <div className="absolute inset-0 rounded-2xl"
        style={{
          background: 'conic-gradient(from 0deg, #7c3aed, #06b6d4, #ec4899, #7c3aed)',
          padding: '2px',
          animation: 'ringspin 6s linear infinite',
        }}
      >
        <div className="w-full h-full rounded-2xl" style={{ background: '#08080f' }} />
      </div>

      {/* Glow blur behind */}
      <div className="absolute inset-0 rounded-2xl blur-2xl opacity-25"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }} />

      {/* Photo — fills card, fades to dark at bottom */}
      <div className="absolute inset-[2px] rounded-2xl overflow-hidden">
        <img
          src="/photo.jpg"
          alt="Sangeeth Kumar Mohan"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
        />
        {/* Gradient fade — bottom blends into bg, sides soften */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, transparent 40%, rgba(8,8,15,0.5) 75%, rgba(8,8,15,0.85) 100%)',
        }} />
        {/* Subtle side vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(8,8,15,0.4) 100%)',
        }} />
      </div>
      </motion.div>

      {/* Floating "Open to work" badge — sits below card */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 -right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300"
        style={{
          background: 'rgba(8,8,15,0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        Open to work
      </motion.div>

      {/* Floating location badge — sits above card */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-0 -left-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300"
        style={{
          background: 'rgba(8,8,15,0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.12)',
          transform: 'translateZ(30px)',
        }}
      >
        📍 Herndon, VA
      </motion.div>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const statsData = [
    { value: 14, suffix: '+', label: 'Years Experience', icon: '⚡' },
    { value: 1, suffix: 'M+', label: 'Daily Users Served', icon: '👥' },
    { value: 7, suffix: '', label: 'Companies', icon: '🏢' },
    { value: 3, suffix: '', label: 'Industry Domains', icon: '🌐' },
  ]

  return (
    <section id="about" className="relative py-28 px-6 md:px-12 lg:px-20">
      {/* Spin keyframe */}
      <style>{`@keyframes ringsin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-mono text-violet-400 mb-3 tracking-widest uppercase">01 — About</p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Built to ship.<br />
            <span className="gradient-text">Wired to scale.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Photo + Bio + details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-10"
          >
            {/* Photo card */}
            <motion.div variants={itemVariants} className="flex justify-start">
              <PhotoCard />
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-lg text-slate-300 leading-relaxed">{personalInfo.summary}</p>
            </motion.div>

            {/* Industry domains */}
            <motion.div variants={itemVariants}>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Industries</p>
              <div className="flex flex-wrap gap-2">
                {domains.map((d) => (
                  <span key={d.name}
                    className="px-3 py-1.5 rounded-lg glass-card text-sm text-slate-300 flex items-center gap-1.5">
                    <span>{d.icon}</span><span>{d.name}</span>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div variants={itemVariants}>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Education</p>
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-slate-200 font-medium">{edu.degree}</p>
                      <p className="text-slate-500">{edu.school} · {edu.location} · {edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications — fixed styling */}
            <motion.div variants={itemVariants}>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span key={cert.name}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
                    style={{
                      background: 'rgba(124,58,237,0.12)',
                      border: '1px solid rgba(124,58,237,0.25)',
                      color: '#a78bfa',
                    }}>
                    🏆 {cert.name} · {cert.year}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Stats grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-4"
          >
            {statsData.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className="relative glass-card rounded-2xl p-7 flex flex-col gap-3 group cursor-default overflow-hidden"
              >
                <div className="text-3xl">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-black gradient-text leading-none">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-slate-500 leading-snug">{stat.label}</p>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.08), transparent 70%)' }} />
              </motion.div>
            ))}

            {/* Core stack card */}
            <motion.div variants={itemVariants} className="col-span-2 glass-card rounded-2xl p-6">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Core Stack</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Angular', 'TypeScript', 'Node.js', 'Next.js', 'AWS', 'OAuth 2.0', 'Redis', 'PostgreSQL', 'Docker'].map((tech) => (
                  <span key={tech}
                    className="px-3 py-1.5 rounded-lg text-sm font-mono"
                    style={{
                      background: 'rgba(124,58,237,0.1)',
                      border: '1px solid rgba(124,58,237,0.2)',
                      color: '#a78bfa',
                    }}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

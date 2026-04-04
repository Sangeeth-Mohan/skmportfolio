'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { experience, type ExperienceItem } from '@/lib/data'

// ── Company logos as styled initials ──
function CompanyBadge({ company, color }: { company: string; color: string }) {
  const initials = company
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
      style={{ background: `${color}22`, border: `1px solid ${color}44` }}
    >
      <span style={{ color }}>{initials}</span>
    </div>
  )
}

// ── Single experience card ──
function ExperienceCard({
  item,
  index,
  isLeft,
}: {
  item: ExperienceItem
  index: number
  isLeft: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
    >
      <motion.div
        className="glass-card rounded-2xl p-6 cursor-pointer group relative overflow-hidden"
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        style={{
          borderColor: expanded ? `${item.industryColor}33` : 'rgba(255,255,255,0.07)',
        }}
      >
        {/* Top glow when active */}
        {expanded && (
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${item.industryColor}, transparent)` }}
          />
        )}

        {/* Card header */}
        <div className="flex items-start gap-3 mb-4">
          <CompanyBadge company={item.company} color={item.industryColor} />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-bold text-white leading-snug group-hover:gradient-text transition-colors">
                {item.role}
              </h3>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 mt-0.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-500">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </motion.div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="text-sm font-semibold" style={{ color: item.industryColor }}>
                {item.company}
              </span>
              {item.via && (
                <span className="text-xs text-slate-600">via {item.via}</span>
              )}
            </div>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-slate-500 font-mono">{item.period}</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: `${item.industryColor}15`,
                  color: item.industryColor,
                  border: `1px solid ${item.industryColor}30`,
                }}
              >
                {item.industry}
              </span>
            </div>
          </div>
        </div>

        {/* Metrics badge */}
        {item.metrics && (
          <div className="mb-3 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 text-xs font-medium"
            style={{ background: `${item.industryColor}12`, color: item.industryColor, border: `1px solid ${item.industryColor}25` }}>
            <span>📊</span>
            <span>{item.metrics}</span>
          </div>
        )}

        {/* Expandable highlights */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden space-y-2.5 mt-2"
            >
              {item.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{ background: item.industryColor }} />
                  {h}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true })

  return (
    <section id="experience" className="relative py-28 px-6 md:px-12 lg:px-20">
      {/* Section bg gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-mono text-violet-400 mb-3 tracking-widest uppercase">02 — Experience</p>
          <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              14 years of<br />
              <span className="gradient-text">shipping at scale.</span>
            </h2>
            <p className="text-sm text-slate-500 md:text-right max-w-xs">
              Click any card to expand details.<br/>
              Companies shown chronologically.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line — desktop only */}
          <div className="hidden md:block timeline-line" />

          {/* Cards */}
          <div className="flex flex-col gap-8 md:gap-10">
            {experience.map((item, i) => (
              <div key={i} className="relative flex justify-center">
                {/* Timeline dot — desktop */}
                <div
                  className="hidden md:flex absolute left-1/2 top-7 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-background z-10"
                  style={{ background: item.industryColor, boxShadow: `0 0 10px ${item.industryColor}80` }}
                />

                <ExperienceCard item={item} index={i} isLeft={i % 2 === 0} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-slate-600">
            Full career history from 2009 →{' '}
            <a
              href="mailto:sangeethkumarmohan@gmail.com?subject=Resume Request"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              Request detailed resume
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

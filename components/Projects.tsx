'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { projects, type Project, type ProjectCategory } from '@/lib/data'

// ── Status badge ──
function StatusBadge({ status }: { status: Project['status'] }) {
  const map = {
    'live':         { label: 'Live', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
    'in-progress':  { label: 'In Progress', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
    'coming-soon':  { label: 'Coming Soon', color: '#64748b', bg: 'rgba(100,116,139,0.12)' },
  }
  const s = map[status]
  return (
    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}30` }}>
      {status === 'live' && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ background: s.color }} />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5"
            style={{ background: s.color }} />
        </span>
      )}
      {s.label}
    </span>
  )
}

// ── Demo Modal ──
function DemoModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: '#0f0f1a',
          border: `1px solid ${project.accentColor}30`,
          maxHeight: '90vh',
        }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{project.icon}</span>
            <div>
              <h3 className="font-bold text-white">{project.title}</h3>
              <p className="text-xs text-slate-500">{project.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
            <button onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Modal body */}
        <div className="flex-1 overflow-auto">
          {project.status === 'live' && project.demoUrl && project.embedType !== 'link' ? (
            // Live MFE / iframe embed
            <iframe
              src={project.demoUrl}
              className="w-full"
              style={{ height: '70vh', border: 'none' }}
              title={project.title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
            />
          ) : (
            // Coming soon / in-progress state
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center gap-6">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-7xl"
              >
                {project.icon}
              </motion.div>

              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {project.status === 'in-progress' ? 'Currently Building' : 'Coming Soon'}
                </h4>
                <p className="text-slate-400 max-w-md leading-relaxed">{project.description}</p>
              </div>

              <div className="text-xs text-slate-600 italic">"{project.inspiration}"</div>

              {/* Tech stack preview */}
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-lg text-xs font-mono"
                    style={{
                      background: `${project.accentColor}15`,
                      border: `1px solid ${project.accentColor}30`,
                      color: project.accentColor,
                    }}>
                    {t}
                  </span>
                ))}
              </div>

              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: `linear-gradient(135deg, ${project.accentColor}, #06b6d4)` }}>
                  Follow progress on GitHub
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Featured project card (large) ──
function FeaturedCard({ project, onDemo }: { project: Project; onDemo: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative col-span-2 rounded-2xl overflow-hidden group cursor-default"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${project.accentColor}25`,
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }} />

      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 30% 50%, ${project.accentColor}08, transparent 70%)` }} />

      <div className="relative p-8 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Left: content */}
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-4xl">{project.icon}</span>
            <StatusBadge status={project.status} />
            <span className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: `${project.accentColor}15`, color: project.accentColor, border: `1px solid ${project.accentColor}30` }}>
              {project.category}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-400 border border-white/8">
              ⭐ Featured
            </span>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{project.title}</h3>
            <p className="text-sm font-medium mb-3" style={{ color: project.accentColor }}>{project.subtitle}</p>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">{project.description}</p>
          </div>

          <div className="text-xs text-slate-600 italic border-l-2 pl-3"
            style={{ borderColor: project.accentColor + '60' }}>
            {project.inspiration}
          </div>

          {/* Metrics */}
          {project.metrics && (
            <div className="flex flex-wrap gap-2">
              {project.metrics.map((m) => (
                <span key={m} className="px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  {m}
                </span>
              ))}
            </div>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-mono"
                style={{
                  background: `${project.accentColor}12`,
                  border: `1px solid ${project.accentColor}25`,
                  color: project.accentColor,
                }}>
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <motion.button
              onClick={onDemo}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${project.accentColor}, #06b6d4)` }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {project.status === 'live' ? '🚀 Live Demo' : '👀 Preview'}
            </motion.button>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-colors btn-outline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Right: visual preview placeholder */}
        <div className="hidden md:flex md:w-64 lg:w-80 rounded-xl overflow-hidden flex-shrink-0 items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${project.accentColor}10, rgba(6,182,212,0.05))`,
            border: `1px solid ${project.accentColor}20`,
            minHeight: '220px',
          }}>
          <div className="text-center p-6">
            <div className="text-6xl mb-3">{project.icon}</div>
            <p className="text-xs text-slate-600 font-mono">Interactive Demo</p>
            {project.status === 'in-progress' && (
              <p className="text-xs mt-2" style={{ color: project.accentColor }}>Building now...</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Regular project card ──
function ProjectCard({ project, index, onDemo }: { project: Project; index: number; onDemo: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="relative rounded-2xl p-6 flex flex-col gap-4 group cursor-default"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.accentColor}08, transparent 70%)` }} />
      <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}60, transparent)` }} />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-2">
        <span className="text-3xl">{project.icon}</span>
        <StatusBadge status={project.status} />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col gap-2">
        <span className="text-xs font-medium" style={{ color: project.accentColor }}>{project.category}</span>
        <h3 className="text-lg font-bold text-white leading-snug">{project.title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{project.description}</p>
        <p className="text-xs text-slate-600 italic mt-1">{project.inspiration}</p>
      </div>

      {/* Tech pills — top 4 only */}
      <div className="relative flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="px-2 py-0.5 rounded text-xs font-mono"
            style={{
              background: `${project.accentColor}10`,
              border: `1px solid ${project.accentColor}20`,
              color: project.accentColor,
            }}>
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="px-2 py-0.5 rounded text-xs font-mono text-slate-600 bg-white/[0.03]">
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      {/* Action */}
      <motion.button
        onClick={onDemo}
        className="relative w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-slate-300 hover:text-white"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        whileHover={{ borderColor: project.accentColor + '50' }}
        whileTap={{ scale: 0.97 }}
      >
        {project.status === 'live' ? '🚀 Live Demo' : project.status === 'in-progress' ? '👀 Preview' : '📋 Details'}
      </motion.button>
    </motion.div>
  )
}

// ── Main Projects section ──
export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true })
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectCategory>('All')
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const categories: ('All' | ProjectCategory)[] = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.category))),
  ]

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  const featured = filtered.find((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative py-28 px-6 md:px-12 lg:px-20">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(124,58,237,0.04), transparent 70%)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm font-mono text-violet-400 mb-3 tracking-widest uppercase">03 — Projects</p>
          <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Built from<br />
              <span className="gradient-text">real experience.</span>
            </h2>
            <p className="text-sm text-slate-500 max-w-xs md:text-right">
              Every project is rooted in a real system<br className="hidden md:block" /> I designed or shipped professionally.
            </p>
          </div>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => {
            const isActive = cat === activeFilter
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: isActive ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                  border: isActive ? '1px solid rgba(124,58,237,0.4)' : '1px solid rgba(255,255,255,0.07)',
                  color: isActive ? '#a78bfa' : '#64748b',
                }}
              >
                {cat}
              </button>
            )
          })}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Featured card spans 2 cols */}
            {featured && (
              <FeaturedCard
                project={featured}
                onDemo={() => setActiveProject(featured)}
              />
            )}

            {/* Regular cards */}
            {rest.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onDemo={() => setActiveProject(project)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center text-sm text-slate-600"
        >
          More projects in progress —{' '}
          <a href="https://github.com/Sangeeth-Mohan" target="_blank" rel="noopener noreferrer"
            className="text-violet-400 hover:text-violet-300 transition-colors">
            follow on GitHub
          </a>
        </motion.p>
      </div>

      {/* Demo Modal */}
      <AnimatePresence>
        {activeProject && (
          <DemoModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

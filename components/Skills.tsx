'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { skillCategories, type SkillCategory } from '@/lib/data'

const categoryColors: Record<string, { bg: string; text: string; glow: string }> = {
  Frontend: { bg: 'rgba(124,58,237,0.12)', text: '#a78bfa', glow: 'rgba(124,58,237,0.3)' },
  Backend: { bg: 'rgba(6,182,212,0.12)', text: '#22d3ee', glow: 'rgba(6,182,212,0.3)' },
  'Cloud & Infra': { bg: 'rgba(16,185,129,0.12)', text: '#34d399', glow: 'rgba(16,185,129,0.3)' },
  'Auth & Security': { bg: 'rgba(245,158,11,0.12)', text: '#fbbf24', glow: 'rgba(245,158,11,0.3)' },
  Databases: { bg: 'rgba(239,68,68,0.12)', text: '#f87171', glow: 'rgba(239,68,68,0.3)' },
  DevOps: { bg: 'rgba(99,102,241,0.12)', text: '#818cf8', glow: 'rgba(99,102,241,0.3)' },
}

// ── Proficiency levels (curated) ──
const proficiency: Record<string, number> = {
  React: 98, TypeScript: 95, 'Angular 16+': 90, 'Node.js': 95, 'Next.js': 88,
  'JavaScript (ES6+)': 98, 'HTML5': 97, 'CSS3 / SCSS': 92, Vite: 82,
  'Express.js': 94, 'REST APIs': 97, GraphQL: 80, 'Java Spring Boot': 78,
  Microservices: 88, 'BFF Pattern': 90,
  'AWS Lambda': 85, 'API Gateway': 85, DynamoDB: 82, S3: 88,
  Docker: 80, 'Kubernetes (EKS/AKS)': 75, Azure: 68,
  'OAuth 2.0': 95, JWT: 95, MFA: 90, 'AWS Cognito': 88, RBAC: 85, IAM: 82,
  PostgreSQL: 80, MongoDB: 78, Redis: 88, 'Oracle DB': 72, 'PL/SQL': 68,
  Buildkite: 80, ArgoCD: 78, Git: 97, 'CI/CD Pipelines': 88,
  Splunk: 82, OpenTelemetry: 80, Prometheus: 72, Grafana: 72,
}

function SkillBadge({ skill, color, delay }: { skill: string; color: typeof categoryColors[string]; delay: number }) {
  const level = proficiency[skill] ?? 75

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -5 }}
      transition={{ duration: 0.3, delay, ease: 'easeOut' }}
      className="skill-badge group relative flex flex-col gap-2 p-3.5 rounded-xl cursor-default"
      style={{ background: color.bg, border: `1px solid ${color.text}22` }}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium" style={{ color: color.text }}>{skill}</span>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.8, delay: delay + 0.1, ease: 'easeOut' }}
          style={{ background: color.text }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true })
  const [activeTab, setActiveTab] = useState(skillCategories[0].label)

  const activeCategory = skillCategories.find((c) => c.label === activeTab)!
  const activeColor = categoryColors[activeTab]

  return (
    <section id="skills" className="relative py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sm font-mono text-violet-400 mb-3 tracking-widest uppercase">03 — Skills</p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            The full-stack<br />
            <span className="gradient-text">arsenal.</span>
          </h2>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {skillCategories.map((cat) => {
            const isActive = cat.label === activeTab
            const color = categoryColors[cat.label]

            return (
              <button
                key={cat.label}
                onClick={() => setActiveTab(cat.label)}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: isActive ? color.bg : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? color.text + '40' : 'rgba(255,255,255,0.07)'}`,
                  color: isActive ? color.text : '#64748b',
                  boxShadow: isActive ? `0 0 20px ${color.glow}` : 'none',
                }}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Skill grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {activeCategory.skills.map((skill, i) => (
              <SkillBadge
                key={skill}
                skill={skill}
                color={activeColor}
                delay={i * 0.05}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 glass-card rounded-2xl p-8 gradient-border"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="text-5xl">🎯</div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">End-to-end ownership</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                From designing React component architecture to wiring up AWS Lambda + API Gateway,
                implementing OAuth 2.0 auth flows, and shipping via ArgoCD — I own the full delivery chain.
                I&apos;ve operated across telecom, healthcare, and financial domains with teams ranging from
                scrappy startups to enterprise orgs serving millions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// Portfolio Data — Sangeeth Kumar Mohan
// ─────────────────────────────────────────────────

export const personalInfo = {
  name: 'Sangeeth Kumar Mohan',
  firstName: 'Sangeeth',
  title: 'Senior Software Engineer',
  titleAccent: 'Full Stack',
  tagline: 'I build systems that scale to millions.',
  location: 'Herndon, VA',
  phone: '+1 (510) 771-4567',
  email: 'sangeethkumarmohan@gmail.com',
  linkedin: 'https://linkedin.com/in/sangeethkumarmohan',
  summary:
    'Senior Full Stack Engineer with 14+ years of experience building high-performance, user-facing web applications across telecom, healthcare, and financial domains. Specialized in React, Angular, Node.js, and AWS — from pixel-perfect UIs to the distributed systems powering them.',
  calcomUrl: 'https://cal.com/sangeeth-k-mohan/meet',
}

export const stats = [
  { value: '14+', label: 'Years Experience', suffix: '' },
  { value: '1M', label: 'Daily Users Served', suffix: '+' },
  { value: '7', label: 'Companies', suffix: '' },
  { value: '3', label: 'Industry Domains', suffix: '' },
]

export type ExperienceItem = {
  role: string
  company: string
  via?: string
  period: string
  industry: string
  industryColor: string
  highlights: string[]
  metrics?: string
}

export const experience: ExperienceItem[] = [
  {
    role: 'Senior Software Engineer (Full Stack) — Lead',
    company: 'T-Mobile',
    via: 'Concentrix Catalyst',
    period: 'Jan 2024 – Present',
    industry: 'Telecom',
    industryColor: '#e91e8c',
    metrics: '1M+ daily users · 40% latency reduction',
    highlights: [
      'Led end-to-end authentication workflows (login, OTP, onboarding) supporting 1M+ daily users across web and partner platforms.',
      'Reduced end-to-end API latency by ~40% via BFF request consolidation and elimination of redundant IAM calls.',
      'Implemented Redis TTL-based caching for OTP/session state, dramatically improving response times under high traffic.',
      'Built secure auth flows using OAuth 2.0, JWT, MFA, and AWS Cognito across a micro-frontend architecture.',
      'Improved observability using Splunk and OpenTelemetry; influenced architecture across API Gateway, Lambda, DynamoDB, and Kubernetes (EKS/AKS).',
    ],
  },
  {
    role: 'Lead Software Engineer',
    company: 'Sempra Energy',
    via: 'Concentrix Catalyst',
    period: 'Feb 2023 – Dec 2023',
    industry: 'Energy',
    industryColor: '#f59e0b',
    highlights: [
      'Led development of customer engagement workflows using React, Node.js, and Apigee.',
      'Converted manual operational processes into automated API-driven flows, reducing manual effort significantly.',
      'Built React components with RabbitMQ-based event-driven architecture for scalable, high-throughput processing.',
      'Strengthened CI/CD pipelines with Buildkite and ArgoCD, improving release reliability.',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Kaiser Permanente',
    via: 'Concentrix Catalyst',
    period: 'Sep 2019 – Feb 2023',
    industry: 'Healthcare',
    industryColor: '#10b981',
    highlights: [
      'Built React-based patient-facing UI with strong WCAG/ADA accessibility compliance.',
      'Developed Node.js and Java (Spring Boot) backend services for scheduling, payments, and check-in — reducing in-clinic wait times.',
      'Implemented comprehensive testing with Jest and Cypress, significantly reducing regression issues.',
      'Mentored junior engineers on React architecture and collaborated cross-functionally with product and design teams.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'Bank of the West',
    period: 'Jan 2018 – Aug 2019',
    industry: 'Finance',
    industryColor: '#3b82f6',
    metrics: '60% API performance improvement',
    highlights: [
      'Developed Node.js REST APIs and PL/SQL services for international wire transfers and real-time financial transactions.',
      'Optimized API performance by ~60% using node-cache to reduce repeated calls to Oracle DB and FlexCube.',
      'Designed REST/SOAP integrations for transaction processing and exchange rate workflows.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'Visa Inc.',
    period: 'Dec 2016 – Nov 2017',
    industry: 'FinTech',
    industryColor: '#1d4ed8',
    highlights: [
      'Built a full-stack security dashboard with React, aggregating vulnerability data from Fortify and Checkmarx.',
      'Enabled real-time visibility into security metrics, centralizing monitoring across engineering teams.',
      'Led a proof-of-concept migration from monolith to Python/Django service layer.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'Apple Inc.',
    period: 'Feb 2016 – Oct 2016',
    industry: 'Tech',
    industryColor: '#6b7280',
    metrics: '50% performance improvement',
    highlights: [
      'Re-engineered high-throughput backend systems using Python multiprocessing and multithreading, improving performance by up to 50%.',
      'Optimized data processing pipelines to handle peak traffic loads reliably at Apple scale.',
    ],
  },
  {
    role: 'Staff Consultant',
    company: 'Citi Private Group',
    via: 'Oracle',
    period: 'Oct 2009 – Aug 2015',
    industry: 'Banking',
    industryColor: '#0ea5e9',
    highlights: [
      'Developed and maintained enterprise advisory and reporting systems using Java, Spring, and JavaScript.',
      'Automated investment workflows and reporting processes for private banking operations.',
      'Built scalable backend services and UI components for financial analytics and portfolio management.',
    ],
  },
]

export type SkillCategory = {
  label: string
  icon: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Frontend',
    icon: '🎨',
    skills: ['React', 'Angular 16+', 'TypeScript', 'Next.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3 / SCSS', 'Vite'],
  },
  {
    label: 'Backend',
    icon: '⚙️',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Java Spring Boot', 'Microservices', 'BFF Pattern'],
  },
  {
    label: 'Cloud & Infra',
    icon: '☁️',
    skills: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'Docker', 'Kubernetes (EKS/AKS)', 'Azure'],
  },
  {
    label: 'Auth & Security',
    icon: '🔐',
    skills: ['OAuth 2.0', 'JWT', 'MFA', 'AWS Cognito', 'RBAC', 'IAM'],
  },
  {
    label: 'Databases',
    icon: '🗄️',
    skills: ['PostgreSQL', 'DynamoDB', 'MongoDB', 'Redis', 'Oracle DB', 'PL/SQL'],
  },
  {
    label: 'DevOps',
    icon: '🚀',
    skills: ['Buildkite', 'ArgoCD', 'Git', 'CI/CD Pipelines', 'Splunk', 'OpenTelemetry', 'Prometheus', 'Grafana'],
  },
]

export const education = [
  {
    degree: 'MBA — Management Information Systems',
    school: 'Lincoln University',
    location: 'Oakland, CA',
    year: '2017',
  },
  {
    degree: 'MBA — Financial Management',
    school: 'Anna University',
    location: 'Chennai, India',
    year: '2013',
  },
  {
    degree: 'B.Tech — Information Technology',
    school: 'Anna University',
    location: 'Chennai, India',
    year: '2009',
  },
]

export const certifications = [
  { name: 'ServiceNow Administration', year: '2026' },
  { name: 'ServiceNow Micro-Certification', year: '2026' },
]

export const domains = [
  { name: 'Telecom', icon: '📡' },
  { name: 'Healthcare', icon: '🏥' },
  { name: 'Finance', icon: '🏦' },
  { name: 'Energy', icon: '⚡' },
  { name: 'Tech', icon: '💻' },
]

// ─────────────────────────────────────────────────
// Projects — add new projects here, they auto-appear
// in the Projects section with filtering + demo modal
// ─────────────────────────────────────────────────

export type ProjectStatus = 'live' | 'in-progress' | 'coming-soon'
export type ProjectCategory = 'Auth & Security' | 'Performance' | 'Healthcare' | 'Architecture' | 'Finance'

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  category: ProjectCategory
  status: ProjectStatus
  featured: boolean
  accentColor: string
  icon: string
  tech: string[]
  metrics?: string[]
  demoUrl?: string        // MFE URL or external link
  githubUrl?: string
  embedType?: 'mfe' | 'iframe' | 'link'  // how to render the demo
  inspiration: string     // "Based on my work at X" — humanises the project
}

export const projects: Project[] = [
  {
    id: 'auth-visualizer',
    title: 'Auth Flow Visualizer',
    subtitle: 'Interactive OAuth 2.0 · OTP · Token Refresh diagrams',
    description:
      'An interactive micro-frontend that animates OAuth 2.0, MFA/OTP, and JWT token refresh flows step by step. Built from real-world auth system design experience. Includes a Tamper Mode to simulate expired tokens, invalid OTPs, and revoked sessions — showing exactly where and why flows fail.',
    category: 'Auth & Security',
    status: 'live',
    featured: true,
    accentColor: '#7c3aed',
    icon: '🔐',
    tech: ['React', 'Vite', 'Module Federation', 'Framer Motion', 'React Flow', 'Zustand', 'Node.js', 'Redis'],
    metrics: ['OAuth 2.0', 'JWT', 'MFA/OTP', 'Token Refresh', 'Redis TTL'],
    demoUrl: 'https://main.d3rh5s33trj737.amplifyapp.com/',
    githubUrl: 'https://github.com/Sangeeth-Mohan/auth-flow-visualizer',
    embedType: 'mfe',
    inspiration: 'Based on building auth systems for 1M+ daily users at T-Mobile',
  },
  {
    id: 'api-latency-dashboard',
    title: 'API Latency Dashboard',
    subtitle: 'Real-time BFF vs direct API latency comparison',
    description:
      'A live dashboard visualising the performance impact of Backend-for-Frontend (BFF) request consolidation vs. direct API calls. Shows real-time latency charts, cache hit rates, and request queue depth with Redis integration.',
    category: 'Performance',
    status: 'coming-soon',
    featured: false,
    accentColor: '#06b6d4',
    icon: '⚡',
    tech: ['React', 'Node.js', 'Redis', 'Recharts', 'WebSocket', 'Express'],
    metrics: ['40% latency reduction', 'BFF pattern', 'Redis caching'],
    inspiration: 'Based on reducing API latency by 40% at T-Mobile',
  },
  {
    id: 'healthcare-scheduler',
    title: 'Accessible Appointment Scheduler',
    subtitle: 'WCAG 2.1 AA compliant patient scheduling',
    description:
      'A fully accessible patient appointment scheduling app built to WCAG 2.1 AA standards. Keyboard navigable, screen-reader optimised, with full ARIA labelling. Covers booking, rescheduling, cancellations, and reminders.',
    category: 'Healthcare',
    status: 'coming-soon',
    featured: false,
    accentColor: '#10b981',
    icon: '🏥',
    tech: ['React', 'Node.js', 'PostgreSQL', 'ARIA', 'Jest', 'Cypress'],
    metrics: ['WCAG 2.1 AA', 'Keyboard nav', 'Screen reader'],
    inspiration: 'Based on patient-facing systems built at Kaiser Permanente',
  },
  {
    id: 'mfe-shell-demo',
    title: 'Micro-Frontend Shell Demo',
    subtitle: 'Module Federation — independent deploys, one UX',
    description:
      'A shell application that dynamically loads independent micro-frontends at runtime using Webpack Module Federation. Each MFE has its own repo, CI/CD pipeline, and deploy — but composes seamlessly into a unified experience.',
    category: 'Architecture',
    status: 'coming-soon',
    featured: false,
    accentColor: '#f59e0b',
    icon: '🏗️',
    tech: ['React', 'Module Federation', 'Webpack', 'Node.js', 'AWS Amplify'],
    metrics: ['Independent deploys', 'Runtime composition', 'Shared design system'],
    inspiration: 'Based on micro-frontend architecture delivered at T-Mobile',
  },
]

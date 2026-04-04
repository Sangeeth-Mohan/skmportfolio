import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sangeeth Kumar Mohan — Senior Full Stack Engineer',
  description:
    'Senior Software Engineer with 14+ years of experience building scalable web applications across telecom, healthcare, and finance. React, Node.js, TypeScript, AWS.',
  keywords: [
    'Sangeeth Kumar Mohan',
    'Full Stack Engineer',
    'React Developer',
    'Node.js',
    'TypeScript',
    'AWS',
    'Senior Software Engineer',
  ],
  authors: [{ name: 'Sangeeth Kumar Mohan' }],
  openGraph: {
    title: 'Sangeeth Kumar Mohan — Senior Full Stack Engineer',
    description: '14+ years building systems that scale to millions of users.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

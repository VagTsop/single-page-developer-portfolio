import { useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutDashboard, Wrench, BarChart3, Smartphone, Puzzle, Gauge, Repeat } from 'lucide-react'
import { scaleIn, staggerContainer, viewportOnce } from '../lib/motion'
import SectionHeading from './SectionHeading'

const SERVICES = [
  {
    icon: LayoutDashboard,
    title: 'SaaS Dashboards',
    tagline: 'Analytics & admin panels',
    body: 'Analytics dashboards and admin panels built with Angular, React, and TypeScript. Real-time data, role-based access, and scalable architecture.',
    tech: ['Angular', 'React', 'TypeScript', 'RBAC'],
    accent: 'brand' as const,
  },
  {
    icon: Wrench,
    title: 'Business Tools',
    tagline: 'Replace the spreadsheets',
    body: 'Internal tools, cost-management systems, and workflow apps that replace spreadsheets and manual processes.',
    tech: ['Electron', 'Node.js', 'SQLite'],
    accent: 'cyan' as const,
  },
  {
    icon: BarChart3,
    title: 'Data Visualization',
    tagline: 'Data you can act on',
    body: 'Charts, graphs, and interactive reports that turn complex data into actionable insights. Real-time updates via WebSocket and SSE.',
    tech: ['Charts', 'WebSocket', 'SSE'],
    accent: 'brand' as const,
  },
  {
    icon: Smartphone,
    title: 'Web & Mobile Apps',
    tagline: 'One codebase, every screen',
    body: 'Cross-platform products with React, React Native, and Electron — from desktop apps to installable PWAs and mobile experiences.',
    tech: ['React Native', 'Expo', 'PWA'],
    accent: 'cyan' as const,
  },
  {
    icon: Puzzle,
    title: 'Developer Tooling',
    tagline: 'Automate the workflow',
    body: 'Custom VS Code extensions that automate dev workflows — context gathering with ts-morph, off-thread analysis, and generated, ready-to-use LLM prompts.',
    tech: ['VS Code API', 'ts-morph', 'Node.js'],
    accent: 'brand' as const,
  },
  {
    icon: Gauge,
    title: 'Performance',
    tagline: 'Measurably faster apps',
    body: 'Tuning Angular apps for speed — bundle and lazy-loading strategy, change-detection optimization, and Core Web Vitals improvements.',
    tech: ['Angular', 'Lighthouse', 'Web Vitals'],
    accent: 'cyan' as const,
  },
]

/** 3D flip cards: icon + title up front, details on the back.
 *  Flips on hover (desktop) and on tap (touch). */
export default function Services() {
  const [flipped, setFlipped] = useState<number | null>(null)

  return (
    <section id="services" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading eyebrow="Services" title="What I" highlight="build" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((s, i) => {
          const isFlipped = flipped === i
          const accentText = s.accent === 'brand' ? 'text-brand-bright' : 'text-cyan'
          const accentBg = s.accent === 'brand' ? 'bg-brand/15 ring-brand/25' : 'bg-cyan/10 ring-cyan/25'
          const accentGlow = s.accent === 'brand' ? 'bg-brand/25' : 'bg-cyan/20'
          return (
            <motion.div
              key={s.title}
              variants={scaleIn}
              className="group h-72 cursor-pointer [perspective:1200px]"
              onClick={() => setFlipped(isFlipped ? null : i)}
              onMouseLeave={() => setFlipped((f) => (f === i ? null : f))}
            >
              <div
                className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* front */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-card/40 p-7 [backface-visibility:hidden]">
                  <div
                    className={`glow-blob -right-10 -top-10 h-36 w-36 ${accentGlow} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
                    aria-hidden
                  />
                  <span className="absolute right-6 top-5 font-mono text-sm text-fg-dim/40">0{i + 1}</span>

                  <div className="relative z-10 flex h-full flex-col">
                    <div
                      className={`mb-5 grid h-14 w-14 place-items-center rounded-xl ring-1 ${accentBg} ${accentText} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
                    >
                      <s.icon size={27} strokeWidth={1.75} />
                    </div>
                    <h3 className="text-xl font-semibold text-fg">{s.title}</h3>
                    <p className={`mt-1 text-sm ${accentText}`}>{s.tagline}</p>

                    <div className="mt-auto flex items-center gap-2 text-xs text-fg-dim">
                      <Repeat size={13} className="transition-transform duration-500 group-hover:rotate-180" />
                      Flip for details
                    </div>
                  </div>
                </div>

                {/* back */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl border border-brand/30 bg-bg-soft p-7 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className={`glow-blob -left-12 -bottom-12 h-40 w-40 ${accentGlow} opacity-70`} aria-hidden />
                  <div className="relative z-10 flex h-full flex-col">
                    <h3 className={`mb-3 text-lg font-semibold ${accentText}`}>{s.title}</h3>
                    <p className="text-sm leading-relaxed text-fg-muted">{s.body}</p>
                    <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border-soft pt-3">
                      {s.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border-soft bg-bg px-2.5 py-1 font-mono text-[11px] text-fg-dim"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

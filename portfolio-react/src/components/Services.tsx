import { motion } from 'framer-motion'
import { LayoutDashboard, Wrench, BarChart3, Smartphone, Puzzle, Gauge, ArrowUpRight } from 'lucide-react'
import { scaleIn, staggerContainer, viewportOnce } from '../lib/motion'
import SectionHeading from './SectionHeading'

const SERVICES = [
  {
    icon: LayoutDashboard,
    title: 'SaaS Dashboards',
    body: 'Analytics dashboards and admin panels built with Angular, React, and TypeScript. Real-time data, role-based access, and scalable architecture.',
    tech: ['Angular', 'React', 'TypeScript', 'RBAC'],
  },
  {
    icon: Wrench,
    title: 'Business Tools',
    body: 'Internal tools, cost-management systems, and workflow apps that replace spreadsheets and manual processes.',
    tech: ['Electron', 'Node.js', 'SQLite'],
  },
  {
    icon: BarChart3,
    title: 'Data Visualization',
    body: 'Charts, graphs, and interactive reports that turn complex data into actionable insights. Real-time updates via WebSocket and SSE.',
    tech: ['Charts', 'WebSocket', 'SSE'],
  },
  {
    icon: Smartphone,
    title: 'Web & Mobile Apps',
    body: 'Cross-platform products with React, React Native, and Electron — from desktop apps to installable PWAs and mobile experiences.',
    tech: ['React Native', 'Expo', 'PWA'],
  },
  {
    icon: Puzzle,
    title: 'Developer Tooling',
    body: 'Custom VS Code extensions that automate dev workflows — context gathering with ts-morph, off-thread analysis, and generated, ready-to-use LLM prompts.',
    tech: ['VS Code API', 'ts-morph', 'Node.js', 'Workers'],
  },
  {
    icon: Gauge,
    title: 'Performance Optimization',
    body: 'Tuning Angular apps for speed — bundle and lazy-loading strategy, change-detection optimization, and Core Web Vitals improvements that deliver measurable results.',
    tech: ['Angular', 'Lighthouse', 'Web Vitals', 'Profiling'],
  },
]

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading eyebrow="Services" title="What I" highlight="build" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-4 sm:grid-cols-2"
      >
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.title}
            variants={scaleIn}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-7 transition-colors hover:border-brand/40"
          >
            <div
              className="glow-blob -right-12 -top-12 h-40 w-40 bg-brand/25 opacity-0 transition-opacity duration-500 group-hover:opacity-70"
              aria-hidden
            />
            {/* index */}
            <span className="absolute right-6 top-6 font-mono text-sm text-fg-dim/30 transition-colors group-hover:text-brand-bright/60">
              0{i + 1}
            </span>

            <div className="relative z-10">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand-bright ring-1 ring-brand/25 transition-transform duration-300 group-hover:scale-105">
                <s.icon size={24} strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 flex items-center gap-2 text-xl">
                {s.title}
                <ArrowUpRight
                  size={18}
                  className="text-fg-dim opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </h3>
              <p className="text-fg-muted">{s.body}</p>

              {/* tech chips */}
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border-soft pt-4">
                {s.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border-soft bg-bg-soft px-2.5 py-1 font-mono text-[11px] text-fg-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

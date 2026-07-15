import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { fadeUp, viewportOnce } from '../lib/motion'

interface Pillar {
  image: string
  title: string
  body: string
  tech: string[]
}

const PILLARS: Pillar[] = [
  {
    image: '/assets/images/spotlight-dashboards.jpg',
    title: 'SaaS Dashboards & Data',
    body: 'Analytics dashboards, admin panels, and interactive reports that turn complex data into decisions — real-time updates, role-based access, scalable architecture.',
    tech: ['Angular', 'React', 'TypeScript', 'Charts'],
  },
  {
    image: '/assets/images/spotlight-apps.jpg',
    title: 'Web & Mobile Apps',
    body: 'Cross-platform products from desktop tools to installable PWAs and native-feeling mobile experiences — one codebase, every screen.',
    tech: ['React Native', 'Expo', 'Electron', 'PWA'],
  },
  {
    image: '/assets/images/spotlight-ai.jpg',
    title: 'AI & Developer Tooling',
    body: 'AI-powered features and custom developer tools that automate workflows — VS Code extensions, code analysis, and generated, ready-to-use LLM prompts.',
    tech: ['VS Code API', 'ts-morph', 'Node.js', 'LLM'],
  },
]

/**
 * Satori-style expansion grid: three full-height service panels sit side by
 * side; hovering one grows it (flex transition) while the others slim down
 * and dim. On small screens the panels stack vertically at full width.
 */
export default function WorkSpotlight() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="spotlight" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionHeading eyebrow="In practice" title="Services in" highlight="action" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="flex flex-col gap-4 md:h-[540px] md:flex-row"
        onMouseLeave={() => setActive(null)}
      >
        {PILLARS.map((p, i) => {
          const isActive = active === i
          const isDimmed = active !== null && !isActive
          return (
            <article
              key={p.title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group relative min-h-[300px] overflow-hidden rounded-2xl border border-border-soft transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] md:min-h-0"
              style={{ flexGrow: isActive ? 2.4 : 1, flexBasis: 0 }}
            >
              {/* background */}
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                  isDimmed ? 'scale-100 brightness-[0.5]' : isActive ? 'scale-105 brightness-100' : 'scale-100 brightness-[0.75]'
                }`}
              />
              {/* stronger scrim at the bottom half so copy stays readable over bright frames */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />

              {/* content */}
              <div className="relative flex h-full flex-col justify-end p-6">
                <span className="mb-2 font-mono text-xs tracking-[0.25em] text-brand-bright">
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <h3 className="font-display text-xl font-bold text-fg drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-2xl">
                  {p.title}
                </h3>
                <p
                  className={`mt-2 max-w-md text-sm leading-relaxed text-fg drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)] transition-all duration-500 md:overflow-hidden ${
                    isActive ? 'md:max-h-40 md:opacity-100' : 'md:max-h-0 md:opacity-0'
                  }`}
                >
                  {p.body}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-bg/70 px-2.5 py-1 font-mono text-[11px] text-fg backdrop-blur-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className={`mt-4 inline-flex w-fit items-center gap-1.5 rounded-lg bg-brand/90 px-3.5 py-2 text-xs font-semibold text-white transition-all duration-500 hover:bg-brand md:overflow-hidden ${
                    isActive ? 'md:max-h-12 md:opacity-100' : 'md:max-h-0 md:py-0 md:opacity-0'
                  }`}
                >
                  Discuss a project <ArrowUpRight size={13} />
                </a>
              </div>
            </article>
          )
        })}
      </motion.div>
    </section>
  )
}

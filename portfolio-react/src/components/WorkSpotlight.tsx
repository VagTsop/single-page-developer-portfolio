import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './icons'
import SectionHeading from './SectionHeading'
import { projects } from '../lib/projects'
import { fadeUp, viewportOnce } from '../lib/motion'

/**
 * Satori-style expansion grid: three full-height panels sit side by side;
 * hovering one grows it (flex transition) while the others slim down and dim.
 * On small screens the panels stack vertically at full width instead.
 */
export default function WorkSpotlight() {
  const spotlight = projects.filter((p) => p.featured).slice(0, 3)
  const [active, setActive] = useState<number | null>(null)

  if (spotlight.length < 3) return null

  return (
    <section id="spotlight" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionHeading eyebrow="Spotlight" title="Flagship" highlight="work" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="flex flex-col gap-4 md:h-[540px] md:flex-row"
        onMouseLeave={() => setActive(null)}
      >
        {spotlight.map((p, i) => {
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
                  isDimmed ? 'scale-100 brightness-[0.35]' : isActive ? 'scale-105 brightness-75' : 'scale-100 brightness-[0.55]'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />

              {/* content */}
              <div className="relative flex h-full flex-col justify-end p-6">
                <span className="mb-2 font-mono text-xs tracking-[0.25em] text-brand-bright">
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <h3 className="font-display text-xl font-bold text-fg sm:text-2xl">
                  {p.title.split(' - ')[0]}
                </h3>
                <p
                  className={`mt-2 max-w-md text-sm leading-relaxed text-fg-muted transition-all duration-500 md:overflow-hidden ${
                    isActive ? 'md:max-h-40 md:opacity-100' : 'md:max-h-0 md:opacity-0'
                  }`}
                >
                  {p.description}
                </p>
                <div
                  className={`mt-4 flex items-center gap-3 transition-all duration-500 md:overflow-hidden ${
                    isActive ? 'md:max-h-12 md:opacity-100' : 'md:max-h-12 md:opacity-100 lg:max-h-12'
                  }`}
                >
                  {p.liveUrl && p.liveUrl !== '#' && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand/90 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand"
                    >
                      <ExternalLink size={13} /> Live
                    </a>
                  )}
                  {p.codeUrl && p.codeUrl !== '#' && (
                    <a
                      href={p.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-bg/60 px-3 py-1.5 text-xs font-semibold text-fg-muted backdrop-blur transition-colors hover:text-fg"
                    >
                      <GithubIcon size={13} /> Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </motion.div>
    </section>
  )
}

import { useMemo, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import { GithubIcon } from './icons'
import { projects, type Project } from '../lib/projects'
import SectionHeading from './SectionHeading'

const PAGE_SIZE = 6
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
type Filter = 'featured' | 'all'

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 15, mass: 0.4 })
  const sry = useSpring(ry, { stiffness: 150, damping: 15, mass: 0.4 })

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    const cx = (e.clientX - r.left) / r.width - 0.5
    const cy = (e.clientY - r.top) / r.height - 0.5
    ry.set(cx * 9)
    rx.set(-cy * 9)
  }
  function reset() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.article
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 24, scale: 0.97, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE, delay: (index % PAGE_SIZE) * 0.06 }}
      whileHover={{ y: -6 }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/40 transition-colors hover:border-brand/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-soft">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent opacity-80" />
        {p.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur">
            <Star size={11} className="fill-white" /> Featured
          </span>
        )}
        {/* hover action overlay */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center gap-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white shadow-lg shadow-brand/30 transition-transform hover:scale-[1.02] active:scale-95"
          >
            Live <ArrowUpRight size={15} />
          </a>
          <a
            href={p.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.title} source code`}
            className="grid h-9 w-10 place-items-center rounded-lg bg-bg-soft/90 text-fg ring-1 ring-border backdrop-blur transition-colors hover:text-brand-bright"
          >
            <GithubIcon size={17} />
          </a>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold leading-snug">{p.title}</h3>
        {p.description && (
          <p className="mt-2 line-clamp-3 text-sm text-fg-muted">{p.description}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
          {p.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-border-soft bg-bg-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-fg-dim"
            >
              {t}
            </span>
          ))}
          {p.tech.length > 4 && (
            <span className="rounded-md px-2 py-0.5 font-mono text-[10px] text-fg-dim">
              +{p.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('featured')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const list = useMemo(
    () => (filter === 'featured' ? projects.filter((p) => p.featured) : projects),
    [filter],
  )
  const shown = list.slice(0, visible)

  const changeFilter = (f: Filter) => {
    setFilter(f)
    setVisible(PAGE_SIZE)
  }

  return (
    <section id="projects" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="Selected work" title="Things I've" highlight="shipped" className="mb-0" />

        <div className="inline-flex rounded-xl border border-border bg-card/40 p-1">
          {(['featured', 'all'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => changeFilter(f)}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                filter === f ? 'text-white' : 'text-fg-muted hover:text-fg'
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-lg bg-brand"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {f} {f === 'all' && <span className="opacity-70">({projects.length})</span>}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} />
        ))}
      </div>

      {visible < list.length && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3 font-medium text-fg transition-colors hover:border-brand/40 hover:bg-card"
          >
            Load more
            <span className="font-mono text-xs text-fg-dim">
              {shown.length}/{list.length}
            </span>
          </button>
        </div>
      )}
    </section>
  )
}

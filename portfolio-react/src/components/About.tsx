import { motion } from 'framer-motion'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '../lib/motion'
import { useCountUp } from '../hooks/useCountUp'
import SectionHeading from './SectionHeading'
import EditorCard from './EditorCard'

const STATS = [
  { target: 28, suffix: '+', label: 'Projects completed' },
  { target: 6, suffix: '+', label: 'Years experience' },
  { target: 5, suffix: '', label: 'Live products' },
]

function Stat({ target, suffix, label }: (typeof STATS)[number]) {
  const { ref, value } = useCountUp(target)
  return (
    <motion.div variants={scaleIn} className="glass rounded-2xl p-5 text-center">
      <div className="font-display text-3xl font-bold text-fg sm:text-4xl">
        <span ref={ref} className="tabular-nums">
          {value}
        </span>
        <span className="text-brand-bright">{suffix}</span>
      </div>
      <div className="mt-1.5 text-xs text-fg-muted sm:text-sm">{label}</div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <SectionHeading eyebrow="About me" title="Turning complex data into" highlight="clean interfaces" />

      <div className="grid items-center gap-x-12 gap-y-16 lg:grid-cols-2">
        {/* left — copy + stats */}
        <div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-5 text-lg leading-relaxed text-fg-muted"
          >
            <motion.p variants={fadeUp}>
              I&apos;m a front-end developer with{' '}
              <strong className="font-semibold text-fg">6+ years of experience</strong> building
              dashboards, admin panels, and data-driven applications. I specialize in{' '}
              <strong className="font-semibold text-fg">Angular</strong>,{' '}
              <strong className="font-semibold text-fg">React</strong>, and the broader TypeScript
              ecosystem.
            </motion.p>
            <motion.p variants={fadeUp}>
              I turn complex business data into clean, performant interfaces — from inventory
              management to SaaS analytics. I focus on building tools that solve real problems and
              deliver measurable results.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-8 grid grid-cols-3 gap-3"
          >
            {STATS.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </motion.div>
        </div>

        {/* right — interactive editor card */}
        <EditorCard />
      </div>
    </section>
  )
}

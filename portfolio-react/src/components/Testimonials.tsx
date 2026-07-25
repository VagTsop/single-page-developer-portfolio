import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import SectionHeading from './SectionHeading'

/**
 * ⚠️ NOT MOUNTED YET — placeholder quotes below MUST be replaced with real
 * client feedback before enabling this section in App.tsx. Ask e.g. the
 * ADD Recycling owner or TALOS users for one or two sentences.
 */
const TESTIMONIALS = [
  {
    quote:
      '[REPLACE ME — real client quote, 1-3 sentences about working with you and the outcome they got.]',
    name: '[Client name]',
    role: '[Role, Company]',
  },
  {
    quote:
      '[REPLACE ME — a second quote, ideally from a different kind of project (product vs website).]',
    name: '[Client name]',
    role: '[Role, Company]',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading eyebrow="Testimonials" title="What clients" highlight="say" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-4 md:grid-cols-2"
      >
        {TESTIMONIALS.map((t) => (
          <motion.figure
            key={t.name}
            variants={fadeUp}
            className="glass relative rounded-2xl p-7"
          >
            <Quote size={28} className="mb-4 text-brand-bright/50" aria-hidden />
            <blockquote className="text-lg leading-relaxed text-fg">{t.quote}</blockquote>
            <figcaption className="mt-5 border-t border-border-soft pt-4">
              <div className="font-semibold text-fg">{t.name}</div>
              <div className="text-sm text-fg-dim">{t.role}</div>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  )
}

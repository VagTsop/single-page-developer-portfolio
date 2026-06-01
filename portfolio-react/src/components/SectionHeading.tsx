import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

interface Props {
  eyebrow: string
  title: string
  highlight?: string
  className?: string
}

/** Consistent section header: mono eyebrow + display title with gradient highlight. */
export default function SectionHeading({ eyebrow, title, highlight, className = '' }: Props) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`mb-14 max-w-2xl ${className}`}
    >
      <motion.span
        variants={fadeUp}
        className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-bright"
      >
        <span className="h-px w-6 bg-brand-bright/60" />
        {eyebrow}
      </motion.span>
      <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl">
        {title}{' '}
        {highlight && <span className="text-gradient">{highlight}</span>}
      </motion.h2>
    </motion.div>
  )
}

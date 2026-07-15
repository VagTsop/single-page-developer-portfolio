import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { fadeUp, staggerContainer, wordReveal } from '../lib/motion'
import MagneticButton from './MagneticButton'
import HeroAvatar from './HeroAvatar'

const LINE_1 = ['Nice', 'to', 'meet', 'you!']
const NAME = ['Vagelis', 'Tsopanos.']

export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20"
    >
      {/* full-bleed ambient video backdrop, Satori-style */}
      <div className="absolute inset-0" aria-hidden>
        <video
          src="/assets/videos/ambient-particles.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/45 to-bg" />
      </div>

      {/* grid + connected-nodes constellation + autonomously drifting glow backdrop */}
      <div className="grid-backdrop absolute inset-0" aria-hidden />
      <motion.div
        className="glow-blob -top-24 left-1/4 h-[28rem] w-[28rem] bg-brand/40"
        animate={reduce ? undefined : { x: [0, 70, -30, 0], y: [0, 50, 25, 0], scale: [1, 1.18, 0.95, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="glow-blob top-10 right-1/4 h-[24rem] w-[24rem] bg-cyan/30"
        animate={reduce ? undefined : { x: [0, -60, 20, 0], y: [0, 40, -20, 0], scale: [1.05, 0.9, 1.2, 1.05] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        {/* avatar with rotating halo + orbiting tech logos */}
        <motion.div variants={fadeUp} className="mb-4 flex justify-center">
          <HeroAvatar />
        </motion.div>

        <motion.span
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs text-fg-muted backdrop-blur"
        >
          <span className="h-2 w-2 rounded-full bg-live shadow-[0_0_8px] shadow-live" />
          Available for freelance &amp; full-time
        </motion.span>

        {/* headline — per-word reveal */}
        <h1 className="text-5xl leading-[1.05] sm:text-7xl">
          <span className="flex flex-wrap justify-center gap-x-[0.25em]">
            {LINE_1.map((w, i) => (
              <motion.span key={i} variants={wordReveal} className="inline-block">
                {w}
              </motion.span>
            ))}
          </span>
          <span className="mt-2 flex flex-wrap items-baseline justify-center gap-x-[0.25em]">
            <motion.span variants={wordReveal} className="inline-block">
              I&apos;m
            </motion.span>
            {NAME.map((w, i) => (
              <motion.span key={i} variants={wordReveal} className="text-shimmer inline-block">
                {w}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p variants={fadeUp} className="mx-auto mt-7 max-w-xl text-lg text-fg-muted">
          Front-end developer building{' '}
          <span className="text-fg">SaaS dashboards</span>, business tools, and data-driven
          interfaces that help companies make better decisions.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-medium text-white shadow-xl shadow-brand/30"
          >
            Get in touch
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton
            href="#projects"
            strength={0.25}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3.5 font-medium text-fg backdrop-blur transition-colors hover:border-brand/40 hover:bg-card"
          >
            View my work
          </MagneticButton>
          <MagneticButton
            href="/assets/Vagelis_Tsopanos_CV.pdf"
            download
            strength={0.25}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3.5 font-medium text-fg backdrop-blur transition-colors hover:border-brand/40 hover:bg-card"
          >
            <Download size={18} />
            Download CV
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}

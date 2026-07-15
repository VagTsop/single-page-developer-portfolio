import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { staggeredBlur } from '../lib/motion'
import MagneticButton from './MagneticButton'
import HeroAvatar from './HeroAvatar'

const LINE_1 = ['Nice', 'to', 'meet', 'you!']
const NAME = ['Vagelis', 'Tsopanos.']
const INTRO: { w: string; strong?: boolean }[] = [
  { w: 'Front-end' }, { w: 'developer' }, { w: 'building' },
  { w: 'SaaS', strong: true }, { w: 'dashboards,', strong: true },
  { w: 'business' }, { w: 'tools,' }, { w: 'and' }, { w: 'data-driven' },
  { w: 'interfaces' }, { w: 'that' }, { w: 'help' }, { w: 'companies' },
  { w: 'make' }, { w: 'better' }, { w: 'decisions.' },
]

/* choreography (seconds after the preloader hands off) */
const T_TITLE = 0.25   // headline words: slow, deliberate
const STEP_TITLE = 0.14
const T_INTRO = T_TITLE + (LINE_1.length + NAME.length + 1) * STEP_TITLE + 0.15
const STEP_INTRO = 0.045
const T_ACTIONS = T_INTRO + INTRO.length * STEP_INTRO + 0.2

export default function Hero() {
  const reduce = useReducedMotion()

  // the entrance choreography starts only once the preloader has faded,
  // otherwise the whole sequence would play hidden behind it
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    if ((window as Window & { __preloaderDone?: boolean }).__preloaderDone) {
      setEntered(true)
      return
    }
    const onDone = () => setEntered(true)
    window.addEventListener('preloader:done', onDone, { once: true })
    return () => window.removeEventListener('preloader:done', onDone)
  }, [])
  // phones get a 3x lighter encode of the same loop (1.3MB vs 4.2MB)
  const videoSrc = useMemo(
    () =>
      typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
        ? '/assets/videos/ambient-particles-mobile.mp4'
        : '/assets/videos/ambient-particles.mp4',
    [],
  )

  // decorative: don't let the video compete with first paint / LCP —
  // mount it only after the window has fully loaded
  const [showVideo, setShowVideo] = useState(false)
  useEffect(() => {
    if (document.readyState === 'complete') setShowVideo(true)
    else {
      const onLoad = () => setShowVideo(true)
      window.addEventListener('load', onLoad, { once: true })
      return () => window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20"
    >
      {/* full-bleed ambient video backdrop, Satori-style */}
      <div className="absolute inset-0" aria-hidden>
        {showVideo && (
          <motion.video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="h-full w-full object-cover"
          />
        )}
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
        initial="hidden"
        animate={entered ? 'show' : 'hidden'}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        {/* avatar with rotating halo + orbiting tech logos */}
        <motion.div variants={staggeredBlur} custom={0} className="mb-4 flex justify-center">
          <HeroAvatar />
        </motion.div>

        <motion.span
          variants={staggeredBlur}
          custom={0.1}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs text-fg-muted backdrop-blur"
        >
          <span className="h-2 w-2 rounded-full bg-live shadow-[0_0_8px] shadow-live" />
          Available for freelance &amp; full-time
        </motion.span>

        {/* headline — TACET-style word-by-word blur reveal */}
        <h1 className="text-5xl leading-[1.05] sm:text-7xl">
          <span className="flex flex-wrap justify-center gap-x-[0.25em]">
            {LINE_1.map((w, i) => (
              <motion.span
                key={i}
                variants={staggeredBlur}
                custom={T_TITLE + i * STEP_TITLE}
                className="inline-block"
              >
                {w}
              </motion.span>
            ))}
          </span>
          <span className="mt-2 flex flex-wrap items-baseline justify-center gap-x-[0.25em]">
            <motion.span
              variants={staggeredBlur}
              custom={T_TITLE + LINE_1.length * STEP_TITLE}
              className="inline-block"
            >
              I&apos;m
            </motion.span>
            {NAME.map((w, i) => (
              <motion.span
                key={i}
                variants={staggeredBlur}
                custom={T_TITLE + (LINE_1.length + 1 + i) * STEP_TITLE}
                className="text-shimmer inline-block"
              >
                {w}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* intro copy — same treatment, faster cadence */}
        <p className="mx-auto mt-7 flex max-w-xl flex-wrap justify-center gap-x-[0.3em] text-lg text-fg-muted">
          {INTRO.map((word, i) => (
            <motion.span
              key={i}
              variants={staggeredBlur}
              custom={T_INTRO + i * STEP_INTRO}
              className={`inline-block ${word.strong ? 'text-fg' : ''}`}
            >
              {word.w}
            </motion.span>
          ))}
        </p>

        <motion.div
          variants={staggeredBlur}
          custom={T_ACTIONS}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
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

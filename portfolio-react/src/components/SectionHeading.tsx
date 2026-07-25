import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface Props {
  eyebrow: string
  title: string
  highlight?: string
  className?: string
}

/** Consistent section header: mono eyebrow + display title whose characters
 *  build up letter-by-letter (GSAP SplitText) as the heading scrolls in.
 *  The gradient highlight is NOT split (background-clip:text breaks when its
 *  glyphs are wrapped) — it lands as one piece at the end of the sequence. */
export default function SectionHeading({ eyebrow, title, highlight, className = '' }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const plainRef = useRef<HTMLSpanElement>(null)
  const highlightRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = headingRef.current
    const plain = plainRef.current
    if (!el || !plain) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.visibility = 'visible'
      return
    }

    let split: SplitText | undefined
    let trigger: ScrollTrigger | undefined
    let cancelled = false

    // wait for webfonts so the split measures the final glyphs
    document.fonts.ready.then(() => {
      if (cancelled) return
      split = new SplitText(plain, { type: 'chars,words', charsClass: 'inline-block' })
      gsap.set(el, { visibility: 'visible' })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      })
      tl.from(split.chars, {
        opacity: 0,
        yPercent: 60,
        filter: 'blur(6px)',
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.022,
      })
      if (highlightRef.current) {
        tl.from(
          highlightRef.current,
          { opacity: 0, y: 24, filter: 'blur(8px)', duration: 0.65, ease: 'power3.out' },
          '-=0.35',
        )
      }
      trigger = tl.scrollTrigger
    })

    return () => {
      cancelled = true
      trigger?.kill()
      split?.revert()
    }
  }, [title, highlight])

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
      {/* hidden until fonts are ready and the split runs, so unstyled text never flashes */}
      <h2 ref={headingRef} className="text-4xl [visibility:hidden] sm:text-5xl">
        <span ref={plainRef}>{title}</span>{' '}
        {highlight && (
          <span ref={highlightRef} className="text-gradient inline-block">
            {highlight}
          </span>
        )}
      </h2>
    </motion.div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

const MIN_SHOW_MS = 1400

/**
 * Fullscreen intro: the </> mark draws itself (SVG pathLength), then — via
 * GSAP Flip — flies from the center of the screen into its slot in the
 * navbar while the dark backdrop fades away. The hero choreography starts
 * the moment the logo lands.
 */
export default function Preloader() {
  const [gone, setGone] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    document.body.classList.add('preloading')
    const start = performance.now()
    let timer: number

    const complete = () => {
      document.body.classList.remove('preloading')
      ;(window as Window & { __preloaderDone?: boolean }).__preloaderDone = true
      window.dispatchEvent(new Event('preloader:done'))
      setGone(true)
    }

    const handoff = () => {
      if (startedRef.current) return
      startedRef.current = true

      const logo = logoRef.current
      const target = document.getElementById('nav-brand-logo')
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // fallback: plain fade (no target to fly to, or reduced motion)
      if (!logo || !target || reduce) {
        gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.5, onComplete: complete })
        return
      }

      gsap
        .timeline({ onComplete: complete })
        .to(textRef.current, { autoAlpha: 0, y: 8, duration: 0.25, ease: 'power2.in' })
        .to(bgRef.current, { autoAlpha: 0, duration: 0.65, ease: 'power2.inOut' }, 0.05)
        .add(
          Flip.fit(logo, target, {
            duration: 0.85,
            ease: 'power3.inOut',
            absolute: true,
          }) as gsap.core.Tween,
          0.1,
        )
        // land: the flying mark hands over to the framed navbar icon
        .to(logo, { autoAlpha: 0, duration: 0.18, ease: 'power1.out' }, '-=0.02')
    }

    const finish = () => {
      const elapsed = performance.now() - start
      timer = window.setTimeout(handoff, Math.max(0, MIN_SHOW_MS - elapsed))
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    // hard fallback: never trap the visitor on the loader
    const failsafe = window.setTimeout(handoff, 6000)

    return () => {
      window.removeEventListener('load', finish)
      clearTimeout(timer)
      clearTimeout(failsafe)
      document.body.classList.remove('preloading')
    }
  }, [])

  const stroke = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
  }

  if (gone) return null

  return (
    <div ref={overlayRef} className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-dvh" aria-hidden="true">
      <div ref={bgRef} className="absolute inset-0 bg-bg" />
      <div className="relative grid h-full place-items-center">
        <div className="flex flex-col items-center gap-5">
          <svg
            ref={logoRef}
            viewBox="0 0 48 32"
            className="h-16 w-24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M14 6 L4 16 L14 26"
              stroke="var(--color-brand-bright)"
              strokeWidth="2.5"
              {...stroke}
              transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.1 }}
            />
            <motion.path
              d="M27 4 L21 28"
              stroke="var(--color-cyan)"
              strokeWidth="2.5"
              {...stroke}
              transition={{ duration: 0.7, ease: 'easeInOut', delay: 0.55 }}
            />
            <motion.path
              d="M34 6 L44 16 L34 26"
              stroke="var(--color-brand-bright)"
              strokeWidth="2.5"
              {...stroke}
              transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.35 }}
            />
          </svg>
          <motion.span
            ref={textRef}
            className="pl-[0.3em] font-display text-sm font-bold tracking-[0.3em] text-fg-muted uppercase"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            VagTsop
          </motion.span>
        </div>
      </div>
    </div>
  )
}

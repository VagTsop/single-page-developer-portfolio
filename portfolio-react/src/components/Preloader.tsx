import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MIN_SHOW_MS = 1400

/**
 * Fullscreen intro: the </> mark draws itself (SVG pathLength), then the
 * overlay fades out once the window has loaded and the minimum display
 * time has passed.
 */
export default function Preloader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    let timer: number

    const finish = () => {
      const elapsed = performance.now() - start
      timer = window.setTimeout(() => setDone(true), Math.max(0, MIN_SHOW_MS - elapsed))
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    // hard fallback: never trap the visitor on the loader
    const failsafe = window.setTimeout(() => setDone(true), 6000)
    return () => {
      window.removeEventListener('load', finish)
      clearTimeout(timer)
      clearTimeout(failsafe)
    }
  }, [])

  const stroke = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
  }

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center bg-bg"
          exit={{ opacity: 0, transition: { duration: 0.55, ease: 'easeInOut' } }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-5">
            <svg viewBox="0 0 48 32" className="h-16 w-24" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
              className="font-display text-sm font-bold tracking-[0.3em] text-fg-muted uppercase"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              VagTsop
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

const LINES = [
  '> hire_protocol.sh --candidate="Vagelis Tsopanos"',
  '  [✓] 6+ years shipping production front-ends',
  '  [✓] Angular / React / TypeScript',
  '  [✓] dashboards that make data make sense',
  '  [✓] pixel-perfect, deadline-friendly',
  '  [✓] found the easter egg — you clearly pay attention',
  '',
  '> STATUS: available for freelance & full-time',
  '> next step: scroll to #contact  _',
]

/** Konami code (↑↑↓↓←→←→BA) opens a little hire-protocol terminal. */
export default function EasterEgg() {
  const [open, setOpen] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    let progress = 0
    const onKey = (e: KeyboardEvent) => {
      if (open && e.key === 'Escape') {
        setOpen(false)
        return
      }
      const expected = KONAMI[progress]
      if (e.key === expected || e.key.toLowerCase() === expected) {
        progress++
        if (progress === KONAMI.length) {
          progress = 0
          setVisibleLines(0)
          setOpen(true)
        }
      } else {
        progress = e.key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // type the lines out one by one while open
  useEffect(() => {
    if (!open) return
    if (visibleLines >= LINES.length) return
    const t = setTimeout(() => setVisibleLines((n) => n + 1), visibleLines === 0 ? 300 : 260)
    return () => clearTimeout(t)
  }, [open, visibleLines])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] grid place-items-center bg-bg/80 p-4 backdrop-blur-md"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-label="Easter egg terminal"
        >
          <motion.div
            initial={{ scale: 0.92, y: 18 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ type: 'spring', duration: 0.45, bounce: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-[#0a0f1c] shadow-2xl shadow-brand/20"
          >
            {/* title bar */}
            <div className="flex items-center gap-2 border-b border-border-soft bg-bg-soft/60 px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-xs text-fg-dim">vagtsop@portfolio — zsh</span>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto font-mono text-xs text-fg-dim transition-colors hover:text-fg"
                aria-label="Close terminal"
              >
                ESC
              </button>
            </div>
            {/* terminal body */}
            <div className="min-h-[16rem] p-5 font-mono text-[13px] leading-7">
              {LINES.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith('>')
                      ? 'text-cyan'
                      : line.includes('[✓]')
                        ? 'text-fg-muted'
                        : 'text-fg-dim'
                  }
                >
                  {line || ' '}
                </div>
              ))}
              {visibleLines < LINES.length && (
                <span className="inline-block h-4 w-2 animate-pulse bg-brand-bright align-middle" />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

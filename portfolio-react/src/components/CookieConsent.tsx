import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

declare global {
  interface Window {
    loadAnalytics?: () => void
  }
}

/** GDPR cookie consent — gates Google Analytics behind explicit opt-in. */
export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) setShow(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    window.loadAnalytics?.()
    setShow(false)
  }
  function decline() {
    localStorage.setItem('cookie-consent', 'declined')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
          className="glass fixed bottom-4 left-4 right-4 z-[70] mx-auto flex max-w-xl flex-col items-center gap-4 rounded-2xl p-4 sm:flex-row sm:gap-6"
        >
          <p className="text-sm text-fg-muted">
            This site uses cookies for anonymous analytics to understand traffic. You can opt out.
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={decline}
              className="rounded-lg border border-border bg-card/50 px-4 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand/25 transition-transform hover:scale-[1.03] active:scale-95"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

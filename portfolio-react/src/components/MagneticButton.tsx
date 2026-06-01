import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface Props {
  href: string
  download?: boolean
  className?: string
  children: React.ReactNode
  strength?: number
}

/**
 * Anchor that gently pulls toward the cursor on hover (magnetic).
 * Hover-driven feedback, not looping decoration. Disabled under reduced-motion.
 */
export default function MagneticButton({ href, download, className = '', children, strength = 0.35 }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const x = useSpring(mvX, { stiffness: 250, damping: 18, mass: 0.4 })
  const y = useSpring(mvY, { stiffness: 250, damping: 18, mass: 0.4 })

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mvX.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    mvY.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }
  function reset() {
    mvX.set(0)
    mvY.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

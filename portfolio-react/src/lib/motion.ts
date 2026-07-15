import type { Variants } from 'framer-motion'

export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Container that staggers its children on entrance. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

/** Fade + rise + blur-in ("materializing", Jakub). Spring with no bounce = polished. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.6, bounce: 0 },
  },
}

/** Subtle scale + blur-in for cards. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.97, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.55, bounce: 0 },
  },
}

/** Per-word reveal for the hero headline. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '0.6em', filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.7, bounce: 0 },
  },
}

/** TACET-style staged blur reveal: each element receives its own delay via
 *  the `custom` prop, so a whole sequence can be choreographed precisely. */
export const staggeredBlur: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE_EXPO, delay },
  }),
}

/** Shared viewport config for scroll-triggered reveals. */
export const viewportOnce = { once: true, margin: '-80px' } as const

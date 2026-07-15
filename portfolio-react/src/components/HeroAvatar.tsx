import { motion, useReducedMotion } from 'framer-motion'
import { TypeScriptLogo, ReactLogo, AngularLogo } from './TechLogos'

const ORBIT = [TypeScriptLogo, ReactLogo, AngularLogo]
const RADIUS = 116

/** Profile avatar with a rotating conic halo and tech logos orbiting around it. */
export default function HeroAvatar() {
  const reduce = useReducedMotion()
  const spin = (duration: number, dir = 1) =>
    reduce
      ? {}
      : { animate: { rotate: 360 * dir }, transition: { duration, repeat: Infinity, ease: 'linear' as const } }

  return (
    <div className="relative mx-auto h-72 w-72">
      {/* faint dashed orbit path */}
      <div className="absolute left-1/2 top-1/2 h-[232px] w-[232px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />

      {/* soft brand glow */}
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 blur-2xl" />

      {/* rotating conic halo (shows as a glowing ring around the photo) */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[9.75rem] w-[9.75rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, var(--color-brand) 80deg, var(--color-cyan) 170deg, transparent 280deg)',
        }}
        {...spin(7)}
      />

      {/* avatar */}
      <motion.div
        whileHover={reduce ? undefined : { scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative">
          <div className="grid h-36 w-36 place-items-center rounded-full border border-border bg-bg shadow-2xl shadow-brand/30 ring-4 ring-bg">
            <svg viewBox="0 0 64 64" className="h-20 w-20" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.2" aria-label="VagTsop logo">
              <path d="M23 21 L12 32 L23 43" stroke="var(--color-brand-bright)" />
              <path d="M36.5 18.5 L29.5 45.5" stroke="var(--color-cyan)" />
              <path d="M41 21 L52 32 L41 43" stroke="var(--color-brand-bright)" />
            </svg>
          </div>
          <span className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-bg ring-2 ring-bg">
            <span className="h-3.5 w-3.5 rounded-full bg-live shadow-[0_0_8px] shadow-live" />
          </span>
        </div>
      </motion.div>

      {/* orbiting tech logos */}
      <motion.div className="absolute inset-0" {...spin(26)}>
        {ORBIT.map((Logo, i) => {
          const angle = (i / ORBIT.length) * Math.PI * 2 - Math.PI / 2
          const x = Math.cos(angle) * RADIUS
          const y = Math.sin(angle) * RADIUS
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
            >
              {/* counter-rotate so the logo stays upright while orbiting */}
              <motion.div
                {...spin(26, -1)}
                className="glass grid h-10 w-10 place-items-center rounded-xl shadow-lg shadow-black/30"
              >
                <Logo size={20} />
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

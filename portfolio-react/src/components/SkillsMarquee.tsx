import { useEffect, useRef } from 'react'

const ITEMS = [
  'TypeScript', 'Angular', 'React', 'React Native', 'Node.js', 'Tailwind CSS',
  'Electron', 'Vite', 'SQLite', 'Docker', 'Sass', 'Express', 'Jest', 'PWA',
]

/**
 * Velocity-reactive marquee: the strip drifts continuously and speeds up /
 * skews with scroll velocity (Satori-style "alive" divider between sections).
 * Static row under reduced motion.
 */
export default function SkillsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cleanup: (() => void) | undefined
    let cancelled = false

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      // seamless loop: the track holds two copies; -50% == one full copy
      const loop = gsap.to(track, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      })

      const proxy = { skew: 0 }
      const skewSetter = gsap.quickSetter(track, 'skewX', 'deg')
      const clampSkew = gsap.utils.clamp(-8, 8)
      const clampScale = gsap.utils.clamp(1, 5)

      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity()
          // speed the drift up with scroll, and lean the strip into the motion
          loop.timeScale(clampScale(1 + Math.abs(v) / 900))
          const skew = clampSkew(v / 350)
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew
            gsap.to(proxy, {
              skew: 0,
              duration: 0.9,
              ease: 'power3.out',
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            })
          }
        },
      })

      cleanup = () => {
        loop.kill()
        st.kill()
      }
    })

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return (
    <div className="relative overflow-hidden border-y border-border-soft/60 bg-bg-soft/30 py-5" aria-hidden="true">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />

      <div ref={trackRef} className="flex w-max items-center gap-10 whitespace-nowrap will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-10">
            {ITEMS.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-10 font-mono text-sm tracking-widest uppercase">
                <span className={i % 2 ? 'text-fg-dim' : 'text-fg-muted'}>{item}</span>
                <span className={i % 3 === 0 ? 'text-brand-bright' : 'text-cyan'}>✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

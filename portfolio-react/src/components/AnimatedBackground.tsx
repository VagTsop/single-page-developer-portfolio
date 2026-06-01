/**
 * Global living background: a slow duotone-treated photographic gradient,
 * three drifting ambient orbs in the brand palette, and a fixed film-grain
 * overlay on top. All motion is paused under prefers-reduced-motion (CSS).
 */
export default function AnimatedBackground() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* high-res photographic gradient, duotone-shifted into our palette */}
        <div
          className="duotone-layer absolute inset-0 opacity-[0.14]"
          style={{ backgroundImage: 'url(/assets/images/bg-gradient.jpg)' }}
        />
        {/* light unify wash so content stays readable, orbs stay visible */}
        <div className="absolute inset-0 bg-bg/35" />

        {/* drifting ambient orbs */}
        <div className="ambient-orb orb-a -left-32 top-[6%] h-[36rem] w-[36rem] bg-brand/60" />
        <div className="ambient-orb orb-b right-[-10rem] top-[32%] h-[32rem] w-[32rem] bg-cyan/45" />
        <div className="ambient-orb orb-c left-[18%] bottom-[-8rem] h-[30rem] w-[30rem] bg-[#a855f7]/45" />
        <div className="ambient-orb orb-b right-[12%] bottom-[14%] h-[26rem] w-[26rem] bg-brand-bright/40" />

        {/* soft vignette to keep edges grounded */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_65%,var(--color-bg)_100%)]" />
      </div>

      {/* film grain sits above content (pointer-events none) */}
      <div className="grain-overlay" aria-hidden />
    </>
  )
}

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

/**
 * Full-viewport canvas constellation: slowly drifting nodes that link to nearby
 * neighbours and to the cursor. Fixed behind all content, spanning the whole page.
 */
export default function NodesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const cv: HTMLCanvasElement = canvas
    const g: CanvasRenderingContext2D = context

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const speed = reduce ? 0.12 : 0.3
    const LINK = 130
    const MOUSE_LINK = 170

    let w = 0
    let h = 0
    let nodes: Node[] = []
    let raf = 0
    const mouse = { x: -9999, y: -9999 }

    function build() {
      w = window.innerWidth
      h = window.innerHeight
      cv.width = Math.floor(w * dpr)
      cv.height = Math.floor(h * dpr)
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(28, Math.min(110, Math.floor((w * h) / 14000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      }))
    }

    function frame() {
      g.clearRect(0, 0, w, h)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x <= 0 || n.x >= w) n.vx *= -1
        if (n.y <= 0 || n.y >= h) n.vy *= -1
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            g.strokeStyle = `rgba(129, 140, 248, ${(1 - d / LINK) * 0.38})`
            g.lineWidth = 1
            g.beginPath()
            g.moveTo(a.x, a.y)
            g.lineTo(b.x, b.y)
            g.stroke()
          }
        }
        const mdx = a.x - mouse.x
        const mdy = a.y - mouse.y
        const md = Math.hypot(mdx, mdy)
        if (md < MOUSE_LINK) {
          g.strokeStyle = `rgba(34, 211, 238, ${(1 - md / MOUSE_LINK) * 0.55})`
          g.lineWidth = 1
          g.beginPath()
          g.moveTo(a.x, a.y)
          g.lineTo(mouse.x, mouse.y)
          g.stroke()
        }
      }

      for (const n of nodes) {
        g.fillStyle = 'rgba(165, 180, 252, 0.7)'
        g.beginPath()
        g.arc(n.x, n.y, 1.5, 0, Math.PI * 2)
        g.fill()
      }

      raf = requestAnimationFrame(frame)
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    function onLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    build()
    frame()
    window.addEventListener('resize', build)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', build)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  )
}

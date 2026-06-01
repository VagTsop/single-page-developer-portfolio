import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { GitBranch, Circle, TrendingUp } from 'lucide-react'
import { TypeScriptLogo, ReactLogo, AngularLogo } from './TechLogos'

/* token colors */
const K = ({ children }: { children: React.ReactNode }) => <span className="text-[#c084fc]">{children}</span>
const F = ({ children }: { children: React.ReactNode }) => <span className="text-[#38bdf8]">{children}</span>
const S = ({ children }: { children: React.ReactNode }) => <span className="text-[#4ee1a0]">{children}</span>
const T = ({ children }: { children: React.ReactNode }) => <span className="text-[#22d3ee]">{children}</span>
const P = ({ children }: { children: React.ReactNode }) => <span className="text-[#fbbf24]">{children}</span>

function Line({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex">
      <span className="w-7 shrink-0 select-none pr-3 text-right text-fg-dim/40">{n}</span>
      <span className="whitespace-pre">{children}</span>
    </div>
  )
}

function CodeMetrics() {
  return (
    <>
      <Line n={1}><K>export</K> <K>function</K> <F>useMetrics</F>(range: <T>DateRange</T>) {'{'}</Line>
      <Line n={2}>{'  '}<K>const</K> {'{'} data {'}'} = <F>useQuery</F>({'{'}</Line>
      <Line n={3}>{'    '}queryKey: [<S>'metrics'</S>, range],</Line>
      <Line n={4}>{'    '}queryFn: () =&gt; api.<F>get</F>(<S>'/metrics'</S>),</Line>
      <Line n={5}>{'  '}{'}'})</Line>
      <Line n={6}>{' '}</Line>
      <Line n={7}>{'  '}<K>return</K> <F>useMemo</F>(() =&gt; ({'{'}</Line>
      <Line n={8}>{'    '}revenue: <F>sum</F>(data, <S>'revenue'</S>),</Line>
      <Line n={9}>{'    '}growth:{'  '}<F>pct</F>(data, <S>'growth'</S>),</Line>
      <Line n={10}>{'  '}{'}'}), [data])</Line>
      <Line n={11}>{'}'}</Line>
    </>
  )
}

function CodeDashboard() {
  return (
    <>
      <Line n={1}><K>export</K> <K>function</K> <F>Dashboard</F>() {'{'}</Line>
      <Line n={2}>{'  '}<K>const</K> m = <F>useMetrics</F>(range)</Line>
      <Line n={3}>{' '}</Line>
      <Line n={4}>{'  '}<K>return</K> (</Line>
      <Line n={5}>{'    '}&lt;<T>Grid</T> columns={'{'}3{'}'}&gt;</Line>
      <Line n={6}>{'      '}&lt;<T>StatCard</T> label=<S>"Revenue"</S> value={'{'}m.revenue{'}'} /&gt;</Line>
      <Line n={7}>{'      '}&lt;<T>Chart</T> series={'{'}m.series{'}'} <P>live</P> /&gt;</Line>
      <Line n={8}>{'    '}&lt;/<T>Grid</T>&gt;</Line>
      <Line n={9}>{'  '})</Line>
      <Line n={10}>{'}'}</Line>
    </>
  )
}

function StatBox({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/50 p-3">
      <div className="text-[11px] text-fg-dim">{label}</div>
      <div className="mt-1 font-display text-xl font-bold text-fg">{value}</div>
      <div className="mt-0.5 flex items-center gap-1 text-[11px] text-live">
        <TrendingUp size={12} /> {delta}
      </div>
    </div>
  )
}

/** Rendered "result" of Dashboard.tsx — what the code on the other tabs produces. */
function DashboardPreview() {
  const LINE = 'M0 27 L14.3 24 L28.6 25 L42.9 18 L57.1 20 L71.4 13 L85.7 10 L100 6'
  return (
    <div className="grid h-full grid-cols-2 content-start gap-3 p-4">
      <StatBox label="Revenue" value="$128.4k" delta="+8.2%" />
      <StatBox label="Growth" value="12.4%" delta="+2.1%" />
      <div className="col-span-2 rounded-xl border border-border bg-card/50 p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] text-fg-dim">Sessions · 30d</span>
          <span className="flex items-center gap-1 font-mono text-[10px] text-live">
            <span className="h-1.5 w-1.5 rounded-full bg-live" /> live
          </span>
        </div>
        <svg viewBox="0 0 100 34" className="h-20 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={`${LINE} L100 34 L0 34 Z`}
            fill="url(#area-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          />
          <motion.path
            d={LINE}
            fill="none"
            stroke="#818cf8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </div>
  )
}

const TABS = [
  { name: 'useMetrics.ts', dot: '#4ee1a0' },
  { name: 'Dashboard.tsx', dot: '#38bdf8' },
  { name: 'preview', dot: '#fbbf24' },
]

export default function EditorCard() {
  const [tab, setTab] = useState(0)
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 16, mass: 0.4 })
  const sry = useSpring(ry, { stiffness: 150, damping: 16, mass: 0.4 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 7)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7)
  }
  function reset() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', duration: 0.8, bounce: 0 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className="relative"
    >
      {/* glow under */}
      <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-brand/20 blur-3xl" aria-hidden />

      {/* floating tech-stack cluster (real logos) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', duration: 0.7, bounce: 0.25, delay: 0.25 }}
        className="glass absolute -left-5 -top-6 z-20 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5"
      >
        <TypeScriptLogo size={22} className="rounded-md" />
        <ReactLogo size={22} />
        <AngularLogo size={20} />
        <span className="ml-1 font-mono text-[10px] uppercase tracking-wider text-fg-dim">my stack</span>
      </motion.div>

      <div className="bezel-shell shadow-2xl shadow-black/50">
        <div className="overflow-hidden rounded-[calc(1.75rem-0.4rem)] bg-[#0b1020]">
          {/* chrome */}
          <div className="flex items-center gap-3 border-b border-border bg-bg-soft/80 px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="ml-1 flex gap-1">
              {TABS.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setTab(i)}
                  className={`group flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
                    tab === i ? 'bg-card text-fg' : 'text-fg-dim hover:text-fg-muted'
                  }`}
                >
                  <Circle size={7} fill={t.dot} stroke="none" />
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* content */}
          <div className="relative h-[300px] overflow-hidden">
            <AnimatePresence mode="wait">
              {tab === 2 ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(6px)' }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <DashboardPreview />
                </motion.div>
              ) : (
                <motion.pre
                  key={tab}
                  initial={{ opacity: 0, x: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -12, filter: 'blur(4px)' }}
                  transition={{ duration: 0.28 }}
                  className="absolute inset-0 overflow-auto p-4 font-mono text-[13px] leading-6 text-fg-muted"
                >
                  {tab === 0 ? <CodeMetrics /> : <CodeDashboard />}
                </motion.pre>
              )}
            </AnimatePresence>
          </div>

          {/* status bar */}
          <div className="flex items-center justify-between border-t border-border bg-bg-soft/80 px-4 py-2 font-mono text-[11px] text-fg-dim">
            <span className="flex items-center gap-1.5">
              <GitBranch size={12} className="text-brand-bright" /> main
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-live" /> shipping production code, daily
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

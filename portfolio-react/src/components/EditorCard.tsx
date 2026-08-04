import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  GitBranch,
  Circle,
  TrendingUp,
  Play,
  Pause,
  Activity,
} from "lucide-react";
import { TypeScriptLogo, ReactLogo, AngularLogo } from "./TechLogos";

/** how long each tab stays on screen while auto-playing */
const AUTO_MS = 4600;

/* token colors */
const K = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#c084fc]">{children}</span>
);
const F = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#38bdf8]">{children}</span>
);
const S = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#4ee1a0]">{children}</span>
);
const T = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#22d3ee]">{children}</span>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#fbbf24]">{children}</span>
);

const lineVariants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0 },
};

/** one code line — animates in as part of the parent's stagger */
function Line({
  n,
  children,
  last,
}: {
  n: number;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <motion.div variants={lineVariants} className="group/line flex">
      <span className="w-7 shrink-0 select-none pr-3 text-right text-fg-dim/40">
        {n}
      </span>
      <span className="whitespace-pre">
        {children}
        {last && (
          <span className="caret ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[3px] bg-brand-bright" />
        )}
      </span>
    </motion.div>
  );
}

function CodeMetrics() {
  return (
    <>
      <Line n={1}>
        <K>export</K> <K>function</K> <F>useMetrics</F>(range: <T>DateRange</T>){" "}
        {"{"}
      </Line>
      <Line n={2}>
        {"  "}
        <K>const</K> {"{"} data {"}"} = <F>useQuery</F>({"{"}
      </Line>
      <Line n={3}>
        {"    "}queryKey: [<S>'metrics'</S>, range],
      </Line>
      <Line n={4}>
        {"    "}queryFn: () =&gt; api.<F>get</F>(<S>'/metrics'</S>),
      </Line>
      <Line n={5}>
        {"  "}
        {"}"})
      </Line>
      <Line n={6}> </Line>
      <Line n={7}>
        {"  "}
        <K>return</K> <F>useMemo</F>(() =&gt; ({"{"}
      </Line>
      <Line n={8}>
        {"    "}revenue: <F>sum</F>(data, <S>'revenue'</S>),
      </Line>
      <Line n={9}>
        {"    "}growth:{"  "}
        <F>pct</F>(data, <S>'growth'</S>),
      </Line>
      <Line n={10}>
        {"  "}
        {"}"}), [data])
      </Line>
      <Line n={11} last>
        {"}"}
      </Line>
    </>
  );
}

function CodeDashboard() {
  return (
    <>
      <Line n={1}>
        <K>export</K> <K>function</K> <F>Dashboard</F>() {"{"}
      </Line>
      <Line n={2}>
        {"  "}
        <K>const</K> m = <F>useMetrics</F>(range)
      </Line>
      <Line n={3}> </Line>
      <Line n={4}>
        {"  "}
        <K>return</K> (
      </Line>
      <Line n={5}>
        {"    "}&lt;<T>Grid</T> columns={"{"}3{"}"}&gt;
      </Line>
      <Line n={6}>
        {"      "}&lt;<T>StatCard</T> label=<S>"Revenue"</S> value={"{"}
        m.revenue{"}"} /&gt;
      </Line>
      <Line n={7}>
        {"      "}&lt;<T>Chart</T> series={"{"}m.series{"}"} <P>live</P> /&gt;
      </Line>
      <Line n={8}>
        {"    "}&lt;/<T>Grid</T>&gt;
      </Line>
      <Line n={9}>{"  "})</Line>
      <Line n={10} last>
        {"}"}
      </Line>
    </>
  );
}

/** number that springs to its new value instead of jumping */
function LiveNumber({
  value,
  format,
}: {
  value: number;
  format: (n: number) => string;
}) {
  const reduce = useReducedMotion();
  const spring = useSpring(value, { stiffness: 55, damping: 18 });
  const [text, setText] = useState(format(value));

  useEffect(() => {
    if (reduce) {
      setText(format(value));
      return;
    }
    spring.set(value);
  }, [value, spring, reduce, format]);

  useEffect(
    () => spring.on("change", (v) => setText(format(v))),
    [spring, format],
  );

  return <>{text}</>;
}

/** tiny inline sparkline for a stat tile */
function Spark({ points, color }: { points: number[]; color: string }) {
  const d = points
    .map((y, i) => `${i ? "L" : "M"}${(i * 100) / (points.length - 1)} ${y}`)
    .join(" ");
  return (
    <svg
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      className="h-5 w-full overflow-visible"
    >
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut", delay: 0.15 }}
        style={{ transition: "d 1.2s cubic-bezier(0.16,1,0.3,1)" }}
      />
    </svg>
  );
}

function StatBox({
  label,
  value,
  format,
  delta,
  spark,
  color,
}: {
  label: string;
  value: number;
  format: (n: number) => string;
  delta: string;
  spark: number[];
  color: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card/50 p-2.5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] text-fg-dim">{label}</div>
          <div className="mt-0.5 font-display text-lg font-bold tabular-nums leading-tight text-fg">
            <LiveNumber value={value} format={format} />
          </div>
        </div>
        <span className="flex items-center gap-0.5 rounded-md bg-live/10 px-1.5 py-0.5 text-[10px] font-medium text-live">
          <TrendingUp size={10} /> {delta}
        </span>
      </div>
      <div className="mt-1.5 opacity-70">
        <Spark points={spark} color={color} />
      </div>
    </div>
  );
}

const EVENT_POOL = [
  { label: "checkout.completed", value: "+$249" },
  { label: "user.signup", value: "pro" },
  { label: "invoice.paid", value: "+$1.2k" },
  { label: "report.exported", value: "csv" },
  { label: "api.latency", value: "82ms" },
  { label: "session.started", value: "eu-west" },
];

/** streaming activity feed — new rows push in from the bottom */
function ActivityFeed({ reduce }: { reduce: boolean | null }) {
  const [rows, setRows] = useState(() => [
    { id: 0, ...EVENT_POOL[0] },
    { id: 1, ...EVENT_POOL[1] },
  ]);

  useEffect(() => {
    if (reduce) return;
    let id = 2;
    const timer = setInterval(() => {
      setRows((prev) =>
        [{ id: id++, ...EVENT_POOL[id % EVENT_POOL.length] }, ...prev].slice(
          0,
          2,
        ),
      );
    }, 2600);
    return () => clearInterval(timer);
  }, [reduce]);

  return (
    <div className="shrink-0 rounded-xl border border-border bg-card/50 px-2.5 py-1.5">
      <div className="mb-0.5 flex items-center gap-1.5 text-[10px] text-fg-dim">
        <Activity size={10} className="text-brand-bright" /> Activity stream
      </div>
      <div className="relative h-[38px] overflow-hidden">
        <AnimatePresence initial={false}>
          {rows.map((r) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between py-[3px] font-mono text-[10px]"
            >
              <span className="flex items-center gap-1.5 text-fg-muted">
                <span className="h-1 w-1 rounded-full bg-brand-bright" />
                {r.label}
              </span>
              <span className="text-live">{r.value}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

const BASE_POINTS = [27, 24, 25, 18, 20, 13, 10, 6];
const toPath = (pts: number[]) =>
  pts
    .map((y, i) => `${i ? "L" : "M"}${(i * 100) / (pts.length - 1)} ${y}`)
    .join(" ");

const RANGES = ["7d", "30d", "90d"];

/** Rendered "result" of Dashboard.tsx — a small dashboard that keeps living:
 *  ticking KPIs with sparklines, a reshaping area chart, and an event stream. */
function DashboardPreview() {
  const reduce = useReducedMotion();
  const [revenue, setRevenue] = useState(128.4);
  const [growth, setGrowth] = useState(12.4);
  const [points, setPoints] = useState(BASE_POINTS);
  const [sparkA, setSparkA] = useState([16, 12, 14, 9, 11, 6, 4]);
  const [sparkB, setSparkB] = useState([6, 9, 7, 12, 10, 14, 16]);

  // live feed: only ticks while this tab is mounted
  useEffect(() => {
    if (reduce) return;
    const jitter = (arr: number[], spread = 4) =>
      arr.map((v) =>
        Math.min(18, Math.max(2, v + (Math.random() - 0.5) * spread)),
      );
    const id = setInterval(() => {
      setRevenue(128.4 + (Math.random() - 0.4) * 6);
      setGrowth(12.4 + (Math.random() - 0.45) * 2.2);
      setPoints(
        BASE_POINTS.map((y, i) =>
          Math.max(4, y - i * 0.2 + (Math.random() - 0.5) * 3),
        ),
      );
      setSparkA((s) => jitter(s));
      setSparkB((s) => jitter(s));
    }, 2200);
    return () => clearInterval(id);
  }, [reduce]);

  const line = toPath(points);
  const lastY = points[points.length - 1];

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden p-3">
      {/* KPI tiles with their own sparklines */}
      <div className="grid shrink-0 grid-cols-2 gap-2">
        <StatBox
          label="Revenue"
          value={revenue}
          format={(n) => `$${n.toFixed(1)}k`}
          delta="+8.2%"
          spark={sparkA}
          color="#818cf8"
        />
        <StatBox
          label="Growth"
          value={growth}
          format={(n) => `${n.toFixed(1)}%`}
          delta="+2.1%"
          spark={sparkB}
          color="#22d3ee"
        />
      </div>

      {/* main chart */}
      <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-border bg-card/50 px-2.5 py-2">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] text-fg-dim">Sessions</span>
          <div className="flex items-center gap-2">
            {/* range selector, like a real dashboard */}
            <div className="flex gap-0.5 rounded-md bg-bg-soft/70 p-0.5">
              {RANGES.map((r) => (
                <span
                  key={r}
                  className={`rounded px-1.5 py-px font-mono text-[9px] ${
                    r === "30d" ? "bg-card text-fg" : "text-fg-dim"
                  }`}
                >
                  {r}
                </span>
              ))}
            </div>
            <span className="flex items-center gap-1 font-mono text-[10px] text-live">
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
              </span>
              live
            </span>
          </div>
        </div>
        {/* explicit height: an <svg> won't take its size from flex-1 */}
        <svg
          viewBox="0 0 100 34"
          className="h-[66px] w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* faint grid */}
          {[8, 17, 26].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-border"
            />
          ))}
          <motion.path
            d={`${line} L100 34 L0 34 Z`}
            fill="url(#area-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ transition: "d 1.2s cubic-bezier(0.16,1,0.3,1)" }}
          />
          <motion.path
            d={line}
            fill="none"
            stroke="#818cf8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ transition: "d 1.2s cubic-bezier(0.16,1,0.3,1)" }}
          />
          {/* leading point: where the "live" data lands */}
          <circle
            cx="100"
            cy={lastY}
            r="4"
            fill="#818cf8"
            opacity="0.25"
            style={{ transition: "cy 1.2s cubic-bezier(0.16,1,0.3,1)" }}
          />
          <circle
            cx="100"
            cy={lastY}
            r="2.2"
            fill="#818cf8"
            stroke="#0b1020"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transition: "cy 1.2s cubic-bezier(0.16,1,0.3,1)" }}
          />
        </svg>
      </div>

      <ActivityFeed reduce={reduce} />
    </div>
  );
}

const TABS = [
  { name: "useMetrics.ts", dot: "#4ee1a0", status: "11 lines · TypeScript" },
  { name: "Dashboard.tsx", dot: "#38bdf8", status: "10 lines · React" },
  { name: "preview", dot: "#fbbf24", status: "live preview · 60 fps" },
];

export default function EditorCard() {
  const [tab, setTab] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 16, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 150, damping: 16, mass: 0.4 });
  // glare sweeps across the glass as the card tilts
  const glareX = useTransform(sry, [-7, 7], ["-30%", "130%"]);
  const glareOpacity = useTransform(sry, [-7, 0, 7], [0.16, 0.05, 0.16]);

  // auto-play through the tabs so the story is told without a click
  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setTab((n) => (n + 1) % TABS.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [tab, paused, reduce]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", duration: 0.8, bounce: 0 }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        reset();
        setPaused(false);
      }}
      onMouseEnter={() => setPaused(true)}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className="relative"
    >
      {/* glow under */}
      <div
        className="absolute -inset-6 -z-10 rounded-[3rem] bg-brand/20 blur-3xl"
        aria-hidden
      />

      {/* floating tech-stack cluster (real logos) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          duration: 0.7,
          bounce: 0.25,
          delay: 0.25,
        }}
        whileHover={{ rotate: 0, scale: 1.04 }}
        className="glass absolute -left-5 -top-6 z-20 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5"
      >
        {[TypeScriptLogo, ReactLogo, AngularLogo].map((Logo, i) => (
          <motion.span
            key={i}
            animate={reduce ? undefined : { y: [0, -3, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.35,
            }}
            className="grid place-items-center"
          >
            <Logo
              size={i === 2 ? 20 : 22}
              className={i === 0 ? "rounded-md" : undefined}
            />
          </motion.span>
        ))}
        <span className="ml-1 font-mono text-[10px] uppercase tracking-wider text-fg-dim">
          my stack
        </span>
      </motion.div>

      <div className="bezel-shell relative shadow-2xl shadow-black/50">
        {/* tilt glare */}
        {!reduce && (
          <motion.div
            aria-hidden
            style={{ x: glareX, opacity: glareOpacity }}
            className="pointer-events-none absolute inset-y-0 z-30 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent blur-md"
          />
        )}

        <div className="overflow-hidden rounded-[calc(1.75rem-0.4rem)] bg-[#0b1020]">
          {/* chrome */}
          <div className="relative flex min-w-0 items-center gap-3 border-b border-border bg-bg-soft/80 px-4 py-2.5">
            <div className="hidden gap-1.5 sm:flex">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="ml-1 flex min-w-0 flex-1 gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TABS.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setTab(i)}
                  className={`group relative flex shrink-0 items-center gap-1.5 overflow-hidden rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
                    tab === i
                      ? "bg-card text-fg"
                      : "text-fg-dim hover:text-fg-muted"
                  }`}
                >
                  <Circle size={7} fill={t.dot} stroke="none" />
                  {t.name}
                  {/* auto-play progress under the active tab */}
                  {tab === i && !reduce && !paused && (
                    <motion.span
                      key={`p-${tab}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                      className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand-bright"
                    />
                  )}
                </button>
              ))}
            </div>
            {/* autoplay state hint */}
            <span className="ml-auto hidden items-center gap-1 font-mono text-[10px] text-fg-dim sm:flex">
              {paused ? <Pause size={10} /> : <Play size={10} />}
              {paused ? "paused" : "auto"}
            </span>
          </div>

          {/* content */}
          <div className="relative h-[300px] overflow-hidden">
            <AnimatePresence mode="wait">
              {tab === 2 ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <DashboardPreview />
                </motion.div>
              ) : (
                <motion.pre
                  key={tab}
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.045,
                        delayChildren: 0.05,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="show"
                  exit={{
                    opacity: 0,
                    x: -12,
                    filter: "blur(4px)",
                    transition: { duration: 0.22 },
                  }}
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
            <AnimatePresence mode="wait">
              <motion.span
                key={tab}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-live" />{" "}
                {TABS[tab].status}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

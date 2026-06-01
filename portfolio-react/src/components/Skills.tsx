import { useRef, type ComponentType } from 'react'
import { motion, useInView } from 'framer-motion'
import { Accessibility, Database, Zap, GitBranch, Server } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import {
  TypeScriptLogo,
  AngularLogo,
  ReactLogo,
  JavaScriptLogo,
  HTML5Logo,
  CSS3Logo,
  SassLogo,
  TailwindLogo,
  NodeLogo,
  ElectronLogo,
} from './TechLogos'
import SectionHeading from './SectionHeading'

type IconProps = { size?: number; className?: string }
interface Skill {
  name: string
  years: number
  Logo: ComponentType<IconProps>
}

/** wrap a lucide icon as a brand-tinted skill logo */
const tinted = (Icon: ComponentType<IconProps & { color?: string }>, color: string): ComponentType<IconProps> =>
  (p) => <Icon {...p} color={color} />

const SKILLS: Skill[] = [
  { name: 'TypeScript', years: 6, Logo: TypeScriptLogo },
  { name: 'JavaScript', years: 6, Logo: JavaScriptLogo },
  { name: 'Angular', years: 6, Logo: AngularLogo },
  { name: 'React', years: 4, Logo: ReactLogo },
  { name: 'React Native', years: 3, Logo: ReactLogo },
  { name: 'HTML5', years: 6, Logo: HTML5Logo },
  { name: 'CSS3', years: 6, Logo: CSS3Logo },
  { name: 'Sass', years: 6, Logo: SassLogo },
  { name: 'Tailwind CSS', years: 3, Logo: TailwindLogo },
  { name: 'Node.js', years: 4, Logo: NodeLogo },
  { name: 'Express', years: 4, Logo: tinted(Server, '#94a3b8') },
  { name: 'SQLite', years: 4, Logo: tinted(Database, '#0F80CC') },
  { name: 'Electron', years: 2, Logo: ElectronLogo },
  { name: 'Vite', years: 3, Logo: tinted(Zap, '#646CFF') },
  { name: 'Git', years: 6, Logo: tinted(GitBranch, '#F05032') },
  { name: 'Accessibility', years: 6, Logo: tinted(Accessibility, '#818cf8') },
]

function SkillCard({ name, years, Logo, inView, index }: Skill & { inView: boolean; index: number }) {
  return (
    <motion.li
      variants={fadeUp}
      className="group rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-brand/40 hover:bg-card"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg bg-bg-soft ring-1 ring-border-soft">
            <Logo size={22} />
          </span>
          <span className="font-display font-medium text-fg">{name}</span>
        </div>
        <span className="font-mono text-xs text-fg-dim">{years}y</span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border-soft">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 0.92 : 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 + (index % 3) * 0.06 }}
            style={{ transformOrigin: 'left' }}
            className="h-full w-full rounded-full bg-gradient-to-r from-brand to-cyan"
          />
        </div>
        <span className="w-16 shrink-0 text-right font-mono text-[10px] uppercase tracking-wider text-brand-bright">
          Expert
        </span>
      </div>
    </motion.li>
  )
}

export default function Skills() {
  const ref = useRef<HTMLUListElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading eyebrow="Stack" title="Tools I" highlight="work with" />

      <motion.ul
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SKILLS.map((s, i) => (
          <SkillCard key={s.name} {...s} inView={inView} index={i} />
        ))}
      </motion.ul>
    </section>
  )
}

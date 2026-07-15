import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${
          scrolled ? 'glass shadow-lg shadow-black/30' : 'border border-transparent'
        }`}
      >
        <a href="#top" className="group flex items-center gap-2 font-display text-lg font-bold text-fg">
          <img
            id="nav-brand-logo"
            src="/assets/images/favicon.svg"
            alt=""
            className="h-8 w-8 rounded-lg ring-1 ring-white/10 transition-transform group-hover:scale-105"
          />
          VagTsop
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm text-fg-muted transition-colors hover:text-fg after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-brand-bright after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/VagTsop"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="grid h-9 w-9 place-items-center rounded-lg text-fg-muted transition-colors hover:bg-card hover:text-fg"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/tsopanosv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="grid h-9 w-9 place-items-center rounded-lg text-fg-muted transition-colors hover:bg-card hover:text-fg"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href="#contact"
            className="ml-1 hidden rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand/25 transition-transform hover:scale-[1.03] active:scale-[0.97] sm:inline-flex"
          >
            Get in touch
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-lg text-fg-muted hover:text-fg md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass absolute top-20 left-4 right-4 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
          >
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm text-fg-muted transition-colors hover:bg-card hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

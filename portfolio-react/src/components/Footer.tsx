import { ArrowUp } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'

export default function Footer() {
  return (
    <footer className="relative border-t border-border-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2 font-display font-bold text-fg">
          <img src="/assets/images/favicon.svg" alt="" className="h-8 w-8 rounded-lg ring-1 ring-white/10" />
          Vagelis Tsopanos
        </div>

        <p className="order-3 text-sm text-fg-dim sm:order-2">
          © {new Date().getFullYear()} · Built with React, Framer Motion &amp; Tailwind
        </p>

        <div className="order-2 flex items-center gap-2 sm:order-3">
          <a
            href="https://github.com/VagTsop"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-lg text-fg-muted transition-colors hover:bg-card hover:text-fg"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/tsopanosv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-lg text-fg-muted transition-colors hover:bg-card hover:text-fg"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href="#top"
            aria-label="Back to top"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-fg-muted transition-colors hover:border-brand/40 hover:text-fg"
          >
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}

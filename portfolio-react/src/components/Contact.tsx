import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import TypewriterField from './TypewriterField'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import SectionHeading from './SectionHeading'

// Public (client-side) EmailJS identifiers — same as the original site.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE ?? 'service_vcw8l9g'
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE ?? 'template_jyt0efh'
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_KEY ?? '_vu6jk9JH8q5Q7y-p'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const honeypot = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (honeypot.current?.value) return // bot
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: String(data.get('name') ?? '').trim(),
          email: String(data.get('email') ?? '').trim(),
          message: String(data.get('message') ?? '').trim(),
        },
        { publicKey: PUBLIC_KEY },
      )
      setStatus('success')
      form.reset()
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="Contact" title="Let's build" highlight="something" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-6"
          >
            <motion.p variants={fadeUp} className="max-w-md text-lg text-fg-muted">
              Have a dashboard, internal tool, or data-heavy product in mind? I&apos;d love to hear
              about it. Drop a message and I&apos;ll get back to you.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="mailto:vatsop52@gmail.com"
              className="inline-flex items-center gap-3 text-fg transition-colors hover:text-brand-bright"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand/15 text-brand-bright ring-1 ring-brand/25">
                <Mail size={18} />
              </span>
              vatsop52@gmail.com
            </motion.a>
            <motion.div variants={fadeUp} className="flex gap-3 pt-2">
              <a
                href="https://github.com/VagTsop"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card/40 text-fg-muted transition-colors hover:border-brand/40 hover:text-fg"
              >
                <GithubIcon size={19} />
              </a>
              <a
                href="https://www.linkedin.com/in/tsopanosv"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card/40 text-fg-muted transition-colors hover:border-brand/40 hover:text-fg"
              >
                <LinkedinIcon size={19} />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass space-y-4 rounded-3xl p-6 sm:p-8"
        >
          {/* honeypot */}
          <input ref={honeypot} type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          <div className="grid gap-4 sm:grid-cols-2">
            <TypewriterField
              id="name"
              name="name"
              label="Name"
              required
              words={['Jane Doe', 'John Smith', 'Your name…']}
            />
            <TypewriterField
              id="email"
              name="email"
              label="Email"
              type="email"
              required
              words={['you@email.com', 'name@company.io', 'hello@you.dev']}
            />
          </div>
          <TypewriterField
            id="message"
            name="message"
            label="Message"
            required
            textarea
            words={[
              'I need a SaaS dashboard…',
              'Can you build an internal tool?',
              'Let’s redesign our admin panel…',
              'Tell me about your project…',
            ]}
          />

          <button
            type="submit"
            disabled={status === 'sending' || status === 'success'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-medium text-white shadow-lg shadow-brand/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
          >
            {status === 'sending' && <Loader2 size={18} className="animate-spin" />}
            {status === 'success' && <CheckCircle2 size={18} />}
            {status === 'idle' || status === 'error' ? <Send size={18} /> : null}
            {status === 'idle' && 'Send message'}
            {status === 'sending' && 'Sending…'}
            {status === 'success' && 'Message sent!'}
            {status === 'error' && 'Failed — try again'}
          </button>

          <p aria-live="polite" className="min-h-[1.25rem] text-center text-sm">
            {status === 'success' && <span className="text-live">Thanks! I&apos;ll reply soon.</span>}
            {status === 'error' && <span className="text-accent">Something went wrong. Email me directly.</span>}
          </p>
        </motion.form>
      </div>
    </section>
  )
}

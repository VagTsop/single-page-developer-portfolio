import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Cycles through phrases, typing then deleting, char by char. */
function useTypewriter(words: string[], typeMs = 65, deleteMs = 30, pauseMs = 1600) {
  const reduce = useReducedMotion()
  const [text, setText] = useState(reduce ? words[0] : '')

  useEffect(() => {
    if (reduce) {
      setText(words[0])
      return
    }
    let word = 0
    let char = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const current = words[word]
      if (!deleting) {
        char++
        setText(current.slice(0, char))
        if (char === current.length) {
          deleting = true
          timer = setTimeout(tick, pauseMs)
          return
        }
        timer = setTimeout(tick, typeMs)
      } else {
        char--
        setText(current.slice(0, char))
        if (char === 0) {
          deleting = false
          word = (word + 1) % words.length
        }
        timer = setTimeout(tick, deleteMs)
      }
    }
    timer = setTimeout(tick, 400)
    return () => clearTimeout(timer)
  }, [words, reduce, typeMs, deleteMs, pauseMs])

  return text
}

interface Props {
  id: string
  name: string
  label: string
  type?: string
  required?: boolean
  words: string[]
  textarea?: boolean
  rows?: number
}

/**
 * Labeled field whose empty state shows an animated "typewriter" ghost
 * placeholder with a blinking caret. The ghost hides on focus or once typed.
 */
export default function TypewriterField({
  id,
  name,
  label,
  type = 'text',
  required,
  words,
  textarea,
  rows = 5,
}: Props) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const typed = useTypewriter(words)
  const showGhost = !focused && !hasValue

  const base =
    'w-full rounded-xl border border-border bg-bg-soft/60 px-4 py-3 text-fg outline-none transition-colors focus:border-brand/60 focus:ring-2 focus:ring-brand/20'

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-fg">
        {label}
      </label>
      <div className="relative">
        {textarea ? (
          <textarea
            id={id}
            name={name}
            required={required}
            rows={rows}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onInput={(e) => setHasValue(e.currentTarget.value.length > 0)}
            className={`${base} resize-none`}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            required={required}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onInput={(e) => setHasValue(e.currentTarget.value.length > 0)}
            className={base}
          />
        )}

        {showGhost && (
          <span
            aria-hidden
            className={`pointer-events-none absolute left-4 ${
              textarea ? 'top-3' : 'top-1/2 -translate-y-1/2'
            } select-none text-fg-dim`}
          >
            {typed}
            <span className="caret-blink ml-px inline-block w-px self-stretch align-middle">
              <span className="inline-block h-[1.1em] w-[2px] translate-y-[2px] rounded-full bg-brand-bright" />
            </span>
          </span>
        )}
      </div>
    </div>
  )
}

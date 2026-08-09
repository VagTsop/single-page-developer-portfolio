import rawProjects from '../data/projects.json'

/** 'client' = paid work shipped for a real business; everything else is self-initiated */
export type ProjectCategory = 'client' | 'lab'

export interface Project {
  title: string
  image: string
  tech: string[]
  description?: string
  /** one-line case-study outcome, shown on featured cards */
  impact?: string
  liveUrl: string
  /** Omitted when the source is private — the card then hides its GitHub link. */
  codeUrl?: string
  featured: boolean
  category: ProjectCategory
}

type RawProject = Omit<Project, 'featured' | 'category'> & {
  featured?: boolean
  category?: string
}

/** Normalize the legacy "./assets/..." paths to public-root "/assets/..." */
export const projects: Project[] = (rawProjects as RawProject[]).map((p) => ({
  ...p,
  image: p.image.replace(/^\.\//, '/'),
  // A "#" placeholder used to render a GitHub button that went nowhere; treat
  // it — and any empty value — as "no public repo".
  codeUrl: p.codeUrl && p.codeUrl !== '#' ? p.codeUrl : undefined,
  featured: Boolean(p.featured),
  // ό,τι δεν είναι ρητά πελατειακό μετράει ως lab — έτσι μια νέα καταχώριση δεν
  // μπορεί να παρουσιαστεί κατά λάθος ως δουλειά για πελάτη
  category: p.category === 'client' ? 'client' : 'lab',
}))

export const featuredProjects = projects.filter((p) => p.featured)
export const clientProjects = projects.filter((p) => p.category === 'client')

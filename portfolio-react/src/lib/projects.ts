import rawProjects from '../data/projects.json'

export interface Project {
  title: string
  image: string
  tech: string[]
  description?: string
  liveUrl: string
  codeUrl: string
  featured: boolean
}

/** Normalize the legacy "./assets/..." paths to public-root "/assets/..." */
export const projects: Project[] = (rawProjects as Array<Omit<Project, 'featured'> & { featured?: boolean }>).map(
  (p) => ({
    ...p,
    image: p.image.replace(/^\.\//, '/'),
    featured: Boolean(p.featured),
  }),
)

export const featuredProjects = projects.filter((p) => p.featured)

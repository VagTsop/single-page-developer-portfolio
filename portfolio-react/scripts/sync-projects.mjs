// Single source of truth: src/data/projects.json (the React site).
// This script mirrors it to the legacy vanilla site's assets/data so both
// stay in sync automatically on every dev/build run.
import { copyFileSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const here = dirname(fileURLToPath(import.meta.url))
const src = resolve(here, '../src/data/projects.json')
const dest = resolve(here, '../../assets/data/projects.json')
mkdirSync(dirname(dest), { recursive: true })
copyFileSync(src, dest)
console.log('[sync-projects] mirrored src/data/projects.json -> assets/data/projects.json')

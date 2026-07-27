// Renders the built SPA in headless Chrome and writes the fully hydrated
// DOM back into dist/index.html, so crawlers that don't execute JS
// (most AI answer engines, some search bots) see real content instead of
// an empty <div id="root">.
import { createServer } from 'node:http'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import handler from 'serve-handler'
import puppeteer from 'puppeteer'

const DIST_DIR = path.resolve(import.meta.dirname, '..', 'dist')
const PORT = 4173

const server = createServer((req, res) => handler(req, res, { public: DIST_DIR }))

await new Promise((resolve) => server.listen(PORT, resolve))

const browser = await puppeteer.launch({ headless: true })
try {
  const page = await browser.newPage()
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' })
  // let scroll-triggered/in-view animations settle so their content is in the DOM
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await new Promise((r) => setTimeout(r, 1500))

  const html = await page.content()
  await writeFile(path.join(DIST_DIR, 'index.html'), html)
  console.log('Prerendered dist/index.html')
} finally {
  await browser.close()
  server.close()
}

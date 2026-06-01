/**
 * Cloudflare Pages middleware — runs on every request.
 * Server-side 301 from the default *.pages.dev URL to the canonical domain,
 * so crawlers always consolidate on vagtsop.dev. Preview hash URLs are left
 * untouched (only the clean project hostname redirects).
 */
export async function onRequest(context) {
  const url = new URL(context.request.url)

  if (url.hostname === 'single-page-developer-portfolio.pages.dev') {
    url.hostname = 'vagtsop.dev'
    url.protocol = 'https:'
    return Response.redirect(url.toString(), 301)
  }

  return context.next()
}

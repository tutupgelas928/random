export async function onRequestGet(context) {
  const host = context.request.headers.get("host");

  let sitemaps = [];

  for (let i = 1; i <= 100; i++) {
    const num = String(i).padStart(2, "0");
    sitemaps.push(`https://${host}/sitemap/01/sitemap${num}.xml`);
  }

  // shuffle
  for (let i = sitemaps.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sitemaps[i], sitemaps[j]] = [sitemaps[j], sitemaps[i]];
  }

  const sitemapList = sitemaps.map(url => `Sitemap: ${url}`).join("\n");

  const body = `User-agent: *
Allow: /

${sitemapList}`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}

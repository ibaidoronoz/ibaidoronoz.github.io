import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { LOCALES, HTML_LANG, path } from '../lib/i18n';

export const GET: APIRoute = async ({ site }) => {
  const projects = await getCollection('projects');
  const paths = ['', 'work/', 'cv/', ...projects.map((project) => `projects/${project.id}/`)];

  const urls = paths
    .map((to) => {
      const alternates = LOCALES.map(
        (lang) =>
          `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[lang]}" href="${new URL(path(lang, `/${to}`), site).href}"/>`,
      ).join('\n');
      const main = `  <url>\n    <loc>${new URL(path('en', `/${to}`), site).href}</loc>\n${alternates}\n  </url>`;

      const otherLocales = LOCALES.filter((lang) => lang !== 'en')
        .map(
          (lang) =>
            `  <url>\n    <loc>${new URL(path(lang, `/${to}`), site).href}</loc>\n${alternates}\n  </url>`,
        )
        .join('\n');

      return `${main}\n${otherLocales}`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

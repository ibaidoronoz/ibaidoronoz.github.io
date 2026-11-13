// Locales, routing helpers and template formatting.
// English lives at the root, every other language under /<lang>/.

export const LOCALES = ['en', 'es'] as const;
export type Lang = (typeof LOCALES)[number];

export const DEFAULT_LANG: Lang = 'en';
export const LANGS: Lang[] = [...LOCALES];

export const LANG_LABEL: Record<Lang, string> = { en: 'EN', es: 'ES' };
export const LANG_NAME: Record<Lang, string> = { en: 'English', es: 'Español' };
export const HTML_LANG: Record<Lang, string> = { en: 'en', es: 'es' };
export const ALT_LOCALES: Record<Lang, string> = { en: 'en_GB', es: 'es_ES' };

/** Path for a language: `/work` in the default locale, `/es/work` elsewhere. */
export function path(lang: Lang, to = '/'): string {
  const clean = to.startsWith('/') ? to : `/${to}`;
  if (lang === DEFAULT_LANG) return clean;
  return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
}

/** Language of a pathname, plus the path without its locale prefix. */
export function parsePath(pathname: string): { lang: Lang; rest: string } {
  for (const code of LOCALES) {
    if (code === DEFAULT_LANG) continue;
    if (pathname === `/${code}` || pathname === `/${code}/`) return { lang: code, rest: '/' };
    if (pathname.startsWith(`/${code}/`)) return { lang: code, rest: pathname.slice(code.length + 1) };
  }
  return { lang: DEFAULT_LANG, rest: pathname || '/' };
}

/** The same page in another language, for the switcher and hreflang links. */
export function altPath(pathname: string, to: Lang): string {
  const { rest } = parsePath(pathname);
  return path(to, rest);
}

/** Minimal `{name}` interpolation: no dependency, no template language. */
export function t(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''));
}

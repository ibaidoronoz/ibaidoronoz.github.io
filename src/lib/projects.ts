import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

type EnProject = CollectionEntry<'projects'>;

export interface Project {
  id: string;
  data: EnProject['data'];
}

export type Tier = EnProject['data']['tier'];

/** Default AI-role values, translated. Any project-specific text passes through. */
const AI_ROLE_ES: Record<string, string> = { Me: 'Yo', 'AI agents': 'Agentes de IA' };

/** Spanish overrides by project id, or an empty map for English. */
async function overrides(lang: Lang): Promise<Map<string, CollectionEntry<'projectsEs'>['data']>> {
  if (lang === 'en') return new Map();
  const all = await getCollection('projectsEs');
  return new Map(all.map((entry) => [entry.id, entry.data]));
}

function merge(entry: EnProject, es: CollectionEntry<'projectsEs'>['data'] | undefined): Project {
  if (!es) return { id: entry.id, data: entry.data };

  const translateRole = (value: string) => AI_ROLE_ES[value] ?? value;
  const components = entry.data.components.map((component) => ({
    ...component,
    role: es.components?.find((item) => item.name === component.name)?.role ?? component.role,
  }));

  const baseDiagram = entry.data.diagram;
  const diagram =
    baseDiagram && typeof baseDiagram === 'object' && es.diagram
      ? {
          ...baseDiagram,
          nodes: baseDiagram.nodes.map((node, i) => ({
            title: es.diagram?.nodes[i]?.title ?? node.title,
            sub: es.diagram?.nodes[i]?.sub ?? node.sub,
          })),
        }
      : baseDiagram;

  return {
    id: entry.id,
    data: {
      ...entry.data,
      oneLiner: es.oneLiner,
      highlights: es.highlights ?? entry.data.highlights,
      underTheHood: es.underTheHood ?? entry.data.underTheHood,
      fact: entry.data.fact && es.fact ? { ...entry.data.fact, label: es.fact.label } : entry.data.fact,
      components,
      diagram,
      aiRole: {
        spec: translateRole(entry.data.aiRole.spec),
        impl: translateRole(entry.data.aiRole.impl),
        audit: translateRole(entry.data.aiRole.audit),
      },
    },
  };
}

/** All projects of one tier with the requested language applied, sorted by `order`. */
export async function projectsByTier(tier: Tier, lang: Lang = 'en'): Promise<Project[]> {
  const [all, es] = await Promise.all([getCollection('projects'), overrides(lang)]);
  return all
    .filter((p) => p.data.tier === tier)
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => merge(entry, es.get(entry.id)));
}

/** Every project in display order, for the work index and the stack map. */
export async function allProjects(lang: Lang = 'en'): Promise<Project[]> {
  const tiers: Tier[] = ['featured', 'selected', 'archive'];
  const ordered: Project[] = [];
  for (const tier of tiers) ordered.push(...(await projectsByTier(tier, lang)));
  return ordered;
}

/** One project with the requested language applied, or undefined. */
export async function projectById(id: string, lang: Lang = 'en'): Promise<Project | undefined> {
  const [all, es] = await Promise.all([getCollection('projects'), overrides(lang)]);
  const entry = all.find((candidate) => candidate.id === id);
  return entry ? merge(entry, es.get(entry.id)) : undefined;
}

/**
 * The build fails when a translation is missing, so a half-translated site never ships:
 * - every featured project has a case study in the requested locale;
 * - every project id has a Spanish entry, and featured/selected ones have full text;
 * - every project has a Spanish case study, because every project has a page.
 */
export async function assertCaseStudies(lang: Lang = 'en'): Promise<void> {
  const [all, studies, studiesEs, es] = await Promise.all([
    getCollection('projects'),
    getCollection('caseStudies'),
    getCollection('caseStudiesEs'),
    overrides(lang),
  ]);

  const source = lang === 'es' ? studiesEs : studies;
  const covered = new Set(source.map((s) => s.data.project));

  const featured = all.filter((p) => p.data.tier === 'featured');
  const missing = featured.filter((p) => !covered.has(p.id)).map((p) => p.id);
  if (missing.length > 0) {
    throw new Error(`[${lang}] featured projects without a case study: ${missing.join(', ')}`);
  }

  const known = new Set(all.map((p) => p.id));
  const orphan = source.filter((s) => !known.has(s.data.project)).map((s) => s.id);
  if (orphan.length > 0) {
    throw new Error(`[${lang}] case studies pointing at an unknown project: ${orphan.join(', ')}`);
  }

  if (lang === 'es') {
    const withoutText = all.filter((p) => !es.has(p.id)).map((p) => p.id);
    if (withoutText.length > 0) {
      throw new Error(`[es] projects without a Spanish entry: ${withoutText.join(', ')}`);
    }

    const incomplete = all
      .filter((p) => p.data.tier !== 'archive')
      .filter((p) => {
        const entry = es.get(p.id);
        return !entry || (entry.highlights?.length ?? 0) === 0 || (entry.underTheHood?.length ?? 0) === 0;
      })
      .map((p) => p.id);
    if (incomplete.length > 0) {
      throw new Error(`[es] featured/selected projects missing highlights or underTheHood: ${incomplete.join(', ')}`);
    }

    const noStudy = all.filter((p) => !covered.has(p.id)).map((p) => p.id);
    if (noStudy.length > 0) {
      throw new Error(`[es] projects without a Spanish case study: ${noStudy.join(', ')}`);
    }
  }
}

/** Projects that have a page in this locale, in display order. */
export async function projectsWithPage(lang: Lang = 'en'): Promise<Project[]> {
  const studies = await getCollection(lang === 'es' ? 'caseStudiesEs' : 'caseStudies');
  const covered = new Set(studies.map((s) => s.data.project));
  return (await allProjects(lang)).filter((p) => covered.has(p.id));
}

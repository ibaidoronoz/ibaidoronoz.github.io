import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Tier = Project['data']['tier'];

/** All projects of one tier, sorted by their `order` field. */
export async function projectsByTier(tier: Tier): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.filter((p) => p.data.tier === tier).sort((a, b) => a.data.order - b.data.order);
}

/** Every featured project must have a case study. Any other tier may have one. */
export async function assertCaseStudies(): Promise<void> {
  const all = await getCollection('projects');
  const featured = all.filter((p) => p.data.tier === 'featured');
  const studies = await getCollection('caseStudies');
  const covered = new Set(studies.map((s) => s.data.project));

  const missing = featured.filter((p) => !covered.has(p.id)).map((p) => p.id);
  if (missing.length > 0) {
    throw new Error(`Featured projects without a case study: ${missing.join(', ')}`);
  }

  const known = new Set(all.map((p) => p.id));
  const orphan = studies.filter((s) => !known.has(s.data.project)).map((s) => s.id);
  if (orphan.length > 0) {
    throw new Error(`Case studies pointing at an unknown project: ${orphan.join(', ')}`);
  }
}

/** Ids of the projects that have a page, in display order. */
export async function projectsWithPage(): Promise<Project[]> {
  const studies = new Set((await getCollection('caseStudies')).map((s) => s.data.project));
  const tiers: Tier[] = ['featured', 'selected', 'archive'];
  const ordered: Project[] = [];
  for (const tier of tiers) ordered.push(...(await projectsByTier(tier)));
  return ordered.filter((p) => studies.has(p.id));
}

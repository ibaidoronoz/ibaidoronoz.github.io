import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Tier = Project['data']['tier'];

/** All projects of one tier, sorted by their `order` field. */
export async function projectsByTier(tier: Tier): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.filter((p) => p.data.tier === tier).sort((a, b) => a.data.order - b.data.order);
}

/** Every featured project must have exactly one case study. Fails the build otherwise. */
export async function assertCaseStudies(): Promise<void> {
  const featured = await projectsByTier('featured');
  const studies = await getCollection('caseStudies');
  const covered = new Set(studies.map((s) => s.data.project));
  const missing = featured.filter((p) => !covered.has(p.id)).map((p) => p.id);
  if (missing.length > 0) {
    throw new Error(`Featured projects without a case study: ${missing.join(', ')}`);
  }
  const known = new Set(featured.map((p) => p.id));
  const orphan = studies.filter((s) => !known.has(s.data.project)).map((s) => s.id);
  if (orphan.length > 0) {
    throw new Error(`Case studies pointing at a non-featured project: ${orphan.join(', ')}`);
  }
}

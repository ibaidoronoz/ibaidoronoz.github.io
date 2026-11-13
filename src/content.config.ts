import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { AREAS, STATUS, type Area, type Status } from './data/taxonomy';

const areaKeys = Object.keys(AREAS) as [Area, ...Area[]];
const statusKeys = Object.keys(STATUS) as [Status, ...Status[]];

const projects = defineCollection({
  loader: file('src/data/projects.yaml'),
  schema: z.object({
    name: z.string(),
    tier: z.enum(['featured', 'selected', 'archive']),
    order: z.number().int(),
    areas: z.array(z.enum(areaKeys)).min(1),
    status: z.enum(statusKeys),
    oneLiner: z.string().max(140),
    highlights: z.array(z.string()).max(4).default([]),
    // Technical facts for the collapsed "under the hood" block. Benefit-first copy lives
    // in oneLiner; this is where the architecture and the trade-offs go.
    underTheHood: z.array(z.string()).max(4).default([]),
    stack: z.array(z.string()).min(1),
    // One number (or short phrase) for the poster on cards and short pages. Facts only.
    fact: z
      .object({ value: z.string(), label: z.string() })
      .optional(),
    // Other repos merged into this entry (e.g. the Engineering Platform).
    includes: z.array(z.string()).default([]),
    // Pieces of an umbrella project, shown as a logo strip on the card and in the study.
    components: z
      .array(
        z.object({
          name: z.string(),
          role: z.string(),
          logo: z.string().startsWith('/logos/').optional(),
          accent: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        }),
      )
      .max(5)
      .default([]),
    // Anchor visual for the case study: a named hand-made diagram or a generated one.
    diagram: z
      .union([
        z.string(),
        z.object({
          kind: z.enum(['flow', 'fork', 'layers', 'loop']),
          nodes: z.array(z.object({ title: z.string(), sub: z.string() })).min(3).max(6),
          highlight: z.number().int().min(0).max(5).optional(),
        }),
      ])
      .optional(),
    // Hex colour used for gradients and glows on this project's card and page.
    // Path under /public, e.g. /logos/plutus.png. Rendered on cards and the case-study page.
    logo: z.string().startsWith('/logos/').optional(),
    accent: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#7c5cff'),
    aiRole: z
      .object({ spec: z.string(), impl: z.string(), audit: z.string() })
      .default({ spec: 'Me', impl: 'AI agents', audit: 'Me' }),
  }),
});

const caseStudySchema = z.object({
  project: z.string(),
  title: z.string(),
  draft: z.boolean().default(true),
  // 'short' renders three structured blocks on one screen; 'long' renders the full prose.
  format: z.enum(['short', 'long']).default('long'),
  // Long studies: the decisions as cards, with an optional "why" that expands.
  decisions: z
    .array(z.object({ title: z.string(), body: z.string(), why: z.string().optional() }))
    .max(6)
    .default([]),
  // Short studies: the three blocks (problem, decision, proof).
  blocks: z
    .array(z.object({ label: z.string(), title: z.string(), body: z.string() }))
    .max(4)
    .default([]),
  // Headline numbers shown big in the case-study hero. Facts only.
  stats: z.array(z.object({ value: z.string(), label: z.string() })).max(4).default([]),
  // Animated pipeline rendered under the hero.
  flow: z.array(z.object({ label: z.string(), sub: z.string() })).max(6).default([]),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/case-studies' }),
  schema: caseStudySchema,
});

// Spanish case studies: same schema, one file per project, under es/.
const caseStudiesEs = defineCollection({
  loader: glob({ pattern: 'es/*.md', base: './src/content/case-studies' }),
  schema: caseStudySchema,
});

// Spanish text for each project. Structure, logos and stack stay in projects.yaml;
// only the prose is translated here, keyed by id.
const projectsEs = defineCollection({
  loader: file('src/data/projects.es.yaml'),
  schema: z.object({
    id: z.string(),
    oneLiner: z.string().max(140),
    highlights: z.array(z.string()).max(4).optional(),
    underTheHood: z.array(z.string()).max(4).optional(),
    fact: z.object({ label: z.string() }).optional(),
    components: z.array(z.object({ name: z.string(), role: z.string() })).optional(),
    diagram: z
      .object({ nodes: z.array(z.object({ title: z.string(), sub: z.string() })) })
      .optional(),
  }),
});

export const collections = { projects, projectsEs, caseStudies, caseStudiesEs };

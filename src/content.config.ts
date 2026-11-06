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
    stack: z.array(z.string()).min(1),
    // Other repos merged into this entry (e.g. the Engineering Platform).
    includes: z.array(z.string()).default([]),
    // Hex colour used for gradients and glows on this project's card and page.
    // Path under /public, e.g. /logos/plutus.png. Rendered on cards and the case-study page.
    logo: z.string().startsWith('/logos/').optional(),
    accent: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#7c5cff'),
    aiRole: z
      .object({ spec: z.string(), impl: z.string(), audit: z.string() })
      .default({ spec: 'Me', impl: 'AI agents', audit: 'Me' }),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    project: z.string(),
    title: z.string(),
    draft: z.boolean().default(true),
    // Headline numbers shown big in the case-study hero. Facts only.
    stats: z.array(z.object({ value: z.string(), label: z.string() })).max(4).default([]),
    // Animated pipeline rendered under the hero.
    flow: z.array(z.object({ label: z.string(), sub: z.string() })).max(6).default([]),
  }),
});

export const collections = { projects, caseStudies };

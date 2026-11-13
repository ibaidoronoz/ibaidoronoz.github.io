import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { projectSvg, svgToPng } from '../../../lib/og';
import { ui } from '../../../data/i18n/ui';
import { projectById } from '../../../lib/projects';

export const getStaticPaths = (async () => {
  const projects = await getCollection('projects');
  return projects.map((project) => ({ params: { id: project.id } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const project = await projectById(params.id ?? '', 'es');
  if (!project) return new Response('Not found', { status: 404 });
  const area = project.data.areas[0] ? ui.es.areas[project.data.areas[0] as keyof typeof ui.es.areas] : '';
  return svgToPng(projectSvg(project.data, area));
};

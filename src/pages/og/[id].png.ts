import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { projectSvg, svgToPng } from '../../lib/og';
import { ui } from '../../data/i18n/ui';

export const getStaticPaths = (async () => {
  const projects = await getCollection('projects');
  return projects.map((project) => ({ params: { id: project.id }, props: { project: project.data } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const project = props.project as Parameters<typeof projectSvg>[0] & { areas: string[] };
  const area = project.areas[0] ? ui.en.areas[project.areas[0] as keyof typeof ui.en.areas] : '';
  return svgToPng(projectSvg(project, area));
};

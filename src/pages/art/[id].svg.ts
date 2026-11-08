import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { fieldSvg } from '../../lib/art';

export const getStaticPaths = (async () => {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { id: project.id },
    props: { accent: project.data.accent },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params, props }) => {
  const svg = fieldSvg(params.id ?? 'project', props.accent as string);

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};

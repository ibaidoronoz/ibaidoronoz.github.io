import type { APIRoute } from 'astro';
import { homeSvg, svgToPng } from '../../lib/og';
import { getSite } from '../../data/site';

export const GET: APIRoute = async () => {
  const site = getSite('en');
  return svgToPng(
    homeSvg({
      kicker: 'PAYMENTS × AI AGENTS',
      name: site.name,
      role: site.role,
      focus: site.focus,
      lines: [
        'Ten years building payment systems where errors cost money.',
        'Now I design how engineering teams ship with AI agents.',
      ],
      location: site.location,
    }),
  );
};

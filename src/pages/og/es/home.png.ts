import type { APIRoute } from 'astro';
import { homeSvg, svgToPng } from '../../../lib/og';
import { getSite } from '../../../data/site';

export const GET: APIRoute = async () => {
  const site = getSite('es');
  return svgToPng(
    homeSvg({
      kicker: 'PAGOS × AGENTES DE IA',
      name: site.name,
      role: site.role,
      focus: site.focus,
      lines: [
        'Diez años construyendo sistemas de pago donde un error cuesta dinero.',
        'Ahora diseño cómo los equipos entregan con agentes de IA.',
      ],
      location: site.location,
    }),
  );
};

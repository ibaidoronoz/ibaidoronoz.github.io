// CV content, one object per language. Everything here is already public on the site:
// no email, no phone, no employer detail beyond what site.ts already states.

import type { Lang } from '../lib/i18n';

export interface Cv {
  headline: string;
  subtitle: string;
  profile: string[];
  experience: { company: string; role: string; period: string; points: string[] }[];
  projects: { name: string; line: string }[];
  education: { title: string; place: string; period: string }[];
  stack: string[];
  languages: string;
  location: string;
}

const links = {
  linkedin: 'https://www.linkedin.com/in/ibai-d-oronoz',
  github: 'https://github.com/ibaidoronoz',
  site: 'https://ibaidoronoz.github.io',
};

export const CV_LINKS = links;

export const CV: Record<Lang, Cv> = {
  en: {
    headline: 'Ibai Díez Oronoz',
    subtitle: 'Senior Software Engineer — Payments & AI Engineering',
    profile: [
      'Ten years building payment systems where errors cost money: orchestration, smart routing, SWIFT and FIX integrations.',
      'Now I also design how engineering teams ship with AI agents: governed workflows, versioned playbooks and human gates where being wrong is expensive.',
    ],
    experience: [
      {
        company: 'ALTEN · Getnet Platforms (PaymentsHub)',
        role: 'Senior Software Engineer',
        period: '2026 — present',
        points: [
          'Backend microservices for payment orchestration and smart routing.',
          'Lead AI enablement: standardised, governed workflows with Devin and Windsurf, with retrieval-augmented context.',
        ],
      },
      {
        company: 'ALTEN · PagoNxt (EMI)',
        role: 'Senior Software Engineer',
        period: '2022 — 2025',
        points: [
          'Payment infrastructure and smart-routing microservices; SWIFT and FIX integrations.',
        ],
      },
      {
        company: 'ALTEN · PagoFX',
        role: 'Software Engineer',
        period: '2020 — 2022',
        points: ['Backend services for cross-border payments inside the Santander ecosystem.'],
      },
      {
        company: 'ALTEN · Holcim',
        role: 'Software Engineer',
        period: '2018 — 2020',
        points: ['Enterprise applications and hybrid mobile solutions (Angular, Ionic, Java).'],
      },
    ],
    projects: [
      {
        name: 'Kizuna',
        line: 'Governed AI engineering: playbooks, one port for eight agent runtimes, human gates and a full audit trail.',
      },
      {
        name: 'Plutus',
        line: 'Six exchanges and seventeen blockchains reconciled into a correct FIFO report for Spanish tax.',
      },
      {
        name: 'Txango',
        line: 'Offline Android hiking app: vector maps, 2,034 routes and no Google services.',
      },
      {
        name: 'Engineering Platform',
        line: 'Twenty repositories under one validated contract: shared context, gateway, gate and UI engine.',
      },
    ],
    education: [
      { title: 'MSc, Computational Engineering and Intelligent Systems', place: 'University of the Basque Country', period: '2015 — 2016' },
      { title: 'BSc, Computer Engineering (Software Engineering)', place: 'University of the Basque Country', period: '2011 — 2015' },
    ],
    stack: [
      'TypeScript', 'Node.js', 'Java', 'Spring Boot', 'NestJS', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB',
      'SQLite', 'Docker', 'Kubernetes', 'Microservices', 'SWIFT', 'FIX', 'React', 'Kotlin', 'Jetpack Compose',
      'Claude Code', 'MCP',
    ],
    languages: 'Spanish (native), Basque (native), English (professional)',
    location: 'Basque Country, Spain',
  },
  es: {
    headline: 'Ibai Díez Oronoz',
    subtitle: 'Ingeniero de software senior — Pagos e ingeniería de IA',
    profile: [
      'Diez años construyendo sistemas de pago donde un error cuesta dinero: orquestación, enrutamiento inteligente e integraciones SWIFT y FIX.',
      'Ahora también diseño cómo los equipos de ingeniería entregan con agentes de IA: flujos gobernados, playbooks versionados y puertas humanas donde equivocarse es caro.',
    ],
    experience: [
      {
        company: 'ALTEN · Getnet Platforms (PaymentsHub)',
        role: 'Ingeniero de software senior',
        period: '2026 — actualidad',
        points: [
          'Microservicios backend para orquestación de pagos y enrutamiento inteligente.',
          'Lidero la adopción de IA: flujos estandarizados y gobernados con Devin y Windsurf, con contexto aumentado por recuperación.',
        ],
      },
      {
        company: 'ALTEN · PagoNxt (EMI)',
        role: 'Ingeniero de software senior',
        period: '2022 — 2025',
        points: ['Infraestructura de pagos y microservicios de enrutamiento inteligente; integraciones SWIFT y FIX.'],
      },
      {
        company: 'ALTEN · PagoFX',
        role: 'Ingeniero de software',
        period: '2020 — 2022',
        points: ['Servicios backend para pagos transfronterizos dentro del ecosistema Santander.'],
      },
      {
        company: 'ALTEN · Holcim',
        role: 'Ingeniero de software',
        period: '2018 — 2020',
        points: ['Aplicaciones empresariales y soluciones móviles híbridas (Angular, Ionic, Java).'],
      },
    ],
    projects: [
      {
        name: 'Kizuna',
        line: 'Ingeniería de IA gobernada: playbooks, un puerto para ocho runtimes, puertas humanas y traza de auditoría.',
      },
      {
        name: 'Plutus',
        line: 'Seis exchanges y diecisiete blockchains conciliados en un informe FIFO correcto para Hacienda.',
      },
      {
        name: 'Txango',
        line: 'App Android de senderismo sin conexión: mapas vectoriales, 2.034 rutas y ningún servicio de Google.',
      },
      {
        name: 'Engineering Platform',
        line: 'Veinte repositorios bajo un contrato validado: contexto compartido, puerta de entrada, acceso y motor de UI.',
      },
    ],
    education: [
      { title: 'Máster, Ingeniería Computacional y Sistemas Inteligentes', place: 'Universidad del País Vasco', period: '2015 — 2016' },
      { title: 'Grado, Ingeniería Informática (Ingeniería del Software)', place: 'Universidad del País Vasco', period: '2011 — 2015' },
    ],
    stack: [
      'TypeScript', 'Node.js', 'Java', 'Spring Boot', 'NestJS', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB',
      'SQLite', 'Docker', 'Kubernetes', 'Microservicios', 'SWIFT', 'FIX', 'React', 'Kotlin', 'Jetpack Compose',
      'Claude Code', 'MCP',
    ],
    languages: 'Castellano (nativo), euskera (nativo), inglés (profesional)',
    location: 'País Vasco, España',
  },
};

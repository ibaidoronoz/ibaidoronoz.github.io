// CV content, one object per language.
// Public by design: the email is the only contact detail on the site; no phone.
// Everything else is a fact from the repositories or the LinkedIn profile.

import type { Lang } from '../lib/i18n';

export const CV_EMAIL = 'ibaidiezoronoz93@gmail.com';

export const CV_LINKS = {
  linkedin: 'https://www.linkedin.com/in/ibai-d-oronoz',
  github: 'https://github.com/ibaidoronoz',
  site: 'https://ibaidoronoz.github.io',
};

export interface CvRole {
  company: string;
  client?: string;
  role: string;
  period: string;
  points: string[];
  stack: string[];
}

export interface CvEarlier {
  company: string;
  role: string;
  period: string;
  note: string;
}

export interface CvProject {
  name: string;
  line: string;
  metric: { value: string; label: string };
  accent: string;
}

export interface Cv {
  name: string;
  role: string;
  location: string;
  profile: string[];
  highlights: { value: string; label: string }[];
  roles: CvRole[];
  earlier: CvEarlier[];
  projects: CvProject[];
  education: { title: string; place: string; period: string }[];
  training: { title: string; place: string; period: string }[];
  certifications: string[];
  languages: { name: string; level: string }[];
  stack: { label: string; items: string[] }[];
}

const projectsBase = [
  { name: 'Kizuna', accent: '#8b5cf6' },
  { name: 'Plutus', accent: '#4f6bff' },
  { name: 'Crypto Market', accent: '#ff4500' },
  { name: 'Txango', accent: '#d8bb56' },
  { name: 'Engineering Platform', accent: '#d8590e' },
  { name: 'Oracle', accent: '#38bdf8' },
];

const en: Cv = {
  name: 'Ibai Díez Oronoz',
  role: 'Senior Software Engineer — Payments Infrastructure & AI Engineering',
  location: 'Basque Country, Spain',
  profile: [
    'Ten years building backend systems where errors cost money: payment orchestration, smart routing, SWIFT and FIX integrations, and distributed architectures that have to reconcile before they can move on.',
    'In parallel I lead AI enablement for engineering teams: governed agent workflows, versioned playbooks and human gates where being wrong is expensive.',
  ],
  highlights: [
    { value: '10+', label: 'years in payments' },
    { value: '20', label: 'repositories, one contract' },
    { value: '164', label: 'audit findings, prioritised' },
    { value: '19', label: 'products of my own' },
  ],
  roles: [
    {
      company: 'ALTEN · Getnet Platforms',
      client: 'PaymentsHub',
      role: 'Senior Software Engineer',
      period: '2026 — present',
      points: [
        'Backend microservices for payment orchestration and smart routing; SWIFT and FIX network integrations.',
        'AI enablement lead: standardised, governed workflows with Devin and Windsurf, including retrieval-augmented context for internal assistants.',
      ],
      stack: ['Node.js', 'TypeScript', 'Java', 'PostgreSQL', 'Docker', 'Kubernetes'],
    },
    {
      company: 'ALTEN · PagoNxt',
      client: 'EMI',
      role: 'Senior Software Engineer',
      period: '2022 — 2025',
      points: [
        'Payment infrastructure and smart-routing microservices; SWIFT and FIX integrations.',
        'APIs and distributed payment systems, working with product, QA and infrastructure in agile teams.',
      ],
      stack: ['Node.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Docker', 'Kubernetes'],
    },
    {
      company: 'ALTEN · Infrastructure Safety',
      role: 'Software Engineer, Android',
      period: '2022',
      points: ['Android app for road-worker safety, with on-device image analysis.'],
      stack: ['Android', 'Kotlin'],
    },
    {
      company: 'ALTEN · PagoFX',
      client: 'EMI',
      role: 'Software Engineer',
      period: '2020 — 2022',
      points: ['Backend services for cross-border payments inside the Santander ecosystem.'],
      stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Kubernetes'],
    },
    {
      company: 'ALTEN · Holcim',
      role: 'Software Engineer',
      period: '2018 — 2020',
      points: ['Enterprise applications and hybrid mobile solutions for a global industrial group.'],
      stack: ['Angular', 'Ionic', 'Java', 'webMethods'],
    },
  ],
  earlier: [
    { company: 'PKF Attest', role: 'Software Engineer', period: '2017', note: 'Frontend, backend and databases for corporate projects (C#, C++, SharePoint, PostgreSQL).' },
    { company: 'Senddo', role: 'Software Engineer', period: '2016 — 2017', note: 'Backend and database for a Magento 2 e-commerce platform (PHP, MySQL/PostgreSQL).' },
    { company: 'EUSTAT', role: 'Researcher', period: '2016', note: 'Interactive public-data web app with statistical storytelling (Laravel, R).' },
    { company: 'Dinycon Sistemas', role: 'Software Engineer', period: '2015 — 2016', note: 'Crowd-counting systems: frontend, backend and databases (Laravel, MySQL, MongoDB).' },
    { company: 'BIC Gipuzkoa · HolaCampus', role: 'Software Engineer', period: '2014', note: 'University social network for students (Symfony, PostgreSQL).' },
  ],
  projects: [
    {
      ...projectsBase[0],
      line: 'Governed AI engineering: versioned playbooks, one port for eight agent runtimes, human gates and a journal per transition.',
      metric: { value: '164', label: 'findings in one audit' },
    },
    {
      ...projectsBase[1],
      line: 'Six exchanges and seventeen blockchains reconciled into a correct FIFO report for Spanish tax, on an isolated database per user.',
      metric: { value: '17', label: 'blockchains reconciled' },
    },
    {
      ...projectsBase[2],
      line: 'Crypto dashboards inside Reddit, installed subreddit by subreddit, refreshed on a schedule and cached so a popular post never hits the API twice.',
      metric: { value: '15 min', label: 'refresh with no key' },
    },
    {
      ...projectsBase[3],
      line: 'Offline Android hiking app: vector maps, 2,034 routes, terrain profile and no Google services anywhere.',
      metric: { value: '2,034', label: 'routes offline' },
    },
    {
      ...projectsBase[4],
      line: 'Twenty repositories under one validated contract: shared context, gateway, access gate and UI engine.',
      metric: { value: '20', label: 'repositories, one contract' },
    },
    {
      ...projectsBase[5],
      line: 'Service control panel with bounded recovery: status, logs, metrics and deploys on one screen.',
      metric: { value: '80', label: 'test files' },
    },
  ],
  education: [
    { title: 'MSc, Computational Engineering and Intelligent Systems', place: 'University of the Basque Country (UPV/EHU)', period: '2015 — 2016' },
    { title: 'BSc, Computer Engineering (Software Engineering)', place: 'University of the Basque Country (UPV/EHU)', period: '2011 — 2015' },
  ],
  training: [
    { title: 'Introduction to Xamarin, Android, iOS and Azure', place: 'CampusMVP', period: '2017' },
    { title: 'Android: introduction to programming', place: 'Universitat Politècnica de València', period: '2013 — 2014' },
  ],
  certifications: [
    'Introduction to agent skills',
    'AI Fluency for students',
    'COBOL: start programming',
  ],
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'Basque', level: 'Native' },
    { name: 'English', level: 'Professional' },
  ],
  stack: [
    { label: 'Payments', items: ['SWIFT', 'FIX', 'Smart routing', 'Orchestration'] },
    { label: 'Backend', items: ['TypeScript', 'Node.js', 'Java', 'Spring Boot', 'NestJS', 'Python', 'FastAPI', 'C#', 'PostgreSQL', 'MongoDB', 'Redis', 'Microservices'] },
    { label: 'AI & agents', items: ['Claude Code', 'Devin', 'Windsurf', 'MCP', 'Local models'] },
    { label: 'Web & mobile', items: ['React', 'Next.js', 'Angular', 'Ionic', 'Kotlin', 'Compose', 'Tauri'] },
    { label: 'Platform', items: ['Docker', 'Kubernetes', 'Caddy', 'Playwright', 'Vitest'] },
  ],
};

const es: Cv = {
  name: 'Ibai Díez Oronoz',
  role: 'Ingeniero de software senior — Infraestructura de pagos e ingeniería de IA',
  location: 'País Vasco, España',
  profile: [
    'Diez años construyendo sistemas backend donde un error cuesta dinero: orquestación de pagos, enrutamiento inteligente, integraciones SWIFT y FIX, y arquitecturas distribuidas que tienen que conciliar antes de seguir.',
    'En paralelo lidero la adopción de IA en equipos de ingeniería: flujos de agentes gobernados, playbooks versionados y puertas humanas donde equivocarse es caro.',
  ],
  highlights: [
    { value: '10+', label: 'años en pagos' },
    { value: '20', label: 'repositorios, un contrato' },
    { value: '164', label: 'hallazgos priorizados' },
    { value: '19', label: 'productos propios' },
  ],
  roles: [
    {
      company: 'ALTEN · Getnet Platforms',
      client: 'PaymentsHub',
      role: 'Ingeniero de software senior',
      period: '2026 — actualidad',
      points: [
        'Microservicios backend para orquestación de pagos y enrutamiento inteligente; integraciones con SWIFT y FIX.',
        'Lidero la adopción de IA: flujos estandarizados y gobernados con Devin y Windsurf, incluido contexto aumentado por recuperación para asistentes internos.',
      ],
      stack: ['Node.js', 'TypeScript', 'Java', 'PostgreSQL', 'Docker', 'Kubernetes'],
    },
    {
      company: 'ALTEN · PagoNxt',
      client: 'EMI',
      role: 'Ingeniero de software senior',
      period: '2022 — 2025',
      points: [
        'Infraestructura de pagos y microservicios de enrutamiento inteligente; integraciones SWIFT y FIX.',
        'APIs y sistemas de pago distribuidos, trabajando con producto, QA e infraestructura en equipos ágiles.',
      ],
      stack: ['Node.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Docker', 'Kubernetes'],
    },
    {
      company: 'ALTEN · Seguridad vial',
      role: 'Ingeniero de software, Android',
      period: '2022',
      points: ['App Android para la seguridad de operarios de carretera, con análisis de imagen en el dispositivo.'],
      stack: ['Android', 'Kotlin'],
    },
    {
      company: 'ALTEN · PagoFX',
      client: 'EMI',
      role: 'Ingeniero de software',
      period: '2020 — 2022',
      points: ['Servicios backend para pagos transfronterizos dentro del ecosistema Santander.'],
      stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Kubernetes'],
    },
    {
      company: 'ALTEN · Holcim',
      role: 'Ingeniero de software',
      period: '2018 — 2020',
      points: ['Aplicaciones empresariales y soluciones móviles híbridas para un grupo industrial global.'],
      stack: ['Angular', 'Ionic', 'Java', 'webMethods'],
    },
  ],
  earlier: [
    { company: 'PKF Attest', role: 'Ingeniero de software', period: '2017', note: 'Frontend, backend y bases de datos para proyectos corporativos (C#, C++, SharePoint, PostgreSQL).' },
    { company: 'Senddo', role: 'Ingeniero de software', period: '2016 — 2017', note: 'Backend y base de datos para una plataforma de e-commerce en Magento 2 (PHP, MySQL/PostgreSQL).' },
    { company: 'EUSTAT', role: 'Investigador', period: '2016', note: 'App web interactiva de datos públicos con narración estadística (Laravel, R).' },
    { company: 'Dinycon Sistemas', role: 'Ingeniero de software', period: '2015 — 2016', note: 'Sistemas de conteo de personas: frontend, backend y bases de datos (Laravel, MySQL, MongoDB).' },
    { company: 'BIC Gipuzkoa · HolaCampus', role: 'Ingeniero de software', period: '2014', note: 'Red social universitaria para estudiantes (Symfony, PostgreSQL).' },
  ],
  projects: [
    {
      ...projectsBase[0],
      line: 'Ingeniería de IA gobernada: playbooks versionados, un puerto para ocho runtimes, puertas humanas y journal por transición.',
      metric: { value: '164', label: 'hallazgos en una auditoría' },
    },
    {
      ...projectsBase[1],
      line: 'Seis exchanges y diecisiete blockchains conciliados en un informe FIFO correcto para Hacienda, con base aislada por usuario.',
      metric: { value: '17', label: 'blockchains conciliadas' },
    },
    {
      ...projectsBase[2],
      line: 'Dashboards de cripto dentro de Reddit, instalables subreddit a subreddit, con refresco por calendario y caché para no machacar la API.',
      metric: { value: '15 min', label: 'refresco sin clave' },
    },
    {
      ...projectsBase[3],
      line: 'App Android de senderismo sin conexión: mapas vectoriales, 2.034 rutas, perfil del terreno y ningún servicio de Google.',
      metric: { value: '2.034', label: 'rutas sin conexión' },
    },
    {
      ...projectsBase[4],
      line: 'Veinte repositorios bajo un contrato validado: contexto compartido, puerta de entrada, acceso y motor de UI.',
      metric: { value: '20', label: 'repositorios, un contrato' },
    },
    {
      ...projectsBase[5],
      line: 'Panel de control de servicios con recuperación acotada: estado, logs, métricas y despliegues en una pantalla.',
      metric: { value: '80', label: 'ficheros de test' },
    },
  ],
  education: [
    { title: 'Máster, Ingeniería Computacional y Sistemas Inteligentes', place: 'Universidad del País Vasco (UPV/EHU)', period: '2015 — 2016' },
    { title: 'Grado, Ingeniería Informática (Ingeniería del Software)', place: 'Universidad del País Vasco (UPV/EHU)', period: '2011 — 2015' },
  ],
  training: [
    { title: 'Introducción a Xamarin, Android, iOS y Azure', place: 'CampusMVP', period: '2017' },
    { title: 'Android: introducción a la programación', place: 'Universitat Politècnica de València', period: '2013 — 2014' },
  ],
  certifications: [
    'Introduction to agent skills',
    'AI Fluency for students',
    'COBOL: empieza a programar',
  ],
  languages: [
    { name: 'Castellano', level: 'Nativo' },
    { name: 'Euskera', level: 'Nativo' },
    { name: 'Inglés', level: 'Profesional' },
  ],
  stack: [
    { label: 'Pagos', items: ['SWIFT', 'FIX', 'Enrutamiento', 'Orquestación'] },
    { label: 'Backend', items: ['TypeScript', 'Node.js', 'Java', 'Spring Boot', 'NestJS', 'Python', 'FastAPI', 'C#', 'PostgreSQL', 'MongoDB', 'Redis', 'Microservicios'] },
    { label: 'IA y agentes', items: ['Claude Code', 'Devin', 'Windsurf', 'MCP', 'Modelos locales'] },
    { label: 'Web y móvil', items: ['React', 'Next.js', 'Angular', 'Ionic', 'Kotlin', 'Compose', 'Tauri'] },
    { label: 'Plataforma', items: ['Docker', 'Kubernetes', 'Caddy', 'Playwright', 'Vitest'] },
  ],
};

export const CV: Record<Lang, Cv> = { en, es };

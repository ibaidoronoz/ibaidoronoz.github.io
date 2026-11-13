// Site-wide content, one object per language. Components only render it.
// Technical names (stack items, company names) stay identical across locales so the
// stack map keeps linking to /work?tech=<name>.

import type { Lang } from '../lib/i18n';

export interface Site {
  name: string;
  role: string;
  focus: string;
  tagline: string;
  location: string;
  pill: string;
  links: { github: string; linkedin: string };
  stackGroups: { label: string; items: string[] }[];
  stats: { value: string; label: string }[];
  timeline: { years: string; label: string; stack: string[] }[];
  now: { years: string; branches: { label: string; sub: string; stack: string[] }[] };
  ownProducts: string;
  models: { title: string; body: string }[];
  method: { title: string; body: string; why: string; example: string }[];
  experience: { company: string; role: string; period: string; engagements: { client: string; period: string; points: string[] }[] }[];
  education: { title: string; place: string; period: string }[];
}

const links = {
  github: 'https://github.com/ibaidoronoz',
  linkedin: 'https://www.linkedin.com/in/ibai-d-oronoz',
};

// Technical vocabulary shared by both locales.
const stackGroups = [
  { labelKey: 'payments', items: ['SWIFT', 'FIX', 'Smart payment routing', 'Payment orchestration'] },
  {
    labelKey: 'backend',
    items: [
      'TypeScript', 'Node.js', 'Java', 'Spring Boot', 'NestJS', 'Python', 'FastAPI', 'C#', '.NET',
      'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Microservices', 'Distributed systems', 'API design',
    ],
  },
  { labelKey: 'ai', items: ['Claude Code', 'Devin', 'Windsurf', 'MCP', 'Local models', 'XGBoost', 'LightGBM', 'Optuna'] },
  {
    labelKey: 'web',
    items: ['React', 'Next.js', 'Vite', 'Angular', 'Ionic', 'Kotlin', 'Android', 'Jetpack Compose', 'Tauri', 'PySide6'],
  },
  {
    labelKey: 'platform',
    items: ['Docker', 'Kubernetes', 'Caddy', 'Prisma', 'Drizzle', 'Playwright', 'Vitest', 'xUnit', 'Chrome MV3'],
  },
];

const groupLabels = {
  en: { payments: 'Payments', backend: 'Backend', ai: 'AI & agents', web: 'Web & mobile', platform: 'Platform & tooling' },
  es: { payments: 'Pagos', backend: 'Backend', ai: 'IA y agentes', web: 'Web y móvil', platform: 'Plataforma y tooling' },
} as const;

const en: Site = {
  name: 'Ibai Díez Oronoz',
  role: 'Senior Software Engineer',
  focus: 'Payments & AI Engineering',
  tagline:
    'Ten years building payment systems where errors cost money. Now I design how engineering teams ship with AI agents.',
  location: 'Basque Country, Spain',
  pill: 'Payments × AI agents · Basque Country',
  links,
  stackGroups: stackGroups.map((group) => ({
    label: groupLabels.en[group.labelKey as keyof typeof groupLabels.en],
    items: group.items,
  })),
  stats: [
    { value: '10+', label: 'years in payments' },
    { value: '19', label: 'products built' },
    { value: '4', label: 'domains: payments · AI · mobile · tools' },
    { value: '164', label: 'findings in one audit' },
  ],
  timeline: [
    { years: '2014–2016', label: 'Web products', stack: ['Laravel', 'Symfony', 'MySQL'] },
    { years: '2016–2018', label: 'E-commerce & data', stack: ['PHP', 'Magento', 'PostgreSQL'] },
    { years: '2018–2020', label: 'Enterprise & mobile', stack: ['Angular', 'Ionic', 'Java'] },
  ],
  now: {
    years: '2020–2026',
    branches: [
      { label: 'International payments', sub: 'PaymentsHub', stack: ['Java', 'Spring Boot', 'SWIFT', 'FIX'] },
      { label: 'AI agents', sub: 'Governed workflows', stack: ['TypeScript', 'Claude Code'] },
    ],
  },
  ownProducts: '19 products of my own, built alongside the job',
  models: [
    {
      title: 'Context is the product',
      body: 'A small window with traceable sources. In Prometheus, only a skill’s description loads until the body is needed.',
    },
    {
      title: 'Local when it is personal',
      body: 'Kairos runs its assistant on a local model by default and only reaches the cloud with an explicit notice.',
    },
    {
      title: 'A human where being wrong costs money',
      body: 'Cost, diff size, sensitive paths, failing tests: a person approves before the next step runs.',
    },
    {
      title: 'Audit the output',
      body: 'Nine read-only playbooks, 164 findings, each with a command that verifies it.',
    },
  ],
  method: [
    {
      title: 'Plan before code',
      body: 'Every change starts as a written plan (PLAN.md) precise enough for an agent to execute autonomously — and for me to review against.',
      why: 'A prompt is not a plan. If it cannot be reviewed before the code exists, it cannot be reviewed after.',
      example: 'Every change lands with a PLAN.md: scope, files, acceptance criteria.',
    },
    {
      title: 'Audit before fix',
      body: 'Agents audit first, fix second. Findings are ranked by impact and turned into ordered, reviewable prompts.',
      why: 'An agent that both finds and fixes hides its own mistakes.',
      example: 'One audit, nine dimensions, 164 findings ranked before a single fix.',
    },
    {
      title: 'Read before write',
      body: 'Implementing agents must read the code they touch before changing it. Shared context lives in one validated repository.',
      why: 'A confident diff over code nobody read is the most expensive kind of wrong.',
      example: 'Shared context in one repository, validated across the fleet — not a prompt copied per project.',
    },
    {
      title: 'Traceable authorship',
      body: 'Agent commits carry their own author identity, so the history shows exactly what was delegated and what I wrote.',
      why: 'If the history cannot tell them apart, nobody can review what was delegated.',
      example: 'Agent commits carry their own author identity; mine carry mine.',
    },
    {
      title: 'Explicit over implicit',
      body: 'Explicit triggers over background workers, local-first data, no unnecessary dependencies.',
      why: 'Every implicit mechanism is something that surprises you at three in the morning.',
      example: 'Explicit triggers, local-first data, no dependency added without a reason.',
    },
    {
      title: 'GO / NO-GO gates',
      body: 'Nothing touches real money without a checklist. One audit stopped a trading engine on six blocking issues before go-live.',
      why: 'Autonomy without a stop condition is a liability with a credit card.',
      example: 'Six blocking issues stopped a trading engine before go-live.',
    },
  ],
  experience: [
    {
      company: 'ALTEN',
      role: 'Senior Software Engineer — Payments & AI Engineering',
      period: '2018 — Present',
      engagements: [
        {
          client: 'Getnet Platforms · PaymentsHub',
          period: '2026 — Present',
          points: [
            'Backend microservices for payment orchestration and smart routing; SWIFT and FIX integrations.',
            'Lead AI enablement in engineering teams: standardised, governed AI-assisted workflows with Devin and Windsurf, including retrieval-augmented context (RAG) for internal assistants.',
          ],
        },
        {
          client: 'PagoNxt · EMI',
          period: '2022 — 2025',
          points: ['Payment infrastructure and smart-routing microservices; SWIFT and FIX integrations.'],
        },
        {
          client: 'PagoFX',
          period: '2020 — 2022',
          points: ['Backend services for cross-border payments within the Santander ecosystem.'],
        },
        {
          client: 'Holcim',
          period: '2018 — 2020',
          points: ['Enterprise applications and hybrid mobile solutions (Angular, Ionic, Java).'],
        },
      ],
    },
    {
      company: 'PKF Attest',
      role: 'Software Engineer',
      period: '2017',
      engagements: [
        {
          client: '',
          period: '',
          points: ['Frontend, backend and databases for corporate projects in Scrum teams (C#, C++, SharePoint, PostgreSQL).'],
        },
      ],
    },
    {
      company: 'Senddo',
      role: 'Software Engineer',
      period: '2016 — 2017',
      engagements: [
        {
          client: '',
          period: '',
          points: ['Backend and database development for a Magento 2 e-commerce platform (PHP, MySQL/PostgreSQL).'],
        },
      ],
    },
    {
      company: 'EUSTAT — Basque Statistics Institute',
      role: 'Researcher',
      period: '2016',
      engagements: [
        {
          client: '',
          period: '',
          points: ['Web application applying statistical storytelling to present public data interactively (Laravel, R).'],
        },
      ],
    },
    {
      company: 'Dinycon Sistemas',
      role: 'Software Engineer',
      period: '2015 — 2016',
      engagements: [
        {
          client: '',
          period: '',
          points: ['Frontend, backend and databases for crowd-counting systems (Laravel, MySQL, MongoDB).'],
        },
      ],
    },
    {
      company: 'BIC Gipuzkoa · HolaCampus',
      role: 'Software Engineer',
      period: '2014',
      engagements: [
        {
          client: '',
          period: '',
          points: ['University-oriented social network for students (Symfony, PostgreSQL).'],
        },
      ],
    },
  ],
  education: [
    { title: 'MSc, Computational Engineering and Intelligent Systems', place: 'University of the Basque Country', period: '2015 — 2016' },
    { title: 'BSc, Computer Engineering (Software Engineering)', place: 'University of the Basque Country', period: '2011 — 2015' },
  ],
};

const es: Site = {
  name: 'Ibai Díez Oronoz',
  role: 'Ingeniero de software senior',
  focus: 'Pagos e ingeniería de IA',
  tagline:
    'Diez años construyendo sistemas de pago donde un error cuesta dinero. Ahora diseño cómo los equipos de ingeniería entregan con agentes de IA.',
  location: 'País Vasco, España',
  pill: 'Pagos × agentes de IA · País Vasco',
  links,
  stackGroups: stackGroups.map((group) => ({
    label: groupLabels.es[group.labelKey as keyof typeof groupLabels.es],
    items: group.items,
  })),
  stats: [
    { value: '10+', label: 'años en pagos' },
    { value: '19', label: 'productos propios' },
    { value: '4', label: 'dominios: pagos · IA · móvil · herramientas' },
    { value: '164', label: 'hallazgos en una auditoría' },
  ],
  timeline: [
    { years: '2014–2016', label: 'Productos web', stack: ['Laravel', 'Symfony', 'MySQL'] },
    { years: '2016–2018', label: 'E-commerce y datos', stack: ['PHP', 'Magento', 'PostgreSQL'] },
    { years: '2018–2020', label: 'Empresa y móvil', stack: ['Angular', 'Ionic', 'Java'] },
  ],
  now: {
    years: '2020–2026',
    branches: [
      { label: 'Pagos internacionales', sub: 'PaymentsHub', stack: ['Java', 'Spring Boot', 'SWIFT', 'FIX'] },
      { label: 'Agentes de IA', sub: 'Flujos gobernados', stack: ['TypeScript', 'Claude Code'] },
    ],
  },
  ownProducts: '19 productos propios, construidos en paralelo al trabajo',
  models: [
    {
      title: 'El contexto es el producto',
      body: 'Una ventana pequeña con fuentes rastreables. En Prometheus solo se carga la descripción de una skill hasta que hace falta el cuerpo.',
    },
    {
      title: 'Local cuando es personal',
      body: 'Kairos ejecuta su asistente en un modelo local por defecto y solo llega a la nube con un aviso explícito.',
    },
    {
      title: 'Una persona donde equivocarse cuesta dinero',
      body: 'Coste, tamaño del diff, rutas sensibles, tests en rojo: alguien aprueba antes de que el siguiente paso se ejecute.',
    },
    {
      title: 'Auditar la salida',
      body: 'Nueve playbooks de solo lectura, 164 hallazgos, cada uno con un comando que lo verifica.',
    },
  ],
  method: [
    {
      title: 'Plan antes que código',
      body: 'Cada cambio empieza como un plan escrito (PLAN.md) lo bastante preciso para que un agente lo ejecute solo y para que yo lo revise.',
      why: 'Un prompt no es un plan. Si no se puede revisar antes de que exista el código, no se puede revisar después.',
      example: 'Cada cambio aterriza con un PLAN.md: alcance, ficheros, criterios de aceptación.',
    },
    {
      title: 'Auditar antes de arreglar',
      body: 'Los agentes auditan primero y arreglan después. Los hallazgos se ordenan por impacto y se convierten en prompts revisables y ordenados.',
      why: 'Un agente que encuentra y arregla esconde sus propios errores.',
      example: 'Una auditoría, nueve dimensiones, 164 hallazgos priorizados antes de un solo arreglo.',
    },
    {
      title: 'Leer antes de escribir',
      body: 'Los agentes que implementan deben leer el código que tocan antes de cambiarlo. El contexto compartido vive en un solo repositorio validado.',
      why: 'Un diff seguro sobre código que nadie leyó es la forma más cara de equivocarse.',
      example: 'Contexto compartido en un repositorio, validado en toda la flota, no un prompt copiado por proyecto.',
    },
    {
      title: 'Autoría rastreable',
      body: 'Los commits de los agentes llevan su propia identidad, así el historial muestra exactamente qué se delegó y qué escribí yo.',
      why: 'Si el historial no los distingue, nadie puede revisar lo que se delegó.',
      example: 'Los commits de los agentes llevan su identidad; los míos, la mía.',
    },
    {
      title: 'Explícito sobre implícito',
      body: 'Disparadores explícitos antes que workers en segundo plano, datos locales primero, sin dependencias innecesarias.',
      why: 'Cada mecanismo implícito es algo que te sorprende a las tres de la mañana.',
      example: 'Disparadores explícitos, datos locales primero, ninguna dependencia sin motivo.',
    },
    {
      title: 'Puertas GO / NO-GO',
      body: 'Nada toca dinero real sin una lista de comprobación. Una auditoría paró un motor de trading con seis problemas bloqueantes antes de salir a producción.',
      why: 'La autonomía sin condición de parada es un pasivo con tarjeta de crédito.',
      example: 'Seis problemas bloqueantes pararon un motor de trading antes de producción.',
    },
  ],
  experience: [
    {
      company: 'ALTEN',
      role: 'Ingeniero de software senior — Pagos e ingeniería de IA',
      period: '2018 — Actualidad',
      engagements: [
        {
          client: 'Getnet Platforms · PaymentsHub',
          period: '2026 — Actualidad',
          points: [
            'Microservicios backend para orquestación de pagos y enrutamiento inteligente; integraciones SWIFT y FIX.',
            'Lidero la adopción de IA en equipos de ingeniería: flujos asistidos por IA estandarizados y gobernados con Devin y Windsurf, incluido contexto aumentado por recuperación (RAG) para asistentes internos.',
          ],
        },
        {
          client: 'PagoNxt · EMI',
          period: '2022 — 2025',
          points: ['Infraestructura de pagos y microservicios de enrutamiento inteligente; integraciones SWIFT y FIX.'],
        },
        {
          client: 'PagoFX',
          period: '2020 — 2022',
          points: ['Servicios backend para pagos transfronterizos dentro del ecosistema Santander.'],
        },
        {
          client: 'Holcim',
          period: '2018 — 2020',
          points: ['Aplicaciones empresariales y soluciones móviles híbridas (Angular, Ionic, Java).'],
        },
      ],
    },
    {
      company: 'PKF Attest',
      role: 'Ingeniero de software',
      period: '2017',
      engagements: [
        {
          client: '',
          period: '',
          points: ['Frontend, backend y bases de datos para proyectos corporativos en equipos Scrum (C#, C++, SharePoint, PostgreSQL).'],
        },
      ],
    },
    {
      company: 'Senddo',
      role: 'Ingeniero de software',
      period: '2016 — 2017',
      engagements: [
        {
          client: '',
          period: '',
          points: ['Desarrollo backend y de base de datos para una plataforma de e-commerce en Magento 2 (PHP, MySQL/PostgreSQL).'],
        },
      ],
    },
    {
      company: 'EUSTAT — Euskal Estatistika Erakundea',
      role: 'Investigador',
      period: '2016',
      engagements: [
        {
          client: '',
          period: '',
          points: ['Aplicación web que aplica narración estadística para presentar datos públicos de forma interactiva (Laravel, R).'],
        },
      ],
    },
    {
      company: 'Dinycon Sistemas',
      role: 'Ingeniero de software',
      period: '2015 — 2016',
      engagements: [
        {
          client: '',
          period: '',
          points: ['Frontend, backend y bases de datos para sistemas de conteo de personas (Laravel, MySQL, MongoDB).'],
        },
      ],
    },
    {
      company: 'BIC Gipuzkoa · HolaCampus',
      role: 'Ingeniero de software',
      period: '2014',
      engagements: [
        {
          client: '',
          period: '',
          points: ['Red social universitaria para estudiantes (Symfony, PostgreSQL).'],
        },
      ],
    },
  ],
  education: [
    { title: 'Máster, Ingeniería Computacional y Sistemas Inteligentes', place: 'Universidad del País Vasco', period: '2015 — 2016' },
    { title: 'Grado, Ingeniería Informática (Ingeniería del Software)', place: 'Universidad del País Vasco', period: '2011 — 2015' },
  ],
};

export const SITE: Record<Lang, Site> = { en, es };
export const getSite = (lang: Lang): Site => SITE[lang];

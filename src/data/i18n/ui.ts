// Chrome copy: everything that is not project or case-study content.
// Keys are typed; adding a locale means adding one object here.

import type { Lang } from '../../lib/i18n';

export interface UI {
  nav: { work: string; method: string; workshop: string; experience: string; menu: string; main: string };
  footer: { explore: string; elsewhere: string; colophon: string; note: string; rights: string };
  theme: { label: string; auto: string; light: string; dark: string; switchTo: string };
  language: { label: string; switchTo: string };
  social: { label: string };
  areas: { 'ai-agents': string; 'fintech-data': string; platform: string; 'mobile-desktop': string; tools: string };
  status: { active: string; 'personal-production': string; experiment: string };
  home: {
    ctaWork: string;
    featuredKicker: string;
    featuredTitle: string;
    privateNote: string;
    allProjects: string;
    readCaseStudy: string;
    details: string;
    underTheHood: string;
    readShort: string;
    moreKicker: string;
    moreTitle: string;
    filterAll: string;
    filterLabel: string;
    archive: string;
    stackKicker: string;
    stackIntro: string;
    methodKicker: string;
    methodTitleA: string;
    methodTitleB: string;
    modelLayer: string;
    experienceKicker: string;
    experienceTitle: string;
    clientsDetail: string;
    education: string;
    allWorkKicker: string;
    allWorkTitle: string;
    seeEveryProject: string;
    closingPre: string;
    closingLink: string;
  };
  work: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    lead: string;
    filterAll: string;
    filteredBy: string;
    count: string;
    clear: string;
  };
  project: {
    back: string;
    top: string;
    area: string;
    status: string;
    stack: string;
    draft: string;
    underTheHood: string;
    keyDecisions: string;
    related: string;
    next: string;
    read: string;
  };
  notFound: { metaTitle: string; metaDescription: string; title: string; lead: string; home: string; work: string };
  pipeline: { aria: string; title: string; subtitle: string; inPractice: string };
  timeline: { aria: string };
  decisions: { why: string; open: string };
  rail: { aria: string; flow: string; onThisPage: string };
  flow: { aria: string; play: string; pause: string };
  aiRole: { aria: string; spec: string; impl: string; audit: string };
  cv: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    lead: string;
    download: string;
    downloadNote: string;
    print: string;
    profile: string;
    experience: string;
    earlier: string;
    projects: string;
    education: string;
    training: string;
    certifications: string;
    stack: string;
    languages: string;
    more: string;
  };
}

const en: UI = {
  nav: { work: 'Work', method: 'How I build', workshop: 'Workshop', experience: 'Experience', menu: 'Menu', main: 'Main' },
  footer: {
    explore: 'Explore',
    elsewhere: 'Elsewhere',
    colophon: 'Colophon',
    note: 'Static site · no cookies · no tracking',
    rights: '© {year} {name}',
  },
  theme: { label: 'Theme', auto: 'Auto', light: 'Light', dark: 'Dark', switchTo: 'Switch theme to {mode}' },
  language: { label: 'Language', switchTo: 'Switch to {language}' },
  social: { label: 'Profiles' },
  areas: {
    'ai-agents': 'AI & Agents',
    'fintech-data': 'Fintech & Data',
    platform: 'Platform',
    'mobile-desktop': 'Mobile & Desktop',
    tools: 'Tools',
  },
  status: { active: 'Active development', 'personal-production': 'Personal use', experiment: 'R&D' },
  home: {
    ctaWork: 'See the work ↓',
    featuredKicker: 'Featured work',
    featuredTitle: 'Systems, not demos.',
    privateNote: 'Source is private · walkthroughs on request',
    allProjects: 'All {count} projects →',
    readCaseStudy: 'Read the case study',
    details: 'Details',
    underTheHood: 'Under the hood',
    readShort: 'Read the short version →',
    moreKicker: 'More projects',
    moreTitle: 'The rest of the workshop.',
    filterAll: 'All',
    filterLabel: 'Filter projects by area',
    archive: 'Archive & lab',
    stackKicker: 'Stack',
    stackIntro: 'Click a technology to see the projects that use it.',
    methodKicker: 'How I build with AI',
    methodTitleA: 'Agents write code.',
    methodTitleB: 'Engineers own outcomes.',
    modelLayer: 'The model layer',
    experienceKicker: 'Experience',
    experienceTitle: '10+ years shipping backend.',
    clientsDetail: 'Clients and detail',
    education: 'Education',
    allWorkKicker: 'All work',
    allWorkTitle: '{count} projects, one way of working.',
    seeEveryProject: 'See every project →',
    closingPre: 'Prefer to talk?',
    closingLink: 'Find me on LinkedIn ↗',
  },
  work: {
    metaTitle: 'Work',
    metaDescription: 'Every project in the catalogue: payments, platforms, agents and tools.',
    kicker: 'All work',
    title: '{count} projects, one way of working.',
    lead: 'Payments, platforms, agents and small tools. Every entry has a page with the problem, the decisions and a diagram of how it works.',
    filterAll: 'All · {count}',
    filteredBy: 'Filtered by',
    count: '{count} projects',
    clear: 'clear',
  },
  project: {
    back: '← All work',
    top: 'Back to top ↑',
    area: 'Area',
    status: 'Status',
    stack: 'Stack',
    draft: 'Draft — this case study is still being written.',
    underTheHood: 'Under the hood',
    keyDecisions: 'Key decisions',
    related: 'Related work',
    next: 'Next case study',
    read: 'Read →',
  },
  notFound: {
    metaTitle: 'Not found',
    metaDescription: 'This page is not in the catalogue.',
    title: 'This page is not in the catalogue.',
    lead: 'The link may be old. Everything else is still here.',
    home: 'Back home',
    work: 'All work',
  },
  pipeline: { aria: 'How I build, step by step', title: 'the method', subtitle: 'six rules, one loop', inPractice: 'In practice' },
  timeline: { aria: 'Career timeline' },
  decisions: { why: 'Why', open: 'Open' },
  rail: { aria: 'Sections', flow: 'Flow', onThisPage: 'On this page' },
  flow: { aria: 'Play the diagram', play: 'play', pause: 'pause' },
  aiRole: { aria: 'Division of work between me and AI agents', spec: 'Spec & architecture', impl: 'Implementation', audit: 'Audit' },
  cv: {
    metaTitle: 'CV',
    metaDescription: 'One-page CV: payments, backend and AI engineering.',
    kicker: 'Curriculum',
    title: 'Ibai Díez Oronoz — payments, backend and AI engineering',
    lead: 'Ten years building payment systems where errors cost money, and the tooling that lets teams ship with AI agents.',
    download: 'Download the PDF',
    downloadNote: 'Two pages, generated from this page.',
    print: 'Print or save as PDF',
    profile: 'Profile',
    experience: 'Experience',
    earlier: 'Earlier',
    projects: 'Selected projects',
    education: 'Education',
    training: 'Further training',
    certifications: 'Certifications',
    stack: 'Stack',
    languages: 'Languages',
    more: 'and {count} more at',
  },
};

const es: UI = {
  nav: { work: 'Proyectos', method: 'Cómo construyo', workshop: 'Taller', experience: 'Experiencia', menu: 'Menú', main: 'Principal' },
  footer: {
    explore: 'Explorar',
    elsewhere: 'En otros sitios',
    colophon: 'Colofón',
    note: 'Sitio estático · sin cookies · sin rastreo',
    rights: '© {year} {name}',
  },
  theme: { label: 'Tema', auto: 'Auto', light: 'Claro', dark: 'Oscuro', switchTo: 'Cambiar el tema a {mode}' },
  language: { label: 'Idioma', switchTo: 'Cambiar a {language}' },
  social: { label: 'Perfiles' },
  areas: {
    'ai-agents': 'IA y agentes',
    'fintech-data': 'Fintech y datos',
    platform: 'Plataforma',
    'mobile-desktop': 'Móvil y escritorio',
    tools: 'Herramientas',
  },
  status: { active: 'En desarrollo activo', 'personal-production': 'Uso personal', experiment: 'I+D' },
  home: {
    ctaWork: 'Ver el trabajo ↓',
    featuredKicker: 'Trabajo destacado',
    featuredTitle: 'Sistemas, no demos.',
    privateNote: 'Código privado · recorridos bajo petición',
    allProjects: 'Los {count} proyectos →',
    readCaseStudy: 'Leer el caso',
    details: 'Detalles',
    underTheHood: 'Bajo el capó',
    readShort: 'Leer la versión corta →',
    moreKicker: 'Más proyectos',
    moreTitle: 'El resto del taller.',
    filterAll: 'Todos',
    filterLabel: 'Filtrar proyectos por área',
    archive: 'Archivo y laboratorio',
    stackKicker: 'Stack',
    stackIntro: 'Pincha una tecnología para ver qué proyectos la usan.',
    methodKicker: 'Cómo construyo con IA',
    methodTitleA: 'Los agentes escriben código.',
    methodTitleB: 'Los ingenieros responden del resultado.',
    modelLayer: 'La capa de modelos',
    experienceKicker: 'Experiencia',
    experienceTitle: 'Más de 10 años entregando backend.',
    clientsDetail: 'Clientes y detalle',
    education: 'Formación',
    allWorkKicker: 'Todo el trabajo',
    allWorkTitle: '{count} proyectos, una forma de trabajar.',
    seeEveryProject: 'Ver todos los proyectos →',
    closingPre: '¿Hablamos?',
    closingLink: 'Estoy en LinkedIn ↗',
  },
  work: {
    metaTitle: 'Proyectos',
    metaDescription: 'Todos los proyectos del catálogo: pagos, plataformas, agentes y herramientas.',
    kicker: 'Todo el trabajo',
    title: '{count} proyectos, una forma de trabajar.',
    lead: 'Pagos, plataformas, agentes y herramientas pequeñas. Cada entrada tiene una página con el problema, las decisiones y un diagrama de cómo funciona.',
    filterAll: 'Todos · {count}',
    filteredBy: 'Filtrado por',
    count: '{count} proyectos',
    clear: 'quitar filtro',
  },
  project: {
    back: '← Todos los proyectos',
    top: 'Volver arriba ↑',
    area: 'Área',
    status: 'Estado',
    stack: 'Stack',
    draft: 'Borrador — este caso todavía se está escribiendo.',
    underTheHood: 'Bajo el capó',
    keyDecisions: 'Decisiones clave',
    related: 'Trabajo relacionado',
    next: 'Siguiente caso',
    read: 'Leer →',
  },
  notFound: {
    metaTitle: 'No encontrado',
    metaDescription: 'Esta página no está en el catálogo.',
    title: 'Esta página no está en el catálogo.',
    lead: 'Puede que el enlace sea antiguo. Todo lo demás sigue aquí.',
    home: 'Volver al inicio',
    work: 'Todos los proyectos',
  },
  pipeline: { aria: 'Cómo construyo, paso a paso', title: 'el método', subtitle: 'seis reglas, un bucle', inPractice: 'En la práctica' },
  timeline: { aria: 'Trayectoria profesional' },
  decisions: { why: 'Por qué', open: 'Abrir' },
  rail: { aria: 'Secciones', flow: 'Flujo', onThisPage: 'En esta página' },
  flow: { aria: 'Reproducir el diagrama', play: 'reproducir', pause: 'pausar' },
  aiRole: { aria: 'Reparto de trabajo entre yo y los agentes de IA', spec: 'Especificación y arquitectura', impl: 'Implementación', audit: 'Auditoría' },
  cv: {
    metaTitle: 'CV',
    metaDescription: 'CV de una página: pagos, backend e ingeniería de IA.',
    kicker: 'Currículum',
    title: 'Ibai Díez Oronoz — pagos, backend e ingeniería de IA',
    lead: 'Diez años construyendo sistemas de pago donde un error cuesta dinero, y las herramientas para que los equipos entreguen con agentes de IA.',
    download: 'Descargar el PDF',
    downloadNote: 'Dos páginas, generadas desde esta misma página.',
    print: 'Imprimir o guardar como PDF',
    profile: 'Perfil',
    experience: 'Experiencia',
    earlier: 'Etapas anteriores',
    projects: 'Proyectos seleccionados',
    education: 'Formación',
    training: 'Formación complementaria',
    certifications: 'Certificaciones',
    stack: 'Stack',
    languages: 'Idiomas',
    more: 'y {count} más en',
  },
};

export const ui: Record<Lang, UI> = { en, es };

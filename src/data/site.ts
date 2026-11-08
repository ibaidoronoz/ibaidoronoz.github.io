// Site-wide content. Edit here; components only render it.

export const site = {
  name: 'Ibai Díez Oronoz',
  role: 'Senior Software Engineer',
  focus: 'Payments & AI Engineering',
  tagline:
    'Ten years building payment systems where errors cost money. Now I design how engineering teams ship with AI agents.',
  location: 'Basque Country, Spain',
  pill: 'Payments × AI agents · Basque Country',
  // Professional stack from the CV / LinkedIn: first marquee row.
  cvStack: [
    'Node.js', 'TypeScript', 'NestJS', 'Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'MongoDB',
    'Docker', 'Kubernetes', 'Microservices', 'Distributed systems', 'API design', 'SWIFT', 'FIX',
    'Smart payment routing', 'Payment orchestration', 'Devin', 'Windsurf', 'Claude Code',
    'MCP', 'Local models', 'Kotlin', 'Android', 'Ionic', 'webMethods', 'C#', 'PHP', 'Laravel',
    'Symfony', 'Jira', 'Confluence',
  ],
  links: {
    github: 'https://github.com/ibaidoronoz',
    linkedin: 'https://www.linkedin.com/in/ibai-d-oronoz',
  },
  // Capabilities, grouped. The home renders them as a map that links into /work.
  stackGroups: [
    {
      label: 'Payments',
      items: ['SWIFT', 'FIX', 'Smart payment routing', 'Payment orchestration'],
    },
    {
      label: 'Backend',
      items: [
        'TypeScript', 'Node.js', 'Java', 'Spring Boot', 'NestJS', 'Python', 'FastAPI', 'C#', '.NET',
        'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Microservices', 'Distributed systems', 'API design',
      ],
    },
    {
      label: 'AI & agents',
      items: ['Claude Code', 'Devin', 'Windsurf', 'MCP', 'Local models', 'XGBoost', 'LightGBM', 'Optuna'],
    },
    {
      label: 'Web & mobile',
      items: ['React', 'Next.js', 'Vite', 'Angular', 'Ionic', 'Kotlin', 'Android', 'Jetpack Compose', 'Tauri', 'PySide6'],
    },
    {
      label: 'Platform & tooling',
      items: ['Docker', 'Kubernetes', 'Caddy', 'Prisma', 'Drizzle', 'Playwright', 'Vitest', 'xUnit', 'Chrome MV3'],
    },
  ],
  // Snapshot of the repositories shown on this site (Nov 2026). Update by hand.
  stats: [
    { value: '10+', label: 'years in payments' },
    { value: '19', label: 'products built' },
    { value: '4', label: 'domains: payments · AI · mobile · tools' },
    { value: '164', label: 'findings in one audit' },
  ],
  // The arc, in eras plus the present. Domains and stack only: details live in Experience.
  timeline: [
    { years: '2014–2016', label: 'Web products', stack: ['Laravel', 'Symfony', 'MySQL'] },
    { years: '2016–2018', label: 'E-commerce & data', stack: ['PHP', 'Magento', 'PostgreSQL'] },
    { years: '2018–2020', label: 'Enterprise & mobile', stack: ['Angular', 'Ionic', 'Java'] },
  ],
  // The present is two tracks, not one: the day job never stopped.
  now: {
    years: '2020–2026',
    branches: [
      {
        label: 'International payments',
        sub: 'PaymentsHub',
        stack: ['Java', 'Spring Boot', 'SWIFT', 'FIX'],
      },
      {
        label: 'AI agents',
        sub: 'Governed workflows',
        stack: ['TypeScript', 'Claude Code'],
      },
    ],
  },
  ownProducts: '19 products of my own, built alongside the job',
  // What I do with models, and the evidence behind each rule.
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
  // Mirrors the LinkedIn profile. Keep client work at the level LinkedIn already discloses.
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
} as const;

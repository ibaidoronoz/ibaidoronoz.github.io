// Site-wide content. Edit here; components only render it.

export const site = {
  name: 'Ibai Díez Oronoz',
  role: 'Senior Software Engineer',
  focus: 'Payments & AI Engineering',
  tagline:
    '10 years building backend systems where errors cost money. Now I design how engineering teams work with AI agents.',
  location: 'Basque Country, Spain',
  pill: 'Payments × AI agents · Basque Country',
  // Typed out in the hero, one after another.
  rotate: [
    'smart payment routing',
    'SWIFT & FIX integrations',
    'governed agent workflows',
    'developer platforms',
  ],
  // Professional stack from the CV / LinkedIn: first marquee row.
  cvStack: [
    'Node.js', 'TypeScript', 'NestJS', 'Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'MongoDB',
    'Docker', 'Kubernetes', 'Microservices', 'Distributed systems', 'API design', 'SWIFT', 'FIX',
    'Smart payment routing', 'Payment orchestration', 'Devin', 'Windsurf', 'Claude Code',
    'Kotlin', 'Android', 'Ionic', 'webMethods', 'C#', 'PHP', 'Laravel', 'Symfony', 'Jira', 'Confluence',
  ],
  links: {
    github: 'https://github.com/ibaidoronoz',
    linkedin: 'https://www.linkedin.com/in/ibai-d-oronoz',
  },
  // Snapshot of the repositories shown on this site (Nov 2026). Update by hand.
  stats: [
    { value: '20', label: 'repositories' },
    { value: '2,400+', label: 'commits' },
    { value: '4', label: 'languages across projects' },
    { value: '1', label: 'governed agent workflow' },
  ],
  method: [
    {
      title: 'Plan before code',
      body: 'Every change starts as a written plan (PLAN.md) precise enough for an agent to execute autonomously — and for me to review against.',
    },
    {
      title: 'Audit before fix',
      body: 'Agents audit first, fix second. Findings are ranked by impact and turned into ordered, reviewable prompts.',
    },
    {
      title: 'Read before write',
      body: 'Implementing agents must read the code they touch before changing it. Shared context lives in one validated repository.',
    },
    {
      title: 'Traceable authorship',
      body: 'Agent commits carry their own author identity, so the history shows exactly what was delegated and what I wrote.',
    },
    {
      title: 'Explicit over implicit',
      body: 'Explicit triggers over background workers, local-first data, no unnecessary dependencies.',
    },
    {
      title: 'GO / NO-GO gates',
      body: 'Nothing touches real money without a checklist. One audit stopped a trading engine on six blocking issues before go-live.',
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
            'Lead AI enablement in engineering teams: standardised, governed AI-assisted workflows with Devin and Windsurf.',
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

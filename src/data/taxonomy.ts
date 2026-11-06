export const AREAS = {
  'ai-agents': 'AI & Agents',
  'fintech-data': 'Fintech & Data',
  platform: 'Platform',
  'mobile-desktop': 'Mobile & Desktop',
  tools: 'Tools',
} as const;

export const STATUS = {
  active: 'Active development',
  'personal-production': 'Personal use',
  experiment: 'R&D',
} as const;

export type Area = keyof typeof AREAS;
export type Status = keyof typeof STATUS;

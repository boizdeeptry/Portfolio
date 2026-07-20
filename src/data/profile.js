// All portfolio content lives here — one file to edit, zero markup to touch.

export const EXPERIENCE = [
  {
    company: 'Midu Group (MenaQ7)',
    period: 'Nov 2023 — Present',
    roles: [
      {
        title: 'Head of Technology',
        period: 'Apr 2026 — Present',
        points: [
          'Own all 12 production systems: architecture direction, delivery, and operations with a 7-person team.',
          'Made Claude Code the team standard + custom skill plugins — ~2× throughput with 7 people instead of 12.',
          'Shipped an LLM assistant on Zalo: OpenClaw agent gateway, RAG over company knowledge, fine-tuned models.',
          'Platform architecture: centralized SSO, shared storage, NestJS + MongoDB standard across every product.',
        ],
      },
      {
        title: 'Team Leader',
        period: 'Mar 2024 — Apr 2026',
        points: [
          'Tech Lead of PRM (team of 8) — partner management, orders & commissions, architecture to production.',
          'Built AI prediction products (child height, body composition) feeding leads into the CDP.',
        ],
      },
      {
        title: 'Fullstack Developer',
        period: 'Nov 2023 — Mar 2024',
        points: [
          'Built Baby Face Prediction (viral AI campaign, team of 2) and the production infrastructure still in use today.',
        ],
      },
    ],
  },
  {
    company: 'DATX Technologies',
    period: 'Dec 2022 — Nov 2023',
    roles: [
      {
        title: 'Fullstack Developer',
        period: 'Fintech',
        points: [
          'xWealth — stock evaluation platform for retail investors (team of 24): Next.js front, GraphQL + Prisma, realtime Socket.io.',
          'Internal management platform (team of 18): React + Express/MongoDB/PostgreSQL, end to end.',
        ],
      },
    ],
  },
  {
    company: 'Rikkeisoft',
    period: 'Aug 2021 — Oct 2022',
    roles: [
      {
        title: 'Frontend Developer',
        period: 'Outsourcing · JP market',
        points: [
          'Matching app for the Japanese market (team of 25): Next.js foundation, AWS serverless backend (AppSync, Lambda, Cognito, CDK), GMO Payment.',
        ],
      },
    ],
  },
]

export const PROJECTS = [
  { id: 'ddcc', name: 'DDCC — Height Prediction', role: 'Tech Lead',
    summary: 'Consumer height-growth product that turns growth data into a personalized consultation — the primary lead-generation engine.' },
  { id: 'zalo-llm', name: 'Zalo LLM Assistant', role: 'Tech Lead',
    summary: 'LLM assistant on the company’s main chat channel — an agent gateway with RAG over company knowledge and fine-tuned models.' },
  { id: 'prm', name: 'PRM — Partner Platform', role: 'Tech Lead · team of 8',
    summary: 'Event-driven partner platform — onboarding, orders and commission workflows, led end to end from architecture to production.' },
  { id: 'cdp', name: 'Customer Data Platform', role: 'Architect / Owner',
    summary: 'Consolidates customer and order data from every sales channel into one platform, fed by automated crawling pipelines.' },
  { id: 'platform', name: 'Platform Services — SSO & Storage', role: 'Architect / Owner',
    summary: 'Centralized single sign-on and an internal storage service — the two shared foundations used by every company product.' },
  { id: 'ai-workflow', name: 'AI-native Engineering Workflow', role: 'Head of Technology',
    summary: 'Claude Code as the team standard with custom skill plugins — the change that cut the team from 12 to 7 while doubling output.' },
  { id: 'documind', name: 'Documind — AI Document Intelligence', role: 'Builder',
    summary: 'RAG document-intelligence platform combining vector search and a knowledge graph over OpenAI, on Next.js 15.' },
  { id: 'capillary', name: 'Capillary Vision Analysis', role: 'Builder',
    summary: 'LLM-vision analysis app with token-streamed responses, shipped with Docker and Kubernetes manifests.' },
]

export const PROJECT_GROUP_LABELS = {
  frontend: 'Frontend', backend: 'Backend', data: 'Data', infra: 'Infra', patterns: 'Patterns',
}

export const SKILLS = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript (Node.js)'] },
  { group: 'Frontend', items: ['Next.js', 'React', 'Vite', 'Tailwind CSS', 'Ant Design', 'Redux / Recoil'] },
  { group: 'Backend', items: ['NestJS', 'Express', 'REST', 'GraphQL', 'Prisma', 'Mongoose'] },
  { group: 'Data', items: ['MongoDB (replica sets)', 'PostgreSQL', 'MySQL'] },
  { group: 'AI & LLM', items: ['LLM integration', 'RAG pipelines', 'Fine-tuning', 'OpenClaw', 'Claude Code', 'Windsurf'] },
  { group: 'Infra & DevOps', items: ['Docker', 'Nginx', 'PM2', 'GitLab CI/CD (self-hosted)', 'Linode / DigitalOcean'] },
  { group: 'Leadership', items: ['Team building', 'Agile/Scrum', 'Hiring & mentoring', 'Engineering knowledge base'] },
]

export const CONTACT = [
  { label: 'Email', value: 'manvantruong2k@gmail.com', href: 'mailto:manvantruong2k@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/boizdeeptry', href: 'https://www.linkedin.com/in/boizdeeptry/' },
  { label: 'Location', value: 'Hanoi, Vietnam', href: null },
]

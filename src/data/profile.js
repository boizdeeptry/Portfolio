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
  {
    name: 'DDCC — Height Prediction',
    role: 'Tech Lead',
    desc: 'Core consumer product of the height-growth business: predicts a child’s adult height from growth data and turns it into personalized consultation. Primary lead-generation engine.',
    stack: ['Next.js', 'NestJS', 'MongoDB', 'Prediction models'],
  },
  {
    name: 'Zalo LLM Assistant',
    role: 'Tech Lead',
    desc: 'LLM assistant on the company’s main chat channel — OpenClaw agent gateway, RAG over company knowledge, fine-tuned models. Frontline customer questions answered automatically.',
    stack: ['OpenClaw', 'RAG', 'Fine-tuned LLMs', 'NestJS'],
  },
  {
    name: 'PRM — Partner Platform',
    role: 'Tech Lead · team of 8',
    desc: 'Partner relationship management: onboarding, order & revenue tracking, commission workflows. Led end to end from architecture to production operation.',
    stack: ['Next.js', 'TypeScript', 'NestJS', 'MongoDB'],
  },
  {
    name: 'Customer Data Platform',
    role: 'Architect / Owner',
    desc: 'Consolidates customer and order data from every sales channel into one platform powering marketing automation — fed by automated crawling pipelines.',
    stack: ['NestJS', 'MongoDB', 'Puppeteer', 'Playwright'],
  },
  {
    name: 'Platform Services — SSO & Storage',
    role: 'Architect / Owner',
    desc: 'Centralized single sign-on and an internal cloud storage service — the two shared foundations used by 100% of company products.',
    stack: ['NestJS', 'JWT', 'Nginx', 'MongoDB'],
  },
  {
    name: 'AI-native Engineering Workflow',
    role: 'Head of Technology',
    desc: 'Claude Code as the team’s standard workflow, with custom skill plugins encoding the design system and coding standards. The change that cut the team from 12 to 7 while doubling output.',
    stack: ['Claude Code', 'Custom skills', 'CI/CD', 'Code review'],
  },
]

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

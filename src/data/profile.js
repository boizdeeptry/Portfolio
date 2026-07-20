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
    id: 'documind', name: 'Documind — AI Document Intelligence', role: 'Builder',
    summary: 'A RAG assistant over an internal document set that pairs vector search with a knowledge graph.',
    problem: 'Building one consistent knowledge graph from many documents — the hard part isn’t extracting entities per document, it’s resolving the same entity across all of them.',
    highlights: [
      'Hybrid retrieval — Qdrant vector search plus a Neo4j knowledge graph (GraphRAG), not vector-only',
      'Cross-document entity dedup via similarity heuristics → SAME_AS / SIMILAR_TO edges, written as idempotent Cypher MERGE across three stores with no shared transaction',
      'Custom JWT auth (jose) and a path-traversal-hardened local file store',
      'OpenAI embeddings + LLM generation, batched and rate-throttled, degrading gracefully when a store is down',
    ],
  },
  {
    id: 'zalo-llm', name: 'Zalo LLM Assistant', role: 'Tech Lead',
    summary: 'An LLM assistant answering frontline customer questions on the company’s Zalo channel.',
    problem: 'Answer real customer questions automatically on the company’s busiest channel — grounded in company knowledge, not hallucinated.',
    highlights: [
      'RAG over company knowledge so answers stay grounded and citable',
      'An OpenClaw agent gateway routing between tools and fine-tuned models',
      'Runs on Zalo, the company’s main customer channel',
      'Described from experience — no public repo',
    ],
  },
  {
    id: 'prm', name: 'PRM — Distribution & Commission Platform', role: 'Tech Lead · team of 8',
    summary: 'A multi-tier pharmacy/agent distribution platform: orders, warehouse, payments and commissions.',
    problem: 'Compute correct commissions across an F0 → F1 → F2 agent hierarchy, where each tier’s payout depends on its children’s revenue inside date-clipped policy windows.',
    highlights: [
      'Recursive commission engine: clips each policy to the report window, looks up revenue-bracket bonus tiers, applies 10%-over-2M-VND income-tax withholding',
      'Tiering gated on real Vietnam GPP pharmacy certification, not a generic role enum',
      'Payment IPN with IP-whitelisting (VNPay), shipping labels (ViettelPost), Shopee webhook ingestion',
      'Dual-channel notifications: Socket.IO per-user rooms + Firebase FCM multicast with dead-token pruning',
    ],
  },
  {
    id: 'cdp', name: 'Customer Data Platform', role: 'Architect / Owner',
    summary: 'Unifies CRM, a multi-brand order ledger and Messenger outreach for one company into a single dataset.',
    problem: 'Unify one customer identity across three ingestion paths — a CRM, a multi-brand order feed and Facebook Messenger outreach — into a single record with no hard join key.',
    highlights: [
      'Upsert-based identity resolution: matches orders to users by name, enriches phone/Zalo from ingestion, minimal $set patches to avoid tripping validators on legacy records',
      'Per-brand cron ingestion staggered 30 minutes apart and production-gated, pulling a marketplace REST API with cached, auto-refreshed tokens',
      'Messenger campaign dedup by content-hash + tag so a customer is never messaged twice',
      'An MLM ambassador / spillover data model (downline, squads) indexed for spillover lookups',
    ],
  },
  {
    id: 'platform', name: 'Platform Services — SSO & Storage', role: 'Architect / Owner',
    summary: 'A shared storage service and auth service reused across the company’s products.',
    problem: 'One storage service and one auth service that many products reuse — the interesting part is the machine-to-machine contract and a token lifecycle that survives a stolen access token.',
    highlights: [
      'Storage shared across five products via namespaced paths and x-api-key M2M auth; Sharp normalization, UUIDv7 filenames, a same-origin proxy to dodge CORS',
      'JWT access + refresh where the refresh token is hashed in the DB — a stolen access token alone can’t be replayed',
      'GDPR-conscious structured logging (pino) that deliberately excludes request headers',
    ],
  },
  {
    id: 'ddcc', name: 'DDCC — Height-Prediction Lead Funnel', role: 'Tech Lead',
    summary: 'A Zalo Mini App that estimates a child’s adult height and turns the result into a sales lead.',
    problem: 'Turn a child’s growth data into a plausible adult-height estimate — then engineer the estimate itself into a sales lead.',
    highlights: [
      'A transparent estimator: WHO growth-percentile channel tracking blended with the mid-parental-height formula and a per-lifestyle-answer penalty — a formula, not ML',
      'Result-gated funnel: the quiz shows only a protocol code and requires contacting the referring salesperson to unlock the number — every submission becomes a lead',
      'One Express/Mongo backend serving two frontends: a public Zalo Mini App quiz and a React Native staff CRM (CodePush releases)',
    ],
  },
  {
    id: 'capillary', name: 'Capillary Vision Analysis', role: 'Builder',
    summary: 'An LLM-vision assistant that reads capillaroscopy images and returns a clinician-styled analysis.',
    problem: 'Make GPT-4o Vision behave like a domain clinician on capillaroscopy images — reliably, and within a hard token budget.',
    highlights: [
      'A 224-line system prompt encoding a hidden 5-step reasoning chain, anti-refusal rules and output variation',
      'Token budgeting with tiktoken + sliding-window context trimming to fit the model limit',
      'Images sent as ImageKit CDN URLs — ~85 tokens/image vs ~1360 as base64, a deliberate cost/latency call',
      'SSE token streaming on the Next.js Edge runtime',
    ],
  },
  {
    id: 'ai-workflow', name: 'AI-native Engineering Workflow', role: 'Head of Technology',
    summary: 'Making AI a first-class part of how the team writes code — the change that cut the team from 12 to 7.',
    problem: 'Ship roughly twice as much with a smaller team by making AI a first-class part of how the team writes code.',
    highlights: [
      'Claude Code adopted as the team’s standard workflow',
      'Custom skill plugins encoding the design system and coding standards so the AI writes in-house style',
      'Cut the team from 12 to 7 while roughly doubling delivery',
      'Described from experience — no public repo',
    ],
  },
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

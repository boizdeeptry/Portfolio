// Language-neutral project cores — the single source of truth for tech/skills.
// Localized name/role/summary live in profile.js / profile.vi.js, merged by id.

export const PROJECTS = [
  {
    id: 'ddcc',
    repo: 'ddcc-website', // verify: height-prediction product repo (see plan risk note)
    stack: ['Next.js', 'NestJS', 'MongoDB'],
    skills: [
      { group: 'frontend', items: ['Next.js', 'React', 'SSR'] },
      { group: 'backend', items: ['NestJS', 'REST API', 'Prediction models'] },
      { group: 'data', items: ['MongoDB'] },
      { group: 'patterns', items: ['Lead-gen funnel', 'Personalized consultation flow'] },
    ],
  },
  {
    id: 'zalo-llm',
    repo: null, // hand-curated: OpenClaw gateway + RAG, no single repo
    stack: ['NestJS', 'RAG', 'Fine-tuned LLMs'],
    skills: [
      { group: 'backend', items: ['NestJS', 'OpenClaw agent gateway'] },
      { group: 'patterns', items: ['RAG pipeline', 'Fine-tuned LLMs', 'Zalo channel integration'] },
    ],
  },
  {
    id: 'prm',
    repo: 'prm',
    stack: ['Next.js', 'Express', 'MongoDB'],
    skills: [
      { group: 'frontend', items: ['Next.js', 'Ant Design', 'Apollo GraphQL'] },
      { group: 'backend', items: ['Express', 'Socket.io', 'Swagger'] },
      { group: 'data', items: ['MongoDB', 'MinIO object storage'] },
      { group: 'infra', items: ['RabbitMQ', 'Docker'] },
      { group: 'patterns', items: ['Event-driven queues', 'PDF & QR generation', 'Commission workflows'] },
    ],
  },
  {
    id: 'cdp',
    repo: 'facebookcrawls',
    stack: ['NestJS', 'Playwright', 'MongoDB'],
    skills: [
      { group: 'backend', items: ['NestJS', 'Express', 'JWT auth'] },
      { group: 'data', items: ['MongoDB', 'Excel / CSV export'] },
      { group: 'patterns', items: ['Playwright & Puppeteer crawling', 'Multi-channel consolidation', 'ETL pipelines'] },
    ],
  },
  {
    id: 'platform',
    repo: 'midu-core-storage',
    stack: ['NestJS', 'Express', 'MongoDB'],
    skills: [
      { group: 'backend', items: ['NestJS', 'Express', 'Sharp image processing'] },
      { group: 'data', items: ['MongoDB'] },
      { group: 'infra', items: ['Docker', 'Nginx'] },
      { group: 'patterns', items: ['Centralized SSO (JWT · argon2 · OAuth)', 'Shared storage service', 'Structured logging (pino)'] },
    ],
  },
  {
    id: 'ai-workflow',
    repo: null, // hand-curated: process, not a product repo
    stack: ['Claude Code', 'CI/CD', 'Code review'],
    skills: [
      { group: 'patterns', items: ['Claude Code as team standard', 'Custom skill plugins', 'Encoded design system & standards', 'AI-native code review'] },
    ],
  },
  {
    id: 'documind',
    repo: 'documind',
    stack: ['Next.js', 'LangChain', 'OpenAI'],
    skills: [
      { group: 'frontend', items: ['Next.js 15', 'React'] },
      { group: 'backend', items: ['LangChain', 'OpenAI', 'Background processing'] },
      { group: 'data', items: ['Qdrant (vectors)', 'Neo4j (graph)', 'MongoDB'] },
      { group: 'patterns', items: ['RAG', 'Dual vector + graph retrieval', 'Semantic search', 'Auth (Clerk)'] },
    ],
  },
  {
    id: 'capillary',
    repo: 'capillary-analysis',
    stack: ['Next.js', 'OpenAI Vision', 'Kubernetes'],
    skills: [
      { group: 'frontend', items: ['Next.js', 'i18n'] },
      { group: 'backend', items: ['OpenAI Vision', 'LLM streaming', 'tiktoken'] },
      { group: 'infra', items: ['Docker', 'Kubernetes', 'GitLab CI'] },
      { group: 'patterns', items: ['Token-streamed responses', 'Vitest coverage'] },
    ],
  },
]

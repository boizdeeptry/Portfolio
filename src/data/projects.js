// Language-neutral project cores — the single source of truth for tech/skills.
// Localized name/role/summary/problem/highlights live in profile.js /
// profile.vi.js, merged by id. Tech tags here are verified against source;
// dead/scaffolded deps (unused queues, template CI, etc.) are deliberately omitted.

export const PROJECTS = [
  {
    id: 'documind',
    repo: 'documind',
    stack: ['Next.js', 'Qdrant', 'Neo4j', 'OpenAI'],
    skills: [
      { group: 'frontend', items: ['Next.js 15', 'React 19', 'Cytoscape.js'] },
      { group: 'backend', items: ['LangChain (PDF parsing)', 'OpenAI embeddings', 'LLM generation'] },
      { group: 'data', items: ['Qdrant (vectors)', 'Neo4j (graph)', 'MongoDB'] },
      { group: 'patterns', items: ['RAG', 'Hybrid vector + graph retrieval', 'Cross-document entity resolution', 'JWT auth'] },
    ],
  },
  {
    id: 'capillary',
    repo: 'capillary-analysis',
    stack: ['Next.js', 'GPT-4o Vision', 'tiktoken'],
    skills: [
      { group: 'frontend', items: ['Next.js', 'i18n'] },
      { group: 'backend', items: ['GPT-4o Vision', 'SSE streaming', 'tiktoken'] },
      { group: 'data', items: ['ImageKit CDN'] },
      { group: 'infra', items: ['Docker'] },
      { group: 'patterns', items: ['Prompt engineering', 'Token budgeting', 'CDN-URL image strategy'] },
    ],
  },
  {
    id: 'prm',
    repo: 'prm',
    stack: ['Next.js', 'Express', 'MongoDB'],
    skills: [
      { group: 'frontend', items: ['Next.js 14', 'Ant Design', 'Recoil', 'React Query'] },
      { group: 'backend', items: ['Express', 'Socket.io', 'Firebase FCM'] },
      { group: 'data', items: ['MongoDB'] },
      { group: 'patterns', items: ['Multi-tier commission engine', 'Tax withholding', 'Payment IPN (VNPay)', 'Webhook ingestion (Shopee)'] },
    ],
  },
  {
    id: 'cdp',
    repo: 'dcm',
    stack: ['Express', 'MongoDB', 'node-cron'],
    skills: [
      { group: 'backend', items: ['Express', 'Socket.io', 'node-cron', 'Droppii REST API', 'Smax Messenger'] },
      { group: 'data', items: ['MongoDB', 'ExcelJS'] },
      { group: 'patterns', items: ['Cron per-tenant ingestion', 'Upsert identity resolution', 'Content-hash campaign dedup', 'MLM spillover model'] },
    ],
  },
  {
    id: 'platform',
    repo: 'midu-core-storage',
    stack: ['NestJS', 'Sharp', 'JWT'],
    skills: [
      { group: 'backend', items: ['NestJS', 'Express', 'Sharp', 'Passport-JWT'] },
      { group: 'data', items: ['MongoDB'] },
      { group: 'infra', items: ['Docker', 'PM2'] },
      { group: 'patterns', items: ['Shared M2M storage', 'JWT access + refresh (hashed)', 'Structured logging (pino)'] },
    ],
  },
  {
    id: 'ddcc',
    repo: 'ddcc-website',
    stack: ['Next.js', 'Express', 'MongoDB'],
    skills: [
      { group: 'frontend', items: ['Next.js 14 (Pages Router)', 'React 18', 'Ant Design', 'Recoil'] },
      { group: 'backend', items: ['Express', 'Mongoose'] },
      { group: 'data', items: ['MongoDB', 'WHO growth-standard table'] },
      { group: 'patterns', items: ['Percentile + parental-height formula', 'Result-gated lead funnel', 'Shared backend, three frontends'] },
    ],
  },
  {
    id: 'xwealth',
    repo: 'x-wealth',
    stack: ['Next.js', 'GraphQL', 'Highcharts'],
    skills: [
      { group: 'frontend', items: ['Next.js 13', 'React 18', 'Ant Design', 'Tailwind'] },
      { group: 'data', items: ['Apollo Client', 'graphql-ws (subscriptions)', 'React Query', 'Recoil'] },
      { group: 'infra', items: ['Kubernetes', 'GitLab CI', 'SonarQube'] },
      { group: 'patterns', items: ['Atom-per-symbol realtime', 'Trading-session gating', 'Decimal tick-size math', 'WebGL charting (Highcharts boost)'] },
    ],
  },
  {
    id: 'zalo-llm',
    repo: null, // described from experience — no single public repo
    stack: ['NestJS', 'RAG', 'Fine-tuned LLMs'],
    skills: [
      { group: 'backend', items: ['NestJS', 'OpenClaw agent gateway'] },
      { group: 'patterns', items: ['RAG pipeline', 'Fine-tuned LLMs', 'Zalo channel integration'] },
    ],
  },
  {
    id: 'ai-workflow',
    repo: 'claude-skills',
    stack: ['Claude Code', 'Plugins & Hooks', 'CI'],
    skills: [
      { group: 'infra', items: ['Claude Code plugin marketplace', 'GitHub Actions CI', 'Git hooks'] },
      { group: 'patterns', items: ['Coding standards as skills', 'Design-system-as-plugin', 'Brand-compliance review agent', 'Guard hooks (SessionStart / PostToolUse)', 'Subagent-driven two-stage review', 'discuss → plan → execute → ship pipeline'] },
    ],
  },
]

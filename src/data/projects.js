// Language-neutral project cores — the single source of truth for tech/skills.
// Localized name/role/summary/problem/highlights live in profile.js /
// profile.vi.js, merged by id. Tech tags here are verified against source;
// dead/scaffolded deps (unused queues, template CI, etc.) are deliberately
// omitted. Skill rows are a selection, not an inventory: commodity tooling a
// reader already assumes at this level is left out so the distinctive choices
// and the `patterns` row carry the signal. `url` is required — null means the
// product is private, which renders the Private badge.

export const PROJECTS = [
  {
    id: 'agentdc',
    repo: 'agentdc',
    url: 'https://agentdc.nqdiepoii.com/',
    stack: ['Go', 'ConPTY / PTY', 'SQLite', 'MCP'],
    skills: [
      { group: 'backend', items: ['Go 1.26', 'ConPTY (Windows)', 'creack/pty (Linux)', 'Windows Job Objects', 'POSIX process groups + signals', 'MCP Go SDK over Streamable HTTP', 'go:embed'] },
      { group: 'frontend', items: ['xterm.js terminal', 'Vanilla JS portal, no build step'] },
      { group: 'data', items: ['SQLite via modernc (pure Go, no cgo)', 'In-place schema migrations on open'] },
      { group: 'infra', items: ['Single static binary, Windows + Linux from one runner', 'GitHub Actions — 13 jobs with vet + govulncheck', 'Self-update with process handoff'] },
      { group: 'patterns', items: ['Hook-correlated end-of-turn detection', 'Git-worktree fan-out', 'Capability-scoped reply door', 'One-time key traded for an HMAC cookie', 'Constant-time capability compare', 'SSRF-guarded media ingest', 'Prompt injection as the threat model'] },
    ],
  },
  {
    id: 'documind',
    repo: 'documind',
    url: null,
    stack: ['Next.js', 'Qdrant', 'Neo4j', 'OpenAI'],
    skills: [
      { group: 'frontend', items: ['Next.js 15 (App Router)', 'React 19', 'Cytoscape.js graph explorer', 'Streaming chat UI'] },
      { group: 'backend', items: ['LangChain document loaders', 'pdf-parse + mammoth (PDF/DOCX)', 'OpenAI embeddings', 'Entity extraction pipeline', 'Topic modelling', 'jose JWT (HS256)'] },
      { group: 'data', items: ['Qdrant (vector search)', 'Neo4j + Cypher', 'MongoDB', 'Idempotent MERGE writes', 'SAME_AS / SIMILAR_TO edge model'] },
      { group: 'patterns', items: ['GraphRAG — hybrid vector + graph retrieval', 'Cross-document entity resolution', 'Jaccard overlap + abbreviation heuristics', 'Batched embeddings with inter-batch backpressure', 'Path-traversal hardening', 'Graceful degradation over distributed transactions'] },
    ],
  },
  {
    id: 'academy',
    repo: 'training-platform',
    url: 'https://training.midu.vn',
    stack: ['NestJS', 'React', 'Bunny Stream', 'MongoDB'],
    skills: [
      { group: 'frontend', items: ['React 18 + Vite', 'hls.js over MediaSource', 'tus-js-client (resumable direct upload)', 'react-rnd (certificate design canvas)'] },
      { group: 'backend', items: ['NestJS 10', 'Custom guards: role / admin-only / device-session', 'Field-level authz beneath the route guard', 'ValidationPipe (whitelist + forbidNonWhitelisted)', '@nestjs/throttler with a per-account tracker'] },
      { group: 'data', items: ['MongoDB — 15 collections', 'Unique index used as concurrency control', 'TTL index for session expiry', 'Compound unique (account, courseResource)'] },
      { group: 'infra', items: ['Bunny Stream (HLS, CDN token auth, webhook)', 'ImageKit browser-direct signed upload', 'SSO against the loyalty backend', '933 tests across 121 files'] },
      { group: 'patterns', items: ['Server-verified watch accounting (heartbeat)', 'Path-signed short-lived playback URLs', 'HMAC / SHA-256 signing across 3 schemes', 'One-account-one-device sessions', 'Pooled + shuffled exam papers', '25 pure rule modules, each with a sibling spec', 'Security assertions as executable tests'] },
    ],
  },
  {
    id: 'capillary',
    repo: 'capillary-analysis',
    url: null,
    stack: ['Next.js', 'GPT-4o Vision', 'tiktoken'],
    skills: [
      { group: 'frontend', items: ['Next.js (Pages Router)', 'remark-math + rehype-mathjax', 'next-i18next (multi-locale)'] },
      { group: 'backend', items: ['GPT-4o Vision via OpenAI API', 'Next.js Edge runtime', 'SSE streaming (ReadableStream)', '@dqbd/tiktoken token counting', '224-line system prompt'] },
      { group: 'data', items: ['ImageKit CDN', 'CDN-URL payloads — ~85 tokens vs ~1,360 base64', 'Edge-safe base64 fallback (no Buffer)'] },
      { group: 'infra', items: ['Docker + Kubernetes manifests', 'Vitest'] },
      { group: 'patterns', items: ['Prompt engineering as the product', 'Hidden 5-step reasoning chain', 'Anti-refusal instructions for medical imagery', 'Token budgeting with oldest-first trim', 'Multimodal payload ordering'] },
    ],
  },
  {
    id: 'prm',
    repo: 'prm',
    url: null,
    stack: ['Next.js', 'Express', 'MongoDB'],
    skills: [
      { group: 'frontend', items: ['Next.js 14 + Ant Design', 'virtualizedtableforantd4 + react-window', 'React Native app (Expo Router)', 'gluestack-ui + NativeWind', 'expo-updates OTA'] },
      { group: 'backend', items: ['Express — 65 route groups, 69 controllers', 'Socket.io', 'node-cron', 'ExcelJS + PDFKit', 'firebase-admin (FCM)'] },
      { group: 'data', items: ['MongoDB — 71 models', 'Date-bounded policy windows', 'Revenue-bracket tier resolution'] },
      { group: 'infra', items: ['RabbitMQ + MinIO — scaffolded, disabled', 'Local disk storage in production'] },
      { group: 'patterns', items: ['Recursive multi-tier commission engine', 'F0 → F1 → F2 distribution tree', '10%-over-2,000,000-VND tax withholding', 'Synchronous recompute for auditability', 'VNPay IPN with IP allowlist', 'Shopee webhook ingestion', 'GPP certification as a domain gate'] },
    ],
  },
  {
    id: 'cdp',
    repo: 'dcm',
    url: null,
    stack: ['Express', 'MongoDB', 'node-cron'],
    skills: [
      { group: 'backend', items: ['Express — 27 route/controller pairs', 'node-cron', 'Socket.io', 'fluent-ffmpeg + ffprobe', 'iconv-lite (legacy encodings)', 'Droppii REST API client', 'Smax Messenger integration'] },
      { group: 'frontend', items: ['Next.js + Ant Design', '@tanstack/react-table', 'react-stockcharts', 'react-window + infinite-loader', 'decimal.js'] },
      { group: 'data', items: ['MongoDB — 32 models', 'Compound unique {brand, orderCode, productName}', 'Spillover-indexed MLM structure'] },
      { group: 'patterns', items: ['Upsert identity resolution across 3 sources', 'Minimal $set patches for legacy documents', 'Per-brand cron staggered 30 minutes', 'Token caching + pre-expiry auto-refresh', 'Content-hash + tag campaign dedup'] },
    ],
  },
  {
    id: 'platform',
    repo: 'midu-auth-architecture',
    url: null,
    stack: ['NestJS', 'Express', 'MongoDB'],
    skills: [
      { group: 'backend', items: ['NestJS auth-service', 'Passport-JWT', 'Express + TypeScript storage service', 'joi + envalid config validation', 'Sharp image re-encoding', 'nodemailer + SMS verification'] },
      { group: 'frontend', items: ['React auth-frontend', 'Mermaid + markdown architecture docs'] },
      { group: 'data', items: ['MongoDB', 'Session store keyed by refresh-token hash', 'Per-app role assignments', 'Migration module for legacy accounts'] },
      { group: 'infra', items: ['Docker + PM2', 'winston structured logging', 'Shared database with the loyalty backend'] },
      { group: 'patterns', items: ['Centralised SSO across products', 'OAuth provider module', 'Access + refresh tokens, refresh stored hashed', 'Server-side session revocation', 'Per-app RBAC', 'x-api-key M2M allowlist', 'Same-origin image proxy'] },
    ],
  },
  {
    id: 'ddcc',
    repo: 'ddcc-website',
    url: 'https://ddcc.vn/',
    stack: ['Next.js', 'Express', 'MongoDB'],
    skills: [
      { group: 'frontend', items: ['Next.js (Pages Router) + Ant Design', 'Apollo Client + graphql-ws', 'Highcharts', 'Dexie (IndexedDB cache)'] },
      { group: 'backend', items: ['Express — 55 route groups, 57 controllers', 'joi validation', 'p-limit concurrency control', 'ExcelJS + jszip', 'firebase-admin + fcm-node'] },
      { group: 'data', items: ['MongoDB — 74 models', 'WHO growth-standard percentile table', 'Gender-specific puberty-stage tables', 'MinIO'] },
      { group: 'infra', items: ['Three client surfaces on one backend', 'React Native app with CodePush', 'Zalo Mini App (zmp-sdk)', 'Sepay payments', 'Staged dev / staging / uat'] },
      { group: 'patterns', items: ['Percentile-channel tracking to age 20', '77/23 blend with mid-parental height', 'Linear growth-curve rescaling for the chart', 'Explainable formula over a black-box model', 'Result-gated lead funnel'] },
    ],
  },
  {
    id: 'xwealth',
    repo: 'x-wealth',
    url: 'https://xwealth.datx.vn/',
    stack: ['Next.js', 'GraphQL', 'Highcharts'],
    skills: [
      { group: 'frontend', items: ['Next.js 13 + Ant Design', '311 components', 'virtualizedtableforantd4', 'react-intersection-observer', 'twin.macro + styled-components'] },
      { group: 'data', items: ['Apollo Client', 'graphql-ws — 12 subscriptions across 32 call sites', '41 GraphQL operations', 'Recoil + recoil-persist', 'decimal.js money math', 'moment-timezone session windows'] },
      { group: 'infra', items: ['Kubernetes', 'GitLab CI', 'SonarQube quality gate', 'Multi-environment config'] },
      { group: 'patterns', items: ['Atom-per-symbol realtime state', 'Cell-level re-render isolation', 'Trading-session gating (HOSE/HNX/UPCOM)', 'Exchange tick-size bands (10/50/100 VND)', 'WebGL charting (Highcharts boost)'] },
    ],
  },
  {
    id: 'numerology',
    repo: 'numerology',
    url: null,
    stack: ['NestJS', 'Next.js', 'MongoDB', 'SePay'],
    skills: [
      { group: 'frontend', items: ['Next.js + Radix UI', '162 components', '@xyflow/react node graph', 'qrcode.react', 'disable-devtool guard'] },
      { group: 'backend', items: ['NestJS — 85 routes, 21 controllers', 'Zod validation', 'WebSockets (socket.io)', 'sharp + ImageKit signed upload'] },
      { group: 'data', items: ['MongoDB', 'Unique index as webhook idempotency key', 'In-repo migrations'] },
      { group: 'infra', items: ['SePay bank-transfer webhooks', 'VietQR payment codes', 'ConvertAPI (DOCX → PDF)', '1,166 tests across 97 spec files'] },
      { group: 'patterns', items: ['Numerology engine — life path, destiny, soul urge, pinnacles', '16-block report composition', 'Single source of truth across guest and logged-in flows', 'DOCX templating (docxtemplater + pizzip)', 'Webhook IP allowlist + constant-time key compare', 'Claim-once webhook processing', 'Guest teaser → email verify → paid report funnel'] },
    ],
  },
  {
    id: 'loyalty',
    repo: 'loyalty-website',
    url: null,
    stack: ['NestJS', 'React', 'MongoDB', 'VNPay'],
    skills: [
      { group: 'backend', items: ['NestJS 10 — 110 routes, 16 controllers', 'Passport-JWT', '@nestjs/websockets + socket.io', '@nestjs/schedule'] },
      { group: 'frontend', items: ['React + Vite', 'TanStack Query + Zustand', '55 components'] },
      { group: 'data', items: ['MongoDB — 16 schemas', 'Shared shops identity collection', 'Per-prize daily quantity ledger', 'Points transaction ledger'] },
      { group: 'infra', items: ['VNPay HMAC-SHA512 signing', 'Shared SSO with the auth service', 'M2M public API behind x-api-key', 'PRM integration channel'] },
      { group: 'patterns', items: ['Server-side prize draw — the client never picks', 'Absolute per-prize win rates', 'Residual probability split across unconfigured prizes', 'Runtime normalisation past 100%', 'Daily per-prize quantity caps', 'Graceful fallback when stock is exhausted'] },
    ],
  },
  {
    id: 'matching',
    repo: null, // client-owned repo — described from experience
    url: null,
    stack: ['Next.js', 'AWS AppSync', 'Cognito', 'GMO Payment'],
    skills: [
      { group: 'frontend', items: ['Next.js project foundation', 'Ant Design', 'Shared layout + routing conventions', 'Realtime subscription UI'] },
      { group: 'backend', items: ['GraphQL schema-first contract', 'AWS AppSync resolvers', 'AWS Lambda', 'Amazon Cognito user pools', 'GMO Payment integration'] },
      { group: 'infra', items: ['AWS CDK + CloudFormation', 'Managed serverless', 'Environment-per-stage stacks'] },
      { group: 'patterns', items: ['Schema as the frontend/backend contract', 'AppSync subscriptions instead of a self-managed socket server', 'Provider-callback payment reconciliation', 'Foundation work for a 25-person team', 'Japanese-market payment expectations'] },
    ],
  },
  {
    id: 'datx-admin',
    repo: null, // company-owned repo — described from experience
    url: null,
    stack: ['React', 'Express', 'MongoDB', 'PostgreSQL'],
    skills: [
      { group: 'frontend', items: ['React', 'Material UI', 'Redux / Recoil', 'Dense admin surfaces'] },
      { group: 'backend', items: ['Express', 'RESTful API design', 'SQL schema + migrations'] },
      { group: 'data', items: ['MongoDB', 'PostgreSQL', 'Polyglot persistence — store chosen per record type'] },
      { group: 'patterns', items: ['Fullstack ownership of a feature end to end', 'Internal tooling for a live fintech product', 'Working inside an 18-person team', 'Conventions over individual preference'] },
    ],
  },
  {
    id: 'harness',
    repo: 'harness',
    url: null,
    stack: ['Go', 'go:embed', 'Three-way merge', 'CLI'],
    skills: [
      { group: 'backend', items: ['Go 1.26', 'Hexagonal architecture — domain ← application ← infrastructure', 'Narrow ports per use case', 'go:embed single-binary distribution', 'os/exec git adapter', 'Hand-written strict JSON decoder'] },
      { group: 'data', items: ['SHA-256 content hashing', 'manifest.json provenance schema', 'Installed baseline for three-way comparison', 'Transaction journal (schema 2)'] },
      { group: 'infra', items: ['One self-contained executable — no server, database or daemon', 'Exit code 2 as the conflict contract', 'Claude Code plugin marketplace', '37 skills · 26 commands · 16 agents', 'CI-gated design-system plugin'] },
      { group: 'patterns', items: ['Three-way merge via git merge-file --diff3', 'Frozen conflict inputs + resolved/ copy', 'Exclusive state lock', 'Recover-before-act', 'Refusing schema-1 journals with no integrity metadata', 'Version-locked payload identity', 'Authority gates', 'Evidence-based completion standard'] },
    ],
  },
]

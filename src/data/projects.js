// Language-neutral project cores — the single source of truth for tech/skills.
// Localized name/role/summary/problem/highlights live in profile.js /
// profile.vi.js, merged by id. Tech tags here are verified against source;
// dead/scaffolded deps (unused queues, template CI, etc.) are deliberately omitted.

export const PROJECTS = [
  {
    id: 'agentdc',
    repo: 'agentdc',
    url: 'https://agentdc.nqdiepoii.com/',
    stack: ['Go', 'ConPTY / PTY', 'SQLite', 'MCP'],
    skills: [
      { group: 'backend', items: ['Go 1.26', 'net/http ServeMux (1.22 method patterns)', 'cobra CLI', 'coder/websocket relay', 'MCP Go SDK over Streamable HTTP', 'ConPTY (Windows)', 'creack/pty (Linux)', 'golang.org/x/term', 'Windows Job Objects', 'POSIX process groups + signals', 'context-scoped cancellation', 'go:embed'] },
      { group: 'frontend', items: ['xterm.js terminal', 'Vanilla JS portal, no build step', 'Embedded static assets', 'WebSocket live relay'] },
      { group: 'data', items: ['SQLite via modernc (pure Go, no cgo)', '22 tables', 'In-place schema migrations on open', 'WAL journal mode'] },
      { group: 'infra', items: ['Single static binary', 'GitHub Actions — 13 jobs', 'gofmt + go vet + govulncheck gates', 'Windows + Linux cross-build from one runner', 'Self-update with process handoff', 'Loopback-only bind'] },
      { group: 'patterns', items: ['PTY session daemon', 'Hook-correlated end-of-turn detection', 'Silence/dialog heuristic fallback', 'Git-worktree fan-out', 'Capability-scoped reply door', 'One-time key traded for an HMAC cookie', 'Host-scoped HttpOnly cookie', 'Constant-time capability compare', 'SSRF-guarded media ingest', 'MIME vs file-signature check', 'Prompt injection as the threat model', 'Table-driven tests (3,540 test funcs)'] },
    ],
  },
  {
    id: 'documind',
    repo: 'documind',
    url: null,
    stack: ['Next.js', 'Qdrant', 'Neo4j', 'OpenAI'],
    skills: [
      { group: 'frontend', items: ['Next.js 15 (App Router)', 'React 19', 'TypeScript', 'Tailwind', 'Radix UI primitives', 'Cytoscape.js + cose-bilkent layout', 'react-dropzone uploads', 'react-markdown + remark-gfm', 'Streaming chat UI'] },
      { group: 'backend', items: ['14 route handlers', 'LangChain document loaders', 'pdf-parse + mammoth (PDF/DOCX)', 'OpenAI embeddings', 'LLM generation', 'Entity extraction pipeline', 'Topic modelling', 'Document-similarity scoring', 'multer uploads', 'jose JWT (HS256)', 'bcryptjs'] },
      { group: 'data', items: ['Qdrant (vector search)', 'Neo4j + Cypher (knowledge graph)', 'MongoDB', 'Idempotent MERGE writes', 'SAME_AS / SIMILAR_TO edge model', 'Local file store'] },
      { group: 'infra', items: ['Biome (lint + format)', 'Env-driven provider config'] },
      { group: 'patterns', items: ['RAG', 'GraphRAG — hybrid vector + graph retrieval', 'Cross-document entity resolution', 'Jaccard overlap + abbreviation heuristics', 'Batched embeddings (100/request)', 'Deliberate inter-batch backpressure', 'httpOnly cookie auth with role claim', 'Path-traversal hardening', 'Graceful degradation over distributed transactions'] },
    ],
  },
  {
    id: 'academy',
    repo: 'training-platform',
    url: 'https://training.midu.vn',
    stack: ['NestJS', 'React', 'Bunny Stream', 'MongoDB'],
    skills: [
      { group: 'frontend', items: ['React 18 + TypeScript', 'Vite 5', 'Tailwind', 'TanStack Query', 'Zustand', 'hls.js over MediaSource', 'tus-js-client (resumable direct upload)', 'dnd-kit (chapter/lesson ordering)', 'react-rnd (certificate design canvas)', 'Recharts', 'react-quill'] },
      { group: 'backend', items: ['NestJS 10', 'Passport-JWT strategy', 'Custom guards: role / admin-only / device-session', 'Field-level authz beneath the route guard', 'Global ValidationPipe (whitelist + forbidNonWhitelisted)', 'Exception filter + response-envelope interceptor', 'helmet + CORS allowlist', '@nestjs/throttler with a per-account tracker', 'sanitize-html', 'ExcelJS', 'Swagger'] },
      { group: 'data', items: ['MongoDB / Mongoose 8', '15 TRAINING_* collections', 'Unique index used as concurrency control', 'TTL index for session expiry', 'Compound unique (account, courseResource)', 'Shared shops identity collection'] },
      { group: 'infra', items: ['Bunny Stream (HLS, CDN token auth, webhook)', 'ImageKit (browser-direct signed upload)', 'SSO against the loyalty backend', 'Fail-fast config via getOrThrow', 'Jest + node:test — 933 cases across 121 files'] },
      { group: 'patterns', items: ['25 pure rule modules, each with a sibling spec', 'Server-verified watch accounting (heartbeat)', 'Path-signed short-lived playback URLs', 'HMAC / SHA-256 request signing (3 schemes)', 'One-account-one-device sessions', 'Pooled + shuffled exam papers', 'Phone-number identity canonicalisation', 'Forensic watermark + capture heuristics', 'Security assertions as executable tests'] },
    ],
  },
  {
    id: 'capillary',
    repo: 'capillary-analysis',
    url: null,
    stack: ['Next.js', 'GPT-4o Vision', 'tiktoken'],
    skills: [
      { group: 'frontend', items: ['Next.js (Pages Router)', 'React', 'TypeScript', 'Tailwind', 'react-markdown', 'remark-math + rehype-mathjax', 'react-syntax-highlighter', 'React Query', 'next-i18next (multi-locale)', 'Responsive + mobile shell'] },
      { group: 'backend', items: ['GPT-4o Vision via OpenAI API', 'Next.js Edge runtime', 'SSE streaming (ReadableStream)', 'eventsource-parser', '@dqbd/tiktoken token counting', 'sharp image processing', '224-line system prompt'] },
      { group: 'data', items: ['ImageKit CDN', 'CDN-URL image payloads (~85 tokens vs ~1,360 base64)', 'Edge-safe base64 fallback (no Buffer)'] },
      { group: 'infra', items: ['Docker + docker-compose', 'Kubernetes manifests', 'Vitest + coverage', 'ESLint + Prettier (import sorting)'] },
      { group: 'patterns', items: ['Prompt engineering as the product', 'Hidden 5-step reasoning chain', 'Anti-refusal instructions for medical imagery', 'Randomized openers', 'Token budgeting with oldest-first trim', 'Per-image flat token estimate', 'Multimodal payload ordering', 'SSE [DONE] sentinel parsing'] },
    ],
  },
  {
    id: 'prm',
    repo: 'prm',
    url: null,
    stack: ['Next.js', 'Express', 'MongoDB'],
    skills: [
      { group: 'frontend', items: ['Next.js 14', 'React', 'Ant Design + @ant-design/plots', 'Recoil', 'React Query', 'socket.io-client', 'react-window + virtualizedtableforantd4', 'dnd-kit ordering', 'Quill / react-rte editors', 'Recharts', 'jsbarcode', 'react-to-print + html2canvas', 'next-i18next', 'React Native app (Expo Router)', 'gluestack-ui + NativeWind', 'Zustand + react-hook-form', 'Reanimated', 'expo-updates OTA'] },
      { group: 'backend', items: ['Express (65 route groups, 69 controllers)', 'Mongoose', 'Socket.io', 'node-cron', 'JWT + bcrypt', 'multer uploads', 'helmet + compression + morgan', 'i18n', 'Swagger (jsdoc + UI)', 'ExcelJS + xlsx', 'PDFKit + qrcode', 'otp-generator', 'pug email templates', 'firebase-admin (FCM)'] },
      { group: 'data', items: ['MongoDB', '71 models', 'Date-bounded policy windows', 'Revenue-bracket tier resolution'] },
      { group: 'infra', items: ['RabbitMQ (amqplib) — scaffolded, disabled', 'MinIO — scaffolded, disabled', 'Local disk storage in production'] },
      { group: 'patterns', items: ['Recursive multi-tier commission engine', 'F0 → F1 → F2 distribution tree', '10%-over-2,000,000-VND tax withholding', 'Synchronous recompute for auditability', 'VNPay IPN with IP allowlist', 'Shopee webhook ingestion', 'GPP certification as a domain gate', 'Socket.IO per-user rooms', 'FCM multicast with dead-token pruning'] },
    ],
  },
  {
    id: 'cdp',
    repo: 'dcm',
    url: null,
    stack: ['Express', 'MongoDB', 'node-cron'],
    skills: [
      { group: 'backend', items: ['Express (27 route/controller pairs)', 'Mongoose', 'Socket.io', 'node-cron', 'JWT + bcrypt', 'helmet + compression', 'i18n', 'fluent-ffmpeg + ffprobe', 'iconv-lite (legacy encodings)', 'Droppii REST API client', 'Smax Messenger integration'] },
      { group: 'frontend', items: ['Next.js', 'Ant Design', '@tanstack/react-table', 'Apollo Client', 'TinyMCE', 'react-stockcharts + Recharts', 'Recoil', 'React Query', 'react-window + infinite-loader', 'virtualizedtableforantd4', 'decimal.js', 'd3-format / d3-time-format', 'jsPDF export'] },
      { group: 'data', items: ['MongoDB', '32 models', 'Compound unique {brand, orderCode, productName}', 'Spillover-indexed MLM structure', 'ExcelJS / xlsx / csvtojson / json2csv'] },
      { group: 'patterns', items: ['Upsert identity resolution across 3 sources', 'Case-insensitive create-if-absent matching', 'Minimal $set patches for legacy documents', 'Per-brand cron staggered 30 minutes', 'Production-gated schedulers', 'Token caching + pre-expiry auto-refresh', 'Content-hash + tag campaign dedup', 'Socket.IO progress for long Excel syncs', '30-minute request timeout for bulk jobs'] },
    ],
  },
  {
    id: 'platform',
    repo: 'midu-auth-architecture',
    url: null,
    stack: ['NestJS', 'Express', 'MongoDB'],
    skills: [
      { group: 'backend', items: ['NestJS auth-service', 'Passport-JWT + @nestjs/jwt', '@nestjs/throttler', 'class-validator + class-transformer', 'Swagger', 'nodemailer (email verification)', 'SMS verification', 'helmet + cookie-parser', 'Express + TypeScript storage service', 'joi + envalid config validation', 'Sharp image re-encoding', 'multer', 'Pusher'] },
      { group: 'frontend', items: ['React auth-frontend', 'Ant Design', 'react-router-dom', 'i18next', 'Mermaid + markdown architecture docs'] },
      { group: 'data', items: ['MongoDB / Mongoose', 'Session store keyed by refresh-token hash', 'Per-app role assignments', 'Migration module for legacy accounts'] },
      { group: 'infra', items: ['Docker', 'PM2', 'winston structured logging', 'Shared database with the loyalty backend'] },
      { group: 'patterns', items: ['Centralised SSO across products', 'OAuth provider module', 'Access + refresh tokens, refresh stored hashed', 'Server-side session revocation', 'Per-app RBAC (app-roles)', 'Email + SMS verification flows', 'x-api-key M2M allowlist', 'Same-origin image proxy for cross-origin embeds', 'Normalised media pipeline (jpeg/png/webp)'] },
    ],
  },
  {
    id: 'ddcc',
    repo: 'ddcc-website',
    url: 'https://ddcc.vn/',
    stack: ['Next.js', 'Express', 'MongoDB'],
    skills: [
      { group: 'frontend', items: ['Next.js (Pages Router)', 'React 18', 'Ant Design', 'Recoil', 'React Query', 'Apollo Client + graphql-ws', 'Highcharts', '@tanstack/react-table', 'Dexie (IndexedDB cache)', 'react-beautiful-dnd', 'Quill editor', 'jsPDF + html2canvas', 'qrcode', 'next-i18next'] },
      { group: 'backend', items: ['Express (55 route groups, 57 controllers)', 'Mongoose', 'JWT + bcrypt', 'joi validation', 'node-cron', 'ExcelJS + jszip + archiver', 'p-limit concurrency control', 'googleapis', 'firebase-admin + fcm-node', 'pug email templates', 'otp-generator', 'i18n'] },
      { group: 'data', items: ['MongoDB', '74 models', 'WHO growth-standard percentile table', 'Gender-specific puberty-stage tables', 'MinIO (object storage)'] },
      { group: 'infra', items: ['Three client surfaces on one backend', 'React Native app with CodePush / AppCenter', 'Zalo Mini App (zmp-sdk, zmp-ui)', 'Staged dev / staging / uat environments', 'Sepay payments'] },
      { group: 'patterns', items: ['Percentile-channel tracking to age 20', '77/23 blend with mid-parental height', 'Fixed penalty per missing lifestyle answer', 'Linear growth-curve rescaling for the chart', 'Explainable formula over a black-box model', 'Result-gated lead funnel (protocol code only)', 'hasResult / hasConsult / hasCourse state machine', 'Product-suggestion engine'] },
    ],
  },
  {
    id: 'xwealth',
    repo: 'x-wealth',
    url: 'https://xwealth.datx.vn/',
    stack: ['Next.js', 'GraphQL', 'Highcharts'],
    skills: [
      { group: 'frontend', items: ['Next.js 13', 'React 18', 'TypeScript', 'Ant Design', 'Tailwind + twin.macro', 'styled-components', '311 components', 'virtualizedtableforantd4 (virtualised tables)', 'react-window-style infinite scroll', 'react-intersection-observer', 'Loading skeletons', 'next-i18next'] },
      { group: 'data', items: ['Apollo Client', 'graphql-ws subscriptions (12 ops, 32 call sites)', '41 GraphQL operations', 'React Query', 'Recoil + recoil-persist', 'localforage', 'decimal.js money math', 'moment-timezone session windows'] },
      { group: 'backend', items: ['Next.js API routes (BFF)', 'Socket.io client', 'Firebase', 'Google + Facebook OAuth', 'reCAPTCHA'] },
      { group: 'infra', items: ['Kubernetes', 'GitLab CI', 'SonarQube quality gate', 'Docker', 'Husky pre-commit hooks', 'Multi-environment config'] },
      { group: 'patterns', items: ['Atom-per-symbol realtime state', 'Cell-level re-render isolation', 'Keepalive + missed-pong reconnect', 'Trading-session gating (HOSE/HNX/UPCOM)', 'Exchange tick-size bands (10/50/100 VND)', 'WebGL charting (Highcharts boost)', 'Treemap heatmaps', 'Client-side PDF export (jsPDF + html2canvas)'] },
    ],
  },
  {
    id: 'numerology',
    repo: 'numerology',
    url: null,
    stack: ['NestJS', 'Next.js', 'MongoDB', 'SePay'],
    skills: [
      { group: 'frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Radix UI primitives', '162 components', '@xyflow/react node graph', 'dnd-kit ordering', 'Recharts', 'react-day-picker', 'qrcode.react', 'Socket.io client', 'disable-devtool guard'] },
      { group: 'backend', items: ['NestJS (85 routes, 21 controllers, 24 services)', '@nestjs/throttler', '@nestjs/schedule', 'WebSockets (socket.io)', 'Zod validation', 'nodemailer', 'cheerio', 'sharp', 'ImageKit signed upload'] },
      { group: 'data', items: ['MongoDB', 'Unique index as webhook idempotency key', 'In-repo migrations', 'digit-meanings content pool'] },
      { group: 'infra', items: ['SePay bank-transfer webhooks', 'VietQR payment codes', 'ConvertAPI (DOCX → PDF)', 'Smax messaging integration', 'Email verification flow', '1,166 tests across 97 spec files'] },
      { group: 'patterns', items: ['Numerology engine — life path, destiny, soul urge, personal year, pinnacles, essence', '16-block report composition', 'Single source of truth across guest and logged-in flows', 'DOCX templating (docxtemplater + pizzip)', 'Generated report emailed as PDF', 'Webhook IP allowlist + constant-time key compare', 'Boot-time trust-proxy sanity check', 'Claim-once webhook processing', 'Affiliate and voucher pricing', 'Guest teaser → email verify → paid report funnel'] },
    ],
  },
  {
    id: 'loyalty',
    repo: 'loyalty-website',
    url: null,
    stack: ['NestJS', 'React', 'MongoDB', 'VNPay'],
    skills: [
      { group: 'backend', items: ['NestJS 10 (110 routes, 16 controllers, 18 services)', 'Passport-JWT', '@nestjs/throttler', '@nestjs/websockets + socket.io', '@nestjs/schedule', 'class-validator', 'Swagger', 'helmet'] },
      { group: 'frontend', items: ['React + Vite', 'TanStack Query', 'Zustand', 'react-router-dom', 'Tailwind', '55 components', 'ImageKit', 'Socket.io client'] },
      { group: 'data', items: ['MongoDB / Mongoose', '16 schemas', 'Shared shops identity collection', 'Per-prize daily quantity ledger', 'Points transaction ledger'] },
      { group: 'infra', items: ['VNPay HMAC-SHA512 signing', 'Shared SSO with the auth service', 'M2M public API behind x-api-key', 'PRM integration channel'] },
      { group: 'patterns', items: ['Server-side prize draw — the client never picks', 'Absolute per-prize win rates', 'Residual probability split across unconfigured prizes', 'Runtime normalisation when rates exceed 100%', 'Daily per-prize quantity caps', 'Cumulative-probability selection', 'Graceful fallback when stock is exhausted', 'Points accumulation ledger', 'Gift exchange + prize fulfilment', 'Signed payment return-URL verification'] },
    ],
  },
  {
    id: 'matching',
    repo: null, // client-owned repo — described from experience
    url: null,
    stack: ['Next.js', 'AWS AppSync', 'Cognito', 'GMO Payment'],
    skills: [
      { group: 'frontend', items: ['Next.js project foundation', 'React', 'TypeScript', 'Ant Design', 'Shared layout + routing conventions', 'Responsive across devices', 'GraphQL client integration', 'Realtime subscription UI'] },
      { group: 'backend', items: ['GraphQL schema-first contract', 'AWS AppSync resolvers', 'AWS Lambda', 'Amazon Cognito user pools', 'Prisma', 'GMO Payment integration'] },
      { group: 'infra', items: ['AWS CDK', 'CloudFormation', 'Managed serverless (no servers to operate)', 'Environment-per-stage stacks'] },
      { group: 'patterns', items: ['Schema as the frontend/backend contract', 'AppSync subscriptions instead of a self-managed socket server', 'Provider-callback payment reconciliation', 'Foundation work for a 25-person team', 'Japanese-market UX and payment expectations', 'Outsourcing delivery against a client spec'] },
    ],
  },
  {
    id: 'datx-admin',
    repo: null, // company-owned repo — described from experience
    url: null,
    stack: ['React', 'Express', 'MongoDB', 'PostgreSQL'],
    skills: [
      { group: 'frontend', items: ['React', 'TypeScript', 'Material UI', 'Tailwind CSS', 'Redux', 'Recoil', 'Responsive admin surfaces', 'Dense data tables and forms'] },
      { group: 'backend', items: ['Express', 'TypeScript', 'RESTful API design', 'Mongoose', 'SQL schema + migrations'] },
      { group: 'data', items: ['MongoDB', 'PostgreSQL', 'Polyglot persistence — store chosen per record type'] },
      { group: 'patterns', items: ['Fullstack ownership of a feature end to end', 'Internal tooling for a live fintech product', 'Working inside an 18-person team', 'Code written to be read by people you never speak to'] },
    ],
  },
  {
    id: 'ai-workflow',
    repo: 'claude-skills',
    url: null,
    stack: ['Claude Code', 'Plugins & Hooks', 'CI'],
    skills: [
      { group: 'infra', items: ['Claude Code plugin marketplace (marketplace.json)', 'Versioned, CI-gated design-system plugin', 'GitHub Actions CI on the plugin repo', 'hooks.json event wiring', 'Git hooks', 'Agent Mail coordination', 'Beads issue tracker (bd / bv)', 'Git worktree isolation per work track', 'Self-serve QUICKSTART + CHANGELOG discipline'] },
      { group: 'frontend', items: ['Brand design tokens', 'Bundled font families (Lexend, FzRubik)', 'Vietnamese-diacritic font validation', 'Accessibility rules (:focus-visible)'] },
      { group: 'patterns', items: ['37 skills, 26 slash-commands, 16 agents', '/new-project → /discuss → /plan → /execute → /ship', 'Coding standards packaged as skills (TypeScript + Go rule sets)', 'Design system as an installable plugin', 'AI-readable brand non-negotiables', 'SessionStart hook injects brand rules', 'PostToolUse hook re-scans every edit', 'midu-brand-review agent — Blocker/Major/Minor gate', 'Subagent-driven development', 'Two-stage review: spec compliance → code quality', 'bead-orchestrator parallel work tracks', 'Test-driven-development enforcement', 'Systematic-debugging six-phase loop', 'Spec/plan artifacts under .planning/'] },
    ],
  },
]

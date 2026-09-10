// All portfolio content lives here — one file to edit, zero markup to touch.

export const EXPERIENCE = [
  {
    company: 'Midu Group (MenaQ7)',
    period: 'Oct 2023 — Present',
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
        period: 'Oct 2023 — Mar 2024',
        points: [
          'Built Baby Face Prediction (viral AI campaign, team of 2) and the production infrastructure still in use today.',
        ],
      },
    ],
  },
  {
    company: 'DATX Technologies',
    period: 'Nov 2022 — Oct 2023',
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
    period: 'Mar 2021 — Nov 2022',
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
    id: 'agentdc', name: 'AgentDC — Coding-Agent Daemon', role: 'Builder',
    summary: 'A Go daemon holding Claude Code, Codex and OpenCode in real PTYs — driven by CLI, portal, MCP or Zalo.',
    problem: 'Coding agents are TUIs — they assume a human at a terminal. Driving one from a script, a browser or a customer chat channel means owning a real pseudo-terminal on both Windows and Linux, and then answering the question a TUI never has to: when is this turn actually over?',
    highlights: [
      'End-of-turn detection, exact where it can be: a daemon-driven send binds the Claude UserPromptSubmit hook’s prompt_id to the text it wrote into the PTY, and finishes only on the matching Stop hook. Older builds, dead hooks and non-Claude profiles fall back to a documented silence/dialog heuristic.',
      'One codebase over two OS process models: Windows drives ConPTY inside a Job Object, Linux a real PTY with a signalable process group. 56 _windows.go and 25 _linux.go files keep the split at the syscall layer, and a pure-Go SQLite driver means no cgo — both targets cross-build from one runner.',
      'Fan-out that refuses to grade itself: N git worktrees on their own branches, a headless ‘claude -p’ in each, token cost printed before anything is created, an outcome table at the end. Untracked files get their own column — agents never commit, so git diff cannot see their work. Deliberately no score.',
      'The portal is never handed the master token: a one-time key is traded for an HMAC-signed, host-scoped, 12-hour HttpOnly cookie, which is then refused /shutdown, /runs and the prompt route. The same 197-route loopback API also serves MCP over Streamable HTTP — 10 tools, 256 KiB response cap.',
      'Prompt injection as the real threat model: the only door an agent speaks through on Zalo takes a batch id and no thread id, so “forward this to group X” has no parameter to point at X; the batch capability is compared in constant time. Media ingest refuses private addresses and checks MIME against the file signature.',
      'Scale and stated ceiling: ~93,000 lines of non-test Go against 3,540 test functions, 911 commits in seven weeks, a 13-job pipeline with gofmt, vet and govulncheck. Verified only on Windows 10 1809+ and Ubuntu Desktop 22.04/24.04 x86-64 — no macOS, no ARM — and interactive logs are a ConPTY repaint, not a faithful transcript.',
    ],
  },
  {
    id: 'documind', name: 'Documind — AI Document Intelligence', role: 'Builder',
    summary: 'A RAG assistant over an internal document set that pairs vector search with a knowledge graph.',
    problem: 'Turn a pile of uploaded documents into one queryable knowledge graph. Per-document extraction is the easy part; the hard part is resolving the same entity across documents and keeping three heterogeneous stores consistent without a distributed transaction.',
    highlights: [
      'Hybrid retrieval (GraphRAG): Qdrant vector similarity for semantic recall, plus a Neo4j knowledge graph for relational context — vector-only retrieval answers “what looks similar,” the graph answers “what connects to what.”',
      'Cross-document entity resolution: per-chunk co-occurrence edges, then cross-doc dedup via Jaccard word-overlap + name-subset/abbreviation heuristics producing SAME_AS / SIMILAR_TO edges. Stated ceiling: the clustering is O(n²) per category with no embedding-based resolution yet — correct for the current corpus, and the first thing I’d rework before scaling the document count.',
      'Consistency without a distributed transaction: every graph write is an idempotent Cypher MERGE, so re-ingesting a document can’t double-create nodes; a downstream outage (e.g. a Qdrant delete failing) degrades to a surfaced warning rather than a hard failure.',
      'Throughput control against the model provider: embeddings batched at 100 texts/request and entity extraction at 3 chunks/batch with explicit inter-batch delays — deliberate backpressure so ingestion doesn’t trip rate limits.',
      'Security: replaced the template’s Clerk with custom JWT (jose, HS256, httpOnly cookie, role claim from an admin allowlist); the local file store sanitizes every path segment and re-verifies the resolved path stays under the storage root (path-traversal hardening).',
      'Access model matched to reality: admin-gated ingestion, public grounded Q&A over one shared corpus — a single-organization knowledge base, deliberately not multi-tenant.',
    ],
  },
  {
    id: 'academy', name: 'MIDU Academy — Course & Video Platform', role: 'Architect / Owner',
    summary: 'A paid-course platform where the hard part is keeping paid video paid — signed HLS, server-verified watch time, one device per account.',
    problem: 'Sell video lessons on the open web. The playback URL is handed to the browser, the progress the player reports is written by whoever wants to skip the lesson, and an account is trivially shareable — yet completion, exam eligibility and the certificate all rest on exactly those numbers.',
    highlights: [
      'Watch time verified server-side, client treated as the adversary: a 10-second heartbeat credits min(elapsed × rate, distance advanced), caps a suspended tab at 30s, and rejects a seek past maxWatched + 3s grace or a replayed sequence. Position, not the client’s playing flag — which had quietly made short lessons uncompletable.',
      'Three signing schemes written against each provider’s exact payload order (TUS credential, HMAC-SHA-256 CDN token, ImageKit). Playback URLs live 3 minutes behind a 60-second session and every re-mint re-runs authorisation, so a cancelled subscription loses playback in under a minute.',
      'Concurrency control in the database, not application code: a unique index arbitrates two devices racing to start, since “revoke then insert” is two operations both racers win. Tokens minted before the rule stay valid until next sign-in — a migration-safe rollout.',
      'A privilege-escalation path found and closed in my own code: an INTERNAL user could PATCH their own role to ADMIN — the field survived the global whitelist pipe because the DTO declares it, and took effect immediately because the JWT strategy re-reads the account. Guards protect routes; this needed authorisation per field.',
      'Server-side marking alone leaks a permanent answer key after a few retries, so papers are sampled from a pool and shuffled per learner. Certificate codes went from six derived base36 characters (~8% collision odds at 19,000 certificates, forgeable offline) to 128 random bits in Crockford base32.',
      'Identity across a collection five systems have written for years: 19,214 of 19,249 rows canonical, 26 missing a leading zero, 11 people duplicated. Canonicalisation leaves unreadable input alone — failing a lookup beats matching the wrong person.',
      '25 domain rules live in pure modules beside their service, each with a sibling spec — testable without a database. Security is asserted executably: one test greps the built bundle for a leaked key, another blocks E2E unless the database name ends in E2E. 107 routes, 15 collections, ~42k lines of non-test TypeScript, 933 tests, 339 commits. Honest ceiling: no Dockerfile or CI yet — deployment is manual.',
    ],
  },
  {
    id: 'xwealth', name: 'xWealth — Retail Investing Platform', role: 'Fullstack Developer · DATX',
    summary: 'A live stock-evaluation and trading-signal platform for Vietnamese retail investors.',
    problem: 'Stream live per-symbol price and rating ticks into a large, deeply-nested trading UI all session long — without re-rendering the whole table on every tick or dropping the socket.',
    highlights: [
      'Fine-grained realtime state: 12 GraphQL subscription operations across 32 call sites fan each tick into a Recoil atom keyed per symbol, so a price update re-renders only the single cell holding that symbol — not the parent table. The difference between a smooth ticker and a janky one.',
      'Reconnect-resilient transport: graphql-ws for subscriptions (keepalive + missed-pong close + infinite retry), HTTP for queries/mutations — a feed that has to stay live through the whole trading session.',
      'Domain-correct filtering: incoming ticks are gated client-side by each exchange’s session window (HOSE / HNX / UPCOM), so stale off-hours prices never render.',
      'Money math with decimal.js: prices snap to exchange-specific tick-size bands (10/50/100 VND) with explicit rounding — no float drift on financial values.',
      'Large-dataset charting: Highcharts with the WebGL boost module + treemap heatmaps, because plain SVG rendering chokes at these series sizes.',
      'Scale: 41 GraphQL operations and 311 components behind a SonarQube-gated, multi-env Kubernetes pipeline. Honest scope: a frontend consuming DATX’s server-side rating model — the scoring algorithm lives on the backend, not here.',
    ],
  },
  {
    id: 'prm', name: 'PRM — Distribution & Commission Platform', role: 'Tech Lead · team of 8',
    summary: 'A multi-tier pharmacy/agent distribution platform: orders, warehouse, payments and commissions.',
    problem: 'Pay the right commission to every actor in an F0 → F1 → F2 distribution tree, where a parent’s payout depends on its children’s revenue inside date-bounded policy windows — and it has to stay correct every time a policy, tier or order changes.',
    highlights: [
      'Recursive commission engine: clips each accumulation/referral policy to the report window, sums each child’s in-window net revenue, resolves a revenue-bracket bonus tier, then derives accumulation + referral → total → 10%-over-2,000,000-VND income-tax withholding → net — nine financial columns per shop row.',
      'Correctness-over-cleverness call: commission is recomputed synchronously per report request rather than event-driven — deterministic and auditable, at the cost of recompute. For money math, being provably right beats being fast.',
      'The domain model encodes the regulation: agent/pharmacy tiers are gated on real Vietnam GPP (Good Pharmacy Practice) certification, not a generic role enum.',
      'Payment integrity: the VNPay IPN handler validates the caller’s IP against a whitelist before trusting a payment callback — treating the webhook as untrusted input.',
      'Dual-channel notifications: Socket.IO per-user rooms for live updates + Firebase FCM multicast for push, pruning dead device tokens on failed sends.',
      'Scale of the surface: 65 route groups, 69 controllers and 71 models in one backend. Honest note: the RabbitMQ/MinIO wiring is scaffolded but currently disabled — storage is local disk and the flow is synchronous today.',
    ],
  },
  {
    id: 'cdp', name: 'Customer Data Platform', role: 'Architect / Owner',
    summary: 'Unifies CRM, a multi-brand order ledger and Messenger outreach for one company into a single dataset.',
    problem: 'Collapse one customer identity out of three independent ingestion paths — a CRM, a multi-brand order feed and Facebook Messenger outreach — into a single record, with no shared primary key across the sources.',
    highlights: [
      'Upsert-based identity resolution: incoming orders match users by case-insensitive name, create-if-absent, and enrich phone/Zalo from ingestion using minimal $set patches — specifically so legacy documents don’t fail current Mongoose validators (evolve the schema without breaking old data).',
      'Ingestion throughput and politeness: per-brand cron jobs staggered 30 minutes apart and production-gated, pulling a marketplace REST API with token caching + pre-expiry auto-refresh — engineered not to hammer the upstream API.',
      'Marketing-automation correctness: Messenger campaigns dedup by content-hash + tag across all accounts before a bulk send, so the same customer is never double-messaged.',
      'Order-line dedup via a compound unique index {brand, orderCode, productName}, because one source order carries multiple product lines.',
      'Data model beyond flat customers: an MLM ambassador/spillover structure (downline, mentor chain, squads) indexed specifically for spillover lookups.',
      'Scale: 32 models, 27 route/controller pairs, ~1,100+ commits over a year of active production maintenance; Socket.IO streams live progress for long Excel syncs behind a 30-minute request timeout. Honest scope: three brands under one company via one marketplace + one external script — not “every sales channel.”',
    ],
  },
  {
    id: 'platform', name: 'Platform Services — SSO & Storage', role: 'Architect / Owner',
    summary: 'A shared storage service and auth service reused across the company’s products.',
    problem: 'Stand up two shared foundations — one storage service and one auth service — that every product depends on. The hard parts aren’t the endpoints; they’re the machine-to-machine contract and a token lifecycle that stays safe when an access token leaks.',
    highlights: [
      'Storage as a genuine shared backend: five registered product codes (ddkm/ddcc/crm/dcm/social), files physically partitioned as private/{project}/{entity}/{uuidv7}.{ext} — namespacing that makes “one store, N products” enforceable rather than a claim.',
      'M2M security posture: x-api-key allowlist for service-to-service calls, only view/proxy routes open to anonymous read; a same-origin image proxy exists so many external front-ends can embed images cross-origin without CORS failures.',
      'Token lifecycle: JWT access + refresh where the refresh token is bcrypt-hashed in the DB — a leaked access token alone can’t be replayed without also matching the stored hash; typed guards map JWT-library errors to precise auth exceptions.',
      'Ops-grade logging: winston structured logging, and config validated at boot with joi + envalid so a missing variable fails the process rather than surfacing as a confusing 403 later.',
      'Consistent media handling: Sharp re-encodes every upload to a normalized format (jpeg/png/webp) with UUIDv7 filenames — collision-safe and time-sortable.',
      'Honest ceiling: OAuth (Google/Facebook) is architected but not yet wired up, and the shared API keys are currently in-source — acceptable for internal M2M, not a hardened public-facing posture.',
    ],
  },
  {
    id: 'ddcc', name: 'DDCC — Height-Prediction Lead Funnel', role: 'Tech Lead',
    summary: 'A Next.js web app that estimates a child’s adult height and turns the result into a sales lead.',
    problem: 'Estimate a child’s adult height from sparse growth inputs, then engineer the estimate itself into the product’s primary lead-generation mechanism — the business value is the funnel, not the number.',
    highlights: [
      'A transparent, defensible estimator — deliberately not ML: it finds which WHO growth-percentile channel the child currently tracks, reads that channel’s value at age 20, blends 77% of it with 23% of the mid-parental-height formula, then applies a fixed per-missing-lifestyle-answer penalty. An explainable formula beats a black box you can’t justify to a parent.',
      'Growth-curve rescaling: the WHO standard curve shape is linearly rescaled between “now” and age 20 to fit the individual’s predicted total growth, producing the chart shown to the parent.',
      'The funnel is the architecture: the public app never shows the number — only a protocol code — and requires contacting the referring salesperson to unlock it. hasResult / hasConsult / hasCourse flags on the record are the funnel’s state machine.',
      'One Express/Mongo backend behind three independent frontends — this Next.js web app (both the public quiz funnel and the staff CRM), a Zalo Mini App, and a React Native app (CodePush) — all driving the same funnel state machine.',
      'Production ops: gender-specific puberty-stage tables, a product-suggestion engine, Sepay payments and staged dev/staging/uat environments.',
    ],
  },
  {
    id: 'capillary', name: 'Capillary Vision Analysis', role: 'Builder',
    summary: 'An LLM-vision assistant that reads capillaroscopy images and returns a clinician-styled analysis.',
    problem: 'Get a general-purpose vision model (GPT-4o) to behave like a domain clinician on capillaroscopy images — consistently, safely, and inside a hard token/cost budget.',
    highlights: [
      'Prompt engineering is the real product: a 224-line system prompt encoding a hidden 5-step reasoning chain, a mandated analysis framework, explicit anti-refusal instructions (vision models love to refuse medical images), and randomized openers to avoid canned-sounding output.',
      'Cost/latency architecture: images are sent as ImageKit CDN URLs at ~85 tokens/image versus ~1,360 as base64 — roughly a 16× per-image token saving on a per-call-priced model; a base64 fallback stays Edge-runtime-safe (no Buffer) for models that can’t take URLs.',
      'Token-budget correctness: tiktoken counts real text tokens, a flat per-image estimate covers what it can’t tokenize, and the oldest messages are trimmed first until the request fits the model limit — the context window never overflows.',
      'Streaming: SSE relayed through a Next.js Edge ReadableStream, with a real bug-fix trail (multimodal payload ordering, [DONE] sentinel parsing) — the hard streaming edge cases were actually hit and fixed.',
      'Honest framing: adapted from an open-source chat UI; the value I added is the prompt system, the token/cost strategy and the vision-streaming fixes — not the shell.',
    ],
  },
  {
    id: 'matching', name: 'Matching App — AWS Serverless (JP market)', role: 'Frontend Developer · Rikkeisoft · team of 25',
    summary: 'A Tinder-style matching app for the Japanese market, built on a fully serverless AWS backend.',
    problem: 'Ship a consumer matching app into the Japanese market with 25 people on it and no dedicated infrastructure engineer. Realtime matching and chat, an auth flow that satisfies a Japanese client’s expectations, and payments through a domestic PSP — all on managed services, because there was nobody to operate servers.',
    highlights: [
      'I built the Next.js foundation the rest of the team’s modules were built on — routing, layout, the shared Ant Design component layer and the GraphQL data layer. On a 25-person project the foundation is the real deliverable: it decides how many structural arguments the other 24 people have to have.',
      'Serverless by choice, not by fashion: AppSync for GraphQL, Lambda resolvers, Cognito for identity, CDK and CloudFormation for the stacks. What it bought was an ops burden of roughly zero for a team that had no ops. What it cost was vendor lock-in and a local development story that never matched production — the trade I would still make at that team size, and would revisit at scale.',
      'The GraphQL schema was the contract between front and back, so the frontend could be built against a typed shape instead of a prose spec and a chat thread — the single biggest reason parallel work across that many people did not constantly break.',
      'Realtime matching and chat ran on AppSync subscriptions rather than a self-managed socket server, which put reconnection, fan-out and scaling on the provider. With hindsight that is the same call I make today when a team has no infrastructure owner.',
      'GMO Payment — Japan’s dominant PSP: the payment state that counts is the one reconciled from the provider’s callback, never the one the client claims. The same principle I now apply to every webhook I accept.',
      'Honest scope: I owned the frontend and the foundation, not the backend architecture. Described from experience — the repository belongs to the client and I have no access, so there are no measured figures here.',
    ],
  },
  {
    id: 'datx-admin', name: 'DATX Internal Management Platform', role: 'Fullstack Developer · DATX · team of 18',
    summary: 'The internal operations platform behind DATX’s fintech products — owned end to end, front and back.',
    problem: 'Build the internal platform the company actually runs on. Internal tools get the least design attention and the most schema churn, and this one had to serve two different databases at once — the flexible operational records, and the relational ones that have to join and stay consistent.',
    highlights: [
      'The first role where I owned a feature end to end — React front, Express back, both databases — instead of handing it across a boundary halfway through. That is where I learned how much design cost hides in the hand-off itself.',
      'Polyglot persistence chosen per record type, not per project: MongoDB where the shape was still moving, PostgreSQL where records had to join and stay consistent. The mistake I watched teams around me make was picking one store for the whole system and then fighting it for a year.',
      'Dense admin surfaces — tables, filters, forms — on Material UI with Tailwind for the layout around them. Admin UI is where performance problems surface first, because nobody paginates an internal tool until it hurts.',
      'Eighteen people on one codebase taught me what I now enforce as a lead: code is written to be read by people you will never speak to, and a convention the whole team follows beats a better convention half the team ignores.',
      'Honest scope: I was a fullstack contributor, not the architect. Described from experience — the repository belongs to DATX and I have no access, so there are no measured figures here.',
    ],
  },
  {
    id: 'ai-workflow', name: 'AI-native Engineering Workflow', role: 'Head of Technology',
    summary: 'Making AI a first-class part of how the team writes code — the change that cut the team from 12 to 7.',
    problem: 'Make a small team outship a big one by putting AI into the team’s actual workflow — not as a novelty, but as the standard way code gets written, reviewed and shipped.',
    highlights: [
      'A shared Claude Code configuration — 37 skills, 26 slash-commands, 16 agents and 4 hooks — codifying a /new-project → /discuss → /plan → /execute → /ship pipeline the whole team runs.',
      'Company coding standards became skills: the team’s TypeScript/Go rule sets are packaged so generated code follows them by default — a traceable line from the global rules into the installable plugin.',
      'The design system shipped as a versioned, CI-gated Claude Code plugin (marketplace-installable): brand tokens + AI-readable non-negotiables, so any teammate’s AI output is on-brand without reading a style doc.',
      'Standards enforced automatically, not on request: a SessionStart hook injects the brand non-negotiables, a PostToolUse hook re-scans every edit for specific regressions (a font with no Vietnamese diacritics, outline:none with no :focus-visible), and a midu-brand-review agent gates output on a Blocker/Major/Minor checklist.',
      'Multi-agent execution: subagent-driven development with two-stage review (spec-compliance → code-quality) and a bead-orchestrator running parallel work tracks over agent-mail.',
      'The outcome I’m accountable for: the team went from 12 to 7 while roughly doubling delivery throughput.',
    ],
  },
]

export const PROJECT_LINK = {
  live: 'Live', private: 'Private',
  visit: 'Open the live site', none: 'Private — no public URL',
}

export const PROJECT_GROUP_LABELS = {
  frontend: 'Frontend', backend: 'Backend', data: 'Data', infra: 'Infra', patterns: 'Patterns',
}

export const SKILLS = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript (Node.js)', 'Go'] },
  { group: 'Frontend', items: ['Next.js', 'React', 'Vite', 'Tailwind CSS', 'Ant Design', 'Redux / Recoil'] },
  { group: 'Backend', items: ['NestJS', 'Express', 'REST', 'GraphQL', 'Prisma', 'Mongoose'] },
  { group: 'Data', items: ['MongoDB (replica sets)', 'PostgreSQL', 'MySQL', 'SQLite'] },
  { group: 'AI & LLM', items: ['LLM integration', 'RAG pipelines', 'Fine-tuning', 'MCP (Model Context Protocol)', 'OpenClaw', 'Claude Code', 'Windsurf'] },
  { group: 'Infra & DevOps', items: ['Docker', 'Nginx', 'PM2', 'GitLab CI/CD (self-hosted)', 'Linode / DigitalOcean'] },
  { group: 'Leadership', items: ['Team building', 'Agile/Scrum', 'Hiring & mentoring', 'Engineering knowledge base'] },
]

export const CONTACT = [
  { label: 'Email', value: 'manvantruong2k@gmail.com', href: 'mailto:manvantruong2k@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/boizdeeptry', href: 'https://www.linkedin.com/in/boizdeeptry/' },
  { label: 'Location', value: 'Hanoi, Vietnam', href: null },
]

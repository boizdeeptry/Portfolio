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
    id: 'zalo-llm', name: 'Zalo LLM Assistant', role: 'Tech Lead',
    summary: 'An LLM assistant answering frontline customer questions on the company’s Zalo channel.',
    problem: 'Deflect frontline customer questions on the company’s highest-traffic channel without a human in the loop — answers have to be grounded in company knowledge and safe to send unsupervised, not plausible-sounding guesses.',
    highlights: [
      'RAG over company knowledge so replies cite internal sources instead of improvising — the guardrail against confidently-wrong answers going straight to a customer',
      'An OpenClaw agent gateway routes between tools and fine-tuned models, so swapping or upgrading a model is a configuration decision, not a rewrite',
      'Fine-tuned models for the domain’s tone and vocabulary on top of retrieval, rather than relying on prompting alone',
      'Runs on Zalo — the company’s highest-volume customer channel, where the metric that matters is deflection rate, not a demo',
      'Described from experience — no public repo',
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
      'Scale of the surface: ~57 route groups, 68 controllers and 73 models in one backend. Honest note: the RabbitMQ/MinIO wiring is scaffolded but currently disabled — storage is local disk and the flow is synchronous today.',
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
      'Scale: 31 models, 26 route/controller pairs, ~1,100+ commits over a year of active production maintenance; Socket.IO streams live progress for long Excel syncs behind a 30-minute request timeout. Honest scope: three brands under one company via one marketplace + one external script — not “every sales channel.”',
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
      'Ops-grade logging: pino structured logs with per-request IDs and serializers that deliberately drop request headers to avoid logging PII (GDPR-conscious), pretty-printing only outside production.',
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
    id: 'ai-workflow', name: 'AI-native Engineering Workflow', role: 'Head of Technology',
    summary: 'Making AI a first-class part of how the team writes code — the change that cut the team from 12 to 7.',
    problem: 'Make a small team outship a big one by putting AI into the team’s actual workflow — not as a novelty, but as the standard way code gets written, reviewed and shipped.',
    highlights: [
      'Claude Code adopted as the team’s standard workflow, not an individual experiment',
      'Custom skill plugins encoding the design system and coding standards, so AI output already matches in-house conventions instead of needing rework — the leverage is in removing the review-and-redo loop',
      'Result: the team went from 12 to 7 while roughly doubling delivery throughput',
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

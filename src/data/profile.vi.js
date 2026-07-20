// Vietnamese content — mirrors profile.js exports; render.js picks by <html lang>.

export const EXPERIENCE = [
  {
    company: 'Midu Group (MenaQ7)',
    period: '11/2023 — Hiện tại',
    roles: [
      {
        title: 'Head of Technology',
        period: '4/2026 — Hiện tại',
        points: [
          'Phụ trách toàn bộ 12 hệ thống production: định hướng kiến trúc, phát triển và vận hành cùng đội ngũ 7 kỹ sư.',
          'Đưa Claude Code thành quy trình chuẩn của team + skill plugin riêng — năng suất ~2× với 7 người thay vì 12.',
          'Triển khai trợ lý LLM trên Zalo: OpenClaw agent gateway, RAG trên tri thức công ty, model fine-tuned.',
          'Kiến trúc nền tảng: SSO tập trung, storage dùng chung, chuẩn NestJS + MongoDB cho mọi sản phẩm.',
        ],
      },
      {
        title: 'Team Leader',
        period: '3/2024 — 4/2026',
        points: [
          'Tech Lead của PRM (team 8 người) — quản lý đối tác, đơn hàng & hoa hồng, từ kiến trúc đến production.',
          'Xây các sản phẩm AI dự đoán (chiều cao trẻ em, thành phần cơ thể) đưa lead về CDP.',
        ],
      },
      {
        title: 'Fullstack Developer',
        period: '11/2023 — 3/2024',
        points: [
          'Xây Baby Face Prediction (chiến dịch AI viral, team 2 người) và hạ tầng production vẫn đang dùng đến nay.',
        ],
      },
    ],
  },
  {
    company: 'DATX Technologies',
    period: '12/2022 — 11/2023',
    roles: [
      {
        title: 'Fullstack Developer',
        period: 'Fintech',
        points: [
          'xWealth — nền tảng đánh giá cổ phiếu cho nhà đầu tư cá nhân (team 24 người): frontend Next.js, GraphQL + Prisma, realtime Socket.io.',
          'Nền tảng quản trị nội bộ (team 18 người): React + Express/MongoDB/PostgreSQL, làm trọn từ đầu đến cuối.',
        ],
      },
    ],
  },
  {
    company: 'Rikkeisoft',
    period: '8/2021 — 10/2022',
    roles: [
      {
        title: 'Frontend Developer',
        period: 'Outsourcing · thị trường Nhật',
        points: [
          'Ứng dụng matching cho thị trường Nhật (team 25 người): nền tảng Next.js, backend serverless trên AWS (AppSync, Lambda, Cognito, CDK), thanh toán GMO Payment.',
        ],
      },
    ],
  },
]

export const PROJECTS = [
  {
    id: 'documind', name: 'Documind — AI Document Intelligence', role: 'Builder',
    summary: 'Trợ lý RAG trên kho tài liệu nội bộ, kết hợp vector search với knowledge graph.',
    problem: 'Dựng một knowledge graph nhất quán từ nhiều tài liệu — cái khó không phải trích xuất thực thể trong từng tài liệu, mà là resolve cùng một thực thể xuyên suốt tất cả.',
    highlights: [
      'Truy hồi lai — Qdrant vector search cộng knowledge graph Neo4j (GraphRAG), không chỉ vector',
      'Dedup thực thể xuyên tài liệu bằng heuristic tương đồng → cạnh SAME_AS / SIMILAR_TO, ghi bằng Cypher MERGE idempotent trên 3 store không có transaction chung',
      'JWT tự viết (jose) và storage local có chống path-traversal',
      'Embeddings OpenAI + generation LLM, chạy batch + throttle, xuống cấp mượt khi một store lỗi',
    ],
  },
  {
    id: 'zalo-llm', name: 'Trợ lý LLM trên Zalo', role: 'Tech Lead',
    summary: 'Trợ lý LLM trả lời câu hỏi khách hàng tuyến đầu trên kênh Zalo của công ty.',
    problem: 'Tự động trả lời câu hỏi khách hàng thật trên kênh đông nhất của công ty — bám tri thức nội bộ, không bịa.',
    highlights: [
      'RAG trên tri thức công ty để câu trả lời bám nguồn, dẫn được',
      'OpenClaw agent gateway điều hướng giữa các tool và model fine-tuned',
      'Chạy trên Zalo, kênh khách hàng chính của công ty',
      'Mô tả từ kinh nghiệm — không có repo công khai',
    ],
  },
  {
    id: 'prm', name: 'PRM — Nền tảng phân phối & hoa hồng', role: 'Tech Lead · team 8 người',
    summary: 'Nền tảng phân phối đa tầng cho nhà thuốc/đại lý: đơn hàng, kho, thanh toán và hoa hồng.',
    problem: 'Tính hoa hồng đúng qua cây đại lý F0 → F1 → F2, nơi payout mỗi tầng phụ thuộc doanh thu của các con trong cửa sổ chính sách cắt theo ngày.',
    highlights: [
      'Engine hoa hồng đệ quy: clip từng policy về cửa sổ report, tra bậc bonus theo bracket doanh thu, khấu trừ thuế TNCN 10% trên 2 triệu VND',
      'Phân tầng dựa trên chứng chỉ GPP nhà thuốc (quy định VN thật), không phải enum vai trò chung chung',
      'IPN thanh toán có IP-whitelist (VNPay), nhãn vận chuyển (ViettelPost), nạp webhook Shopee',
      'Thông báo 2 kênh: Socket.IO theo room từng user + FCM multicast, dọn token chết',
    ],
  },
  {
    id: 'cdp', name: 'Customer Data Platform', role: 'Architect / Owner',
    summary: 'Hợp nhất CRM, sổ đơn hàng đa-brand và outreach Messenger của một công ty vào một dataset.',
    problem: 'Hợp nhất một danh tính khách hàng qua ba luồng nạp — CRM, luồng đơn hàng đa-brand và outreach Facebook Messenger — vào một bản ghi, không có khóa join cứng.',
    highlights: [
      'Identity resolution kiểu upsert: khớp đơn hàng với user theo tên, làm giàu phone/Zalo từ luồng nạp, patch $set tối thiểu để không vấp validator trên bản ghi cũ',
      'Nạp theo brand bằng cron lệch nhau 30 phút và chỉ chạy ở production, kéo REST API sàn với token cache + tự refresh',
      'Dedup chiến dịch Messenger theo content-hash + tag để không nhắn trùng một khách',
      'Model MLM ambassador / spillover (downline, squad) đánh index cho tra cứu spillover',
    ],
  },
  {
    id: 'platform', name: 'Platform Services — SSO & Storage', role: 'Architect / Owner',
    summary: 'Dịch vụ lưu trữ và dịch vụ auth dùng chung cho các sản phẩm của công ty.',
    problem: 'Một storage và một auth service dùng chung nhiều sản phẩm — cái hay là hợp đồng máy-với-máy và vòng đời token sống sót khi access token bị trộm.',
    highlights: [
      'Storage dùng chung 5 sản phẩm qua path namespaced và auth M2M bằng x-api-key; Sharp normalize, tên file UUIDv7, proxy same-origin để né CORS',
      'JWT access + refresh, refresh token được hash trong DB — access token trộm được cũng không replay nổi',
      'Structured logging kiểu GDPR (pino) cố ý loại bỏ request header',
    ],
  },
  {
    id: 'ddcc', name: 'DDCC — Funnel dự đoán chiều cao', role: 'Tech Lead',
    summary: 'Zalo Mini App ước lượng chiều cao trưởng thành của trẻ và biến kết quả thành lead bán hàng.',
    problem: 'Biến dữ liệu tăng trưởng của trẻ thành con số chiều cao trưởng thành hợp lý — rồi biến chính con số đó thành lead bán hàng.',
    highlights: [
      'Bộ ước lượng minh bạch: bám kênh percentile tăng trưởng WHO trộn với công thức chiều cao trung bình bố mẹ và phạt theo từng câu lifestyle — là công thức, không phải ML',
      'Funnel giấu kết quả: quiz chỉ hiện mã phác đồ, buộc liên hệ nhân viên giới thiệu để mở con số — mỗi lượt gửi thành một lead',
      'Một backend Express/Mongo phục vụ hai frontend: quiz Zalo Mini App công khai và app CRM React Native cho staff (phát hành qua CodePush)',
    ],
  },
  {
    id: 'capillary', name: 'Capillary Vision Analysis', role: 'Builder',
    summary: 'Trợ lý LLM-vision đọc ảnh soi mao mạch và trả về phân tích theo phong cách bác sĩ.',
    problem: 'Ép GPT-4o Vision hành xử như bác sĩ chuyên khoa khi đọc ảnh mao mạch — ổn định, và trong ngân sách token chặt.',
    highlights: [
      'System prompt 224 dòng mã hóa chuỗi suy luận 5 bước ẩn, luật chống từ chối và biến thiên đầu ra',
      'Token budgeting bằng tiktoken + cắt ngữ cảnh cửa sổ trượt để vừa giới hạn model',
      'Ảnh gửi dưới dạng URL CDN ImageKit — ~85 token/ảnh so với ~1360 nếu base64, một quyết định chi phí/độ trễ có chủ đích',
      'Streaming token qua SSE trên Next.js Edge runtime',
    ],
  },
  {
    id: 'ai-workflow', name: 'Quy trình engineering AI-native', role: 'Trưởng phòng Công nghệ',
    summary: 'Đưa AI thành phần cốt lõi trong cách team viết code — thay đổi giúp giảm team từ 12 xuống 7.',
    problem: 'Ship gấp đôi với đội nhỏ hơn bằng cách đưa AI thành phần cốt lõi trong cách team viết code.',
    highlights: [
      'Claude Code thành quy trình chuẩn của team',
      'Skill plugin riêng đóng gói design system và coding standards để AI viết đúng style nội bộ',
      'Giảm team từ 12 xuống 7 mà sản lượng gần gấp đôi',
      'Mô tả từ kinh nghiệm — không có repo công khai',
    ],
  },
]

export const PROJECT_GROUP_LABELS = {
  frontend: 'Frontend', backend: 'Backend', data: 'Dữ liệu', infra: 'Hạ tầng', patterns: 'Kỹ thuật',
}

export const SKILLS = [
  { group: 'Ngôn ngữ', items: ['TypeScript', 'JavaScript (Node.js)'] },
  { group: 'Frontend', items: ['Next.js', 'React', 'Vite', 'Tailwind CSS', 'Ant Design', 'Redux / Recoil'] },
  { group: 'Backend', items: ['NestJS', 'Express', 'REST', 'GraphQL', 'Prisma', 'Mongoose'] },
  { group: 'Dữ liệu', items: ['MongoDB (replica sets)', 'PostgreSQL', 'MySQL'] },
  { group: 'AI & LLM', items: ['Tích hợp LLM', 'RAG pipelines', 'Fine-tuning', 'OpenClaw', 'Claude Code', 'Windsurf'] },
  { group: 'Hạ tầng & DevOps', items: ['Docker', 'Nginx', 'PM2', 'GitLab CI/CD (self-hosted)', 'Linode / DigitalOcean'] },
  { group: 'Lãnh đạo', items: ['Xây dựng đội ngũ', 'Agile/Scrum', 'Tuyển dụng & mentoring', 'Kho tri thức kỹ thuật'] },
]

export const CONTACT = [
  { label: 'Email', value: 'manvantruong2k@gmail.com', href: 'mailto:manvantruong2k@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/boizdeeptry', href: 'https://www.linkedin.com/in/boizdeeptry/' },
  { label: 'Địa điểm', value: 'Hà Nội, Việt Nam', href: null },
]

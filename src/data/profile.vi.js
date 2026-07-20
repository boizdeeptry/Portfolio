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
    name: 'DDCC — Dự đoán chiều cao',
    role: 'Tech Lead',
    desc: 'Sản phẩm chủ lực của mảng kinh doanh tăng chiều cao: dự đoán chiều cao trưởng thành của trẻ từ dữ liệu tăng trưởng, rồi chuyển thành tư vấn cá nhân hóa. Cỗ máy tạo lead chính của công ty.',
    stack: ['Next.js', 'NestJS', 'MongoDB', 'Prediction models'],
  },
  {
    name: 'Trợ lý LLM trên Zalo',
    role: 'Tech Lead',
    desc: 'Trợ lý LLM trên kênh chat chính của công ty — OpenClaw agent gateway, RAG trên tri thức nội bộ, model fine-tuned. Câu hỏi của khách hàng được trả lời tự động ngay từ tuyến đầu.',
    stack: ['OpenClaw', 'RAG', 'Fine-tuned LLMs', 'NestJS'],
  },
  {
    name: 'PRM — Nền tảng đối tác',
    role: 'Tech Lead · team 8 người',
    desc: 'Quản lý quan hệ đối tác: onboarding, theo dõi đơn hàng & doanh thu, quy trình hoa hồng. Dẫn dắt trọn vẹn từ kiến trúc đến vận hành production.',
    stack: ['Next.js', 'TypeScript', 'NestJS', 'MongoDB'],
  },
  {
    name: 'Customer Data Platform',
    role: 'Architect / Owner',
    desc: 'Hợp nhất dữ liệu khách hàng và đơn hàng từ mọi kênh bán về một nền tảng duy nhất phục vụ marketing automation — nạp dữ liệu bằng các pipeline crawl tự động.',
    stack: ['NestJS', 'MongoDB', 'Puppeteer', 'Playwright'],
  },
  {
    name: 'Platform Services — SSO & Storage',
    role: 'Architect / Owner',
    desc: 'Single sign-on tập trung và dịch vụ lưu trữ cloud nội bộ — hai nền móng dùng chung cho 100% sản phẩm của công ty.',
    stack: ['NestJS', 'JWT', 'Nginx', 'MongoDB'],
  },
  {
    name: 'Quy trình engineering AI-native',
    role: 'Head of Technology',
    desc: 'Claude Code là quy trình chuẩn của team, với các skill plugin đóng gói design system và coding standards. Thay đổi giúp giảm team từ 12 xuống 7 mà đầu ra vẫn gấp đôi.',
    stack: ['Claude Code', 'Custom skills', 'CI/CD', 'Code review'],
  },
]

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

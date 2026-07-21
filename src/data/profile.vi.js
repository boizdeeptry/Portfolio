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
    problem: 'Biến một đống tài liệu tải lên thành một knowledge graph truy vấn được. Trích xuất trong từng tài liệu là phần dễ; phần khó là resolve cùng một thực thể xuyên tài liệu và giữ ba store khác loại nhất quán mà không có transaction phân tán.',
    highlights: [
      'Truy hồi lai (GraphRAG): Qdrant vector cho gợi nhớ ngữ nghĩa, cộng knowledge graph Neo4j cho ngữ cảnh quan hệ — vector đơn trả lời “cái gì giống”, graph trả lời “cái gì liên kết với cái gì”.',
      'Entity resolution xuyên tài liệu: cạnh co-occurrence theo chunk, rồi dedup xuyên tài liệu bằng Jaccard + heuristic tên con/viết tắt tạo cạnh SAME_AS / SIMILAR_TO. Trần đã biết: clustering O(n²) mỗi nhóm, chưa dùng resolution theo embedding — đúng cho corpus hiện tại, và là thứ đầu tiên tôi sẽ làm lại trước khi tăng số lượng tài liệu.',
      'Nhất quán không cần transaction phân tán: mọi ghi vào graph là Cypher MERGE idempotent, nên nạp lại một tài liệu không thể tạo trùng node; một store hạ nguồn lỗi (vd Qdrant xóa fail) xuống cấp thành cảnh báo hiển thị thay vì fail cứng.',
      'Kiểm soát throughput với nhà cung cấp model: embeddings batch 100 text/request, trích xuất thực thể 3 chunk/batch có delay giữa các batch — backpressure có chủ đích để nạp dữ liệu không vấp rate limit.',
      'Bảo mật: thay Clerk của template bằng JWT tự viết (jose, HS256, cookie httpOnly, role từ allowlist admin); storage local sanitize từng segment path và kiểm lại path resolve nằm trong thư mục gốc (chống path-traversal).',
      'Access model bám thực tế: nạp dữ liệu chỉ admin, Q&A công khai có dẫn nguồn trên một corpus chung — kho tri thức một tổ chức, cố ý không đa tenant.',
    ],
  },
  {
    id: 'zalo-llm', name: 'Trợ lý LLM trên Zalo', role: 'Tech Lead',
    summary: 'Trợ lý LLM trả lời câu hỏi khách hàng tuyến đầu trên kênh Zalo của công ty.',
    problem: 'Chặn câu hỏi khách hàng tuyến đầu trên kênh đông nhất của công ty mà không cần người trong vòng lặp — câu trả lời phải bám tri thức nội bộ và an toàn để gửi tự động, không phải phỏng đoán nghe hợp lý.',
    highlights: [
      'RAG trên tri thức công ty để trả lời dẫn nguồn nội bộ thay vì bịa — lá chắn chống câu trả lời sai-mà-chắc-chắn gửi thẳng cho khách',
      'OpenClaw agent gateway điều hướng giữa tool và model fine-tuned, nên đổi/nâng cấp model là quyết định cấu hình, không phải viết lại',
      'Model fine-tuned cho tông giọng và từ vựng của domain trên nền retrieval, thay vì chỉ dựa vào prompt',
      'Chạy trên Zalo — kênh khách hàng đông nhất, nơi chỉ số quan trọng là tỉ lệ deflection, không phải bản demo',
      'Mô tả từ kinh nghiệm — không có repo công khai',
    ],
  },
  {
    id: 'xwealth', name: 'xWealth — Nền tảng đầu tư bán lẻ', role: 'Fullstack Developer · DATX',
    summary: 'Nền tảng đánh giá cổ phiếu và tín hiệu giao dịch realtime cho nhà đầu tư cá nhân Việt Nam.',
    problem: 'Stream giá và rating realtime theo từng mã vào một UI giao dịch lồng sâu suốt cả phiên — mà không re-render cả bảng mỗi tick hay rớt socket.',
    highlights: [
      'State realtime hạt mịn: ~7 subscription GraphQL đồng thời đổ mỗi tick vào một atom Recoil khóa theo mã, nên một cập nhật giá chỉ re-render đúng ô chứa mã đó — không phải bảng cha. Khác biệt giữa ticker mượt và ticker giật.',
      'Transport chịu lỗi tốt: graphql-ws cho subscription (keepalive + đóng khi mất pong + retry vô hạn), HTTP cho query/mutation — feed phải sống suốt cả phiên giao dịch.',
      'Lọc đúng nghiệp vụ: tick vào được gate ở client theo khung giờ phiên từng sàn (HOSE / HNX / UPCOM), nên giá cũ ngoài giờ không bao giờ hiển thị.',
      'Toán tiền bằng decimal.js: giá snap về bước giá theo sàn (10/50/100đ) với làm tròn tường minh — không trôi số float trên giá trị tài chính.',
      'Chart dữ liệu lớn: Highcharts với module boost (WebGL) + treemap heatmap, vì SVG thường nghẽn ở kích thước series này.',
      'Quy mô: 44 operation GraphQL và ~330 component sau pipeline Kubernetes đa môi trường có SonarQube gate. Phạm vi thật: frontend tiêu thụ model rating phía server của DATX — thuật toán chấm điểm nằm ở backend, không ở đây.',
    ],
  },
  {
    id: 'prm', name: 'PRM — Nền tảng phân phối & hoa hồng', role: 'Tech Lead · team 8 người',
    summary: 'Nền tảng phân phối đa tầng cho nhà thuốc/đại lý: đơn hàng, kho, thanh toán và hoa hồng.',
    problem: 'Trả đúng hoa hồng cho mọi mắt xích trong cây phân phối F0 → F1 → F2, nơi payout của cấp cha phụ thuộc doanh thu các con trong cửa sổ chính sách theo ngày — và phải luôn đúng mỗi khi policy, tầng hay đơn hàng thay đổi.',
    highlights: [
      'Engine hoa hồng đệ quy: clip từng policy tích lũy/giới thiệu về cửa sổ report, cộng doanh thu ròng trong cửa sổ của từng con, tra bậc bonus theo bracket doanh thu, rồi suy ra tích lũy + giới thiệu → tổng → khấu trừ thuế TNCN 10% trên 2.000.000đ → ròng — chín cột tài chính mỗi dòng shop.',
      'Đánh đổi đúng-đắn-hơn-khôn-khéo: hoa hồng tính đồng bộ theo mỗi lần chạy report thay vì event-driven — tất định và kiểm toán được, đổi lấy chi phí tính lại. Với bài toán tiền bạc, đúng chắc chắn thắng nhanh.',
      'Model domain mã hóa quy định: tầng đại lý/nhà thuốc gated theo chứng chỉ GPP (Good Pharmacy Practice) VN thật, không phải enum vai trò chung chung.',
      'Toàn vẹn thanh toán: handler IPN VNPay kiểm IP người gọi theo whitelist trước khi tin callback thanh toán — coi webhook là input không đáng tin.',
      'Thông báo hai kênh: Socket.IO theo room từng user cho cập nhật realtime + FCM multicast cho push, dọn token thiết bị chết khi gửi lỗi.',
      'Quy mô bề mặt: ~57 nhóm route, 68 controller, 73 model trong một backend. Ghi chú thật: phần RabbitMQ/MinIO mới scaffolded và đang tắt — hiện lưu local disk, luồng chạy đồng bộ.',
    ],
  },
  {
    id: 'cdp', name: 'Customer Data Platform', role: 'Architect / Owner',
    summary: 'Hợp nhất CRM, sổ đơn hàng đa-brand và outreach Messenger của một công ty vào một dataset.',
    problem: 'Gom một danh tính khách hàng từ ba luồng nạp độc lập — CRM, luồng đơn hàng đa-brand và outreach Facebook Messenger — vào một bản ghi, không có khóa chính chung giữa các nguồn.',
    highlights: [
      'Identity resolution kiểu upsert: đơn hàng đến khớp user theo tên (không phân biệt hoa thường), tạo nếu chưa có, làm giàu phone/Zalo từ luồng nạp bằng patch $set tối thiểu — cốt để tài liệu cũ không fail validator Mongoose hiện tại (tiến hóa schema mà không phá dữ liệu cũ).',
      'Throughput & lịch sự khi nạp: cron theo brand lệch nhau 30 phút và chỉ chạy ở production, kéo REST API sàn với token cache + tự refresh trước hạn — thiết kế để không “dội bom” API upstream.',
      'Đúng đắn cho marketing automation: chiến dịch Messenger dedup theo content-hash + tag trên mọi account trước khi gửi hàng loạt, để không nhắn trùng một khách.',
      'Dedup dòng đơn hàng bằng unique index tổ hợp {brand, orderCode, productName}, vì một đơn nguồn mang nhiều dòng sản phẩm.',
      'Model vượt ngoài khách hàng phẳng: cấu trúc MLM ambassador/spillover (downline, chuỗi mentor, squad) đánh index riêng cho tra cứu spillover.',
      'Quy mô: 31 model, 26 cặp route/controller, ~1.100+ commit qua một năm bảo trì production; Socket.IO stream tiến độ realtime cho các lần sync Excel dài, sau timeout request 30 phút. Phạm vi thật: ba brand của một công ty qua một sàn + một script ngoài — không phải “mọi kênh bán”.',
    ],
  },
  {
    id: 'platform', name: 'Platform Services — SSO & Storage', role: 'Architect / Owner',
    summary: 'Dịch vụ lưu trữ và dịch vụ auth dùng chung cho các sản phẩm của công ty.',
    problem: 'Dựng hai nền móng dùng chung — một storage service và một auth service — mà mọi sản phẩm phụ thuộc vào. Cái khó không phải endpoint; là hợp đồng máy-với-máy và vòng đời token vẫn an toàn khi access token rò rỉ.',
    highlights: [
      'Storage là backend dùng chung thật: năm project code đăng ký (ddkm/ddcc/crm/dcm/social), file phân vùng vật lý theo private/{project}/{entity}/{uuidv7}.{ext} — namespacing khiến “một store, N sản phẩm” cưỡng chế được chứ không phải lời nói.',
      'Tư thế bảo mật M2M: allowlist x-api-key cho gọi service-to-service, chỉ route view/proxy mở cho đọc ẩn danh; proxy ảnh same-origin để nhiều front-end ngoài nhúng ảnh cross-origin không lỗi CORS.',
      'Vòng đời token: JWT access + refresh, refresh token được bcrypt-hash trong DB — access token rò rỉ một mình không replay được nếu không khớp hash lưu; guard có kiểu ánh xạ lỗi thư viện JWT thành exception auth chính xác.',
      'Logging cấp vận hành: pino structured log có request-id, serializer cố ý bỏ request header để không log PII (kiểu GDPR), pretty-print chỉ ngoài production.',
      'Xử lý media nhất quán: Sharp re-encode mọi upload về định dạng chuẩn (jpeg/png/webp) với tên file UUIDv7 — chống trùng và sắp theo thời gian.',
      'Trần trung thực: OAuth (Google/Facebook) mới là kiến trúc chưa nối, và API key dùng chung hiện nằm trong source — chấp nhận cho M2M nội bộ, chưa phải tư thế public đã tôi luyện.',
    ],
  },
  {
    id: 'ddcc', name: 'DDCC — Funnel dự đoán chiều cao', role: 'Tech Lead',
    summary: 'App web Next.js ước lượng chiều cao trưởng thành của trẻ và biến kết quả thành lead bán hàng.',
    problem: 'Ước lượng chiều cao trưởng thành của trẻ từ dữ liệu tăng trưởng thưa, rồi biến chính con số đó thành cơ chế tạo lead chính của sản phẩm — giá trị kinh doanh nằm ở funnel, không phải con số.',
    highlights: [
      'Bộ ước lượng minh bạch, có thể bảo vệ — cố ý không ML: tìm kênh percentile tăng trưởng WHO trẻ đang bám, đọc giá trị kênh đó ở tuổi 20, trộn 77% giá trị đó với 23% công thức chiều cao trung bình bố mẹ, rồi phạt cố định mỗi câu lifestyle thiếu. Công thức giải thích được thắng hộp đen không biện minh nổi với phụ huynh.',
      'Rescale đường cong tăng trưởng: hình dạng đường chuẩn WHO được rescale tuyến tính giữa “hiện tại” và tuổi 20 để khớp tổng tăng trưởng dự đoán của cá nhân, tạo biểu đồ cho phụ huynh.',
      'Funnel chính là kiến trúc: app công khai không bao giờ hiện con số — chỉ mã phác đồ — và buộc liên hệ nhân viên giới thiệu để mở. Các cờ hasResult / hasConsult / hasCourse trên bản ghi là state machine của funnel.',
      'Một backend Express/Mongo sau ba frontend độc lập — app web Next.js này (vừa là quiz funnel công khai vừa là CRM cho staff), một Zalo Mini App, và một app React Native (CodePush) — tất cả chạy trên cùng một state machine funnel.',
      'Vận hành production: bảng giai đoạn dậy thì theo giới tính, engine gợi ý sản phẩm, thanh toán Sepay và môi trường dev/staging/uat tách bạch.',
    ],
  },
  {
    id: 'capillary', name: 'Capillary Vision Analysis', role: 'Builder',
    summary: 'Trợ lý LLM-vision đọc ảnh soi mao mạch và trả về phân tích theo phong cách bác sĩ.',
    problem: 'Ép một model thị giác đa dụng (GPT-4o) hành xử như bác sĩ chuyên khoa khi đọc ảnh mao mạch — ổn định, an toàn, và trong ngân sách token/chi phí chặt.',
    highlights: [
      'Prompt engineering mới là sản phẩm thật: system prompt 224 dòng mã hóa chuỗi suy luận 5 bước ẩn, khung phân tích bắt buộc, luật chống từ chối rõ ràng (model thị giác hay từ chối ảnh y tế), và mở đầu ngẫu nhiên để tránh output khuôn mẫu.',
      'Kiến trúc chi phí/độ trễ: ảnh gửi dưới dạng URL CDN ImageKit ~85 token/ảnh so với ~1.360 nếu base64 — tiết kiệm ~16× token mỗi ảnh trên model tính tiền theo call; fallback base64 vẫn an toàn Edge-runtime (không Buffer) cho model không nhận URL.',
      'Đúng đắn ngân sách token: tiktoken đếm token văn bản thật, một ước lượng phẳng mỗi ảnh bù phần không tokenize được, và tin nhắn cũ nhất bị cắt trước cho đến khi request vừa giới hạn model — cửa sổ ngữ cảnh không bao giờ tràn.',
      'Streaming: SSE chuyển tiếp qua ReadableStream trên Next.js Edge, với vệt sửa bug thật (thứ tự payload đa phương thức, parse sentinel [DONE]) — các ca biên streaming khó đã gặp và xử lý.',
      'Trình bày trung thực: adapt từ một chat UI mã nguồn mở; phần tôi thêm là hệ prompt, chiến lược token/chi phí và các fix vision-streaming — không phải cái vỏ.',
    ],
  },
  {
    id: 'ai-workflow', name: 'Quy trình engineering AI-native', role: 'Trưởng phòng Công nghệ',
    summary: 'Đưa AI thành phần cốt lõi trong cách team viết code — thay đổi giúp giảm team từ 12 xuống 7.',
    problem: 'Cho một đội nhỏ ship nhiều hơn đội lớn bằng cách đưa AI vào quy trình thật của team — không phải thứ mới lạ, mà là cách chuẩn để code được viết, review và ship.',
    highlights: [
      'Một bộ cấu hình Claude Code dùng chung — 37 skill, 18 slash-command, 16 agent và 4 hook — mã hóa pipeline /new-project → /discuss → /plan → /execute → /ship cho cả team.',
      'Chuẩn code của công ty thành skill: bộ rule TypeScript/Go được đóng gói để code AI sinh ra bám chuẩn mặc định — có đường truy vết từ global rules vào plugin cài được.',
      'Design system ship dưới dạng plugin Claude Code có version, có CI (cài qua marketplace): brand token + non-negotiable đọc-được-bằng-AI, để output của bất kỳ ai trong team đều đúng brand mà không cần đọc style doc.',
      'Chuẩn được cưỡng chế tự động, không đợi yêu cầu: hook SessionStart bơm non-negotiable brand vào context, hook PostToolUse quét lại mỗi edit tìm regression cụ thể (font không dấu tiếng Việt, outline:none mà thiếu :focus-visible), và agent midu-brand-review chặn output theo checklist Blocker/Major/Minor.',
      'Thực thi đa agent: subagent-driven development với review 2 tầng (spec-compliance → code-quality) và bead-orchestrator chạy nhiều track song song qua agent-mail.',
      'Kết quả tôi chịu trách nhiệm: team từ 12 xuống 7 mà sản lượng gần gấp đôi.',
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

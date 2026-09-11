// Vietnamese content — mirrors profile.js exports; render.js picks by <html lang>.

export const EXPERIENCE = [
  {
    company: 'Midu Group (MenaQ7)',
    period: '10/2023 — Hiện tại',
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
        period: '10/2023 — 3/2024',
        points: [
          'Xây Baby Face Prediction (chiến dịch AI viral, team 2 người) và hạ tầng production vẫn đang dùng đến nay.',
        ],
      },
    ],
  },
  {
    company: 'DATX Technologies',
    period: '11/2022 — 10/2023',
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
    period: '3/2021 — 11/2022',
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
    id: 'agentdc', name: 'AgentDC — Daemon điều khiển coding agent', role: 'Builder',
    summary: 'Daemon Go giữ Claude Code, Codex và OpenCode trong PTY thật, lái qua CLI, portal, MCP hoặc Zalo.',
    problem: 'Coding agent là TUI — chúng mặc định có người ngồi trước terminal. Điều khiển chúng từ script, từ trình duyệt hay từ kênh chat khách hàng nghĩa là phải tự sở hữu một pseudo-terminal thật trên cả Windows lẫn Linux, rồi trả lời câu hỏi mà một TUI không bao giờ phải trả lời: lượt này kết thúc lúc nào?',
    highlights: [
      'Phát hiện kết thúc lượt, chính xác ở chỗ chính xác được: lệnh send do daemon phát buộc prompt_id của hook UserPromptSubmit vào đúng đoạn text vừa ghi vào PTY, và chỉ chốt khi hook Stop khớp về. Claude bản cũ, hook tắt và profile khác thì rơi về heuristic khoảng lặng/dialog đã ghi rõ.',
      'Một codebase cho hai mô hình tiến trình OS: Windows chạy ConPTY trong Job Object, Linux chạy PTY thật với process group giết được cả cây. 56 tệp _windows.go và 25 tệp _linux.go giữ chỗ rẽ nhánh ở tầng syscall, và driver SQLite thuần Go nghĩa là không cgo — cả hai đích cross-build từ một runner.',
      'Fan-out từ chối tự chấm điểm mình: N git worktree trên nhánh riêng, một ‘claude -p’ headless trong mỗi cái, chi phí token in ra TRƯỚC khi tạo gì, bảng kết quả ở cuối. File untracked có cột riêng — agent không commit, nên git diff không thấy việc nó làm. Cố ý không có điểm số.',
      'Portal không bao giờ được cầm master token: một khóa dùng-một-lần đổi lấy cookie HttpOnly ký HMAC, khóa theo host, sống 12 giờ — rồi chính cookie đó bị từ chối /shutdown, /runs và route prompt. Cũng API loopback 197 route này phục vụ MCP qua Streamable HTTP — 10 tool, chặn 256 KiB.',
      'Prompt injection là mô hình đe dọa thật: cửa duy nhất agent nói ra Zalo nhận mã lô chứ không nhận thread id, nên “gửi giúp sang nhóm X” không có tham số nào để chỉ vào X; capability của lô so trong thời gian hằng. Media vào từ chối địa chỉ private và đối chiếu MIME với chữ ký file.',
      'Sản phẩm hoá được thành thứ bán được: một repo đóng gói riêng dựng ra bản Zalo-bot giao cho người mua từ chính nguồn này mà không đụng vào nó — copy checkout sang thư mục tạm, áp overlay, launcher và seam persona ở đó, build ở đó, rồi xoá; xong thì cây nguồn giống hệt từng byte. Script từ chối chạy nếu working tree chưa sạch.',
      'Quy mô và trần đã nêu rõ: ~93.000 dòng Go không tính test, đối lại 3.540 hàm test, 911 commit trong bảy tuần, pipeline 13 job có gofmt, vet và govulncheck. Chỉ kiểm trên Windows 10 1809+ và Ubuntu Desktop 22.04/24.04 x86-64 — không macOS, không ARM — và logs phiên tương tác là bản repaint ConPTY, không phải transcript trung thực.',
    ],
  },
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
    id: 'academy', name: 'MIDU Academy — Nền tảng khoá học & video', role: 'Architect / Owner',
    summary: 'Nền tảng khoá học trả phí mà phần khó là giữ cho video trả phí vẫn là trả phí — HLS ký token, thời gian xem do server xác thực, mỗi tài khoản một thiết bị.',
    problem: 'Bán bài học video trên web mở. URL phát được giao thẳng cho trình duyệt, tiến độ mà player báo về do chính người muốn bỏ qua bài học viết ra, và tài khoản thì chia sẻ quá dễ — trong khi hoàn thành bài, điều kiện dự thi và chứng chỉ đều dựa lên đúng những con số ấy.',
    highlights: [
      'Thời gian xem do server xác thực, coi client là đối thủ: heartbeat 10 giây ghi nhận min(elapsed × rate, quãng thực đi được), chặn tab treo ở 30 giây, loại cú tua vượt maxWatched + 3 giây và loại sequence phát lại. Lấy vị trí chứ không lấy cờ playing — cờ đó từng làm bài ngắn không bao giờ hoàn thành được.',
      'Ba sơ đồ ký viết đúng thứ tự payload của từng nhà cung cấp (credential TUS, token CDN HMAC-SHA-256, chữ ký ImageKit). URL phát sống 3 phút sau một phiên 60 giây và mỗi lần cấp lại đều chạy lại kiểm tra quyền, nên huỷ gói là mất quyền phát trong chưa đầy một phút.',
      'Kiểm soát tương tranh đặt ở database thay vì tầng ứng dụng: unique index phân xử hai thiết bị cùng lúc bắt đầu, vì “thu hồi rồi chèn” là hai thao tác mà cả hai bên đua đều thắng. Token phát trước khi luật lên vẫn hiệu lực tới lần đăng nhập kế — rollout an toàn.',
      'Một lỗ leo thang đặc quyền tự tìm ra và tự bịt trong code của mình: tài khoản INTERNAL có thể PATCH chính role của mình thành ADMIN — trường này sống sót qua pipe whitelist toàn cục vì DTO có khai báo nó, và có hiệu lực ngay vì jwt.strategy đọc lại account mỗi request. Guard bảo vệ route; chỗ này cần phân quyền theo từng trường.',
      'Chỉ chấm ở server thì sau vài lần thi lại là lộ một đáp án vĩnh viễn, nên mỗi đề bốc mẫu từ ngân hàng câu hỏi và xáo riêng từng người. Mã chứng chỉ chuyển từ sáu ký tự base36 sinh theo công thức (~8% trùng ở 19.000 chứng chỉ, đúc offline được) sang 128 bit ngẫu nhiên dạng Crockford base32.',
      'Hợp nhất định danh trên collection mà năm hệ thống đã cùng ghi nhiều năm: 19.214/19.249 bản ghi đúng chuẩn, 26 bản mất số 0 đầu, 11 người bị trùng. Hàm chuẩn hoá để nguyên thứ không đọc được — tra không ra còn hơn khớp nhầm người.',
      '25 luật nghiệp vụ nằm trong module thuần đặt cạnh service, mỗi module một spec đi kèm — kiểm thử được mà không cần database. Bảo mật khẳng định bằng test chạy được: một test quét bundle đã build tìm key bị lọt, một test chặn E2E nếu tên database không kết thúc bằng E2E. 107 route, 15 collection, ~42k dòng TypeScript không tính test, 933 test, 339 commit. Trần nêu rõ: chưa có Dockerfile hay CI — triển khai vẫn thủ công.',
    ],
  },
  {
    id: 'xwealth', name: 'xWealth — Nền tảng đầu tư bán lẻ', role: 'Fullstack Developer · DATX',
    summary: 'Nền tảng đánh giá cổ phiếu và tín hiệu giao dịch realtime cho nhà đầu tư cá nhân Việt Nam.',
    problem: 'Stream giá và rating realtime theo từng mã vào một UI giao dịch lồng sâu suốt cả phiên — mà không re-render cả bảng mỗi tick hay rớt socket.',
    highlights: [
      'State realtime hạt mịn: 12 subscription GraphQL trên 32 điểm gọi đổ mỗi tick vào một atom Recoil khóa theo mã, nên một cập nhật giá chỉ re-render đúng ô chứa mã đó — không phải bảng cha. Khác biệt giữa ticker mượt và ticker giật.',
      'Transport chịu lỗi tốt: graphql-ws cho subscription (keepalive + đóng khi mất pong + retry vô hạn), HTTP cho query/mutation — feed phải sống suốt cả phiên giao dịch.',
      'Lọc đúng nghiệp vụ: tick vào được gate ở client theo khung giờ phiên từng sàn (HOSE / HNX / UPCOM), nên giá cũ ngoài giờ không bao giờ hiển thị.',
      'Toán tiền bằng decimal.js: giá snap về bước giá theo sàn (10/50/100đ) với làm tròn tường minh — không trôi số float trên giá trị tài chính.',
      'Chart dữ liệu lớn: Highcharts với module boost (WebGL) + treemap heatmap, vì SVG thường nghẽn ở kích thước series này.',
      'Quy mô: 41 operation GraphQL và 311 component sau pipeline Kubernetes đa môi trường có SonarQube gate. Phạm vi thật: frontend tiêu thụ model rating phía server của DATX — thuật toán chấm điểm nằm ở backend, không ở đây.',
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
      'Quy mô bề mặt: 65 nhóm route, 69 controller, 71 model trong một backend. Ghi chú thật: phần RabbitMQ/MinIO mới scaffolded và đang tắt — hiện lưu local disk, luồng chạy đồng bộ.',
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
      'Quy mô: 32 model, 27 cặp route/controller, ~1.100+ commit qua một năm bảo trì production; Socket.IO stream tiến độ realtime cho các lần sync Excel dài, sau timeout request 30 phút. Phạm vi thật: ba brand của một công ty qua một sàn + một script ngoài — không phải “mọi kênh bán”.',
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
      'Logging cấp vận hành: winston structured log, và config được kiểm ngay lúc khởi động bằng joi + envalid — thiếu biến là tiến trình chết luôn, thay vì lòi ra một cái 403 khó hiểu về sau.',
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
    id: 'numerology', name: 'Numerology — Nền tảng báo cáo & bán hàng', role: 'Architect / Owner',
    summary: 'Sản phẩm báo cáo thần số học trả phí: một engine tính toán tất định, tài liệu sinh tự động, và toàn bộ phễu bán hàng quanh nó.',
    problem: 'Bán một tài liệu được sinh ra. Con số phải tính giống hệt nhau ở mọi chỗ nó xuất hiện, báo cáo phải đến tay khách dưới dạng một file thật chứ không phải một trang web, và tiền phải được đối soát từ webhook ngân hàng — thứ có thể bắn về hai lần.',
    highlights: [
      'Engine là một module không DI, dùng chung cho cả bản xem thử của khách vãng lai lẫn bản phân tích sau đăng nhập, nên hai luồng dựng ra đúng một hình dạng — đường đời, sứ mệnh, linh hồn, năm cá nhân, đỉnh cao và essence, ghép thành 16 khối báo cáo từ kho nội dung chứ không phải văn bản tự do.',
      'Thứ bàn giao là một tài liệu, không phải một trang: docxtemplater và pizzip đổ dữ liệu vào template DOCX, ConvertAPI render ra PDF, file được gửi vào email người mua — cái họ giữ lại là một file, và đó cũng là lý do sản phẩm đáng trả tiền.',
      'Thanh toán đối soát từ ngân hàng, không bao giờ từ trình duyệt: webhook SePay phải qua allowlist IP và một phép so khóa trong thời gian hằng, còn unique index trên id của SePay khiến việc xử lý chỉ nhận một lần — một cú gửi lại không thể ghi có đơn hàng hai lần. Khách trả tiền qua VietQR.',
      'Một cú kiểm tra lúc khởi động, và nó hét lên: bật SEPAY_WEBHOOK_ENABLED mà quên TRUST_PROXY thì Express trả về địa chỉ loopback của nginx cho mọi request, và allowlist IP từ chối sạch. Service log thẳng lỗi đó lúc boot thay vì để người ta tìm ra trên production.',
      'Phễu chính là kiến trúc: bản xem thử bốn chỉ số miễn phí, rồi xác thực email, rồi báo cáo trả phí — với quy kết affiliate và voucher định giá nằm ở giữa.',
      'Quy mô: ~85.000 dòng TypeScript, 85 route REST, 162 component frontend, 1.166 test trên 97 tệp spec. Ghi chú thật: phần luận giải là nội dung do người viết — engine chọn và ghép chúng một cách tất định, chứ không sinh ra chúng.',
    ],
  },
  {
    id: 'loyalty', name: 'Nền tảng Loyalty & Phần thưởng', role: 'Architect / Owner',
    summary: 'Tích điểm, quay thưởng và đổi quà cho tệp khách hàng công ty — lớp gamification đặt trên nền định danh dùng chung.',
    problem: 'Vận hành một vòng quay mà khách không gian lận được và doanh nghiệp cũng không tự phá sản vì nó. Xác suất phải nằm ở server, tồn kho phải giữ được, mà vòng quay vẫn phải ra chất vòng quay.',
    highlights: [
      'Client không bao giờ là bên chọn giải. Server quyết định từ tỷ lệ trúng tuyệt đối của từng giải, chia đều phần xác suất còn lại cho những giải chưa cấu hình, chuẩn hoá lại ngay lúc chạy nếu tổng tỷ lệ bị nhập vượt 100%, rồi duyệt phân phối tích luỹ — nên một vòng quay cấu hình sai sẽ suy giảm chứ không vỡ.',
      'Kiểm soát chi phí nằm ngay trong phép quay: mỗi giải mang một định mức theo ngày, giải hết suất bị loại khỏi rổ trước khi gieo, và khi hết sạch thì vòng quay rơi về giải thấp nhất thay vì báo lỗi vào mặt khách.',
      'Mỗi lần trúng đều ghi một giao dịch điểm, nên số dư khách nhìn thấy là một sổ cái chứ không phải một biến đếm — cũng chính những bản ghi đó chống lưng cho đổi quà và trả thưởng.',
      'Tích hợp VNPay ký request bằng HMAC-SHA512 và kiểm vnp_SecureHash lúc quay về, coi URL trả về là dữ liệu không đáng tin.',
      'Đây là một nền tảng chứ không phải một app: 110 route, một public API M2M sau x-api-key, một kênh tích hợp với PRM, và định danh shops dùng chung với auth service lẫn academy.',
      'Trần đã nêu rõ: phép gieo dùng Math.random chứ không phải CSPRNG, và kiểm tra định mức theo ngày là đọc-rồi-ghi, nên một loạt lượt quay đồng thời có thể vượt định mức. Test mới có 5 tệp spec đối lại 16 controller — mỏng nhất trong các hệ thống mình sở hữu, và là chỗ mình sẽ bắt đầu.',
    ],
  },
  {
    id: 'matching', name: 'Matching App — AWS Serverless (thị trường Nhật)', role: 'Frontend Developer · Rikkeisoft · team 25 người',
    summary: 'Ứng dụng ghép đôi kiểu Tinder cho thị trường Nhật, chạy trên backend AWS serverless hoàn toàn.',
    problem: 'Đưa một sản phẩm ghép đôi ra thị trường Nhật với 25 người trong dự án và không có kỹ sư hạ tầng chuyên trách. Ghép đôi và chat realtime, luồng xác thực đáp ứng yêu cầu của khách Nhật, thanh toán qua PSP nội địa — tất cả trên dịch vụ managed, vì không có ai để vận hành server.',
    highlights: [
      'Mình dựng nền Next.js mà toàn bộ module của team xây lên trên — routing, layout, tầng component Ant Design dùng chung và tầng dữ liệu GraphQL. Ở dự án 25 người, cái nền mới là sản phẩm thật: nó quyết định 24 người còn lại phải tranh luận về cấu trúc bao nhiêu lần.',
      'Serverless là lựa chọn có lý do chứ không chạy theo trend: AppSync cho GraphQL, Lambda cho resolver, Cognito cho định danh, CDK và CloudFormation cho stack. Cái được là gánh nặng vận hành gần như bằng không cho một team không có ops. Cái mất là khoá chân vào nhà cung cấp và môi trường dev local không bao giờ giống production — đánh đổi mà ở quy mô đó mình vẫn chọn lại, và sẽ xem lại khi scale.',
      'Schema GraphQL chính là hợp đồng giữa front và back, nên frontend làm việc với một kiểu dữ liệu có type thay vì một bản mô tả bằng lời cộng một luồng chat — đây là lý do lớn nhất khiến làm song song ngần ấy người mà không vỡ liên tục.',
      'Ghép đôi và chat realtime chạy trên AppSync subscription thay vì tự dựng socket server, đẩy phần kết nối lại, fan-out và scaling sang nhà cung cấp. Nhìn lại, đó vẫn là quyết định mình đưa ra hôm nay khi team không có người sở hữu hạ tầng.',
      'GMO Payment — PSP lớn nhất Nhật Bản: trạng thái thanh toán đáng tin là trạng thái đối soát từ callback của nhà cung cấp, không bao giờ là cái client khai. Đúng nguyên tắc mình áp cho mọi webhook nhận vào bây giờ.',
      'Phạm vi thật: mình sở hữu frontend và phần nền, không phải kiến trúc backend. Kể từ kinh nghiệm — repo thuộc về khách hàng và mình không còn quyền truy cập, nên ở đây không có số liệu đo được nào.',
    ],
  },
  {
    id: 'datx-admin', name: 'DATX — Nền tảng quản trị nội bộ', role: 'Fullstack Developer · DATX · team 18 người',
    summary: 'Nền tảng vận hành nội bộ phía sau các sản phẩm fintech của DATX — làm chủ từ đầu đến cuối, cả front lẫn back.',
    problem: 'Xây nền tảng nội bộ mà cả công ty thực sự chạy trên đó. Công cụ nội bộ luôn được đầu tư thiết kế ít nhất và thay đổi schema nhiều nhất, mà cái này còn phải phục vụ hai database cùng lúc — nhóm bản ghi vận hành cần linh hoạt, và nhóm bản ghi quan hệ phải join được và nhất quán.',
    highlights: [
      'Vai trò đầu tiên mình làm chủ một tính năng từ đầu tới cuối — React phía front, Express phía back, cả hai database — thay vì bàn giao ở lưng chừng. Đó là chỗ mình học được có bao nhiêu chi phí thiết kế nằm ẩn trong chính cú bàn giao đó.',
      'Chọn database theo loại bản ghi chứ không theo dự án: MongoDB ở chỗ hình dạng dữ liệu còn thay đổi, PostgreSQL ở chỗ bản ghi phải join và giữ nhất quán. Lỗi mình thấy các team xung quanh hay mắc là chọn một store cho cả hệ thống rồi vật lộn với nó cả năm.',
      'Các màn quản trị dày đặc dữ liệu — bảng, bộ lọc, form — dựng trên Material UI với Tailwind lo phần layout bao quanh. UI quản trị là chỗ vấn đề hiệu năng lộ ra sớm nhất, vì chẳng ai phân trang công cụ nội bộ cho tới lúc nó đau.',
      'Mười tám người trên một codebase dạy mình điều bây giờ mình bắt buộc với vai trò lead: code được viết để người mình không bao giờ nói chuyện đọc được, và một quy ước cả team tuân thủ thắng một quy ước hay hơn mà nửa team phớt lờ.',
      'Phạm vi thật: mình là người làm fullstack, không phải kiến trúc sư. Kể từ kinh nghiệm — repo thuộc về DATX và mình không còn quyền truy cập, nên ở đây không có số liệu đo được nào.',
    ],
  },
  {
    id: 'harness', name: 'Harness — Bộ khung làm việc cho coding agent', role: 'Head of Technology',
    summary: 'Một binary Go tự chứa, cài bộ khung làm việc vào repository để coding agent biết phạm vi của mình, cổng nào phải dừng, và thế nào mới gọi là xong.',
    problem: 'Coding agent viết code rất tốt; thất bại không nằm ở đó. Vào một repo lạ, agent không phân biệt được đâu là quy tắc có thẩm quyền đâu chỉ là thói quen của nhóm, tự quyết những chính sách sản phẩm vốn không thuộc quyền nó, và báo xong việc mà không có gì để đối chiếu.',
    highlights: [
      'Lời giải là văn bản nằm trong repository, không phải một plugin: chọn chế độ làm việc trước khi hành động, cổng thẩm quyền buộc dừng lại hỏi thay vì tự chọn chính sách, chuẩn hoàn thành đòi bằng chứng thực thi hoặc quan sát được, bộ nhớ bền trong docs/plans, và bốn skill đóng gói sẵn. Không thứ nào gắn với một agent cụ thể, nên nó sống lâu hơn công cụ mà team đang dùng.',
      'Một file thực thi là toàn bộ bản phân phối. go:embed mang theo mọi tệp được quản lý, và lúc khởi động binary đối chiếu inventory đã khai với tập tệp nhúng, validate từng đường dẫn tương đối rồi hash từng tệp. Đổi đúng một byte payload là phải tăng version — hai payload khác nhau không bao giờ được chung một định danh.',
      'Cập nhật hướng dẫn mà không phá mất chỉnh sửa cục bộ mới là bài toán thật: mỗi tệp được quản lý đem so BASE + LOCAL + UPSTREAM, thay đổi một phía giải quyết ngay trong bộ nhớ, xung đột văn bản thật thì đẩy sang git merge-file --diff3, còn chồng lấn thì đóng băng input, trả exit code 2, và không đụng vào tệp sống lẫn provenance.',
      'Ghi vào repository của người khác mới là chỗ nguy hiểm, nên mọi thao tác thay đổi đều lấy khóa độc quyền, khôi phục giao dịch dở dang trước khi bắt đầu cái mới, ghi rồi kiểm lại bản sao lưu, xong mới commit. Journal mang SHA-256 của từng byte cũ, và journal schema 1 đời trước bị cố ý từ chối vì không có metadata toàn vẹn nào đáng tin.',
      'Phụ thuộc hướng vào trong: domain giữ đường dẫn đã xác thực, hash và kết quả hợp nhất; application giữ chính sách install, update và khôi phục sau các port hẹp; infrastructure cùng CLI nằm ngoài. Không thứ gì trong domain hay application biết đến filesystem, tiến trình hay terminal — nhờ vậy phần merge giao được cho git thay vì tự viết lại.',
      'Binary này là hình hài sản phẩm hoá của một thay đổi mình vốn đã chịu trách nhiệm: Claude Code thành chuẩn của team, 37 skill và 26 command mã hoá bộ quy tắc TypeScript và Go của công ty, một plugin design system có CI canh, cùng hook quét lại mọi lần sửa. Kết quả mình đứng tên là team từ 12 người xuống 7 mà năng suất giao hàng tăng khoảng gấp đôi.',
      'Những việc cố ý không làm giữ cho nó nhỏ: không cơ sở dữ liệu công việc, không control plane, không dò bản phát hành, không tự thay thế file thực thi. Quy mô: 8.576 dòng Go không tính test trên 62 tệp. Trần đã nêu rõ: đúng một tệp test với 20 hàm test đối lại ngần ấy code, và ARCHITECTURE.md vẫn còn ghi là không có mã test nào được commit — mỏng nhất trong mọi thứ mình sở hữu, và là chỗ mình sẽ sửa đầu tiên.',
    ],
  },
]

export const PROJECT_LINK = {
  live: 'Live', private: 'Private',
  visit: 'Mở trang thật', none: 'Private — không có URL công khai',
}

export const PROJECT_GROUP_LABELS = {
  frontend: 'Frontend', backend: 'Backend', data: 'Dữ liệu', infra: 'Hạ tầng', patterns: 'Kỹ thuật',
}

export const SKILLS = [
  { group: 'Ngôn ngữ', items: ['TypeScript', 'JavaScript (Node.js)', 'Go'] },
  { group: 'Frontend', items: ['Next.js', 'React', 'Vite', 'Tailwind CSS', 'Ant Design', 'Redux / Recoil'] },
  { group: 'Backend', items: ['NestJS', 'Express', 'REST', 'GraphQL', 'Prisma', 'Mongoose'] },
  { group: 'Dữ liệu', items: ['MongoDB (replica sets)', 'PostgreSQL', 'MySQL', 'SQLite'] },
  { group: 'AI & LLM', items: ['Tích hợp LLM', 'RAG pipelines', 'Fine-tuning', 'MCP (Model Context Protocol)', 'OpenClaw', 'Claude Code', 'Windsurf'] },
  { group: 'Hạ tầng & DevOps', items: ['Docker', 'Nginx', 'PM2', 'GitLab CI/CD (self-hosted)', 'Linode / DigitalOcean'] },
  { group: 'Lãnh đạo', items: ['Xây dựng đội ngũ', 'Agile/Scrum', 'Tuyển dụng & mentoring', 'Kho tri thức kỹ thuật'] },
]

export const CONTACT = [
  { label: 'Email', value: 'manvantruong2k@gmail.com', href: 'mailto:manvantruong2k@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/boizdeeptry', href: 'https://www.linkedin.com/in/boizdeeptry/' },
  { label: 'Địa điểm', value: 'Hà Nội, Việt Nam', href: null },
]

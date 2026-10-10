export const defaultLayout = [
  { id: 'hero', type: 'section', name: 'Hero (Giới thiệu đầu trang)', enabled: true, isRemovable: false },
  { id: 'about', type: 'section', name: 'Về tôi & Chỉ số (About)', enabled: true, isRemovable: false },
  { id: 'tech_matrix', type: 'widget', widgetType: 'tech_matrix', name: 'Ma Trận Kỹ Năng (Tech Matrix)', enabled: true, isRemovable: true, config: { title: 'MA TRẬN KỸ NĂNG & NĂNG LỰC CÔNG NGHỆ' } },
  { id: 'timeline', type: 'section', name: 'Hành trình sự nghiệp (Timeline)', enabled: true, isRemovable: false },
  { id: 'github_stats', type: 'widget', widgetType: 'github_stats', name: 'GitHub Activity & Stats', enabled: true, isRemovable: true, config: { title: 'HOẠT ĐỘNG GITHUB & MÃ NGUỒN MỞ', username: 'RIOMOD' } },
  { id: 'projects', type: 'section', name: 'Danh mục Dự án (Projects)', enabled: true, isRemovable: false },
  { id: 'music_player', type: 'widget', widgetType: 'music_player', name: 'Lo-Fi Music Player Bar', enabled: true, isRemovable: true, config: { title: 'AUDIO VIBES WIDGET' } },
  { id: 'events', type: 'section', name: 'Hoạt động & Sự kiện (Events)', enabled: true, isRemovable: false },
  { id: 'quote_banner', type: 'widget', widgetType: 'quote_banner', name: 'Triết Lý Sống & Phương Châm', enabled: true, isRemovable: true, config: { quote: 'Công nghệ tạo ra giải pháp, nhưng sự thấu hiểu và tận tâm mới là cầu nối bền vững nhất giữa con người với con người.', author: 'Nguyễn Công Trứ', badge: 'TRIẾT LÝ HÀNH ĐỘNG & NGHỀ NGHIỆP' } },
  { id: 'certificates', type: 'section', name: 'Bằng cấp & Chứng chỉ (Certificates)', enabled: true, isRemovable: false },
  { id: 'quick_cta', type: 'widget', widgetType: 'quick_cta', name: 'Quick Booking & Coffee Chat', enabled: true, isRemovable: true, config: { title: 'Sẵn sàng mở rộng cơ hội & trao đổi hợp tác?', subtitle: 'Tôi luôn sẵn lòng tiếp nhận cơ hội thực tập, dự án tư vấn EdTech hoặc những buổi trò chuyện cafe trao đổi chuyên môn.', buttonText: 'Gửi Tin Nhắn Hợp Tác Ngay' } },
  { id: 'social_connect', type: 'widget', widgetType: 'social_connect', name: 'Social Connect Grid', enabled: true, isRemovable: true, config: { title: 'MẠNG XÃ HỘI & KÊNH LIÊN LẠC TRỰC TUYẾN' } },
  { id: 'contact', type: 'section', name: 'Thông tin liên hệ (Contact)', enabled: true, isRemovable: false }
];

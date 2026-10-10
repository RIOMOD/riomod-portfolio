import React from 'react';
import { Calendar, Mail, ArrowRight, MessageSquare, Coffee } from 'lucide-react';
import { usePortfolioData } from '../../context/DataContext';

export default function QuickCtaWidget({ config = {} }) {
  const { profile } = usePortfolioData();
  const title = config.title || 'Sẵn sàng mở rộng cơ hội & trao đổi hợp tác?';
  const subtitle = config.subtitle || 'Tôi luôn sẵn lòng tiếp nhận cơ hội thực tập, dự án tư vấn EdTech hoặc những buổi trò chuyện cafe trao đổi chuyên môn.';
  const buttonText = config.buttonText || 'Gửi Tin Nhắn Hợp Tác Ngay';
  const email = profile.email || 'nguyencongtru2923@gmail.com';

  return (
    <section id="widget-cta" style={{ padding: '4rem 1.5rem', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(14, 28, 38, 0.9) 0%, rgba(10, 15, 24, 0.95) 100%)',
        border: '1px solid rgba(6, 214, 160, 0.35)',
        borderRadius: '16px',
        padding: '3rem 2.5rem',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(6, 214, 160, 0.12)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem'
      }}>
        <div style={{ maxWidth: '650px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Coffee size={18} color="#06d6a0" />
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: '#06d6a0', textTransform: 'uppercase', fontWeight: 600 }}>
              KẾT NỐI NHANH • COFFEE & CHAT
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontFamily: 'var(--font-heading)', color: '#fff', margin: '0 0 0.75rem 0', lineHeight: 1.3 }}>
            {title}
          </h2>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
            {subtitle}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <a
            href={`mailto:${email}?subject=Trao%20đổi%20cơ%20hội%20hợp%20tác%20với%20Nguyễn%20Công%20Trứ`}
            className="btn-primary"
            style={{
              padding: '0.85rem 1.6rem',
              fontSize: '0.92rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              textDecoration: 'none',
              borderRadius: '8px',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(6, 214, 160, 0.3)'
            }}
          >
            <Mail size={18} />
            <span>{buttonText}</span>
            <ArrowRight size={16} />
          </a>

          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>
            ⚡ Phản hồi trong vòng 24 giờ làm việc
          </span>
        </div>
      </div>
    </section>
  );
}

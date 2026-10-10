import React from 'react';
import { Share2, Mail, Phone, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon } from './BrandIcons';
import { usePortfolioData } from '../../context/DataContext';

export default function SocialConnectWidget({ config = {} }) {
  const { profile } = usePortfolioData();
  const title = config.title || 'MẠNG XÃ HỘI & KÊNH LIÊN LẠC TRỰC TUYẾN';

  const channels = [
    {
      name: 'GitHub',
      label: 'RIOMOD Code Hub',
      icon: <GithubIcon size={20} color="#06d6a0" />,
      url: profile.github || 'https://github.com/RIOMOD',
      color: 'rgba(6, 214, 160, 0.15)',
      border: 'rgba(6, 214, 160, 0.4)'
    },
    {
      name: 'LinkedIn',
      label: 'Hồ sơ Chuyên nghiệp',
      icon: <LinkedinIcon size={20} color="#0077b5" />,
      url: profile.linkedin || '#',
      color: 'rgba(0, 119, 181, 0.15)',
      border: 'rgba(0, 119, 181, 0.4)'
    },
    {
      name: 'Facebook',
      label: 'Trang Cá Nhân',
      icon: <FacebookIcon size={20} color="#1877f2" />,
      url: profile.facebook || '#',
      color: 'rgba(24, 119, 242, 0.15)',
      border: 'rgba(24, 119, 242, 0.4)'
    },
    {
      name: 'Email Trực tiếp',
      label: profile.email || 'nguyencongtru2923@gmail.com',
      icon: <Mail size={20} color="#c084fc" />,
      url: `mailto:${profile.email || 'nguyencongtru2923@gmail.com'}`,
      color: 'rgba(157, 78, 221, 0.15)',
      border: 'rgba(157, 78, 221, 0.4)'
    }
  ];

  return (
    <section id="widget-social" style={{ padding: '3.5rem 1.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 20, 30, 0.85) 0%, rgba(10, 12, 18, 0.95) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.75rem' }}>
          <Share2 size={20} color="var(--accent-purple)" />
          <h2 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: '#fff', margin: 0 }}>
            {title}
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem'
        }}>
          {channels.map((ch, idx) => (
            <a
              key={idx}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.25rem',
                borderRadius: '12px',
                background: ch.color,
                border: `1px solid ${ch.border}`,
                textDecoration: 'none',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {ch.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {ch.name}
                  <ExternalLink size={13} color="var(--text-muted)" />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {ch.label}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { usePortfolioData } from '../context/DataContext';
import { ArrowDown, BookOpen, Sparkles, MapPin, Mail, Terminal, ShieldCheck } from 'lucide-react';

export default function Hero({ isMagazineMode, toggleMagazineMode }) {
  const { profile, setIsAdminOpen } = usePortfolioData();

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 0 3rem', position: 'relative', zIndex: 1, width: '100%' }}>
      <div className="site-container">
        
        {/* Editorial Top Metadata */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span className="page-number-tag">[ 01 / COVER PAGE ]</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>● {profile.subtitle || 'Dự án & Hồ sơ Năng lực'}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,240,255,0.08)', padding: '0.35rem 0.85rem', borderRadius: '50px', border: '1px solid rgba(0,240,255,0.2)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 10px #00f0ff', display: 'inline-block' }}></span>
            <span style={{ fontSize: '0.75rem', color: '#00f0ff', fontWeight: 600, letterSpacing: '0.05em' }}>{profile.status || 'Đang mở cơ hội hợp tác'}</span>
          </div>
        </div>

        {/* Main Cover Box Frame */}
        <div className="editorial-box" style={{ textAlign: 'center', position: 'relative' }}>
          
          <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            PERSONAL CREATIVE ARCHIVE
          </p>

          {/* Large Bold Editorial Box */}
          <div style={{
            border: '3px solid #ffffff',
            padding: 'clamp(1.5rem, 5vw, 2.75rem) clamp(1rem, 3vw, 2rem)',
            margin: '0 auto 2.5rem',
            maxWidth: '680px',
            width: '100%',
            background: 'rgba(9, 10, 13, 0.45)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.75rem, 9vw, 6.2rem)', lineHeight: 0.95, letterSpacing: '0.06em', color: '#ffffff', textTransform: 'uppercase' }}>
              PORT<br/>FOLIO
            </h1>
            
            <div style={{ width: '120px', height: '2px', background: '#ffffff', margin: '1.5rem auto' }}></div>
            
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', letterSpacing: '0.25em', color: 'var(--text-muted)' }}>
              EDITION 2026 ● 3D EXPERIENCE
            </p>
          </div>

          {/* Title & Tagline */}
          <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.45rem)', fontFamily: 'var(--font-heading)', color: '#ffffff', letterSpacing: '0.08em', marginBottom: '1rem', textTransform: 'uppercase' }}>
            {profile.name} — <span style={{ color: 'var(--accent-cyan)' }}>{profile.title}</span>
          </h2>

          <p style={{ maxWidth: '720px', margin: '0 auto 2.5rem', color: 'var(--text-muted)', fontSize: 'clamp(0.95rem, 2vw, 1.08rem)', lineHeight: 1.75 }}>
            {profile.tagline}
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" className="btn-editorial btn-accent" onClick={toggleMagazineMode}>
              <BookOpen size={17} />
              {isMagazineMode ? "Chuyển Dạng Cuộn" : "Mở Chế Độ Lật Sách 3D"}
            </button>

            <a href="#projects" className="btn-editorial">
              <Terminal size={17} />
              Xem Danh Mục Dự Án
            </a>

            <button type="button" className="btn-editorial btn-admin" onClick={() => setIsAdminOpen(true)}>
              <ShieldCheck size={17} />
              Quản Trị Dữ Liệu
            </button>
          </div>

          {/* Quick Footer Metadata inside Cover */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--surface-border)', textAlign: 'left' }}>
            {profile.location && (
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Địa điểm</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}>
                  <MapPin size={14} color="var(--accent-cyan)" /> {profile.location}
                </span>
              </div>
            )}

            {profile.email && (
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Liên hệ trực tiếp</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}>
                  <Mail size={14} color="var(--accent-cyan)" /> {profile.email}
                </span>
              </div>
            )}

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Trải nghiệm</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', marginTop: '0.25rem', display: 'block' }}>
                3D Interactive WebGL & Editorial
              </span>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a href="#about" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', letterSpacing: '0.15em' }}>
            CUỘN XUỐNG ĐỂ KHÁM PHÁ
            <ArrowDown size={16} className="glow-accent" style={{ animation: 'bounce 2s infinite' }} />
          </a>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowDown, BookOpen, Sparkles, MapPin, Mail, Terminal } from 'lucide-react';

export default function Hero({ isMagazineMode, toggleMagazineMode }) {
  const { profile } = portfolioData;

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem 3rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1100px', width: '100%' }}>
        
        {/* Editorial Top Metadata */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="page-number-tag">[ 01 / COVER PAGE ]</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>● {profile.subtitle}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,240,255,0.08)', padding: '0.35rem 0.85rem', borderRadius: '50px', border: '1px solid rgba(0,240,255,0.2)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 10px #00f0ff', display: 'inline-block' }}></span>
            <span style={{ fontSize: '0.75rem', color: '#00f0ff', fontWeight: 600, letterSpacing: '0.05em' }}>{profile.status}</span>
          </div>
        </div>

        {/* Main Cover Box Frame (Mirroring Reference Image) */}
        <div className="editorial-box" style={{ textAlign: 'center', padding: '4rem 2rem', position: 'relative' }}>
          
          <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-muted)', fontSize: '0.9rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            PERSONAL CREATIVE ARCHIVE
          </p>

          {/* Large Bold Editorial Box (Frame inside Frame like Reference Picture) */}
          <div style={{
            border: '3px solid #ffffff',
            padding: '2.5rem 1.5rem',
            margin: '0 auto 2.5rem',
            maxWidth: '650px',
            background: 'rgba(9, 10, 13, 0.4)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.95, letterSpacing: '0.06em', color: '#ffffff', textTransform: 'uppercase' }}>
              PORT<br/>FOLIO
            </h1>
            
            <div style={{ width: '120px', height: '2px', background: '#ffffff', margin: '1.5rem auto' }}></div>
            
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', letterSpacing: '0.25em', color: 'var(--text-muted)' }}>
              WWW.ALEXNGUYEN.DEV
            </p>
          </div>

          {/* Title & Tagline */}
          <h2 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: '#ffffff', letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>
            {profile.name} — {profile.title}
          </h2>

          <p style={{ maxWidth: '680px', margin: '0 auto 2.5rem', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            {profile.tagline}
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-editorial btn-accent" onClick={toggleMagazineMode}>
              <BookOpen size={18} />
              {isMagazineMode ? "Chuyển chế độ Dạng Cuộn" : "Mở Chế Độ Lật Sách 3D"}
            </button>

            <a href="#projects" className="btn-editorial" style={{ textDecoration: 'none' }}>
              <Terminal size={18} />
              Xem Dự Án Code
            </a>
          </div>

          {/* Quick Footer Metadata inside Cover */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--surface-border)', textAlign: 'left' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Địa điểm</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}>
                <MapPin size={14} color="var(--accent-cyan)" /> {profile.location}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Liên hệ nhanh</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}>
                <Mail size={14} color="var(--accent-cyan)" /> {profile.email}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Định dạng</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginTop: '0.25rem', display: 'block' }}>
                3D Interactive Editorial Layout
              </span>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="#about" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', letterSpacing: '0.15em' }}>
            CUỘN XUỐNG ĐỂ KHÁM PHÁ
            <ArrowDown size={16} className="glow-accent" style={{ animation: 'bounce 2s infinite' }} />
          </a>
        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { usePortfolioData } from '../context/DataContext';
import { BookOpen, ShieldCheck, Menu, X, Terminal, Sparkles, User, Award, Mail, Clock } from 'lucide-react';

export default function Header({ onOpenMagazine }) {
  const { profile, setIsAdminOpen } = usePortfolioData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="nav-header">
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="font-display" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', color: '#fff', letterSpacing: '0.1em' }}>
              {profile.name ? profile.name.toUpperCase() : 'NGUYỄN CÔNG TRỨ'}
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', border: '1px solid rgba(0,240,255,0.3)', padding: '0.1rem 0.4rem', borderRadius: '3px', whiteSpace: 'nowrap' }}>
              3D PORTFOLIO
            </span>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <a href="#about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.82rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>GIỚI THIỆU</a>
          <a href="#timeline" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.82rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>HÀNH TRÌNH</a>
          <a href="#projects" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.82rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>DỰ ÁN</a>
          <a href="#events" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.82rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>SỰ KIỆN</a>
          <a href="#certificates" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.82rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>BẰNG CẤP</a>
          <a href="#contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.82rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>LIÊN HỆ</a>
          
          <button 
            type="button"
            className="btn-editorial btn-accent" 
            onClick={onOpenMagazine}
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem' }}
          >
            <BookOpen size={14} /> Lật Sách 3D
          </button>

          <button
            type="button"
            className="btn-editorial btn-admin"
            onClick={() => setIsAdminOpen(true)}
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem' }}
            title="Mở bảng điều khiển quản trị"
          >
            <ShieldCheck size={14} /> Quản Trị
          </button>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open Navigation Menu"
        >
          <Menu size={22} />
        </button>
      </header>

      {/* Mobile Backdrop */}
      <div 
        className={`drawer-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Drawer Navigation */}
      <aside className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <span className="font-display" style={{ fontSize: '1.1rem', color: '#fff' }}>
              MENU ĐIỀU HƯỚNG
            </span>
            <button
              type="button"
              onClick={closeMobileMenu}
              className="btn-secondary"
              style={{ padding: '0.4rem', borderRadius: '50%' }}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <a href="#about" onClick={closeMobileMenu} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <User size={18} color="var(--accent-cyan)" /> Giới Thiệu
            </a>
            <a href="#timeline" onClick={closeMobileMenu} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Clock size={18} color="var(--accent-gold)" /> Hành Trình
            </a>
            <a href="#projects" onClick={closeMobileMenu} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Terminal size={18} color="var(--accent-cyan)" /> Dự Án Code & Media
            </a>
            <a href="#events" onClick={closeMobileMenu} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Sparkles size={18} color="var(--accent-purple)" /> Sự Kiện & Truyền Thông
            </a>
            <a href="#certificates" onClick={closeMobileMenu} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Award size={18} color="var(--accent-gold)" /> Bằng Cấp & Chứng Chỉ
            </a>
            <a href="#contact" onClick={closeMobileMenu} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail size={18} color="var(--accent-cyan)" /> Liên Hệ
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
          <button 
            type="button"
            className="btn-editorial btn-accent" 
            onClick={() => { closeMobileMenu(); onOpenMagazine(); }}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <BookOpen size={16} /> Chế Độ Lật Sách 3D
          </button>

          <button
            type="button"
            className="btn-editorial btn-admin"
            onClick={() => { closeMobileMenu(); setIsAdminOpen(true); }}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <ShieldCheck size={16} /> Quản Trị Dữ Liệu
          </button>
        </div>
      </aside>
    </>
  );
}

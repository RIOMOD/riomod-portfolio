import React, { useState } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import Hero from './components/Hero';
import AboutIndex from './components/AboutIndex';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Events from './components/Events';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import BrochureView from './components/BrochureView';
import { portfolioData } from './data/portfolioData';
import { BookOpen, Sparkles, Volume2, VolumeX, Layers, Menu, X } from 'lucide-react';

export default function App() {
  const [isMagazineMode, setIsMagazineMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      
      {/* 3D WebGL Canvas Background */}
      <ThreeCanvas />

      {/* Floating Top Navigation Header */}
      <header className="nav-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="font-display" style={{ fontSize: '1.4rem', color: '#fff', letterSpacing: '0.1em' }}>
              ALEX NGUYỄN
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', border: '1px solid rgba(0,240,255,0.3)', padding: '0.1rem 0.4rem' }}>
              3D PORTFOLIO
            </span>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          <a href="#about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>GIỚI THIỆU</a>
          <a href="#timeline" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>HÀNH TRÌNH</a>
          <a href="#projects" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>DỰ ÁN CODE</a>
          <a href="#events" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>SỰ KIỆN</a>
          <a href="#certificates" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>BẰNG CẤP</a>
          <a href="#contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>LIÊN HỆ</a>
          
          <button 
            className="btn-editorial btn-accent" 
            onClick={() => setIsMagazineMode(true)}
            style={{ padding: '0.45rem 1rem', fontSize: '0.75rem' }}
          >
            <BookOpen size={14} /> Chế Độ Lật Sách 3D
          </button>
        </nav>
      </header>

      {/* Main Content Render */}
      <main>
        <Hero 
          isMagazineMode={isMagazineMode} 
          toggleMagazineMode={() => setIsMagazineMode(true)} 
        />
        <AboutIndex />
        <Timeline />
        <Projects />
        <Events />
        <Certificates />
        <Contact />
      </main>

      {/* 3D Magazine Booklet Modal View (Trải nghiệm lật trang như hình tham chiếu) */}
      {isMagazineMode && (
        <BrochureView onClose={() => setIsMagazineMode(false)} />
      )}

    </div>
  );
}

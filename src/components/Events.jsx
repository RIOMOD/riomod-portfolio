import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../context/DataContext';
import { 
  Calendar, MapPin, Award, X, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, RotateCcw, Play, Pause, Maximize2, ExternalLink, Sparkles 
} from 'lucide-react';

// Helper function to resolve Google Drive file links and Google Photos CDN URLs to direct image source
const formatImageUrl = (url) => {
  if (!url) return '';
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^\/]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}=s1600`;
  }
  return url;
};

export default function Events() {
  const { events } = usePortfolioData();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.max(1, Math.ceil(events.length / ITEMS_PER_PAGE));
  const paginatedEvents = events.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Auto-play Slideshow Timer (every 3.5 seconds)
  useEffect(() => {
    let timer;
    if (selectedEvent && isPlaying && !lightboxImage) {
      const gallery = (selectedEvent.gallery || [selectedEvent.image]).map(formatImageUrl);
      timer = setInterval(() => {
        setActiveSlideIndex((prev) => (prev + 1) % gallery.length);
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [selectedEvent, isPlaying, lightboxImage]);

  // Keyboard shortcut ESC to close modal or lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null);
          setZoomLevel(1);
        } else if (selectedEvent) {
          setSelectedEvent(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEvent, lightboxImage]);

  const handleOpenEvent = (ev) => {
    setSelectedEvent(ev);
    setActiveSlideIndex(0);
    setIsPlaying(true);
  };

  const rawGallery = selectedEvent ? (selectedEvent.gallery || [selectedEvent.image]) : [];
  const currentGallery = rawGallery.map(formatImageUrl);

  return (
    <section id="events" style={{ padding: '6rem 0', position: 'relative', width: '100%' }}>
      <div className="site-container">
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
          <span className="page-number-tag">[ 05 / EVENTS & ACTIVITIES ]</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>HOẠT ĐỘNG & SỰ KIỆN NGHỆ THUẬT - XÃ HỘI</span>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            EVENTS & ENGAGEMENT
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            Tổng hợp các hoạt động phong trào, hội thao, workshop và sự kiện kết nối cộng đồng.
          </p>
        </div>

        {/* Events Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {paginatedEvents.map((ev) => (
            <div 
              key={ev.id} 
              className="editorial-box" 
              onClick={() => handleOpenEvent(ev)}
              style={{ 
                padding: '2rem', 
                display: 'flex', 
                flexDirection: 'column', 
                justify: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--surface-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                {/* Event Badge & Date Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-display)',
                    color: 'var(--accent-gold)',
                    background: 'rgba(255,183,3,0.12)',
                    border: '1px solid rgba(255,183,3,0.35)',
                    padding: '0.25rem 0.75rem',
                    letterSpacing: '0.08em',
                    fontWeight: 600
                  }}>
                    ★ {ev.badge}
                  </span>
                  
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={13} /> {ev.date}
                  </span>
                </div>

                <h3 className="font-display" style={{ fontSize: '1.35rem', color: '#fff', letterSpacing: '0.04em', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                  {ev.title}
                </h3>

                <p style={{ color: 'var(--accent-cyan)', fontSize: '0.88rem', fontFamily: 'var(--font-heading)', marginBottom: '1.25rem', fontWeight: 500 }}>
                  {ev.role}
                </p>

                {/* Event Banner Image with Hover Prompt */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden', border: '1px solid var(--surface-border)', marginBottom: '1.25rem' }}>
                  <img 
                    src={formatImageUrl(ev.image)} 
                    alt={ev.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} 
                  />
                  
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,11,14,0.85) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '0.85rem 1rem'
                  }}>
                    <span style={{ color: 'var(--accent-cyan)', fontSize: '0.78rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                      <Maximize2 size={13} /> XEM CHI TIẾT & SLIDE ẢNH ({(ev.gallery || [ev.image]).length} ÁNH)
                    </span>
                  </div>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {ev.description}
                </p>
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-dim)', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={14} color="var(--accent-cyan)" /> {ev.location}
                </span>
                
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {ev.driveUrl && (
                    <a 
                      href={ev.driveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontFamily: 'var(--font-heading)', textDecoration: 'none', fontWeight: 600 }}
                    >
                      📂 DRIVE ↗
                    </a>
                  )}
                  <span style={{ color: '#fff', fontSize: '0.78rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>
                    XEM SLIDE ↗
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* --- EDITORIAL PAGINATION CONTROLS FOR EVENTS --- */}
        {totalPages > 1 && (
          <div style={{ 
            display: 'flex', 
            justify: 'space-between', 
            alignItems: 'center', 
            marginTop: '2.5rem', 
            paddingTop: '1.5rem', 
            borderTop: '1px solid var(--surface-border)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', fontFamily: 'var(--font-heading)' }}>
              [ TRANG {currentPage} / {totalPages} — HIỂN THỊ {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, events.length)} TRONG {events.length} SỰ KIỆN ]
            </span>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                style={{
                  background: currentPage === 1 ? 'rgba(255,255,255,0.02)' : 'rgba(0,240,255,0.08)',
                  border: '1px solid var(--surface-border-strong)',
                  color: currentPage === 1 ? 'var(--text-dim)' : '#fff',
                  padding: '0.4rem 0.85rem',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <ChevronLeft size={16} /> TRƯỚC
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  style={{
                    background: currentPage === pg ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.04)',
                    border: currentPage === pg ? '1px solid var(--accent-cyan)' : '1px solid var(--surface-border)',
                    color: currentPage === pg ? '#000' : '#fff',
                    fontWeight: currentPage === pg ? 700 : 500,
                    width: '34px',
                    height: '34px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {pg}
                </button>
              ))}

              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                style={{
                  background: currentPage === totalPages ? 'rgba(255,255,255,0.02)' : 'rgba(0,240,255,0.08)',
                  border: '1px solid var(--surface-border-strong)',
                  color: currentPage === totalPages ? 'var(--text-dim)' : '#fff',
                  padding: '0.4rem 0.85rem',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'all 0.2s ease'
                }}
              >
                SAU <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* --- FULL SCREEN EVENT DETAILS MODAL --- */}
      {selectedEvent && (
        <div 
          onClick={() => setSelectedEvent(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(4, 5, 8, 0.98)',
            backdropFilter: 'blur(24px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            padding: '1.25rem'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="editorial-box" 
            style={{ 
              maxWidth: '1440px', 
              width: '96vw', 
              height: '92vh', 
              overflow: 'hidden', 
              background: '#0a0b0e', 
              padding: '0', 
              position: 'relative',
              margin: 'auto',
              border: '1px solid var(--surface-border-strong)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.98)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            
            {/* STICKY TOP HEADER BAR */}
            <div style={{ 
              background: '#0f1117', 
              borderBottom: '1px solid var(--surface-border-strong)', 
              padding: '1rem 1.75rem', 
              display: 'flex', 
              justify: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              zIndex: 20
            }}>
              <div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                  <span className="page-number-tag" style={{ border: 'none', padding: 0 }}>
                    [ EVENT SPECIFICATION // {selectedEvent.date} ]
                  </span>
                  
                  <span style={{ 
                    background: 'rgba(255, 183, 3, 0.18)',
                    color: '#ffb703',
                    border: '1px solid #ffb703',
                    padding: '0.15rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em'
                  }}>
                    ★ {selectedEvent.badge.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-display" style={{ fontSize: 'clamp(1.3rem, 2.3vw, 1.8rem)', color: '#fff', lineHeight: 1.25, margin: 0 }}>
                  {selectedEvent.title}
                </h3>
              </div>

              {/* Top Action Buttons (Drive Link & Close) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {selectedEvent.driveUrl && (
                  <a 
                    href={selectedEvent.driveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-editorial btn-accent" 
                    style={{ textDecoration: 'none', padding: '0.5rem 1.1rem', fontSize: '0.8rem' }}
                  >
                    <ExternalLink size={15} /> GOOGLE DRIVE (FULL ALBUM)
                  </a>
                )}

                <button 
                  onClick={() => setSelectedEvent(null)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid var(--surface-border-strong)',
                    color: '#fff',
                    padding: '0.5rem 1.1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#00f0ff';
                    e.currentTarget.style.color = '#000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#fff';
                  }}
                >
                  <X size={18} /> ĐÓNG [ESC]
                </button>
              </div>
            </div>

            {/* MAIN SCROLLABLE BODY */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem 2rem 2.5rem' }}>
              
              {/* 2-COLUMN LAYOUT: SLIDESHOW + DETAILS */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', 
                gap: '2rem', 
                alignItems: 'start',
                marginBottom: '2.5rem'
              }}>
                
                {/* LEFT COLUMN: AUTO-PLAY SLIDESHOW & THUMBNAILS */}
                <div>
                  
                  {/* Main Slide Container */}
                  <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '380px', 
                    overflow: 'hidden', 
                    border: '1px solid var(--surface-border-strong)',
                    background: '#040508'
                  }}>
                    
                    <img 
                      src={currentGallery[activeSlideIndex]} 
                      alt={`Slide ${activeSlideIndex + 1}`}
                      onClick={() => setLightboxImage(currentGallery[activeSlideIndex])}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        cursor: 'zoom-in',
                        transition: 'all 0.5s ease'
                      }} 
                    />

                    {/* Zoom Hint Badge */}
                    <div 
                      onClick={() => setLightboxImage(currentGallery[activeSlideIndex])}
                      style={{
                        position: 'absolute',
                        top: '0.85rem',
                        left: '0.85rem',
                        background: 'rgba(5, 6, 10, 0.85)',
                        backdropFilter: 'blur(8px)',
                        color: 'var(--accent-cyan)',
                        border: '1px solid rgba(0, 240, 255, 0.3)',
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-heading)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        zIndex: 5
                      }}
                    >
                      <ZoomIn size={14} /> CLOCK ĐỂ PHÓNG TO ẢNH
                    </div>

                    {/* Auto-play & Progress Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '0.85rem',
                      right: '0.85rem',
                      background: 'rgba(5, 6, 10, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#fff',
                      border: '1px solid var(--surface-border-strong)',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-heading)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      zIndex: 5
                    }}>
                      <span>[ {activeSlideIndex + 1} / {currentGallery.length} ]</span>
                      
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: isPlaying ? 'var(--accent-cyan)' : 'var(--text-dim)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: 0
                        }}
                        title={isPlaying ? "Tạm dừng Slide" : "Tự động chạy Slide"}
                      >
                        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                      </button>
                    </div>

                    {/* Navigation Arrows */}
                    <button 
                      onClick={() => setActiveSlideIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length)}
                      style={{
                        position: 'absolute',
                        left: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(10, 11, 15, 0.8)',
                        border: '1px solid var(--surface-border-strong)',
                        color: '#fff',
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 5,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#00f0ff'; e.currentTarget.style.color = '#000'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(10, 11, 15, 0.8)'; e.currentTarget.style.color = '#fff'; }}
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button 
                      onClick={() => setActiveSlideIndex((prev) => (prev + 1) % currentGallery.length)}
                      style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(10, 11, 15, 0.8)',
                        border: '1px solid var(--surface-border-strong)',
                        color: '#fff',
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 5,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#00f0ff'; e.currentTarget.style.color = '#000'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(10, 11, 15, 0.8)'; e.currentTarget.style.color = '#fff'; }}
                    >
                      <ChevronRight size={20} />
                    </button>

                  </div>

                  {/* Thumbnail Strip Underneath */}
                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.75rem', overflowX: 'auto', paddingBottom: '0.35rem' }}>
                    {currentGallery.map((imgUrl, gIdx) => (
                      <div 
                        key={gIdx}
                        onClick={() => {
                          setActiveSlideIndex(gIdx);
                          setIsPlaying(false);
                        }}
                        style={{
                          width: '80px',
                          height: '56px',
                          flexShrink: 0,
                          overflow: 'hidden',
                          border: activeSlideIndex === gIdx ? '2px solid var(--accent-cyan)' : '1px solid var(--surface-border)',
                          opacity: activeSlideIndex === gIdx ? 1 : 0.5,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <img src={imgUrl} alt={`Thumb ${gIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>

                  {/* Google Drive Direct Folder Action Button */}
                  {selectedEvent.driveUrl && (
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <a 
                        href={selectedEvent.driveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-editorial btn-accent"
                        style={{ textDecoration: 'none', padding: '0.75rem 1.25rem', fontSize: '0.85rem', width: '100%', justifyContent: 'center' }}
                      >
                        <ExternalLink size={16} /> MỞ THƯ MỤC GOOGLE DRIVE SỰ KIỆN (FULL HD)
                      </a>

                      {selectedEvent.driveUrlExtra && (
                        <a 
                          href={selectedEvent.driveUrlExtra} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn-editorial"
                          style={{ textDecoration: 'none', padding: '0.65rem 1.25rem', fontSize: '0.82rem', width: '100%', justifyContent: 'center' }}
                        >
                          <ExternalLink size={15} /> XEM ALBUM TỔNG HỢP K24 (GOOGLE DRIVE)
                        </a>
                      )}
                    </div>
                  )}

                </div>

                {/* RIGHT COLUMN: EVENT INFORMATION & HIGHLIGHTS */}
                <div>
                  
                  {/* Event Title & Sub Header */}
                  <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: '#fff', lineHeight: 1.25, marginBottom: '0.5rem' }}>
                    {selectedEvent.title}
                  </h2>

                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem', fontSize: '0.88rem', color: 'var(--accent-cyan)' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>● Vai trò: {selectedEvent.role}</span>
                    <span style={{ color: 'var(--text-dim)' }}>|</span>
                    <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={15} color="var(--accent-cyan)" /> {selectedEvent.location}
                    </span>
                  </div>

                  {/* Detailed Description */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.65rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.35rem' }}>
                      📝 MÔ TẢ & BỐI CẢNH SỰ KIỆN
                    </h4>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.92rem' }}>
                      {selectedEvent.description}
                    </p>
                  </div>

                  {/* Key Highlights / Achievements */}
                  {selectedEvent.highlights && (
                    <div>
                      <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Sparkles size={16} color="var(--accent-gold)" /> ĐIỂM NỔI BẬT & THÀNH TỰU ĐẠT ĐƯỢC
                      </h4>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        {selectedEvent.highlights.map((hl, hIdx) => (
                          <div key={hIdx} style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderLeft: '3px solid var(--accent-gold)', fontSize: '0.88rem', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>★</span>
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* --- BOTTOM SECTION: CÁC SỰ KIỆN KHÁC (OTHER EVENTS CAROUSEL) --- */}
              <div style={{ borderTop: '1px solid var(--surface-border-strong)', paddingTop: '2rem', marginTop: '1rem' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Award size={18} color="var(--accent-cyan)" /> CÁC SỰ KIỆN KHÁC
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Bấm vào sự kiện bên dưới để chuyển xem chi tiết</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {events.filter(e => e.id !== selectedEvent.id).map((otherEv) => (
                    <div 
                      key={otherEv.id}
                      onClick={() => handleOpenEvent(otherEv)}
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--surface-border)',
                        padding: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                        e.currentTarget.style.background = 'rgba(0,240,255,0.04)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--surface-border)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      }}
                    >
                      <div style={{ width: '80px', height: '60px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--surface-border)' }}>
                        <img src={otherEv.image} alt={otherEv.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 600 }}>★ {otherEv.badge}</div>
                        <h5 style={{ fontSize: '0.88rem', color: '#fff', fontFamily: 'var(--font-heading)', margin: '0.2rem 0', lineHeight: 1.3 }}>{otherEv.title}</h5>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{otherEv.date}</div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* --- FULLSCREEN INTERACTIVE LIGHTBOX (ZOOMABLE MODAL) --- */}
      {lightboxImage && (
        <div 
          onClick={() => {
            setLightboxImage(null);
            setZoomLevel(1);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.96)',
            backdropFilter: 'blur(20px)',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            padding: '1.5rem'
          }}
        >
          {/* Lightbox Toolbar */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'rgba(15, 17, 23, 0.9)',
              border: '1px solid var(--surface-border-strong)',
              padding: '0.5rem 1.25rem',
              borderRadius: '40px',
              zIndex: 10001
            }}
          >
            <button 
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.3, 3))}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}
              title="Phóng to (+)"
            >
              <ZoomIn size={18} /> Zoom In
            </button>

            <button 
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.3, 0.6))}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}
              title="Thu nhỏ (-)"
            >
              <ZoomOut size={18} /> Zoom Out
            </button>

            <button 
              onClick={() => setZoomLevel(1)}
              style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}
              title="Đặt lại kích thước chuẩn"
            >
              <RotateCcw size={16} /> Reset ({Math.round(zoomLevel * 100)}%)
            </button>

            <div style={{ width: '1px', height: '16px', background: 'var(--surface-border)' }} />

            <button 
              onClick={() => {
                setLightboxImage(null);
                setZoomLevel(1);
              }}
              style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 600 }}
            >
              <X size={18} /> ĐÓNG
            </button>
          </div>

          {/* Zoomable Image Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '82vh',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              overflow: 'hidden'
            }}
          >
            <img 
              src={lightboxImage} 
              alt="Fullscreen Zoom"
              style={{
                maxWidth: '100%',
                maxHeight: '82vh',
                objectFit: 'contain',
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.2s ease',
                cursor: zoomLevel > 1 ? 'grab' : 'zoom-in'
              }}
              onClick={() => setZoomLevel(prev => (prev >= 2 ? 1 : prev + 0.5))}
            />
          </div>

          {/* Bottom Hint */}
          <div style={{ position: 'absolute', bottom: '1.5rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
            Click trực tiếp vào ảnh để phóng to/thu nhỏ nhanh • Bấm ESC hoặc ĐÓNG để thoát
          </div>

        </div>
      )}

    </section>
  );
}

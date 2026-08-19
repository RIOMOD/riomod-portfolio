import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { ExternalLink, Eye, Layers, Tag, X, Sparkles, Code, Film, Cpu, CheckCircle2, Clock, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  const { projects, projectDomains } = portfolioData;
  const [activeDomain, setActiveDomain] = useState('all'); // 'all', 'code', 'media', 'support'
  const [activeStatus, setActiveStatus] = useState('all'); // 'all', 'Đã hoàn thành', 'Đang phát triển'
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 3;

  // Filter projects by Domain and Status
  const filteredProjects = projects.filter((p) => {
    const matchDomain = activeDomain === 'all' || p.domain === activeDomain;
    const matchStatus = activeStatus === 'all' || p.status === activeStatus;
    return matchDomain && matchStatus;
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDomainChange = (domainId) => {
    setActiveDomain(domainId);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    setCurrentPage(1);
  };

  const getDomainIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code size={20} color="var(--accent-cyan)" />;
      case 'Film': return <Film size={20} color="var(--accent-purple)" />;
      case 'Cpu': return <Cpu size={20} color="var(--accent-gold)" />;
      default: return <Layers size={20} color="var(--accent-cyan)" />;
    }
  };

  return (
    <section id="projects" style={{ padding: '6rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
          <span className="page-number-tag">[ 04 / MULTI-DOMAIN PROJECTS ]</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>DANH MỤC DỰ ÁN DỰA THEO MẢNG CHUYÊN MÔN</span>
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            PROJECT PORTFOLIO
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            Khám phá các sản phẩm theo từng mảng chuyên môn: Code, Media & Creative Design, và Nghiên cứu Hệ thống.
          </p>
        </div>

        {/* --- MAIN DOMAIN SELECTION CARDS --- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          
          {/* Option All Domains */}
          <div 
            className="editorial-box"
            onClick={() => setActiveDomain('all')}
            style={{
              padding: '1.5rem',
              cursor: 'pointer',
              borderColor: activeDomain === 'all' ? 'var(--accent-cyan)' : 'var(--surface-border)',
              background: activeDomain === 'all' ? 'rgba(0,240,255,0.06)' : 'rgba(18,20,26,0.6)',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: activeDomain === 'all' ? 'var(--accent-cyan)' : '#fff', fontWeight: 600 }}>
                <Layers size={20} color={activeDomain === 'all' ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                <span>TẤT CẢ DỰ ÁN</span>
              </div>
              <span className="font-display" style={{ fontSize: '1.2rem', color: 'var(--text-dim)' }}>
                {projects.length}
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Tổng hợp toàn bộ dự án Code, Media và Nghiên cứu.
            </p>
          </div>

          {/* Individual Domain Cards */}
          {projectDomains.map((dom) => {
            const isSelected = activeDomain === dom.id;
            const domCount = projects.filter(p => p.domain === dom.id).length;
            
            return (
              <div 
                key={dom.id}
                className="editorial-box"
                onClick={() => setActiveDomain(dom.id)}
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--surface-border)',
                  background: isSelected ? 'rgba(0,240,255,0.06)' : 'rgba(18,20,26,0.6)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isSelected ? 'var(--accent-cyan)' : '#fff', fontWeight: 600, fontSize: '0.95rem' }}>
                    {getDomainIcon(dom.icon)}
                    <span>{dom.name}</span>
                  </div>
                  <span className="font-display" style={{ fontSize: '1.2rem', color: 'var(--accent-cyan)' }}>
                    {domCount}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {dom.description}
                </p>
              </div>
            );
          })}

        </div>

        {/* --- SUB-FILTER STATUS BAR (Đã hoàn thành / Đang phát triển) --- */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem', background: 'rgba(255,255,255,0.02)', padding: '1rem 1.5rem', border: '1px solid var(--surface-border)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
            <Tag size={15} color="var(--accent-cyan)" /> LỌC THEO TRẠNG THÁI PHÁT TRIỂN:
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              className={`filter-btn ${activeStatus === 'all' ? 'active' : ''}`}
              onClick={() => setActiveStatus('all')}
            >
              Tất cả trạng thái
            </button>
            <button
              className={`filter-btn ${activeStatus === 'Đã hoàn thành' ? 'active' : ''}`}
              onClick={() => setActiveStatus('Đã hoàn thành')}
            >
              ✓ Đã Hoàn Thành ({projects.filter(p => (activeDomain === 'all' || p.domain === activeDomain) && p.status === 'Đã hoàn thành').length})
            </button>
            <button
              className={`filter-btn ${activeStatus === 'Đang phát triển' ? 'active' : ''}`}
              onClick={() => setActiveStatus('Đang phát triển')}
            >
              🚀 Đang Phát Triển ({projects.filter(p => (activeDomain === 'all' || p.domain === activeDomain) && p.status === 'Đang phát triển').length})
            </button>
          </div>

        </div>

        {/* --- PROJECTS GRID DISPLAY --- */}
        {filteredProjects.length === 0 ? (
          <div className="editorial-box" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              Không tìm thấy dự án nào khớp với bộ lọc hiện tại.
            </p>
            <button 
              className="btn-editorial btn-accent" 
              onClick={() => { setActiveDomain('all'); setActiveStatus('all'); setCurrentPage(1); }} 
              style={{ marginTop: '1rem' }}
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {paginatedProjects.map((project) => {
              const isFeatured = project.featured;

              return (
                <div 
                  key={project.id} 
                  className="editorial-box tilt-card"
                  style={{
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    borderColor: isFeatured ? 'var(--surface-border-strong)' : 'var(--surface-border)',
                    background: isFeatured ? 'rgba(12, 14, 20, 0.9)' : 'rgba(9, 10, 13, 0.7)'
                  }}
                >
                  
                  <div>
                    {/* Domain & Status Header Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span className="page-number-tag" style={{ border: 'none', padding: 0 }}>
                        [ {project.domainName.toUpperCase()} // {project.year} ]
                      </span>

                      <span style={{ 
                        background: project.status === 'Đã hoàn thành' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0, 240, 255, 0.15)',
                        color: project.status === 'Đã hoàn thành' ? '#10b981' : '#00f0ff',
                        border: project.status === 'Đã hoàn thành' ? '1px solid #10b981' : '1px solid #00f0ff',
                        padding: '0.15rem 0.6rem',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        letterSpacing: '0.05em'
                      }}>
                        ● {project.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Image Banner */}
                    <div 
                      onClick={() => setSelectedProject(project)}
                      style={{ position: 'relative', height: '200px', overflow: 'hidden', border: '1px solid var(--surface-border)', marginBottom: '1.25rem', cursor: 'pointer' }}
                    >
                      <img 
                        src={project.image} 
                        alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
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
                          <Eye size={14} /> CLOCK ĐỂ XEM CHI TIẾT DỰ ÁN ↗
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display" style={{ fontSize: '1.4rem', color: '#fff', letterSpacing: '0.04em', marginBottom: '0.35rem', lineHeight: 1.3 }}>
                      {project.title}
                    </h3>

                    <p style={{ color: 'var(--accent-cyan)', fontSize: '0.88rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
                      {project.subtitle}
                    </p>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                      {project.tags.map((t, idx) => (
                        <span key={idx} style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)', border: '1px solid var(--surface-border)', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                        {project.category}
                      </span>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="btn-editorial"
                          style={{ padding: '0.5rem 0.85rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                        >
                          <Eye size={14} /> Chi tiết
                        </button>

                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-editorial"
                            style={{ padding: '0.5rem 0.75rem', textDecoration: 'none' }}
                            title="Mã nguồn GitHub"
                          >
                            <GithubIcon size={16} />
                          </a>
                        )}

                        {project.liveUrl ? (
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-editorial btn-accent"
                            style={{ padding: '0.5rem 0.75rem', textDecoration: 'none' }}
                            title="Xem Demo / Media"
                          >
                            <ExternalLink size={16} />
                          </a>
                        ) : (
                          <span 
                            className="btn-editorial" 
                            style={{ padding: '0.5rem 0.65rem', opacity: 0.5, cursor: 'default', fontSize: '0.75rem' }}
                            title="Demo Sắp Ra Mắt"
                          >
                            Sắp ra mắt
                          </span>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* --- FULL SCREEN PROJECT SPECIFICATION MODAL --- */}
        {selectedProject && (
          <div 
            onClick={() => setSelectedProject(null)}
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
              padding: '0.75rem'
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
                      [ {selectedProject.domainName.toUpperCase()} // {selectedProject.year} ]
                    </span>
                    
                    <span style={{ 
                      background: selectedProject.status === 'Đã hoàn thành' ? 'rgba(16, 185, 129, 0.18)' : 'rgba(0, 240, 255, 0.18)',
                      color: selectedProject.status === 'Đã hoàn thành' ? '#10b981' : '#00f0ff',
                      border: selectedProject.status === 'Đã hoàn thành' ? '1px solid #10b981' : '1px solid #00f0ff',
                      padding: '0.15rem 0.65rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em'
                    }}>
                      ● TRẠNG THÁI: {selectedProject.status.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-display" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', color: '#fff', lineHeight: 1.25, margin: 0 }}>
                    {selectedProject.title} — <span style={{ color: 'var(--accent-cyan)', fontSize: '0.9em', fontFamily: 'var(--font-heading)' }}>{selectedProject.subtitle}</span>
                  </h3>
                </div>

                {/* Top Actions & Close Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {selectedProject.liveUrl ? (
                    <a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-editorial btn-accent" 
                      style={{ textDecoration: 'none', padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
                    >
                      <ExternalLink size={15} /> XEM DEMO / MEDIA
                    </a>
                  ) : (
                    <span 
                      className="btn-editorial" 
                      style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem', opacity: 0.7, cursor: 'default', color: 'var(--text-muted)' }}
                    >
                      ● DEMO SẮP RA MẮT
                    </span>
                  )}
                  
                  {selectedProject.githubUrl && (
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-editorial" 
                      style={{ textDecoration: 'none', padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
                    >
                      <GithubIcon size={15} /> CODE GITHUB
                    </a>
                  )}

                  <button 
                    onClick={() => setSelectedProject(null)}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid var(--surface-border-strong)',
                      color: '#fff',
                      padding: '0.5rem 1rem',
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

              {/* MAIN CONTENT BODY: 2-COLUMN BALANCED LAYOUT (NO EMPTY SIDE GAPS) */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem 2.5rem' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'minmax(300px, 380px) 1fr', 
                  gap: '2.25rem', 
                  alignItems: 'start' 
                }} className="modal-grid-layout">
                  
                  {/* LEFT COLUMN: IMAGE BANNER, METADATA, TECH STACK & ACTION BUTTONS */}
                  <div style={{ background: 'rgba(255,255,255,0.015)', padding: '1.25rem', border: '1px solid var(--surface-border)', borderRadius: '4px' }}>
                    
                    {/* Project Banner Image */}
                    <div style={{ position: 'relative', width: '100%', height: '230px', overflow: 'hidden', border: '1px solid var(--surface-border-strong)', marginBottom: '1.25rem' }}>
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>

                    {/* Metadata Box */}
                    <div style={{ background: 'rgba(9,10,13,0.6)', padding: '1rem', borderLeft: '3px solid var(--accent-cyan)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                      <div style={{ marginBottom: '0.35rem' }}>● Phân loại: <strong style={{ color: '#fff' }}>{selectedProject.domainName}</strong> ({selectedProject.category})</div>
                      <div>● Thời gian thực hiện: <strong style={{ color: '#fff' }}>{selectedProject.year}</strong></div>
                    </div>

                    {/* Tech Stack Grid */}
                    <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.35rem' }}>
                      ⚡ CÔNG NGHỆ & THƯ VIỆN SỬ DỤNG
                    </h4>
                    
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
                      {selectedProject.tags.map((t, idx) => (
                        <span key={idx} style={{ background: 'rgba(0,240,255,0.08)', color: 'var(--accent-cyan)', border: '1px solid rgba(0,240,255,0.3)', padding: '0.35rem 0.75rem', fontSize: '0.82rem', fontWeight: 500 }}>
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Quick Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {selectedProject.liveUrl ? (
                        <a 
                          href={selectedProject.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn-editorial btn-accent" 
                          style={{ textDecoration: 'none', padding: '0.75rem 1.25rem', fontSize: '0.85rem', justifyContent: 'center' }}
                        >
                          <ExternalLink size={16} /> TRUY CẬP XEM DEMO / MEDIA
                        </a>
                      ) : (
                        <span 
                          className="btn-editorial" 
                          style={{ padding: '0.75rem 1.25rem', fontSize: '0.85rem', justifyContent: 'center', opacity: 0.7, cursor: 'default', color: 'var(--text-muted)' }}
                        >
                          ● DEMO SẮP RA MẮT
                        </span>
                      )}
                      
                      {selectedProject.githubUrl && (
                        <a 
                          href={selectedProject.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn-editorial" 
                          style={{ textDecoration: 'none', padding: '0.75rem 1.25rem', fontSize: '0.85rem', justifyContent: 'center' }}
                        >
                          <GithubIcon size={16} /> XEM CODE GITHUB
                        </a>
                      )}
                    </div>

                  </div>

                  {/* RIGHT COLUMN: FULL DETAILED SPECIFICATION & ARCHITECTURE */}
                  <div>
                    
                    {/* Section 1: Ý NGHĨA DỰ ÁN */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.65rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Sparkles size={18} color="var(--accent-gold)" /> 1. 🎯 Ý NGHĨA DỰ ÁN
                      </h4>
                      
                      <ul style={{ color: 'var(--text-muted)', lineHeight: 1.65, fontSize: '0.9rem', paddingLeft: '1.25rem', margin: 0 }}>
                        {selectedProject.significance ? (
                          selectedProject.significance.map((sig, sIdx) => (
                            <li key={sIdx} style={{ marginBottom: '0.45rem' }}>{sig}</li>
                          ))
                        ) : (
                          <li>{selectedProject.description}</li>
                        )}
                      </ul>
                    </div>

                    {/* Section 2: MÔ TẢ HOẠT ĐỘNG & KIẾN TRÚC HỆ THỐNG */}
                    {selectedProject.architecture && (
                      <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.65rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Cpu size={18} color="var(--accent-cyan)" /> 2. ⚙️ MÔ TẢ HOẠT ĐỘNG & KIẾN TRÚC HỆ THỐNG
                        </h4>
                        
                        <ul style={{ color: 'var(--text-muted)', lineHeight: 1.65, fontSize: '0.9rem', marginBottom: '1.25rem', paddingLeft: '1.25rem' }}>
                          {selectedProject.architecture.map((arch, aIdx) => (
                            <li key={aIdx} style={{ marginBottom: '0.45rem' }}>{arch}</li>
                          ))}
                        </ul>

                        {/* ASCII Architecture Flow Diagram */}
                        {selectedProject.architectureDiagram && (
                          <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', fontWeight: 600 }}>
                              ❖ SƠ ĐỒ LUỒNG KIẾN TRÚC CLIENT - SERVER & DB ADAPTER:
                            </div>
                            <pre style={{
                              fontFamily: 'Consolas, Monaco, monospace',
                              fontSize: '0.78rem',
                              color: '#67e8f9',
                              background: '#050609',
                              padding: '1.25rem 1.5rem',
                              border: '1px solid rgba(0, 240, 255, 0.3)',
                              borderRadius: '4px',
                              overflowX: 'auto',
                              lineHeight: 1.45,
                              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
                            }}>
                              {selectedProject.architectureDiagram}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Section 3: DANH SÁCH CHỨC NĂNG & NHIỆM VỤ CHÍNH */}
                    {selectedProject.features && (
                      <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.85rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <CheckCircle2 size={18} color="var(--accent-cyan)" /> 3. 📋 DANH SÁCH CHỨC NĂNG & NHIỆM VỤ CHÍNH
                        </h4>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                          {selectedProject.features.map((featGroup, fIdx) => (
                            <div key={fIdx} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderLeft: '3px solid var(--accent-cyan)', border: '1px solid var(--surface-border)' }}>
                              <h5 style={{ fontSize: '0.88rem', color: '#fff', fontFamily: 'var(--font-heading)', marginBottom: '0.4rem' }}>
                                {featGroup.group}
                              </h5>
                              <ul style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: 1.55, paddingLeft: '1.1rem', margin: 0 }}>
                                {featGroup.items.map((it, itIdx) => (
                                  <li key={itIdx} style={{ marginBottom: '0.25rem' }}>{it}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Section 4: CẤU TRÚC THƯ MỤC & COMPONENT */}
                    {selectedProject.directoryTree && (
                      <div>
                        <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.65rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Code size={18} color="var(--accent-purple)" /> 4. 📂 CẤU TRÚC THƯ MỤC & COMPONENT
                        </h4>

                        <pre style={{
                          fontFamily: 'Consolas, Monaco, monospace',
                          fontSize: '0.78rem',
                          color: '#cbd5e1',
                          background: '#06070a',
                          padding: '1.25rem 1.5rem',
                          border: '1px solid var(--surface-border-strong)',
                          borderRadius: '4px',
                          overflowX: 'auto',
                          lineHeight: 1.45
                        }}>
                          {selectedProject.directoryTree}
                        </pre>
                      </div>
                    )}

                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

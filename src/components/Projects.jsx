import React, { useState } from 'react';
import { usePortfolioData } from '../context/DataContext';
import { ExternalLink, Eye, Layers, Tag, X, Sparkles, Code, Film, Cpu, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  const { projects, projectDomains } = usePortfolioData();
  const [activeDomain, setActiveDomain] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 3;

  // Filter projects by Domain and Status
  const filteredProjects = projects.filter((p) => {
    const matchDomain = activeDomain === 'all' || p.domain === activeDomain;
    const matchStatus = activeStatus === 'all' || p.status === activeStatus;
    return matchDomain && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
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
      case 'Code': return <Code size={18} color="var(--accent-cyan)" />;
      case 'Film': return <Film size={18} color="var(--accent-purple)" />;
      case 'Cpu': return <Cpu size={18} color="var(--accent-gold)" />;
      default: return <Layers size={18} color="var(--accent-cyan)" />;
    }
  };

  return (
    <section id="projects" style={{ padding: '6rem 0', position: 'relative', width: '100%' }}>
      <div className="site-container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span className="page-number-tag">[ 04 / MULTI-DOMAIN PROJECTS ]</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>DANH MỤC DỰ ÁN DỰA THEO MẢNG CHUYÊN MÔN</span>
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            PROJECT PORTFOLIO
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            Khám phá các sản phẩm theo từng mảng chuyên môn: Code & Software, Media & Design, và Tư Vấn Kỹ Thuật.
          </p>
        </div>

        {/* --- MAIN DOMAIN SELECTION CARDS --- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          
          {/* Option All Domains */}
          <div 
            className="editorial-box"
            onClick={() => handleDomainChange('all')}
            style={{
              padding: '1.25rem',
              cursor: 'pointer',
              borderColor: activeDomain === 'all' ? 'var(--accent-cyan)' : 'var(--surface-border)',
              background: activeDomain === 'all' ? 'rgba(0,240,255,0.08)' : 'rgba(18,20,26,0.6)',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: activeDomain === 'all' ? 'var(--accent-cyan)' : '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                <Layers size={18} color={activeDomain === 'all' ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                <span>TẤT CẢ DỰ ÁN</span>
              </div>
              <span className="font-display" style={{ fontSize: '1.15rem', color: 'var(--text-dim)' }}>
                {projects.length}
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Tổng hợp toàn bộ dự án Code, Media và Kỹ thuật.
            </p>
          </div>

          {/* Individual Domain Cards */}
          {(projectDomains || [
            { id: 'code', name: 'Dự Án Code & Software', icon: 'Code', description: 'Các ứng dụng Web App, quản lý sự kiện và hệ thống.' },
            { id: 'media', name: 'Dự Án Media & Design', icon: 'Film', description: 'Sản xuất Video, Poster Canva/Photoshop.' },
            { id: 'support', name: 'Kỹ Thuật & Tư Vấn Sales', icon: 'Cpu', description: 'Sửa chữa, lắp ráp PC & tư vấn giải pháp.' }
          ]).map((dom) => {
            const isSelected = activeDomain === dom.id;
            const domCount = projects.filter((p) => p.domain === dom.id).length;
            
            return (
              <div 
                key={dom.id}
                className="editorial-box"
                onClick={() => handleDomainChange(dom.id)}
                style={{
                  padding: '1.25rem',
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--surface-border)',
                  background: isSelected ? 'rgba(0,240,255,0.08)' : 'rgba(18,20,26,0.6)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isSelected ? 'var(--accent-cyan)' : '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                    {getDomainIcon(dom.icon)}
                    <span>{dom.name}</span>
                  </div>
                  <span className="font-display" style={{ fontSize: '1.15rem', color: 'var(--accent-cyan)' }}>
                    {domCount}
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {dom.description}
                </p>
              </div>
            );
          })}

        </div>

        {/* --- SUB-FILTER STATUS BAR --- */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem', background: 'rgba(255,255,255,0.02)', padding: '0.85rem 1.25rem', border: '1px solid var(--surface-border)', borderRadius: '4px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
            <Tag size={14} color="var(--accent-cyan)" /> LỌC THEO TRẠNG THÁI:
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              className={`filter-btn ${activeStatus === 'all' ? 'active' : ''}`}
              onClick={() => handleStatusChange('all')}
            >
              Tất cả ({projects.filter(p => activeDomain === 'all' || p.domain === activeDomain).length})
            </button>
            <button
              className={`filter-btn ${activeStatus === 'Đã hoàn thành' ? 'active' : ''}`}
              onClick={() => handleStatusChange('Đã hoàn thành')}
            >
              ✓ Đã Hoàn Thành ({projects.filter(p => (activeDomain === 'all' || p.domain === activeDomain) && p.status === 'Đã hoàn thành').length})
            </button>
            <button
              className={`filter-btn ${activeStatus === 'Đang phát triển' ? 'active' : ''}`}
              onClick={() => handleStatusChange('Đang phát triển')}
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '2rem' }}>
            {paginatedProjects.map((project) => {
              const isFeatured = project.featured;

              return (
                <div 
                  key={project.id} 
                  className="editorial-box tilt-card"
                  style={{
                    padding: 'clamp(1.25rem, 3vw, 2rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderColor: isFeatured ? 'var(--surface-border-strong)' : 'var(--surface-border)',
                    background: isFeatured ? 'rgba(14, 16, 22, 0.95)' : 'rgba(9, 10, 13, 0.8)'
                  }}
                >
                  
                  <div>
                    {/* Domain & Status Header Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span className="page-number-tag" style={{ border: 'none', padding: 0, fontSize: '0.75rem' }}>
                        [ {(project.domainName || project.domain).toUpperCase()} // {project.year} ]
                      </span>

                      <span style={{ 
                        background: project.status === 'Đã hoàn thành' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0, 240, 255, 0.15)',
                        color: project.status === 'Đã hoàn thành' ? '#10b981' : '#00f0ff',
                        border: project.status === 'Đã hoàn thành' ? '1px solid #10b981' : '1px solid #00f0ff',
                        padding: '0.15rem 0.55rem',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        borderRadius: '3px'
                      }}>
                        ● {project.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Image Banner */}
                    <div 
                      onClick={() => setSelectedProject(project)}
                      style={{ position: 'relative', height: '190px', overflow: 'hidden', border: '1px solid var(--surface-border)', marginBottom: '1.25rem', cursor: 'pointer', borderRadius: '4px' }}
                    >
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)' }}>
                          <Code size={40} color="var(--text-dim)" />
                        </div>
                      )}
                      
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(10,11,14,0.9) 0%, transparent 60%)',
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: '0.75rem 1rem'
                      }}>
                        <span style={{ color: 'var(--accent-cyan)', fontSize: '0.75rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                          <Eye size={13} /> BẤM ĐỂ XEM CHI TIẾT DỰ ÁN ↗
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display" style={{ fontSize: '1.3rem', color: '#fff', letterSpacing: '0.04em', marginBottom: '0.35rem', lineHeight: 1.3 }}>
                      {project.title}
                    </h3>

                    <p style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', marginBottom: '0.85rem', fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
                      {project.subtitle}
                    </p>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    {(project.tags && project.tags.length > 0) && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                        {project.tags.slice(0, 5).map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            style={{
                              fontSize: '0.72rem',
                              color: 'var(--text-muted)',
                              background: 'rgba(255,255,255,0.04)',
                              padding: '0.2rem 0.55rem',
                              border: '1px solid var(--surface-border)',
                              borderRadius: '3px'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.65rem', borderTop: '1px solid var(--surface-border)', paddingTop: '1rem', flexWrap: 'wrap' }}>
                    <button 
                      className="btn-editorial btn-accent" 
                      onClick={() => setSelectedProject(project)}
                      style={{ flex: 1, padding: '0.55rem', fontSize: '0.78rem', justifyContent: 'center' }}
                    >
                      <Eye size={14} /> Xem Chi Tiết
                    </button>

                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-editorial" 
                        style={{ padding: '0.55rem 0.85rem', fontSize: '0.78rem' }}
                        title="Truy cập trực tiếp"
                      >
                        <ExternalLink size={14} /> Demo
                      </a>
                    )}

                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-editorial" 
                        style={{ padding: '0.55rem 0.85rem' }}
                        title="Xem mã nguồn GitHub"
                      >
                        <GithubIcon size={14} />
                      </a>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* --- PAGINATION CONTROLS --- */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
            <button
              className="btn-editorial"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{ opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              <ChevronLeft size={16} /> Trang Trước
            </button>

            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Trang <strong style={{ color: '#fff' }}>{currentPage}</strong> / {totalPages}
            </span>

            <button
              className="btn-editorial"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{ opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
            >
              Trang Sau <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* --- FULL DETAILED MODAL SPECIFICATION --- */}
        {selectedProject && (
          <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
            <div 
              className="modal-content-card" 
              onClick={(e) => e.stopPropagation()}
              style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}
            >
              
              {/* Modal Top Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.25rem', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <span className="page-number-tag" style={{ border: 'none', padding: 0, fontSize: '0.75rem' }}>
                      [ {(selectedProject.domainName || selectedProject.domain).toUpperCase()} // {selectedProject.year} ]
                    </span>
                    <span style={{ color: 'var(--text-dim)' }}>•</span>
                    <span style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 600 }}>{selectedProject.category}</span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#fff', letterSpacing: '0.04em', lineHeight: 1.2 }}>
                    {selectedProject.title}
                  </h3>
                </div>

                <button 
                  onClick={() => setSelectedProject(null)}
                  className="btn-secondary"
                  style={{ padding: '0.5rem', borderRadius: '50%' }}
                  title="Đóng cửa sổ"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content Columns */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2rem' }}>
                
                {/* Left Col: Media & Links */}
                <div>
                  {selectedProject.image && (
                    <div style={{ border: '1px solid var(--surface-border)', marginBottom: '1.5rem', borderRadius: '4px', overflow: 'hidden' }}>
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title} 
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                      />
                    </div>
                  )}

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    {selectedProject.description}
                  </p>

                  {(selectedProject.tags && selectedProject.tags.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.75rem' }}>
                      {selectedProject.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          style={{
                            fontSize: '0.75rem',
                            color: '#fff',
                            background: 'rgba(255,255,255,0.06)',
                            padding: '0.25rem 0.65rem',
                            border: '1px solid var(--surface-border)',
                            borderRadius: '3px'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {selectedProject.liveUrl && (
                      <a 
                        href={selectedProject.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-editorial btn-accent" 
                        style={{ textDecoration: 'none', justifyContent: 'center', padding: '0.7rem' }}
                      >
                        <ExternalLink size={16} /> TRUY CẬP XEM DEMO / SẢN PHẨM
                      </a>
                    )}
                    
                    {selectedProject.githubUrl && (
                      <a 
                        href={selectedProject.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-editorial" 
                        style={{ textDecoration: 'none', justifyContent: 'center', padding: '0.7rem' }}
                      >
                        <GithubIcon size={16} /> XEM MÃ NGUỒN GITHUB
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Col: Details & Architecture */}
                <div>
                  {(selectedProject.significance && selectedProject.significance.length > 0) && (
                    <div style={{ marginBottom: '1.75rem' }}>
                      <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.65rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Sparkles size={16} color="var(--accent-gold)" /> 1. Ý NGHĨA & GIÁ TRỊ DỰ ÁN
                      </h4>
                      <ul style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.88rem', paddingLeft: '1.2rem', margin: 0 }}>
                        {selectedProject.significance.map((sig, sIdx) => (
                          <li key={sIdx} style={{ marginBottom: '0.4rem' }}>{sig}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(selectedProject.architecture && selectedProject.architecture.length > 0) && (
                    <div style={{ marginBottom: '1.75rem' }}>
                      <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.65rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Cpu size={16} color="var(--accent-cyan)" /> 2. KIẾN TRÚC & HOẠT ĐỘNG
                      </h4>
                      <ul style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.88rem', paddingLeft: '1.2rem', margin: 0 }}>
                        {selectedProject.architecture.map((arch, aIdx) => (
                          <li key={aIdx} style={{ marginBottom: '0.4rem' }}>{arch}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(selectedProject.features && selectedProject.features.length > 0) && (
                    <div>
                      <h4 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.65rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CheckCircle2 size={16} color="var(--accent-green)" /> 3. CHỨC NĂNG CHÍNH
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {selectedProject.features.map((featGroup, fIdx) => (
                          <div key={fIdx} style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderLeft: '3px solid var(--accent-cyan)', border: '1px solid var(--surface-border)', borderRadius: '0 4px 4px 0' }}>
                            <h5 style={{ fontSize: '0.85rem', color: '#fff', fontFamily: 'var(--font-heading)', marginBottom: '0.35rem' }}>
                              {featGroup.group}
                            </h5>
                            <ul style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5, paddingLeft: '1.1rem', margin: 0 }}>
                              {featGroup.items.map((it, itIdx) => (
                                <li key={itIdx} style={{ marginBottom: '0.2rem' }}>{it}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

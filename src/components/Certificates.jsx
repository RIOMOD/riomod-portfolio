import React, { useState } from 'react';
import { usePortfolioData } from '../context/DataContext';
import { Award, ShieldCheck, ExternalLink, X, FileText, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Certificates() {
  const { certificates } = usePortfolioData();
  const [selectedCert, setSelectedCert] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.max(1, Math.ceil(certificates.length / ITEMS_PER_PAGE));
  const paginatedCerts = certificates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section id="certificates" style={{ padding: '6rem 0', position: 'relative', width: '100%' }}>
      <div className="site-container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
          <span className="page-number-tag">[ 06 / CERTIFICATES & DEGREES ]</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>VĂN BẰNG & CHỨNG CHỈ ĐÀO TẠO</span>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            QUALIFICATIONS & CERTIFICATIONS
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            Hệ thống bằng cấp đại học và chứng chỉ quốc tế đã qua xác thực.
          </p>
        </div>

        {/* Certificates Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {paginatedCerts.map((cert) => (
            <div 
              key={cert.id} 
              className="editorial-box tilt-card"
              style={{
                padding: '2rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}
              onClick={() => setSelectedCert(cert)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '4px',
                    background: 'rgba(0,240,255,0.08)',
                    border: '1px solid rgba(0,240,255,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center'
                  }}>
                    <Award size={22} color="var(--accent-cyan)" />
                  </div>

                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-display)', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
                    {cert.issueDate}
                  </span>
                </div>

                <h3 className="font-display" style={{ fontSize: '1.3rem', color: '#fff', letterSpacing: '0.05em', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                  {cert.title}
                </h3>

                <p style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem', fontWeight: 500 }}>
                  {cert.issuer}
                </p>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {cert.description}
                </p>
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'monospace' }}>
                  ID: {cert.credentialId}
                </span>

                <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 500 }}>
                  Xem chứng chỉ →
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* --- EDITORIAL PAGINATION CONTROLS FOR CERTIFICATES --- */}
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
              [ TRANG {currentPage} / {totalPages} — HIỂN THỊ {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, certificates.length)} TRONG {certificates.length} CHỨNG CHỈ ]
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

        {/* Certificate Modal */}
        {selectedCert && (
          <div 
            onClick={() => setSelectedCert(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(5, 6, 10, 0.96)',
              backdropFilter: 'blur(20px)',
              zIndex: 999999,
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              padding: '1.5rem',
              overflowY: 'auto'
            }}
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="editorial-box" 
              style={{ 
                maxWidth: '750px', 
                width: '100%', 
                maxHeight: '90vh', 
                overflowY: 'auto', 
                background: '#0d0e12', 
                padding: '2.5rem', 
                position: 'relative',
                margin: 'auto',
                border: '1px solid var(--surface-border-strong)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95)'
              }}
            >
              
              <button 
                onClick={() => setSelectedCert(null)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'transparent',
                  border: '1px solid var(--surface-border)',
                  color: '#fff',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center'
                }}
              >
                <X size={20} />
              </button>

              <span className="page-number-tag" style={{ marginBottom: '1rem' }}>
                [ VERIFIED CREDENTIAL DOCUMENT ]
              </span>

              <h3 className="font-display" style={{ fontSize: '1.8rem', color: '#fff', marginTop: '0.5rem' }}>
                {selectedCert.title}
              </h3>

              <p style={{ color: 'var(--accent-cyan)', fontSize: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                Đơn vị cấp: {selectedCert.issuer} ({selectedCert.issueDate})
              </p>

              <div style={{ height: '220px', overflow: 'hidden', border: '1px solid var(--surface-border)', marginBottom: '1.5rem' }}>
                <img src={selectedCert.image} alt={selectedCert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderLeft: '3px solid var(--accent-cyan)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#fff', marginBottom: '0.25rem' }}>
                  <ShieldCheck size={16} color="var(--accent-cyan)" /> Mã xác thực (Credential ID): <strong>{selectedCert.credentialId}</strong>
                </div>
                {selectedCert.grade && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    ● {selectedCert.grade}
                  </div>
                )}
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {selectedCert.description}
              </p>

              <button className="btn-editorial btn-accent" onClick={() => setSelectedCert(null)} style={{ width: '100%', justifyContent: 'center' }}>
                Đóng Cửa Sổ Xác Thực
              </button>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

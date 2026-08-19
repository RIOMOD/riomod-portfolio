import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../context/DataContext';
import { ChevronLeft, ChevronRight, BookOpen, X, Sparkles, CheckCircle2, Award, Calendar, ExternalLink, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BrochureView({ onClose }) {
  const { profile, skills, timeline, projects, events, certificates } = usePortfolioData();
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const [isFlipping, setIsFlipping] = useState(false);

  // Spreads Definition
  const spreads = [
    // Spread 1: Cover & Table of Contents
    {
      id: 'spread-1',
      title: 'COVER & INDEX',
      left: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: 'clamp(1rem, 3vw, 2.5rem)' }}>
          <div style={{
            border: '2px solid #ffffff',
            padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2.5vw, 2rem)',
            background: 'rgba(9, 10, 13, 0.6)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
            width: '100%',
            maxWidth: '380px'
          }}>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.25em', color: 'var(--accent-cyan)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
              INTERACTIVE 3D ARCHIVE
            </span>
            
            <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.8rem)', lineHeight: 0.95, color: '#ffffff', margin: '1rem 0', textTransform: 'uppercase' }}>
              PORT<br/>FOLIO
            </h1>
            
            <div style={{ width: '60px', height: '2px', background: 'var(--accent-cyan)', margin: '1rem auto' }}></div>
            
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.2em' }}>
              EDITION 2026
            </p>
          </div>

          <h2 className="font-display" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: '#ffffff', marginTop: '1.5rem', letterSpacing: '0.08em' }}>
            {profile.name || 'NGUYỄN CÔNG TRỨ'}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-heading)', marginTop: '0.25rem' }}>
            {profile.title || 'SALES INTERN & IT SPECIALIST'}
          </p>
        </div>
      ),
      right: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1rem, 3vw, 2.5rem)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <span className="page-number-tag" style={{ border: 'none', padding: 0 }}>[ SPREAD 01 // INDEX ]</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>02</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              MỤC LỤC TẠP CHÍ
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>
              Tổng quan cấu trúc hồ sơ năng lực phiên bản lật trang 3D.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[
                { no: '01', title: 'Cover & Giới Thiệu', desc: 'Trang bìa & Tổng quan' },
                { no: '02', title: 'Lời Chào & Kỹ Năng', desc: 'Bio & Skills Matrix' },
                { no: '03', title: 'Hành Trình & Dự Án', desc: 'Timeline & Các dự án chính' },
                { no: '04', title: 'Sự Kiện & Bằng Cấp', desc: 'Hoạt động & Chứng chỉ' },
                { no: '05', title: 'Liên Hệ & Lời Cảm Ơn', desc: 'Thông tin kết nối trực tiếp' }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleFlip(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.55rem 0.85rem',
                    background: currentPage === idx ? 'rgba(0,240,255,0.08)' : 'rgba(255,255,255,0.02)',
                    border: '1px solid',
                    borderColor: currentPage === idx ? 'var(--accent-cyan)' : 'var(--surface-border)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="font-display" style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem' }}>{item.no}</span>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 600 }}>{item.title}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{item.desc}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} color="var(--text-dim)" />
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center', borderTop: '1px solid var(--surface-border)', paddingTop: '0.75rem' }}>
            👉 Sử dụng nút mũi tên hoặc phím <strong>[←] [→]</strong> để lật trang
          </div>
        </div>
      )
    },

    // Spread 2: Welcome & Skills
    {
      id: 'spread-2',
      title: 'WELCOME & SKILLS',
      left: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1rem, 3vw, 2.5rem)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <span className="page-number-tag" style={{ border: 'none', padding: 0 }}>[ SPREAD 02 // WELCOME ]</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>03</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              LỜI NGỎ & TẦM NHÌN
            </h3>

            <div style={{ background: 'rgba(0,240,255,0.04)', borderLeft: '3px solid var(--accent-cyan)', padding: '0.85rem 1rem', margin: '1rem 0', borderRadius: '0 4px 4px 0' }}>
              <p style={{ fontStyle: 'italic', fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>
                "{profile.tagline || 'Sinh viên CNTT am hiểu sâu sắc lộ trình học EdTech, giàu kinh nghiệm truyền thông, sự kiện và tư vấn giải pháp kỹ thuật.'}"
              </p>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: 1.65 }}>
              {profile.bio}
            </p>
          </div>

          {(profile.stats && profile.stats.length > 0) && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', borderTop: '1px solid var(--surface-border)', paddingTop: '1rem' }}>
              {profile.stats.slice(0, 4).map((st, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '0.65rem', borderLeft: '2px solid var(--accent-cyan)', borderRadius: '0 4px 4px 0' }}>
                  <div className="font-display" style={{ fontSize: '1.25rem', color: '#fff' }}>{st.value}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{st.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
      right: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1rem, 3vw, 2.5rem)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <span className="page-number-tag" style={{ border: 'none', padding: 0 }}>[ SPREAD 02 // CAPABILITIES ]</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>04</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              CHUYÊN MÔN KỸ THUẬT
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>
              Phân bổ % năng lực chuyên môn theo các nhóm kỹ năng.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {skills.slice(0, 6).map((s, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#fff', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 500 }}>{s.name}</span>
                    <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{s.level}%</span>
                  </div>
                  <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${s.level}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))', borderRadius: '3px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', border: '1px solid var(--surface-border)', borderRadius: '4px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 600, textTransform: 'uppercase' }}>
              ★ ĐIỂM MẠNH NỔI TRỘI:
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Khả năng kết hợp giữa tư duy kỹ thuật CNTT và giao tiếp, MC hoạt náo sự kiện & tư vấn giải pháp thực tế.
            </div>
          </div>
        </div>
      )
    },

    // Spread 3: Timeline & Key Projects
    {
      id: 'spread-3',
      title: 'TIMELINE & PROJECTS',
      left: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1rem, 3vw, 2.5rem)', overflowY: 'auto' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <span className="page-number-tag" style={{ border: 'none', padding: 0 }}>[ SPREAD 03 // TIMELINE ]</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>05</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              HÀNH TRÌNH PHÁT TRIỂN
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {timeline.slice(0, 3).map((item, i) => (
                <div key={i} style={{ borderLeft: '2px solid var(--accent-cyan)', paddingLeft: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)', background: 'rgba(0,240,255,0.1)', padding: '0.1rem 0.4rem', borderRadius: '2px' }}>
                      {item.period}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                      {item.phase}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.88rem', color: '#fff', margin: '0.15rem 0' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      right: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1rem, 3vw, 2.5rem)', overflowY: 'auto' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <span className="page-number-tag" style={{ border: 'none', padding: 0 }}>[ SPREAD 03 // PROJECTS ]</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>06</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              DỰ ÁN TIÊU BIỂU
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {projects.slice(0, 2).map((p) => (
                <div key={p.id} style={{ border: '1px solid var(--surface-border)', padding: '0.85rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 className="font-display" style={{ fontSize: '0.98rem', color: '#fff' }}>{p.title}</h4>
                    <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '3px', background: p.status === 'Đã hoàn thành' ? 'rgba(16,185,129,0.15)' : 'rgba(0,240,255,0.15)', color: p.status === 'Đã hoàn thành' ? '#10b981' : '#00f0ff' }}>
                      {p.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.76rem', color: 'var(--accent-cyan)', marginTop: '0.2rem', fontWeight: 500 }}>{p.subtitle}</p>
                  <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.45 }}>{p.description}</p>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: 'var(--accent-cyan)', textDecoration: 'none', marginTop: '0.5rem', fontWeight: 600 }}>
                      Xem demo trực tiếp <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },

    // Spread 4: Events & Certificates (Curated & Perfectly proportioned)
    {
      id: 'spread-4',
      title: 'EVENTS & CERTS',
      left: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1rem, 3vw, 2.5rem)', overflowY: 'auto' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <span className="page-number-tag" style={{ border: 'none', padding: 0 }}>[ SPREAD 04 // ACTIVITIES ]</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>07</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              SỰ KIỆN & TRUYỀN THÔNG
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {events.slice(0, 4).map((ev) => (
                <div key={ev.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', background: 'rgba(255,183,3,0.12)', padding: '0.1rem 0.4rem', borderRadius: '2px', fontWeight: 600 }}>
                      ★ {ev.badge || 'SỰ KIỆN'}
                    </span>
                    {ev.date && <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>• {ev.date}</span>}
                  </div>
                  <h4 style={{ fontSize: '0.88rem', color: '#fff', marginTop: '0.25rem' }}>{ev.title}</h4>
                  <p style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)', marginTop: '0.15rem' }}>{ev.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      right: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1rem, 3vw, 2.5rem)', overflowY: 'auto' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <span className="page-number-tag" style={{ border: 'none', padding: 0 }}>[ SPREAD 04 // CREDENTIALS ]</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>08</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              VĂN BẰNG & CHỨNG CHỈ
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {certificates.slice(0, 4).map((c, idx) => (
                <div key={c.id || idx} style={{ borderLeft: '2px solid var(--accent-gold)', paddingLeft: '0.75rem' }}>
                  <h4 style={{ fontSize: '0.86rem', color: '#fff' }}>{c.title}</h4>
                  <p style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)', marginTop: '0.15rem' }}>{c.issuer} {c.date ? `(${c.date})` : ''}</p>
                  {c.description && <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{c.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },

    // Spread 5: Contact & Thank you
    {
      id: 'spread-5',
      title: 'CONTACT & CLOSING',
      left: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1rem, 3vw, 2.5rem)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <span className="page-number-tag" style={{ border: 'none', padding: 0 }}>[ SPREAD 05 // CONNECT ]</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>09</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              KẾT NỐI TRỰC TIẾP
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Rất hân hạnh được đồng hành và trao đổi cơ hội hợp tác cùng bạn.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
              {profile.email && (
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.65rem 0.85rem', border: '1px solid var(--surface-border)', borderRadius: '4px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>EMAIL</span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}>{profile.email}</span>
                </div>
              )}

              {profile.phone && (
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.65rem 0.85rem', border: '1px solid var(--surface-border)', borderRadius: '4px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>HOTLINE / ZALO</span>
                  <span style={{ color: '#fff', fontWeight: 500 }}>{profile.phone}</span>
                </div>
              )}

              {profile.location && (
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.65rem 0.85rem', border: '1px solid var(--surface-border)', borderRadius: '4px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>ĐỊA CHỈ</span>
                  <span style={{ color: 'var(--text-muted)' }}>{profile.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      right: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: 'clamp(1rem, 3vw, 2.5rem)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(0,240,255,0.1)', border: '1px solid var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Sparkles size={24} color="var(--accent-cyan)" />
          </div>

          <h3 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#ffffff', letterSpacing: '0.05em' }}>
            THANK YOU
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem', maxWidth: '320px', lineHeight: 1.55 }}>
            Cảm ơn bạn đã dành thời gian khám phá Portfolio phiên bản Tạp chí 3D.
          </p>

          <button 
            type="button"
            className="btn-editorial btn-accent" 
            onClick={onClose} 
            style={{ marginTop: '1.75rem', padding: '0.7rem 1.75rem' }}
          >
            Quay Lại Trang Chủ
          </button>
        </div>
      )
    }
  ];

  const handleFlip = (newIndex) => {
    if (newIndex === currentPage || isFlipping) return;
    setDirection(newIndex > currentPage ? 1 : -1);
    setIsFlipping(true);
    setCurrentPage(newIndex);
    setTimeout(() => setIsFlipping(false), 600);
  };

  const handleNext = () => {
    if (currentPage < spreads.length - 1 && !isFlipping) {
      handleFlip(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0 && !isFlipping) {
      handleFlip(currentPage - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isFlipping]);

  // Framer motion variants for 3D flip effect
  const bookVariants = {
    enter: (dir) => ({
      rotateY: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(2px)'
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(2px)',
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(4, 5, 8, 0.94)',
      backdropFilter: 'blur(24px)',
      zIndex: 6000,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 'clamp(0.75rem, 2vw, 1.5rem)',
      perspective: '2000px',
      overflow: 'hidden'
    }}>
      
      {/* Top Header Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(0,240,255,0.12)', border: '1px solid rgba(0,240,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={18} color="var(--accent-cyan)" />
          </div>
          <div>
            <span className="font-display" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: '#fff', letterSpacing: '0.08em' }}>
              3D EDITORIAL BOOKLET
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>
              {spreads[currentPage].title}
            </span>
          </div>
        </div>

        <button 
          type="button"
          onClick={onClose}
          className="btn-secondary"
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', borderRadius: '6px' }}
        >
          <X size={16} /> Thoát Chế Độ Lật Sách [ESC]
        </button>
      </div>

      {/* 3D Booklet Stage */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '2000px',
        margin: '1rem 0'
      }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={spreads[currentPage].id}
            custom={direction}
            variants={bookVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              width: 'min(94vw, 1140px)',
              height: 'min(76vh, 640px)',
              background: '#0d0f14',
              border: '1px solid rgba(255,255,255,0.22)',
              borderRadius: '8px',
              boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 40px rgba(0, 240, 255, 0.1)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              position: 'relative',
              overflow: 'hidden',
              transformStyle: 'preserve-3d'
            }}
            className="booklet-spread"
          >
            {/* Spine Center Fold Line Shadow */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '32px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to right, rgba(0,0,0,0.6), transparent 45%, transparent 55%, rgba(0,0,0,0.6))',
              zIndex: 10,
              pointerEvents: 'none'
            }} />

            {/* Left Page */}
            <div className="booklet-page" style={{ height: '100%', overflowY: 'auto' }}>
              {spreads[currentPage].left}
            </div>

            {/* Right Page */}
            <div className="booklet-page" style={{ height: '100%', overflowY: 'auto' }}>
              {spreads[currentPage].right}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Page Flip Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', maxWidth: '1200px', width: '100%', margin: '0 auto', flexWrap: 'wrap' }}>
        <button 
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 0 || isFlipping}
          className="btn-editorial"
          style={{ opacity: currentPage === 0 ? 0.35 : 1, cursor: currentPage === 0 ? 'not-allowed' : 'pointer' }}
        >
          <ChevronLeft size={16} /> Trang Trước
        </button>

        {/* Page Indicators */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          {spreads.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleFlip(idx)}
              style={{
                width: currentPage === idx ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentPage === idx ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              title={`Lật đến trang ${idx + 1}`}
            />
          ))}
        </div>

        <span className="font-display" style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
          SPREAD 0{currentPage + 1} / 0{spreads.length}
        </span>

        <button 
          type="button"
          onClick={handleNext}
          disabled={currentPage === spreads.length - 1 || isFlipping}
          className="btn-editorial btn-accent"
          style={{ opacity: currentPage === spreads.length - 1 ? 0.35 : 1, cursor: currentPage === spreads.length - 1 ? 'not-allowed' : 'pointer' }}
        >
          Trang Tiếp Theo <ChevronRight size={16} />
        </button>
      </div>

    </div>
  );
}

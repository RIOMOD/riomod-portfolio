import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../context/DataContext';
import { playPageFlipSound } from '../utils/audioUtils';
import { 
  ChevronLeft, ChevronRight, BookOpen, X, Sparkles, 
  Award, Calendar, ExternalLink, ArrowRight, Volume2, VolumeX,
  Layers, Sliders, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BrochureView({ onClose }) {
  const { profile, skills, timeline, projects, events, certificates, bookletSettings, updateBookletSettings } = usePortfolioData();
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  
  // Local settings with defaults from DataContext / Admin
  const [currentEffect, setCurrentEffect] = useState(bookletSettings?.flipEffect || 'classic');
  const [isSoundOn, setIsSoundOn] = useState(bookletSettings?.soundEnabled !== false);

  const flipEffectsList = [
    { id: 'classic', label: '📖 Lật Sách Cổ Điển (Classic 3D)' },
    { id: 'cube', label: '🎲 Khối Hộp 3D (3D Cube Orbit)' },
    { id: 'curl', label: '📄 Uốn Nếp Giấy (Paper Wave Fold)' },
    { id: 'slide', label: '🌠 Trượt Không Gian (Depth Slide)' },
    { id: 'zoom-flip', label: '🚀 Phóng Thu 3D (Zoom Flip)' }
  ];

  // Spreads Definition
  const spreads = [
    // SPREAD 1: COVER & TABLE OF CONTENTS
    {
      id: 'spread-1',
      title: 'TRANG BÌA & MỤC LỤC TỔNG QUAN',
      left: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: 'clamp(1.5rem, 4vw, 3.5rem)' }}>
          <div style={{
            border: '3px solid #ffffff',
            padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 3.5vw, 3rem)',
            background: 'rgba(9, 10, 13, 0.75)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 30px rgba(0, 240, 255, 0.15)',
            width: '100%',
            maxWidth: '520px',
            position: 'relative'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,240,255,0.1)', padding: '0.25rem 0.85rem', borderRadius: '50px', border: '1px solid rgba(0,240,255,0.3)', marginBottom: '1.25rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }}></span>
              <span style={{ fontSize: '0.72rem', color: '#00f0ff', fontWeight: 600, letterSpacing: '0.1em' }}>
                EDITION 2026 ● 3D ARCHIVE
              </span>
            </div>

            <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 7vw, 5.2rem)', lineHeight: 0.92, color: '#ffffff', letterSpacing: '0.04em', margin: '0.5rem 0', textTransform: 'uppercase' }}>
              PORT<br/>FOLIO
            </h1>

            <div style={{ width: '100px', height: '3px', background: 'var(--accent-cyan)', margin: '1.5rem auto' }}></div>

            <p style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', color: 'var(--text-muted)', letterSpacing: '0.2em', fontFamily: 'var(--font-heading)' }}>
              DIGITAL PROFILE & SHOWCASE
            </p>
          </div>

          <h2 className="font-display" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: '#ffffff', marginTop: '2rem', letterSpacing: '0.08em' }}>
            {profile.name || 'NGUYỄN CÔNG TRỨ'}
          </h2>
          <p style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', color: 'var(--accent-cyan)', fontFamily: 'var(--font-heading)', marginTop: '0.35rem', fontWeight: 600 }}>
            {profile.title || 'SALES INTERN & IT SPECIALIST'}
          </p>
        </div>
      ),
      right: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1.5rem, 4vw, 3.5rem)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
              <span className="page-number-tag">[ SPREAD 01 // DIRECTORY ]</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>PAGE 02</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#ffffff', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
              MỤC LỤC TỔNG QUAN
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
              Chọn một mục dưới đây để lật nhanh đến phân đoạn hồ sơ tương ứng:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { no: '01', title: 'Trang Bìa & Mục Lục', desc: 'Bìa ấn phẩm & Định hướng nội dung', spreadIdx: 0 },
                { no: '02', title: 'Lời Chào & Kỹ Năng', desc: 'Tầm nhìn, năng lực & Ma trận kỹ năng', spreadIdx: 1 },
                { no: '03', title: 'Hành Trình & Dự Án', desc: 'Cột mốc sự nghiệp & Sản phẩm tiêu biểu', spreadIdx: 2 },
                { no: '04', title: 'Sự Kiện & Bằng Cấp', desc: 'Hoạt động truyền thông, MC & Chứng chỉ', spreadIdx: 3 },
                { no: '05', title: 'Kết Nối Trực Tiếp', desc: 'Thông tin liên hệ & Hợp tác', spreadIdx: 4 }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleFlip(item.spreadIdx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1.25rem',
                    background: currentPage === item.spreadIdx ? 'rgba(0,240,255,0.08)' : 'rgba(255,255,255,0.02)',
                    border: '1px solid',
                    borderColor: currentPage === item.spreadIdx ? 'var(--accent-cyan)' : 'var(--surface-border)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                    e.currentTarget.style.background = 'rgba(0,240,255,0.06)';
                    e.currentTarget.style.transform = 'translateX(6px)';
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== item.spreadIdx) {
                      e.currentTarget.style.borderColor = 'var(--surface-border)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    }
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className="font-display" style={{ color: 'var(--accent-cyan)', fontSize: '1.15rem' }}>{item.no}</span>
                    <div>
                      <div style={{ fontSize: '0.92rem', color: '#ffffff', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>{item.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{item.desc}</div>
                    </div>
                  </div>
                  <ArrowRight size={16} color="var(--accent-cyan)" />
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'center', borderTop: '1px solid var(--surface-border)', paddingTop: '1rem' }}>
            💡 Điều hướng: Bấm nút <strong>Trang Sau / Trang Trước</strong> hoặc dùng phím <strong>[←] [→]</strong>
          </div>
        </div>
      )
    },

    // SPREAD 2: WELCOME & SKILLS MATRIX
    {
      id: 'spread-2',
      title: 'LỜI NGỎ & MA TRẬN KỸ NĂNG',
      left: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1.5rem, 4vw, 3.5rem)', overflowY: 'auto' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <span className="page-number-tag">[ SPREAD 02 // STATEMENT ]</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>PAGE 03</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#ffffff', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
              LỜI NGỎ & TẦM NHÌN
            </h3>

            <div style={{ background: 'rgba(0,240,255,0.04)', borderLeft: '3px solid var(--accent-cyan)', padding: '1rem 1.25rem', margin: '1.25rem 0', borderRadius: '0 6px 6px 0' }}>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                "{profile.tagline || 'Sinh viên CNTT am hiểu sâu sắc lộ trình học EdTech, giàu kinh nghiệm truyền thông, sự kiện và tư vấn giải pháp kỹ thuật.'}"
              </p>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.75 }}>
              {profile.bio}
            </p>
          </div>

          {(profile.stats && profile.stats.length > 0) && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.85rem', borderTop: '1px solid var(--surface-border)', paddingTop: '1.25rem', marginTop: '1.5rem' }}>
              {profile.stats.map((st, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.35)', padding: '0.85rem', borderLeft: '2px solid var(--accent-cyan)', borderRadius: '0 4px 4px 0' }}>
                  <div className="font-display" style={{ fontSize: '1.4rem', color: '#fff' }}>{st.value}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{st.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
      right: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1.5rem, 4vw, 3.5rem)', overflowY: 'auto' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <span className="page-number-tag">[ SPREAD 02 // CAPABILITIES ]</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>PAGE 04</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#ffffff', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
              CHUYÊN MÔN & KỸ NĂNG
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Độ thành thạo và năng lực thực chiến trong các phân mảng:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {skills.map((s, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#fff', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 500 }}>{s.name}</span>
                    <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{s.level}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${s.level}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))', borderRadius: '3px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', border: '1px solid var(--surface-border)', borderRadius: '6px', marginTop: '1.5rem' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ★ ĐIỂM MẠNH NỔI BẬT:
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: 1.5 }}>
              Khả năng kết hợp giữa tư duy kỹ thuật CNTT và giao tiếp, MC hoạt náo sự kiện & tư vấn giải pháp thực tế theo nhu cầu khách hàng.
            </div>
          </div>
        </div>
      )
    },

    // SPREAD 3: TIMELINE & FEATURED PROJECTS
    {
      id: 'spread-3',
      title: 'HÀNH TRÌNH PHÁT TRIỂN & DỰ ÁN',
      left: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1.5rem, 4vw, 3.5rem)', overflowY: 'auto' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <span className="page-number-tag">[ SPREAD 03 // CAREER JOURNEY ]</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>PAGE 05</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#ffffff', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
              HÀNH TRÌNH PHÁT TRIỂN
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {timeline.slice(0, 4).map((item, i) => (
                <div key={i} style={{ borderLeft: '2px solid var(--accent-cyan)', paddingLeft: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)', background: 'rgba(0,240,255,0.1)', padding: '0.15rem 0.5rem', borderRadius: '3px' }}>
                      {item.period}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>
                      {item.phase}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', color: '#fff', margin: '0.2rem 0', fontFamily: 'var(--font-heading)' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      right: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1.5rem, 4vw, 3.5rem)', overflowY: 'auto' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <span className="page-number-tag">[ SPREAD 03 // PROJECTS ]</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>PAGE 06</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#ffffff', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
              DỰ ÁN TIÊU BIỂU
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {projects.slice(0, 3).map((p) => (
                <div key={p.id} style={{ border: '1px solid var(--surface-border)', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 className="font-display" style={{ fontSize: '1.05rem', color: '#fff' }}>{p.title}</h4>
                    <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: '3px', background: p.status === 'Đã hoàn thành' ? 'rgba(16,185,129,0.15)' : 'rgba(0,240,255,0.15)', color: p.status === 'Đã hoàn thành' ? '#10b981' : '#00f0ff', fontWeight: 600 }}>
                      {p.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', marginTop: '0.25rem', fontWeight: 500 }}>{p.subtitle}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.5 }}>{p.description}</p>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--accent-cyan)', textDecoration: 'none', marginTop: '0.6rem', fontWeight: 600 }}>
                      Xem demo trực tiếp <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },

    // SPREAD 4: EVENTS & CERTIFICATES
    {
      id: 'spread-4',
      title: 'SỰ KIỆN & VĂN BẰNG CHỨNG CHỈ',
      left: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1.5rem, 4vw, 3.5rem)', overflowY: 'auto' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <span className="page-number-tag">[ SPREAD 04 // ENGAGEMENT ]</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>PAGE 07</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#ffffff', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
              SỰ KIỆN & TRUYỀN THÔNG
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {events.slice(0, 5).map((ev) => (
                <div key={ev.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--accent-gold)', background: 'rgba(255,183,3,0.12)', padding: '0.15rem 0.5rem', borderRadius: '3px', fontWeight: 600 }}>
                      ★ {ev.badge || 'SỰ KIỆN'}
                    </span>
                    {ev.date && <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>• {ev.date}</span>}
                  </div>
                  <h4 style={{ fontSize: '0.92rem', color: '#fff', marginTop: '0.35rem', fontFamily: 'var(--font-heading)' }}>{ev.title}</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', marginTop: '0.15rem' }}>{ev.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      right: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1.5rem, 4vw, 3.5rem)', overflowY: 'auto' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <span className="page-number-tag">[ SPREAD 04 // CREDENTIALS ]</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>PAGE 08</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#ffffff', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
              VĂN BẰNG & CHỨNG CHỈ
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {certificates.slice(0, 5).map((c, idx) => (
                <div key={c.id || idx} style={{ borderLeft: '3px solid var(--accent-gold)', paddingLeft: '1rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '0 6px 6px 0' }}>
                  <h4 style={{ fontSize: '0.92rem', color: '#fff', fontFamily: 'var(--font-heading)' }}>{c.title}</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>{c.issuer} {c.date ? `(${c.date})` : ''}</p>
                  {c.description && <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: 1.45 }}>{c.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },

    // SPREAD 5: CONTACT & CLOSING
    {
      id: 'spread-5',
      title: 'KẾT NỐI TRỰC TIẾP & CẢM ƠN',
      left: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'clamp(1.5rem, 4vw, 3.5rem)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <span className="page-number-tag">[ SPREAD 05 // CONNECT ]</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>PAGE 09</span>
            </div>

            <h3 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#ffffff', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
              KẾT NỐI TRỰC TIẾP
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.75rem' }}>
              Rất hân hạnh được đồng hành, trao đổi cơ hội tuyển dụng và hợp tác cùng quý đối tác, doanh nghiệp.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {profile.email && (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem 1.15rem', border: '1px solid var(--surface-border)', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>EMAIL</span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.92rem' }}>{profile.email}</span>
                </div>
              )}

              {profile.phone && (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem 1.15rem', border: '1px solid var(--surface-border)', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>HOTLINE / ZALO</span>
                  <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.92rem' }}>{profile.phone}</span>
                </div>
              )}

              {profile.location && (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem 1.15rem', border: '1px solid var(--surface-border)', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ĐỊA CHỈ KHU VỰC</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{profile.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      right: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: 'clamp(1.5rem, 4vw, 3.5rem)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,240,255,0.12)', border: '1px solid var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 0 25px rgba(0,240,255,0.25)' }}>
            <Sparkles size={28} color="var(--accent-cyan)" />
          </div>

          <h3 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#ffffff', letterSpacing: '0.05em' }}>
            THANK YOU
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.75rem', maxWidth: '380px', lineHeight: 1.65 }}>
            Cảm ơn bạn đã dành thời gian theo dõi Portfolio phiên bản Tạp chí 3D. Hãy liên hệ ngay nếu bạn cần trao đổi thêm!
          </p>

          <button 
            type="button"
            className="btn-editorial btn-accent" 
            onClick={onClose} 
            style={{ marginTop: '2rem', padding: '0.8rem 2rem', fontSize: '0.9rem' }}
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
    
    // Play realistic paper page-flip sound
    playPageFlipSound(isSoundOn);

    setCurrentPage(newIndex);
    setTimeout(() => setIsFlipping(false), 550);
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
  }, [currentPage, isFlipping, isSoundOn]);

  // Multiple 3D flip animation variants dictionary
  const getAnimationVariants = (effectName) => {
    switch (effectName) {
      case 'cube':
        return {
          enter: (dir) => ({
            rotateY: dir > 0 ? 80 : -80,
            x: dir > 0 ? '40%' : '-40%',
            opacity: 0,
            scale: 0.85
          }),
          center: {
            rotateY: 0,
            x: '0%',
            opacity: 1,
            scale: 1,
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
          },
          exit: (dir) => ({
            rotateY: dir > 0 ? -80 : 80,
            x: dir > 0 ? '-40%' : '40%',
            opacity: 0,
            scale: 0.85,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
          })
        };

      case 'curl':
        return {
          enter: (dir) => ({
            rotateY: dir > 0 ? 45 : -45,
            rotateX: 10,
            opacity: 0,
            scale: 0.92,
            skewY: dir > 0 ? 4 : -4
          }),
          center: {
            rotateY: 0,
            rotateX: 0,
            opacity: 1,
            scale: 1,
            skewY: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          },
          exit: (dir) => ({
            rotateY: dir > 0 ? -45 : 45,
            rotateX: -10,
            opacity: 0,
            scale: 0.92,
            skewY: dir > 0 ? -4 : 4,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
          })
        };

      case 'slide':
        return {
          enter: (dir) => ({
            x: dir > 0 ? '60%' : '-60%',
            rotateY: dir > 0 ? 25 : -25,
            opacity: 0,
            scale: 0.9
          }),
          center: {
            x: '0%',
            rotateY: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          },
          exit: (dir) => ({
            x: dir > 0 ? '-60%' : '60%',
            rotateY: dir > 0 ? -25 : 25,
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
          })
        };

      case 'zoom-flip':
        return {
          enter: (dir) => ({
            scale: 0.6,
            rotateY: dir > 0 ? 60 : -60,
            rotateX: -12,
            opacity: 0
          }),
          center: {
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          },
          exit: (dir) => ({
            scale: 0.6,
            rotateY: dir > 0 ? -60 : 60,
            rotateX: 12,
            opacity: 0,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
          })
        };

      case 'classic':
      default:
        return {
          enter: (dir) => ({
            rotateY: dir > 0 ? 35 : -35,
            opacity: 0,
            scale: 0.94,
            filter: 'blur(1px)'
          }),
          center: {
            rotateY: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
          },
          exit: (dir) => ({
            rotateY: dir > 0 ? -35 : 35,
            opacity: 0,
            scale: 0.94,
            filter: 'blur(1px)',
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
          })
        };
    }
  };

  const selectedVariants = getAnimationVariants(currentEffect);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(4, 5, 8, 0.96)',
      backdropFilter: 'blur(28px)',
      zIndex: 6000,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 'clamp(0.5rem, 1.5vw, 1.25rem)',
      perspective: '2600px',
      overflow: 'hidden',
      width: '100vw',
      height: '100vh'
    }}>
      
      {/* Top Header Bar with Live Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1600px', margin: '0 auto', padding: '0 0.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(0,240,255,0.12)', border: '1px solid rgba(0,240,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={20} color="var(--accent-cyan)" />
          </div>
          <div>
            <span className="font-display" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', color: '#ffffff', letterSpacing: '0.08em' }}>
              3D EDITORIAL BOOKLET
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block' }}>
              {spreads[currentPage].title}
            </span>
          </div>
        </div>

        {/* Live Controls: Effect Selector & Sound Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Flip Effect Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.06)', padding: '0.3rem 0.6rem', borderRadius: '6px', border: '1px solid var(--surface-border)' }}>
            <Sliders size={14} color="var(--accent-cyan)" />
            <select
              value={currentEffect}
              onChange={(e) => {
                const eff = e.target.value;
                setCurrentEffect(eff);
                updateBookletSettings({ flipEffect: eff });
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-heading)',
                outline: 'none',
                cursor: 'pointer'
              }}
              title="Chọn hiệu ứng lật 3D"
            >
              {flipEffectsList.map((item) => (
                <option key={item.id} value={item.id} style={{ background: '#12141a', color: '#fff' }}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sound Toggle (Mute/Unmute) */}
          <button
            type="button"
            onClick={() => {
              const nextSound = !isSoundOn;
              setIsSoundOn(nextSound);
              updateBookletSettings({ soundEnabled: nextSound });
              if (nextSound) playPageFlipSound(true);
            }}
            className="btn-editorial"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.78rem', gap: '0.4rem' }}
            title={isSoundOn ? 'Tắt âm thanh lật trang' : 'Bật âm thanh lật trang'}
          >
            {isSoundOn ? (
              <>
                <Volume2 size={16} color="var(--accent-cyan)" />
                <span style={{ fontSize: '0.72rem' }}>Âm Thanh: Bật</span>
              </>
            ) : (
              <>
                <VolumeX size={16} color="var(--text-dim)" />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Âm Thanh: Tắt</span>
              </>
            )}
          </button>

          {/* Close Button */}
          <button 
            type="button"
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem', borderRadius: '6px' }}
          >
            <X size={16} /> Thoát [ESC]
          </button>
        </div>
      </div>

      {/* 3D FULL-WIDTH BOOKLET STAGE */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '2600px',
        width: '100%',
        maxWidth: '1600px',
        margin: '0.5rem auto'
      }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={spreads[currentPage].id}
            custom={direction}
            variants={selectedVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              width: '100%',
              height: 'clamp(480px, 80vh, 780px)',
              background: '#0c0e14',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '10px',
              boxShadow: '0 30px 100px rgba(0, 0, 0, 0.98), 0 0 50px rgba(0, 240, 255, 0.15)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              position: 'relative',
              overflow: 'hidden',
              transformStyle: 'preserve-3d'
            }}
            className="booklet-spread"
          >
            {/* Center Fold Line Realistic Shadow */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '40px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to right, rgba(0,0,0,0.65), transparent 45%, transparent 55%, rgba(0,0,0,0.65))',
              zIndex: 15,
              pointerEvents: 'none'
            }} />

            {/* Left Page Spread */}
            <div className="booklet-page" style={{ height: '100%', overflowY: 'auto', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              {spreads[currentPage].left}
            </div>

            {/* Right Page Spread */}
            <div className="booklet-page" style={{ height: '100%', overflowY: 'auto' }}>
              {spreads[currentPage].right}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Floating Flip Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', width: '100%', maxWidth: '1600px', margin: '0 auto', flexWrap: 'wrap', padding: '0 0.5rem' }}>
        <button 
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 0 || isFlipping}
          className="btn-editorial"
          style={{ opacity: currentPage === 0 ? 0.35 : 1, cursor: currentPage === 0 ? 'not-allowed' : 'pointer', padding: '0.65rem 1.4rem' }}
        >
          <ChevronLeft size={18} /> Trang Trước
        </button>

        {/* Page Indicators */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {spreads.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleFlip(idx)}
              style={{
                width: currentPage === idx ? '28px' : '10px',
                height: '8px',
                borderRadius: '4px',
                background: currentPage === idx ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              title={`Lật đến trang ${idx + 1}`}
            />
          ))}
        </div>

        <span className="font-display" style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem', letterSpacing: '0.12em' }}>
          SPREAD 0{currentPage + 1} / 0{spreads.length}
        </span>

        <button 
          type="button"
          onClick={handleNext}
          disabled={currentPage === spreads.length - 1 || isFlipping}
          className="btn-editorial btn-accent"
          style={{ opacity: currentPage === spreads.length - 1 ? 0.35 : 1, cursor: currentPage === spreads.length - 1 ? 'not-allowed' : 'pointer', padding: '0.65rem 1.4rem' }}
        >
          Trang Kế Tiếp <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
}

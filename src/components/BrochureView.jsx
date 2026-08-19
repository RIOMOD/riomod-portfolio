import React, { useState } from 'react';
import { usePortfolioData } from '../context/DataContext';
import { ChevronLeft, ChevronRight, BookOpen, X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BrochureView({ onClose }) {
  const { profile, skills, timeline, projects, events, certificates } = usePortfolioData();
  const [currentPage, setCurrentPage] = useState(0);

  // Spread Spreads defined according to the reference image booklet structure
  const pages = [
    // Spread 1: Cover & Back
    {
      left: (
        <div style={{ textAlign: 'center', margin: 'auto' }}>
          <div style={{ border: '2px solid #fff', padding: '2rem 1.5rem', display: 'inline-block' }}>
            <h1 className="font-display" style={{ fontSize: '3.5rem', lineHeight: 0.95, color: '#fff' }}>
              PORT<br/>FOLIO
            </h1>
            <div style={{ width: '60px', height: '2px', background: '#fff', margin: '1rem auto' }}></div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.2em' }}>EDITION 2026</p>
          </div>
          <h2 style={{ fontSize: '1.1rem', color: '#fff', marginTop: '2rem', fontFamily: 'var(--font-heading)' }}>
            {profile.name}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{profile.title}</p>
        </div>
      ),
      right: (
        <div>
          <span className="page-number-tag">[ 02 / INDEX PAGE ]</span>
          <h3 className="font-display" style={{ fontSize: '2rem', color: '#fff', marginTop: '1rem', borderBottom: '1px solid #fff', paddingBottom: '0.5rem' }}>
            MỤC LỤC TẠP CHÍ
          </h3>
          <ul style={{ listStyle: 'none', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>
              <span>01 - Cover Page</span> <span style={{ color: 'var(--accent-cyan)' }}>Trang Bìa</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>
              <span>02 - Welcome & Bio</span> <span style={{ color: 'var(--accent-cyan)' }}>Lời Chào & Kỹ Năng</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>
              <span>04 - Growth Timeline</span> <span style={{ color: 'var(--accent-cyan)' }}>Hành Trình Sự Nghiệp</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>
              <span>06 - Code Projects</span> <span style={{ color: 'var(--accent-cyan)' }}>Dự Án Lập Trình</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>
              <span>08 - Events & Certs</span> <span style={{ color: 'var(--accent-cyan)' }}>Sự Kiện & Chứng Chỉ</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>
              <span>10 - Get In Touch</span> <span style={{ color: 'var(--accent-cyan)' }}>Thông Tin Liên Hệ</span>
            </li>
          </ul>
        </div>
      )
    },

    // Spread 2: Welcome & Skills
    {
      left: (
        <div>
          <span className="page-number-tag">[ 03 / WELCOME MESSAGE ]</span>
          <h3 className="font-display" style={{ fontSize: '2rem', color: '#fff', marginTop: '0.5rem' }}>
            WELCOME MESSAGE
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '1rem' }}>
            {profile.bio}
          </p>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderLeft: '2px solid var(--accent-cyan)', marginTop: '1.5rem', fontStyle: 'italic', fontSize: '0.85rem' }}>
            "{profile.tagline}"
          </div>
        </div>
      ),
      right: (
        <div>
          <span className="page-number-tag">[ 04 / SKILLS MATRIX ]</span>
          <h3 className="font-display" style={{ fontSize: '2rem', color: '#fff', marginTop: '0.5rem' }}>
            CHUYÊN MÔN KỸ THUẬT
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1.25rem' }}>
            {skills.slice(0, 5).map((s, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#fff' }}>
                  <span>{s.name}</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>{s.level}%</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '0.2rem' }}>
                  <div style={{ width: `${s.level}%`, height: '100%', background: 'var(--accent-cyan)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },

    // Spread 3: Timeline & Projects
    {
      left: (
        <div>
          <span className="page-number-tag">[ 05 / TIMELINE ]</span>
          <h3 className="font-display" style={{ fontSize: '2rem', color: '#fff', marginTop: '0.5rem' }}>
            HÀNH TRÌNH PHÁT TRIỂN
          </h3>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {timeline.slice(0, 3).map((item, i) => (
              <div key={i} style={{ borderLeft: '2px solid var(--accent-cyan)', paddingLeft: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>{item.period}</span>
                <h4 style={{ fontSize: '0.95rem', color: '#fff' }}>{item.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      right: (
        <div>
          <span className="page-number-tag">[ 06 / PROJECTS ]</span>
          <h3 className="font-display" style={{ fontSize: '2rem', color: '#fff', marginTop: '0.5rem' }}>
            DỰ ÁN TIÊU BIỂU
          </h3>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {projects.slice(0, 2).map((p) => (
              <div key={p.id} style={{ border: '1px solid var(--surface-border)', padding: '0.85rem', background: 'rgba(255,255,255,0.02)' }}>
                <h4 className="font-display" style={{ fontSize: '1.1rem', color: '#fff' }}>{p.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>{p.subtitle}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },

    // Spread 4: Events & Certifications
    {
      left: (
        <div>
          <span className="page-number-tag">[ 07 / ACTIVITIES ]</span>
          <h3 className="font-display" style={{ fontSize: '2rem', color: '#fff', marginTop: '0.5rem' }}>
            SỰ KIỆN NỔI BẬT
          </h3>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {events.map((ev) => (
              <div key={ev.id} style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', background: 'rgba(255,183,3,0.1)', padding: '0.1rem 0.4rem' }}>★ {ev.badge}</span>
                <h4 style={{ fontSize: '0.95rem', color: '#fff', marginTop: '0.25rem' }}>{ev.title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ev.role} • {ev.date}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      right: (
        <div>
          <span className="page-number-tag">[ 08 / CERTIFICATES ]</span>
          <h3 className="font-display" style={{ fontSize: '2rem', color: '#fff', marginTop: '0.5rem' }}>
            VĂN BẰNG & CHỨNG CHỈ
          </h3>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {certificates.slice(0, 3).map((c) => (
              <div key={c.id} style={{ borderLeft: '2px solid var(--accent-cyan)', paddingLeft: '0.75rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#fff' }}>{c.title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>{c.issuer} ({c.issueDate})</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'monospace' }}>ID: {c.credentialId}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },

    // Spread 5: Contact
    {
      left: (
        <div>
          <span className="page-number-tag">[ 09 / GET IN TOUCH ]</span>
          <h3 className="font-display" style={{ fontSize: '2.5rem', color: '#fff', marginTop: '0.5rem' }}>
            GET IN TOUCH
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem', lineHeight: 1.6 }}>
            Rất hân hạnh được hợp tác và trao đổi với bạn về các giải pháp sản phẩm công nghệ thế hệ mới.
          </p>
          <div style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
            <p style={{ color: '#fff' }}>✉ Email: {profile.email}</p>
            <p style={{ color: '#fff', marginTop: '0.5rem' }}>☎ SĐT: {profile.phone}</p>
            <p style={{ color: '#fff', marginTop: '0.5rem' }}>📍 Địa điểm: {profile.location}</p>
          </div>
        </div>
      ),
      right: (
        <div style={{ textAlign: 'center', margin: 'auto' }}>
          <h3 className="font-display" style={{ fontSize: '2rem', color: '#fff' }}>
            THANK YOU
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            Cảm ơn bạn đã xem qua Portfolio Tạp chí 3D.
          </p>
          <button className="btn-editorial btn-accent" onClick={onClose} style={{ marginTop: '2rem' }}>
            Quay Lại Trang Chủ
          </button>
        </div>
      )
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5,6,8,0.95)',
      backdropFilter: 'blur(20px)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      padding: '1.5rem'
    }}>
      
      {/* Top Header Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <BookOpen size={20} color="var(--accent-cyan)" />
          <span className="font-display" style={{ fontSize: '1.1rem', color: '#fff', letterSpacing: '0.1em' }}>
            3D EDITORIAL MAGAZINE MODE
          </span>
        </div>

        <button 
          onClick={onClose}
          className="btn-editorial"
          style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
        >
          <X size={16} /> Thoát Chế Độ Lật Trang
        </button>
      </div>

      {/* Main Booklet Spread Viewer */}
      <div className="booklet-container">
        <div className="booklet-spread">
          <div className="booklet-page">
            {pages[currentPage].left}
          </div>
          <div className="booklet-page">
            {pages[currentPage].right}
          </div>
        </div>
      </div>

      {/* Bottom Page Flip Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
        <button 
          onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          className="btn-editorial"
          style={{ opacity: currentPage === 0 ? 0.4 : 1 }}
        >
          <ChevronLeft size={18} /> Trang Trước
        </button>

        <span className="font-display" style={{ color: 'var(--accent-cyan)', fontSize: '1rem', letterSpacing: '0.15em' }}>
          TRANG SPREAD 0{currentPage + 1} / 0{pages.length}
        </span>

        <button 
          onClick={() => setCurrentPage(prev => Math.min(pages.length - 1, prev + 1))}
          disabled={currentPage === pages.length - 1}
          className="btn-editorial"
          style={{ opacity: currentPage === pages.length - 1 ? 0.4 : 1 }}
        >
          Trang Kế <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
}

import React from 'react';
import { usePortfolioData } from '../context/DataContext';
import { Quote, Cpu, ArrowRight } from 'lucide-react';

export default function AboutIndex() {
  const { profile, skills } = usePortfolioData();

  const navIndexItems = [
    { num: "02", title: "GIỚI THIỆU & KỸ NĂNG", anchor: "#about" },
    { num: "03", title: "HÀNH TRÌNH PHÁT TRIỂN", anchor: "#timeline" },
    { num: "04", title: "DỰ ÁN CODE & MEDIA", anchor: "#projects" },
    { num: "05", title: "SỰ KIỆN & TRUYỀN THÔNG", anchor: "#events" },
    { num: "06", title: "VĂN BẰNG & CHỨNG CHỈ", anchor: "#certificates" },
    { num: "07", title: "LIÊN HỆ TRỰC TIẾP", anchor: "#contact" }
  ];

  return (
    <section id="about" style={{ padding: '6rem 0', position: 'relative', zIndex: 1, width: '100%' }}>
      <div className="site-container">
        
        {/* Editorial Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span className="page-number-tag">[ 02 / INDEX & WELCOME ]</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>MỤC LỤC & TỔNG QUAN NĂNG LỰC</span>
        </div>

        {/* 2-Column Spread */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '2rem' }}>
          
          {/* Left Column: INDEX PAGE */}
          <div className="editorial-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 className="font-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: 'var(--text-primary)', letterSpacing: '0.05em', marginBottom: '1rem', borderBottom: '2px solid var(--text-primary)', paddingBottom: '0.5rem' }}>
                INDEX PAGE
              </h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
                Danh mục định hướng hồ sơ năng lực và các cột mốc quan trọng trong sự nghiệp.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {navIndexItems.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.anchor}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textDecoration: 'none',
                      padding: '0.75rem 1rem',
                      border: '1px solid var(--surface-border)',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                      e.currentTarget.style.background = 'rgba(0,240,255,0.08)';
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--surface-border)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <span className="font-display" style={{ fontSize: '1.15rem', color: 'var(--accent-cyan)' }}>{item.num}</span>
                      <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', fontWeight: 500 }}>{item.title}</span>
                    </div>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Stats Grid */}
            {(profile.stats && profile.stats.length > 0) && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.85rem', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--surface-border)' }}>
                {profile.stats.map((st, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.1)', padding: '0.85rem', borderLeft: '2px solid var(--accent-cyan)', borderRadius: '0 4px 4px 0' }}>
                    <div className="font-display" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', color: 'var(--text-primary)' }}>{st.value}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{st.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: WELCOME MESSAGE & Skills */}
          <div className="editorial-box">
            <h3 className="font-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: 'var(--text-primary)', letterSpacing: '0.05em', marginBottom: '1rem', borderBottom: '2px solid var(--text-primary)', paddingBottom: '0.5rem' }}>
              WELCOME MESSAGE
            </h3>

            {/* Profile Quote Box */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '3px solid var(--accent-cyan)', padding: '1.25rem', marginBottom: '1.5rem', borderRadius: '0 4px 4px 0' }}>
              <Quote size={20} color="var(--accent-cyan)" style={{ marginBottom: '0.4rem', opacity: 0.85 }} />
              <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                "{profile.tagline || 'Sức mạnh thực sự của công nghệ là biến những giải pháp kỹ thuật phức tạp thành trải nghiệm trực quan sống động mà ai cũng có thể thấu hiểu.'}"
              </p>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              {profile.bio}
            </p>

            {/* Skills & Tech Stack Matrix */}
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={18} color="var(--accent-cyan)" /> CHUYÊN MÔN & KỸ NĂNG (SKILLS MATRIX)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {skills.map((skill, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{skill.name}</span>
                    <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{skill.level}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div 
                      style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
                        borderRadius: '3px',
                        transition: 'width 1s cubic-bezier(0.1, 0.5, 0.1, 1)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

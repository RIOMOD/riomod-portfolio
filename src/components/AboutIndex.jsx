import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Quote, Code, Cpu, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutIndex() {
  const { profile, skills } = portfolioData;

  const navIndexItems = [
    { num: "02", title: "GIỚI THIỆU & KỸ NĂNG", anchor: "#about" },
    { num: "03", title: "HÀNH TRÌNH PHÁT TRIỂN", anchor: "#timeline" },
    { num: "04", title: "DỰ ÁN CODE NỔI BẬT", anchor: "#projects" },
    { num: "05", title: "SỰ KIỆN THAM GIA", anchor: "#events" },
    { num: "06", title: "VĂN BẰNG & CHỨNG CHỈ", anchor: "#certificates" },
    { num: "07", title: "LIÊN HỆ & THÔNG TIN", anchor: "#contact" }
  ];

  return (
    <section id="about" style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Editorial Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
          <span className="page-number-tag">[ 02 / INDEX & WELCOME ]</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>MỤC LỤC & TỔNG QUAN NĂNG LỰC</span>
        </div>

        {/* 2-Column Spread (Replicating "INDEX PAGE" + "WELCOME MESSAGE" from reference photo) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          
          {/* Left Column: INDEX PAGE (Mục Lục Tạp chí) */}
          <div className="editorial-box" style={{ padding: '2.5rem' }}>
            <h3 className="font-display" style={{ fontSize: '2rem', color: '#fff', letterSpacing: '0.05em', marginBottom: '1.5rem', borderBottom: '2px solid #fff', paddingBottom: '0.5rem' }}>
              INDEX PAGE
            </h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '2rem' }}>
              Danh mục định hướng hồ sơ năng lực và các cột mốc quan trọng trong sự nghiệp.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {navIndexItems.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.anchor}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    textDecoration: 'none',
                    padding: '0.75rem 1rem',
                    border: '1px solid var(--surface-border)',
                    background: 'rgba(255,255,255,0.02)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#00f0ff';
                    e.currentTarget.style.background = 'rgba(0,240,255,0.08)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--surface-border)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className="font-display" style={{ fontSize: '1.25rem', color: 'var(--accent-cyan)' }}>{item.num}</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', fontWeight: 500 }}>{item.title}</span>
                  </div>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>→</span>
                </a>
              ))}
            </div>

            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--surface-border)' }}>
              {profile.stats.map((st, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderLeft: '2px solid var(--accent-cyan)' }}>
                  <div className="font-display" style={{ fontSize: '1.75rem', color: '#fff' }}>{st.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: WELCOME MESSAGE (Lời Chào & Bio) */}
          <div className="editorial-box" style={{ padding: '2.5rem' }}>
            <h3 className="font-display" style={{ fontSize: '2rem', color: '#fff', letterSpacing: '0.05em', marginBottom: '1.5rem', borderBottom: '2px solid #fff', paddingBottom: '0.5rem' }}>
              WELCOME MESSAGE
            </h3>

            {/* Profile Quote Box */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '3px solid #fff', padding: '1.25rem', marginBottom: '1.5rem', position: 'relative' }}>
              <Quote size={24} color="var(--accent-cyan)" style={{ marginBottom: '0.5rem', opacity: 0.8 }} />
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                "Sức mạnh thực sự của lập trình là biến những thuật toán phức tạp thành trải nghiệm trực quan sống động mà ai cũng có thể cảm nhận được."
              </p>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              {profile.bio}
            </p>

            {/* Skills & Tech Stack Matrix */}
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={18} color="var(--accent-cyan)" /> CHUYÊN MÔN KỸ THUẬT (SKILLS MATRIX)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {skills.map((skill, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{skill.name}</span>
                    <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-heading)' }}>{skill.level}%</span>
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

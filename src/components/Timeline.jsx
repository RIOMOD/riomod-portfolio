import React from 'react';
import { usePortfolioData } from '../context/DataContext';
import { Sparkles, GraduationCap, Briefcase, Rocket, CheckCircle } from 'lucide-react';

export default function Timeline() {
  const { timeline } = usePortfolioData();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles size={18} color="var(--accent-gold)" />;
      case 'GraduationCap': return <GraduationCap size={18} color="var(--accent-cyan)" />;
      case 'Briefcase': return <Briefcase size={18} color="var(--accent-purple)" />;
      case 'Rocket': return <Rocket size={18} color="#ff4757" />;
      default: return <Sparkles size={18} color="var(--accent-cyan)" />;
    }
  };

  return (
    <section id="timeline" style={{ padding: '6rem 0', position: 'relative', zIndex: 1, width: '100%' }}>
      <div className="site-container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span className="page-number-tag">[ 03 / GROWTH TIMELINE ]</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>HÀNH TRÌNH PHÁT TRIỂN & CỘT MỐC SỰ NGHIỆP</span>
        </div>

        <div className="editorial-box">
          
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              HÀNH TRÌNH TỰ PHÁT TRIỂN
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: 1.7 }}>
              Từ nền tảng kỹ thuật phần cứng, quản lý văn phòng đến các hoạt động sự kiện, truyền thông và lập trình công nghệ thông tin.
            </p>
          </div>

          {/* Timeline Tree */}
          <div style={{ position: 'relative', paddingLeft: 'clamp(1.25rem, 3vw, 2.5rem)', borderLeft: '2px solid var(--surface-border-strong)', margin: '0 auto', maxWidth: '1000px' }}>
            
            {timeline.map((item, index) => (
              <div 
                key={index} 
                style={{ 
                  marginBottom: index === timeline.length - 1 ? 0 : '3.5rem', 
                  position: 'relative',
                  paddingLeft: 'clamp(0.75rem, 2vw, 1.5rem)'
                }}
              >
                {/* Timeline Dot Icon */}
                <div style={{
                  position: 'absolute',
                  left: 'calc(-1 * clamp(1.25rem, 3vw, 2.5rem) - 18px)',
                  top: '0',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--bg-card)',
                  border: '2px solid var(--surface-border-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(0,0,0,0.8)'
                }}>
                  {getIcon(item.icon)}
                </div>

                {/* Period Badge & Phase Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    color: 'var(--accent-cyan)',
                    background: 'rgba(0,240,255,0.1)',
                    padding: '0.2rem 0.65rem',
                    border: '1px solid rgba(0,240,255,0.3)',
                    borderRadius: '3px',
                    letterSpacing: '0.08em'
                  }}>
                    {item.period}
                  </span>
                  
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', letterSpacing: '0.12em', fontWeight: 600, textTransform: 'uppercase' }}>
                    {item.phase}
                  </span>
                </div>

                {/* Milestone Title */}
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.15rem, 3vw, 1.35rem)', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                  {item.title}
                </h3>

                {/* Description */}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.25rem', maxWidth: '850px' }}>
                  {item.description}
                </p>

                {/* Key Highlights / Achievements */}
                {(item.highlights && item.highlights.length > 0) && (
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {item.highlights.map((hl, hIdx) => (
                      <div 
                        key={hIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontSize: '0.82rem',
                          color: 'var(--text-primary)',
                          background: 'rgba(255,255,255,0.03)',
                          padding: '0.35rem 0.75rem',
                          border: '1px solid var(--surface-border)',
                          borderRadius: '3px'
                        }}
                      >
                        <CheckCircle size={14} color="var(--accent-cyan)" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

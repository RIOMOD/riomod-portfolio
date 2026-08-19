import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Sparkles, GraduationCap, Briefcase, Rocket, Calendar, CheckCircle } from 'lucide-react';

export default function Timeline() {
  const { timeline } = portfolioData;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles size={20} color="var(--accent-gold)" />;
      case 'GraduationCap': return <GraduationCap size={20} color="var(--accent-cyan)" />;
      case 'Briefcase': return <Briefcase size={20} color="var(--accent-purple)" />;
      case 'Rocket': return <Rocket size={20} color="#ff4757" />;
      default: return <Sparkles size={20} color="var(--accent-cyan)" />;
    }
  };

  return (
    <section id="timeline" style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
          <span className="page-number-tag">[ 03 / GROWTH TIMELINE ]</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>HÀNH TRÌNH PHÁT TRIỂN TỪ NHỎ TỚI NAY</span>
        </div>

        <div className="editorial-box" style={{ padding: '3rem 2.5rem' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              HÀNH TRÌNH TỰ PHÁT TRIỂN
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              Từ những dòng code thử nghiệm đầu tiên thời niên thiếu cho đến các dự án Web 3D quy mô lớn hiện tại.
            </p>
          </div>

          {/* Timeline Tree */}
          <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid var(--surface-border-strong)' }}>
            
            {timeline.map((item, index) => (
              <div 
                key={index} 
                style={{ 
                  marginBottom: index === timeline.length - 1 ? 0 : '3.5rem', 
                  position: 'relative',
                  paddingLeft: '1.5rem'
                }}
              >
                {/* Timeline Dot Icon */}
                <div style={{
                  position: 'absolute',
                  left: '-3.1rem',
                  top: '0',
                  width: '38px',
                  height: '38px',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    color: 'var(--accent-cyan)',
                    background: 'rgba(0,240,255,0.1)',
                    padding: '0.2rem 0.75rem',
                    border: '1px solid rgba(0,240,255,0.3)',
                    letterSpacing: '0.1em'
                  }}>
                    {item.period}
                  </span>
                  
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.15em', fontWeight: 600, textTransform: 'uppercase' }}>
                    {item.phase}
                  </span>
                </div>

                {/* Milestone Title */}
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#fff', marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>

                {/* Description */}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem', maxWidth: '800px' }}>
                  {item.description}
                </p>

                {/* Key Highlights / Achievements */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {item.highlights.map((hl, hIdx) => (
                    <div 
                      key={hIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.85rem',
                        color: 'var(--text-primary)',
                        background: 'rgba(255,255,255,0.03)',
                        padding: '0.35rem 0.85rem',
                        border: '1px solid var(--surface-border)'
                      }}
                    >
                      <CheckCircle size={14} color="var(--accent-cyan)" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

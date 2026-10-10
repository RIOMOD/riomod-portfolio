import React from 'react';
import { Quote, Sparkles } from 'lucide-react';

export default function QuoteBannerWidget({ config = {} }) {
  const quote = config.quote || 'Công nghệ tạo ra giải pháp, nhưng sự thấu hiểu và tận tâm mới là cầu nối bền vững nhất giữa con người với con người.';
  const author = config.author || 'Nguyễn Công Trứ';
  const badge = config.badge || 'TRIẾT LÝ HÀNH ĐỘNG & ĐẠO ĐỨC NGHỀ NGHIỆP';

  return (
    <section id="widget-quote" style={{ padding: '3.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(28, 18, 48, 0.8) 0%, rgba(14, 16, 26, 0.95) 100%)',
        border: '1px solid rgba(157, 78, 221, 0.4)',
        borderRadius: '16px',
        padding: '3rem 2.5rem',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(157, 78, 221, 0.15)',
        overflow: 'hidden'
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '-30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '300px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(157, 78, 221, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.3rem 0.85rem',
          borderRadius: '20px',
          background: 'rgba(157, 78, 221, 0.15)',
          border: '1px solid rgba(157, 78, 221, 0.35)',
          fontSize: '0.72rem',
          color: '#c084fc',
          letterSpacing: '0.12em',
          fontWeight: 600,
          marginBottom: '1.5rem'
        }}>
          <Sparkles size={12} /> {badge}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <Quote size={36} color="rgba(157, 78, 221, 0.6)" />
        </div>

        <blockquote style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
          fontFamily: 'var(--font-heading)',
          fontStyle: 'italic',
          color: '#fff',
          lineHeight: 1.6,
          maxWidth: '850px',
          margin: '0 auto 1.5rem auto'
        }}>
          "{quote}"
        </blockquote>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          <div style={{ height: '1px', width: '30px', background: 'rgba(255, 255, 255, 0.2)' }} />
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#06d6a0', letterSpacing: '0.05em' }}>
            {author}
          </span>
          <div style={{ height: '1px', width: '30px', background: 'rgba(255, 255, 255, 0.2)' }} />
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { Cpu, CheckCircle2, Search, Filter, Layers, Code, Sparkles, Terminal } from 'lucide-react';
import { usePortfolioData } from '../../context/DataContext';

export default function TechMatrixWidget({ config = {} }) {
  const { skills } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const title = config.title || 'MA TRẬN KỸ NĂNG & NĂNG LỰC CÔNG NGHỆ';

  // Extract unique categories
  const categories = ['ALL', ...Array.from(new Set(skills.map(s => s.category || 'General')))];

  const filteredSkills = skills.filter(item => {
    const matchesCategory = selectedCategory === 'ALL' || (item.category || 'General') === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="widget-tech-matrix" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 20, 30, 0.9) 0%, rgba(10, 12, 18, 0.95) 100%)',
        border: '1px solid rgba(6, 214, 160, 0.3)',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(6, 214, 160, 0.08)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Cpu size={18} color="#06d6a0" />
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: '#06d6a0', textTransform: 'uppercase', fontWeight: 600 }}>
                INTERACTIVE RADAR WIDGET
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: '#fff', margin: 0 }}>
              {title}
            </h2>
          </div>

          {/* Search box */}
          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Tìm kiếm kỹ năng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 1rem 0.5rem 2.2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '0.85rem'
              }}
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '20px',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-heading)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: selectedCategory === cat ? 'linear-gradient(135deg, #7c3aed, #06d6a0)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === cat ? '#fff' : 'var(--text-muted)',
                border: selectedCategory === cat ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {cat === 'ALL' ? 'Tất Cả Kỹ Năng' : cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem'
        }}>
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(20, 24, 36, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '10px',
                padding: '1.1rem',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>
                  {skill.name}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#06d6a0', fontWeight: 700, fontFamily: 'monospace' }}>
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${skill.level}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #7c3aed 0%, #06d6a0 100%)',
                    borderRadius: '3px',
                    transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.6rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  {skill.category || 'Chuyên môn'}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#c084fc', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <CheckCircle2 size={11} /> Đã kiểm chứng
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

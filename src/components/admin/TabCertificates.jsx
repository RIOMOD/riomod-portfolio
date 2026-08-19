import React, { useState } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { Award, Plus, Trash2, Save, ExternalLink } from 'lucide-react';

export default function TabCertificates() {
  const { certificates, updateCertificates, certCategories } = usePortfolioData();
  const [certsList, setCertsList] = useState(certificates);

  const handleCertChange = (index, field, value) => {
    const updated = [...certsList];
    updated[index] = { ...updated[index], [field]: value };
    setCertsList(updated);
  };

  const addCert = () => {
    setCertsList((prev) => [
      {
        id: `cert_${Date.now()}`,
        title: 'Chứng chỉ / Bằng khen mới',
        category: 'academic',
        issuer: 'Tổ chức cấp bằng',
        date: new Date().getFullYear().toString(),
        description: 'Mô tả tóm tắt nội dung chứng chỉ hoặc thành tích...',
        image: '',
        featured: true
      },
      ...prev
    ]);
  };

  const removeCert = (index) => {
    setCertsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateCertificates(certsList);
  };

  return (
    <form onSubmit={handleSave}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={20} color="var(--accent-gold)" />
            Quản Lý Bằng Cấp & Chứng Chỉ ({certsList.length})
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Quản lý các văn bằng, chứng chỉ kỹ thuật và bằng khen thành tích
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="button" onClick={addCert} className="btn-secondary">
            <Plus size={16} /> Thêm Chứng Chỉ
          </button>
          <button type="submit" className="btn-primary">
            <Save size={16} /> Lưu Chứng Chỉ
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {certsList.map((cert, idx) => (
          <div key={cert.id || idx} style={{ background: 'rgba(18, 21, 29, 0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-heading)' }}>
                VĂN BẰNG #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => removeCert(idx)}
                className="btn-danger"
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
              >
                <Trash2 size={14} /> Xóa
              </button>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Tên Chứng Chỉ / Bằng Khen *</label>
                <input
                  type="text"
                  className="form-input"
                  value={cert.title || ''}
                  onChange={(e) => handleCertChange(idx, 'title', e.target.value)}
                  placeholder="VD: Diploma Level 4 Computer Repair..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Đơn Vị Cấp (Issuer)</label>
                <input
                  type="text"
                  className="form-input"
                  value={cert.issuer || ''}
                  onChange={(e) => handleCertChange(idx, 'issuer', e.target.value)}
                  placeholder="VD: Trường Trung Cấp Thanh Bình..."
                />
              </div>
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Phân Loại</label>
                <select
                  className="form-select"
                  value={cert.category || 'academic'}
                  onChange={(e) => handleCertChange(idx, 'category', e.target.value)}
                >
                  <option value="academic">Bằng Cấp & Học Thuật</option>
                  <option value="technical">Kỹ Thuật & Phần Cứng</option>
                  <option value="award">Khen Thưởng & Thành Tích</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Năm / Thời Gian Cấp</label>
                <input
                  type="text"
                  className="form-input"
                  value={cert.date || ''}
                  onChange={(e) => handleCertChange(idx, 'date', e.target.value)}
                  placeholder="VD: 2025"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hình Ảnh Minh Họa (URL / Path)</label>
                <input
                  type="text"
                  className="form-input"
                  value={cert.image || ''}
                  onChange={(e) => handleCertChange(idx, 'image', e.target.value)}
                  placeholder="VD: /certs/diploma.png"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Mô Tả / Ý Nghĩa</label>
              <textarea
                className="form-textarea"
                style={{ minHeight: '60px' }}
                value={cert.description || ''}
                onChange={(e) => handleCertChange(idx, 'description', e.target.value)}
                placeholder="Mô tả kỹ năng đạt được hoặc thành tích..."
              />
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}

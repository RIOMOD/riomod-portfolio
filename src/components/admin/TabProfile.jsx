import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { User, Save, Plus, Trash2 } from 'lucide-react';

export default function TabProfile() {
  const { profile, updateProfile } = usePortfolioData();
  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleStatChange = (index, field, value) => {
    const updatedStats = [...(formData.stats || [])];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setFormData((prev) => ({ ...prev, stats: updatedStats }));
  };

  const addStat = () => {
    setFormData((prev) => ({
      ...prev,
      stats: [...(prev.stats || []), { label: 'Chỉ số mới', value: '00+' }]
    }));
  };

  const removeStat = (index) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={20} color="var(--accent-cyan)" />
          Hồ Sơ & Thông Tin Cá Nhân
        </h3>
        <button type="submit" className="btn-primary">
          <Save size={16} /> Lưu Thay Đổi
        </button>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label">Họ và Tên</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={formData.name || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Chức danh / Tiêu đề chính</label>
          <input
            type="text"
            name="title"
            className="form-input"
            value={formData.title || ''}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label">Tiêu đề phụ (Subtitle)</label>
          <input
            type="text"
            name="subtitle"
            className="form-input"
            value={formData.subtitle || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Trạng thái hiện tại</label>
          <input
            type="text"
            name="status"
            className="form-input"
            value={formData.status || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Tagline (Khẩu hiệu giới thiệu ngắn)</label>
        <textarea
          name="tagline"
          className="form-textarea"
          value={formData.tagline || ''}
          onChange={handleChange}
          style={{ minHeight: '70px' }}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Giới thiệu chi tiết (Bio)</label>
        <textarea
          name="bio"
          className="form-textarea"
          value={formData.bio || ''}
          onChange={handleChange}
          style={{ minHeight: '120px' }}
        />
      </div>

      <div style={{ marginTop: '2rem', marginBottom: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--accent-cyan)', marginBottom: '1rem' }}>
          Thông Tin Liên Hệ & Mạng Xã Hội
        </h4>
        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              className="form-input"
              value={formData.phone || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Địa chỉ / Khu vực</label>
            <input
              type="text"
              name="location"
              className="form-input"
              value={formData.location || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">GitHub URL</label>
            <input
              type="url"
              name="github"
              className="form-input"
              value={formData.github || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">LinkedIn URL</label>
            <input
              type="url"
              name="linkedin"
              className="form-input"
              value={formData.linkedin || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Facebook URL</label>
            <input
              type="url"
              name="facebook"
              className="form-input"
              value={formData.facebook || ''}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', marginBottom: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--accent-gold)' }}>
            Chỉ Số Thống Kê Nổi Bật (Stats)
          </h4>
          <button type="button" onClick={addStat} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
            <Plus size={14} /> Thêm chỉ số
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {(formData.stats || []).map((stat, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input
                type="text"
                className="form-input"
                style={{ width: '120px' }}
                placeholder="Giá trị (08+)"
                value={stat.value || ''}
                onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
              />
              <input
                type="text"
                className="form-input"
                style={{ flex: 1 }}
                placeholder="Mô tả chỉ số..."
                value={stat.label || ''}
                onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeStat(idx)}
                className="btn-danger"
                style={{ padding: '0.65rem' }}
                title="Xóa"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'right' }}>
        <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
          <Save size={18} /> Lưu Tất Cả Thay Đổi
        </button>
      </div>
    </form>
  );
}

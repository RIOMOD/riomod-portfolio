import React, { useState } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { Sparkles, Plus, Edit2, Trash2, Save, X, Calendar, MapPin, Tag } from 'lucide-react';

const emptyEvent = {
  id: '',
  title: '',
  role: 'MC & Hoạt náo viên',
  category: 'mc',
  date: '',
  location: '',
  organization: '',
  description: '',
  image: '',
  gallery: [],
  scale: '',
  highlights: []
};

export default function TabEvents() {
  const { events, eventCategories, addEvent, updateEvent, deleteEvent } = usePortfolioData();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(emptyEvent);
  const [highlightsInput, setHighlightsInput] = useState('');
  const [galleryInput, setGalleryInput] = useState('');

  const startEdit = (evt) => {
    setEditingId(evt.id);
    setIsAdding(false);
    setFormData(evt);
    setHighlightsInput((evt.highlights || []).join('\n'));
    setGalleryInput((evt.gallery || []).join(', '));
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ ...emptyEvent, id: `evt_${Date.now()}` });
    setHighlightsInput('');
    setGalleryInput('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(emptyEvent);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const finalEvent = {
      ...formData,
      highlights: highlightsInput ? highlightsInput.split('\n').map((h) => h.trim()).filter(Boolean) : [],
      gallery: galleryInput ? galleryInput.split(',').map((g) => g.trim()).filter(Boolean) : []
    };

    if (isAdding) {
      addEvent(finalEvent);
    } else {
      updateEvent(editingId, finalEvent);
    }
    cancelEdit();
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sự kiện "${title}"?`)) {
      deleteEvent(id);
      if (editingId === id) cancelEdit();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} color="var(--accent-purple)" />
            Quản Lý Sự Kiện & Hoạt Động Truyền Thông ({events.length})
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Quản lý các chương trình MC, Talkshow, Workshop, Lễ Khai giảng và Truyền thông
          </span>
        </div>
        {!isAdding && !editingId && (
          <button type="button" onClick={startAdd} className="btn-primary">
            <Plus size={16} /> Thêm Sự Kiện Mới
          </button>
        )}
      </div>

      {/* Form Add / Edit */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSave} style={{ background: 'rgba(18, 21, 29, 0.95)', border: '1px solid var(--accent-purple)', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-purple)', fontFamily: 'var(--font-heading)' }}>
              {isAdding ? 'Thêm Sự Kiện Mới' : `Chỉnh Sửa Sự Kiện: ${formData.title}`}
            </h4>
            <button type="button" onClick={cancelEdit} className="btn-secondary" style={{ padding: '0.35rem 0.75rem' }}>
              <X size={16} /> Đóng
            </button>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Tên Chương Trình / Sự Kiện *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="VD: Lễ Khai Giảng Khóa Học..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Vai Trò Đảm Nhận *</label>
              <input
                type="text"
                name="role"
                className="form-input"
                value={formData.role}
                onChange={handleChange}
                required
                placeholder="VD: MC Chính & Hoạt náo viên..."
              />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">Phân Loại Sự Kiện</label>
              <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
                {(eventCategories || [
                  { id: 'mc', label: 'MC & Hoạt Náo' },
                  { id: 'workshop', label: 'Hội Thảo & Workshop' },
                  { id: 'ceremony', label: 'Lễ Kỷ Niệm / Khai Giảng' },
                  { id: 'media', label: 'Truyền Thông & Sản Xuất' }
                ]).map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Thời Gian (Date)</label>
              <input
                type="text"
                name="date"
                className="form-input"
                value={formData.date}
                onChange={handleChange}
                placeholder="VD: 10/2025 hoặc 2025"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Quy Mô Khách Mời (Scale)</label>
              <input
                type="text"
                name="scale"
                className="form-input"
                value={formData.scale || ''}
                onChange={handleChange}
                placeholder="VD: 300+ Sinh viên & Khách mời"
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Đơn Vị Tổ Chức</label>
              <input
                type="text"
                name="organization"
                className="form-input"
                value={formData.organization || ''}
                onChange={handleChange}
                placeholder="VD: Rikkei Education / PTIT..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Địa Điểm Tổ Chức</label>
              <input
                type="text"
                name="location"
                className="form-input"
                value={formData.location || ''}
                onChange={handleChange}
                placeholder="VD: Hội trường lớn, TP.HCM..."
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Hình Ảnh Đại Diện (URL / Path)</label>
            <input
              type="text"
              name="image"
              className="form-input"
              value={formData.image || ''}
              onChange={handleChange}
              placeholder="VD: https://... hoặc /assets/..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mô Tả Chi Tiết Sự Kiện</label>
            <textarea
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả nội dung, không khí và kết quả đạt được..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Điểm Nhấn / Thành Tích Nổi Bật (Mỗi dòng một mục)</label>
            <textarea
              className="form-textarea"
              value={highlightsInput}
              onChange={(e) => setHighlightsInput(e.target.value)}
              placeholder="Điều phối thành công kịch bản 3 tiếng...&#10;Tạo không khí hào hứng với minigame..."
              style={{ minHeight: '80px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={cancelEdit} className="btn-secondary">
              Hủy bỏ
            </button>
            <button type="submit" className="btn-primary">
              <Save size={16} /> Lưu Sự Kiện
            </button>
          </div>
        </form>
      )}

      {/* Events List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {events.map((evt) => (
          <div key={evt.id} className="admin-card">
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flex: 1, overflow: 'hidden' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '6px', background: 'rgba(157,78,221,0.12)', border: '1px solid rgba(157,78,221,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Sparkles size={22} color="var(--accent-purple)" />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '0.98rem', color: '#fff', fontFamily: 'var(--font-heading)' }}>
                    {evt.title}
                  </h4>
                  <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', color: 'var(--accent-cyan)' }}>
                    {evt.role}
                  </span>
                  {evt.date && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                      ● {evt.date}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '0.25rem' }}>
                  {evt.organization ? `${evt.organization} — ` : ''}{evt.description}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
              <button
                type="button"
                onClick={() => startEdit(evt)}
                className="btn-secondary"
                style={{ padding: '0.45rem 0.75rem' }}
                title="Chỉnh sửa"
              >
                <Edit2 size={15} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(evt.id, evt.title)}
                className="btn-danger"
                style={{ padding: '0.45rem 0.75rem' }}
                title="Xóa sự kiện"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

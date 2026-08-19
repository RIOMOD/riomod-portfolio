import React, { useState } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { Layers, Plus, Edit2, Trash2, Save, X, ExternalLink, Code, Film, Cpu } from 'lucide-react';

const emptyProject = {
  id: '',
  domain: 'code',
  domainName: 'Dự Án Code',
  status: 'Đã hoàn thành',
  title: '',
  category: 'Web Application',
  subtitle: '',
  description: '',
  image: '',
  tags: [],
  liveUrl: '',
  githubUrl: '',
  featured: true,
  year: new Date().getFullYear().toString(),
  significance: [],
  architecture: []
};

export default function TabProjects() {
  const { projects, projectDomains, addProject, updateProject, deleteProject } = usePortfolioData();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(emptyProject);
  const [tagsInput, setTagsInput] = useState('');
  const [significanceInput, setSignificanceInput] = useState('');
  const [architectureInput, setArchitectureInput] = useState('');

  const startEdit = (proj) => {
    setEditingId(proj.id);
    setIsAdding(false);
    setFormData(proj);
    setTagsInput((proj.tags || []).join(', '));
    setSignificanceInput((proj.significance || []).join('\n'));
    setArchitectureInput((proj.architecture || []).join('\n'));
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ ...emptyProject, id: `proj_${Date.now()}` });
    setTagsInput('');
    setSignificanceInput('');
    setArchitectureInput('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(emptyProject);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const finalProject = {
      ...formData,
      tags: tagsInput ? tagsInput.split(',').map((t) => t.trim()).filter(Boolean) : [],
      significance: significanceInput ? significanceInput.split('\n').map((s) => s.trim()).filter(Boolean) : [],
      architecture: architectureInput ? architectureInput.split('\n').map((a) => a.trim()).filter(Boolean) : []
    };

    if (isAdding) {
      addProject(finalProject);
    } else {
      updateProject(editingId, finalProject);
    }
    cancelEdit();
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa dự án "${title}"?`)) {
      deleteProject(id);
      if (editingId === id) cancelEdit();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} color="var(--accent-cyan)" />
            Quản Lý Danh Mục Dự Án ({projects.length})
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Thêm, chỉnh sửa hoặc xóa các dự án thuộc các mảng Code, Media, Kỹ thuật
          </span>
        </div>
        {!isAdding && !editingId && (
          <button type="button" onClick={startAdd} className="btn-primary">
            <Plus size={16} /> Thêm Dự Án Mới
          </button>
        )}
      </div>

      {/* Form Add / Edit */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSave} style={{ background: 'rgba(18, 21, 29, 0.95)', border: '1px solid var(--accent-cyan)', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-heading)' }}>
              {isAdding ? 'Thêm Dự Án Mới' : `Chỉnh Sửa Dự Án: ${formData.title}`}
            </h4>
            <button type="button" onClick={cancelEdit} className="btn-secondary" style={{ padding: '0.35rem 0.75rem' }}>
              <X size={16} /> Đóng
            </button>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Tên Dự Án *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="VD: RIKKEI ACADEMIC PORTAL"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phân Mảng Chuyên Môn</label>
              <select
                name="domain"
                className="form-select"
                value={formData.domain}
                onChange={(e) => {
                  const val = e.target.value;
                  const domObj = projectDomains.find((d) => d.id === val);
                  setFormData((prev) => ({
                    ...prev,
                    domain: val,
                    domainName: domObj ? domObj.name : 'Dự Án'
                  }));
                }}
              >
                <option value="code">Dự Án Code & Software</option>
                <option value="media">Dự Án Media & Design</option>
                <option value="support">Kỹ Thuật & Tư Vấn Sales</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Thể loại (Category)</label>
              <input
                type="text"
                name="category"
                className="form-input"
                value={formData.category}
                onChange={handleChange}
                placeholder="VD: Code & EdTech Portal"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Trạng thái</label>
              <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                <option value="Đã hoàn thành">Đã hoàn thành</option>
                <option value="Đang phát triển">Đang phát triển</option>
                <option value="Đang vận hành">Đang vận hành</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tiêu đề phụ / Tóm tắt 1 câu</label>
            <input
              type="text"
              name="subtitle"
              className="form-input"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="VD: Cổng thông tin học thuật trực tuyến một cửa..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mô tả dự án đầy đủ</label>
            <textarea
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết bài toán, giải pháp và kết quả..."
            />
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">Hình ảnh minh họa (URL / Path)</label>
              <input
                type="text"
                name="image"
                className="form-input"
                value={formData.image || ''}
                onChange={handleChange}
                placeholder="/rikkei-portal.png hoặc https://..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Link Trực Tuyến (Live URL)</label>
              <input
                type="text"
                name="liveUrl"
                className="form-input"
                value={formData.liveUrl || ''}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Link GitHub Repository</label>
              <input
                type="text"
                name="githubUrl"
                className="form-input"
                value={formData.githubUrl || ''}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tags Công nghệ / Kỹ năng (cách nhau bằng dấu phẩy)</label>
            <input
              type="text"
              className="form-input"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="React 19, TypeScript, Vite, CSS..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Ý Nghĩa & Điểm Nổi Bật (Mỗi dòng là một gạch đầu dòng)</label>
            <textarea
              className="form-textarea"
              value={significanceInput}
              onChange={(e) => setSignificanceInput(e.target.value)}
              placeholder="Chuẩn hóa & Số hóa quản lý...&#10;Tăng cường trải nghiệm bảo mật..."
              style={{ minHeight: '80px' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kiến Trúc & Công Nghệ Chi Tiết (Mỗi dòng một mục)</label>
            <textarea
              className="form-textarea"
              value={architectureInput}
              onChange={(e) => setArchitectureInput(e.target.value)}
              placeholder="Built với React 19...&#10;Backend Node.js Express..."
              style={{ minHeight: '80px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={cancelEdit} className="btn-secondary">
              Hủy bỏ
            </button>
            <button type="submit" className="btn-primary">
              <Save size={16} /> Lưu Dự Án
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {projects.map((proj) => (
          <div key={proj.id} className="admin-card">
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flex: 1, overflow: 'hidden' }}>
              {proj.image ? (
                <img
                  src={proj.image}
                  alt={proj.title}
                  style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div style={{ width: '64px', height: '64px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {proj.domain === 'code' ? <Code size={24} color="var(--accent-cyan)" /> : proj.domain === 'media' ? <Film size={24} color="var(--accent-purple)" /> : <Cpu size={24} color="var(--accent-gold)" />}
                </div>
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '1rem', color: '#fff', fontFamily: 'var(--font-heading)' }}>
                    {proj.title}
                  </h4>
                  <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}>
                    {proj.category}
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: proj.status === 'Đã hoàn thành' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: proj.status === 'Đã hoàn thành' ? 'var(--accent-green)' : 'var(--accent-gold)' }}>
                    {proj.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '0.25rem' }}>
                  {proj.subtitle || proj.description}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
              <button
                type="button"
                onClick={() => startEdit(proj)}
                className="btn-secondary"
                style={{ padding: '0.45rem 0.75rem' }}
                title="Chỉnh sửa"
              >
                <Edit2 size={15} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(proj.id, proj.title)}
                className="btn-danger"
                style={{ padding: '0.45rem 0.75rem' }}
                title="Xóa dự án"
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

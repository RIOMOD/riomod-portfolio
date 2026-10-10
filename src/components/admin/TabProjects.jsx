import React, { useState } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { 
  Layers, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  ExternalLink, 
  Eye, 
  ArrowUp, 
  ArrowDown, 
  GripVertical, 
  Upload, 
  Image, 
  Film, 
  RotateCcw, 
  CheckCircle2, 
  Star 
} from 'lucide-react';
import { GithubIcon } from '../widgets/BrandIcons';

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
  videoUrl: '',
  tags: [],
  liveUrl: '',
  githubUrl: '',
  featured: true,
  year: new Date().getFullYear().toString(),
  significance: [],
  architecture: []
};

export default function TabProjects() {
  const { 
    projects, 
    projectDomains, 
    addProject, 
    updateProject, 
    deleteProject, 
    reorderProjects, 
    deleteAllProjects, 
    resetProjects, 
    showToast 
  } = usePortfolioData();

  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [previewProject, setPreviewProject] = useState(null);
  const [formData, setFormData] = useState(emptyProject);
  const [tagsInput, setTagsInput] = useState('');
  const [significanceInput, setSignificanceInput] = useState('');
  const [architectureInput, setArchitectureInput] = useState('');

  // Drag and drop state
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

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

  // Image Upload helper
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        image: event.target.result
      }));
      showToast('Đã nạp ảnh dự án!');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Vui lòng nhập tiêu đề dự án!', 'error');
      return;
    }

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

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragOverIdx !== index) setDragOverIdx(index);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIdx !== null && draggedIdx !== targetIndex) {
      reorderProjects(draggedIdx, targetIndex);
    }
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  return (
    <div>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem', margin: 0 }}>
            <Layers size={22} color="var(--accent-cyan)" />
            QUẢN LÝ DANH MỤC DỰ ÁN ({projects.length})
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.3rem', display: 'block' }}>
            Thêm mới, sửa, xóa, xem trước chi tiết và kéo thả sắp xếp thứ tự hiển thị của các dự án.
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button type="button" onClick={startAdd} className="btn-primary" style={{ padding: '0.55rem 1.1rem' }}>
            <Plus size={16} /> Thêm Dự Án Mới
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              if (window.confirm('Khôi phục danh sách dự án về dữ liệu mặc định ban đầu?')) {
                resetProjects();
              }
            }}
            title="Khôi phục các dự án mặc định"
          >
            <RotateCcw size={15} /> Khôi Phục Gốc
          </button>

          {projects.length > 0 && (
            <button
              type="button"
              className="btn-danger"
              onClick={() => {
                if (window.confirm('CẢNH BÁO: Bạn có chắc chắn muốn XÓA TOÀN BỘ các dự án hiện có?')) {
                  deleteAllProjects();
                }
              }}
              title="Xóa toàn bộ dự án"
            >
              <Trash2 size={15} /> Xóa Toàn Bộ
            </button>
          )}
        </div>
      </div>

      {/* FORM: Thêm / Chỉnh sửa dự án */}
      {(isAdding || editingId) && (
        <div style={{ background: 'rgba(20, 24, 36, 0.95)', border: '1px solid rgba(157, 78, 221, 0.4)', borderRadius: '14px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
            <h4 style={{ fontSize: '1.15rem', color: '#c084fc', margin: 0, fontFamily: 'var(--font-heading)' }}>
              {isAdding ? 'Thêm Dự Án Mới' : `Chỉnh Sửa Dự Án: ${formData.title}`}
            </h4>
            <button type="button" onClick={cancelEdit} className="btn-secondary" style={{ padding: '0.4rem 0.75rem' }}>
              <X size={16} /> Hủy
            </button>
          </div>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-grid-3">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Lĩnh Vực (Domain):</label>
                <select name="domain" value={formData.domain} onChange={handleChange} className="form-select">
                  <option value="code">Dự Án Code & Ứng Dụng</option>
                  <option value="media">Sản Xuất Media & MC Sự Kiện</option>
                  <option value="it">Hạ Tầng Kỹ Thuật & Phần Cứng</option>
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Phân Loại (Category):</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category || ''}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="VD: Web Application, Mobile App..."
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Năm Thực Hiện:</label>
                <input
                  type="text"
                  name="year"
                  value={formData.year || ''}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="VD: 2026"
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Tiêu Đề Dự Án:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Nhập tiêu đề dự án..."
                  required
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Tiêu Đề Phụ (Subtitle):</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle || ''}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="VD: Hệ Thống Quản Lý Đào Tạo Toàn Diện"
                />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Mô Tả Chi Tiết:</label>
              <textarea
                name="description"
                rows={3}
                value={formData.description || ''}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Mô tả mục tiêu, bài toán giải quyết và giá trị của dự án..."
              />
            </div>

            {/* Media: Image & Video */}
            <div className="form-grid-2">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Ảnh Bìa Dự Án (Image URL hoặc Tải Lên):</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image || ''}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://.../thumbnail.jpg"
                />
                <div style={{ marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}
                  />
                  {formData.image && (
                    <span style={{ fontSize: '0.75rem', color: '#06d6a0' }}>✓ Đã có ảnh</span>
                  )}
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Link Video Demo (YouTube / MP4):</label>
                <input
                  type="text"
                  name="videoUrl"
                  value={formData.videoUrl || ''}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="VD: https://youtube.com/watch?v=..."
                />
              </div>
            </div>

            {/* Links */}
            <div className="form-grid-2">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Link Live Demo (Trang Web):</label>
                <input
                  type="text"
                  name="liveUrl"
                  value={formData.liveUrl || ''}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://yourproject.com"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Link GitHub Repository:</label>
                <input
                  type="text"
                  name="githubUrl"
                  value={formData.githubUrl || ''}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://github.com/RIOMOD/..."
                />
              </div>
            </div>

            {/* Tags & Architecture */}
            <div className="form-grid-2">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Tags Công Nghệ (Phân tách bằng dấu phẩy):</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="form-input"
                  placeholder="React, Node.js, PostgreSQL, TailwindCSS"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Trạng Thái & Nổi Bật:</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', height: '42px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fff', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={!!formData.featured}
                      onChange={handleChange}
                    />
                    Dự án tiêu biểu (Featured)
                  </label>
                </div>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Điểm Nhấn / Giá Trị Mang Lại (Mỗi dòng 1 ý):</label>
                <textarea
                  rows={3}
                  value={significanceInput}
                  onChange={(e) => setSignificanceInput(e.target.value)}
                  className="form-textarea"
                  placeholder="Tăng 40% hiệu suất xử lý..."
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Kiến Trúc Kỹ Thuật (Mỗi dòng 1 ý):</label>
                <textarea
                  rows={3}
                  value={architectureInput}
                  onChange={(e) => setArchitectureInput(e.target.value)}
                  className="form-textarea"
                  placeholder="Client-Server architecture, Microservices..."
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="button" onClick={cancelEdit} className="btn-secondary">
                Hủy Bỏ
              </button>
              <button type="submit" className="btn-primary" style={{ padding: '0.7rem 1.5rem' }}>
                <Save size={16} /> {isAdding ? 'Thêm Dự Án' : 'Lưu Thay Đổi'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DANH SÁCH DỰ ÁN CÓ KÉO THẢ SẮP XẾP */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            THỨ TỰ HIỂN THỊ DỰ ÁN TRÊN TRANG ({projects.length})
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            💡 Kéo thanh bên trái hoặc bấm mũi tên Lên/Xuống để đổi vị trí
          </span>
        </div>

        {projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(18, 22, 32, 0.5)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Chưa có dự án nào trong danh mục.</p>
            <button type="button" onClick={startAdd} className="btn-primary">
              <Plus size={16} /> Thêm Dự Án Đầu Tiên
            </button>
          </div>
        ) : (
          projects.map((proj, idx) => {
            const isDragging = draggedIdx === idx;
            const isOver = dragOverIdx === idx;

            return (
              <div
                key={proj.id || idx}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={(e) => handleDrop(e, idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  background: isDragging 
                    ? 'rgba(157, 78, 221, 0.25)' 
                    : isOver 
                    ? 'rgba(6, 214, 160, 0.15)' 
                    : 'rgba(18, 22, 32, 0.85)',
                  border: isOver
                    ? '2px dashed #06d6a0'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  gap: '1rem',
                  transition: 'all 0.15s ease'
                }}
              >
                {/* Drag Handle & Project Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0, flex: 1 }}>
                  <div style={{ cursor: 'grab', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }} title="Kéo thả đổi vị trí">
                    <GripVertical size={20} />
                  </div>

                  <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-dim)', width: '22px' }}>
                    #{idx + 1}
                  </span>

                  {/* Thumbnail */}
                  <div style={{
                    width: '64px',
                    height: '48px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    background: '#0d1017',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {proj.image ? (
                      <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Image size={20} color="var(--text-muted)" />
                    )}
                  </div>

                  {/* Project details */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>
                        {proj.title}
                      </span>
                      {proj.featured && (
                        <span style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(255, 183, 3, 0.2)', color: '#ffb703', display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <Star size={10} fill="#ffb703" /> Tiêu biểu
                        </span>
                      )}
                      <span style={{ fontSize: '0.68rem', padding: '0.1rem 0.45rem', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
                        {proj.domain === 'code' ? 'Code' : proj.domain === 'media' ? 'Media' : 'Kỹ thuật'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {proj.subtitle || proj.description || 'Chưa có mô tả ngắn'}
                    </div>
                  </div>
                </div>

                {/* Actions: Reorder, View Preview, Edit, Delete */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => reorderProjects(idx, idx - 1)}
                    className="btn-secondary"
                    style={{ padding: '0.35rem', opacity: idx === 0 ? 0.3 : 1 }}
                    title="Di chuyển lên trên"
                  >
                    <ArrowUp size={15} />
                  </button>

                  <button
                    type="button"
                    disabled={idx === projects.length - 1}
                    onClick={() => reorderProjects(idx, idx + 1)}
                    className="btn-secondary"
                    style={{ padding: '0.35rem', opacity: idx === projects.length - 1 ? 0.3 : 1 }}
                    title="Di chuyển xuống dưới"
                  >
                    <ArrowDown size={15} />
                  </button>

                  {/* View Preview Button */}
                  <button
                    type="button"
                    onClick={() => setPreviewProject(proj)}
                    className="btn-secondary"
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', color: '#06d6a0', borderColor: 'rgba(6, 214, 160, 0.3)' }}
                    title="Xem trước dự án như trên trang chủ"
                  >
                    <Eye size={15} /> Xem Trước
                  </button>

                  <button
                    type="button"
                    onClick={() => startEdit(proj)}
                    className="btn-secondary"
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                    title="Chỉnh sửa thông tin"
                  >
                    <Edit2 size={14} /> Sửa
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(proj.id, proj.title)}
                    className="btn-danger"
                    style={{ padding: '0.45rem' }}
                    title="Xóa dự án"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL: LIVE PREVIEW DỰ ÁN */}
      {previewProject && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 6000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#11141e',
            border: '1px solid rgba(6, 214, 160, 0.4)',
            borderRadius: '16px',
            maxWidth: '750px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2.5rem 2rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.9)',
            position: 'relative'
          }}>
            <button
              type="button"
              onClick={() => setPreviewProject(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                padding: '0.5rem',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex'
              }}
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'rgba(6, 214, 160, 0.15)', color: '#06d6a0', fontWeight: 600 }}>
                  {previewProject.category || 'Dự án'}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  Năm {previewProject.year || '2026'}
                </span>
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', fontFamily: 'var(--font-heading)', margin: '0 0 0.5rem 0' }}>
                {previewProject.title}
              </h3>
              {previewProject.subtitle && (
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
                  {previewProject.subtitle}
                </p>
              )}
            </div>

            {/* Media: Image or Video */}
            {previewProject.image && (
              <div style={{ width: '100%', height: '280px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src={previewProject.image} alt={previewProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}

            {/* Video preview if available */}
            {previewProject.videoUrl && (
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="form-label">Video Demo:</span>
                <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', fontSize: '0.85rem' }}>
                  <a href={previewProject.videoUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#06d6a0', display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
                    <Film size={16} /> Mở xem video demo: {previewProject.videoUrl} <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            )}

            {/* Description */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="form-label">Mô tả dự án:</span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                {previewProject.description || 'Chưa có mô tả chi tiết.'}
              </p>
            </div>

            {/* Tags */}
            {previewProject.tags && previewProject.tags.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="form-label">Công nghệ sử dụng:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {previewProject.tags.map((tag, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: '#c084fc', border: '1px solid rgba(157,78,221,0.2)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {previewProject.liveUrl && (
                <a href={previewProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
                  <ExternalLink size={15} /> Xem Trực Tuyến Live Demo
                </a>
              )}
              {previewProject.githubUrl && (
                <a href={previewProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration: 'none' }}>
                  <GithubIcon size={16} /> Xem Mã Nguồn GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

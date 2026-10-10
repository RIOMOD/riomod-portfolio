import React, { useState } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { 
  GripVertical, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  Settings2, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  Sparkles, 
  LayoutGrid, 
  Music, 
  Cpu, 
  Quote, 
  Share2, 
  Coffee,
  Database,
  Cloud
} from 'lucide-react';
import { GithubIcon } from '../widgets/BrandIcons';

const WIDGET_CATALOG = [
  {
    widgetType: 'github_stats',
    name: 'GitHub Activity & Stats',
    description: 'Hiển thị thẻ chỉ số GitHub, repositories nổi bật và thống kê commits trực quan.',
    icon: <GithubIcon size={20} color="#06d6a0" />,
    defaultConfig: {
      title: 'HOẠT ĐỘNG GITHUB & MÃ NGUỒN MỞ',
      username: 'RIOMOD'
    }
  },
  {
    widgetType: 'music_player',
    name: 'Lo-Fi Music Player Bar',
    description: 'Trình phát nhạc nền chill / coding beats thư giãn với visualizer sóng âm thanh sống động.',
    icon: <Music size={20} color="#c084fc" />,
    defaultConfig: {
      title: 'AUDIO VIBES WIDGET'
    }
  },
  {
    widgetType: 'tech_matrix',
    name: 'Interactive Tech Matrix',
    description: 'Bảng radar kỹ năng tương tác với bộ lọc ngành và thanh đo lường mức độ thành thạo.',
    icon: <Cpu size={20} color="#38bdf8" />,
    defaultConfig: {
      title: 'MA TRẬN KỸ NĂNG & NĂNG LỰC CÔNG NGHỆ'
    }
  },
  {
    widgetType: 'quote_banner',
    name: 'Triết Lý Sống & Phương Châm',
    description: 'Banner trích dẫn triết lý nghề nghiệp và đạo đức làm việc với viền phát sáng ấn tượng.',
    icon: <Quote size={20} color="#f59e0b" />,
    defaultConfig: {
      badge: 'TRIẾT LÝ HÀNH ĐỘNG & NGHỀ NGHIỆP',
      quote: 'Công nghệ tạo ra giải pháp, nhưng sự thấu hiểu và tận tâm mới là cầu nối bền vững nhất giữa con người với con người.',
      author: 'Nguyễn Công Trứ'
    }
  },
  {
    widgetType: 'quick_cta',
    name: 'Quick Booking & Coffee Chat',
    description: 'Khối kêu gọi hành động (CTA) đặt lịch trò chuyện, gửi email hoặc trao đổi cơ hội hợp tác.',
    icon: <Coffee size={20} color="#10b981" />,
    defaultConfig: {
      title: 'Sẵn sàng mở rộng cơ hội & trao đổi hợp tác?',
      subtitle: 'Tôi luôn sẵn lòng tiếp nhận cơ hội thực tập, dự án tư vấn EdTech hoặc những buổi trò chuyện cafe trao đổi chuyên môn.',
      buttonText: 'Gửi Tin Nhắn Hợp Tác Ngay'
    }
  },
  {
    widgetType: 'social_connect',
    name: 'Social Network Connect Grid',
    description: 'Lưới liên kết nhanh các kênh mạng xã hội GitHub, LinkedIn, Facebook, Email trực tiếp.',
    icon: <Share2 size={20} color="#a855f7" />,
    defaultConfig: {
      title: 'MẠNG XÃ HỘI & KÊNH LIÊN LẠC TRỰC TUYẾN'
    }
  }
];

export default function TabWidgetsLayout() {
  const { 
    layout, 
    updateLayout, 
    toggleLayoutItem, 
    moveLayoutItem, 
    addWidget, 
    removeWidget, 
    updateWidgetConfig, 
    resetLayout,
    cloudSyncStatus,
    syncToCloud,
    showToast 
  } = usePortfolioData();

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingWidget, setEditingWidget] = useState(null);
  const [editFormConfig, setEditFormConfig] = useState({});

  // Drag and Drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      moveLayoutItem(draggedIndex, targetIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Open edit modal for a widget
  const handleOpenConfig = (item) => {
    setEditingWidget(item);
    setEditFormConfig(item.config || {});
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    if (editingWidget) {
      updateWidgetConfig(editingWidget.id, editFormConfig);
      setEditingWidget(null);
    }
  };

  return (
    <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner and Quick Actions */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.15) 0%, rgba(6, 214, 160, 0.08) 100%)',
        border: '1px solid rgba(157, 78, 221, 0.3)',
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <LayoutGrid size={18} color="#c084fc" />
            <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, fontFamily: 'var(--font-heading)' }}>
              QUẢN LÝ BỐ CỤC TRANG & WIDGETS
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
            Kéo thả hoặc dùng nút mũi tên để đổi vị trí, bật/tắt hiển thị, cấu hình và thêm các widget tương tác theo ý muốn.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setIsAddModalOpen(true)}
            style={{ padding: '0.55rem 1rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Plus size={16} /> Thêm Widget Mới
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn khôi phục bố cục và vị trí widgets về trạng thái mặc định ban đầu?')) {
                resetLayout();
              }
            }}
            style={{ padding: '0.55rem 0.9rem', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            title="Khôi phục bố cục mặc định"
          >
            <RotateCcw size={15} /> Khôi Phục Gốc
          </button>

          {syncToCloud && (
            <button
              type="button"
              className="btn-secondary"
              onClick={syncToCloud}
              style={{
                padding: '0.55rem 0.9rem',
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                borderColor: cloudSyncStatus === 'synced' ? 'rgba(6, 214, 160, 0.4)' : undefined
              }}
              title="Đồng bộ ngay với cơ sở dữ liệu Neon Cloud"
            >
              <Cloud size={15} color={cloudSyncStatus === 'synced' ? '#06d6a0' : '#c084fc'} />
              <span>{cloudSyncStatus === 'synced' ? 'Neon Synced' : 'Đồng Bộ Cloud'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Layout List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            DANH SÁCH KHỐI GIAO DIỆN ({layout.length} MỤC)
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            💡 Kéo thanh bên trái hoặc bấm mũi tên Lên/Xuống
          </span>
        </div>

        {layout.map((item, index) => {
          const isDragging = draggedIndex === index;
          const isOver = dragOverIndex === index;
          const isSection = item.type === 'section';

          return (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                background: isDragging 
                  ? 'rgba(157, 78, 221, 0.25)' 
                  : isOver 
                  ? 'rgba(6, 214, 160, 0.15)' 
                  : item.enabled 
                  ? 'rgba(18, 22, 32, 0.9)' 
                  : 'rgba(12, 14, 20, 0.5)',
                border: isOver
                  ? '2px dashed #06d6a0'
                  : item.enabled
                  ? '1px solid rgba(255, 255, 255, 0.08)'
                  : '1px solid rgba(255, 255, 255, 0.03)',
                boxShadow: isDragging ? '0 10px 30px rgba(0,0,0,0.8)' : 'none',
                opacity: isDragging ? 0.5 : item.enabled ? 1 : 0.6,
                transition: 'all 0.15s ease',
                gap: '1rem'
              }}
            >
              {/* Drag Handle & Order */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div 
                  style={{ cursor: 'grab', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
                  title="Nhấn và giữ để kéo thả"
                >
                  <GripVertical size={18} />
                </div>

                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  color: 'var(--text-dim)',
                  width: '24px',
                  textAlign: 'center'
                }}>
                  #{index + 1}
                </span>

                {/* Badge Type */}
                <span style={{
                  fontSize: '0.68rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  background: isSection ? 'rgba(59, 130, 246, 0.15)' : 'rgba(168, 85, 247, 0.2)',
                  color: isSection ? '#60a5fa' : '#c084fc',
                  border: isSection ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(168, 85, 247, 0.3)'
                }}>
                  {isSection ? 'SECTION' : 'WIDGET'}
                </span>

                {/* Title */}
                <div>
                  <div style={{ fontSize: '0.9rem', color: item.enabled ? '#fff' : 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {item.name}
                    {!item.enabled && <span style={{ fontSize: '0.7rem', color: '#ef4444' }}>(Đang ẩn)</span>}
                  </div>
                  {item.config?.title && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      Tiêu đề: {item.config.title}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {/* Move Up */}
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveLayoutItem(index, index - 1)}
                  className="btn-secondary"
                  style={{
                    padding: '0.35rem',
                    borderRadius: '6px',
                    opacity: index === 0 ? 0.3 : 1,
                    cursor: index === 0 ? 'not-allowed' : 'pointer'
                  }}
                  title="Di chuyển lên trên"
                >
                  <ArrowUp size={15} />
                </button>

                {/* Move Down */}
                <button
                  type="button"
                  disabled={index === layout.length - 1}
                  onClick={() => moveLayoutItem(index, index + 1)}
                  className="btn-secondary"
                  style={{
                    padding: '0.35rem',
                    borderRadius: '6px',
                    opacity: index === layout.length - 1 ? 0.3 : 1,
                    cursor: index === layout.length - 1 ? 'not-allowed' : 'pointer'
                  }}
                  title="Di chuyển xuống dưới"
                >
                  <ArrowDown size={15} />
                </button>

                {/* Toggle Visibility */}
                <button
                  type="button"
                  onClick={() => toggleLayoutItem(item.id)}
                  className="btn-secondary"
                  style={{
                    padding: '0.35rem 0.65rem',
                    borderRadius: '6px',
                    color: item.enabled ? '#06d6a0' : '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.75rem'
                  }}
                  title={item.enabled ? 'Ẩn mục này khỏi giao diện' : 'Hiển thị mục này'}
                >
                  {item.enabled ? <Eye size={15} /> : <EyeOff size={15} />}
                  <span>{item.enabled ? 'Hiện' : 'Ẩn'}</span>
                </button>

                {/* Configure Button (for widgets) */}
                {item.type === 'widget' && (
                  <button
                    type="button"
                    onClick={() => handleOpenConfig(item)}
                    className="btn-secondary"
                    style={{ padding: '0.35rem', borderRadius: '6px' }}
                    title="Cấu hình thuộc tính widget"
                  >
                    <Settings2 size={15} color="#c084fc" />
                  </button>
                )}

                {/* Remove button (if removable widget) */}
                {item.isRemovable && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Bạn có chắc muốn xóa widget "${item.name}"?`)) {
                        removeWidget(item.id);
                      }
                    }}
                    className="btn-secondary"
                    style={{ padding: '0.35rem', borderRadius: '6px', color: '#ef4444' }}
                    title="Xóa widget khỏi trang"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add Widget Catalog */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 6000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#11141e',
            border: '1px solid rgba(157, 78, 221, 0.4)',
            borderRadius: '16px',
            maxWidth: '650px',
            width: '100%',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '2rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.9)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={20} color="#06d6a0" />
                <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  THÊM WIDGET VÀO TRANG
                </h3>
              </div>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsAddModalOpen(false)}
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
              >
                Đóng
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {WIDGET_CATALOG.map((w) => (
                <div
                  key={w.widgetType}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.2rem',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {w.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>
                        {w.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        {w.description}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      addWidget(w);
                      setIsAddModalOpen(false);
                    }}
                    style={{ padding: '0.5rem 0.95rem', fontSize: '0.8rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Plus size={14} /> Thêm
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit Widget Config */}
      {editingWidget && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 6000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#11141e',
            border: '1px solid rgba(157, 78, 221, 0.4)',
            borderRadius: '16px',
            maxWidth: '550px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.9)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Settings2 size={20} color="#c084fc" />
                <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  CẤU HÌNH WIDGET: {editingWidget.name}
                </h3>
              </div>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setEditingWidget(null)}
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
              >
                Hủy
              </button>
            </div>

            <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Tiêu đề */}
              <div className="form-group">
                <label className="form-label">Tiêu đề Widget:</label>
                <input
                  type="text"
                  className="form-input"
                  value={editFormConfig.title || ''}
                  onChange={(e) => setEditFormConfig({ ...editFormConfig, title: e.target.value })}
                  placeholder="Nhập tiêu đề hiển thị..."
                />
              </div>

              {/* GitHub specific username */}
              {editingWidget.widgetType === 'github_stats' && (
                <div className="form-group">
                  <label className="form-label">GitHub Username:</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editFormConfig.username || ''}
                    onChange={(e) => setEditFormConfig({ ...editFormConfig, username: e.target.value })}
                    placeholder="e.g. RIOMOD"
                  />
                </div>
              )}

              {/* Quote specific */}
              {editingWidget.widgetType === 'quote_banner' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Nội dung câu trích dẫn:</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      value={editFormConfig.quote || ''}
                      onChange={(e) => setEditFormConfig({ ...editFormConfig, quote: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tác giả / Tên người trích dẫn:</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editFormConfig.author || ''}
                      onChange={(e) => setEditFormConfig({ ...editFormConfig, author: e.target.value })}
                    />
                  </div>
                </>
              )}

              {/* Quick CTA specific */}
              {editingWidget.widgetType === 'quick_cta' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Mô tả ngắn (Subtitle):</label>
                    <textarea
                      className="form-input"
                      rows={2}
                      value={editFormConfig.subtitle || ''}
                      onChange={(e) => setEditFormConfig({ ...editFormConfig, subtitle: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nội dung nút bấm:</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editFormConfig.buttonText || ''}
                      onChange={(e) => setEditFormConfig({ ...editFormConfig, buttonText: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setEditingWidget(null)}
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Save size={15} /> Lưu Cấu Hình
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

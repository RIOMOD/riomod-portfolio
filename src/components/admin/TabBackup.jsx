import React, { useState } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { Download, Upload, RotateCcw, Lock, KeyRound, AlertTriangle, FileCode, Cloud } from 'lucide-react';

export default function TabBackup() {
  const { data, exportJSON, importJSON, resetToDefault, changePin, cloudSyncStatus, syncToCloud } = usePortfolioData();
  const [jsonText, setJsonText] = useState('');
  const [newPin, setNewPin] = useState('');

  const handleImport = (e) => {
    e.preventDefault();
    if (!jsonText.trim()) {
      alert('Vui lòng dán nội dung JSON vào khung!');
      return;
    }
    if (window.confirm('Hành động này sẽ ghi đè toàn bộ dữ liệu hiện tại bằng dữ liệu JSON mới. Bạn có chắc chắn không?')) {
      if (importJSON(jsonText)) {
        setJsonText('');
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setJsonText(content);
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('CẢNH BÁO: Hành động này sẽ xóa toàn bộ các chỉnh sửa đã lưu và đưa dữ liệu về bản gốc ban đầu. Bạn có chắc chắn muốn khôi phục?')) {
      resetToDefault();
    }
  };

  const handlePinChange = (e) => {
    e.preventDefault();
    if (newPin.length < 4) {
      alert('Mã PIN phải có ít nhất 4 ký tự!');
      return;
    }
    changePin(newPin);
    setNewPin('');
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileCode size={20} color="var(--accent-cyan)" />
          Sao Lưu, Phục Hồi Dữ Liệu & Bảo Mật
        </h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          Xuất dữ liệu dự phòng ra file JSON, nhập dữ liệu từ file hoặc khôi phục về mặc định ban đầu
        </span>
      </div>

      {/* Neon Cloud Database Sync Section */}
      <div style={{ background: 'linear-gradient(135deg, rgba(6, 214, 160, 0.08) 0%, rgba(18, 21, 29, 0.7) 100%)', border: '1px solid rgba(6, 214, 160, 0.25)', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <h4 style={{ fontSize: '1.05rem', color: '#06d6a0', fontFamily: 'var(--font-heading)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cloud size={18} /> Đồng Bộ Cơ Sở Dữ Liệu Neon.tech (PostgreSQL)
          </h4>
          <span style={{
            fontSize: '0.75rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '20px',
            fontWeight: 600,
            background: cloudSyncStatus === 'synced' ? 'rgba(6, 214, 160, 0.15)' : 'rgba(255, 255, 255, 0.08)',
            color: cloudSyncStatus === 'synced' ? '#06d6a0' : 'var(--text-dim)',
            border: cloudSyncStatus === 'synced' ? '1px solid rgba(6, 214, 160, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {cloudSyncStatus === 'synced' ? '🟢 Đã kết nối Neon Cloud' : cloudSyncStatus === 'saving' ? '⏳ Đang lưu Cloud...' : '💾 Chế độ LocalStorage'}
          </span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
          Khi triển khai Backend lên <strong>Render.com</strong> với biến môi trường <code>DATABASE_URL</code> của <strong>Neon.tech</strong>, mọi thay đổi về hồ sơ, dự án, bố cục và widgets sẽ được tự động lưu vĩnh viễn vào đám mây PostgreSQL!
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button type="button" onClick={syncToCloud} className="btn-primary" style={{ background: '#06d6a0', color: '#0b0d13', fontWeight: 600 }}>
            <Cloud size={16} /> Đồng Bộ Dữ Liệu Lên Neon Cloud Ngay
          </button>
        </div>
      </div>

      {/* Export / Download Section */}
      <div style={{ background: 'rgba(18, 21, 29, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={18} /> Xuất Dữ Liệu Ra File JSON (Backup)
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Tải toàn bộ thông tin hồ sơ, tất cả dự án, sự kiện, kỹ năng về máy tính dưới dạng file `.json` để lưu trữ dự phòng.
        </p>
        <button type="button" onClick={exportJSON} className="btn-primary">
          <Download size={16} /> Tải File Backup JSON Về Máy
        </button>
      </div>

      {/* Import / Upload Section */}
      <form onSubmit={handleImport} style={{ background: 'rgba(18, 21, 29, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-purple)', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Upload size={18} /> Nhập Dữ Liệu Từ File JSON (Restore)
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Bạn có thể tải file `.json` từ máy tính lên hoặc dán trực tiếp mã JSON vào khung dưới đây:
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}
          />
        </div>

        <div className="form-group">
          <textarea
            className="form-textarea"
            style={{ minHeight: '120px', fontFamily: 'monospace', fontSize: '0.82rem' }}
            placeholder="Dán nội dung JSON vào đây..."
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary" style={{ background: 'var(--accent-purple)', color: '#fff' }}>
          <Upload size={16} /> Áp Dụng Dữ Liệu JSON Này
        </button>
      </form>

      {/* Change PIN Security */}
      <form onSubmit={handlePinChange} style={{ background: 'rgba(18, 21, 29, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lock size={18} /> Đổi Mã PIN Đăng Nhập Quản Trị
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Mã PIN mặc định là <code>2026</code>. Bạn có thể đổi mã PIN để bảo vệ các thao tác chỉnh sửa.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '380px' }}>
          <input
            type="password"
            className="form-input"
            placeholder="Nhập mã PIN mới (VD: 8888)"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
          />
          <button type="submit" className="btn-secondary">
            <KeyRound size={16} /> Đổi PIN
          </button>
        </div>
      </form>

      {/* Reset Default */}
      <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '1.5rem' }}>
        <h4 style={{ fontSize: '1.05rem', color: '#ef4444', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={18} /> Khôi Phục Dữ Liệu Gốc (Reset)
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Xóa toàn bộ các dữ liệu đã chỉnh sửa trong trình duyệt và đặt lại portfolio về trạng thái khởi tạo ban đầu.
        </p>
        <button type="button" onClick={handleReset} className="btn-danger">
          <RotateCcw size={16} /> Khôi Phục Về Mặc Định Ban Đầu
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { playPageFlipSound } from '../../utils/audioUtils';
import { Sliders, Volume2, VolumeX, Sun, Moon, Sparkles, Check, RefreshCw } from 'lucide-react';

export default function TabSettings() {
  const { 
    theme, toggleTheme,
    bookletSettings, updateBookletSettings 
  } = usePortfolioData();

  const effects = [
    { id: 'classic', name: '📖 Lật Sách Cổ Điển (Classic 3D Spine Curl)', desc: 'Xoay 3D quanh trục gáy sách với độ sâu và mờ chuyển động nhẹ' },
    { id: 'cube', name: '🎲 Khối Hộp 3D (3D Cube Orbit)', desc: 'Lật xoay 90 độ khối hộp 3D hiện đại tạo cảm giác lập thể' },
    { id: 'curl', name: '📄 Uốn Nếp Giấy (Paper Wave Fold)', desc: 'Mô phỏng nếp uốn mềm mại của trang giấy khi lật' },
    { id: 'slide', name: '🌠 Trượt Chiều Sâu (Depth Slide & Glissade)', desc: 'Trượt ngang kết hợp tỷ lệ thu phóng không gian 3D' },
    { id: 'zoom-flip', name: '🚀 Phóng Thu 3D (Zoom Orbit Flip)', desc: 'Phóng to - xoay nghiêng ấn tượng phong cách tương lai' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div>
        <h3 style={{ fontSize: '1.25rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sliders size={20} color="var(--accent-cyan)" /> Cấu Hình Giao Diện & Hiệu Ứng Lật Sách 3D
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Tùy chỉnh hiệu ứng chuyển động, âm thanh lật sách và chế độ hiển thị mặc định của hệ thống.
        </p>
      </div>

      {/* Theme Setting Card */}
      <div className="admin-form-group" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
        <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {theme === 'dark' ? <Moon size={18} color="#7c3aed" /> : <Sun size={18} color="#ffb703" />}
          Chế Độ Giao Diện Hiện Tại: <span style={{ color: 'var(--accent-cyan)' }}>{theme === 'dark' ? 'Tối (Dark Mode)' : 'Sáng (Light Mode)'}</span>
        </h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Người xem ngoài trang chủ có thể tự do bấm nút Mặt Trời / Mặt Trăng trên thanh Header để chuyển đổi bất kỳ lúc nào.
        </p>
        <button
          type="button"
          onClick={toggleTheme}
          className="btn-editorial"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {theme === 'dark' ? (
            <>
              <Sun size={16} color="#ffb703" /> Đổi Sang Chế Độ Sáng (Light Mode)
            </>
          ) : (
            <>
              <Moon size={16} color="#7c3aed" /> Đổi Sang Chế Độ Tối (Dark Mode)
            </>
          )}
        </button>
      </div>

      {/* Booklet 3D Flip Effect Setting Card */}
      <div className="admin-form-group" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
        <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} color="var(--accent-gold)" /> Hiệu Ứng Lật Trang 3D Mặc Định
        </h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Chọn hiệu ứng 3D được kích hoạt tự động khi người xem mở chế độ Lật Sách Tạp Chí:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {effects.map((eff) => {
            const isSelected = (bookletSettings?.flipEffect || 'classic') === eff.id;
            return (
              <div
                key={eff.id}
                onClick={() => updateBookletSettings({ flipEffect: eff.id })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1.15rem',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--surface-border)',
                  background: isSelected ? 'rgba(0,240,255,0.08)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>{eff.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{eff.desc}</div>
                </div>

                {isSelected && (
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Audio Sound Effects Card */}
      <div className="admin-form-group" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
        <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Volume2 size={18} color="var(--accent-cyan)" /> Âm Thanh Lật Giấy Tự Nhiên (Page-Flip Sound)
        </h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Sử dụng bộ tổng hợp âm thanh Web Audio API thời gian thực để tạo tiếng sột soạt lật giấy chân thực, không có độ trễ:
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => {
              const nextVal = !bookletSettings?.soundEnabled;
              updateBookletSettings({ soundEnabled: nextVal });
              if (nextVal) playPageFlipSound(true);
            }}
            className="btn-editorial"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {bookletSettings?.soundEnabled !== false ? (
              <>
                <Volume2 size={16} color="var(--accent-cyan)" /> Đang Bật Âm Thanh (Bấm để Tắt)
              </>
            ) : (
              <>
                <VolumeX size={16} color="var(--text-dim)" /> Đang Tắt Âm Thanh (Bấm để Bật)
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => playPageFlipSound(true)}
            className="btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <RefreshCw size={14} /> Nghe Thử Âm Thanh Lật Sách
          </button>
        </div>
      </div>

    </div>
  );
}

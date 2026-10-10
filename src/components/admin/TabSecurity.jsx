import React, { useState } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { ShieldCheck, Lock, KeyRound, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

export default function TabSecurity() {
  const { changePin, verifyPin, showToast } = usePortfolioData();
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentPin) {
      showToast('Vui lòng nhập mã PIN hiện tại!', 'error');
      return;
    }

    if (!verifyPin(currentPin)) {
      return; // verifyPin already shows toast on incorrect PIN
    }

    if (newPin.length < 4) {
      showToast('Mã PIN mới phải có ít nhất 4 ký tự!', 'error');
      return;
    }

    if (newPin !== confirmPin) {
      showToast('Mật khẩu / PIN xác nhận không khớp!', 'error');
      return;
    }

    changePin(newPin);
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
    showToast('Đã đổi mã PIN quản trị thành công!', 'success');
  };

  return (
    <div style={{ maxWidth: '650px' }}>
      <div style={{ marginBottom: '1.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem', margin: 0 }}>
          <Lock size={22} color="#06d6a0" />
          BẢO MẬT & ĐỔI MẬT KHẨU ADMIN
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.4rem 0 0 0' }}>
          Đổi mã PIN bảo mật để bảo vệ quyền truy cập bảng điều khiển quản trị portfolio.
        </p>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, rgba(20, 24, 36, 0.8) 0%, rgba(14, 17, 26, 0.95) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '2rem'
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Current PIN */}
          <div className="form-group">
            <label className="form-label">MÃ PIN HIỆN TẠI:</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showCurrent ? 'text' : 'password'}
                className="form-input"
                placeholder="Nhập mã PIN đang dùng (Mặc định: 2026)"
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New PIN */}
          <div className="form-group">
            <label className="form-label">MÃ PIN MỚI:</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showNew ? 'text' : 'password'}
                className="form-input"
                placeholder="Nhập mã PIN mới (Tối thiểu 4 ký tự)"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm New PIN */}
          <div className="form-group">
            <label className="form-label">XÁC NHẬN MÃ PIN MỚI:</label>
            <input
              type="password"
              className="form-input"
              placeholder="Nhập lại mã PIN mới để xác nhận"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              required
            />
          </div>

          {/* Security Notice */}
          <div style={{
            background: 'rgba(6, 214, 160, 0.08)',
            border: '1px solid rgba(6, 214, 160, 0.25)',
            borderRadius: '8px',
            padding: '1rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.65rem'
          }}>
            <ShieldCheck size={18} color="#06d6a0" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: '#fff', display: 'block', marginBottom: '0.2rem' }}>Lưu ý an toàn:</strong>
              Mã PIN sau khi đổi sẽ được lưu an toàn trên trình duyệt và tự động đồng bộ khi bạn lưu dữ liệu lên đám mây. Hãy ghi nhớ mã PIN này để đăng nhập vào lần sau.
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '0.8rem 1.5rem', justifyContent: 'center', marginTop: '0.5rem' }}
          >
            <KeyRound size={16} /> Cập Nhật & Lưu Mật Khẩu Mới
          </button>
        </form>
      </div>
    </div>
  );
}

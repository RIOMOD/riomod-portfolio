import React, { useState } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import TabProfile from './TabProfile';
import TabProjects from './TabProjects';
import TabEvents from './TabEvents';
import TabSkillsTimeline from './TabSkillsTimeline';
import TabCertificates from './TabCertificates';
import TabWidgetsLayout from './TabWidgetsLayout';
import TabMediaManager from './TabMediaManager';
import TabSecurity from './TabSecurity';
import TabSettings from './TabSettings';
import TabBackup from './TabBackup';
import { 
  ShieldCheck, 
  X, 
  User, 
  Layers, 
  Sparkles, 
  Zap, 
  Award, 
  Database, 
  Lock, 
  LogOut,
  Sliders,
  CheckCircle2,
  LayoutGrid,
  Maximize2,
  Minimize2,
  KeyRound,
  Image,
  Film,
  Music
} from 'lucide-react';
import '../../styles/admin.css';

export default function AdminModal() {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    isAuthenticated, 
    verifyPin, 
    logoutAdmin 
  } = usePortfolioData();

  const [activeTab, setActiveTab] = useState('profile');
  const [pinInput, setPinInput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(true);

  if (!isAdminOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (verifyPin(pinInput)) {
      setPinInput('');
    }
  };

  return (
    <div className="admin-modal-overlay">
      <div className={`admin-window ${!isFullscreen ? 'windowed' : ''}`}>
        
        {/* Top Header */}
        <div className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(157,78,221,0.2)', border: '1px solid rgba(157,78,221,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} color="#c084fc" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.15rem', color: '#fff', fontFamily: 'var(--font-heading)', margin: 0, letterSpacing: '0.05em' }}>
                  PORTFOLIO STUDIO & CONTROL CENTER
                </h2>
                <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(6,214,160,0.15)', color: '#06d6a0', fontWeight: 600 }}>
                  FULLSCREEN
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                {isAuthenticated ? 'Chế độ Quản trị Studio (Toàn màn hình • Tự do kéo thả & sửa Media)' : 'Yêu cầu xác thực quyền truy cập'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {isAuthenticated && (
              <>
                {/* Quick Change PIN button */}
                <button
                  type="button"
                  onClick={() => setActiveTab('security')}
                  className="btn-secondary"
                  style={{ padding: '0.42rem 0.85rem', fontSize: '0.8rem', color: activeTab === 'security' ? '#06d6a0' : undefined }}
                  title="Đổi mật khẩu / mã PIN Admin"
                >
                  <KeyRound size={14} color="#06d6a0" /> Đổi PIN
                </button>

                {/* Fullscreen toggle button */}
                <button 
                  type="button" 
                  onClick={() => setIsFullscreen(!isFullscreen)} 
                  className="btn-secondary"
                  style={{ padding: '0.45rem', borderRadius: '8px' }}
                  title={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Phóng to toàn màn hình'}
                >
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>

                {/* Logout button */}
                <button 
                  type="button" 
                  onClick={logoutAdmin} 
                  className="btn-secondary"
                  style={{ padding: '0.42rem 0.85rem', fontSize: '0.8rem' }}
                  title="Đăng xuất"
                >
                  <LogOut size={14} /> Đăng Xuất
                </button>
              </>
            )}

            {/* Close button */}
            <button 
              type="button" 
              onClick={() => setIsAdminOpen(false)} 
              className="btn-secondary"
              style={{ padding: '0.45rem', borderRadius: '8px' }}
              title="Đóng bảng điều khiển"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* PIN Login Screen */
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#090b10' }}>
            <div style={{ maxWidth: '420px', width: '100%', background: 'rgba(16, 20, 30, 0.95)', border: '1px solid rgba(157,78,221,0.35)', borderRadius: '14px', padding: '2.5rem 2rem', textAlign: 'center', boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(157,78,221,0.15)', border: '1px solid rgba(157,78,221,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Lock size={28} color="#c084fc" />
              </div>

              <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: '#fff', marginBottom: '0.5rem' }}>
                Xác Thực Quản Trị Studio
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                Nhập mã PIN bảo mật để truy cập bảng điều khiển và chỉnh sửa toàn bộ dữ liệu, media, bố cục portfolio.
              </p>

              <form onSubmit={handleLogin}>
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <input
                    type="password"
                    autoFocus
                    className="form-input"
                    style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.35em', padding: '0.85rem' }}
                    placeholder="••••"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginTop: '0.5rem' }}>
                    💡 Mã PIN mặc định: <code>2026</code>
                  </span>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}>
                  Mở Khóa Quản Trị
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard Tabs */
          <div className="admin-body">
            {/* Sidebar Navigation */}
            <div className="admin-sidebar">
              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={18} /> Hồ Sơ Cá Nhân
              </button>

              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'layout' ? 'active' : ''}`}
                onClick={() => setActiveTab('layout')}
              >
                <LayoutGrid size={18} color="#06d6a0" /> Bố Cục & Widgets
              </button>

              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                <Layers size={18} color="#38bdf8" /> Quản Lý Dự Án
              </button>

              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'media' ? 'active' : ''}`}
                onClick={() => setActiveTab('media')}
              >
                <Sparkles size={18} color="#c084fc" /> Media (Ảnh/Video/Nhạc)
              </button>

              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
                onClick={() => setActiveTab('events')}
              >
                <Film size={18} /> Sự Kiện & Media
              </button>

              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <Zap size={18} /> Kỹ Năng & Lịch Trình
              </button>

              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
                onClick={() => setActiveTab('certificates')}
              >
                <Award size={18} /> Bằng Cấp & Chứng Chỉ
              </button>

              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <Lock size={18} color="#f59e0b" /> Đổi Mật Khẩu Admin
              </button>

              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <Sliders size={18} /> Cài Đặt Hiệu Ứng Sách
              </button>

              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'backup' ? 'active' : ''}`}
                onClick={() => setActiveTab('backup')}
              >
                <Database size={18} /> Sao Lưu & Cloud
              </button>
            </div>

            {/* Main Tab Content */}
            <div className="admin-content">
              {activeTab === 'profile' && <TabProfile />}
              {activeTab === 'layout' && <TabWidgetsLayout />}
              {activeTab === 'projects' && <TabProjects />}
              {activeTab === 'media' && <TabMediaManager />}
              {activeTab === 'events' && <TabEvents />}
              {activeTab === 'skills' && <TabSkillsTimeline />}
              {activeTab === 'certificates' && <TabCertificates />}
              {activeTab === 'security' && <TabSecurity />}
              {activeTab === 'settings' && <TabSettings />}
              {activeTab === 'backup' && <TabBackup />}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

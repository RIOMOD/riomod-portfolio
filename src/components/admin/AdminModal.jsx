import React, { useState } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import TabProfile from './TabProfile';
import TabProjects from './TabProjects';
import TabEvents from './TabEvents';
import TabSkillsTimeline from './TabSkillsTimeline';
import TabCertificates from './TabCertificates';
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
  CheckCircle2
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

  if (!isAdminOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (verifyPin(pinInput)) {
      setPinInput('');
    }
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-window">
        
        {/* Top Header */}
        <div className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(157,78,221,0.2)', border: '1px solid rgba(157,78,221,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={18} color="#c084fc" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', color: '#fff', fontFamily: 'var(--font-heading)', margin: 0 }}>
                PORTFOLIO CONTROL CENTER
              </h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                {isAuthenticated ? 'Chế độ Quản trị Viên (Đang trực tuyến)' : 'Yêu cầu xác thực quyền truy cập'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isAuthenticated && (
              <button 
                type="button" 
                onClick={logoutAdmin} 
                className="btn-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                title="Đăng xuất"
              >
                <LogOut size={14} /> Đăng Xuất
              </button>
            )}

            <button 
              type="button" 
              onClick={() => setIsAdminOpen(false)} 
              className="btn-secondary"
              style={{ padding: '0.45rem', borderRadius: '50%' }}
              title="Đóng"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* PIN Login Screen */
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#0b0d13' }}>
            <div style={{ maxWidth: '400px', width: '100%', background: 'rgba(18, 21, 29, 0.9)', border: '1px solid rgba(157,78,221,0.3)', borderRadius: '12px', padding: '2.5rem 2rem', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(157,78,221,0.15)', border: '1px solid rgba(157,78,221,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Lock size={26} color="#c084fc" />
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#fff', marginBottom: '0.5rem' }}>
                Xác Thực Quản Trị
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                Nhập mã PIN bảo mật để truy cập bảng điều khiển và chỉnh sửa dữ liệu portfolio.
              </p>

              <form onSubmit={handleLogin}>
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <input
                    type="password"
                    autoFocus
                    className="form-input"
                    style={{ textAlign: 'center', fontSize: '1.4rem', letterSpacing: '0.3em', padding: '0.85rem' }}
                    placeholder="••••"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginTop: '0.5rem' }}>
                    💡 Mã PIN mặc định: <code>2026</code>
                  </span>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}>
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
                className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                <Layers size={18} /> Danh Mục Dự Án
              </button>

              <button
                type="button"
                className={`admin-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
                onClick={() => setActiveTab('events')}
              >
                <Sparkles size={18} /> Sự Kiện & Truyền Thông
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
                className={`admin-tab-btn ${activeTab === 'backup' ? 'active' : ''}`}
                onClick={() => setActiveTab('backup')}
              >
                <Database size={18} /> Sao Lưu & JSON
              </button>
            </div>

            {/* Main Tab Content */}
            <div className="admin-content">
              {activeTab === 'profile' && <TabProfile />}
              {activeTab === 'projects' && <TabProjects />}
              {activeTab === 'events' && <TabEvents />}
              {activeTab === 'skills' && <TabSkillsTimeline />}
              {activeTab === 'certificates' && <TabCertificates />}
              {activeTab === 'backup' && <TabBackup />}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

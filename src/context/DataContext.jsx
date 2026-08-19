import React, { createContext, useContext, useState, useEffect } from 'react';
import { portfolioData as initialData } from '../data/portfolioData';

const LOCAL_STORAGE_KEY = 'portfolio_custom_data_v1';
const ADMIN_PIN_KEY = 'portfolio_admin_pin_v1';
const DEFAULT_PIN = '2026';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading data from localStorage:', e);
    }
    return initialData;
  });

  const [adminPin, setAdminPin] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_PIN_KEY) || DEFAULT_PIN;
    } catch (e) {
      return DEFAULT_PIN;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving data to localStorage:', e);
    }
  }, [data]);

  // Toast notification helper
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Auth verify
  const verifyPin = (pin) => {
    if (pin === adminPin) {
      setIsAuthenticated(true);
      showToast('Đăng nhập quản trị thành công!', 'success');
      return true;
    } else {
      showToast('Mã PIN không chính xác. Mặc định là 2026', 'error');
      return false;
    }
  };

  const changePin = (newPin) => {
    setAdminPin(newPin);
    localStorage.setItem(ADMIN_PIN_KEY, newPin);
    showToast('Đã đổi mã PIN thành công!', 'success');
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    setIsAdminOpen(false);
    showToast('Đã đăng xuất khỏi trang quản trị.', 'info');
  };

  // Profile update
  const updateProfile = (updatedProfile) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...updatedProfile }
    }));
    showToast('Đã lưu thông tin cá nhân!');
  };

  // Skills CRUD
  const updateSkills = (newSkills) => {
    setData((prev) => ({
      ...prev,
      skills: newSkills
    }));
    showToast('Đã cập nhật danh sách kỹ năng!');
  };

  // Timeline CRUD
  const updateTimeline = (newTimeline) => {
    setData((prev) => ({
      ...prev,
      timeline: newTimeline
    }));
    showToast('Đã cập nhật dòng thời gian!');
  };

  // Projects CRUD
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: project.id || `proj_${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
    showToast(`Đã thêm dự án: ${project.title}`);
  };

  const updateProject = (id, updatedProject) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updatedProject } : p))
    }));
    showToast(`Đã cập nhật dự án: ${updatedProject.title || id}`);
  };

  const deleteProject = (id) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
    showToast('Đã xóa dự án thành công!', 'warning');
  };

  // Events CRUD
  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: event.id || `evt_${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      events: [newEvent, ...prev.events]
    }));
    showToast(`Đã thêm sự kiện: ${event.title}`);
  };

  const updateEvent = (id, updatedEvent) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.map((e) => (e.id === id ? { ...e, ...updatedEvent } : e))
    }));
    showToast(`Đã cập nhật sự kiện: ${updatedEvent.title || id}`);
  };

  const deleteEvent = (id) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id)
    }));
    showToast('Đã xóa sự kiện!', 'warning');
  };

  // Certificates CRUD
  const updateCertificates = (newCertificates) => {
    setData((prev) => ({
      ...prev,
      certificates: newCertificates
    }));
    showToast('Đã cập nhật danh sách chứng chỉ!');
  };

  // Import / Export / Reset
  const exportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-data-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Đã xuất file dữ liệu JSON thành công!');
  };

  const importJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.profile && parsed.projects) {
        setData(parsed);
        showToast('Đã nhập và áp dụng dữ liệu JSON thành công!');
        return true;
      } else {
        showToast('Dữ liệu JSON không đúng cấu trúc portfolio!', 'error');
        return false;
      }
    } catch (e) {
      showToast('Lỗi đọc file JSON: ' + e.message, 'error');
      return false;
    }
  };

  const resetToDefault = () => {
    setData(initialData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    showToast('Đã khôi phục dữ liệu gốc ban đầu!', 'info');
  };

  return (
    <DataContext.Provider
      value={{
        data,
        profile: data.profile || {},
        skills: data.skills || [],
        timeline: data.timeline || [],
        projectDomains: data.projectDomains || [],
        projects: data.projects || [],
        events: data.events || [],
        certificates: data.certificates || [],
        eventCategories: data.eventCategories || [],
        certCategories: data.certCategories || [],
        
        // Admin state
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        verifyPin,
        changePin,
        logoutAdmin,
        toastMessage,
        showToast,

        // Actions
        updateProfile,
        updateSkills,
        updateTimeline,
        addProject,
        updateProject,
        deleteProject,
        addEvent,
        updateEvent,
        deleteEvent,
        updateCertificates,
        exportJSON,
        importJSON,
        resetToDefault
      }}
    >
      {children}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 99999,
            backgroundColor:
              toastMessage.type === 'error'
                ? '#ef4444'
                : toastMessage.type === 'warning'
                ? '#f59e0b'
                : toastMessage.type === 'info'
                ? '#3b82f6'
                : '#10b981',
            color: '#ffffff',
            padding: '0.85rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.9rem',
            fontWeight: 500,
            animation: 'slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <span>{toastMessage.message}</span>
        </div>
      )}
    </DataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a DataProvider');
  }
  return context;
}

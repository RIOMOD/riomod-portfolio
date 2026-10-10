import React, { createContext, useContext, useState, useEffect } from 'react';
import { portfolioData as initialData } from '../data/portfolioData';

const LOCAL_STORAGE_KEY = 'portfolio_custom_data_v1';
const LAYOUT_KEY = 'portfolio_layout_v1';
const ADMIN_PIN_KEY = 'portfolio_admin_pin_v1';
const THEME_KEY = 'portfolio_theme_mode_v1';
const BOOKLET_SETTINGS_KEY = 'portfolio_booklet_settings_v1';
const DEFAULT_PIN = '2026';

const defaultBookletSettings = {
  flipEffect: 'classic', // 'classic' | 'cube' | 'curl' | 'slide' | 'zoom-flip'
  soundEnabled: true,
  flipSpeed: 'normal' // 'fast' | 'normal' | 'cinematic'
};

export const defaultLayout = [
  { id: 'hero', type: 'section', name: 'Hero (Giới thiệu đầu trang)', enabled: true, isRemovable: false },
  { id: 'about', type: 'section', name: 'Về tôi & Chỉ số (About)', enabled: true, isRemovable: false },
  { id: 'tech_matrix', type: 'widget', widgetType: 'tech_matrix', name: 'Ma Trận Kỹ Năng (Tech Matrix)', enabled: true, isRemovable: true, config: { title: 'MA TRẬN KỸ NĂNG & NĂNG LỰC CÔNG NGHỆ' } },
  { id: 'timeline', type: 'section', name: 'Hành trình sự nghiệp (Timeline)', enabled: true, isRemovable: false },
  { id: 'github_stats', type: 'widget', widgetType: 'github_stats', name: 'GitHub Activity & Stats', enabled: true, isRemovable: true, config: { title: 'HOẠT ĐỘNG GITHUB & MÃ NGUỒN MỞ', username: 'RIOMOD' } },
  { id: 'projects', type: 'section', name: 'Danh mục Dự án (Projects)', enabled: true, isRemovable: false },
  { id: 'music_player', type: 'widget', widgetType: 'music_player', name: 'Lo-Fi Music Player Bar', enabled: true, isRemovable: true, config: { title: 'AUDIO VIBES WIDGET' } },
  { id: 'events', type: 'section', name: 'Hoạt động & Sự kiện (Events)', enabled: true, isRemovable: false },
  { id: 'quote_banner', type: 'widget', widgetType: 'quote_banner', name: 'Triết Lý Sống & Phương Châm', enabled: true, isRemovable: true, config: { quote: 'Công nghệ tạo ra giải pháp, nhưng sự thấu hiểu và tận tâm mới là cầu nối bền vững nhất giữa con người với con người.', author: 'Nguyễn Công Trứ', badge: 'TRIẾT LÝ HÀNH ĐỘNG & NGHỀ NGHIỆP' } },
  { id: 'certificates', type: 'section', name: 'Bằng cấp & Chứng chỉ (Certificates)', enabled: true, isRemovable: false },
  { id: 'quick_cta', type: 'widget', widgetType: 'quick_cta', name: 'Quick Booking & Coffee Chat', enabled: true, isRemovable: true, config: { title: 'Sẵn sàng mở rộng cơ hội & trao đổi hợp tác?', subtitle: 'Tôi luôn sẵn lòng tiếp nhận cơ hội thực tập, dự án tư vấn EdTech hoặc những buổi trò chuyện cafe trao đổi chuyên môn.', buttonText: 'Gửi Tin Nhắn Hợp Tác Ngay' } },
  { id: 'social_connect', type: 'widget', widgetType: 'social_connect', name: 'Social Connect Grid', enabled: true, isRemovable: true, config: { title: 'MẠNG XÃ HỘI & KÊNH LIÊN LẠC TRỰC TUYẾN' } },
  { id: 'contact', type: 'section', name: 'Thông tin liên hệ (Contact)', enabled: true, isRemovable: false }
];

const API_BASE = import.meta.env.VITE_API_URL || '';

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

  const [layout, setLayout] = useState(() => {
    try {
      const savedLayout = localStorage.getItem(LAYOUT_KEY);
      if (savedLayout) {
        return JSON.parse(savedLayout);
      }
    } catch (e) {
      console.error('Error loading layout from localStorage:', e);
    }
    return defaultLayout;
  });

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  const [bookletSettings, setBookletSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(BOOKLET_SETTINGS_KEY);
      if (saved) return { ...defaultBookletSettings, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Error loading booklet settings:', e);
    }
    return defaultBookletSettings;
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
  const [cloudSyncStatus, setCloudSyncStatus] = useState('offline'); // 'offline' | 'synced' | 'saving' | 'error'

  // Toast notification helper
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving data to localStorage:', e);
    }
  }, [data]);

  // Sync Layout to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout));
    } catch (e) {
      console.error('Error saving layout to localStorage:', e);
    }
  }, [layout]);

  // Sync Theme to HTML and localStorage
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
      if (theme === 'light') {
        document.documentElement.classList.add('theme-light');
        document.body.classList.add('theme-light');
      } else {
        document.documentElement.classList.remove('theme-light');
        document.body.classList.remove('theme-light');
      }
    } catch (e) {
      console.error('Error setting theme:', e);
    }
  }, [theme]);

  // Sync Booklet Settings
  useEffect(() => {
    try {
      localStorage.setItem(BOOKLET_SETTINGS_KEY, JSON.stringify(bookletSettings));
    } catch (e) {
      console.error('Error saving booklet settings:', e);
    }
  }, [bookletSettings]);

  // Cloud Neon.tech Database sync check
  useEffect(() => {
    const fetchCloudData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/portfolio`);
        if (res.ok) {
          const cloudResult = await res.json();
          if (cloudResult && cloudResult.data) {
            setData(cloudResult.data);
            if (cloudResult.layout) setLayout(cloudResult.layout);
            setCloudSyncStatus('synced');
            console.log('✅ Synchronized portfolio data from Neon Cloud database');
          }
        }
      } catch (err) {
        // Backend not available (static mode) - fallback seamlessly to localStorage
        setCloudSyncStatus('offline');
      }
    };
    fetchCloudData();
  }, []);

  const syncToCloud = async () => {
    setCloudSyncStatus('saving');
    try {
      const res = await fetch(`${API_BASE}/api/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, layout })
      });
      if (res.ok) {
        setCloudSyncStatus('synced');
        showToast('Đã lưu & đồng bộ lên Neon PostgreSQL Database!', 'success');
      } else {
        setCloudSyncStatus('error');
        showToast('Không thể đồng bộ Neon Database (Máy chủ phản hồi lỗi). Đã lưu LocalStorage!', 'warning');
      }
    } catch (e) {
      setCloudSyncStatus('offline');
      showToast('Đang chạy chế độ tĩnh / Offline. Đã lưu an toàn vào LocalStorage!', 'info');
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      showToast(`Đã chuyển sang chế độ ${nextTheme === 'light' ? 'Sáng (Light Mode)' : 'Tối (Dark Mode)'}!`, 'info');
      return nextTheme;
    });
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

  // Booklet Settings
  const updateBookletSettings = (newSettings) => {
    setBookletSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Đã lưu cấu hình hiệu ứng lật sách 3D!');
  };

  // Layout & Widgets Actions
  const updateLayout = (newLayout) => {
    setLayout(newLayout);
    showToast('Đã lưu bố cục giao diện mới!');
  };

  const toggleLayoutItem = (id) => {
    setLayout((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
    showToast('Đã cập nhật trạng thái hiển thị mục!');
  };

  const moveLayoutItem = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= layout.length) return;
    setLayout((prev) => {
      const copy = [...prev];
      const [movedItem] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, movedItem);
      return copy;
    });
    showToast('Đã thay đổi thứ tự bố cục!');
  };

  const addWidget = (widgetCatalogItem) => {
    const newWidgetId = `${widgetCatalogItem.widgetType}_${Date.now()}`;
    const newWidgetItem = {
      id: newWidgetId,
      type: 'widget',
      widgetType: widgetCatalogItem.widgetType,
      name: widgetCatalogItem.name,
      enabled: true,
      isRemovable: true,
      config: { ...widgetCatalogItem.defaultConfig }
    };
    setLayout((prev) => [...prev, newWidgetItem]);
    showToast(`Đã thêm widget: ${widgetCatalogItem.name}!`);
  };

  const removeWidget = (id) => {
    setLayout((prev) => prev.filter((item) => item.id !== id));
    showToast('Đã gỡ bỏ widget khỏi trang!', 'warning');
  };

  const updateWidgetConfig = (id, newConfig) => {
    setLayout((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, config: { ...item.config, ...newConfig } } : item
      )
    );
    showToast('Đã cập nhật cấu hình widget!');
  };

  const resetLayout = () => {
    setLayout(defaultLayout);
    localStorage.removeItem(LAYOUT_KEY);
    showToast('Đã khôi phục bố cục gốc mặc định!', 'info');
  };

  // Import / Export / Reset
  const exportJSON = () => {
    const fullPayload = {
      data,
      layout,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(fullPayload, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-full-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Đã xuất file dữ liệu & bố cục JSON thành công!');
  };

  const importJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed) {
        if (parsed.data) {
          setData(parsed.data);
          if (parsed.layout) setLayout(parsed.layout);
        } else if (parsed.profile && parsed.projects) {
          setData(parsed);
        }
        showToast('Đã nhập và áp dụng dữ liệu JSON thành công!');
        return true;
      }
      showToast('Dữ liệu JSON không đúng cấu trúc portfolio!', 'error');
      return false;
    } catch (e) {
      showToast('Lỗi đọc file JSON: ' + e.message, 'error');
      return false;
    }
  };

  const resetToDefault = () => {
    setData(initialData);
    setLayout(defaultLayout);
    setTheme('dark');
    setBookletSettings(defaultBookletSettings);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(LAYOUT_KEY);
    localStorage.removeItem(THEME_KEY);
    localStorage.removeItem(BOOKLET_SETTINGS_KEY);
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
        
        // Layout & Widgets
        layout,
        updateLayout,
        toggleLayoutItem,
        moveLayoutItem,
        addWidget,
        removeWidget,
        updateWidgetConfig,
        resetLayout,

        // Theme
        theme,
        toggleTheme,

        // Booklet Settings
        bookletSettings,
        updateBookletSettings,

        // Cloud Neon sync
        cloudSyncStatus,
        syncToCloud,

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

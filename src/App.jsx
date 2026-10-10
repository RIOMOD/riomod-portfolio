import React, { useState, useEffect } from 'react';
import { DataProvider, usePortfolioData } from './context/DataContext';
import ThreeCanvas from './components/ThreeCanvas';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutIndex from './components/AboutIndex';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Events from './components/Events';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import BrochureView from './components/BrochureView';
import AdminModal from './components/admin/AdminModal';

// Widgets
import GitHubStatsWidget from './components/widgets/GitHubStatsWidget';
import MusicPlayerWidget from './components/widgets/MusicPlayerWidget';
import TechMatrixWidget from './components/widgets/TechMatrixWidget';
import QuoteBannerWidget from './components/widgets/QuoteBannerWidget';
import QuickCtaWidget from './components/widgets/QuickCtaWidget';
import SocialConnectWidget from './components/widgets/SocialConnectWidget';

function PortfolioMain() {
  const [isMagazineMode, setIsMagazineMode] = useState(false);
  const { setIsAdminOpen, layout } = usePortfolioData();

  // Listen for #admin hash in URL
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [setIsAdminOpen]);

  // Render individual layout items (sections or widgets)
  const renderLayoutItem = (item) => {
    if (!item.enabled) return null;

    // Standard Core Sections
    if (item.id === 'hero') {
      return (
        <Hero 
          key={item.id}
          isMagazineMode={isMagazineMode} 
          toggleMagazineMode={() => setIsMagazineMode(true)} 
        />
      );
    }
    if (item.id === 'about') return <AboutIndex key={item.id} />;
    if (item.id === 'timeline') return <Timeline key={item.id} />;
    if (item.id === 'projects') return <Projects key={item.id} />;
    if (item.id === 'events') return <Events key={item.id} />;
    if (item.id === 'certificates') return <Certificates key={item.id} />;
    if (item.id === 'contact') return <Contact key={item.id} />;

    // Dynamic Customizable Widgets
    if (item.widgetType === 'github_stats') {
      return <GitHubStatsWidget key={item.id} config={item.config} />;
    }
    if (item.widgetType === 'music_player') {
      return <MusicPlayerWidget key={item.id} config={item.config} />;
    }
    if (item.widgetType === 'tech_matrix') {
      return <TechMatrixWidget key={item.id} config={item.config} />;
    }
    if (item.widgetType === 'quote_banner') {
      return <QuoteBannerWidget key={item.id} config={item.config} />;
    }
    if (item.widgetType === 'quick_cta') {
      return <QuickCtaWidget key={item.id} config={item.config} />;
    }
    if (item.widgetType === 'social_connect') {
      return <SocialConnectWidget key={item.id} config={item.config} />;
    }

    return null;
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', background: 'var(--bg-dark)', overflowX: 'hidden' }}>
      
      {/* 3D WebGL Canvas Background */}
      <ThreeCanvas />

      {/* Responsive Top Navigation Header */}
      <Header onOpenMagazine={() => setIsMagazineMode(true)} />

      {/* Main Dynamic Content Render based on custom layout order */}
      <main style={{ width: '100%', overflowX: 'hidden' }}>
        {layout && layout.map(renderLayoutItem)}
      </main>

      {/* 3D Magazine Booklet Modal View */}
      {isMagazineMode && (
        <BrochureView onClose={() => setIsMagazineMode(false)} />
      )}

      {/* Admin Dashboard Modal */}
      <AdminModal />

    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <PortfolioMain />
    </DataProvider>
  );
}

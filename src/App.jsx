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

function PortfolioMain() {
  const [isMagazineMode, setIsMagazineMode] = useState(false);
  const { setIsAdminOpen } = usePortfolioData();

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

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', background: 'var(--bg-dark)', overflowX: 'hidden' }}>
      
      {/* 3D WebGL Canvas Background */}
      <ThreeCanvas />

      {/* Responsive Top Navigation Header */}
      <Header onOpenMagazine={() => setIsMagazineMode(true)} />

      {/* Main Content Render */}
      <main style={{ width: '100%', overflowX: 'hidden' }}>
        <Hero 
          isMagazineMode={isMagazineMode} 
          toggleMagazineMode={() => setIsMagazineMode(true)} 
        />
        <AboutIndex />
        <Timeline />
        <Projects />
        <Events />
        <Certificates />
        <Contact />
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

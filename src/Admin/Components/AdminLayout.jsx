import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import HeaderAdmin from './HeaderAdmin';

function AdminLayout({ children, title }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobile && isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transition-transform duration-300 ${
          isMobile
            ? (isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full')
            : 'translate-x-0'
        }`}
      >
        <Sidebar 
          onNavigate={() => setIsMobileSidebarOpen(false)}
          isMobile={isMobile}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 overflow-hidden">
        <HeaderAdmin 
          onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          isMobile={isMobile}
        />
        
        {/* Main Content with proper scrolling */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-7">
            {title && <h1 className="text-xl font-semibold text-gray-900 mb-4">{title}</h1>}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
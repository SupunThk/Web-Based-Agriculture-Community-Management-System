import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  Sprout,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  Store,
  ChevronLeft,
  LogOut
} from 'lucide-react';
import AgroLinkLogo from '../../assets/agrolink-modern-logo.svg';
import SidebarItem from '../../components/admin/SidebarItem.jsx';
import StatCard from '../../components/admin/StatCard.jsx';
import UserTable from '../../components/admin/UserTable.jsx';
import BlogModeration from '../../components/admin/BlogModeration.jsx';
import DiseaseRegistry from '../../components/admin/DiseaseRegistry.jsx';
import MarketplaceManagement from '../../components/admin/MarketplaceManagement.jsx';
import { MOCK_STATS } from '../../components/admin/data/mockData.js';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 1024px)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleChange = (event) => {
      if (event.matches) {
        setSidebarOpen(true);
      }
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (!window.matchMedia('(min-width: 1024px)').matches) {
      setSidebarOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_STATS.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-6">
              <UserTable />
            </div>
          </div>
        );
      case 'users':
        return <UserTable />;
      case 'blogs':
        return <BlogModeration />;
      case 'diseases':
        return <DiseaseRegistry />;
      case 'marketplace':
        return <MarketplaceManagement />;
      default:
        return <div className="p-12 text-center text-gray-400 font-medium text-lg">Coming Soon</div>;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'System Overview';
      case 'users': return 'User Management';
      case 'blogs': return 'Blog Moderation';
      case 'diseases': return 'Disease Database';
      case 'marketplace': return 'Marketplace Management';
      default: return 'AgroLink Admin';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex font-sans text-slate-900">

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200/70 z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="px-6 pt-8 pb-6 border-b border-slate-100/80 relative">
            <button
              type="button"
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              aria-expanded={sidebarOpen}
              className="absolute right-4 top-4 p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <span className="lg:hidden">{sidebarOpen ? <X size={20} /> : <Menu size={20} />}</span>
              <span className="hidden lg:inline">{sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}</span>
            </button>
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center shadow-sm">
                <img
                  src={AgroLinkLogo}
                  alt="AgroLink logo"
                  className="w-7 h-7"
                  draggable="false"
                />
              </span>
              <div className="flex flex-col justify-center leading-tight">
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">AgroLink</span>
                <span className="text-[13px] font-semibold text-slate-400 mt-0.5">Admin Portal</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pb-4 space-y-2 overflow-y-auto custom-scrollbar">
            <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 mt-2">Main Menu</p>
            <SidebarItem
              icon={LayoutDashboard}
              label="Dashboard"
              active={activeTab === 'dashboard'}
              onClick={() => handleTabChange('dashboard')}
            />
            <SidebarItem
              icon={Users}
              label="User Management"
              active={activeTab === 'users'}
              onClick={() => handleTabChange('users')}
            />
            <SidebarItem
              icon={FileText}
              label="Blog Moderation"
              active={activeTab === 'blogs'}
              onClick={() => handleTabChange('blogs')}
            />
            <SidebarItem
              icon={Store}
              label="Marketplace"
              active={activeTab === 'marketplace'}
              onClick={() => handleTabChange('marketplace')}
            />
            <SidebarItem
              icon={Sprout}
              label="Disease Data"
              active={activeTab === 'diseases'}
              onClick={() => handleTabChange('diseases')}
            />

            <div className="pt-4">
              <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 mt-2">System</p>
            </div>
            <SidebarItem
              icon={Settings}
              label="Settings"
              active={activeTab === 'settings'}
              onClick={() => handleTabChange('settings')}
            />

            <button
              onClick={() => { /* handle logout */ }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 group relative text-slate-600 hover:bg-red-50 hover:text-red-700"
            >
              <span className="grid place-items-center w-10 h-10 rounded-xl border bg-white border-slate-200/70 group-hover:border-red-200 transition-colors shrink-0">
                <LogOut size={20} className="transition-colors text-slate-500 group-hover:text-red-600" />
              </span>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>

          {/* User Profile Snippet */}
          {/* Profile card removed as requested */}
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col h-screen overflow-hidden relative transition-[padding] duration-300 ${sidebarOpen ? 'lg:pl-72' : 'lg:pl-0'}`}>

        {/* Header */}
        <header
          className="px-4 sm:px-6 lg:px-8 flex items-center justify-between shrink-0 bg-white/70 backdrop-blur-md z-40 sticky top-0 border-b border-slate-200/70 pt-3"
          style={{ height: '107px' }}
        >
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <Menu size={24} />
              </button>
            )}
            <div className="flex flex-col">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{getPageTitle()}</h2>
              <p className="text-xs text-slate-500 font-medium">Have a nice day!</p>
            </div>
          </div>

          <div className="flex items-center gap-5 h-full">
            <div className="flex items-center gap-5 h-full">

              <button className="relative p-2.5 bg-white border border-slate-200 text-slate-600 hover:text-green-700 hover:border-green-200 rounded-2xl shadow-sm transition-all self-center">
                <Bell size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* Login Card */}
              <div className="hidden md:flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-2 shadow-sm ml-4 self-center">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                  alt="Admin"
                  className="w-9 h-9 rounded-full border border-slate-200 bg-slate-100"
                />
                <div className="flex flex-col min-w-0 justify-center">
                  <span className="text-sm font-bold text-slate-900 truncate">Admin User</span>
                  <span className="text-xs text-green-600 font-semibold truncate">Super Admin</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>

      </main>
    </div>
  );
}
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
  LogOut,
  ChevronDown
} from 'lucide-react';
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
      if (event.matches) setSidebarOpen(true);
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
    if (!window.matchMedia('(min-width: 1024px)').matches) setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center text-gray-400 font-medium text-lg">
            Coming Soon
          </div>
        );
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'users': return 'User Management';
      case 'blogs': return 'Blog Moderation';
      case 'diseases': return 'Disease Database';
      case 'marketplace': return 'Marketplace';
      default: return 'AgroLink Admin';
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case 'dashboard': return `${MOCK_STATS.reduce((a, s) => a + (parseInt(s.value) || 0), 0)} total records`;
      case 'users': return 'Manage registered users';
      case 'blogs': return 'Review and moderate posts';
      case 'diseases': return 'Browse disease entries';
      case 'marketplace': return 'Monitor listings and orders';
      default: return '';
    }
  };

  const SIDEBAR_WIDTH = 260;

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex font-sans text-slate-900">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{ width: SIDEBAR_WIDTH }}
        className={`fixed inset-y-0 left-0 z-50 flex flex-col transform transition-transform duration-300 bg-green-600
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="px-5 py-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shadow-inner">
              <Sprout size={20} className="text-white" />
            </span>
            <span className="text-xl font-extrabold text-white tracking-tight">AgroLink</span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto no-scrollbar">
          <p className="px-4 text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">Main Menu</p>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => handleTabChange('dashboard')} />
          <SidebarItem icon={Users} label="User Management" active={activeTab === 'users'} onClick={() => handleTabChange('users')} />
          <SidebarItem icon={FileText} label="Blog Moderation" active={activeTab === 'blogs'} onClick={() => handleTabChange('blogs')} />
          <SidebarItem icon={Store} label="Marketplace" active={activeTab === 'marketplace'} onClick={() => handleTabChange('marketplace')} />
          <SidebarItem icon={Sprout} label="Disease Data" active={activeTab === 'diseases'} onClick={() => handleTabChange('diseases')} />

          <div className="pt-4">
            <p className="px-4 text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">System</p>
          </div>
          <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => handleTabChange('settings')} />
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 border-t border-white/10 pt-4">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm font-medium"
            onClick={() => { }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'lg:pl-[260px]' : ''}`}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200/70 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Open sidebar"
              >
                <Menu size={22} />
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-800">{getPageTitle()}</h1>
              <p className="text-xs text-gray-400 mt-0.5">{getPageSubtitle()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 w-52 transition-all"
              />
            </div>

            {/* Bell */}
            <button className="relative p-2.5 bg-gray-50 border border-gray-200 text-gray-500 hover:text-green-600 hover:border-green-200 rounded-xl transition-all">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {/* Admin avatar */}
            <button className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 hover:border-green-300 transition-all">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                alt="Admin"
                className="w-8 h-8 rounded-full border border-gray-200 bg-gray-100"
              />
              <div className="hidden md:flex flex-col items-start leading-tight">
                <span className="text-xs font-bold text-gray-800">Admin User</span>
                <span className="text-[10px] text-green-600 font-semibold">Super Admin</span>
              </div>
              <ChevronDown size={14} className="text-gray-400 hidden md:block" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
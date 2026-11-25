import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  ExternalLink,
  FileText,
  Home,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import BrandMark from '../../components/common/BrandMark';
import AdminDashboardTab from '../../components/admin/AdminDashboardTab';
import AdminHomeTab from '../../components/admin/AdminHomeTab';
import AdminAboutTab from '../../components/admin/AdminAboutTab';
import AdminProjectsTab from '../../components/admin/AdminProjectsTab';
import AdminEnquiriesTab from '../../components/admin/AdminEnquiriesTab';
import AdminContactTab from '../../components/admin/AdminContactTab';
import AdminMediaTab from '../../components/admin/AdminMediaTab';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'home', label: 'Home Content', icon: Home },
  { id: 'about', label: 'About Content', icon: FileText },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'enquiries', label: 'Enquiries', icon: Inbox },
  { id: 'contact', label: 'Contact & Footer', icon: Mail },
  { id: 'media', label: 'Media Library', icon: ImageIcon },
];

export default function AdminLayoutPage() {
  const { admin, isAuthenticated, checking, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useDocumentMeta('Admin Panel — Northline Build', 'Northline Build Content Management System');

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0B0D10] text-white flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#D95D39] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboardTab onNavigateTab={setActiveTab} />;
      case 'home':
        return <AdminHomeTab />;
      case 'about':
        return <AdminAboutTab />;
      case 'projects':
        return <AdminProjectsTab />;
      case 'enquiries':
        return <AdminEnquiriesTab />;
      case 'contact':
        return <AdminContactTab />;
      case 'media':
        return <AdminMediaTab />;
      default:
        return <AdminDashboardTab onNavigateTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-[#0B0D10] text-white px-5 py-4 flex items-center justify-between sticky top-0 z-30">
        <BrandMark light />
        <button
          type="button"
          onClick={() => setSidebarOpen((p) => !p)}
          aria-label="Toggle admin menu"
          className="p-2 rounded-lg border border-white/15"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-68 bg-[#0B0D10] text-white flex flex-col justify-between p-6 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <Link to="/">
              <BrandMark light />
            </Link>
          </div>

          <nav aria-label="Admin sections" className="space-y-1.5">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#D95D39] text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="px-2">
            <p className="text-xs font-medium text-white truncate">{admin?.name}</p>
            <p className="text-[11px] text-white/45 truncate">{admin?.email}</p>
          </div>

          <Link
            to="/"
            className="w-full flex items-center justify-between rounded-xl border border-white/15 px-4 py-2.5 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-medium text-white hover:bg-red-500/80 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-6xl w-full mx-auto">{renderTab()}</main>
    </div>
  );
}

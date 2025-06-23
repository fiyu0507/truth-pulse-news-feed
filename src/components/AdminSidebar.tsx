
import React from 'react';
import { Activity, Globe, FileText, Users, CheckCircle, Grid3x3, TrendingUp, Cog } from 'lucide-react';

interface AdminSidebarProps {
  activeItem: string;
}

const AdminSidebar = ({ activeItem }: AdminSidebarProps) => {
  const navigationItems = [
    { id: 'dashboard', href: '/admin/dashboard', icon: Activity, label: 'Dashboard' },
    { id: 'sources', href: '/admin/sources', icon: Globe, label: 'News Sources' },
    { id: 'submissions', href: '/admin/submissions', icon: FileText, label: 'Submissions' },
    { id: 'users', href: '/admin/users', icon: Users, label: 'Users' },
    { id: 'fact-checks', href: '/admin/fact-checks', icon: CheckCircle, label: 'Fact Checks' },
    { id: 'categories', href: '/admin/categories', icon: Grid3x3, label: 'Categories' },
    { id: 'analytics', href: '/admin/analytics', icon: TrendingUp, label: 'Analytics' },
    { id: 'settings', href: '/admin/settings', icon: Cog, label: 'Settings' }
  ];

  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                  isActive 
                    ? 'text-blue-800 bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export { AdminSidebar };

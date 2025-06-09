'use client';

import { useAuthStore } from '@/lib/store/auth';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Brain,
  FolderOpen,
  Home,
  Settings,
  Users,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const industryMenuItems = [
  { href: '/dashboard', icon: Home, label: 'داشبورد' },
  { href: '/projects', icon: FolderOpen, label: 'پروژه‌های من' },
  { href: '/projects/new', icon: FileText, label: 'پروژه جدید' },
];

const academicMenuItems = [
  { href: '/dashboard', icon: Home, label: 'داشبورد' },
  { href: '/projects', icon: FolderOpen, label: 'پروژه‌های من' },
];

const adminMenuItems = [
  { href: '/admin/dashboard', icon: BarChart3, label: 'داشبورد مدیریت' },
  { href: '/admin/projects', icon: FolderOpen, label: 'مدیریت پروژه‌ها' },
  { href: '/admin/users', icon: Users, label: 'مدیریت کاربران' },
  { href: '/admin/settings', icon: Settings, label: 'تنظیمات' },
];

export function Sidebar() {
  const { user } = useAuthStore();
  const pathname = usePathname();

  if (!user) return null;

  let menuItems = industryMenuItems;
  
  if (user.userType === 'admin') {
    menuItems = adminMenuItems;
  } else if (user.userType === 'professor' || user.userType === 'student') {
    menuItems = academicMenuItems;
  }

  return (
    <aside className="w-64 bg-white border-l shadow-sm h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-semibold">کلینیک هوشیار</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
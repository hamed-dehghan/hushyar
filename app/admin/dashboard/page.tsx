'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { projectsAPI, usersAPI } from '@/lib/api';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  FolderOpen, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: projectsAPI.getAll,
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: usersAPI.getAll,
  });

  const stats = {
    totalProjects: projects.length,
    pendingProjects: projects.filter(p => p.status === 'pending').length,
    inProgressProjects: projects.filter(p => p.status === 'in_progress').length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    totalUsers: users.length,
    professors: users.filter(u => u.userType === 'professor').length,
    students: users.filter(u => u.userType === 'student').length,
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: 'secondary' as const, label: 'در حال بررسی', icon: Clock },
      in_progress: { variant: 'default' as const, label: 'در حال انجام', icon: AlertCircle },
      completed: { variant: 'outline' as const, label: 'تکمیل شده', icon: CheckCircle },
    };
    
    const config = variants[status as keyof typeof variants];
    if (!config) return null;
    
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            داشبورد مدیریت
          </h1>
          <p className="text-gray-600 mt-2">
            مدیریت کلی سیستم و نظارت بر پروژه‌ها و کاربران
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FolderOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">کل پروژه‌ها</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">در انتظار بررسی</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">در حال انجام</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.inProgressProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">کل کاربران</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>درخواست‌های جدید</CardTitle>
            </CardHeader>
            <CardContent>
              {projectsLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  {projects
                    .filter(p => p.status === 'pending')
                    .slice(0, 3)
                    .map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-gray-600">{project.clientName}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/projects/${project.id}`}>
                          بررسی
                        </Link>
                      </Button>
                    </div>
                  ))}
                  
                  {stats.pendingProjects === 0 && (
                    <p className="text-center text-gray-600 py-4">
                      درخواست جدیدی وجود ندارد
                    </p>
                  )}
                  
                  {stats.pendingProjects > 3 && (
                    <div className="text-center pt-2">
                      <Button variant="link" asChild>
                        <Link href="/admin/projects?status=pending">
                          مشاهده همه ({stats.pendingProjects})
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>پروژه‌های اخیر</CardTitle>
            </CardHeader>
            <CardContent>
              {projectsLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  {projects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-gray-600">{project.clientName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(project.status)}
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/projects/${project.id}`}>
                            مشاهده
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center pt-2">
                    <Button variant="link" asChild>
                      <Link href="/admin/projects">
                        مشاهده همه پروژه‌ها
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* System Overview */}
        <Card>
          <CardHeader>
            <CardTitle>نمای کلی سیستم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.professors}</p>
                <p className="text-sm text-gray-600">استاد</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.students}</p>
                <p className="text-sm text-gray-600">دانشجو</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.inProgressProjects}</p>
                <p className="text-sm text-gray-600">پروژه فعال</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{stats.completedProjects}</p>
                <p className="text-sm text-gray-600">پروژه تکمیل شده</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
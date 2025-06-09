'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/lib/store/auth';
import { projectsAPI, Project } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Plus, FolderOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const getStatusBadge = (status: Project['status']) => {
  const variants = {
    pending: { variant: 'secondary' as const, label: 'در حال بررسی', icon: Clock },
    in_progress: { variant: 'default' as const, label: 'در حال انجام', icon: AlertCircle },
    completed: { variant: 'outline' as const, label: 'تکمیل شده', icon: CheckCircle },
  };
  
  const config = variants[status];
  const Icon = config.icon;
  
  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsAPI.getAll,
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            خوش آمدید، {user?.fullName}
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.userType === 'industry' 
              ? 'از اینجا می‌توانید پروژه‌های خود را مدیریت کنید'
              : 'پروژه‌های تخصیص داده شده به شما را مشاهده کنید'
            }
          </p>
        </div>

        {/* Quick Actions for Industry Users */}
        {user?.userType === 'industry' && (
          <Card>
            <CardHeader>
              <CardTitle>اقدامات سریع</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/projects/new">
                  <Plus className="mr-2 h-5 w-5" />
                  ثبت درخواست پروژه جدید
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Projects Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              {user?.userType === 'industry' ? 'پروژه‌های شما' : 'پروژه‌های من'}
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/projects">مشاهده همه</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-gray-600">در حال بارگذاری...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-8">
                <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">هنوز پروژه‌ای ثبت نشده است</p>
                {user?.userType === 'industry' && (
                  <Button asChild className="mt-4">
                    <Link href="/projects/new">پروژه اول خود را ثبت کنید</Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {projects.slice(0, 5).map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Link
                          href={`/projects/${project.id}`}
                          className="font-medium text-gray-900 hover:text-primary"
                        >
                          {project.title}
                        </Link>
                        {getStatusBadge(project.status)}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-4">
                        {user?.userType !== 'industry' && (
                          <span>کارفرما: {project.clientName}</span>
                        )}
                        <span>تاریخ ثبت: {format(new Date(project.createdAt), 'yyyy/MM/dd')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FolderOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">کل پروژه‌ها</p>
                  <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
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
                  <p className="text-sm font-medium text-gray-600">در حال انجام</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {projects.filter(p => p.status === 'in_progress').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">تکمیل شده</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {projects.filter(p => p.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
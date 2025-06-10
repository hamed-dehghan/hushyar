'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { projectsAPI } from '@/lib/api';
import {
  FolderOpen,
  Users,
  MessageSquare,
  FileText,
  Calendar,
  Star,
  Download,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { ProjectEvaluationModal } from '@/components/projects/evaluation-modal';
import { useAuthStore } from '@/lib/store/auth';

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

export function ProjectDetailClient({ projectId }: { projectId: string }) {
  const { user } = useAuthStore();
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectsAPI.getById(projectId),
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">در حال بارگذاری...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <p className="text-gray-600">پروژه یافت نشد</p>
        </div>
      </DashboardLayout>
    );
  }

  const canEvaluate = user?.userType === 'industry' &&
    project.status === 'completed' &&
    project.clientId === user.id;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Project Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
              {getStatusBadge(project.status)}
            </div>
            <p className="text-gray-600">
              توسط {project.clientName} • {format(new Date(project.createdAt), 'yyyy/MM/dd')}
            </p>
          </div>

          {canEvaluate && (
            <Button onClick={() => setShowEvaluationModal(true)}>
              <Star className="mr-2 h-4 w-4" />
              ارزیابی پروژه
            </Button>
          )}
        </div>

        {/* Project Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              نمای کلی
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              تیم و گفتگو
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              فایل‌ها
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              جلسات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>شرح پروژه</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>جزئیات پروژه</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600">حوزه صنعت</p>
                      <p className="text-gray-900">{project.industryField}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">بودجه تقریبی</p>
                      <p className="text-gray-900">{project.estimatedBudget}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">زمان‌بندی</p>
                      <p className="text-gray-900">{project.estimatedTimeline}</p>
                    </div>
                    {project.evaluationScore && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">امتیاز نهایی</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-gray-900">{project.evaluationScore}/5</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>اعضای تیم</CardTitle>
                </CardHeader>
                <CardContent>
                  {project.teamMembers && project.teamMembers.length > 0 ? (
                    <div className="space-y-3">
                      {project.teamMembers.map((member) => (
                        <div key={member.id} className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.profilePictureUrl} />
                            <AvatarFallback>{member.fullName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.fullName}</p>
                            <p className="text-sm text-gray-600">
                              {member.userType === 'professor' ? 'استاد' : 'دانشجو'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">هنوز تیمی تخصیص داده نشده</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    گفتگوی تیم
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">قابلیت چت بزودی فعال می‌شود</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>فایل‌های پروژه</CardTitle>
              </CardHeader>
              <CardContent>
                {project.attachments && project.attachments.length > 0 ? (
                  <div className="space-y-3">
                    {project.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <span>{file}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          دانلود
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">فایلی آپلود نشده است</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>جلسات برنامه‌ریزی شده</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">جلسه‌ای برنامه‌ریزی نشده است</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Evaluation Modal */}
      <ProjectEvaluationModal
        open={showEvaluationModal}
        onOpenChange={setShowEvaluationModal}
        projectId={projectId}
        projectTitle={project.title}
      />
    </DashboardLayout>
  );
} 
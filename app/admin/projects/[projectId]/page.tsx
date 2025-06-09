'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { useQuery } from '@tanstack/react-query';
import { projectsAPI, usersAPI, User } from '@/lib/api';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Search, 
  UserPlus,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function AdminProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const { toast } = useToast();

  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ['admin-project', projectId],
    queryFn: () => projectsAPI.getById(projectId),
  });

  const { data: allUsers = [], isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users-search', searchTerm],
    queryFn: () => usersAPI.search(searchTerm),
  });

  const filteredUsers = allUsers.filter(user => 
    user.userType === 'professor' || user.userType === 'student'
  );

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

  const handleUserSelection = (user: User, selected: boolean) => {
    if (selected) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
    }
  };

  const handleAssignTeam = async () => {
    if (selectedUsers.length === 0) {
      toast({
        title: 'خطا',
        description: 'لطفاً حداقل یک نفر را انتخاب کنید',
        variant: 'destructive',
      });
      return;
    }

    setIsAssigning(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'تیم تخصیص داده شد',
        description: `${selectedUsers.length} نفر به پروژه اضافه شدند`,
      });
      
      setSelectedUsers([]);
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'خطا در تخصیص تیم',
        variant: 'destructive',
      });
    } finally {
      setIsAssigning(false);
    }
  };

  if (projectLoading) {
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Project Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
            {getStatusBadge(project.status)}
          </div>
          <p className="text-gray-600">
            توسط {project.clientName} • {project.createdAt}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>جزئیات پروژه</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">شرح پروژه</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div>
                  <p className="text-sm font-medium text-gray-600">وضعیت فعلی</p>
                  {getStatusBadge(project.status)}
                </div>
              </div>

              {/* Current Team */}
              {project.teamMembers && project.teamMembers.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">تیم فعلی</h3>
                  <div className="space-y-2">
                    {project.teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center gap-3 p-2 border rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.profilePictureUrl} />
                          <AvatarFallback>{member.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.fullName}</p>
                          <p className="text-xs text-gray-600">
                            {member.userType === 'professor' ? 'استاد' : 'دانشجو'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Team Assignment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                تشکیل تیم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="جستجوی اساتید و دانشجویان..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>

              {/* Selected Users */}
              {selectedUsers.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    انتخاب شده ({selectedUsers.length})
                  </p>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedUsers.map((user) => (
                      <div key={user.id} className="flex items-center gap-3 p-2 bg-primary/10 rounded-lg">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user.profilePictureUrl} />
                          <AvatarFallback className="text-xs">{user.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{user.fullName}</p>
                          <p className="text-xs text-gray-600">
                            {user.userType === 'professor' ? 'استاد' : 'دانشجو'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Users */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">اساتید و دانشجویان</p>
                {usersLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {filteredUsers.map((user) => {
                      const isSelected = selectedUsers.some(u => u.id === user.id);
                      return (
                        <div key={user.id} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(checked) => handleUserSelection(user, checked as boolean)}
                          />
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.profilePictureUrl} />
                            <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{user.fullName}</p>
                            <p className="text-xs text-gray-600">
                              {user.userType === 'professor' ? 'استاد' : 'دانشجو'}
                            </p>
                            {user.skills && user.skills.length > 0 && (
                              <div className="flex gap-1 mt-1">
                                {user.skills.slice(0, 2).map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {user.skills.length > 2 && (
                                  <span className="text-xs text-gray-500">
                                    +{user.skills.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    
                    {filteredUsers.length === 0 && (
                      <div className="text-center py-4 text-gray-600">
                        کاربری یافت نشد
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Assign Button */}
              <Button 
                onClick={handleAssignTeam}
                disabled={selectedUsers.length === 0 || isAssigning}
                className="w-full"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                {isAssigning ? 'در حال تخصیص...' : `تخصیص تیم (${selectedUsers.length})`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
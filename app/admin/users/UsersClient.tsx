'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, UserType } from '@/lib/store/auth';

interface ExtendedUser extends User {
  user_id: string;
  company_name?: string;
  created_at: string;
  skills?: string[];
  profilePictureUrl?: string;
  bio?: string;
}

const defaultUsers: ExtendedUser[] = [
  // Industry Users
  {
    user_id: 'ind-1',
    id: 'ind-1',
    fullName: 'احمد رضایی',
    email: 'ahmad.rezaei@parsindustry.com',
    mobile: '09123456789',
    userType: 'industry',
    profilePictureUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'مدیر فنی شرکت صنعتی پارس با 15 سال تجربه در زمینه اتوماسیون صنعتی',
    skills: ['Automation', 'PLC Programming', 'Industrial IoT', 'Process Control'],
    company_name: 'شرکت صنعتی پارس',
    isVerified: true,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    user_id: 'ind-2',
    id: 'ind-2',
    fullName: 'فاطمه کریمی',
    email: 'fateme.karimi@aryagroup.com',
    mobile: '09187654321',
    userType: 'industry',
    profilePictureUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'مدیر ارشد فناوری اطلاعات در گروه تجاری آریا',
    skills: ['IT Management', 'Digital Transformation', 'ERP Systems', 'Data Analytics'],
    company_name: 'گروه تجاری آریا',
    isVerified: true,
    created_at: '2024-01-20T14:15:00Z'
  },
  {
    user_id: 'ind-3',
    id: 'ind-3',
    fullName: 'محمد حسینی',
    email: 'mohammad.hosseini@techstartup.com',
    mobile: '09351234567',
    userType: 'industry',
    profilePictureUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'بنیان‌گذار و مدیرعامل استارتاپ فناوری',
    skills: ['Startup Management', 'Product Development', 'AI/ML', 'Business Strategy'],
    company_name: 'استارتاپ فناوری نوین',
    isVerified: false,
    created_at: '2024-02-01T09:45:00Z'
  },

  // Professor Users
  {
    user_id: 'prof-1',
    id: 'prof-1',
    fullName: 'دکتر علی احمدی',
    email: 'ahmadi@university.ac.ir',
    mobile: '09123456789',
    userType: 'professor',
    profilePictureUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'استاد تمام دانشکده مهندسی کامپیوتر دانشگاه تهران',
    skills: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Natural Language Processing'],
    company_name: 'دانشگاه تهران',
    isVerified: true,
    created_at: '2023-12-01T08:00:00Z'
  },
  {
    user_id: 'prof-2',
    id: 'prof-2',
    fullName: 'دکتر مریم محمدی',
    email: 'mohammadi@sharif.edu',
    mobile: '09187654321',
    userType: 'professor',
    profilePictureUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'استاد دانشکده مهندسی برق دانشگاه صنعتی شریف',
    skills: ['Signal Processing', 'Control Systems', 'Robotics', 'Embedded Systems'],
    company_name: 'دانشگاه صنعتی شریف',
    isVerified: true,
    created_at: '2023-11-15T10:30:00Z'
  },
  {
    user_id: 'prof-3',
    id: 'prof-3',
    fullName: 'دکتر رضا نوری',
    email: 'nouri@amirkabir.ac.ir',
    mobile: '09351234567',
    userType: 'professor',
    profilePictureUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'استاد دانشکده مهندسی صنایع دانشگاه امیرکبیر',
    skills: ['Operations Research', 'Supply Chain Management', 'Quality Control', 'Project Management'],
    company_name: 'دانشگاه امیرکبیر',
    isVerified: true,
    created_at: '2023-10-20T14:15:00Z'
  },

  // Student Users
  {
    user_id: 'stu-1',
    id: 'stu-1',
    fullName: 'سارا محمدی',
    email: 'sara@student.ac.ir',
    mobile: '09123456789',
    userType: 'student',
    profilePictureUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'دانشجوی کارشناسی ارشد مهندسی کامپیوتر دانشگاه تهران',
    skills: ['Python', 'TensorFlow', 'Data Analysis', 'Web Development'],
    company_name: 'دانشگاه تهران',
    isVerified: true,
    created_at: '2024-01-10T11:20:00Z'
  },
  {
    user_id: 'stu-2',
    id: 'stu-2',
    fullName: 'علی رضایی',
    email: 'ali.rezaei@student.sharif.edu',
    mobile: '09187654321',
    userType: 'student',
    profilePictureUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'دانشجوی دکتری مهندسی برق دانشگاه صنعتی شریف',
    skills: ['MATLAB', 'Simulink', 'Control Theory', 'Robotics'],
    company_name: 'دانشگاه صنعتی شریف',
    isVerified: true,
    created_at: '2023-12-05T09:30:00Z'
  },
  {
    user_id: 'stu-3',
    id: 'stu-3',
    fullName: 'فاطمه کریمی',
    email: 'fateme.karimi@student.amirkabir.ac.ir',
    mobile: '09351234567',
    userType: 'student',
    profilePictureUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'دانشجوی کارشناسی مهندسی صنایع دانشگاه امیرکبیر',
    skills: ['Excel', 'SPSS', 'Process Modeling', 'Quality Management'],
    company_name: 'دانشگاه امیرکبیر',
    isVerified: false,
    created_at: '2024-02-05T16:45:00Z'
  },

  // Admin Users
  {
    user_id: 'admin-1',
    id: 'admin-1',
    fullName: 'مدیر سیستم',
    email: 'admin@clinic.com',
    mobile: '09123456789',
    userType: 'admin',
    profilePictureUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'مدیر ارشد سیستم و مسئول نظارت بر کلیه عملیات',
    skills: ['System Administration', 'User Management', 'Security', 'Database Management'],
    company_name: 'سیستم مدیریت',
    isVerified: true,
    created_at: '2023-01-01T00:00:00Z'
  },
  {
    user_id: 'admin-2',
    id: 'admin-2',
    fullName: 'علی مدیر',
    email: 'ali.admin@clinic.com',
    mobile: '09187654321',
    userType: 'admin',
    profilePictureUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'مدیر فنی و مسئول پشتیبانی سیستم',
    skills: ['Technical Support', 'System Maintenance', 'User Training', 'Documentation'],
    company_name: 'سیستم مدیریت',
    isVerified: true,
    created_at: '2023-06-15T12:00:00Z'
  }
];

export function UsersClient() {
  const [users] = useState<ExtendedUser[]>(defaultUsers);

  const getUserTypeBadge = (userType: UserType) => {
    const variants = {
      industry: { variant: 'default' as const, label: 'صنعت' },
      professor: { variant: 'secondary' as const, label: 'استاد' },
      student: { variant: 'outline' as const, label: 'دانشجو' },
      admin: { variant: 'destructive' as const, label: 'مدیر' },
    };
    
    const config = variants[userType];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">مدیریت کاربران</h1>
          <p className="text-gray-600 mt-2">مدیریت و نظارت بر کاربران سیستم</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>لیست کاربران ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.user_id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.profilePictureUrl} />
                      <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="font-medium">{user.fullName}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                      <div className="text-sm text-gray-600">{user.mobile}</div>
                      {user.bio && (
                        <div className="text-sm text-gray-500 max-w-md">{user.bio}</div>
                      )}
                      {user.skills && user.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {user.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {user.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{user.skills.length - 3} بیشتر
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div>{getUserTypeBadge(user.userType)}</div>
                    <div className="text-sm">{user.company_name}</div>
                    <Badge variant={user.isVerified ? 'default' : 'secondary'}>
                      {user.isVerified ? 'تایید شده' : 'در انتظار تایید'}
                    </Badge>
                    <div className="text-xs text-gray-500">{formatDate(user.created_at)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 
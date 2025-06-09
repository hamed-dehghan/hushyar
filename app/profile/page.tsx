'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store/auth';
import { useToast } from '@/hooks/use-toast';
import { User, Upload, X } from 'lucide-react';

const profileSchema = z.object({
  fullName: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  bio: z.string().optional(),
  profilePictureUrl: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      bio: user?.bio || '',
      profilePictureUrl: user?.profilePictureUrl || '',
    },
  });

  const onSubmit = async (data: ProfileForm) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateUser({
        ...data,
        skills,
      });
      
      toast({
        title: 'پروفایل به‌روزرسانی شد',
        description: 'اطلاعات پروفایل شما با موفقیت ذخیره شد',
      });
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'خطا در به‌روزرسانی پروفایل',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <User className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">پروفایل کاربری</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>اطلاعات شخصی</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.profilePictureUrl} />
                  <AvatarFallback className="text-lg">
                    {user.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    تصویر پروفایل
                  </p>
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    آپلود تصویر جدید
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">نام و نام خانوادگی</Label>
                <Input
                  id="fullName"
                  {...register('fullName')}
                  disabled={isLoading}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>ایمیل</Label>
                <Input value={user.email} disabled />
                <p className="text-xs text-gray-500">ایمیل قابل ویرایش نیست</p>
              </div>

              <div className="space-y-2">
                <Label>شماره موبایل</Label>
                <Input value={user.mobile} disabled />
                <p className="text-xs text-gray-500">شماره موبایل قابل ویرایش نیست</p>
              </div>

              <div className="space-y-2">
                <Label>نوع کاربری</Label>
                <Input 
                  value={
                    user.userType === 'industry' ? 'نماینده صنعت' :
                    user.userType === 'professor' ? 'استاد' :
                    user.userType === 'student' ? 'دانشجو' : 'مدیر سیستم'
                  } 
                  disabled 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">درباره من</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  placeholder="کمی درباره خود بنویسید..."
                  {...register('bio')}
                  disabled={isLoading}
                />
                {errors.bio && (
                  <p className="text-sm text-destructive">{errors.bio.message}</p>
                )}
              </div>

              {/* Skills Section */}
              {(user.userType === 'professor' || user.userType === 'student') && (
                <div className="space-y-4">
                  <Label>مهارت‌ها</Label>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="مهارت جدید اضافه کنید"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      onClick={addSkill}
                      disabled={!newSkill.trim() || isLoading}
                    >
                      افزودن
                    </Button>
                  </div>

                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
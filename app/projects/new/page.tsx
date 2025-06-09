'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { projectsAPI, ProjectFormData } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { FileText, Upload } from 'lucide-react';

const projectSchema = z.object({
  title: z.string().min(1, 'عنوان پروژه الزامی است'),
  description: z.string().min(10, 'شرح پروژه باید حداقل ۱۰ کاراکتر باشد'),
  industryField: z.string().min(1, 'حوزه صنعت الزامی است'),
  estimatedBudget: z.string().min(1, 'بودجه تقریبی الزامی است'),
  estimatedTimeline: z.string().min(1, 'زمان‌بندی تقریبی الزامی است'),
});

type ProjectForm = z.infer<typeof projectSchema>;

export default function NewProjectPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: ProjectForm) => {
    setIsLoading(true);
    try {
      const formData: ProjectFormData = {
        ...data,
        attachments,
      };
      
      await projectsAPI.create(formData);
      
      toast({
        title: 'پروژه ثبت شد',
        description: 'درخواست پروژه شما با موفقیت ثبت شد و در حال بررسی است',
      });
      
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'خطا در ثبت پروژه. لطفاً دوباره تلاش کنید.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            ثبت درخواست پروژه جدید
          </h1>
          <p className="text-gray-600 mt-2">
            لطفاً جزئیات چالش صنعتی خود را به طور کامل وارد کنید
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>اطلاعات پروژه</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان پروژه *</Label>
                <Input
                  id="title"
                  placeholder="مثال: سیستم تشخیص عیوب تولید"
                  {...register('title')}
                  disabled={isLoading}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">شرح کامل چالش *</Label>
                <Textarea
                  id="description"
                  rows={6}
                  placeholder="لطفاً چالش صنعتی خود را به تفصیل شرح دهید..."
                  {...register('description')}
                  disabled={isLoading}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="industryField">حوزه صنعت *</Label>
                <Input
                  id="industryField"
                  placeholder="مثال: صنایع تولیدی، بانکداری، بهداشت و درمان"
                  {...register('industryField')}
                  disabled={isLoading}
                />
                {errors.industryField && (
                  <p className="text-sm text-destructive">{errors.industryField.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimatedBudget">بودجه تقریبی *</Label>
                  <Input
                    id="estimatedBudget"
                    placeholder="مثال: 50-100 میلیون تومان"
                    {...register('estimatedBudget')}
                    disabled={isLoading}
                  />
                  {errors.estimatedBudget && (
                    <p className="text-sm text-destructive">{errors.estimatedBudget.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedTimeline">زمان‌بندی تقریبی *</Label>
                  <Input
                    id="estimatedTimeline"
                    placeholder="مثال: 3-6 ماه"
                    {...register('estimatedTimeline')}
                    disabled={isLoading}
                  />
                  {errors.estimatedTimeline && (
                    <p className="text-sm text-destructive">{errors.estimatedTimeline.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachments">فایل‌های پیوست</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    فایل‌های مربوط به پروژه را آپلود کنید
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    disabled={isLoading}
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" disabled={isLoading}>
                      انتخاب فایل‌ها
                    </Button>
                  </Label>
                </div>
                {attachments.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">فایل‌های انتخاب شده:</p>
                    <ul className="text-sm text-gray-600">
                      {attachments.map((file, index) => (
                        <li key={index}>• {file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? 'در حال ارسال...' : 'ارسال درخواست'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isLoading}
                >
                  انصراف
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
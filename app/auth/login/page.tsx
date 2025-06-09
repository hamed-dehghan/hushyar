'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import { authAPI, LoginData } from '@/lib/api';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from 'next/navigation';
import { Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  emailOrMobile: z.string().min(1, 'ایمیل یا شماره موبایل الزامی است'),
  password: z.string().min(1, 'رمز عبور الزامی است'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const user = await authAPI.login(data as LoginData);
      login(user);
      toast({
        title: 'ورود موفق',
        description: `خوش آمدید ${user.fullName}`,
      });
      
      // Redirect based on user type
      if (user.userType === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'نام کاربری یا رمز عبور اشتباه است',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">کلینیک هوشیار</span>
          </div>
          <CardTitle className="text-2xl">ورود</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emailOrMobile">ایمیل یا شماره موبایل</Label>
              <Input
                id="emailOrMobile"
                {...register('emailOrMobile')}
                disabled={isLoading}
                placeholder="example@email.com یا 09123456789"
              />
              {errors.emailOrMobile && (
                <p className="text-sm text-destructive">{errors.emailOrMobile.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="text-left">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                رمز عبور خود را فراموش کرده‌اید؟
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'در حال ورود...' : 'ورود'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              حساب کاربری ندارید؟{' '}
              <Link href="/auth/signup" className="text-primary hover:underline">
                ثبت‌نام
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">برای تست:</p>
            <p className="text-xs">ادمین: admin@clinic.com</p>
            <p className="text-xs">رمز: هر چیزی</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
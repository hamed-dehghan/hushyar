'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import { authAPI, SignupData } from '@/lib/api';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from 'next/navigation';
import { Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const signupSchema = z.object({
  fullName: z.string().min(2, 'نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد'),
  email: z.string().email('فرمت ایمیل صحیح نیست'),
  mobile: z.string().regex(/^09\d{9}$/, 'شماره موبایل صحیح نیست'),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
  passwordConfirm: z.string(),
  userType: z.enum(['industry', 'professor', 'student']),
}).refine((data) => data.password === data.passwordConfirm, {
  message: 'رمزهای عبور مطابقت ندارند',
  path: ['passwordConfirm'],
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    try {
      const user = await authAPI.signup(data as SignupData);
      login(user);
      toast({
        title: 'ثبت‌نام موفق',
        description: 'حساب کاربری شما با موفقیت ایجاد شد',
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.',
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
          <CardTitle className="text-2xl">ثبت‌نام</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">شماره موبایل</Label>
              <Input
                id="mobile"
                {...register('mobile')}
                placeholder="09123456789"
                disabled={isLoading}
              />
              {errors.mobile && (
                <p className="text-sm text-destructive">{errors.mobile.message}</p>
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

            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">تکرار رمز عبور</Label>
              <Input
                id="passwordConfirm"
                type="password"
                {...register('passwordConfirm')}
                disabled={isLoading}
              />
              {errors.passwordConfirm && (
                <p className="text-sm text-destructive">{errors.passwordConfirm.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>نوع کاربری</Label>
              <Select onValueChange={(value) => setValue('userType', value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="نوع کاربری خود را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="industry">من از طرف صنعت هستم</SelectItem>
                  <SelectItem value="professor">من استاد هستم</SelectItem>
                  <SelectItem value="student">من دانشجو هستم</SelectItem>
                </SelectContent>
              </Select>
              {errors.userType && (
                <p className="text-sm text-destructive">{errors.userType.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              قبلاً ثبت‌نام کرده‌اید؟{' '}
              <Link href="/auth/login" className="text-primary hover:underline">
                ورود
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
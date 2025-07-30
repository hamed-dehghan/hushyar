'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Users, Lightbulb, Target, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            کلینیک هوشیار
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            پلتفرم اتصال صنایع به متخصصان هوش مصنوعی
            <br />
            برای حل چالش‌های صنعتی و نوآوری در کسب‌وکار
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/auth/signup">
                شروع کنید
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <Link href="/auth/login">ورود</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          چرا کلینیک هوشیار؟
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">متخصصان باتجربه</h3>
              <p className="text-gray-600">
                دسترسی به اساتید و دانشجویان برتر در حوزه هوش مصنوعی
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">راهکارهای هدفمند</h3>
              <p className="text-gray-600">
                حل چالش‌های واقعی صنعت با استفاده از فناوری‌های نوین
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">همکاری تیمی</h3>
              <p className="text-gray-600">
                محیط همکاری برای تیم‌های دانشگاهی و صنعتی
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">نوآوری</h3>
              <p className="text-gray-600">
                ایجاد راهکارهای نوآورانه برای چالش‌های پیچیده
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            نحوه کارکرد
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                ۱
              </div>
              <h3 className="text-xl font-semibold mb-3">ثبت چالش</h3>
              <p className="text-gray-600">
                صنایع چالش‌های خود را در پلتفرم ثبت می‌کنند
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                ۲
              </div>
              <h3 className="text-xl font-semibold mb-3">تشکیل تیم</h3>
              <p className="text-gray-600">
                متخصصان مناسب انتخاب و تیم پروژه تشکیل می‌شود
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                ۳
              </div>
              <h3 className="text-xl font-semibold mb-3">تحویل راهکار</h3>
              <p className="text-gray-600">
                راهکار نهایی تحویل و ارزیابی می‌شود
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center relative flex p-10 justify-between">
          <div className="flex items-start flex-col justify-center gap-2 mb-4">
            <div className='flex items-center justify-center gap-2'>
              <Image src="/hooshyar.svg" alt="کلینیک هوشیار" width={45} height={45} className="h-10 w-auto p-1 rounded-full" />
              <span className="text-xl font-bold">کلینیک هوشیار</span>
            </div>
            <p className="text-gray-400">
              پل ارتباطی میان صنعت و دانشگاه در حوزه هوش مصنوعی
            </p>
          </div>

          <div className='flex items-start justify-center gap-4'>
            <div className='flex flex-col items-center gap-2'>
              <Image
                src="/logo.png"
                alt="کلینیک هوشیار"
                width={45}
                height={45}
                className="h-20 w-auto bg-white p-1 rounded-full"
              />
              <span className='text-white text-xs text-center w-40 leading-tight'>
                دانشکده هوش مصنوعی و فناوریهای اجتماعی و پیشرفته واحد یزد
              </span>
            </div>
            <div className='flex flex-col items-center gap-6'>
              <Image
                src="/IAU.png"
                alt="کلینیک هوشیار"
                width={45}
                height={45}
                className="h-20 w-20 object-contain bg-white border border-white rounded-xl"
              />
              <span className='text-white text-xs text-center w-40 leading-tight'>
                دانشگاه آزاد اسلامی یزد
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
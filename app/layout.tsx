import './globals.css';
import type { Metadata } from 'next';
import { QueryProvider } from '@/components/providers/query-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'کلینیک هوشیار - اتصال صنعت به هوش مصنوعی',
  description: 'پلتفرم اتصال صنایع به متخصصان هوش مصنوعی برای حل چالش‌های صنعتی',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Settings, 
  Users, 
  Shield, 
  Database, 
  Bell, 
  Globe,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SettingsClient() {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    // Site Settings
    siteName: 'پلتفرم پروژه‌های دانشگاهی',
    siteDescription: 'پلتفرم ارتباط صنعت و دانشگاه',
    contactEmail: 'admin@university-project.ir',
    supportPhone: '021-12345678',
    
    // User Management
    allowUserRegistration: true,
    requireEmailVerification: true,
    allowGuestAccess: false,
    maxProjectsPerUser: 5,
    
    // Security Settings
    sessionTimeout: 30,
    requireStrongPasswords: true,
    enableTwoFactorAuth: false,
    maxLoginAttempts: 5,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    projectUpdates: true,
    systemAlerts: true,
    
    // System Settings
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true,
    backupFrequency: 'daily',
    
    // Content Settings
    defaultLanguage: 'fa',
    allowComments: true,
    moderateComments: true,
    maxFileSize: 10,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "تنظیمات ذخیره شد",
        description: "تغییرات با موفقیت اعمال شدند.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "خطا در ذخیره تنظیمات",
        description: "لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSettings = () => {
    // Reset to default values
    setSettings({
      siteName: 'پلتفرم پروژه‌های دانشگاهی',
      siteDescription: 'پلتفرم ارتباط صنعت و دانشگاه',
      contactEmail: 'admin@university-project.ir',
      supportPhone: '021-12345678',
      allowUserRegistration: true,
      requireEmailVerification: true,
      allowGuestAccess: false,
      maxProjectsPerUser: 5,
      sessionTimeout: 30,
      requireStrongPasswords: true,
      enableTwoFactorAuth: false,
      maxLoginAttempts: 5,
      emailNotifications: true,
      smsNotifications: false,
      projectUpdates: true,
      systemAlerts: true,
      maintenanceMode: false,
      debugMode: false,
      autoBackup: true,
      backupFrequency: 'daily',
      defaultLanguage: 'fa',
      allowComments: true,
      moderateComments: true,
      maxFileSize: 10,
    });
    
    toast({
      title: "تنظیمات بازنشانی شد",
      description: "تنظیمات به مقادیر پیش‌فرض بازگشت.",
      variant: "default",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">تنظیمات سیستم</h1>
            <p className="text-gray-600 mt-2">
              مدیریت تنظیمات کلی سیستم و پیکربندی
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleResetSettings}
              disabled={isLoading}
            >
              بازنشانی
            </Button>
            <Button
              onClick={handleSaveSettings}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isLoading ? 'در حال ذخیره...' : 'ذخیره تنظیمات'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Site Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                تنظیمات سایت
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteName">نام سایت</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange('siteName', e.target.value)}
                  placeholder="نام سایت"
                />
              </div>
              
              <div>
                <Label htmlFor="siteDescription">توضیحات سایت</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                  placeholder="توضیحات سایت"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="contactEmail">ایمیل تماس</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                  placeholder="admin@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="supportPhone">شماره پشتیبانی</Label>
                <Input
                  id="supportPhone"
                  value={settings.supportPhone}
                  onChange={(e) => handleSettingChange('supportPhone', e.target.value)}
                  placeholder="021-12345678"
                />
              </div>
            </CardContent>
          </Card>

          {/* User Management Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                تنظیمات کاربران
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>ثبت‌نام کاربران جدید</Label>
                  <p className="text-sm text-gray-500">اجازه ثبت‌نام کاربران جدید</p>
                </div>
                <Switch
                  checked={settings.allowUserRegistration}
                  onCheckedChange={(checked) => handleSettingChange('allowUserRegistration', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>تأیید ایمیل اجباری</Label>
                  <p className="text-sm text-gray-500">نیاز به تأیید ایمیل برای ثبت‌نام</p>
                </div>
                <Switch
                  checked={settings.requireEmailVerification}
                  onCheckedChange={(checked) => handleSettingChange('requireEmailVerification', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>دسترسی مهمان</Label>
                  <p className="text-sm text-gray-500">اجازه دسترسی بدون ثبت‌نام</p>
                </div>
                <Switch
                  checked={settings.allowGuestAccess}
                  onCheckedChange={(checked) => handleSettingChange('allowGuestAccess', checked)}
                />
              </div>
              
              <div>
                <Label htmlFor="maxProjects">حداکثر پروژه‌ها per کاربر</Label>
                <Input
                  id="maxProjects"
                  type="number"
                  value={settings.maxProjectsPerUser}
                  onChange={(e) => handleSettingChange('maxProjectsPerUser', parseInt(e.target.value))}
                  min="1"
                  max="50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                تنظیمات امنیتی
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sessionTimeout">مدت زمان نشست (دقیقه)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  min="5"
                  max="480"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>رمز عبور قوی</Label>
                  <p className="text-sm text-gray-500">نیاز به رمز عبور پیچیده</p>
                </div>
                <Switch
                  checked={settings.requireStrongPasswords}
                  onCheckedChange={(checked) => handleSettingChange('requireStrongPasswords', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>احراز هویت دو مرحله‌ای</Label>
                  <p className="text-sm text-gray-500">فعال‌سازی 2FA</p>
                </div>
                <Switch
                  checked={settings.enableTwoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange('enableTwoFactorAuth', checked)}
                />
              </div>
              
              <div>
                <Label htmlFor="maxLoginAttempts">حداکثر تلاش ورود</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                  min="3"
                  max="10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                تنظیمات اعلان‌ها
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>اعلان‌های ایمیل</Label>
                  <p className="text-sm text-gray-500">ارسال اعلان‌ها از طریق ایمیل</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>اعلان‌های پیامک</Label>
                  <p className="text-sm text-gray-500">ارسال اعلان‌ها از طریق پیامک</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>به‌روزرسانی پروژه‌ها</Label>
                  <p className="text-sm text-gray-500">اعلان تغییرات پروژه</p>
                </div>
                <Switch
                  checked={settings.projectUpdates}
                  onCheckedChange={(checked) => handleSettingChange('projectUpdates', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>هشدارهای سیستم</Label>
                  <p className="text-sm text-gray-500">اعلان مشکلات سیستم</p>
                </div>
                <Switch
                  checked={settings.systemAlerts}
                  onCheckedChange={(checked) => handleSettingChange('systemAlerts', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                تنظیمات سیستم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>حالت نگهداری</Label>
                  <p className="text-sm text-gray-500">غیرفعال‌سازی موقت سایت</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>حالت دیباگ</Label>
                  <p className="text-sm text-gray-500">نمایش اطلاعات خطا</p>
                </div>
                <Switch
                  checked={settings.debugMode}
                  onCheckedChange={(checked) => handleSettingChange('debugMode', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>پشتیبان‌گیری خودکار</Label>
                  <p className="text-sm text-gray-500">پشتیبان‌گیری خودکار از داده‌ها</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
                />
              </div>
              
              <div>
                <Label htmlFor="backupFrequency">فرکانس پشتیبان‌گیری</Label>
                <Select
                  value={settings.backupFrequency}
                  onValueChange={(value) => handleSettingChange('backupFrequency', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">ساعتی</SelectItem>
                    <SelectItem value="daily">روزانه</SelectItem>
                    <SelectItem value="weekly">هفتگی</SelectItem>
                    <SelectItem value="monthly">ماهانه</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Content Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                تنظیمات محتوا
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="defaultLanguage">زبان پیش‌فرض</Label>
                <Select
                  value={settings.defaultLanguage}
                  onValueChange={(value) => handleSettingChange('defaultLanguage', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fa">فارسی</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>نظرات</Label>
                  <p className="text-sm text-gray-500">فعال‌سازی سیستم نظرات</p>
                </div>
                <Switch
                  checked={settings.allowComments}
                  onCheckedChange={(checked) => handleSettingChange('allowComments', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>تأیید نظرات</Label>
                  <p className="text-sm text-gray-500">نیاز به تأیید قبل از انتشار</p>
                </div>
                <Switch
                  checked={settings.moderateComments}
                  onCheckedChange={(checked) => handleSettingChange('moderateComments', checked)}
                />
              </div>
              
              <div>
                <Label htmlFor="maxFileSize">حداکثر اندازه فایل (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
                  min="1"
                  max="100"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>وضعیت سیستم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">سیستم فعال</p>
                  <p className="text-sm text-green-600">همه سرویس‌ها در حال کار</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Database className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">پایگاه داده</p>
                  <p className="text-sm text-blue-600">اتصال برقرار</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-900">فضای ذخیره</p>
                  <p className="text-sm text-yellow-600">75% استفاده شده</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 
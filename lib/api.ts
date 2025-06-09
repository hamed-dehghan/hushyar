// Mock API functions - در آینده با API واقعی جایگزین خواهد شد

import { User, UserType } from './store/auth';

export interface Project {
  id: string;
  title: string;
  description: string;
  industryField: string;
  estimatedBudget: string;
  estimatedTimeline: string;
  status: 'pending' | 'in_progress' | 'completed';
  clientId: string;
  clientName: string;
  teamMembers?: User[];
  createdAt: string;
  attachments?: string[];
  evaluationScore?: number;
}

export interface SignupData {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  passwordConfirm: string;
  userType: UserType;
}

export interface LoginData {
  emailOrMobile: string;
  password: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  industryField: string;
  estimatedBudget: string;
  estimatedTimeline: string;
  attachments?: File[];
}

export interface EvaluationData {
  projectId: string;
  innovationScore: number;
  accuracyScore: number;
  usabilityScore: number;
  comments: string;
}

// Authentication API
export const authAPI = {
  signup: async (data: SignupData): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      fullName: data.fullName,
      email: data.email,
      mobile: data.mobile,
      userType: data.userType,
      isVerified: false,
    };
  },

  login: async (data: LoginData): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on email/mobile
    if (data.emailOrMobile === 'admin@clinic.com') {
      return {
        id: 'admin-1',
        fullName: 'مدیر سیستم',
        email: 'admin@clinic.com',
        mobile: '09123456789',
        userType: 'admin',
        isVerified: true,
      };
    }
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      fullName: 'کاربر نمونه',
      email: data.emailOrMobile.includes('@') ? data.emailOrMobile : 'user@example.com',
      mobile: data.emailOrMobile.includes('@') ? '09123456789' : data.emailOrMobile,
      userType: 'industry',
      isVerified: true,
    };
  },
};

// Projects API
export const projectsAPI = {
  create: async (data: ProjectFormData): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      description: data.description,
      industryField: data.industryField,
      estimatedBudget: data.estimatedBudget,
      estimatedTimeline: data.estimatedTimeline,
      status: 'pending',
      clientId: 'current-user-id',
      clientName: 'شرکت نمونه',
      createdAt: new Date().toISOString(),
    };
  },

  getAll: async (): Promise<Project[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: '1',
        title: 'سیستم تشخیص عیوب تولید',
        description: 'نیاز به سیستم هوش مصنوعی برای تشخیص عیوب در خط تولید',
        industryField: 'صنایع تولیدی',
        estimatedBudget: '50-100 میلیون تومان',
        estimatedTimeline: '3-6 ماه',
        status: 'in_progress',
        clientId: 'client-1',
        clientName: 'شرکت صنعتی پارس',
        createdAt: '2024-01-15',
      },
      {
        id: '2',
        title: 'پیش‌بینی تقاضای بازار',
        description: 'مدل پیش‌بینی تقاضا برای محصولات شرکت',
        industryField: 'بازاریابی',
        estimatedBudget: '30-50 میلیون تومان',
        estimatedTimeline: '2-4 ماه',
        status: 'completed',
        clientId: 'client-2',
        clientName: 'گروه تجاری آریا',
        createdAt: '2024-01-10',
        evaluationScore: 4.5,
      },
    ];
  },

  getById: async (id: string): Promise<Project | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const projects = await projectsAPI.getAll();
    return projects.find(p => p.id === id) || null;
  },

  evaluate: async (data: EvaluationData): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // در API واقعی، ارزیابی پروژه ذخیره می‌شود
  },
};

// Users API (for admin)
export const usersAPI = {
  getAll: async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 'prof-1',
        fullName: 'دکتر علی احمدی',
        email: 'ahmadi@university.ac.ir',
        mobile: '09123456789',
        userType: 'professor',
        skills: ['Machine Learning', 'Deep Learning', 'Computer Vision'],
        isVerified: true,
      },
      {
        id: 'student-1',
        fullName: 'سارا محمدی',
        email: 'sara@student.ac.ir',
        mobile: '09187654321',
        userType: 'student',
        skills: ['Python', 'TensorFlow', 'Data Analysis'],
        isVerified: true,
      },
    ];
  },

  search: async (query: string, skills?: string[]): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const allUsers = await usersAPI.getAll();
    return allUsers.filter(user => 
      user.fullName.includes(query) || 
      user.skills?.some(skill => skills?.includes(skill))
    );
  },
};
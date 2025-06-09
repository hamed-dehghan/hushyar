'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { projectsAPI, EvaluationData } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface ProjectEvaluationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectTitle: string;
}

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

function StarRating({ value, onChange, label }: StarRatingProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 hover:scale-110 transition-transform"
          >
            <Star
              className={`h-6 w-6 ${
                star <= value
                  ? 'text-yellow-500 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
        <span className="mr-2 text-sm text-gray-600">({value}/5)</span>
      </div>
    </div>
  );
}

export function ProjectEvaluationModal({
  open,
  onOpenChange,
  projectId,
  projectTitle,
}: ProjectEvaluationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [innovationScore, setInnovationScore] = useState(0);
  const [accuracyScore, setAccuracyScore] = useState(0);
  const [usabilityScore, setUsabilityScore] = useState(0);
  const [comments, setComments] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (innovationScore === 0 || accuracyScore === 0 || usabilityScore === 0) {
      toast({
        title: 'خطا',
        description: 'لطفاً به همه بخش‌ها امتیاز دهید',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const evaluationData: EvaluationData = {
        projectId,
        innovationScore,
        accuracyScore,
        usabilityScore,
        comments,
      };

      await projectsAPI.evaluate(evaluationData);
      
      toast({
        title: 'ارزیابی ثبت شد',
        description: 'ارزیابی شما با موفقیت ثبت شد',
      });
      
      onOpenChange(false);
      
      // Reset form
      setInnovationScore(0);
      setAccuracyScore(0);
      setUsabilityScore(0);
      setComments('');
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'خطا در ثبت ارزیابی. لطفاً دوباره تلاش کنید.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ارزیابی پروژه</DialogTitle>
          <p className="text-sm text-gray-600">{projectTitle}</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <StarRating
            value={innovationScore}
            onChange={setInnovationScore}
            label="امتیاز نوآوری"
          />
          
          <StarRating
            value={accuracyScore}
            onChange={setAccuracyScore}
            label="امتیاز دقت فنی"
          />
          
          <StarRating
            value={usabilityScore}
            onChange={setUsabilityScore}
            label="امتیاز کاربردی بودن"
          />

          <div className="space-y-2">
            <Label htmlFor="comments">نظرات تکمیلی</Label>
            <Textarea
              id="comments"
              placeholder="نظرات و پیشنهادات خود را بنویسید..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'در حال ثبت...' : 'ثبت ارزیابی'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              انصراف
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
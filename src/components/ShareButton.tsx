
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  showText?: boolean;
}

export const ShareButton = ({ 
  title, 
  text, 
  url, 
  size = 'sm', 
  variant = 'outline',
  className = '',
  showText = false
}: ShareButtonProps) => {
  const handleShare = async () => {
    try {
      if (navigator.share && navigator.canShare) {
        await navigator.share({
          title,
          text,
          url
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      // Final fallback
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      } catch (clipboardError) {
        toast.error('Unable to share');
      }
    }
  };

  return (
    <Button 
      size={size} 
      variant={variant}
      onClick={handleShare}
      className={className}
    >
      <Share2 className="w-4 h-4" />
      {showText && <span className="ml-2">Share</span>}
    </Button>
  );
};

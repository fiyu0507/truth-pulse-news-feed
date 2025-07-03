
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookmarkPlus } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';

interface BookmarkButtonProps {
  articleId: number;
  articleData: {
    title: string;
    description: string;
    url: string;
    imageUrl?: string;
    source?: string;
    category?: string;
  };
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  showText?: boolean;
}

export const BookmarkButton = ({ 
  articleId,
  articleData,
  size = 'sm', 
  variant = 'outline',
  className = '',
  showText = false
}: BookmarkButtonProps) => {
  const { addBookmark } = useBookmarks();

  const handleBookmark = () => {
    addBookmark(articleId, articleData);
  };

  return (
    <Button 
      size={size} 
      variant={variant}
      onClick={handleBookmark}
      className={className}
    >
      <BookmarkPlus className="w-4 h-4" />
      {showText && <span className="ml-2">Bookmark</span>}
    </Button>
  );
};

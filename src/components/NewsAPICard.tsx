
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ExternalLink, BookmarkPlus, Share2 } from 'lucide-react';
import { NewsArticle } from '@/hooks/useNewsAPI';
import { useBookmarks } from '@/hooks/useBookmarks';

interface NewsAPICardProps {
  article: NewsArticle;
}

export const NewsAPICard = ({ article }: NewsAPICardProps) => {
  const { addBookmark } = useBookmarks();

  const handleBookmark = () => {
    const articleId = parseInt(article.id);
    addBookmark(articleId, {
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      source: article.source.name,
      category: article.category || 'General'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: article.url
      });
    } else {
      navigator.clipboard.writeText(article.url);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      {article.urlToImage && (
        <div className="relative">
          <img 
            src={article.urlToImage} 
            alt={article.title}
            className="w-full h-48 object-cover rounded-t-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
            }}
          />
          {article.category && (
            <Badge className="absolute top-2 left-2 bg-blue-800">
              {article.category}
            </Badge>
          )}
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2 hover:text-blue-800 cursor-pointer">
          {article.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{article.source.name}</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatTimeAgo(article.publishedAt)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => window.open(article.url, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Read More
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleBookmark}
          >
            <BookmarkPlus className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShareButton } from './ShareButton';
import { BookmarkButton } from './BookmarkButton';

interface NewsCardProps {
  title: string;
  summary: string;
  imageUrl: string;
  source: string;
  publishTime: string;
  category: string;
  isFactChecked?: boolean;
  url?: string;
}

export const NewsCard = ({ 
  title, 
  summary, 
  imageUrl, 
  source, 
  publishTime, 
  category, 
  isFactChecked = false,
  url = '#'
}: NewsCardProps) => {
  // Generate a mock article ID based on title hash
  const articleId = Math.abs(title.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0));

  const articleData = {
    title,
    description: summary,
    url,
    imageUrl,
    source,
    category
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute top-2 left-2 flex space-x-2">
          <Badge variant="secondary" className="bg-white/90 text-gray-800">
            {category}
          </Badge>
          {isFactChecked && (
            <Badge className="bg-green-600 text-white">
              ✓ Fact-Checked
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-800 cursor-pointer">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {summary}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{source}</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{publishTime}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => window.open(url, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Read More
          </Button>
          <BookmarkButton 
            articleId={articleId}
            articleData={articleData}
          />
          <ShareButton 
            title={title}
            text={summary}
            url={url}
          />
        </div>
      </CardContent>
    </Card>
  );
};

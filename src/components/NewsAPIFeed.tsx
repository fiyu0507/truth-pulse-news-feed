
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw } from 'lucide-react';
import { useNewsAPI } from '@/hooks/useNewsAPI';
import { NewsAPICard } from './NewsAPICard';

const categories = [
  { id: 'general', name: 'All', color: 'bg-gray-100 text-gray-800' },
  { id: 'politics', name: 'Politics', color: 'bg-blue-100 text-blue-800' },
  { id: 'business', name: 'Business', color: 'bg-green-100 text-green-800' },
  { id: 'technology', name: 'Technology', color: 'bg-purple-100 text-purple-800' },
  { id: 'education', name: 'Education', color: 'bg-orange-100 text-orange-800' },
  { id: 'health', name: 'Health', color: 'bg-red-100 text-red-800' }
];

export const NewsAPIFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const { articles, loading, error, refetch } = useNewsAPI({ 
    category: selectedCategory,
    pageSize: 12 
  });

  if (error) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">News Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedCategory === category.id 
                    ? 'bg-blue-800 text-white' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-800" />
        </div>
      )}

      {/* Articles Grid */}
      {!loading && articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsAPICard key={article.id} article={article} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500 mb-4">No articles found for this category</p>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

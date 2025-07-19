
import React, { useState, useEffect } from 'react';
import { RealNewsCard } from './RealNewsCard';
import { useNewsAPI } from '@/hooks/useNewsAPI';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocalNewsFeedProps {
  selectedTopic?: string;
}

const mapTopicToQuery = (topic: string): string => {
  const topicMap: { [key: string]: string } = {
    'Election Results': 'election results local government',
    'City Council Meeting': 'city council meeting local government',
    'Transportation Updates': 'transportation public transit infrastructure',
    'Housing Policy Changes': 'housing policy affordable housing',
    'School Board Decisions': 'school board education local',
    'Climate Action Plan': 'climate environment sustainability'
  };
  
  return topicMap[topic] || topic;
};

export const LocalNewsFeed = ({ selectedTopic }: LocalNewsFeedProps) => {
  const [clearFilter, setClearFilter] = useState(false);
  
  const query = selectedTopic ? mapTopicToQuery(selectedTopic) : undefined;
  const { articles, loading, error, refetch } = useNewsAPI({ 
    query,
    pageSize: 15 
  });

  useEffect(() => {
    if (clearFilter) {
      setClearFilter(false);
    }
  }, [clearFilter]);

  const handleClearFilter = () => {
    setClearFilter(true);
    window.location.href = '/'; // Navigate to home without filter
  };

  if (loading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedTopic ? `${selectedTopic} News` : 'Latest News'}
          </h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-800" />
          <span className="ml-2 text-gray-600">Loading latest news...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">{error}</p>
          <Button 
            onClick={refetch}
            variant="outline"
            className="text-blue-800 border-blue-800 hover:bg-blue-50"
          >
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedTopic ? `${selectedTopic} News` : 'Latest News'}
        </h2>
        {selectedTopic && (
          <Button 
            onClick={handleClearFilter} 
            variant="outline"
            size="sm"
            className="text-blue-800 border-blue-800 hover:bg-blue-50"
          >
            Clear Filter
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.length > 0 ? (
          articles.map((article) => (
            <RealNewsCard key={article.id} article={article} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No news found for "{selectedTopic}"</p>
            <Button 
              onClick={refetch}
              variant="outline"
              className="mt-4 text-blue-800 border-blue-800 hover:bg-blue-50"
            >
              Refresh
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

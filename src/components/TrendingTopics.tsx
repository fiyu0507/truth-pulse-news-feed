
import React from 'react';
import { Button } from '@/components/ui/button';

const trendingTopics = [
  "Election Results",
  "City Council",
  "Transportation",
  "Housing Policy",
  "School Board",
  "Climate Action",
  "Local Business",
  "Community Events"
];

export const TrendingTopics = () => {
  return (
    <section className="bg-white border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-4">
          <h3 className="font-semibold text-gray-900 whitespace-nowrap">Trending:</h3>
          <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide">
            {trendingTopics.map((topic, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="whitespace-nowrap border-gray-300 text-gray-700 hover:border-blue-800 hover:text-blue-800 rounded-full"
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShareButton } from "./ShareButton";
import { BookmarkButton } from "./BookmarkButton";

const trendingTopics = [
  {
    id: 1,
    title: "Election Results",
    description: "Latest updates on local election results and voter turnout",
    url: "https://example.com/election-results",
    category: "politics",
  },
  {
    id: 2,
    title: "City Council Meeting",
    description: "Key decisions made in today's city council session",
    url: "https://example.com/city-council",
    category: "politics",
  },
  {
    id: 3,
    title: "Football Championship",
    description: "Updates from the national football championship finals",
    url: "https://example.com/football",
    category: "sports",
  },
  {
    id: 4,
    title: "New Movie Releases",
    description: "This week's new movie releases and reviews",
    url: "https://example.com/movies",
    category: "entertainment",
  },
  {
    id: 5,
    title: "Tech Conference",
    description: "Highlights from the annual tech conference",
    url: "https://example.com/tech-conference",
    category: "technology",
  },
  {
    id: 6,
    title: "Climate Summit",
    description: "Key agreements from the global climate summit",
    url: "https://example.com/climate-summit",
    category: "environment",
  },
];

interface TrendingTopicsProps {
  onTopicClick?: (topic: { title: string; category?: string }) => void;
}

export const TrendingTopics = ({ onTopicClick }: TrendingTopicsProps) => {
  const [expandedView, setExpandedView] = useState(false);

  const handleTopicClick = (topic: { title: string; category?: string }) => {
    if (onTopicClick) {
      onTopicClick(topic);
    }
  };

  if (expandedView) {
    return (
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Trending Topics
            </h3>
            <Button
              variant="outline"
              onClick={() => setExpandedView(false)}
              size="sm"
            >
              Show Less
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingTopics.map((topic) => (
              <Card
                key={topic.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg hover:text-blue-800 cursor-pointer">
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">
                    {topic.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleTopicClick({
                          title: topic.title,
                          category: topic.category,
                        })
                      }
                      className="text-blue-800 hover:bg-blue-50"
                    >
                      Explore {topic.category}
                    </Button>
                    <div className="flex space-x-1">
                      <BookmarkButton
                        articleId={topic.id}
                        articleData={{
                          title: topic.title,
                          description: topic.description,
                          url: topic.url,
                          category: topic.category,
                        }}
                      />
                      <ShareButton
                        title={topic.title}
                        text={topic.description}
                        url={topic.url}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-4">
          <h3 className="font-semibold text-gray-900 whitespace-nowrap">
            Trending:
          </h3>
          <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide">
            {trendingTopics.slice(0, 4).map((topic, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() =>
                  handleTopicClick({
                    title: topic.title,
                    category: topic.category,
                  })
                }
                className="whitespace-nowrap border-gray-300 text-gray-700 hover:border-blue-800 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
              >
                {topic.title}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandedView(true)}
              className="whitespace-nowrap text-blue-800 hover:bg-blue-50"
            >
              View All →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};


import React from 'react';
import { NewsCard } from './NewsCard';

const newsItems = [
  {
    title: "New BART Extension Plans Approved for East Bay Expansion",
    summary: "The Metropolitan Transportation Commission has approved preliminary plans for extending BART service to reach more communities in the East Bay, with construction expected to begin in 2025.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    source: "SF Chronicle",
    publishTime: "2 hours ago",
    category: "Transportation",
    isFactChecked: true
  },
  {
    title: "Local Restaurant Week Brings Economic Boost to Downtown",
    summary: "Participating restaurants report 40% increase in foot traffic during the annual Restaurant Week, helping local businesses recover from pandemic impacts.",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    source: "Bay Area Business Journal",
    publishTime: "4 hours ago",
    category: "Business"
  },
  {
    title: "City Council Approves New Affordable Housing Initiative",
    summary: "The council unanimously voted to allocate $50 million toward affordable housing development, aiming to address the ongoing housing crisis in the region.",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    source: "Local Gov News",
    publishTime: "6 hours ago",
    category: "Politics",
    isFactChecked: true
  },
  {
    title: "Tech Company Announces Major Expansion in South Bay",
    summary: "A leading technology firm plans to open a new campus, promising to create 2,000 jobs over the next three years in the South Bay area.",
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    source: "TechCrunch",
    publishTime: "8 hours ago",
    category: "Technology"
  }
];

export const LocalNewsFeed = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Local News Feed</h2>
        <a href="/local-news" className="text-blue-800 hover:text-blue-900 font-medium">
          View All →
        </a>
      </div>
      
      <div className="space-y-6">
        {newsItems.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

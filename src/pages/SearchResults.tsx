
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { NewsCard } from '@/components/NewsCard';
import { useSearchParams } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = [
    {
      title: "Search Result: Local Business Recovery Shows Promise",
      summary: "Recent data shows local businesses are recovering faster than expected, with foot traffic up 25% from last month.",
      imageUrl: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      source: "Business Journal",
      publishTime: "3 hours ago",
      category: "Business",
      isFactChecked: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600">{searchResults.length} results found</p>
        </div>

        <div className="space-y-6">
          {searchResults.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;

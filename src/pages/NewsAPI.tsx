
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { NewsAPIFeed } from '@/components/NewsAPIFeed';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const NewsAPI = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-['Poppins'] mb-2">
              Live News Feed
            </h1>
            <p className="text-gray-600 font-['Open_Sans']">
              Stay updated with the latest news from trusted sources
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Real-time News Integration</CardTitle>
              <CardDescription>
                This page demonstrates advanced news API integration with bookmarking capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Live Updates</h3>
                  <p className="text-sm text-blue-600">Real-time news from multiple sources</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800">Smart Bookmarking</h3>
                  <p className="text-sm text-green-600">Save articles to read later</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-800">Category Filtering</h3>
                  <p className="text-sm text-purple-600">Filter by your interests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <NewsAPIFeed />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsAPI;

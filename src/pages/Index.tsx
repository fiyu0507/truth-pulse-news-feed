
import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { TrendingTopics } from '@/components/TrendingTopics';
import { LocalNewsFeed } from '@/components/LocalNewsFeed';
import { FactCheckHighlights } from '@/components/FactCheckHighlights';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const handleTopicClick = (topic: { title: string; category?: string }) => {
    setSelectedTopic(topic.title);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        <HeroSection />
        <TrendingTopics onTopicClick={handleTopicClick} />
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <LocalNewsFeed selectedTopic={selectedTopic} />
          </div>
          <div className="lg:col-span-1">
            <FactCheckHighlights />
          </div>
        </div>
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

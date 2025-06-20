
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Clock, User, Share2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
  const { id } = useParams();

  const newsData = {
    title: "New BART Extension Plans Approved for East Bay Expansion",
    content: `
      <p>The Metropolitan Transportation Commission has approved preliminary plans for extending BART service to reach more communities in the East Bay, with construction expected to begin in 2025.</p>
      
      <p>The proposed extension will add three new stations and approximately 15 miles of track, connecting underserved communities to the greater Bay Area transit network. The project is estimated to cost $2.1 billion and is expected to be completed by 2030.</p>
      
      <p>"This expansion represents a significant investment in our region's future," said MTC Chair Jane Smith during yesterday's board meeting. "Public transit is essential for reducing traffic congestion and providing equitable access to employment opportunities."</p>
      
      <p>Community leaders have praised the decision, noting that the extension will provide crucial transportation links for residents who currently face long commutes to access BART services.</p>
      
      <p>Environmental impact studies are currently underway, with public hearings scheduled for next month. Construction is expected to create approximately 3,000 jobs during the peak building phase.</p>
      
      <p>The extension is part of a broader regional transportation initiative aimed at improving connectivity and reducing carbon emissions throughout the Bay Area.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    source: "SF Chronicle",
    publishTime: "2 hours ago",
    category: "Transportation",
    isFactChecked: true,
    author: "Sarah Johnson"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article>
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-blue-800 text-white px-3 py-1 rounded-lg text-sm font-medium">
                {newsData.category}
              </span>
              {newsData.isFactChecked && (
                <span className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified</span>
                </span>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {newsData.title}
            </h1>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{newsData.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>{newsData.source}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{newsData.publishTime}</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <img 
            src={newsData.imageUrl} 
            alt={newsData.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
          />
          
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: newsData.content }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShareButton } from '@/components/ShareButton';
import { BookmarkButton } from '@/components/BookmarkButton';
import { ArrowLeft, ExternalLink, Calendar, User } from 'lucide-react';
import { NewsArticle } from '@/hooks/useNewsAPI';

export default function NewsDetailView() {
  const { id } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch the article by ID from your API
    // For now, we'll create a sample article based on the ID
    const sampleArticle: NewsArticle = {
      id: id || '1',
      title: "Breaking: Major Policy Changes Announced for Local Transportation",
      description: "City officials unveil comprehensive transportation reform plan that will reshape public transit across the metropolitan area.",
      url: `https://example.com/news/${id}`,
      urlToImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      publishedAt: new Date().toISOString(),
      source: {
        id: 'local-news',
        name: 'Local News Network'
      },
      category: 'Transportation',
      content: `
        <p>In a landmark decision that will reshape the future of public transportation in our metropolitan area, city officials today announced a comprehensive reform plan that addresses decades of infrastructure challenges and growing demands for sustainable transit solutions.</p>
        
        <p>The announcement, made during a packed city hall meeting, outlined a multi-billion dollar investment strategy that will modernize existing transit systems while introducing innovative new transportation options for residents across all neighborhoods.</p>
        
        <p><strong>Key highlights of the transportation reform plan include:</strong></p>
        
        <ul>
          <li>Expansion of rapid transit lines to underserved communities</li>
          <li>Implementation of electric bus fleets city-wide</li>
          <li>Development of protected bike lane networks</li>
          <li>Integration of smart traffic management systems</li>
          <li>Affordable transit options for low-income residents</li>
        </ul>
        
        <p>Mayor Johnson emphasized the plan's focus on equity and environmental sustainability: "This isn't just about moving people from point A to point B. It's about creating a transportation ecosystem that works for everyone, regardless of income level or neighborhood, while significantly reducing our carbon footprint."</p>
        
        <p>The first phase of implementation is expected to begin within six months, with initial focus on the most congested corridors and areas with limited transit access. Community input sessions will be held throughout the coming weeks to ensure resident voices are incorporated into the final plans.</p>
        
        <p>Transportation advocates have praised the announcement, calling it a "generational investment" that will position the city as a leader in sustainable urban mobility. However, some business groups have expressed concerns about potential disruptions during construction phases.</p>
        
        <p>The full implementation timeline spans seven years, with completion expected by 2031. Regular progress updates will be provided to the public through dedicated community meetings and an online dashboard tracking project milestones.</p>
      `
    };

    setArticle(sampleArticle);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const articleId = parseInt(article.id.replace(/\D/g, '')) || Math.floor(Math.random() * 10000);
  
  const articleData = {
    title: article.title,
    description: article.description,
    url: article.url,
    imageUrl: article.urlToImage,
    source: article.source.name,
    category: article.category || 'General'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-800 hover:text-blue-900 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to News
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img 
              src={article.urlToImage} 
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            {article.category && (
              <Badge 
                variant="secondary" 
                className="absolute top-4 left-4 bg-white/90 text-gray-800"
              >
                {article.category}
              </Badge>
            )}
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>{article.source.name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <BookmarkButton
                  articleId={articleId}
                  articleData={articleData}
                  showText={true}
                />
                <ShareButton
                  title={article.title}
                  text={article.description}
                  url={article.url}
                  showText={true}
                />
                <Button
                  onClick={() => window.open(article.url, '_blank')}
                  variant="outline"
                  size="sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Original Source
                </Button>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-6 font-medium leading-relaxed">
                {article.description}
              </p>
              
              {article.content && (
                <div 
                  className="text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: article.content.replace(/\n\s*\n/g, '</p><p>').replace(/\n/g, '<br/>') 
                  }} 
                />
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
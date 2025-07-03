
import { useState, useEffect } from 'react';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  category?: string;
}

interface UseNewsAPIProps {
  category?: string;
  country?: string;
  pageSize?: number;
}

export const useNewsAPI = ({ category = 'general', country = 'us', pageSize = 10 }: UseNewsAPIProps = {}) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // For demo purposes, we'll use mock data. In production, you'd use a real API
  const mockArticles: NewsArticle[] = [
    {
      id: '1',
      title: "City Council Approves New Transportation Initiative",
      description: "Local government announces major investment in public transportation infrastructure to reduce traffic congestion.",
      url: "https://example.com/news/1",
      urlToImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: { id: 'local-news', name: 'Local News Network' },
      category: 'politics'
    },
    {
      id: '2',
      title: "Tech Company Announces Major Expansion in Downtown Area",
      description: "Leading technology firm plans to create 1,500 new jobs over the next two years with new office complex.",
      url: "https://example.com/news/2",
      urlToImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      source: { id: 'business-times', name: 'Business Times' },
      category: 'business'
    },
    {
      id: '3',
      title: "Local Schools Implement New Environmental Program",
      description: "District-wide initiative focuses on sustainability education and green campus practices.",
      url: "https://example.com/news/3",
      urlToImage: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      source: { id: 'education-weekly', name: 'Education Weekly' },
      category: 'education'
    }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Filter by category if specified
        const filteredArticles = category === 'general' 
          ? mockArticles 
          : mockArticles.filter(article => article.category === category);

        setArticles(filteredArticles.slice(0, pageSize));
      } catch (err) {
        setError('Failed to fetch news articles');
        console.error('News API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, country, pageSize]);

  return { articles, loading, error, refetch: () => fetchNews() };
};


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
  content?: string;
}

interface UseNewsAPIProps {
  category?: string;
  query?: string;
  pageSize?: number;
}

const NEWS_API_KEY = '0c3ea3fe65b84c1eab0b0ec8c8b4f6de'; // Free NewsAPI key
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

export const useNewsAPI = ({ category = 'general', query, pageSize = 20 }: UseNewsAPIProps = {}) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      let endpoint = '';
      let params = new URLSearchParams({
        apiKey: NEWS_API_KEY,
        pageSize: pageSize.toString(),
        language: 'en',
      });

      if (query) {
        // Search for specific query
        endpoint = `${NEWS_API_BASE_URL}/everything`;
        params.append('q', query);
        params.append('sortBy', 'publishedAt');
      } else {
        // Get top headlines by category
        endpoint = `${NEWS_API_BASE_URL}/top-headlines`;
        params.append('country', 'us');
        if (category !== 'general') {
          params.append('category', category);
        }
      }

      const response = await fetch(`${endpoint}?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.message || 'Failed to fetch news');
      }

      const processedArticles: NewsArticle[] = data.articles
        .filter((article: any) => article.title && article.description && article.urlToImage)
        .map((article: any, index: number) => ({
          id: `${Date.now()}-${index}`,
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          source: {
            id: article.source.id || 'unknown',
            name: article.source.name || 'Unknown Source'
          },
          category: category,
          content: article.content
        }));

      setArticles(processedArticles);
    } catch (err) {
      console.error('News API Error:', err);
      setError('Failed to fetch news articles. Please try again later.');
      
      // Fallback to mock data if API fails
      const mockArticles: NewsArticle[] = [
        {
          id: '1',
          title: "Local Election Results Show Record Voter Turnout",
          description: "Citizens participated in record numbers for the latest municipal elections, with several key policy initiatives passing.",
          url: "https://example.com/news/1",
          urlToImage: "https://images.unsplash.com/photo-1541872705-1f73c6400ec9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          source: { id: 'local-news', name: 'Local News Network' },
          category: category,
          content: "Full election coverage including detailed analysis of voting patterns and implications for local governance..."
        },
        {
          id: '2',
          title: "City Council Approves Major Transportation Budget",
          description: "New funding will improve public transit and infrastructure across the metropolitan area.",
          url: "https://example.com/news/2",
          urlToImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          source: { id: 'city-times', name: 'City Times' },
          category: category,
          content: "The city council unanimously approved a comprehensive transportation budget that will fund new bus routes, bike lanes, and road improvements..."
        },
        {
          id: '3',
          title: "New Housing Development Plans Announced",
          description: "Affordable housing initiative aims to address growing housing needs in the community.",
          url: "https://example.com/news/3",
          urlToImage: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          source: { id: 'housing-herald', name: 'Housing Herald' },
          category: category,
          content: "The new housing development will include 500 affordable units and is expected to break ground next spring..."
        }
      ];

      setArticles(mockArticles);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category, query, pageSize]);

  return { articles, loading, error, refetch: fetchNews };
};

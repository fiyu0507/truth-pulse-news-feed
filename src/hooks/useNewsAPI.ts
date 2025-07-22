import { useState, useEffect } from "react";

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
  country?: string;
}

const NEWS_API_KEY = "ce5fcfde8cf94511a8ebe7a98c371fb5"; // NewsAPI.org API key
const NEWS_API_BASE_URL = "https://newsapi.org/v2";

export const useNewsAPI = ({
  category = "general",
  query,
  pageSize = 20,
  country = "us",
}: UseNewsAPIProps = {}) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      let params = new URLSearchParams({
        apiKey: NEWS_API_KEY,
        pageSize: pageSize.toString(),
      });

      // Use different endpoints based on whether we have a query or category
      let endpoint = "";
      if (query) {
        endpoint = `${NEWS_API_BASE_URL}/everything`;
        params.append("q", query);
        params.append("language", "en");
        params.append("sortBy", "publishedAt");
      } else {
        endpoint = `${NEWS_API_BASE_URL}/top-headlines`;
        params.append("country", country);
        if (category && category !== "general") {
          params.append("category", category);
        }
      }

      console.log("Fetching news from:", endpoint);

      const response = await fetch(`${endpoint}?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "error") {
        throw new Error(data.message || "Failed to fetch news");
      }

      const processedArticles: NewsArticle[] = (data.articles || [])
        .filter((article: any) => article.title && article.description)
        .map((article: any, index: number) => ({
          id: `${Date.now()}-${index}`,
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage:
            article.urlToImage ||
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          publishedAt: article.publishedAt,
          source: {
            id: article.source?.id || "unknown",
            name: article.source?.name || "Unknown Source",
          },
          category: category,
          content: article.content || article.description,
        }));

      setArticles(processedArticles);
    } catch (err) {
      console.error("News API Error:", err);
      setError("Failed to load news. Showing mock data instead.");

      // Fallback to mock data
      const enhancedMockArticles: NewsArticle[] = [
        // ... (keep your existing mock data)
      ];

      setArticles(enhancedMockArticles);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category, query, pageSize, country]);

  return { articles, loading, error, refetch: fetchNews };
};

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNewsAPI } from "@/hooks/useNewsAPI";
import { Clock, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const { articles, loading, error, refetch } = useNewsAPI({
    category: "general",
    pageSize: 10,
    country: "us",
  });

  const [randomArticle, setRandomArticle] = useState<any>(null);

  useEffect(() => {
    if (articles.length > 0) {
      const randomIndex = Math.floor(Math.random() * articles.length);
      setRandomArticle(articles[randomIndex]);
    }
  }, [articles]);

  const refreshRandomArticle = () => {
    if (articles.length > 0) {
      const randomIndex = Math.floor(Math.random() * articles.length);
      setRandomArticle(articles[randomIndex]);
    }
  };

  const formatTimeAgo = (dateString: string): string => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (loading) {
    return (
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white h-96 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="animate-pulse">
              <div className="h-8 w-32 bg-blue-700 rounded-full mb-6"></div>
              <div className="h-10 w-full bg-blue-700 rounded mb-4"></div>
              <div className="h-6 w-5/6 bg-blue-700 rounded mb-6"></div>
              <div className="flex gap-4">
                <div className="h-10 w-32 bg-orange-500 rounded"></div>
                <div className="h-10 w-32 bg-transparent border-2 border-white rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !randomArticle) {
    return (
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white h-96 flex items-center">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-orange-500 text-white p-3 rounded-full mb-4 inline-flex">
            <RotateCw className="w-8 h-8" />
          </div>
          <p className="text-lg mb-4">Couldn't load featured news</p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              className="border-white text-white"
              onClick={() => refetch()}
            >
              Try Again
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={refreshRandomArticle}
              disabled={articles.length === 0}
            >
              Shuffle News
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div
        className="relative h-96 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url('${
            randomArticle.urlToImage ||
            "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          }')`,
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-75"></div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 inline" />
                FEATURED • {formatTimeAgo(randomArticle.publishedAt)}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 text-xs sm:text-sm"
                onClick={refreshRandomArticle}
              >
                <RotateCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Shuffle
              </Button>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {randomArticle.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-200 line-clamp-2">
              {randomArticle.description || "Important news update"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={`/article/${randomArticle.id}`}
                state={{ article: randomArticle }}
                className="flex-1 sm:flex-none"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-medium"
                >
                  Read Full Story
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-900 font-medium transition-all duration-200"
                onClick={() => window.open(randomArticle.url, "_blank")}
              >
                View Original
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

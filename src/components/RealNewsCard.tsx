import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShareButton } from "./ShareButton";
import { BookmarkButton } from "./BookmarkButton";
import { NewsArticle } from "@/hooks/useNewsAPI";
import { ExternalLink, Eye } from "lucide-react";

interface RealNewsCardProps {
  article: NewsArticle;
}

const formatTimeAgo = (dateString: string): string => {
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

export const RealNewsCard = ({ article }: RealNewsCardProps) => {
  const articleData = {
    id: article.id,
    title: article.title,
    description: article.description,
    url: article.url,
    imageUrl: article.urlToImage,
    source: article.source.name,
    category: article.category || "General",
    content: article.content || article.description,
    publishedAt: article.publishedAt,
  };

  const handleExternalLink = () => {
    window.open(article.url, "_blank");
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
          }}
        />
        {article.category && (
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-white/90 text-gray-800"
          >
            {article.category}
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
          {article.title}
        </h3>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="font-medium">{article.source.name}</span>
          <span>{formatTimeAgo(article.publishedAt)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Link
              to={`/article/${article.id}`}
              state={{ article: articleData }}
            >
              <Button
                className="bg-blue-800 hover:bg-blue-900 text-white"
                size="sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                Read Full Article
              </Button>
            </Link>
            <Button onClick={handleExternalLink} variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Source
            </Button>
          </div>

          <div className="flex space-x-2">
            <BookmarkButton
              articleId={Number(article.id)}
              articleData={articleData}
            />
            <ShareButton
              title={article.title}
              text={article.description}
              url={article.url}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

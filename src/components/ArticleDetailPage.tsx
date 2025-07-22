import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { BookmarkButton } from "@/components/BookmarkButton";

export const ArticleDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = state?.article;

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to News
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <p>The requested article could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button onClick={() => navigate(-1)} variant="outline" className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to News
      </Button>

      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-64 md:h-96 object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
          }}
        />

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {article.category}
              </span>
              <span className="text-sm text-gray-600">{article.source}</span>
            </div>
            <div className="flex space-x-2">
              <BookmarkButton articleId={article.id} articleData={article} />
              <ShareButton
                title={article.title}
                text={article.description}
                url={window.location.href}
              />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {article.title}
          </h1>
          <p className="text-gray-500 text-sm mb-2">
            Published: {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-6">{article.description}</p>
          <div className="prose max-w-none">
            {article.content && (
              <p className="whitespace-pre-line">{article.content}</p>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <Button
              onClick={() => window.open(article.url, "_blank")}
              variant="outline"
              className="text-blue-800 hover:bg-blue-50"
            >
              Read Original Article
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

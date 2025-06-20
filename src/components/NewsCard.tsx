
import React from 'react';
import { Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NewsCardProps {
  id?: number;
  title: string;
  summary: string;
  imageUrl: string;
  source: string;
  publishTime: string;
  category: string;
  isFactChecked?: boolean;
}

export const NewsCard = ({ 
  id = 1,
  title, 
  summary, 
  imageUrl, 
  source, 
  publishTime, 
  category,
  isFactChecked = false 
}: NewsCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/news/${id}`);
  };

  return (
    <article 
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-800 text-white px-2 py-1 rounded-lg text-xs font-medium">
            {category}
          </span>
        </div>
        {isFactChecked && (
          <div className="absolute top-3 right-3">
            <span className="bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1">
              <span>✓</span>
              <span>Verified</span>
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight hover:text-blue-800 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {summary}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{source}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{publishTime}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

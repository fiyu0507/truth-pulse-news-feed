
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Search, Filter, BookmarkIcon, Share2, ExternalLink, X, Calendar } from 'lucide-react';

const Bookmarks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const bookmarkedArticles = [
    {
      id: 1,
      title: "City Council Approves New Housing Development",
      summary: "The controversial downtown development project gets green light after months of debate.",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      source: "SF Chronicle",
      savedDate: "2024-01-15",
      category: "Local Politics",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Local Business Recovery Shows Promise",
      summary: "Recent data shows local businesses are recovering faster than expected, with foot traffic up 25%.",
      imageUrl: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      source: "Business Journal",
      savedDate: "2024-01-12",
      category: "Business",
      readTime: "3 min read"
    },
    {
      id: 3,
      title: "Climate Action Plan Faces Budget Constraints",
      summary: "Environmental groups push back against proposed cuts to sustainability initiatives.",
      imageUrl: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      source: "Environmental Times",
      savedDate: "2024-01-10",
      category: "Environment",
      readTime: "7 min read"
    }
  ];

  const categories = ['all', 'Local Politics', 'Business', 'Environment', 'Education'];

  const filteredArticles = bookmarkedArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || article.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleRemoveBookmark = (id: number) => {
    console.log('Removing bookmark:', id);
  };

  const handleShare = (article: any) => {
    console.log('Sharing article:', article.title);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Link to="/dashboard" className="hover:text-blue-800">Dashboard</Link>
              <span>/</span>
              <span>Bookmarks</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 font-['Poppins'] mb-2">
              Saved Articles
            </h1>
            <p className="text-gray-600 font-['Open_Sans']">
              Manage your bookmarked articles and continue reading where you left off
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search bookmarked articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedFilter === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedFilter(category)}
                        className="capitalize"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveBookmark(article.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(article.savedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>{article.source}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(article)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <BookmarkIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookmarks found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || selectedFilter !== 'all' 
                    ? "Try adjusting your search or filters" 
                    : "Start bookmarking articles to see them here"}
                </p>
                <Button asChild>
                  <Link to="/">Browse News</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bookmarks;

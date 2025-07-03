
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Search, Filter, BookmarkIcon, Share2, ExternalLink, X, Calendar, Loader2 } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';

const Bookmarks = () => {
  const { bookmarks, loading, error, removeBookmark } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const categories = ['all', 'Local Politics', 'Business', 'Environment', 'Education'];

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || bookmark.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleRemoveBookmark = async (bookmarkId: number) => {
    await removeBookmark(bookmarkId);
  };

  const handleShare = (bookmark: any) => {
    if (navigator.share) {
      navigator.share({
        title: bookmark.title,
        text: bookmark.description,
        url: bookmark.url
      });
    } else {
      navigator.clipboard.writeText(bookmark.url || '');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Card className="text-center py-8">
              <CardContent>
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-800" />
            </div>
          )}

          {/* Articles Grid */}
          {!loading && filteredBookmarks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookmarks.map((bookmark) => (
                <Card key={bookmark.bookmark_id} className="hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img
                      src={bookmark.imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                      alt={bookmark.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveBookmark(bookmark.bookmark_id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {bookmark.category || 'General'}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(bookmark.saved_at).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {bookmark.title || 'Untitled Article'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {bookmark.description || 'No description available'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>{bookmark.source || 'Unknown Source'}</span>
                      <span>3 min read</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => window.open(bookmark.url || '#', '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(bookmark)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredBookmarks.length === 0 && (
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
                  <Link to="/news-api">Browse News</Link>
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

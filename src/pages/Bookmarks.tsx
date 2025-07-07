
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Search, Filter, Bookmark, Share2, ExternalLink, X, Calendar, Loader2, Grid, List } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';

const Bookmarks = () => {
  const { bookmarks, loading, error, removeBookmark } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="py-8">
                <div className="text-center">
                  <p className="text-red-700 mb-4 font-medium">{error}</p>
                  <Button onClick={() => window.location.reload()} variant="outline" className="border-red-200 text-red-700 hover:bg-red-100">
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4 font-['Open_Sans']">
              <Link to="/dashboard" className="hover:text-blue-700 transition-colors">Dashboard</Link>
              <span>/</span>
              <span className="text-gray-800">Saved Articles</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-['Inter'] mb-2">
                  Saved Articles
                </h1>
                <p className="text-gray-600 font-['Open_Sans'] text-base">
                  Your bookmarked articles and stories • {filteredBookmarks.length} saved
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="bg-blue-700 hover:bg-blue-800"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="bg-blue-700 hover:bg-blue-800"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search your saved articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-blue-700 focus:ring-blue-700 font-['Open_Sans']"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 font-['Inter']">Filter:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedFilter === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedFilter(category)}
                        className={`capitalize font-['Open_Sans'] ${
                          selectedFilter === category 
                            ? 'bg-blue-700 hover:bg-blue-800 text-white' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-16">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-700 mx-auto mb-4" />
                <p className="text-gray-600 font-['Open_Sans']">Loading your saved articles...</p>
              </div>
            </div>
          )}

          {/* Articles Grid/List */}
          {!loading && filteredBookmarks.length > 0 && (
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
            }`}>
              {filteredBookmarks.map((bookmark) => (
                <Card 
                  key={bookmark.bookmark_id} 
                  className={`hover:shadow-lg transition-all duration-200 border-gray-200 group ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                    <img
                      src={bookmark.imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                      alt={bookmark.title}
                      className={`object-cover ${
                        viewMode === 'list' 
                          ? 'w-full h-full rounded-l-lg' 
                          : 'w-full h-48 rounded-t-lg'
                      }`}
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700"
                      onClick={() => handleRemoveBookmark(bookmark.bookmark_id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <Badge 
                      variant="secondary" 
                      className="absolute top-2 left-2 bg-white/90 text-gray-800 font-['Inter'] text-xs"
                    >
                      {bookmark.category || 'General'}
                    </Badge>
                  </div>
                  
                  <CardContent className={`p-5 flex-1 ${viewMode === 'list' ? 'py-4' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-xs text-gray-500 font-['Open_Sans']">
                        <span className="font-medium text-blue-700">{bookmark.source || 'Unknown Source'}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{new Date(bookmark.saved_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 font-['Inter'] text-lg leading-tight hover:text-blue-700 cursor-pointer transition-colors">
                      {bookmark.title || 'Untitled Article'}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2 font-['Open_Sans'] text-sm leading-relaxed">
                      {bookmark.description || 'No description available'}
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <Button 
                        size="sm" 
                        className="flex-1 mr-2 bg-blue-700 hover:bg-blue-800 font-['Inter'] font-medium"
                        onClick={() => window.open(bookmark.url || '#', '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read Article
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(bookmark)}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
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
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bookmark className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Inter']">
                  {searchQuery || selectedFilter !== 'all' 
                    ? "No articles found" 
                    : "You haven't bookmarked any news yet"}
                </h3>
                <p className="text-gray-600 mb-8 font-['Open_Sans'] leading-relaxed">
                  {searchQuery || selectedFilter !== 'all' 
                    ? "Try adjusting your search terms or filters to find what you're looking for." 
                    : "Start exploring headlines and save articles that interest you. Your bookmarked stories will appear here."}
                </p>
                <Button asChild className="bg-blue-700 hover:bg-blue-800 font-['Inter'] font-medium px-6">
                  <Link to="/news-api">Explore News</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bookmarks;

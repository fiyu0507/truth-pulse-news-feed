
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookmarkIcon, Bell, Settings, Edit, TrendingUp, MapPin, Clock, User, Loader2 } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { NewsCard } from '@/components/NewsCard';
import { useAuth } from '@/contexts/AuthContext';
import { useUserStats } from '@/hooks/useUserStats';

const Dashboard = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { stats, loading: statsLoading, error: statsError } = useUserStats();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const topPicks = [
    {
      title: "City Council Approves New Housing Development",
      summary: "The controversial downtown development project gets green light after months of debate.",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      source: "SF Chronicle",
      publishTime: "2 hours ago",
      category: "Local Politics",
      isFactChecked: true
    },
    {
      title: "Local Business Recovery Shows Promise",
      summary: "Recent data shows local businesses are recovering faster than expected, with foot traffic up 25%.",
      imageUrl: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      source: "Business Journal",
      publishTime: "4 hours ago",
      category: "Business",
      isFactChecked: true
    }
  ];

  const savedArticles = [
    {
      title: "Climate Action Plan Faces Budget Constraints",
      source: "Environmental Times",
      savedDate: "2 days ago",
      category: "Environment"
    },
    {
      title: "School Board Election Results Certified",
      source: "Education Weekly",
      savedDate: "1 week ago",
      category: "Education"
    }
  ];

  const recentAlerts = [
    {
      type: "fact-check",
      message: "New fact-check published for claim about local crime rates",
      time: "1 hour ago",
      status: "verified"
    },
    {
      type: "trending",
      message: "Transportation policy is trending in your area",
      time: "3 hours ago",
      status: "info"
    },
    {
      type: "update",
      message: "Update to housing development story you bookmarked",
      time: "1 day ago",
      status: "update"
    }
  ];

  const categories = [
    { id: 'all', name: 'All', count: 24 },
    { id: 'politics', name: 'Politics', count: 8 },
    { id: 'business', name: 'Business', count: 6 },
    { id: 'environment', name: 'Environment', count: 4 },
    { id: 'education', name: 'Education', count: 6 }
  ];

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-800" />
          <span className="text-lg text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  // Show error state if no user
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">Please sign in to view your dashboard.</p>
            <Button asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';
  const userLocation = profile?.location || 'San Francisco, CA';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-['Poppins']">
                  Welcome back, {displayName}
                </h1>
                <p className="text-gray-600 font-['Open_Sans'] flex items-center mt-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {userLocation}
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  Last login: 2 hours ago
                </p>
              </div>
              <div className="flex space-x-2">
                <Button asChild variant="outline">
                  <Link to="/profile-settings">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/notifications">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                    {stats.notificationsCount > 0 && (
                      <Badge variant="secondary" className="ml-2">{stats.notificationsCount}</Badge>
                    )}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Saved Articles</p>
                      {statsLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-blue-800" />
                      ) : (
                        <p className="text-2xl font-bold text-blue-800">{stats.bookmarksCount}</p>
                      )}
                    </div>
                    <BookmarkIcon className="w-8 h-8 text-blue-800" />
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Followed Topics</p>
                      <p className="text-2xl font-bold text-orange-600">8</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Notifications</p>
                      {statsLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-green-600" />
                      ) : (
                        <p className="text-2xl font-bold text-green-600">{stats.notificationsCount}</p>
                      )}
                    </div>
                    <Bell className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Submissions</p>
                      {statsLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                      ) : (
                        <p className="text-2xl font-bold text-purple-600">{stats.submissionsCount}</p>
                      )}
                    </div>
                    <Edit className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Error Message for Stats */}
            {statsError && (
              <Card className="mb-4 border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ {statsError}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link to="/bookmarks">
                      <BookmarkIcon className="w-4 h-4 mr-2" />
                      Bookmarks
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link to="/profile-settings">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link to="/user-submissions">
                      <Edit className="w-4 h-4 mr-2" />
                      Submissions
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link to="/notifications">
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-gray-100 transition-colors ${
                        selectedCategory === category.id ? 'bg-blue-100 text-blue-800' : 'text-gray-700'
                      }`}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Today's Top Picks */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 font-['Poppins']">
                    Today's Top Picks
                  </CardTitle>
                  <CardDescription>
                    Personalized news based on your interests and location
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {topPicks.map((article, index) => (
                    <NewsCard key={index} {...article} />
                  ))}
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/">View All News</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Saved Articles Preview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-gray-900 font-['Poppins']">
                      Saved Articles
                    </CardTitle>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/bookmarks">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {savedArticles.map((article, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <BookmarkIcon className="w-5 h-5 text-blue-800 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 hover:text-blue-800 cursor-pointer">
                          {article.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                          <span>{article.source}</span>
                          <span>•</span>
                          <span>{article.savedDate}</span>
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 font-['Poppins']">
                    Recent Alerts
                  </CardTitle>
                  <CardDescription>
                    Fact-check updates and trending topics in your area
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        alert.status === 'verified' ? 'bg-green-500' : 
                        alert.status === 'update' ? 'bg-blue-500' : 'bg-orange-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-gray-900">{alert.message}</p>
                        <p className="text-sm text-gray-600 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/notifications">View All Notifications</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Bell, CheckCircle, AlertCircle, TrendingUp, FileText, Clock, Check, MoreHorizontal } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'fact-check',
      title: 'New fact-check published',
      message: 'Your saved article "City Council Approves New Housing Development" has been fact-checked',
      time: '1 hour ago',
      date: '2024-01-15',
      read: false,
      actionUrl: '/fact-check-report/1',
      actionText: 'View Report'
    },
    {
      id: 2,
      type: 'trending',
      title: 'Trending in your area',
      message: 'Transportation policy is gaining attention with 3 new articles published today',
      time: '3 hours ago',
      date: '2024-01-15',
      read: false,
      actionUrl: '/search?q=transportation',
      actionText: 'View Articles'
    },
    {
      id: 3,
      type: 'submission',
      title: 'Submission status update',
      message: 'Your submission "Local Restaurant Claims False Health Inspection Rating" is now under review',
      time: '1 day ago',
      date: '2024-01-14',
      read: true,
      actionUrl: '/user-submissions',
      actionText: 'View Submission'
    },
    {
      id: 4,
      type: 'update',
      title: 'Article update',
      message: 'New information added to "Local Business Recovery Shows Promise" - story you bookmarked',
      time: '2 days ago',
      date: '2024-01-13',
      read: true,
      actionUrl: '/news/2',
      actionText: 'Read Update'
    },
    {
      id: 5,
      type: 'fact-check',
      title: 'Fact-check completed',
      message: 'Your submission about city budget allocation has been verified and published',
      time: '3 days ago',
      date: '2024-01-12',
      read: true,
      actionUrl: '/fact-check-report/2',
      actionText: 'View Report'
    },
    {
      id: 6,
      type: 'system',
      title: 'Welcome to LocalNews',
      message: 'Thank you for joining our community! Here are some tips to get started with fact-checking and local news.',
      time: '1 week ago',
      date: '2024-01-08',
      read: true,
      actionUrl: '/about',
      actionText: 'Learn More'
    }
  ]);

  const filterOptions = [
    { value: 'all', label: 'All', count: notifications.length },
    { value: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { value: 'fact-check', label: 'Fact Checks', count: notifications.filter(n => n.type === 'fact-check').length },
    { value: 'trending', label: 'Trending', count: notifications.filter(n => n.type === 'trending').length },
    { value: 'submission', label: 'Submissions', count: notifications.filter(n => n.type === 'submission').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const notificationDate = new Date(notification.date).toDateString();
    
    let group = 'Earlier';
    if (notificationDate === today) group = 'Today';
    else if (notificationDate === yesterday) group = 'Yesterday';
    else if (new Date(notification.date) > new Date(Date.now() - 7 * 86400000)) group = 'This Week';
    
    if (!groups[group]) groups[group] = [];
    groups[group].push(notification);
    return groups;
  }, {} as Record<string, typeof notifications>);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'fact-check':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'trending':
        return <TrendingUp className="w-5 h-5 text-orange-600" />;
      case 'submission':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'update':
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      case 'system':
        return <Bell className="w-5 h-5 text-gray-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const markAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "You're all caught up!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Link to="/dashboard" className="hover:text-blue-800">Dashboard</Link>
              <span>/</span>
              <span>Notifications</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-['Poppins'] mb-2">
                  Notifications
                </h1>
                <p className="text-gray-600 font-['Open_Sans']">
                  Stay updated with fact-checks, trending topics, and submission updates
                </p>
              </div>
              <Button 
                onClick={markAllAsRead} 
                variant="outline" 
                className="mt-4 md:mt-0"
                disabled={notifications.every(n => n.read)}
              >
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            </div>
          </div>

          {/* Filter Tabs */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={filter === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(option.value)}
                    className="flex items-center space-x-2"
                  >
                    <span>{option.label}</span>
                    <Badge variant="secondary" className="text-xs">
                      {option.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          {Object.keys(groupedNotifications).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(groupedNotifications).map(([group, groupNotifications]) => (
                <div key={group}>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">{group}</h2>
                  <div className="space-y-3">
                    {groupNotifications.map((notification) => (
                      <Card 
                        key={notification.id} 
                        className={`hover:shadow-md transition-shadow cursor-pointer ${
                          !notification.read ? 'ring-2 ring-blue-100 bg-blue-50/30' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className={`text-sm font-medium ${
                                  !notification.read ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {notification.title}
                                </h3>
                                <div className="flex items-center space-x-2">
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                  )}
                                  <span className="text-xs text-gray-500">{notification.time}</span>
                                </div>
                              </div>
                              <p className={`text-sm ${
                                !notification.read ? 'text-gray-600' : 'text-gray-500'
                              } mb-3`}>
                                {notification.message}
                              </p>
                              {notification.actionUrl && (
                                <Button 
                                  asChild 
                                  size="sm" 
                                  variant="outline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Link to={notification.actionUrl}>
                                    {notification.actionText}
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {filter === 'unread' 
                    ? "You're all caught up! Check back later for updates." 
                    : "You'll see notifications here when there are updates to your submissions, fact-checks, or trending topics."}
                </p>
                <Button asChild variant="outline">
                  <Link to="/dashboard">Back to Dashboard</Link>
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

export default Notifications;

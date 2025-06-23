
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, CheckCircle, Clock, TrendingUp, Activity, Globe, Cog } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const trafficData = [
  { date: 'Mon', visits: 1200, factChecks: 45 },
  { date: 'Tue', visits: 1500, factChecks: 52 },
  { date: 'Wed', visits: 1800, factChecks: 38 },
  { date: 'Thu', visits: 1400, factChecks: 61 },
  { date: 'Fri', visits: 2100, factChecks: 48 },
  { date: 'Sat', visits: 1700, factChecks: 33 },
  { date: 'Sun', visits: 1300, factChecks: 29 }
];

const recentActivity = [
  { id: 1, type: 'submission', user: 'John Doe', action: 'Submitted claim about city budget', time: '2 hours ago', status: 'pending' },
  { id: 2, type: 'fact-check', user: 'Jane Smith', action: 'Published fact-check report', time: '4 hours ago', status: 'published' },
  { id: 3, type: 'flag', user: 'Mike Johnson', action: 'Flagged content as misleading', time: '6 hours ago', status: 'reviewing' },
  { id: 4, type: 'user', user: 'Sarah Wilson', action: 'New user registration', time: '8 hours ago', status: 'active' },
  { id: 5, type: 'source', user: 'System', action: 'RSS feed sync completed', time: '12 hours ago', status: 'success' }
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex">
        <AdminSidebar activeItem="dashboard" />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Overview of platform activity and management tools</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Verified Claims</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Fact-Checkers</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">3 new this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">-5% from yesterday</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Traffic & Fact-Check Trends</CardTitle>
                <CardDescription>Last 7 days activity</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    visits: { label: "Visits", color: "#1A3C74" },
                    factChecks: { label: "Fact Checks", color: "#FF8C42" }
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="visits" stroke="#1A3C74" strokeWidth={2} />
                      <Line type="monotone" dataKey="factChecks" stroke="#FF8C42" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                        <p className="text-sm text-gray-500 truncate">{activity.action}</p>
                      </div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                      <Badge variant={activity.status === 'published' ? 'default' : 'secondary'}>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="bg-blue-800 hover:bg-blue-900">
                  <FileText className="w-4 h-4 mr-2" />
                  Review Submissions
                </Button>
                <Button variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button variant="outline">
                  <Globe className="w-4 h-4 mr-2" />
                  Add News Source
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

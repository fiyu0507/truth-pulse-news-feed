
import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Users, CheckCircle, Download } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const trafficData = [
  { month: 'Jan', visits: 12000, factChecks: 450, accuracy: 87 },
  { month: 'Feb', visits: 15000, factChecks: 520, accuracy: 89 },
  { month: 'Mar', visits: 18000, factChecks: 380, accuracy: 92 },
  { month: 'Apr', visits: 21000, factChecks: 610, accuracy: 85 },
  { month: 'May', visits: 24000, factChecks: 480, accuracy: 91 },
  { month: 'Jun', visits: 27000, factChecks: 550, accuracy: 88 }
];

const categoryData = [
  { category: 'Politics', value: 35, color: '#1A3C74' },
  { category: 'Health', value: 25, color: '#FF8C42' },
  { category: 'Economy', value: 20, color: '#4ECDC4' },
  { category: 'Education', value: 12, color: '#45B7D1' },
  { category: 'Environment', value: 8, color: '#96CEB4' }
];

const topArticles = [
  { title: 'City Budget Allocation Analysis', views: 5420, engagement: 87 },
  { title: 'Healthcare Policy Fact-Check', views: 4890, engagement: 92 },
  { title: 'Local Election Coverage', views: 4320, engagement: 78 },
  { title: 'Environmental Impact Report', views: 3890, engagement: 83 },
  { title: 'Education Funding Analysis', views: 3450, engagement: 75 }
];

const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState('6months');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex">
        <AdminSidebar activeItem="analytics" />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600">Platform performance and engagement metrics</p>
              </div>
              <div className="flex space-x-4">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="1month">Last month</SelectItem>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="1year">Last year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Page Views</p>
                    <p className="text-2xl font-bold">127,543</p>
                    <p className="text-xs text-green-600">+12.5% vs last period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Unique Visitors</p>
                    <p className="text-2xl font-bold">23,847</p>
                    <p className="text-xs text-green-600">+8.3% vs last period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Fact Checks Published</p>
                    <p className="text-2xl font-bold">234</p>
                    <p className="text-xs text-orange-600">+15.2% vs last period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Avg. Accuracy Score</p>
                    <p className="text-2xl font-bold">88.9%</p>
                    <p className="text-xs text-green-600">+2.1% vs last period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="traffic" className="space-y-6">
            <TabsList>
              <TabsTrigger value="traffic">Traffic & Engagement</TabsTrigger>
              <TabsTrigger value="content">Content Performance</TabsTrigger>
              <TabsTrigger value="trust">Trust Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="traffic" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        visits: { label: "Page Views", color: "#1A3C74" },
                        factChecks: { label: "Fact Checks", color: "#FF8C42" }
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trafficData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
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
                    <CardTitle>Content Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        value: { label: "Percentage" }
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ category, value }) => `${category}: ${value}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topArticles.map((article, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{article.title}</h4>
                          <p className="text-sm text-gray-600">{article.views.toLocaleString()} views</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Engagement</p>
                          <p className="font-bold text-blue-600">{article.engagement}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trust">
              <Card>
                <CardHeader>
                  <CardTitle>Trust & Accuracy Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      accuracy: { label: "Accuracy Score", color: "#4ECDC4" }
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[80, 95]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="accuracy" fill="#4ECDC4" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminAnalytics;

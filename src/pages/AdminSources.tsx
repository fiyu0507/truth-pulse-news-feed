
import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

const sources = [
  { id: 1, name: 'Local Herald', type: 'Local', url: 'https://localherald.com/rss', status: 'Active', lastSync: '2 hours ago', credibility: 'High' },
  { id: 2, name: 'City Tribune', type: 'Local', url: 'https://citytribune.com/feed', status: 'Active', lastSync: '1 hour ago', credibility: 'High' },
  { id: 3, name: 'Regional Times', type: 'Regional', url: 'https://regionaltimes.com/rss', status: 'Inactive', lastSync: '2 days ago', credibility: 'Medium' },
  { id: 4, name: 'State News Network', type: 'State', url: 'https://statenews.gov/feed', status: 'Active', lastSync: '30 mins ago', credibility: 'High' },
  { id: 5, name: 'International Wire', type: 'International', url: 'https://intlwire.com/rss', status: 'Active', lastSync: '1 hour ago', credibility: 'Medium' }
];

const AdminSources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSources = sources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || source.type.toLowerCase() === filterType;
    const matchesStatus = filterStatus === 'all' || source.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex">
        <AdminSidebar activeItem="sources" />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">News Sources Management</h1>
            <p className="text-gray-600">Manage RSS feeds and news sources</p>
          </div>

          {/* Controls */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search sources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="regional">Regional</SelectItem>
                      <SelectItem value="state">State</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-blue-800 hover:bg-blue-900">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Source
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sources Table */}
          <Card>
            <CardHeader>
              <CardTitle>News Sources ({filteredSources.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>RSS URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead>Credibility</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSources.map((source) => (
                    <TableRow key={source.id}>
                      <TableCell className="font-medium">{source.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{source.type}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{source.url}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {source.status === 'Active' ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <span className={source.status === 'Active' ? 'text-green-600' : 'text-red-600'}>
                            {source.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{source.lastSync}</TableCell>
                      <TableCell>
                        <Badge variant={source.credibility === 'High' ? 'default' : 'secondary'}>
                          {source.credibility}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminSources;

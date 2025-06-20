
import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Eye, 
  UserCheck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Calendar,
  TrendingUp,
  Users,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

const mockClaims = [
  {
    id: 'FC2024-001',
    claim: 'City Council voted to increase property taxes by 15%',
    submittedBy: 'john.doe@email.com',
    date: '2024-01-15',
    category: 'Politics & Government',
    status: 'pending',
    priority: 'high',
    assignedTo: null
  },
  {
    id: 'FC2024-002',
    claim: 'New BART extension will cost $2 billion',
    submittedBy: 'jane.smith@email.com',
    date: '2024-01-14',
    category: 'Economy & Business',
    status: 'in-review',
    priority: 'medium',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: 'FC2024-003',
    claim: 'Local unemployment rate dropped to 2.1%',
    submittedBy: 'reporter@news.com',
    date: '2024-01-13',
    category: 'Economy & Business',
    status: 'verified',
    priority: 'low',
    assignedTo: 'Mike Chen'
  },
  {
    id: 'FC2024-004',
    claim: 'Restaurant Week brings in $10 million in revenue',
    submittedBy: 'business@local.org',
    date: '2024-01-12',
    category: 'Economy & Business',
    status: 'false',
    priority: 'medium',
    assignedTo: 'Sarah Johnson'
  }
];

const getStatusBadge = (status: string) => {
  const configs = {
    pending: { label: 'Pending', className: 'bg-gray-100 text-gray-800', icon: Clock },
    'in-review': { label: 'In Review', className: 'bg-blue-100 text-blue-800', icon: Eye },
    verified: { label: 'Verified', className: 'bg-green-100 text-green-800', icon: CheckCircle },
    false: { label: 'False', className: 'bg-red-100 text-red-800', icon: XCircle },
    misleading: { label: 'Misleading', className: 'bg-orange-100 text-orange-800', icon: AlertTriangle }
  };
  
  const config = configs[status as keyof typeof configs] || configs.pending;
  const Icon = config.icon;
  
  return (
    <Badge className={config.className}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  );
};

const getPriorityBadge = (priority: string) => {
  const configs = {
    high: 'bg-red-50 text-red-700 border-red-200',
    medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    low: 'bg-green-50 text-green-700 border-green-200'
  };
  
  return (
    <Badge variant="outline" className={configs[priority as keyof typeof configs]}>
      {priority.toUpperCase()}
    </Badge>
  );
};

const FactCheckDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredClaims = mockClaims.filter(claim => {
    const matchesSearch = claim.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         claim.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || claim.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: mockClaims.length,
    pending: mockClaims.filter(c => c.status === 'pending').length,
    inReview: mockClaims.filter(c => c.status === 'in-review').length,
    completed: mockClaims.filter(c => ['verified', 'false', 'misleading'].includes(c.status)).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-['Poppins']">Fact-Check Dashboard</h1>
          <p className="text-gray-600 font-['Open_Sans']">Manage and review claims submitted for verification</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Claims</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Review</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.inReview}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search claims by ID or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-review">In Review</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="false">False</SelectItem>
                  <SelectItem value="misleading">Misleading</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Politics & Government">Politics & Government</SelectItem>
                  <SelectItem value="Economy & Business">Economy & Business</SelectItem>
                  <SelectItem value="Health & Medicine">Health & Medicine</SelectItem>
                  <SelectItem value="Crime & Safety">Crime & Safety</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Claims Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-['Poppins']">Claims ({filteredClaims.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Claim</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim.id} className="hover:bg-gray-50">
                    <TableCell className="font-mono text-sm">{claim.id}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={claim.claim}>
                        {claim.claim}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        by {claim.submittedBy}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {claim.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(claim.status)}</TableCell>
                    <TableCell>{getPriorityBadge(claim.priority)}</TableCell>
                    <TableCell className="text-sm">
                      {claim.assignedTo || (
                        <span className="text-gray-400">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(claim.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link to={`/fact-check-report/${claim.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline">
                          <UserCheck className="w-4 h-4" />
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
  );
};

export default FactCheckDashboard;

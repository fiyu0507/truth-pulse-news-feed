
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FileText, Plus, Clock, CheckCircle, XCircle, AlertCircle, MessageSquare } from 'lucide-react';

const UserSubmissions = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const submissions = [
    {
      id: 1,
      title: "Local Restaurant Claims False Health Inspection Rating",
      summary: "A downtown restaurant is allegedly displaying an outdated health inspection certificate with a higher rating than their current status.",
      submittedDate: "2024-01-15",
      status: "under-review",
      category: "Local Business",
      adminComment: "",
      factCheckUrl: null
    },
    {
      id: 2,
      title: "City Budget Allocation Discrepancy",
      summary: "Noticed discrepancies between published budget documents and actual spending on infrastructure projects.",
      submittedDate: "2024-01-10",
      status: "verified",
      category: "Local Politics",
      adminComment: "Thank you for the submission. Our investigation confirmed the discrepancy and we've published a detailed fact-check report.",
      factCheckUrl: "/fact-check-report/2"
    },
    {
      id: 3,
      title: "School District Enrollment Numbers",
      summary: "Questions about the accuracy of reported enrollment numbers for the 2024 school year.",
      submittedDate: "2024-01-08",
      status: "rejected",
      category: "Education",
      adminComment: "After investigation, we found the enrollment numbers to be accurate. The confusion appears to stem from different reporting methods used in previous years.",
      factCheckUrl: null
    },
    {
      id: 4,
      title: "Environmental Impact Study Claims",
      summary: "Concerns about claims made in the environmental impact study for the new development project.",
      submittedDate: "2024-01-05",
      status: "pending",
      category: "Environment",
      adminComment: "",
      factCheckUrl: null
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Submissions', count: submissions.length },
    { value: 'pending', label: 'Pending', count: submissions.filter(s => s.status === 'pending').length },
    { value: 'under-review', label: 'Under Review', count: submissions.filter(s => s.status === 'under-review').length },
    { value: 'verified', label: 'Verified', count: submissions.filter(s => s.status === 'verified').length },
    { value: 'rejected', label: 'Rejected', count: submissions.filter(s => s.status === 'rejected').length }
  ];

  const filteredSubmissions = selectedStatus === 'all' 
    ? submissions 
    : submissions.filter(s => s.status === selectedStatus);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'under-review':
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under-review':
        return 'bg-blue-100 text-blue-800';
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Link to="/dashboard" className="hover:text-blue-800">Dashboard</Link>
              <span>/</span>
              <span>Submissions</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-['Poppins'] mb-2">
                  My Submissions
                </h1>
                <p className="text-gray-600 font-['Open_Sans']">
                  Track your submitted claims and fact-check requests
                </p>
              </div>
              <Button asChild className="mt-4 md:mt-0">
                <Link to="/claim-submission">
                  <Plus className="w-4 h-4 mr-2" />
                  Submit New Claim
                </Link>
              </Button>
            </div>
          </div>

          {/* Status Filter */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedStatus === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(option.value)}
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

          {/* Submissions List */}
          {filteredSubmissions.length > 0 ? (
            <div className="space-y-6">
              {filteredSubmissions.map((submission) => (
                <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {submission.title}
                          </h3>
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                            {getStatusIcon(submission.status)}
                            <span className="capitalize">{submission.status.replace('-', ' ')}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">
                          {submission.summary}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>{submission.category}</span>
                          </div>
                          <span>Submitted {new Date(submission.submittedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {submission.adminComment && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <MessageSquare className="w-4 h-4 text-gray-600" />
                          <span className="font-medium text-gray-900">Admin Response</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {submission.adminComment}
                        </p>
                      </div>
                    )}

                    {submission.factCheckUrl && (
                      <div className="mt-4 flex space-x-2">
                        <Button asChild size="sm">
                          <Link to={submission.factCheckUrl}>
                            View Fact-Check Report
                          </Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedStatus === 'all' ? 'No submissions yet' : `No ${selectedStatus.replace('-', ' ')} submissions`}
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedStatus === 'all' 
                    ? "Start contributing by submitting claims for fact-checking" 
                    : `You don't have any ${selectedStatus.replace('-', ' ')} submissions`}
                </p>
                <Button asChild>
                  <Link to="/claim-submission">
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Your First Claim
                  </Link>
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

export default UserSubmissions;

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckCircle, XCircle, AlertTriangle, Search, Plus, BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const factCheckItems = [
  {
    claim: "City Council voted to increase property taxes by 15%",
    verdict: "False",
    status: "false",
    summary: "The council voted on a budget proposal that would increase property taxes by 3.2%, not 15%. The 15% figure appears to be from a preliminary discussion document.",
    date: "2024-01-15",
    source: "Social Media Post"
  },
  {
    claim: "New BART extension will cost $2 billion",
    verdict: "Mostly True",
    status: "mostly-true",
    summary: "Current estimates put the project cost between $1.8-2.1 billion. The $2 billion figure is within the projected range but represents the middle estimate.",
    date: "2024-01-14",
    source: "News Article"
  },
  {
    claim: "Local unemployment rate dropped to 2.1%",
    verdict: "True",
    status: "true",
    summary: "According to the latest Bureau of Labor Statistics data, the metropolitan area unemployment rate is indeed 2.1% as of December 2023.",
    date: "2024-01-13",
    source: "Government Report"
  },
  {
    claim: "Restaurant Week brings in $10 million in revenue",
    verdict: "Unverified",
    status: "unverified",
    summary: "While Restaurant Week does boost local business, the $10 million figure cannot be independently verified. Official economic impact studies are still pending.",
    date: "2024-01-12",
    source: "Press Release"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'true':
      return <CheckCircle className="w-6 h-6 text-green-600" />;
    case 'false':
      return <XCircle className="w-6 h-6 text-red-600" />;
    case 'mostly-true':
      return <CheckCircle className="w-6 h-6 text-yellow-600" />;
    case 'unverified':
      return <AlertTriangle className="w-6 h-6 text-gray-600" />;
    default:
      return <AlertTriangle className="w-6 h-6 text-gray-600" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'true':
      return 'bg-green-100 text-green-800';
    case 'false':
      return 'bg-red-100 text-red-800';
    case 'mostly-true':
      return 'bg-yellow-100 text-yellow-800';
    case 'unverified':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const FactCheck = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fact Check Center</h1>
          <p className="text-xl text-gray-600">Verifying claims and fighting misinformation in our community</p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link to="/claim-submission">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Submit a Claim</h3>
                  <p className="text-gray-600">Have a claim that needs verification? Submit it here.</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/fact-check-dashboard">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Editorial Dashboard</h3>
                  <p className="text-gray-600">Manage and review submitted claims.</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                type="text" 
                placeholder="Search fact checks..." 
                className="pl-10"
              />
            </div>
            <Button className="bg-blue-800 hover:bg-blue-900">Search</Button>
          </div>
        </div>

        <div className="space-y-6">
          {factCheckItems.map((item, index) => (
            <article key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">"{item.claim}"</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span>Source: {item.source}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(item.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                    {item.verdict}
                  </span>
                </div>
              </div>
              <p className="text-gray-600">{item.summary}</p>
            </article>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mt-12">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Submit a Claim for Fact-Checking</h2>
          <p className="text-blue-800 mb-4">
            Have you seen a claim that needs verification? Send it to our fact-checking team.
          </p>
          <Button className="bg-blue-800 hover:bg-blue-900">Submit Claim</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FactCheck;

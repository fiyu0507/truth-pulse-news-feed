
import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Calendar, 
  User, 
  ExternalLink,
  Save,
  Send,
  History,
  MessageSquare,
  Upload,
  FileText,
  Link as LinkIcon
} from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const FactCheckReport = () => {
  const { id } = useParams();
  const [reportData, setReportData] = useState({
    verdict: '',
    summaryText: '',
    introduction: '',
    context: '',
    evidence: '',
    conclusion: '',
    tags: [] as string[],
    internalNotes: ''
  });

  const [sources, setSources] = useState([
    { id: 1, url: 'https://example.com/source1', title: 'Official Government Report', type: 'document' },
    { id: 2, url: 'https://example.com/source2', title: 'Expert Interview', type: 'interview' }
  ]);

  const claimData = {
    id: 'FC2024-001',
    claim: 'City Council voted to increase property taxes by 15%',
    submittedBy: 'john.doe@email.com',
    submittedDate: '2024-01-15',
    category: 'Politics & Government',
    source: 'https://facebook.com/post/123456',
    location: 'San Francisco, CA',
    assignedTo: 'Sarah Johnson',
    status: 'in-review'
  };

  const getVerdictConfig = (verdict: string) => {
    const configs = {
      true: { 
        label: 'True', 
        className: 'bg-green-100 text-green-800 border-green-300',
        icon: CheckCircle,
        color: 'text-green-600'
      },
      false: { 
        label: 'False', 
        className: 'bg-red-100 text-red-800 border-red-300',
        icon: XCircle,
        color: 'text-red-600'
      },
      misleading: { 
        label: 'Misleading', 
        className: 'bg-orange-100 text-orange-800 border-orange-300',
        icon: AlertTriangle,
        color: 'text-orange-600'
      },
      mixed: { 
        label: 'Mixed', 
        className: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        icon: AlertTriangle,
        color: 'text-yellow-600'
      }
    };
    
    return configs[verdict as keyof typeof configs] || configs.false;
  };

  const addSource = () => {
    const newSource = {
      id: sources.length + 1,
      url: '',
      title: '',
      type: 'document'
    };
    setSources([...sources, newSource]);
  };

  const updateSource = (id: number, field: string, value: string) => {
    setSources(sources.map(source => 
      source.id === id ? { ...source, [field]: value } : source
    ));
  };

  const saveDraft = () => {
    console.log('Saving draft...', reportData);
  };

  const publishReport = () => {
    console.log('Publishing report...', reportData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Link to="/fact-check-dashboard" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 font-['Poppins']">
                Fact-Check Report: {claimData.id}
              </h1>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={saveDraft}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={publishReport} className="bg-blue-800 hover:bg-blue-900">
                <Send className="w-4 h-4 mr-2" />
                Publish Report
              </Button>
            </div>
          </div>

          {/* Claim Summary Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-blue-900 mb-2 font-['Poppins']">
                    Original Claim
                  </h2>
                  <p className="text-blue-800 text-lg mb-4 font-['Open_Sans']">
                    "{claimData.claim}"
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-blue-600 font-medium">Submitted by:</span>
                      <p className="text-blue-800">{claimData.submittedBy}</p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Date:</span>
                      <p className="text-blue-800">{claimData.submittedDate}</p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Category:</span>
                      <p className="text-blue-800">{claimData.category}</p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Location:</span>
                      <p className="text-blue-800">{claimData.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Verdict Section */}
            <Card>
              <CardHeader>
                <CardTitle className="font-['Poppins']">Verdict</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Final Verdict *
                  </label>
                  <Select value={reportData.verdict} onValueChange={(value) => setReportData({...reportData, verdict: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select verdict" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                      <SelectItem value="misleading">Misleading</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {reportData.verdict && (
                  <div className="p-4 rounded-lg border-2 border-dashed">
                    <div className="flex items-center space-x-3 mb-3">
                      {(() => {
                        const config = getVerdictConfig(reportData.verdict);
                        const Icon = config.icon;
                        return (
                          <>
                            <Icon className={`w-8 h-8 ${config.color}`} />
                            <Badge className={`${config.className} text-lg px-4 py-2`}>
                              {config.label}
                            </Badge>
                          </>
                        );
                      })()}
                    </div>
                    <Textarea
                      placeholder="Write a 1-2 sentence summary of the verdict..."
                      value={reportData.summaryText}
                      onChange={(e) => setReportData({...reportData, summaryText: e.target.value})}
                      className="mt-2"
                      rows={2}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Report Content */}
            <Card>
              <CardHeader>
                <CardTitle className="font-['Poppins']">Detailed Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="introduction" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="introduction">Introduction</TabsTrigger>
                    <TabsTrigger value="context">Context</TabsTrigger>
                    <TabsTrigger value="evidence">Evidence</TabsTrigger>
                    <TabsTrigger value="conclusion">Conclusion</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="introduction" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Introduction
                      </label>
                      <Textarea
                        placeholder="Introduce the claim and why it's being fact-checked..."
                        value={reportData.introduction}
                        onChange={(e) => setReportData({...reportData, introduction: e.target.value})}
                        rows={6}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="context" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Context & Background
                      </label>
                      <Textarea
                        placeholder="Provide relevant background information and context..."
                        value={reportData.context}
                        onChange={(e) => setReportData({...reportData, context: e.target.value})}
                        rows={6}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="evidence" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Evidence & Research
                      </label>
                      <Textarea
                        placeholder="Detail the evidence found during investigation..."
                        value={reportData.evidence}
                        onChange={(e) => setReportData({...reportData, evidence: e.target.value})}
                        rows={6}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="conclusion" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Conclusion
                      </label>
                      <Textarea
                        placeholder="Summarize findings and explain the final verdict..."
                        value={reportData.conclusion}
                        onChange={(e) => setReportData({...reportData, conclusion: e.target.value})}
                        rows={6}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sources & Evidence */}
            <Card>
              <CardHeader>
                <CardTitle className="font-['Poppins'] flex items-center">
                  <LinkIcon className="w-5 h-5 mr-2" />
                  Sources & Evidence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sources.map((source) => (
                  <div key={source.id} className="p-3 border rounded-lg space-y-2">
                    <Input
                      placeholder="Source URL"
                      value={source.url}
                      onChange={(e) => updateSource(source.id, 'url', e.target.value)}
                    />
                    <Input
                      placeholder="Source title"
                      value={source.title}
                      onChange={(e) => updateSource(source.id, 'title', e.target.value)}
                    />
                    <Select 
                      value={source.type} 
                      onValueChange={(value) => updateSource(source.id, 'type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="data">Data Source</SelectItem>
                        <SelectItem value="media">Media Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
                <Button variant="outline" onClick={addSource} className="w-full">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Add Source
                </Button>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="font-['Poppins']">Tags & Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <Input placeholder="Add tags (comma-separated)" />
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline">Politics</Badge>
                  <Badge variant="outline">Tax Policy</Badge>
                  <Badge variant="outline">Local Government</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Internal Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="font-['Poppins'] flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Internal Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add internal notes for team collaboration..."
                  value={reportData.internalNotes}
                  onChange={(e) => setReportData({...reportData, internalNotes: e.target.value})}
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Author & Metadata */}
            <Card>
              <CardHeader>
                <CardTitle className="font-['Poppins']">Report Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Author:</span>
                  <span className="font-medium">{claimData.assignedTo}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Started:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <History className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Last Updated:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FactCheckReport;

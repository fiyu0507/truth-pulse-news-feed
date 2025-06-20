
import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, AlertCircle, CheckCircle2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ClaimSubmission = () => {
  const [formData, setFormData] = useState({
    claim: '',
    source: '',
    category: '',
    location: '',
    notes: '',
    attachment: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const categories = [
    'Health & Medicine',
    'Politics & Government',
    'Crime & Safety',
    'Economy & Business',
    'Education',
    'Environment',
    'Technology',
    'Sports',
    'Entertainment',
    'Other'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, attachment: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Claim Submitted Successfully",
        description: "Your submission ID is #FC2024-001. We'll review it within 48 hours.",
      });
      
      // Reset form
      setFormData({
        claim: '',
        source: '',
        category: '',
        location: '',
        notes: '',
        attachment: null
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-blue-800" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-['Poppins']">Submit a Claim for Verification</h1>
          <p className="text-lg text-gray-600 font-['Open_Sans']">
            Help us fight misinformation by submitting claims that need fact-checking
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-['Poppins']">Claim Details</CardTitle>
                <CardDescription className="font-['Open_Sans']">
                  Please provide as much detail as possible to help our fact-checkers verify the claim
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Claim Statement *
                    </label>
                    <Textarea
                      value={formData.claim}
                      onChange={(e) => setFormData({ ...formData, claim: e.target.value })}
                      placeholder="Enter the exact claim you want fact-checked..."
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Source *
                    </label>
                    <Input
                      type="url"
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      placeholder="https://example.com/article or social media URL"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="San Francisco, CA"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supporting Evidence (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">
                        <label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:text-blue-500">
                          Upload a file
                        </label>
                        <span> or drag and drop</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".png,.jpg,.jpeg,.pdf"
                        onChange={handleFileUpload}
                      />
                      {formData.attachment && (
                        <div className="mt-2 text-sm text-green-600">
                          ✓ {formData.attachment.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any additional context or information that might be helpful..."
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-800 hover:bg-blue-900"
                    disabled={isSubmitting || !formData.claim || !formData.source || !formData.category}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Claim'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900 font-['Poppins'] flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Important Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-800 space-y-3 font-['Open_Sans']">
                <p>• All submissions are reviewed by our editorial team</p>
                <p>• Not all claims will be investigated due to resource constraints</p>
                <p>• Priority is given to claims with wider public impact</p>
                <p>• Fact-check reports are published within 3-5 business days</p>
                <p>• Anonymous submissions are accepted but may receive lower priority</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-['Poppins'] flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
                  Submission Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 font-['Open_Sans']">
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">1</Badge>
                  <div>
                    <h4 className="font-medium">Submit Claim</h4>
                    <p className="text-sm text-gray-600">Fill out the form with claim details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">2</Badge>
                  <div>
                    <h4 className="font-medium">Review Process</h4>
                    <p className="text-sm text-gray-600">Our team evaluates the claim</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="bg-green-100 text-green-800">3</Badge>
                  <div>
                    <h4 className="font-medium">Investigation</h4>
                    <p className="text-sm text-gray-600">Fact-checkers research and verify</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="bg-purple-100 text-purple-800">4</Badge>
                  <div>
                    <h4 className="font-medium">Publication</h4>
                    <p className="text-sm text-gray-600">Results published on our platform</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClaimSubmission;

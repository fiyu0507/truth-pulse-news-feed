
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

export const ClaimSubmissionForm = () => {
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
  );
};

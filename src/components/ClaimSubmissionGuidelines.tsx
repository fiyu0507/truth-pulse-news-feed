
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const ClaimSubmissionGuidelines = () => {
  return (
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
  );
};

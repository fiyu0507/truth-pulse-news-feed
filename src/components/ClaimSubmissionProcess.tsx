
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

export const ClaimSubmissionProcess = () => {
  const processSteps = [
    {
      number: "1",
      title: "Submit Claim",
      description: "Fill out the form with claim details",
      badgeColor: "bg-blue-100 text-blue-800"
    },
    {
      number: "2",
      title: "Review Process",
      description: "Our team evaluates the claim",
      badgeColor: "bg-yellow-100 text-yellow-800"
    },
    {
      number: "3",
      title: "Investigation",
      description: "Fact-checkers research and verify",
      badgeColor: "bg-green-100 text-green-800"
    },
    {
      number: "4",
      title: "Publication",
      description: "Results published on our platform",
      badgeColor: "bg-purple-100 text-purple-800"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-['Poppins'] flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
          Submission Process
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 font-['Open_Sans']">
        {processSteps.map((step) => (
          <div key={step.number} className="flex items-start space-x-3">
            <Badge variant="outline" className={step.badgeColor}>
              {step.number}
            </Badge>
            <div>
              <h4 className="font-medium">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FileText } from 'lucide-react';
import { ClaimSubmissionForm } from '@/components/ClaimSubmissionForm';
import { ClaimSubmissionGuidelines } from '@/components/ClaimSubmissionGuidelines';
import { ClaimSubmissionProcess } from '@/components/ClaimSubmissionProcess';

const ClaimSubmission = () => {
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
            <ClaimSubmissionForm />
          </div>

          <div className="space-y-6">
            <ClaimSubmissionGuidelines />
            <ClaimSubmissionProcess />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClaimSubmission;

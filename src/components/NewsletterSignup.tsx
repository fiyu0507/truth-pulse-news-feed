
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

export const NewsletterSignup = () => {
  return (
    <section className="bg-blue-800 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-500 p-3 rounded-full">
            <Mail className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">
          Stay Informed with Local News
        </h2>
        
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Get daily updates on verified local news, fact-checked stories, and breaking news delivered straight to your inbox.
        </p>
        
        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 bg-white text-gray-900 border-gray-300"
            />
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white whitespace-nowrap"
            >
              Subscribe Now
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-3">
            Free newsletter. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};

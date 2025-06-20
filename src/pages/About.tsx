
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Users, Target, Award, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About LocalNews</h1>
          <p className="text-xl text-gray-600">Your trusted source for verified local news and fact-checked information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-blue-800 mr-3" />
              <h3 className="text-xl font-semibold">Our Mission</h3>
            </div>
            <p className="text-gray-600">
              To provide accurate, timely, and relevant local news while combating misinformation through rigorous fact-checking and community engagement.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-blue-800 mr-3" />
              <h3 className="text-xl font-semibold">Our Values</h3>
            </div>
            <p className="text-gray-600">
              Transparency, accuracy, and community focus drive everything we do. We believe informed communities make better decisions.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-blue-800 mr-3" />
              <h3 className="text-xl font-semibold">Our Team</h3>
            </div>
            <p className="text-gray-600">
              Local journalists, fact-checkers, and community advocates working together to keep you informed about what matters most.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Award className="w-8 h-8 text-blue-800 mr-3" />
              <h3 className="text-xl font-semibold">Recognition</h3>
            </div>
            <p className="text-gray-600">
              Trusted by thousands of local residents and recognized for excellence in community journalism and fact-checking.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            LocalNews was founded with a simple belief: communities deserve access to accurate, relevant local information. 
            In an era of information overload and misinformation, we focus on what matters most to your daily life.
          </p>
          <p className="text-gray-600">
            Our platform combines traditional journalism values with modern technology to deliver news that's both timely and trustworthy. 
            Every story is verified, every fact is checked, and every piece of content serves our community's need to stay informed.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

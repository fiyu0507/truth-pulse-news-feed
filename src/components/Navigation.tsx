
import React, { useState } from 'react';
import { Search, Menu, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LN</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">LocalNews</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">Home</a>
            <a href="/local-news" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">Local News</a>
            <a href="/fact-check" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">Fact Check</a>
            <a href="/about" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">About</a>
          </div>

          {/* Search and Location */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                type="text" 
                placeholder="Search news..." 
                className="pl-10 w-64 border-gray-300 focus:border-blue-800 focus:ring-blue-800"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>San Francisco, CA</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  type="text" 
                  placeholder="Search news..." 
                  className="pl-10 w-full border-gray-300"
                />
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex flex-col space-y-2">
                <a href="/" className="text-gray-700 hover:text-blue-800 font-medium py-2">Home</a>
                <a href="/local-news" className="text-gray-700 hover:text-blue-800 font-medium py-2">Local News</a>
                <a href="/fact-check" className="text-gray-700 hover:text-blue-800 font-medium py-2">Fact Check</a>
                <a href="/about" className="text-gray-700 hover:text-blue-800 font-medium py-2">About</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};


import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LN</span>
              </div>
              <span className="ml-2 text-xl font-bold">LocalNews</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted source for verified local news and fact-checked information.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/local-news" className="text-gray-400 hover:text-white">Local News</a></li>
              <li><a href="/fact-check" className="text-gray-400 hover:text-white">Fact Check</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/help" className="text-gray-400 hover:text-white">Help Center</a></li>
              <li><a href="/api" className="text-gray-400 hover:text-white">API Documentation</a></li>
              <li><a href="/media-kit" className="text-gray-400 hover:text-white">Media Kit</a></li>
              <li><a href="/newsletter" className="text-gray-400 hover:text-white">Newsletter</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              <li><a href="/ethics" className="text-gray-400 hover:text-white">Editorial Ethics</a></li>
              <li><a href="/corrections" className="text-gray-400 hover:text-white">Corrections</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 LocalNews. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Committed to accuracy, transparency, and community journalism.
          </p>
        </div>
      </div>
    </footer>
  );
};

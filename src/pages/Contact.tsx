
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">Get in touch with our newsroom team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <Input id="name" type="text" placeholder="Your full name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <Input id="subject" type="text" placeholder="What's this about?" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
                  placeholder="Tell us more..."
                />
              </div>
              <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900">
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-blue-800 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">newsroom@localnews.com</p>
                  <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-blue-800 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">(555) 123-NEWS</p>
                  <p className="text-sm text-gray-500">Monday - Friday, 9AM - 6PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-blue-800 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">123 News Street<br />San Francisco, CA 94105</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MessageSquare className="w-6 h-6 text-blue-800 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Tips & Story Ideas</h3>
                  <p className="text-gray-600">tips@localnews.com</p>
                  <p className="text-sm text-gray-500">Anonymous tips welcome</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-blue-900 mb-2">Press Inquiries</h3>
              <p className="text-blue-800 text-sm">
                For media inquiries and press relations, please contact our communications team at press@localnews.com
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

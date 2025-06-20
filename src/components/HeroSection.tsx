
import React from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div 
        className="relative h-96 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-75"></div>
        <div className="relative max-w-7xl mx-auto px-4 z-10">
          <div className="max-w-2xl">
            <div className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              BREAKING NEWS
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Local Election Results Show Record Turnout in Bay Area
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-200">
              Preliminary results indicate highest voter participation in two decades, with key ballot measures passing by significant margins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-medium">
                Read Full Story
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-900 font-medium transition-all duration-200"
              >
                Watch Live Coverage
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

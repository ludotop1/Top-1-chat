
import React from 'react';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white p-4">
      <div className="w-full max-w-md mb-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <img 
            src="/lovable-uploads/c73139bb-7214-4d60-82d5-99baa06a271d.png" 
            alt="Ludo Top 1" 
            className="h-16 w-16 object-contain"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-ludo-text mb-0 font-bengali ml-2">
            Ludo Top 1
          </h1>
        </div>
        <p className="text-gray-600 font-bengali">
          বাংলাদেশের সেরা লুডো টুর্নামেন্ট অ্যাপ!
        </p>
        <p className="text-sm text-gray-500 font-bengali mt-1">
          আমাদের AI সহায়কের সাথে কথা বলুন
        </p>
      </div>
      
      <ChatBot />
      
      <footer className="mt-8 text-center text-sm text-gray-500 font-bengali">
        <p>© {new Date().getFullYear()} Ludo Top 1 - সর্বস্বত্ব সংরক্ষিত</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a 
            href="https://ludotop1.github.io/Ludotop1/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-ludo-green hover:underline px-3 py-1 bg-gray-100 rounded-full shadow-sm"
          >
            ওয়েবসাইট
          </a>
          <a 
            href="https://ludotop1.fun" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-ludo-blue hover:underline px-3 py-1 bg-gray-100 rounded-full shadow-sm"
          >
            অ্যাপ ডাউনলোড
          </a>
          <a 
            href="https://wa.me/8801325328613" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-ludo-green hover:underline px-3 py-1 bg-gray-100 rounded-full shadow-sm"
          >
            এডমিন কন্টাক্ট
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;

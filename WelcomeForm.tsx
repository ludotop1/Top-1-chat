
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

interface WelcomeFormProps {
  onSubmit: (name: string) => void;
}

const WelcomeForm: React.FC<WelcomeFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name);
    }
  };

  return (
    <div className="w-full max-w-md p-6 mx-auto rounded-xl bg-white shadow-xl animate-bounce-in border-2 border-ludo-green">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="w-32 h-32 mb-2 relative">
          <div className="absolute -top-5 right-0 transform translate-x-1/3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">
            PREMIUM
          </div>
          <img 
            src="/lovable-uploads/c73139bb-7214-4d60-82d5-99baa06a271d.png" 
            alt="Ludo Top 1" 
            className="w-full h-full object-contain animate-pulse"
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-800 to-black text-white px-3 py-1 rounded-full shadow-md">
            <span className="text-ludo-green font-bold text-sm">Top 1</span>
          </div>
        </div>
        
        <div className="space-y-2 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-ludo-text text-center font-bengali bg-gradient-to-r from-ludo-green to-ludo-blue inline-block text-transparent bg-clip-text">
            লুডো সহায়ক
          </h2>
          
          <p className="text-gray-600 text-center font-bengali">
            আসসালামু আলাইকুম! Ludo Top 1 আপনাকে স্বাগতম!
          </p>
          <p className="text-gray-600 text-center font-bengali -mt-4">
            আপনার নাম দিয়ে শুরু করুন
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="আপনার নাম লিখুন"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-ludo-blue/30 focus:border-ludo-blue font-bengali shadow-sm pl-4 pr-12 py-6"
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <span className="text-xs">নাম</span>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-ludo-green to-ludo-blue hover:opacity-90 text-white transition-colors font-bengali py-6 flex items-center justify-center gap-2"
          >
            <span>শুরু করুন</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-md shadow-sm font-bold">
                24/7 সাপোর্ট
              </span>
              {" "}
              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-md shadow-sm font-bold ml-1">
                সবচেয়ে বিশ্বস্ত
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WelcomeForm;

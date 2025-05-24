
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, MessageCircle, Send } from "lucide-react";
import ChatMessage from "./ChatMessage";
import WelcomeForm from "./WelcomeForm";
import {
  Message,
  getGreetingMessage,
  getWelcomeMessage,
  quickResponseOptions,
  generateResponse,
  handleQuickResponse,
  suggestFollowUpQuestion,
  setConversationContext,
} from "@/utils/chatbotUtils";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const [showWelcomeForm, setShowWelcomeForm] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chatbot with greeting message
  useEffect(() => {
    if (!showWelcomeForm && userName && messages.length === 0) {
      const greeting = getGreetingMessage();
      setTimeout(() => {
        setMessages([greeting]);
        
        // Add welcome message with delay
        showTypingIndicator(() => {
          const welcomeMsg = getWelcomeMessage(userName);
          setMessages(prevMessages => [...prevMessages, welcomeMsg]);
          
          // Add a follow-up suggestion after welcome
          setTimeout(() => {
            showTypingIndicator(() => {
              const followUp = suggestFollowUpQuestion();
              setMessages(prevMessages => [...prevMessages, followUp]);
            });
          }, 2000);
        });
      }, 500);
    }
  }, [showWelcomeForm, userName, messages.length]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const showTypingIndicator = (callback: () => void) => {
    setIsTyping(true);
    // Add random delay between 1.2 and 2.5 seconds for more realistic typing
    const typingTime = Math.floor(Math.random() * 1300) + 1200;
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, typingTime);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Store last user message
    setLastUserMessage(input);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: input,
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput("");
    
    // Generate bot response with typing indicator
    showTypingIndicator(() => {
      const botResponse = generateResponse(input);
      setMessages(prevMessages => [...prevMessages, botResponse]);
      
      // Show follow-up question after a brief delay with 70% probability
      const shouldShowFollowUp = Math.random() < 0.7;
      
      if (shouldShowFollowUp) {
        setTimeout(() => {
          showTypingIndicator(() => {
            const followUpQuestion = suggestFollowUpQuestion();
            setMessages(prevMessages => [...prevMessages, followUpQuestion]);
          });
        }, 2000);
      }
    });
  };

  const handleQuickOptionClick = (optionId: string) => {
    // Add user message based on quick option
    const option = quickResponseOptions.find(opt => opt.id === optionId);
    if (!option) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: option.text,
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Generate bot response with typing indicator
    showTypingIndicator(() => {
      const botResponse = handleQuickResponse(optionId);
      setMessages(prevMessages => [...prevMessages, botResponse]);
      
      // Show follow-up question after a brief delay with 70% probability
      const shouldShowFollowUp = Math.random() < 0.7;
      
      if (shouldShowFollowUp) {
        setTimeout(() => {
          showTypingIndicator(() => {
            const followUpQuestion = suggestFollowUpQuestion();
            setMessages(prevMessages => [...prevMessages, followUpQuestion]);
          });
        }, 2000);
      }
    });
  };

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setConversationContext({ userName: name });
    setShowWelcomeForm(false);
  };

  if (showWelcomeForm) {
    return <WelcomeForm onSubmit={handleNameSubmit} />;
  }

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-xl bg-white border-2 border-ludo-green">
      {/* Chat Header */}
      <div className="bg-gray-900 text-white p-3 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full overflow-hidden bg-white p-1 ring-2 ring-white/30">
            <img src="/lovable-uploads/c73139bb-7214-4d60-82d5-99baa06a271d.png" alt="Ludo Top 1" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-lg">লুডো সহায়ক <span className="text-xs text-green-400">PREMIUM</span></h3>
            <p className="text-xs opacity-80 font-bengali">Ludo Top 1 - বাংলাদেশের সেরা লুডো টুর্নামেন্ট অ্যাপ!</p>
          </div>
        </div>
        <MessageCircle className="h-6 w-6 text-white/80" />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 chat-messages chat-container bg-gradient-to-b from-white to-ludo-background/20">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="self-start max-w-[85%] mb-3 animate-bounce-in">
            <div className="bg-gradient-to-r from-ludo-green to-ludo-blue text-white rounded-lg px-4 py-2 shadow-md flex space-x-1">
              <span className="animate-bounce delay-0">•</span>
              <span className="animate-bounce delay-100">•</span>
              <span className="animate-bounce delay-200">•</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Response Options */}
      {messages.length > 0 && (
        <div className="px-3 py-2 bg-gray-50 overflow-x-auto flex whitespace-nowrap gap-2 border-t border-b border-gray-200 shadow-inner">
          {quickResponseOptions.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              size="sm"
              onClick={() => handleQuickOptionClick(option.id)}
              className="border-ludo-blue text-ludo-blue hover:bg-ludo-blue/10 font-bengali text-sm shadow-sm"
            >
              {option.text}
            </Button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 border-t flex gap-2 bg-white shadow-inner">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="আপনার প্রশ্ন লিখুন..."
          className="flex-1 border-2 focus:border-ludo-green font-bengali shadow-sm"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <Button
          onClick={handleSendMessage}
          className="bg-gradient-to-r from-ludo-green to-ludo-blue hover:opacity-90"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatBot;

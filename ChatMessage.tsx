
import React from "react";
import { Message } from "@/utils/chatbotUtils";
import { cn } from "@/lib/utils";
import { Check, ExternalLink } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.type === "bot";

  return (
    <div
      className={cn(
        "mb-3 max-w-[85%] animate-bounce-in flex",
        isBot ? "message-bot self-start" : "message-user self-end flex-row-reverse"
      )}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-ludo-green to-ludo-blue flex items-center justify-center mr-2 mt-1 shadow-md">
          <img 
            src="/lovable-uploads/c73139bb-7214-4d60-82d5-99baa06a271d.png" 
            alt="Bot" 
            className="w-6 h-6 object-cover rounded-full"
          />
        </div>
      )}

      <div
        className={cn(
          "rounded-lg px-4 py-2 shadow-md relative",
          isBot
            ? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800"
            : "bg-gradient-to-r from-ludo-blue to-ludo-green text-white"
        )}
      >
        <p className="text-sm md:text-base font-bengali">{message.text}</p>
        
        {message.links && message.links.length > 0 && (
          <div className="mt-2 space-y-1.5">
            {message.links.map((link, index) => {
              // Determine what kind of link it is
              const isVideo = link.includes("youtu.be") || link.includes("youtube.com");
              const isWhatsApp = link.includes("wa.me");
              const isAppDownload = link.includes("ludotop1.fun");
              const isWebsite = link.includes("ludotop1.github.io");
              
              // Determine the text to show
              let linkText = "এখানে ক্লিক করুন";
              if (isVideo) linkText = "🎬 ভিডিও টিউটোরিয়াল দেখুন";
              else if (isWhatsApp) linkText = "💬 এডমিনের সাথে যোগাযোগ করুন";
              else if (isAppDownload) linkText = "📱 অ্যাপ ডাউনলোড করুন";
              else if (isWebsite) linkText = "🌐 ওয়েবসাইট দেখুন";
              
              return (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "block text-sm hover:opacity-80 transition-colors font-bengali flex items-center gap-1.5 p-1.5 rounded-md",
                    isBot 
                      ? "text-ludo-blue bg-white/80 hover:bg-white shadow-sm" 
                      : "text-white bg-white/20 hover:bg-white/30"
                  )}
                >
                  {linkText}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </div>
        )}

        {!isBot && (
          <div className="absolute bottom-0 right-1 transform translate-y-1/2 text-xs text-gray-500 flex items-center">
            <Check className="h-3 w-3 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;

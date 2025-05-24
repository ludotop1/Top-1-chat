
// Types for our chatbot
export type MessageType = 'bot' | 'user';

export interface Message {
  id: string;
  type: MessageType;
  text: string;
  links?: string[];
}

// Track the conversation context
let conversationContext = {
  lastQuestion: '',
  userName: '',
  pendingTopic: ''
};

export const setConversationContext = (context: Partial<typeof conversationContext>) => {
  conversationContext = { ...conversationContext, ...context };
};

export const getConversationContext = () => conversationContext;

// Initial greeting messages
export const getGreetingMessage = (): Message => {
  return {
    id: Date.now().toString(),
    type: 'bot',
    text: 'আসসালামু আলাইকুম! আমি Ludo Top 1 এর প্রিমিয়াম AI সহায়ক। আপনাকে কিভাবে সাহায্য করতে পারি?',
  };
};

// Welcome message with user's name
export const getWelcomeMessage = (name: string): Message => {
  // Save user name in context
  setConversationContext({ userName: name });
  
  return {
    id: Date.now().toString(),
    type: 'bot',
    text: `ধন্যবাদ, ${name} স্যার! Ludo Top 1 এ আপনাকে স্বাগতম। আমাদের সকল ইনফরমেশন এ টু জেড এখানে পাওয়া যাবে। আপনি কি জানতে চান?`,
    links: ['https://ludotop1.github.io/Ludotop1/'],
  };
};

// Follow-up questions
const followUpQuestions = [
  'আপনি কি লুডো গেম খেলতে আগ্রহী?',
  'আপনি কি জানতে চান কিভাবে টাকা জমা দিতে হয়?',
  'আপনি কি জানতে চান কিভাবে টাকা তুলতে হয়?',
  'আপনি কি এডমিনের সাথে যোগাযোগ করতে চান?',
  'আপনি কি অ্যাপ ডাউনলোড করতে চান?',
  'আপনার কি কোন প্রশ্ন আছে Ludo Top 1 সম্পর্কে?',
  'আপনি কি টুর্নামেন্ট সম্পর্কে জানতে চান?',
  'আপনি কি জানেন আমাদের লুডো টুর্নামেন্টে কিভাবে অংশগ্রহণ করতে হয়?',
  'আপনি কি জানতে চান Ludo Top 1 কেন বাংলাদেশের সেরা লুডো অ্যাপ?'
];

// Generate a random follow-up question that is context-aware
export const suggestFollowUpQuestion = (): Message => {
  // Filter out questions that might be similar to what was just asked
  const filteredQuestions = followUpQuestions.filter(q => 
    !q.toLowerCase().includes(conversationContext.lastQuestion.toLowerCase())
  );
  
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  
  // Save this as the last question asked
  setConversationContext({ lastQuestion: filteredQuestions[randomIndex] });
  
  return {
    id: Date.now().toString(),
    type: 'bot',
    text: filteredQuestions[randomIndex]
  };
};

// Quick response buttons
export const quickResponseOptions = [
  {
    id: 'how-to-play',
    text: 'কিভাবে খেলবো?',
  },
  {
    id: 'deposit',
    text: 'কিভাবে টাকা জমা দিব?',
  },
  {
    id: 'withdraw',
    text: 'কিভাবে টাকা তুলব?',
  },
  {
    id: 'download',
    text: 'অ্যাপ্লিকেশন ডাউনলোড',
  },
  {
    id: 'admin-contact',
    text: 'এডমিন কন্টাক্ট',
  },
  {
    id: 'tournament',
    text: 'টুর্নামেন্ট সম্পর্কে',
  },
  {
    id: 'why-best',
    text: 'কেন সেরা?',
  }
];

// Check for simple affirmative responses
const isAffirmative = (input: string): boolean => {
  const affirmativeWords = [
    'হ্যাঁ', 'হুম', 'ওকে', 'চাই', 'দাও', 'ঠিক আছে', 
    'yes', 'ok', 'okay', 'sure', 'হ্যা', 'জি', 'জ্বী'
  ];
  
  return affirmativeWords.some(word => input.toLowerCase().includes(word.toLowerCase()));
};

// Check for thank you messages
const isThankYou = (input: string): boolean => {
  const thankYouWords = ['ধন্যবাদ', 'থ্যাংকস', 'thanks', 'thank you', 'শুক্রিয়া'];
  
  return thankYouWords.some(word => input.toLowerCase().includes(word.toLowerCase()));
};

// Generate a response based on user input
export const generateResponse = (userInput: string): Message => {
  const input = userInput.toLowerCase();
  const context = getConversationContext();
  
  // Handle thank you messages
  if (isThankYou(input)) {
    return {
      id: Date.now().toString(),
      type: 'bot',
      text: `আপনাকেও অসংখ্য ধন্যবাদ, ${context.userName ? context.userName + ' স্যার' : ''}! আপনাকে সাহায্য করতে পেরে আমি খুশি। আপনার আর কোন প্রশ্ন থাকলে অবশ্যই জিজ্ঞেস করুন।`
    };
  }
  
  // Handle pending topic with affirmative response
  if (context.pendingTopic && isAffirmative(input)) {
    const topic = context.pendingTopic;
    setConversationContext({ pendingTopic: '' }); // Clear pending topic
    
    switch (topic) {
      case 'tournament':
        return {
          id: Date.now().toString(),
          type: 'bot',
          text: `${context.userName ? context.userName + ' স্যার' : ''}, আমাদের টুর্নামেন্টগুলো প্রতিদিন আয়োজন করা হয়। আমরা দৈনিক, সাপ্তাহিক এবং মাসিক টুর্নামেন্ট আয়োজন করি যেখানে আপনি বড় পুরস্কার জিততে পারেন। টুর্নামেন্ট সম্পর্কে বিস্তারিত জানতে আমাদের অ্যাপ ডাউনলোড করুন।`,
          links: ['https://ludotop1.fun']
        };
      
      case 'how-to-play':
        return {
          id: Date.now().toString(),
          type: 'bot',
          text: `${context.userName ? context.userName + ' স্যার' : ''}, লুডো খেলার নিয়ম খুব সহজ! প্রথমে আমাদের অ্যাপ ডাউনলোড করুন, একাউন্ট খুলুন, টাকা জমা দিন, তারপর টুর্নামেন্টে অংশগ্রহণ করুন। বিস্তারিত জানতে এই ভিডিওটি দেখুন:`,
          links: ['https://youtu.be/VybjZeWLY2E?si=D-ie_Vdod8HHr2fE']
        };
        
      case 'deposit':
        return {
          id: Date.now().toString(),
          type: 'bot',
          text: `${context.userName ? context.userName + ' স্যার' : ''}, টাকা জমা দেওয়ার নিয়ম খুবই সহজ। আপনি বিকাশ/নগদ/রকেট দিয়ে টাকা জমা দিতে পারেন। অ্যাপের Pay অপশনে গিয়ে আপনার পেমেন্ট মেথড সিলেক্ট করুন, তারপর অ্যাপে দেখানো নম্বরে টাকা পাঠান। বিস্তারিত জানতে এই ভিডিওটি দেখুন:`,
          links: ['https://youtu.be/VybjZeWLY2E?si=D-ie_Vdod8HHr2fE']
        };
        
      default:
        // If we don't recognize the topic, go back to general response
        break;
    }
  }
  
  // Check for greetings
  if (input.includes('হাই') || input.includes('হ্যালো') || input.includes('হেলো') || 
      input.includes('hi') || input.includes('hello')) {
    return {
      id: Date.now().toString(),
      type: 'bot',
      text: `আসসালামুআলাইকুম, ${context.userName ? context.userName + ' স্যার' : ''}! আমি কিভাবে আপনাকে সাহায্য করতে পারি?`
    };
  }
  
  // How to play
  else if (input.includes('কিভাবে খেলব') || input.includes('খেলার নিয়ম') || 
           input.includes('খেলা') || input.includes('নিয়ম') ||
           input.includes('গেম')) {
    setConversationContext({ pendingTopic: 'how-to-play' });
    return {
      id: Date.now().toString(),
      type: 'bot',
      text: `${context.userName ? context.userName + ' স্যার' : ''}, লুডো খেলার নিয়ম জানতে আগ্রহী? আমি আপনাকে বিস্তারিত বলতে পারি।`,
      links: ['https://youtu.be/VybjZeWLY2E?si=D-ie_Vdod8HHr2fE']
    };
  }
  
  // Deposit
  else if (input.includes('টাকা জমা') || input.includes('ডিপোজিট') || input.includes('deposit') ||
           input.includes('পেমেন্ট') || input.includes('টাকা দেওয়া')) {
    setConversationContext({ pendingTopic: 'deposit' });
    return {
      id: Date.now().toString(),
      type: 'bot',
      text: `${context.userName ? context.userName + ' স্যার' : ''}, টাকা জমা দেওয়ার নিয়ম সম্পর্কে জানতে চান? আমি আপনাকে বিস্তারিত প্রক্রিয়া বলতে পারি।`,
      links: ['https://youtu.be/VybjZeWLY2E?si=D-ie_Vdod8HHr2fE']
    };
  }
  
  // Withdraw
  else if (input.includes('টাকা তোলা') || input.includes('টাকা তুলব') || input.includes('উইথড্র') || 
           input.includes('withdraw') || input.includes('টাকা পাব') || input.includes('পেমেন্ট পাব')) {
    return {
      id: Date.now().toString(),
      type: 'bot',
      text: `${context.userName ? context.userName + ' স্যার' : ''}, টাকা তোলার নিয়ম খুব সহজ। আপনার বিজয়ী টাকা তুলতে অ্যাপের Withdraw অপশনে যান, আপনার পছন্দের পেমেন্ট মেথড সিলেক্ট করুন এবং আপনার একাউন্ট ডিটেইলস দিন। আমরা দ্রুত প্রসেস করব। বিস্তারিত জানতে এই ভিডিওটি দেখুন:`,
      links: ['https://youtu.be/VybjZeWLY2E?si=D-ie_Vdod8HHr2fE']
    };
  }
  
  // Download app
  else if (input.includes('ডাউনলোড') || input.includes('এপ্লিকেশন') || input.includes('অ্যাপ') || 
           input.includes('app') || input.includes('download') || input.includes('ইনস্টল')) {
    return {
      id: Date.now().toString(),
      type: 'bot',
      text: `${context.userName ? context.userName + ' স্যার' : ''}, Ludo Top 1 অ্যাপ্লিকেশন ডাউনলোড করতে এখানে ক্লিক করুন। অসংখ্য টুর্নামেন্টে অংশগ্রহণ করুন এবং বড় পুরস্কার জিতুন! আমাদের অ্যাপটি বাংলাদেশে সবচেয়ে জনপ্রিয় লুডো প্লাটফর্ম।`,
      links: ['https://ludotop1.fun']
    };
  }
  
  // Admin contact
  else if (input.includes('এডমিন') || input.includes('কন্টাক্ট') || input.includes('যোগাযোগ') || 
           input.includes('admin') || input.includes('contact') || input.includes('হেল্প') ||
           input.includes('সাহায্য') || input.includes('সাপোর্ট')) {
    return {
      id: Date.now().toString(),
      type: 'bot',
      text: `${context.userName ? context.userName + ' স্যার' : ''}, এডমিনের সাথে যোগাযোগ করতে এখানে ক্লিক করুন। আমাদের এডমিন আপনাকে সব রকম সাহায্য করবে! আমরা ২৪ ঘন্টা সাপোর্ট প্রদান করে থাকি।`,
      links: ['https://wa.me/8801325328613']
    };
  }
  
  // Website information
  else if (input.includes('ওয়েবসাইট') || input.includes('সাইট') || input.includes('website') || 
           input.includes('ইনফরমেশন') || input.includes('তথ্য')) {
    return {
      id: Date.now().toString(),
      type: 'bot',
      text: `${context.userName ? context.userName + ' স্যার' : ''}, Ludo Top 1 ওয়েবসাইটে যেতে এখানে ক্লিক করুন। আমাদের সম্পর্কে সমস্ত তথ্য এখানে পাবেন। আমাদের ওয়েবসাইটে আপনি সর্বশেষ টুর্নামেন্ট আপডেট, বিশেষ অফার এবং আরও অনেক কিছু পেতে পারেন।`,
      links: ['https://ludotop1.github.io/Ludotop1/']
    };
  }
  
  // Tournament information
  else if (input.includes('টুর্নামেন্ট') || input.includes('প্রতিযোগিতা') || input.includes('tournament') ||
           input.includes('মেলা') || input.includes('খেলা')) {
    setConversationContext({ pendingTopic: 'tournament' });
    return {
      id: Date.now().toString(),
      type: 'bot',
      text: `${context.userName ? context.userName + ' স্যার' : ''}, আপনি কি টুর্নামেন্ট সম্পর্কে জানতে চান? আমাদের টুর্নামেন্টগুলোতে বড় পুরস্কার জেতার সুযোগ রয়েছে।`
    };
  }
  
  // Why is Ludo Top 1 the best
  else if (input.includes('কেন সেরা') || input.includes('কেন ভাল') || input.includes('কেন best') || 
           input.includes('সেরা কেন') || input.includes('why best') || input.includes('best')) {
    return {
      id: Date.now().toString(),
      type: 'bot',
      text: `${context.userName ? context.userName + ' স্যার' : ''}, Ludo Top 1 বাংলাদেশে সেরা কারণঃ\n1️⃣ আমাদের রয়েছে সুরক্ষিত এবং ফেয়ার গেমপ্লে নিশ্চিতকারী সিস্টেম\n2️⃣ দ্রুত টাকা তোলার সুবিধা\n3️⃣ ২৪/৭ কাস্টমার সাপোর্ট\n4️⃣ প্রতিদিন বিভিন্ন ধরনের টুর্নামেন্ট\n5️⃣ নিয়মিত বোনাস এবং অফার\nআরও জানতে আমাদের ওয়েবসাইট ভিজিট করুন।`,
      links: ['https://ludotop1.github.io/Ludotop1/']
    };
  }
  
  // Out of scope questions
  else if (input.includes('ফেসবুক') || input.includes('টুইটার') || input.includes('ইনস্টাগ্রাম') || 
           input.includes('বিকাশ') || input.includes('রকেট') || input.includes('নগদ') || 
           input.includes('facebook') || input.includes('twitter') || input.includes('instagram') ||
           !input.includes('লুড') && !input.includes('ludo') && !input.includes('গেম') && !input.includes('খেল')) {
    return {
      id: Date.now().toString(),
      type: 'bot',
      text: `দুঃখিত ${context.userName ? context.userName + ' স্যার' : ''}, আমি শুধু Ludo Top 1 সম্পর্কে তথ্য শেয়ার করতে পারব। Ludo Top 1 সম্পর্কে কিছু জানতে চাইলে অবশ্যই আমাকে জিজ্ঞেস করুন।`
    };
  }
  
  // Default response
  else {
    return {
      id: Date.now().toString(),
      type: 'bot',
      text: `${context.userName ? context.userName + ' স্যার' : ''}, Ludo Top 1 সম্পর্কে আরও তথ্য জানতে চাইলে অনুগ্রহ করে আমাকে জিজ্ঞেস করুন। আপনি কিভাবে খেলবেন, টাকা জমা দিবেন, টাকা তুলবেন, অ্যাপ ডাউনলোড করবেন, বা এডমিনের সাথে যোগাযোগ করবেন সে সম্পর্কে জানতে পারেন।`
    };
  }
};

// Handle quick response button clicks
export const handleQuickResponse = (optionId: string): Message => {
  const context = getConversationContext();
  
  switch (optionId) {
    case 'how-to-play':
      return {
        id: Date.now().toString(),
        type: 'bot',
        text: `${context.userName ? context.userName + ' স্যার' : ''}, লুডো খেলার নিয়ম খুব সহজ! প্রথমে আপনাকে অ্যাপ ডাউনলোড করতে হবে, একাউন্ট খুলতে হবে, টাকা জমা দিতে হবে, এবং তারপর টুর্নামেন্টে অংশ নিতে হবে। বিস্তারিত জানতে এই ভিডিওটি দেখুন:`,
        links: ['https://youtu.be/VybjZeWLY2E?si=D-ie_Vdod8HHr2fE']
      };
    case 'deposit':
      return {
        id: Date.now().toString(),
        type: 'bot',
        text: `${context.userName ? context.userName + ' স্যার' : ''}, টাকা জমা দেওয়ার নিয়ম খুবই সহজ। আপনি বিকাশ/নগদ/রকেট দিয়ে টাকা জমা দিতে পারেন। অ্যাপের Pay অপশনে যান, আপনার পেমেন্ট মেথড সিলেক্ট করুন, এবং প্রদর্শিত নম্বরে টাকা পাঠান। বিস্তারিত জানতে এই ভিডিওটি দেখুন:`,
        links: ['https://youtu.be/VybjZeWLY2E?si=D-ie_Vdod8HHr2fE']
      };
    case 'withdraw':
      return {
        id: Date.now().toString(),
        type: 'bot',
        text: `${context.userName ? context.userName + ' স্যার' : ''}, টাকা তোলার নিয়ম খুবই সহজ। আপনার অ্যাপের Withdraw অপশনে যান, আপনার পছন্দের পেমেন্ট মেথড সিলেক্ট করুন (বিকাশ/নগদ/রকেট), আপনার একাউন্টের নম্বর দিন, এবং আপনি কত টাকা তুলতে চান তা উল্লেখ করুন। আমরা দ্রুততম সময়ে আপনার টাকা সেন্ড করে দিব। বিস্তারিত জানতে এই ভিডিওটি দেখুন:`,
        links: ['https://youtu.be/VybjZeWLY2E?si=D-ie_Vdod8HHr2fE']
      };
    case 'download':
      return {
        id: Date.now().toString(),
        type: 'bot',
        text: `${context.userName ? context.userName + ' স্যার' : ''}, Ludo Top 1 অ্যাপ্লিকেশন ডাউনলোড করতে এখানে ক্লিক করুন। আমাদের অ্যাপে সবচেয়ে বড় লুডো টুর্নামেন্ট খেলুন! সর্বশেষ আপডেট অ্যাপে পাবেন সবার আগে।`,
        links: ['https://ludotop1.fun']
      };
    case 'admin-contact':
      return {
        id: Date.now().toString(),
        type: 'bot',
        text: `${context.userName ? context.userName + ' স্যার' : ''}, এডমিনের সাথে যোগাযোগ করতে এখানে ক্লিক করুন। আমাদের এডমিন ২৪/৭ আপনাকে সাহায্য করার জন্য প্রস্তুত। যেকোনো সমস্যা বা জিজ্ঞাসা থাকলে দ্রুত যোগাযোগ করুন।`,
        links: ['https://wa.me/8801325328613']
      };
    case 'tournament':
      return {
        id: Date.now().toString(),
        type: 'bot',
        text: `${context.userName ? context.userName + ' স্যার' : ''}, আমাদের টুর্নামেন্টগুলো প্রতিদিন আয়োজন করা হয়। আমরা দৈনিক, সাপ্তাহিক এবং মাসিক টুর্নামেন্ট পরিচালনা করি। ছোট থেকে শুরু করে বড় প্রাইজপুল পর্যন্ত সব ধরনের টুর্নামেন্ট আমরা আয়োজন করি। আরও জানতে আমাদের অ্যাপ ডাউনলোড করুন।`,
        links: ['https://ludotop1.fun']
      };
    case 'why-best':
      return {
        id: Date.now().toString(),
        type: 'bot',
        text: `${context.userName ? context.userName + ' স্যার' : ''}, Ludo Top 1 বাংলাদেশে সেরা কারণঃ\n1️⃣ আমাদের রয়েছে সুরক্ষিত এবং ফেয়ার গেমপ্লে নিশ্চিতকারী অত্যাধুনিক সিস্টেম\n2️⃣ দ্রুত টাকা তোলার সুবিধা, যেকোনো পেমেন্ট মেথড সাপোর্ট করে\n3️⃣ ২৪/৭ প্রফেশনাল কাস্টমার সাপোর্ট\n4️⃣ প্রতিদিন বিভিন্ন ধরনের টুর্নামেন্ট\n5️⃣ নিয়মিত বোনাস এবং আকর্ষণীয় অফার\nআরও জানতে আমাদের ওয়েবসাইট ভিজিট করুন।`,
        links: ['https://ludotop1.github.io/Ludotop1/']
      };
    default:
      return {
        id: Date.now().toString(),
        type: 'bot',
        text: `${context.userName ? context.userName + ' স্যার' : ''}, আমি আপনার প্রশ্ন বুঝতে পারিনি। দয়া করে আবার চেষ্টা করুন অথবা আমাদের এডমিনের সাথে যোগাযোগ করুন।`
      };
  }
};

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm EcoBot, your sustainable shopping assistant. How can I help you find amazing pre-loved items today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    "Show me electronics 📱",
    "Find furniture deals 🪑", 
    "Fashion & clothing 👗",
    "How to sell items 📦",
    "Shipping info 🚚",
    "Best deals today 💰"
  ];

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Enhanced responses with more personality and interactivity
    if (message.includes("electronics") || message.includes("phone") || message.includes("laptop") || message.includes("tech")) {
      return "🔌 Awesome! Our electronics are thoroughly tested and come with quality guarantees. Right now we have amazing deals on smartphones (starting at $200), laptops ($400+), and gaming gear. Pro tip: Check the condition ratings - 'Excellent' items often look brand new! Want me to find specific tech for you?";
    }
    
    if (message.includes("furniture") || message.includes("table") || message.includes("chair") || message.includes("sofa") || message.includes("desk")) {
      return "🪑 Love it! Furniture is where you can save the most money AND make the biggest environmental impact! We have everything from vintage mid-century pieces to modern IKEA finds. Local pickup saves on shipping too. What room are you decorating?";
    }
    
    if (message.includes("fashion") || message.includes("clothes") || message.includes("clothing") || message.includes("shoes") || message.includes("dress")) {
      return "👗 Fashion is our most popular category! We've got designer bags, vintage finds, barely-worn sneakers, and everyday essentials. All items are cleaned and photographed in detail. Sizes run from XS to 3XL. Any particular style or brand you're hunting for?";
    }
    
    if (message.includes("how") || message.includes("work") || message.includes("process") || message.includes("safe") || message.includes("secure")) {
      return "🛡️ Here's how EcoFinds works: Browse verified listings → Message sellers directly → Secure payment through our platform → Item ships or you arrange pickup → Rate your experience! We handle payment protection, so you're covered if anything goes wrong. Super safe and easy!";
    }
    
    if (message.includes("price") || message.includes("cost") || message.includes("expensive") || message.includes("cheap") || message.includes("deal")) {
      return "💰 Our prices are typically 40-70% lower than retail! Plus free shipping on orders over $100. Use our price filters to find your perfect budget range. And remember - every dollar you save here is a win for your wallet AND the planet! 🌱";
    }
    
    if (message.includes("sell") || message.includes("selling") || message.includes("list")) {
      return "📦 Selling is super simple! Take 3-5 clear photos, write a honest description, set your price (we suggest 30-60% of retail), and list it! Most items sell within a week. We only charge a small fee when your item sells. Ready to declutter and earn some cash?";
    }

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "👋 Hey there! Welcome to EcoFinds - where sustainable shopping meets amazing deals! I'm here to help you find exactly what you're looking for. Try asking me about specific categories, how to sell items, or just tell me what you need!";
    }

    if (message.includes("shipping") || message.includes("delivery") || message.includes("fast")) {
      return "🚚 Most sellers ship within 1-2 days! We offer standard (5-7 days) and express (2-3 days) shipping. Many items also have local pickup options - great for furniture and large items. Plus, orders over $100 get free standard shipping!";
    }

    if (message.includes("return") || message.includes("warranty") || message.includes("guarantee")) {
      return "✅ We've got you covered! 30-day return policy on all items, plus buyer protection on every purchase. If an item isn't as described, we'll make it right. Electronics come with our 7-day functionality guarantee too!";
    }

    if (message.includes("environment") || message.includes("eco") || message.includes("green") || message.includes("sustainable")) {
      return "🌍 That's what we're all about! Every EcoFinds purchase keeps items out of landfills and reduces manufacturing demand. On average, buying pre-owned saves 80% of the environmental impact vs buying new. You're literally helping save the planet, one purchase at a time!";
    }
    
    // Fallback with helpful suggestions
    return "I'd love to help you find what you need! Try asking me about:\n\n📱 'Show me electronics'\n👕 'Find me fashion items'\n🪑 'I need furniture'\n💰 'How much can I save?'\n📦 'How do I sell items?'\n\nOr just tell me what you're looking for!";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-80 h-96 shadow-2xl border-2">
      <CardHeader className="bg-primary text-primary-foreground p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-sm">EcoBot Assistant</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6 text-primary-foreground hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-80">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start space-x-2 max-w-[75%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${message.sender === "user" ? "bg-accent" : "bg-primary"}`}>
                    {message.sender === "user" ? (
                      <User className="h-3 w-3 text-white" />
                    ) : (
                      <Bot className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg text-sm ${message.sender === "user" ? "bg-accent text-white" : "bg-muted"}`}>
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Replies */}
        {messages.length <= 1 && (
          <div className="p-3 border-t">
            <div className="text-xs text-muted-foreground mb-2">Quick questions:</div>
            <div className="flex flex-wrap gap-1">
              {quickReplies.map((reply) => (
                <Button
                  key={reply}
                  variant="outline"
                  size="sm"
                  className="text-xs h-6"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-3 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="text-sm"
            />
            <Button size="sm" onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;
"use client";

import { useState } from "react";
import { Button } from "@buddy/components/ui/button";
import { Input } from "@buddy/components/ui/input";
import { Avatar, AvatarFallback } from "@buddy/components/ui/avatar";
import { Send, Smile } from "lucide-react";
import { cn } from "@buddy/lib/utils";

interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  date: string;
  isCurrentUser: boolean;
}

const initialMessages: Message[] = [
  {
    id: "1",
    sender: "Sarah Chen",
    avatar: "SC",
    content: "Hey everyone! Just added the hotel booking expense.",
    timestamp: "10:30 AM",
    date: "Yesterday",
    isCurrentUser: false,
  },
  {
    id: "2",
    sender: "You",
    avatar: "JD",
    content: "Thanks Sarah! I'll add the flight costs later today.",
    timestamp: "10:32 AM",
    date: "Yesterday",
    isCurrentUser: true,
  },
  {
    id: "3",
    sender: "Mike Johnson",
    avatar: "MJ",
    content: "Don't forget about the restaurant bill from last night!",
    timestamp: "2:15 PM",
    date: "Yesterday",
    isCurrentUser: false,
  },
  {
    id: "4",
    sender: "You",
    avatar: "JD",
    content: "Good catch! Adding it now.",
    timestamp: "9:20 AM",
    date: "Today",
    isCurrentUser: true,
  },
  {
    id: "5",
    sender: "Emma Wilson",
    avatar: "EW",
    content: "I'll handle the grocery shopping expenses",
    timestamp: "9:45 AM",
    date: "Today",
    isCurrentUser: false,
  },
];

export function ChatTab() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "You",
      avatar: "JD",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      date: "Today",
      isCurrentUser: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const groupedMessages = messages.reduce((acc, message) => {
    if (!acc[message.date]) {
      acc[message.date] = [];
    }
    acc[message.date].push(message);
    return acc;
  }, {} as Record<string, Message[]>);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-muted/20">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date} className="space-y-4">
            {/* Date Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-medium text-muted-foreground px-3 py-1 bg-muted rounded-full">
                {date}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Messages for this date */}
            {dateMessages.map((message, index) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2 md:gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300",
                  message.isCurrentUser && "flex-row-reverse"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 ring-2 ring-background shadow-md">
                  <AvatarFallback
                    className={cn(
                      message.isCurrentUser
                        ? "bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {message.avatar}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "flex flex-col gap-1 max-w-[85%] md:max-w-md",
                    message.isCurrentUser && "items-end"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">
                      {message.sender}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 shadow-sm transition-all hover:shadow-md",
                      message.isCurrentUser
                        ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-tr-md"
                        : "bg-card text-foreground rounded-tl-md border border-border"
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t border-border p-3 md:p-4 bg-card/95 backdrop-blur-sm">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 h-11 md:h-12 rounded-xl border-border focus:ring-2 focus:ring-primary/20"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 md:h-12 md:w-12 rounded-xl hover:bg-muted bg-transparent"
          >
            <Smile className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <Button
            onClick={handleSend}
            size="icon"
            className="h-11 w-11 md:h-12 md:w-12 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            <Send className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

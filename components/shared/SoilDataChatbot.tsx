"use client";

import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  text: string;
  isUser: boolean;
};

export default function SoilDataChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, isUser: true };
      setMessages([...messages, userMessage]);
      setLoading(true);

      try {
        // URL encode the input using encodeURIComponent
        const encodedQuestion = encodeURIComponent(input);

        // Make the API request
        const response = await fetch(
          `https://chatbot-api-5i5m.onrender.com/ask?question=${encodedQuestion}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("API response data:", data); // Log API response
          const botMessage = { text: data.answer, isUser: false };
          setMessages((prev) => [...prev, botMessage]);
        } else {
          console.error("API error:", response.status, response.statusText);
          setMessages((prev) => [
            ...prev,
            {
              text: `Sorry, there was an error: ${response.statusText}`,
              isUser: false,
            },
          ]);
        }
      } catch (error) {
        console.error("Request failed:", error); // Log the error
        setMessages((prev) => [
          ...prev,
          { text: "An error occurred. Please try again.", isUser: false },
        ]);
      } finally {
        setLoading(false);
        setInput("");
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-[#4a6320] via-[#849e30] to-[#2e5b1b]">
      <CardHeader>
        <CardTitle className="text-white">Soil Data Chatbot</CardTitle>
        <CardDescription className="text-primary text-[#dee42f]">Ask questions about your soil data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] flex flex-col">
          <ScrollArea className="flex-1 mb-4 border rounded-lg p-4">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 w-full flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      message.isUser
                        ? "bg-[#706C61] text-primary-foreground"
                        : "bg-muted"
                    } inline-block max-w-max`}
                  >
                    {message.text}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <MessageSquare className="h-8 w-8 mr-2 text-[#dee42f]" />
                <span className="text-[#dee42f]">No messages yet. Start a conversation!</span>
              </div>
            )}
          </ScrollArea>
          <div className="flex space-x-2">
            <Input
              placeholder="Type your question here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 text-white placeholder:text-[#dee42f]"
              disabled={loading}
            />
            <Button onClick={handleSend} disabled={loading} className="text-[#dee42f]">
              <Send className="h-4 w-4 mr-2 text-[#dee42f]" />
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

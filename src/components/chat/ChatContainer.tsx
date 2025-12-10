import { useState, useRef, useEffect, useCallback } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage, Message } from "./ChatMessage";
import { ChatSuggestions } from "./ChatSuggestions";
import { ChatInput } from "./ChatInput";

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hi there! 👋 I'm your PCOS Assistant. I'm here to help you understand Polycystic Ovary Syndrome and support you on your health journey.",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "**PCOS affects 1 in 10 women** of reproductive age, making it one of the most common hormonal disorders. It can impact your menstrual cycle, fertility, weight, and even your mood.\n\nWhile there's no cure, many women successfully manage their symptoms through lifestyle changes, medications, and proper medical care. I'm here to answer your questions and provide reliable information.\n\n**Remember:** I'm not a substitute for professional medical advice. Always consult with your healthcare provider for personalized guidance.",
  },
];

const SMART_SUGGESTIONS = [
  "What causes PCOS?",
  "Common symptoms",
  "Diet tips for PCOS",
];

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(SMART_SUGGESTIONS);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setSuggestions([]);
    setIsLoading(true);

    try {
      // Simulate API call - replace with actual /ask endpoint
      const response = await mockApiCall(text);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (response.suggestions) {
        setSuggestions(response.suggestions);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I'm sorry, I encountered an error. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleBack = () => {
    // Handle navigation back - could be connected to router
    console.log("Navigate back");
  };

  return (
    <div className="flex h-screen max-h-screen flex-col bg-background">
      <ChatHeader title="PCOS Assistant" onBack={handleBack} />

      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 px-4 py-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-bubble rounded-bl-md bg-chat-assistant px-4 py-3 chat-bubble-shadow">
                <TypingIndicator />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="sticky bottom-0 border-t border-border bg-background">
        <ChatSuggestions
          suggestions={suggestions}
          onSelect={handleSuggestionSelect}
        />
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </footer>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
    </div>
  );
}

// Mock API function - replace with actual API integration
async function mockApiCall(
  message: string
): Promise<{ message: string; suggestions?: string[] }> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("cause") || lowerMessage.includes("why")) {
    return {
      message:
        "**The exact cause of PCOS isn't fully understood**, but several factors play a role:\n\n**Insulin resistance:** Many women with PCOS have insulin resistance, causing the body to produce more insulin. Excess insulin may increase androgen production.\n\n**Genetics:** PCOS tends to run in families. If your mother or sister has PCOS, you may have a higher chance of developing it.\n\n**Inflammation:** Women with PCOS often have increased levels of inflammation, which can stimulate the ovaries to produce androgens.",
      suggestions: ["How is PCOS diagnosed?", "Treatment options", "Lifestyle changes"],
    };
  }

  if (lowerMessage.includes("symptom")) {
    return {
      message:
        "**Common symptoms of PCOS include:**\n\n• **Irregular periods** — Infrequent, irregular, or prolonged menstrual cycles\n• **Excess androgen** — Elevated levels may result in excess facial and body hair, severe acne, and male-pattern baldness\n• **Polycystic ovaries** — Ovaries might be enlarged and contain follicles that surround the eggs\n\n**Other symptoms may include:**\n• Weight gain or difficulty losing weight\n• Darkening of the skin, particularly along neck creases\n• Skin tags\n• Mood changes, including anxiety and depression",
      suggestions: ["Can PCOS cause infertility?", "Managing symptoms", "When to see a doctor"],
    };
  }

  if (lowerMessage.includes("diet") || lowerMessage.includes("food") || lowerMessage.includes("eat")) {
    return {
      message:
        "**A balanced diet can help manage PCOS symptoms:**\n\n**Focus on:**\n• **Low glycemic index (GI) foods** — Whole grains, legumes, nuts, seeds, fruits, and vegetables\n• **Lean proteins** — Fish, chicken, tofu, and eggs\n• **Healthy fats** — Avocados, olive oil, and omega-3 rich foods\n• **Anti-inflammatory foods** — Berries, leafy greens, and fatty fish\n\n**Limit:**\n• Refined carbohydrates and added sugars\n• Processed foods\n• Sugary beverages\n\n**Tip:** Eating smaller, more frequent meals can help manage blood sugar levels throughout the day.",
      suggestions: ["Exercise recommendations", "Supplements for PCOS", "Meal planning tips"],
    };
  }

  return {
    message:
      "That's a great question! PCOS management is very individual, and what works for one person may not work for another. I'd recommend discussing this specific concern with your healthcare provider who can give you personalized advice based on your medical history and current symptoms.\n\nIs there anything else about PCOS you'd like to learn about?",
    suggestions: ["What causes PCOS?", "Common symptoms", "Diet tips for PCOS"],
  };
}

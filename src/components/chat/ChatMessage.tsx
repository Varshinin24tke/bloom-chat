import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-bubble px-4 py-3 chat-bubble-shadow",
          isUser
            ? "bg-chat-user text-chat-user-foreground rounded-br-md"
            : "bg-chat-assistant text-chat-assistant-foreground rounded-bl-md"
        )}
      >
        <div
          className="text-[15px] leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0 [&>strong]:font-semibold"
          dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
        />
      </div>
    </div>
  );
}

function formatMessage(content: string): string {
  // Convert **text** to <strong>text</strong>
  let formatted = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Convert newlines to paragraphs
  const paragraphs = formatted.split("\n\n");
  if (paragraphs.length > 1) {
    formatted = paragraphs.map((p) => `<p>${p}</p>`).join("");
  }
  return formatted;
}

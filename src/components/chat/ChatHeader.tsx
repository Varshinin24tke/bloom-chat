import { ArrowLeft } from "lucide-react";

interface ChatHeaderProps {
  title?: string;
  onBack?: () => void;
}

export function ChatHeader({ title = "PCOS Assistant", onBack }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-muted"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>
      <div className="h-0.5 w-full bg-chat-header-accent opacity-60" />
    </header>
  );
}

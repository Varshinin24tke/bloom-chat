interface ChatSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function ChatSuggestions({ suggestions, onSelect }: ChatSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="flex-shrink-0 rounded-full bg-gradient-to-r from-chat-suggestion-start to-chat-suggestion-end px-4 py-2.5 text-sm font-medium text-foreground suggestion-shadow transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}

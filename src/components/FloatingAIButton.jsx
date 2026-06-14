import { Bot } from 'lucide-react';

export default function FloatingAIButton() {
  return (
    <button
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-50"
      style={{ backgroundColor: '#A8E000' }}
      aria-label="Open AI Assistant"
    >
      <Bot size={22} color="#0A0E0C" strokeWidth={2} />
    </button>
  );
}

import ReactMarkdown from 'react-markdown';
import { Sparkles, MessageCircle, ExternalLink, ThumbsUp, ThumbsDown } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import { useDebouncedClick } from '@/hooks/useDebouncedClick';

const ChatMessage = ({ message, onFeedback, showWhatsApp = false }) => {
  const isBot = message.role === 'ai' || message.role === 'assistant';
  const isUser = message.role === 'user';
  const debouncedLike = useDebouncedClick(() => onFeedback?.(message.id, 'like'), 350);
  const debouncedDislike = useDebouncedClick(() => onFeedback?.(message.id, 'dislike'), 350);

  const shouldShowWhatsApp = isBot && (showWhatsApp || message.content?.toLowerCase()?.includes('whatsapp'));

  return (
    <div className={`flex mb-6 ${isUser ? 'justify-end' : 'justify-start'} group animate-in fade-in slide-in-from-bottom-2`}>
      {/* Bot Icon */}
      {isBot && (
        <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center mr-3 shrink-0 shadow-md">
          <Sparkles size={16} className="text-white" />
        </div>
      )}

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] md:max-w-[70%]`}>
        {/* Message Bubble */}
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm ${isUser
              ? 'bg-blue-600 text-white rounded-tr-none'
              : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
            }`}
        >
          <div className="text-sm prose prose-sm max-w-none break-words leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]} // This is the magic line
              components={{
                // Handle Links
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 font-bold underline break-all decoration-2 underline-offset-2 ${isUser ? 'text-blue-100 hover:text-white' : 'text-blue-600 hover:text-blue-800'
                      }`}
                  >
                    {props.children}
                    <ExternalLink size={12} />
                  </a>
                ),
                // Fix spacing for lists and paragraphs
                p: ({ children }) => <p className="mb-0 last:mb-0 whitespace-pre-wrap">{children}</p>,
                ul: ({ children }) => <ul className="list-disc ml-4 my-2 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal ml-4 my-2 space-y-1">{children}</ol>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* WhatsApp Action Button */}
        {shouldShowWhatsApp && (
          <a
            href="https://wa.me/+923118688410" // Your pre-configured number
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold py-2.5 px-5 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <MessageCircle size={16} />
            Contact on WhatsApp
          </a>
        )}
        
        {isBot && (
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={debouncedLike}
              className={`inline-flex items-center justify-center rounded-md p-1.5 transition-colors ${message.feedback === 'like'
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              aria-label="Like response"
              title="Like"
            >
              <ThumbsUp size={14} />
            </button>
            <button
              type="button"
              onClick={debouncedDislike}
              className={`inline-flex items-center justify-center rounded-md p-1.5 transition-colors ${message.feedback === 'dislike'
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              aria-label="Dislike response"
              title="Dislike"
            >
              <ThumbsDown size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
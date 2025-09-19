import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from '../types';
import { startChat } from '../services/geminiService';
import type { Chat } from '@google/genai';
import { UserCircleIcon, BotIcon, SendIcon } from '../components/icons/Icon';

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <BotIcon className="h-8 w-8 text-primary flex-shrink-0" />}
      <div className={`p-4 rounded-2xl max-w-lg ${isUser ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
        <p style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }}></p>
      </div>
      {isUser && <UserCircleIcon className="h-8 w-8 text-gray-400 flex-shrink-0" />}
    </div>
  );
};

const QuickReplyButton: React.FC<{ text: string, onClick: () => void }> = ({ text, onClick }) => (
    <button
        onClick={onClick}
        className="bg-blue-100 text-primary font-semibold px-4 py-2 rounded-full hover:bg-blue-200 transition-colors text-sm"
    >
        {text}
    </button>
);

const ChatbotPage: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  useEffect(() => {
    setChat(startChat());
    setMessages([{ role: 'model', text: 'أهلاً بك في مساعد صحة العائلة! كيف يمكنني مساعدتك اليوم؟\n\n**تنبيه:** أنا لست طبيبًا. للحصول على تشخيص أو استشارة طبية، يرجى التحدث إلى طبيب حقيقي.' }]);
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (messageText = input) => {
    if (!messageText.trim() || !chat || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowQuickReplies(false);
    
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
        const result = await chat.sendMessageStream({ message: messageText });

        for await (const chunk of result) {
            const chunkText = chunk.text;
            setMessages(prev => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage.role === 'model') {
                    return [...prev.slice(0, -1), { ...lastMessage, text: lastMessage.text + chunkText }];
                }
                return [...prev, { role: 'model', text: chunkText }];
            });
        }
    } catch (error) {
      console.error("Gemini API error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'عذرًا، حدث خطأ ما. يرجى المحاولة مرة أخرى.' }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleQuickReply = (text: string, prompt: string) => {
      setInput(prompt);
      handleSend(prompt);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50">
      <div className="flex-grow overflow-y-auto p-6">
        <div className="container mx-auto max-w-4xl">
          {messages.map((msg, index) => <ChatBubble key={index} message={msg} />)}
           {isLoading && messages[messages.length-1].role === 'model' && (
             <div className="flex items-start gap-3 my-4 justify-start">
               <BotIcon className="h-8 w-8 text-primary flex-shrink-0" />
               <div className="p-4 rounded-2xl max-w-lg bg-gray-200 text-gray-800 rounded-bl-none">
                 <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-150"></div>
                 </div>
               </div>
             </div>
           )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
       {showQuickReplies && (
          <div className="p-4 bg-white border-t">
              <div className="container mx-auto max-w-4xl flex flex-wrap justify-center gap-3">
                  <QuickReplyButton text="فحص الأعراض" onClick={() => handleQuickReply("فحص الأعراض", "أريد فحص بعض الأعراض التي أشعر بها: ")} />
                  <QuickReplyButton text="نصائح تغذية للحامل" onClick={() => handleQuickReply("نصائح تغذية", "ما هي أهم نصائح التغذية للمرأة الحامل؟")} />
                  <QuickReplyButton text="تطعيمات الأطفال" onClick={() => handleQuickReply("تطعيمات الأطفال", "ما هو جدول تطعيمات الأطفال في عامهم الأول؟")} />
              </div>
          </div>
      )}
      
      <div className="p-4 bg-white border-t-2">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center bg-gray-100 rounded-full p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اكتب رسالتك هنا..."
              className="flex-grow bg-transparent focus:outline-none px-4 text-gray-700"
              disabled={isLoading}
            />
            <button onClick={() => handleSend()} disabled={isLoading || !input.trim()} className="bg-primary text-white rounded-full p-3 hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
              <SendIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
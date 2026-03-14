import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Terminal, ShieldAlert, BookOpen, Skull, HeartCrack } from 'lucide-react';
import { sendMessage, initChat } from '../services/ai';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const MODES = [
  { id: '1', name: 'LIGHT', desc: 'Mild roast, basic slang' },
  { id: '2', name: 'MEDIUM', desc: 'Funny insults, cultural' },
  { id: '3', name: 'HIGH', desc: 'Personal roast' },
  { id: '4', name: 'DARK', desc: 'Existential humor' },
  { id: '5', name: 'PRO', desc: 'Extreme language (Edu)' },
  { id: '6', name: 'DICTIONARY', desc: 'Gaali dictionary' },
  { id: '7', name: 'EMOTIONAL', desc: 'Soft + troll' },
  { id: '8', name: 'RANDOM', desc: 'Surprise mode' },
  { id: '9', name: 'DOUBLE DARK', desc: '18+ Double meaning' },
];

const INITIAL_MESSAGE = `╔═══════════════════════════════════════════════════════════════════════════════╗
║                    🔞 DARK PRO TROLL BOT 69 — 18+ ONLY 🔞                     ║
║                      Creator: Moiz bhai | Powered by Gemini                   ║
╚═══════════════════════════════════════════════════════════════════════════════╝

🔥 TROLL BOT 69 ACTIVATED — DARK PRO EDITION 🔥
🔞 Language Education Mode — 18+ Only 🔞

Type /help for commands. Type your message to begin.
(Remember: Educational purpose only! Real life mein use mat kar!)`;

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', text: INITIAL_MESSAGE, sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [isSilenced, setIsSilenced] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');

    // Handle local commands
    let effectiveMode = mode;

    if (userText.toLowerCase() === '/enough' || userText.toLowerCase() === 'enough') {
      setMessages(prev => [...prev, 
        { id: Date.now().toString(), text: userText, sender: 'user', timestamp: new Date() },
        { id: (Date.now() + 1).toString(), text: "Okay bro, shutting up. Will be back in 15 mins!", sender: 'bot', timestamp: new Date() }
      ]);
      setIsSilenced(true);
      setTimeout(() => setIsSilenced(false), 15 * 60 * 1000); // 15 minutes silence
      return;
    }

    if (userText.toLowerCase() === '/dark') {
      setMode('4');
      effectiveMode = '4';
    }

    if (['/gand', '/darkdouble', '/dmj'].includes(userText.toLowerCase())) {
      setMode('9');
      effectiveMode = '9';
    }

    if (userText.toLowerCase().startsWith('/mode ')) {
      const newMode = userText.split(' ')[1];
      const modeObj = MODES.find(m => m.id === newMode);
      if (modeObj) {
        setMode(newMode);
        setMessages(prev => [...prev, 
          { id: Date.now().toString(), text: userText, sender: 'user', timestamp: new Date() },
          { id: (Date.now() + 1).toString(), text: `${modeObj.name} mode ON. Ab teri aur lagegi! 😈`, sender: 'bot', timestamp: new Date() }
        ]);
        return;
      }
    }

    if (isSilenced) {
      setMessages(prev => [...prev, 
        { id: Date.now().toString(), text: userText, sender: 'user', timestamp: new Date() },
        { id: (Date.now() + 1).toString(), text: "🤫 Shhh... I am silenced. Wait for the timeout to finish.", sender: 'bot', timestamp: new Date() }
      ]);
      return;
    }

    // Normal message flow
    const newUserMsg: Message = { id: Date.now().toString(), text: userText, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    const currentModeName = MODES.find(m => m.id === effectiveMode)?.name || 'LIGHT';
    const responseText = await sendMessage(userText, currentModeName);

    const newBotMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: 'bot', timestamp: new Date() };
    setMessages(prev => [...prev, newBotMsg]);
    setIsLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-screen bg-black text-green-500 font-mono overflow-hidden"
    >
      {/* Sidebar */}
      <div className="w-64 border-r border-green-800 bg-black/50 hidden md:flex flex-col p-4">
        <div className="flex items-center gap-2 mb-6 border-b border-green-800 pb-4">
          <Terminal className="w-6 h-6" />
          <h2 className="font-bold tracking-wider">TROLL BOT 69</h2>
        </div>

        <div className="mb-6">
          <h3 className="text-green-700 text-sm mb-2 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> CURRENT MODE
          </h3>
          <div className="space-y-1">
            {MODES.map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`w-full text-left px-2 py-1 text-sm border ${mode === m.id ? 'border-green-500 bg-green-900/30' : 'border-transparent hover:border-green-800 text-green-700'}`}
              >
                [{m.id}] {m.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <h3 className="text-green-700 text-sm mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> QUICK COMMANDS
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-green-600">
            <span className="hover:text-green-400 cursor-pointer" onClick={() => setInput('/roast')}>/roast</span>
            <span className="hover:text-green-400 cursor-pointer" onClick={() => setInput('/joke')}>/joke</span>
            <span className="hover:text-green-400 cursor-pointer" onClick={() => setInput('/dark')}>/dark</span>
            <span className="hover:text-green-400 cursor-pointer" onClick={() => setInput('/gaali ')}>/gaali</span>
            <span className="hover:text-green-400 cursor-pointer" onClick={() => setInput('/enough')}>/enough</span>
            <span className="hover:text-green-400 cursor-pointer" onClick={() => setInput('/help')}>/help</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Mobile Header */}
        <div className="md:hidden border-b border-green-800 p-3 flex justify-between items-center bg-black">
          <span className="font-bold">TROLL BOT 69</span>
          <select 
            value={mode} 
            onChange={(e) => setMode(e.target.value)}
            className="bg-black border border-green-800 text-green-500 text-sm p-1"
          >
            {MODES.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <span className="text-xs text-green-800 mb-1">
                {msg.sender === 'user' ? 'USER_INPUT' : 'SYSTEM_RESPONSE'} [{msg.timestamp.toLocaleTimeString()}]
              </span>
              <div className={`max-w-[90%] md:max-w-[80%] p-3 whitespace-pre-wrap ${
                msg.sender === 'user' 
                  ? 'border border-green-700 bg-green-950/20 text-green-400' 
                  : 'border border-green-500 bg-black text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.1)]'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex flex-col items-start">
              <span className="text-xs text-green-800 mb-1">SYSTEM_PROCESSING</span>
              <div className="border border-green-500 bg-black p-3 flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-green-800 bg-black">
          <form onSubmit={handleSend} className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700">{'>'}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isSilenced}
                placeholder={isSilenced ? "Bot is silenced..." : "Type command or message..."}
                className="w-full bg-black border border-green-700 text-green-500 p-3 pl-8 focus:outline-none focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] disabled:opacity-50"
                autoComplete="off"
              />
            </div>
            <button 
              type="submit"
              disabled={!input.trim() || isLoading || isSilenced}
              className="px-4 py-3 bg-green-900/50 border border-green-700 hover:bg-green-800 hover:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center mt-2 text-[10px] text-green-800">
            EDUCATIONAL PURPOSE ONLY. DO NOT USE IN REAL LIFE.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

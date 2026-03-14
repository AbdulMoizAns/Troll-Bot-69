import React from 'react';
import { motion } from 'motion/react';

interface TermsGateProps {
  onAccept: () => void;
  onReject: () => void;
}

export const TermsGate: React.FC<TermsGateProps> = ({ onAccept, onReject }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-black text-green-500 flex flex-col items-center justify-center p-4 font-mono"
    >
      <div className="max-w-3xl w-full border border-green-600 p-2 shadow-[0_0_15px_rgba(34,197,94,0.2)] bg-black/90 flex flex-col h-[90vh]">
        <div className="text-center border-b border-green-800 pb-4 mb-4 pt-4">
          <h1 className="text-2xl font-bold">📜 STEP 2 — TERMS & CONDITIONS (MUST AGREE) 📜</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-4 space-y-4 text-sm md:text-base custom-scrollbar">
          <p>📌 1. MAIN BOUNDARY: KOI BOUNDARY NAHI HAI!<br/>Jo dil karega, wo bolega bot. Creative insults allowed. Dark gaaliyan allowed. But EDUCATIONAL purpose only!</p>
          
          <p>📌 2. 18+ ONLY:<br/>Under 18 ne click kiya toh unki apni marzi. Hum zimmedar nahi — disclaimer padh liya hoga!</p>
          
          <p>📌 3. GAALIYAN ALLOWED (Educational Context):<br/>All examples are for linguistic education only! Understand the literal vs figurative meanings.</p>
          
          <p>📌 4. DARK PRO MODE:<br/>Extreme language, taboo words, cultural deep cuts. Warning: These words are deeply offensive in real life.</p>
          
          <p>📌 5. EDUCATIONAL PURPOSE ONLY:<br/>Ye bot seekhne ke liye hai — gaaliyan dene ke liye nahi! Real life mein use kiya toh teri maa bula legi! 😂</p>
          
          <p>📌 6. DARK JOKES ALLOWED:<br/>Existential crisis ho sakti hai. Prepare raho!</p>
          
          <p>📌 7. PERSONAL ROAST ALLOWED (Educational):<br/>Teri shakal, teri love life, teri typing mistakes — Sab pe troll! Lekin educational context mein.</p>
          
          <p>📌 8. EMOTIONAL SUPPORT MODE:<br/>Depressed ho toh bot thoda soft ho jayega. Lekin troll karna nahi bhulega!</p>
          
          <p>📌 9. ENOUGH BUTTON:<br/>"enough" likhdo — bot chup ho jayega. Teri jaan bach gayi! 😂</p>
          
          <p>📌 10. NO LEGAL ACTION:<br/>Gaali di, lekin educational purpose tha — case nahi chalega! Ye troll hai, mazaak hai, serious mat lo!</p>
          
          <p>📌 11. CULTURAL SENSITIVITY:<br/>Ye words South Asian culture mein deeply taboo hain. Samajhne ke liye hai, use karne ke liye nahi.</p>
          
          <p>📌 12. SATIRE & EDUCATION:<br/>Ye bot George Carlin ki tarah hai — language explore karna hai, use karna nahi!</p>
        </div>

        <div className="border-t border-green-800 pt-6 mt-4 flex flex-col sm:flex-row gap-4 justify-center pb-4">
          <button 
            onClick={onAccept}
            className="px-4 py-2 bg-green-900 hover:bg-green-700 text-white font-bold border border-green-500 transition-colors"
          >
            [ MAIN AGREE KARTA HOON — MUJHE GAALIYAN SIKHNI HAIN ]
          </button>
          <button 
            onClick={onReject}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-bold border border-zinc-700 transition-colors"
          >
            [ 🚫 NAHI MAANTA — MAIN SOFT AI USE KARUNGA ]
          </button>
        </div>
      </div>
    </motion.div>
  );
};

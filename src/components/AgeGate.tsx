import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

interface AgeGateProps {
  onAccept: () => void;
  onReject: () => void;
}

export const AgeGate: React.FC<AgeGateProps> = ({ onAccept, onReject }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-red-500 flex flex-col items-center justify-center p-4 font-mono text-center"
    >
      <div className="max-w-2xl border-2 border-red-600 p-8 shadow-[0_0_30px_rgba(220,38,38,0.5)] bg-black/80">
        <AlertTriangle className="w-20 h-20 mx-auto mb-6 animate-pulse" />
        
        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-widest">
          🔞 WARNING 🔞
        </h1>
        <h2 className="text-xl md:text-2xl mb-8">ADULTS ONLY — DARK PRO CONTENT</h2>
        
        <div className="border border-red-800 p-4 mb-8 text-left text-sm md:text-base text-red-400">
          <p>Ye bot sirf 18+ users ke liye hai. Yahan gaaliyan hain, dark jokes hain, aur cultural taboo words hain. Agar tu ready hai toh enter kar — warna bhag yahan se!</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onAccept}
            className="px-6 py-3 bg-red-900 hover:bg-red-700 text-white font-bold border border-red-500 transition-colors shadow-[0_0_10px_rgba(220,38,38,0.8)]"
          >
            [✅ I AM 18+ — ENTER DARK ZONE]
          </button>
          <button 
            onClick={onReject}
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-bold border border-zinc-700 transition-colors"
          >
            [❌ UNDER 18 — EXIT (BHAG YAHAN SE!)]
          </button>
        </div>
      </div>
    </motion.div>
  );
};

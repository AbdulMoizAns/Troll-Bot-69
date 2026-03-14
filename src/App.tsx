/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AgeGate } from './components/AgeGate';
import { TermsGate } from './components/TermsGate';
import { Chat } from './components/Chat';

type AppStage = 'age-gate' | 'terms-gate' | 'chat' | 'rejected';

export default function App() {
  const [stage, setStage] = useState<AppStage>('age-gate');

  if (stage === 'rejected') {
    return (
      <div className="min-h-screen bg-black text-red-500 flex flex-col items-center justify-center p-4 font-mono text-center">
        <h1 className="text-4xl font-bold mb-4">ACCESS DENIED</h1>
        <p className="text-xl">You must be 18+ and agree to the terms to enter the Dark Zone.</p>
        <button 
          onClick={() => setStage('age-gate')}
          className="mt-8 px-4 py-2 border border-red-500 hover:bg-red-900/50 transition-colors"
        >
          Return to Start
        </button>
      </div>
    );
  }

  return (
    <>
      {stage === 'age-gate' && (
        <AgeGate 
          onAccept={() => setStage('terms-gate')} 
          onReject={() => setStage('rejected')} 
        />
      )}
      {stage === 'terms-gate' && (
        <TermsGate 
          onAccept={() => setStage('chat')} 
          onReject={() => setStage('rejected')} 
        />
      )}
      {stage === 'chat' && <Chat />}
    </>
  );
}

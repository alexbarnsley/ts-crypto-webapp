'use client';

import { ButtonHTMLAttributes, useState } from 'react';

import { TransferTransaction } from './transactions/TransferTransaction';
import { VoteTransaction } from './transactions/VoteTransaction';

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="px-4 py-2 bg-slate-700 rounded-md" {...props}>
      {props.children}
    </button>
  );
}

export default function Home() {
  const [transactionType, setTransactionType] = useState<string>('vote');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="space-x-2">
        <Button onClick={() => setTransactionType('transfer')}>Transfer</Button>

        <Button onClick={() => setTransactionType('vote')}>Vote</Button>
      </div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {transactionType === 'transfer' && <TransferTransaction />}
        {transactionType === 'vote' && <VoteTransaction />}
      </main>
    </div>
  );
}

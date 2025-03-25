'use client';

import { useEffect, useState } from 'react';

import { TransferTransaction } from './Components/transactions/TransferTransaction';
import { VoteTransaction } from './Components/transactions/VoteTransaction';
import { Button } from "./Components/Button";

import { ArkClient } from "@arkecosystem/typescript-client";
import { Address } from "@arkecosystem/typescript-crypto";
import { SendTransaction } from "./Components/SendTransaction";
import { ITransactionBuilder } from "@arkecosystem/typescript-crypto/types";

export default function Home() {
  const [transactionType, setTransactionType] = useState<string>('');
  const [passphrase, setPassphrase] = useState<string>('body token diary female like ankle also mandate mean bird clever novel caution oil save patrol capital appear salmon pull enough spirit mother planet');
  const [nonce, setNonce] = useState<number>(1);
  const [transaction, setTransaction] = useState<ITransactionBuilder<any> | undefined>();

  const client = new ArkClient({
    api: 'https://dwallets-evm.mainsailhq.com/api',
    transactions: 'https://dwallets-evm.mainsailhq.com/tx/api',
  });

  useEffect(() => {
    async function fetchNonce() {
      const address = await Address.fromPassphrase(passphrase);
      const { data } = await client.wallets().get(address);

      setNonce(data.nonce);
    }

    fetchNonce();
  }, [client, passphrase, setNonce]);

  useEffect(() => {
    async function fetchBuilder() {
      let transactionBuilder = null;
      if (transactionType === 'transfer') {
        const { getTransferTransaction } = await import('./Components/transactions/TransferTransaction');
        transactionBuilder = await getTransferTransaction({ passphrase, nonce });
      } else if (transactionType === 'vote') {
        const { getVoteTransaction } = await import('./Components/transactions/VoteTransaction');
        transactionBuilder = await getVoteTransaction({ passphrase, nonce });
      }

      if (transactionBuilder === null) {
        return;
      }

      setTransaction(transactionBuilder);
    }

    fetchBuilder();
  }, [transactionType, setTransaction]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="bg-gray-100 text-gray-900 p-1 rounded-lg">
        <input type="text" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} />
      </div>

      <div>
        <div className="space-x-2">
          <Button onClick={() => setTransactionType('transfer')}>Transfer</Button>

          <Button onClick={() => setTransactionType('vote')}>Vote</Button>
        </div>

        {transaction && <div className="mt-2 text-center">
          <SendTransaction 
            client={client}
            transaction={transaction} 
          />
        </div>}
      </div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {transactionType === 'transfer' && <TransferTransaction passphrase={passphrase} nonce={nonce} />}
        {transactionType === 'vote' && <VoteTransaction passphrase={passphrase} nonce={nonce} />}
      </main>
    </div>
  );
}

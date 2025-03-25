'use client';

import { useEffect, useState } from 'react';

import { TransferBuilder } from '@arkecosystem/typescript-crypto';
import { ITransactionBuilder, ITransferBuilder } from "@arkecosystem/typescript-crypto/types";

export async function getTransferTransaction({ passphrase, nonce }: { passphrase: string, nonce: number }): Promise<ITransactionBuilder<ITransferBuilder>> {
  const builder = await TransferBuilder.new()
    .value('10')
    .recipientAddress('0xb693449AdDa7EFc015D87944EAE8b7C37EB1690A')
    .gasPrice('5000000000')
    .gasLimit('200000')
    .nonce(nonce);

  await builder.sign(passphrase);

  return builder;
}

export function TransferTransaction({ passphrase, nonce }: { passphrase: string, nonce: number }) {
  const [transactionData, setTransactionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function buildTransaction() {
      try {
        setLoading(true);

        const builder = await getTransferTransaction({ passphrase, nonce });

        setTransactionData(builder.transaction.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    buildTransaction();
  }, []);

  if (loading) return <p>Loading transaction data...</p>;
  if (error) return <p>Error: {error}</p>;

  return <pre>Transfer: {JSON.stringify(transactionData, null, 2)}</pre>;
}

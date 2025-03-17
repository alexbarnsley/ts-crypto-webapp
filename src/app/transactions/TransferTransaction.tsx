"use client";

import { TransferBuilder } from "typescript-crypto";

export function TransferTransaction() {
    const builder = TransferBuilder
        .new()
        .value("10")
        .recipientAddress("0xb693449AdDa7EFc015D87944EAE8b7C37EB1690A")
        .gasPrice("5000000000")
        .gasLimit("200000")
        .nonce("1");
  
    builder.sign("testing");
  
    return (
      <pre>
        Transfer: {JSON.stringify(builder.transaction.data, null, 2)}
      </pre>
    )
}
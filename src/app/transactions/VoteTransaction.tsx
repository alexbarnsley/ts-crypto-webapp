import { VoteBuilder } from "typescript-crypto";

export function VoteTransaction() {
    const builder = VoteBuilder
        .new()
        .vote("0x512F366D524157BcF734546eB29a6d687B762255")
        .recipientAddress("0xb693449AdDa7EFc015D87944EAE8b7C37EB1690A")
        .gasPrice("5000000000")
        .gasLimit("200000")
        .nonce("1");
  
    builder.sign("testing");
  
    return (
      <pre>
        Vote: {JSON.stringify(builder.transaction.data, null, 2)}
      </pre>
    )
}
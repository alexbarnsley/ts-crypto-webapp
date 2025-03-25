import { ITransactionBuilder } from "@arkecosystem/typescript-crypto/types";
import { Button } from "./Button";
import { ArkClient } from "@arkecosystem/typescript-client";
import { useCallback, useState } from "react";

export function SendTransaction({ client, transaction }: { client: ArkClient, transaction: ITransactionBuilder<any> }) {
    const [response, setResponse] = useState<string>('');

    const sendTransaction = useCallback(async () => {
        console.log(transaction.transaction);
        console.log(transaction.transaction.serialize());
        console.log(transaction.transaction.serialize().toString('hex'));
        const requestResponse = await client.transactions().create([transaction.transaction.serialize().toString('hex')]);

        setResponse(JSON.stringify(requestResponse, null, 2));
    }, [setResponse]);

    return (
        <div>
            <Button 
                onClick={sendTransaction} 
                className="bg-blue-500 px-4 py-2 rounded-md cursor-pointer"
            >
                Send Transaction
            </Button>

            {response && <pre>{response}</pre>}
        </div>
    )
}
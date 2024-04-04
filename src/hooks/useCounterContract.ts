import Counter from "../contracts/counter";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract } from "ton-core";
import { CHAIN } from "@tonconnect/protocol";
import { useTonAddress } from "@tonconnect/ui-react";

export function useCounterContract() {
  const { client } = useTonClient();
  const { network } = useTonConnect();
  const userFriendlyAddress = useTonAddress();
  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Counter(
      Address.parse(network === CHAIN.MAINNET ? userFriendlyAddress : "") // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<Counter>;
  }, [client]);

  return {
    address: counterContract?.address.toString(),
  };
}

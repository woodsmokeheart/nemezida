import { useTonConnect } from "../../hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import css from "./ConnectStatus.module.scss";

const ConnectStatus = () => {
  const { network } = useTonConnect();
  return (
    <div className={css.button_status}>
      {network ? (network === CHAIN.MAINNET ? "mainnet" : "testnet") : "N/A"}
    </div>
  );
};

export default ConnectStatus;

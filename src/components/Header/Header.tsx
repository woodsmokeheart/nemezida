import { TonConnectButton } from "@tonconnect/ui-react";
import ConnectStatus from "../ConnectStatus/ConnectStatus";
import css from "./Header.module.scss";

const Header = () => {
  return (
    <div className={css.wrapper}>
      <ConnectStatus />
      <TonConnectButton />
    </div>
  );
};

export default Header;

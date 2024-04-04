import { useEffect, useState } from "react";
import css from "./ConnectStatus.module.scss";
import { useTonAddress } from "@tonconnect/ui-react";
import axios from "axios";

const ConnectStatus = () => {
  const rawAddress = useTonAddress(false);
  const [balance, setBalance] = useState("");
  useEffect(() => {
    const fetchParsedBalance = async () => {
      if (!rawAddress) return;

      try {
        const apiUrl = `https://tonapi.io/v2/accounts/${rawAddress}`;
        const response = await axios.get(apiUrl);

        const data = response.data;
        const balanceInDollars = data.balance / 1001101011;
        setBalance(balanceInDollars.toFixed(2));
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      }
    };

    fetchParsedBalance();
  }, [rawAddress]);

  return <div className={css.button_status}>{balance} TON</div>;
};

export default ConnectStatus;

import { useEffect, useState } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import css from "./ClientAddress.module.scss";
import axios from "axios";

const ClientAddress = () => {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const [dns, setDns] = useState([]);

  useEffect(() => {
    const fetchParsedDns = async () => {
      if (!rawAddress) return;

      try {
        const apiUrl = `https://tonapi.io/v2/accounts/${rawAddress}/dns/backresolve`;
        const response = await axios.get(apiUrl);

        const data = response.data;
        setDns(data.domains);
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      }
    };

    fetchParsedDns();
  }, [rawAddress]);

  if (!userFriendlyAddress) {
    return null;
  }
  return (
    <div className={css.wrapper}>
      <div className={css.title}>My address</div>
      <div className={css.item}>{userFriendlyAddress}</div>
      <div className={css.title}>My linked DNS</div>
      <div className={css.item}>
        {dns.map((domain, index) => (
          <div className={css.dns} key={index}>
            {domain}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientAddress;

import { useEffect, useState } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import css from "./ClientAddress.module.scss";
import axios from "axios";

const ClientAddress = () => {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const [dns, setDns] = useState([]);
  console.log(dns, "dns1");

  useEffect(() => {
    const fetchParsedNfts = async () => {
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

    fetchParsedNfts();
  }, [rawAddress]);

  if (!userFriendlyAddress) {
    return null;
  }
  return (
    <div className={css.wrapper}>
      <div className={css.title}>Address</div>
      <div className={css.item}>{userFriendlyAddress}</div>
      <div className={css.title}>DNS</div>
      <div className={css.item}>
        {dns.map((domain, index) => (
          <div className={css.dns} key={index}>{domain}</div>
        ))}
      </div>
    </div>
  );
};

export default ClientAddress;
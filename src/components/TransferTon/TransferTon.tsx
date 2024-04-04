import { useState } from "react";
import { useTonConnect } from "../../hooks/useTonConnect";
import { Address, toNano } from "ton";
import css from "./TransferTon.module.scss";

const TransferTon = () => {
  const { sender, connected } = useTonConnect();

  const [tonAmount, setTonAmount] = useState("0");
  const [tonRecipient, setTonRecipient] = useState("");
  return (
    <div className={css.wrapper}>
      <div className={css.title}>Transfer</div>
      <div className={css.container}>
        <div className={css.input_container}>
          <label>Enter the number of TON to send</label>
          <input
            style={{ marginRight: 8 }}
            type="number"
            value={tonAmount}
            onChange={(e) => setTonAmount(e.target.value)}
          />
        </div>
        <div className={css.input_container}>
          <label>Enter the recipient's address</label>
          <input
            style={{ marginRight: 8 }}
            value={tonRecipient}
            onChange={(e) => setTonRecipient(e.target.value)}
            placeholder="UQC6xeBpTrOCczuVkQ-5GyxeD_p7pCrgD7KH1a2-blzbZJ3e"
          />
        </div>
        <button
          className={css.button_transfer}
          disabled={!connected}
          onClick={async () => {
            sender.send({
              to: Address.parse(tonRecipient),
              value: toNano(tonAmount),
            });
          }}
        >
          Transfer
        </button>
      </div>
    </div>
  );
};

export default TransferTon;

import React, { useEffect, useState } from "react";
import * as helpers from "../helpers";

const WithdrawForm = (props) => {
  const {
    currentCC,
    currency,
    currencies,
    amount,
    handleAmount,
    handleCurrency,
    handleWithdraw,
  } = props;

  const [cc, setCC] = useState(0);

  useEffect(() => {
    let res = helpers.convertAmountToCC(amount, currency);
    setCC(res);
  }, [amount, currency]);

  return (
    <div className="DepositFormWrapper">
      <div className="DepositFormTitle">WITHDRAW FUNDS</div>
      <div style={{ color: "white" }}>{`${cc} CC`}</div>
      <div className="DepositFormContent">
        <input
          type="number"
          value={amount}
          min={0}
          max={helpers.convertCCToAmount(currentCC, currency)}
          onChange={(e) => handleAmount(e.target.value)}
        />
        <select
          value={currency}
          onChange={(e) => handleCurrency(e.target.value)}
        >
          {currencies.map((c) => (
            <option key={c.name} value={c.value}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="DepositMinAmount">
        The minimum CC to withdraw is 3000 CC
      </div>
      <button className="DepositBtn" onClick={() => handleWithdraw()}>
        WITHDRAW
      </button>
    </div>
  );
};

export default WithdrawForm;

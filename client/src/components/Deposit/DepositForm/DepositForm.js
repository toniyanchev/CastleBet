import React, { useEffect, useState } from "react";
import * as helpers from "../helpers";
import "./DepositForm.css";

const DepositForm = (props) => {
  const {
    amount,
    currency,
    currencies,
    handleAmount,
    handleCurrency,
    handleDeposit,
  } = props;

  const [cc, setCC] = useState(null);

  useEffect(() => {
    let res = helpers.convertAmountToCC(amount, currency);
    setCC(res);
  }, [amount, currency]);

  return (
    <div className="DepositFormWrapper">
      <div className="DepositFormTitle">DEPOSIT FUNDS</div>
      <div style={{ color: "white" }}>{`${cc} CC`}</div>
      <div className="DepositFormContent">
        <input
          type="number"
          value={amount}
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
        The minimum CC to deposit is 1000 CC
      </div>
      <button className="DepositBtn" onClick={() => handleDeposit()}>
        DEPOSIT
      </button>
    </div>
  );
};

export default DepositForm;

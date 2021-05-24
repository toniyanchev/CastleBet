import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/User/UserContext";

import "./Deposit.css";
import DepositForm from "./DepositForm/DepositForm";
import WithdrawForm from "./WithdrawForm/WithdrawForm";

const Deposit = () => {
  const userContext = useContext(UserContext);

  const [depositAmount, setDepositAmount] = useState(0);
  const [depositCurrency, setDepositCurrency] = useState("USD");

  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [withdrawCurrency, setWithdrawCurrency] = useState("USD");

  const currencies = [
    { name: "USD $", value: "USD" },
    { name: "GBP £", value: "GBP" },
    { name: "EUR €", value: "EUR" },
  ];

  const deposit = () => {};

  const withdraw = () => {};

  return (
    <div className="DepositWrapper">
      <div className="DepositCurrentBalance">{`Current balance is: ${userContext.user.balance} CC`}</div>
      <div className="PaymentForms">
        <DepositForm
          amount={depositAmount}
          currency={depositCurrency}
          currencies={currencies}
          handleAmount={(val) => setDepositAmount(val)}
          handleCurrency={(val) => setDepositCurrency(val)}
          handleDeposit={() => deposit()}
        />
        {console.log(userContext.user.balance)}
        <WithdrawForm
          currentCC={userContext.user.balance}
          currency={withdrawCurrency}
          currencies={currencies}
          amount={withdrawAmount}
          handleAmount={(val) => setWithdrawAmount(val)}
          handleCurrency={(val) => setWithdrawCurrency(val)}
          handleWithdraw={() => withdraw()}
        />
      </div>
    </div>
  );
};

export default Deposit;

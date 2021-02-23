import React from 'react'

import './BalanceBox.css';

const BalanceBox = props => {
  const { balance } = props;

  const takeBalance = () => balance ? `${balance} CC` : `0 CC`;

  return (
    <div className="BalanceBoxWrapper">
      {takeBalance()}
      <div className="BalanceBoxTitle">BALANCE</div>
    </div>
  );
}

export default BalanceBox;
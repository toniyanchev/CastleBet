import React, { useState } from 'react'
// import { SlotMachineContext } from '../../../../../contexts/SlotMachine/SlotMachineContext';
import './BetControl.css';

const options = [20, 50, 100, 200, 500];

const BetControl = props => {
  const { handleBet } = props;
  const [bet, setBet] = useState(20);
  // const slotsData = useContext(SlotMachineContext);

  return (
    <div className="BetControlWrapper">
      <select
        value={bet}
        onChange={(e) => {
          setBet(e.target.value);
          handleBet(e.target.value);
        }}
      >
        {options.map(opt =>
          <option key={opt} value={opt}>{`${opt} CC`}</option>
        )}
      </select>
      <div className="BetControlTitle">BET</div>
    </div>
  );
}

export default BetControl;
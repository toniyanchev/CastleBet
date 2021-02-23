import React, { useContext, useState } from 'react'

import SlotSpinButton from './SlotSpinButton/SlotSpinButton';
import BetControl from './BetControl/BetControl';
import BalanceBox from './BalanceBox/BalanceBox';
import { UserContext } from '../../../../contexts/User/UserContext';
import { SlotMachineContext } from '../../../../contexts/SlotMachine/SlotMachineContext';
import './SlotGameControls.css';
import postFetch from '../../../../fetches/postFetch';
import { toast } from 'react-toastify';

const SPIN_MACHINE = `http://localhost:4000/slotMachine/spin`;

const SlotGameControls = () => {
  const [bet, setBet] = useState(20);
  const userData = useContext(UserContext);
  const slotsData = useContext(SlotMachineContext);

  const spin = () => {
    slotsData.setReward(0);
    postFetch(SPIN_MACHINE,
      {
        userId: userData.user.id,
        bet: bet,
        game: "Castle"
      },
      userData.token
    )
      .then(data => {
        if (data.httpStatus === 200) {
          slotsData.setSlotSymbols(data.symbolsList);
          userData.setUser({
            ...userData,
            balance: userData.user.balance -= bet,
          });

          slotsData.setReward(data.reward);
          userData.setUser({
            ...userData.user,
            balance: userData.user.balance += data.reward
          });
        } else {
          toast.error("Not enough balance!");
        }
      })
  }

  return (
    <div className="SlotGameControlsWrapper">
      <BalanceBox balance={userData.user.balance}/>

      <SlotSpinButton
        handleClick={() => spin()}
      />

      <BetControl
        handleBet={(value) => setBet(value)}
      />
    </div>
  );
}

export default SlotGameControls;
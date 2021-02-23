import React, { useState } from 'react';
import { SlotMachineContext } from './SlotMachineContext';

export const SlotMachineContextProvider = props => {
  const [slotSymbols, setSlotSymbols] = useState([]);
  const [bet, setBet] = useState(20);
  const [reward, setReward] = useState(null);

  return (
    <SlotMachineContext.Provider value={{
      slotSymbols,
      setSlotSymbols,
      reward,
      setReward,
      bet,
      setBet
    }} >{props.children}</SlotMachineContext.Provider>
  );
}

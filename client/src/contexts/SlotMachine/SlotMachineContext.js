import React from 'react'

export const SlotMachineContext = React.createContext({
  bet: null,
  setBet: () => {},
  slotSymbols: null,
  setSlotSymbols: () => {},
  reward: null,
  setReward: () => {}
});

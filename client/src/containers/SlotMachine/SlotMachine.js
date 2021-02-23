import React from 'react'

import SlotGame from '../../components/SlotMachine/SlotGame/SlotGame';

import './SlotMachine.css';

const SlotMachine = props => {
  return (
    <div className="SlotMachineWrapper">
      <SlotGame />      
    </div>
  );
}

export default SlotMachine;
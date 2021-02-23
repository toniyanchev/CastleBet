import React, { useContext } from 'react';
import { animated, useSpring } from 'react-spring';

import { SlotMachineContext } from '../../../../../contexts/SlotMachine/SlotMachineContext';

import SlotSymbol from './SlotSymbol/SlotSymbol';

import './SlotColumn.css';

const SlotColumn = props => {
  const { columnNo } = props;
  const slotsData = useContext(SlotMachineContext);

  const anim = useSpring({
    from: { marginTop: -1500 },
    to: { marginTop: 0 },
    config: { duration: 700 },
    reset: true
  });
  
  return (
    <animated.div style={anim}>
      <div className="SlotColumnWrapper">
        <SlotSymbol symbol={slotsData.slotSymbols[columnNo].symbol}/>
        <SlotSymbol symbol={slotsData.slotSymbols[columnNo + 3].symbol}/>
        <SlotSymbol symbol={slotsData.slotSymbols[columnNo + 6].symbol}/>
      </div>
    </animated.div>
  );
}

export default SlotColumn;
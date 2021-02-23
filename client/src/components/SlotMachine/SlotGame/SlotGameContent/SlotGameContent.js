import React, { useContext } from 'react'

import { SlotMachineContext } from '../../../../contexts/SlotMachine/SlotMachineContext';

import SlotColumn from './SlotColumn/SlotColumn';
import RewardBox from './RewardBox/RewardBox';

import './SlotGameContent.css';

const SlotGameContent = () => {
  const slotsData = useContext(SlotMachineContext);
  console.log(slotsData);

  return (
    <div className="SlotGameContentWrapper">
    { slotsData.slotSymbols.length > 0 ?
      <div className="SlotGameContent">
          <SlotColumn columnNo={0} />
          <SlotColumn columnNo={1} />
          <SlotColumn columnNo={2} />
      </div> :
      null
    }

      <RewardBox reward={slotsData.reward} />
    </div>
  );
}

export default SlotGameContent;
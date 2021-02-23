import React from 'react';

import SlotGameControls from './SlotGameControls/SlotGameControls';
import SlotGameContent from './SlotGameContent/SlotGameContent';

import './SlotGame.css';

const SlotGame = props => {
  return (
    <div className="SlotGameWrapper">
      <SlotGameContent />
      <SlotGameControls />
    </div>
  );
}

export default SlotGame;
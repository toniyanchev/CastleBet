import React from 'react'

import { castle, king, queen, knight, gerb, crown, swords } from '../../../../images';

import './SlotSymbol.css';

const SlotSymbol = props => {
  const { symbol } = props;

  const takeImage = () => {
    switch (symbol) {
      case 1:
        return castle;
      case 2:
        return king;
      case 3:
        return queen;
      case 4:
        return knight;
      case 5:
        return crown;
      case 6:
        return swords;
      case 7:
        return gerb;
      default:
        window.alert('Cant get symbol image!');        
    }
  }
  
  return (
    <div className="SlotSymbolWrapper">
      <img
        alt="slot symbol"
        src={takeImage(symbol)}
      />
    </div>
  )
}

export default SlotSymbol;
import React, { useEffect, useState } from 'react';

import './RewardBox.css';

const RewardBox = props => {
  const { reward } = props;
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let timeout;
    if (reward !== null && reward !== 0) {
      timeout = setTimeout(() => setShown(true), 800);
      return () => {
        clearTimeout(timeout);
        setShown(false);
      }
    }
  }, [reward])
  console.log(shown);
  console.log(reward);
  return (
    <div className="RewardBoxWrapper">
      WIN:
      { shown && reward ? reward : 0 }
      CC
    </div>
  )
}

export default RewardBox;
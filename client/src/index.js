import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { UserContextProvider } from './contexts/User/UserContextProvider';
import { SlotMachineContextProvider } from './contexts/SlotMachine/SlotMachineContextProvider';
import App from './App';

const app = (
  <UserContextProvider>
    <SlotMachineContextProvider>
      <App />
    </SlotMachineContextProvider>
  </UserContextProvider>
)

ReactDOM.render(app, document.getElementById('root'));

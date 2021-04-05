import  React, { useState } from  'react';
export  const  StateContext = React.createContext();

let stockPrice = 0;
let exercisePrice = 0;
let interest = 0;
let vol = 0;
let startDate = 0; //  DTEs
let finalStockPrice = 0;
let finalOptValue = 0;
let initOptPrice = 0;
let stockHi = 0;
let stockLo = 0; 
let gainLoss = 0;
let percentageGain = 0;
let perContract = 0;
let realCost = 0;
let finalOptPrem = 0;

let options = { year: 'numeric', month: 'long', day: 'numeric' };
let today  = new Date();
let theDay = today.toLocaleDateString("en-US", options)
let endDate = new Date(Date.now() + startDate * 86400000);
let theDay2 = endDate.toLocaleDateString("en-us", options);


export  const  StateProvider = ({ children }) => {
  const [message, setMessage] = useState([stockPrice, exercisePrice, interest, vol, startDate, finalStockPrice, finalOptValue, initOptPrice, stockHi, stockLo, gainLoss, theDay, theDay2, perContract, percentageGain, realCost, finalOptPrem]);

  return (
    <StateContext.Provider
      value={{
        message,
        setMessage
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
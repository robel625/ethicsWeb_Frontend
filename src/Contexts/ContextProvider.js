import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {

  check_status: false,
};

export const ContextProvider = ({ children }) => {
  const [isClicked, setIsClicked] = useState(initialState);


  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    <StateContext.Provider value={{  handleClick, isClicked, initialState, setIsClicked }}>
      {children}
    </StateContext.Provider>
    
      

  );
};

export const useStateContext = () => useContext(StateContext);

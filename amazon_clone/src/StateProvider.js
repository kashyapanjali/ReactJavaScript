import React, { createContext, useContext, useReducer } from "react";

// Create the context and prepare the datalayer
export const StateContext = createContext();

// Build a provider component or provide datalayer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Hook to use the context in other components
export const useStateValue = () => useContext(StateContext);

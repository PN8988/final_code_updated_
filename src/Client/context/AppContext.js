// src/context/AppContext.js
// AppContext.js
// AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [propertyList, setPropertyList] = useState([]);
  const [panId, setPanId] = useState('');

  const addProperty = (newProperty) => {
    setPropertyList((prevList) => [...prevList, newProperty]);
  };

  return (
    <AppContext.Provider value={{ propertyList, addProperty, panId, setPanId }}>
      {children}
    </AppContext.Provider>
  );
};


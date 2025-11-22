import React, { createContext, useState } from 'react';

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clientData, setClientData] = useState(null);

  return (
    <ClientContext.Provider value={{ clientData, setClientData }}>
      {children}
    </ClientContext.Provider>
  );
};

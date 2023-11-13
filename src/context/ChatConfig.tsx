import React, { useState, createContext } from 'react';

export type ChatConfigContext = {
    save:boolean,
    setSave : (any)=> void
  };
  
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  export const ChatConfigContext = createContext<ChatConfigContext>(
    {} as ChatConfigContext
  );

  interface IChildren {
    children: JSX.Element | JSX.Element[]
    value?:()=> void
  }

  export const ChatConfigProvider = ({ children }: IChildren) => {
    const [save, setSave]=useState(false)
    
   
    return (
      <ChatConfigContext.Provider value={{save, setSave}}>
        {children}
      </ChatConfigContext.Provider>
    );
  };
import { useState, createContext, useEffect } from 'react';

export type AddMessageContext = {
    activeStep: number;
    setActiveStep:(number:number) => void;
    message:object,
    setMessage : (any)=> void,
    messageType:string,
    setMessageType:(any)=>void,
  };
  
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  export const AddMessageContext = createContext<AddMessageContext>(
    {} as AddMessageContext
  );

  interface IChildren {
    children: JSX.Element | JSX.Element[]
    value?:()=> void
  }

  export const AddMessageProvider = ({ children, value }: IChildren) => {
    const [activeStep, setActiveStep] = useState<number>(0)
    const [message, setMessage] = useState({})
    const [messageType, setMessageType] = useState('')
    console.log('step',activeStep)
   
    return (
      <AddMessageContext.Provider value={{activeStep,setActiveStep, message, setMessage,messageType, setMessageType}}>
        {children}
      </AddMessageContext.Provider>
    );
  };
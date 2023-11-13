import {  useContext } from 'react'
import { AddMessageContext } from '../../../../context/AddMessage'
import AddNewMessage from '../../../../pages/chatbot/configuracion/conversacion/containers/AddNewMessage'
import ConfigBotResponse from '../../../../pages/chatbot/configuracion/conversacion/containers/ConfigBotResponse'
import AdvanceConfigs from '../../../../pages/chatbot/configuracion/conversacion/containers/AdvanceConfigs'


export const GetStepContent = (handleClose:any, onAdd:any) => {
    
    const { activeStep } = useContext(AddMessageContext)

    switch (activeStep) {
      case 0:
        return <AddNewMessage/>
      case 1:
        return <ConfigBotResponse/>
        case 2:
        return <AdvanceConfigs handleClose={handleClose} onAdd={onAdd}/>
      default:
        return null
    }
  }
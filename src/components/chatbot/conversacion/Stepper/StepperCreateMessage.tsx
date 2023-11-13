// ** React Imports
import {useContext, useState} from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Components
import StepperDot from './StepperDot'
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { useFetch } from 'src/hooks/useFetch'
import {GetStepContent} from './StepperContet'
import { Button, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'

// ** Theme
import { useTheme } from '@mui/material/styles';
import { AddMessageContext } from '../../../../context/AddMessage'

//** Steps
 export const steps = [
  {
    title: 'Creación de mensaje',
    subtitle: 'Seleccione el tipo de mensaje a crear'
  },
  {
    title: 'Mensaje del bot',
    subtitle: 'Escriba e identifique el mensaje del bot'
  },
  {
    title: 'Configuración Avanzada',
    subtitle: 'Elija y configure'
  },
]

export default function StepperCreateReport({handleClose, onAdd}:any) {

    const { activeStep } = useContext(AddMessageContext)
  const theme = useTheme();
  
  return (
    <Card> 
        <StepperWrapper sx={{ p: 5 , backgroundColor: theme.palette.customColors.darkBg}}>
          <Stepper activeStep={activeStep} style={{padding:'1em'}}>
            {steps.map((step, index) => {
              const labelProps: {
                error?: boolean
              } = {}

              //** Validacion

              return (
                <Step key={index}>
                  <StepLabel {...labelProps} StepIconComponent={StepperDot} sx={{ fontWeight: 600, color: 'white' }}>
                    <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle' >{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
            <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ ml:0,padding:'2px', color: 'white', alignSelf:'start' }}
            >
              <Icon icon='mdi:close' />
            </IconButton>
          </Stepper>
        </StepperWrapper>
      <CardContent>{GetStepContent(handleClose,onAdd)}</CardContent>
    </Card>
  )
}





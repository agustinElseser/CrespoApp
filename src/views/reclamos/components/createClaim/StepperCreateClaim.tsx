// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Components
import StepperCustomDot from './StepperCustomDot'

import { useFetch } from 'src/hooks/useFetch'
import { ClaimContext } from './context/ClaimContext'
import { GetStepContent } from './StepContent'
import { Button, IconButton } from '@mui/material'

// ** Theme
import { useTheme } from '@mui/material/styles'
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { Icon } from '@iconify/react'

//** Steps
export const steps = [
  {
    title: 'Datos de usuario',
    subtitle: 'Corrobore sus datos personales'
  },
  {
    title: 'Datos del reclamo',
    subtitle: 'Complete los datos del reclamo'
  },
  {
    title: 'Carga de Imágenes',
    subtitle: 'Suba las imagenes/archivos'
  }
]

export default function StepperCreateClaim({ handleClose }: any) {
  // ** States
  const [stepsUsed, setStepsUsed] = useState<{ title; subtitle }[]>(steps)

  // ** Hooks
  const { activeStep } = useContext(ClaimContext)
  const theme = useTheme()

  return (
    <Card>
      <StepperWrapper sx={{ p: 4, backgroundColor: theme.palette.primary.dark }}>
        <Stepper activeStep={activeStep}>
          {stepsUsed.map((step, index) => {
            const labelProps: {
              error?: boolean
            } = {}

            return (
              <Step key={index}>
                <StepLabel
                  {...labelProps}
                  StepIconComponent={StepperCustomDot}
                  sx={{ fontWeight: 600, color: theme.palette.primary.contrastText }}
                >
                  <div className='step-label'>
                    <Typography className='step-number'>{`0${index + 1}`}</Typography>
                    <div>
                      <Typography className='step-title'>{step.title.toUpperCase()}</Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ ml: 0, padding: '0px', color: 'rgba(0, 0, 0, 0.7)', alignSelf: 'start' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </Stepper>
      </StepperWrapper>
      <CardContent>{GetStepContent(handleClose)}</CardContent>
    </Card>
  )
}

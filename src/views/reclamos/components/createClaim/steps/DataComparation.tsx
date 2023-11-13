// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Components
import { ClaimContext } from '../context/ClaimContext'

import { steps } from '../StepperCreateClaim'

export const DataComparation = () => {
  // ** Hooks
  const { activeStep, error, setActiveStep, files } = useContext(ClaimContext)

  // **Functions
  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const onSubmit = (values: any) => {
    setActiveStep(activeStep + 1)
  }

  return (
    <form key={2} onSubmit={onSubmit}>
      <Grid container spacing={5} sx={{ display: 'flex', flexDirection: 'column', overflowY: 'hidden' }}>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', flexDirection: 'rows', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.primary' }}>
              {steps[2].title}
            </Typography>
            <Typography variant='caption' component='p'>
              {steps[2].subtitle}
            </Typography>
          </Grid>
          <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}></Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
            Atrás
          </Button>
          <Button
            size='large'
            type='submit'
            disabled={error || files.length === 0}
            onClick={() => {
              setActiveStep(activeStep + 1)
            }}
            variant='contained'
          >
            Siguiente
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

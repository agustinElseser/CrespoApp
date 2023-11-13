// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import { ClaimContext } from '../context/ClaimContext'

// ** Styled
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 6,
  [`& .linearProgressClasses.colorPrimary`]: {
    backgroundColor: theme.palette.customColors.trackBg
  },
  [`& .linearProgressClasses.bar`]: {
    borderRadius: 6
  }
}))

const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <BorderLinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'></Typography>
      </Box>
    </Box>
  )
}

export default function ProcessLinearWithLabel({ index }: any) {
  // ** State
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const totalProgress = 100
    const duration = 2500 // Duración total en milisegundos
    const intervalTime = duration / (totalProgress / 10) // Intervalo de tiempo por cada incremento

    const timer = setInterval(() => {
      setProgress(prevProgress => {
        const nextProgress = prevProgress + 10 // Incremento aleatorio entre 0 y 10

        return nextProgress > totalProgress ? totalProgress : nextProgress
      })
    }, intervalTime)

    return () => {
      clearInterval(timer)
    }
  }, [progress])

  return <LinearProgressWithLabel style={{ width: '100%' }} value={100} />
}

// ** React Imports
import { useContext, useEffect, useState } from 'react'
import { useFetch } from 'src/hooks/useFetch'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Components
import { ClaimContext } from '../context/ClaimContext'

import { Box, CircularProgress, styled, useMediaQuery, useTheme } from '@mui/material'

import { useForm } from 'react-hook-form'

import toast from 'react-hot-toast'

import DropzoneImg from '../components/DropzoneImg'
import { Icon } from '@iconify/react'
import MapComponent from '../components/Maps'

interface IFormItem3 {
  images: string[]
}

export const UploadSummary = ({ handleClose }: any) => {
  const { image, activeStep, setActiveStep, handleQuery, handleFinished } = useContext(ClaimContext)
  const [formData, setFormData] = useState({ image: [] })
  const [loading, setLoading] = useState<boolean>(false)
  const [img, setImg] = useState('')

  // **Functions
  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  async function handleSend() {
    toast.loading('Subiendo imagen..', {
      duration: 2000,
      style: {
        zIndex: 999999
      }
    })
    setLoading(true)

    const arrayimg: string[] = []
    const files = image

    const url = 'https://api.cloudinary.com/v1_1/mostarq/image/upload'
    const formData = new FormData()

    for (let i = 0; i < image.length; i++) {
      const file = image[i]
      formData.append('file', file)
      formData.append('upload_preset', 'arquitectura')

      await fetch(url, {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(response => {
          arrayimg.push(response.secure_url)
          toast.success('Imagen subida.', {
            duration: 5000
          })
        })
        .catch(error => {
          toast.error('Error al subir imagen.', {
            duration: 5000,
            style: {
              zIndex: 999999999999
            }
          })
        })
    }

    handleQuery('img', arrayimg)

    setLoading(false)

    await handleFinished(arrayimg)
  }

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Grid container sx={{ minHeight: 400 }} alignContent={'space-between'} justifyContent={'center'}>
      <Box
        sx={{
          width: '100%',
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <DropzoneImg />
      </Box>

      <Grid container sx={{ alignSelf: 'end', justifyContent: 'space-between', mt: 8, gap: 5 }}>
        <Button
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => handleBack()}
          //startIcon={<Icon fontSize={22} color='warning' icon='mdi:arrow-left-circle' />}
          sx={isSmallScreen ? { flex: 1 } : {}}
          disabled={loading}
        >
          Atrás
        </Button>

        <Button
          size='small'
          onClick={() => handleSend()}
          variant='contained'
          startIcon={<Icon fontSize={22} color='warning' icon='mdi:receipt-text-arrow-right' />}
          sx={isSmallScreen ? { flex: 1 } : {}}
          disabled={loading}
        >
          Enviar
        </Button>
      </Grid>
    </Grid>
  )
}

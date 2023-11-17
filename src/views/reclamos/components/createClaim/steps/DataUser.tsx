// ** React Imports
import { ChangeEvent, useContext, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import Link from '@mui/material/Link'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'

// ** Styled Components
import { useFetch } from 'src/hooks/useFetch'
import { Alert, AlertTitle, FormHelperText, MenuItem, TextField, styled, useMediaQuery, useTheme } from '@mui/material'

import { ClaimContext } from '../context/ClaimContext'

import { steps } from '../StepperCreateClaim'

import { useAuth } from 'src/hooks/useAuth'
import { BoxScroll } from '../components/BoxScroll'

const CustomBox = styled(Box)(({ theme }) => ({
  '& .MuiDataGrid-footerContainer': {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    borderWidth: 2,
    borderRadius: '10px',
    borderColor: '#d3d2d2',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    transition: 'border .3s ease-in-out'
  },
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  borderWidth: 2,
  borderRadius: '10px',
  borderColor: '#d3d2d2',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
}))

export interface IMetadataHash {
  nombre: string
  hash_metadata: string
  fecha: string
  metadata: {
    id_metadata: string
    nombre_audio: string
  }[]
}

export interface IFormMetadata {
  dni: number
  mail: string
  creatorId: string
  creatorName: string
  creatorSurname: string
}

interface Iservice {
  id: string
  nombre: string
}

export interface IFormItem {
  name: string
  label: string
  select?: boolean
  options?: { id: string; name: string }[]
  validation?: string
  value?: string
}

const schema = yup.object().shape({
  nombre: yup.string().required('Nombre es un campo requerido.'),
  dni: yup.number().required('Nombre es un campo requerido.'),
  telefono: yup.string().required('Nombre es un campo requerido.'),
  correo: yup.string().required('Nombre es un campo requerido.')
})

export const DataUser = () => {
  // ** Hooks
  const { activeStep, query, setActiveStep, handleQuery } = useContext(ClaimContext)
  const { user } = useAuth()

  //Valores por defecto
  const defaultValues = {
    nombre: user?.nombre,
    dni: user?.dni,
    telefono: user?.telefono,
    correo: user?.username
  }

  const {
    control: control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // **Functions
  const onSubmit = (values: IFormMetadata) => {
    Object.entries(values).forEach(([key, value]) => {
      //@ts-ignore
      handleQuery(key, value)
    })
    setActiveStep(activeStep + 1)
  }

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    //@ts-ignore
    <form key={0} onSubmit={handleSubmit(onSubmit)}>
      <Grid container sx={{ minHeight: 400, p: 2 }} alignContent={'space-between'}>
        {!isSmallScreen && (
          <Grid
            item
            lg={6}
            sx={{
              display: 'flex',
              flexDirection: 'rows',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Grid sx={{ minHeight: 50, display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[0].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[0].subtitle}
              </Typography>
            </Grid>
          </Grid>
        )}
        <BoxScroll
          className='containScroll'
          sx={{
            alignSelf: 'center',
            width: '100%',
            maxHeight: isSmallScreen ? '40vh' : '65vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            pt: 4,
            pb: 4,
            pr: 2
          }}
        >
          <Grid container rowSpacing={isSmallScreen ? 8 : 6} columnSpacing={isSmallScreen ? 2 : 6}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='nombre'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      size='small'
                      value={value}
                      color='warning'
                      label='Nombre'
                      onChange={onChange}
                      disabled
                      error={Boolean(errors.nombre)}
                    />
                  )}
                />
                {errors.nombre && <FormHelperText sx={{ color: 'error.main' }}>{errors.nombre.message}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='dni'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      size='small'
                      disabled
                      value={value}
                      color='warning'
                      label='Documento de identidad'
                      onChange={onChange}
                      error={Boolean(errors.dni)}
                    />
                  )}
                />
                {errors.dni && <FormHelperText sx={{ color: 'error.main' }}>{errors.dni.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='telefono'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      size='small'
                      value={value}
                      disabled
                      color='warning'
                      label='Teléfono'
                      onChange={onChange}
                      error={Boolean(errors.telefono)}
                    />
                  )}
                />
                {errors.telefono && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.telefono.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='correo'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      size='small'
                      value={value}
                      disabled
                      color='warning'
                      label='Correo'
                      onChange={onChange}
                      error={Boolean(errors.correo)}
                    />
                  )}
                />
                {errors.correo && <FormHelperText sx={{ color: 'error.main' }}>{errors.correo.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item md={12}>
              <Alert icon={<Icon icon='mdi:chat-alert-outline' fontSize={26} />} severity='error' sx={{ mb: 4 }}>
                <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                  Verifique sus datos de contacto
                </AlertTitle>
                <Typography variant='body2' component='p'>
                  Las notificaciones de sus reclamos llegarán a sus datos de contacto establecidos, en caso de requerir
                  cambiarlos deberá modificar su perfil previamente.
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        </BoxScroll>
        <Grid container sx={{ alignSelf: 'end', justifyContent: 'space-between', mt: 8, gap: 5 }}>
          <Button size='small' variant='outlined' color='secondary' disabled sx={isSmallScreen ? { flex: 1 } : {}}>
            Atrás
          </Button>

          <Button size='small' type='submit' variant='contained' sx={isSmallScreen ? { flex: 1 } : {}}>
            Siguiente
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

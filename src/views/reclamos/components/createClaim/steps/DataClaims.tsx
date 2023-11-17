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
import { FormHelperText, MenuItem, TextField, styled, useMediaQuery, useTheme } from '@mui/material'

import { ClaimContext } from '../context/ClaimContext'
import { steps } from '../StepperCreateClaim'
import { useAuth } from 'src/hooks/useAuth'
import { idID } from '@mui/material/locale'
import { BoxScroll } from 'src/views/components/BoxScroll'

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

const schema = yup.object().shape({
  tipo_reclamo: yup.string().required('*Campo requerido.'),
  barrio: yup.string().required('*Campo requerido.'),
  calle: yup.string().required('*Campo requerido.'),
  altura: yup
    .string()
    .required('*Campo requerido.')
    .test('is-number', '*Debe ser un número', value => {
      //@ts-ignore
      return /^\d+$/.test(value)
    }),
  entre_calle1: yup.string().required('*Campo requerido.'),
  entre_calle2: yup.string().required('*Campo requerido.'),
  calle_interseccion: yup.string().required('*Campo requerido.'),
  descripcion: yup.string().required('*Campo requerido.')
})

interface Idata {
  id: string
  nombre: string
}
export const DataClaims = () => {
  // ** Hooks
  const { activeStep, query, setActiveStep, handleQuery } = useContext(ClaimContext)
  const { fetch, data } = useFetch()
  const { user } = useAuth()

  // ** States
  const [tiposReclamo, setTiposReclamo] = useState<Idata[]>([])
  const [barrios, setBarrios] = useState<Idata[]>([])
  const [calles, setCalles] = useState<Idata[]>([])

  //Valores por defecto
  const defaultValues = {
    tipo_reclamo: '',
    barrio: '',
    calle: '',
    altura: '',
    entre_calle1: '',
    entre_calle2: '',
    calle_interseccion: '',
    descripcion: ''
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
  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const findDataById = (key, id) => {
    switch (key) {
      case 'tipo_reclamo':
        return tiposReclamo.find(item => item.id === id)
      case 'barrio':
        return barrios.find(item => item.id === id)
      case 'calle':
        return calles.find(item => item.id === id)
      case 'entre_calle1':
        return calles.find(item => item.id === id)
      case 'entre_calle2':
        return calles.find(item => item.id === id)
      case 'calle_interseccion':
        return calles.find(item => item.id === id)
      case 'altura':
        return parseInt(id)
      default:
        return null
    }
  }

  const onSubmit = values => {
    const objectValues = { ...values }

    const keysToMap = [
      'tipo_reclamo',
      'barrio',
      'calle',
      'entre_calle1',
      'entre_calle2',
      'calle_interseccion',
      'altura'
    ]

    keysToMap.forEach(key => {
      const id = objectValues[key]
      const data = findDataById(key, id)
      if (data) {
        objectValues[key] = data
      }
    })

    Object.entries(objectValues).forEach(([key, value]) => {
      //@ts-ignore
      handleQuery(key, value)
    })
    setActiveStep(activeStep + 1)
  }

  useEffect(() => {
    fetch('tipo-reclamo/inputs').then(response => {
      setTiposReclamo(response.data.data)
    })
  }, [])

  useEffect(() => {
    fetch('barrio/inputs').then(response => {
      setBarrios(response.data.data)
    })
  }, [])

  useEffect(() => {
    fetch('calle/inputs').then(response => {
      setCalles(response.data.data)
    })
  }, [])

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <form key={0} onSubmit={handleSubmit(onSubmit)}>
      <Grid container sx={{ minHeight: 400 }}>
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
              {steps[1].title}
            </Typography>
            <Typography variant='caption' component='p'>
              {steps[1].subtitle}
            </Typography>
          </Grid>
        </Grid>
        <BoxScroll
          className='containScroll'
          sx={{
            alignSelf: 'center',
            width: '100%',
            maxHeight: isSmallScreen ? '50vh' : '65vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            pt: 4,
            pb: 4,
            pr: 2
          }}
        >
          <Grid container spacing={3} rowGap={4}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='tipo_reclamo'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      select
                      label='Tipo de reclamo'
                      value={value}
                      size='small'
                      type={'select'}
                      onBlur={onBlur}
                      color='warning'
                      onChange={onChange}
                      variant='outlined'
                      error={Boolean(errors.tipo_reclamo)}
                    >
                      {tiposReclamo.length > 0 ? (
                        tiposReclamo?.map(reclamo => (
                          <MenuItem key={reclamo.id} value={reclamo.id}>
                            {reclamo.nombre}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem key={'No hay metadata'} value={undefined}>
                          No hay metadata disponible
                        </MenuItem>
                      )}
                    </TextField>
                  )}
                />
                {errors.tipo_reclamo && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.tipo_reclamo.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='barrio'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      select
                      label='Seleccione un barrio o loteo'
                      value={value}
                      size='small'
                      type={'select'}
                      onBlur={onBlur}
                      color='warning'
                      onChange={onChange}
                      variant='outlined'
                      error={Boolean(errors.barrio)}
                    >
                      {barrios.length > 0 ? (
                        barrios?.map(barrio => (
                          <MenuItem key={barrio.id} value={barrio.id}>
                            {barrio.nombre}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem key={'No hay metadata'} value={undefined}>
                          No hay metadata disponible
                        </MenuItem>
                      )}
                    </TextField>
                  )}
                />
                {errors.barrio && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.barrio.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='calle'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      select
                      label='Seleccione una calle'
                      value={value}
                      size='small'
                      type={'select'}
                      onBlur={onBlur}
                      color='warning'
                      onChange={onChange}
                      variant='outlined'
                      error={Boolean(errors.calle)}
                    >
                      {calles.length > 0 ? (
                        calles?.map(calle => (
                          <MenuItem key={calle.id} value={calle.id}>
                            {calle.nombre}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem key={'No hay metadata'} value={undefined}>
                          No hay calles disponibles
                        </MenuItem>
                      )}
                    </TextField>
                  )}
                />
                {errors.calle && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.calle.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='altura'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      size='small'
                      value={value}
                      color='warning'
                      label='Número de calle'
                      onChange={onChange}
                      error={Boolean(errors.altura)}
                    />
                  )}
                />
                {errors.altura && <FormHelperText sx={{ color: 'error.main' }}>{errors.altura.message}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='entre_calle1'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      select
                      label='Entre calle'
                      value={value}
                      size='small'
                      type={'select'}
                      onBlur={onBlur}
                      color='warning'
                      onChange={onChange}
                      variant='outlined'
                      error={Boolean(errors.entre_calle1)}
                    >
                      {calles.length > 0 ? (
                        calles?.map(calle => (
                          <MenuItem key={calle.id} value={calle.id}>
                            {calle.nombre}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem key={'No hay metadata'} value={undefined}>
                          No hay calles disponibles
                        </MenuItem>
                      )}
                    </TextField>
                  )}
                />
                {errors.entre_calle1 && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.entre_calle1.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='entre_calle2'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      select
                      label='Entre calle'
                      value={value}
                      size='small'
                      type={'select'}
                      onBlur={onBlur}
                      color='warning'
                      onChange={onChange}
                      variant='outlined'
                      error={Boolean(errors.entre_calle2)}
                    >
                      {calles.length > 0 ? (
                        calles?.map(calle => (
                          <MenuItem key={calle.id} value={calle.id}>
                            {calle.nombre}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem key={'No hay metadata'} value={undefined}>
                          No hay calles disponibles
                        </MenuItem>
                      )}
                    </TextField>
                  )}
                />
                {errors.entre_calle1 && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.entre_calle1.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='calle_interseccion'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      select
                      label='Intersección con calle'
                      value={value}
                      size='small'
                      type={'select'}
                      onBlur={onBlur}
                      color='warning'
                      onChange={onChange}
                      variant='outlined'
                      error={Boolean(errors.calle_interseccion)}
                    >
                      {calles.length > 0 ? (
                        calles?.map(calle => (
                          <MenuItem key={calle.id} value={calle.id}>
                            {calle.nombre}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem key={'No hay metadata'} value={undefined}>
                          No hay calles disponibles
                        </MenuItem>
                      )}
                    </TextField>
                  )}
                />
                {errors.calle_interseccion && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.calle_interseccion.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <Controller
                  name='descripcion'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      size='small'
                      multiline
                      value={value}
                      color='warning'
                      minRows={5}
                      placeholder='Escribe un detalle..'
                      label='Descripción'
                      onChange={onChange}
                      error={Boolean(errors.descripcion)}
                    />
                  )}
                />
                {errors.descripcion && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.descripcion.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </BoxScroll>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 8 }}>
          <Button size='small' variant='outlined' color='secondary' onClick={() => handleBack()}>
            Atrás
          </Button>

          <Button size='small' type='submit' variant='contained'>
            Siguiente
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

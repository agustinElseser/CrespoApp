import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  Box,
  Stack,
  FormControlLabel,
  Switch,
  Divider
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useFetch } from 'src/hooks/useFetch'
import * as yup from 'yup'
import { LoadingButton } from '@mui/lab'
import Spinner from 'src/@core/components/spinner'
import { MuiChipsInput } from 'mui-chips-input'

/* const defaultClientValues: FormValues = {
  razon_social: '',
  rut: '',
  accountcode: '',
  nombre_corto: '',
  responsable_comercial: '',
  giro: '',
  email_notificacion: '',
  email_dte: '',
  portal_web: ''
} */
type FormValues = {
  razon_social: string
  rut: string
  accountcode: string
  nombre_corto: string
  responsable_comercial: string
  giro: string
  email_notificacion: string
  cdr: number
  dte: number
  email_dte: string[]
  email_cdr: string[]
  portal_web: string
}

const clientSchema = yup.object().shape({
  razon_social: yup.string().required('Razón social es un campo requerido.'),
  rut: yup
    .string()
    .matches(
      /^\d{1,8}-[kK0-9]$/,
      'Debe tener 10 caracteres, 8 numeros, seguido por un guión una letra o una número, ej:12345678-9 '
    )
    .required('Rut es un campo requerido.'),
  accountcode: yup.string().required('Accountcode es un campo requerido.'),
  nombre_corto: yup.string().required('Nombre corto es un campo requerido.'),
  responsable_comercial: yup.string().required('Responsable comercial es un campo requerido.'),
  giro: yup.string().required('Giro es un campo requerido.'),
  email_notificacion: yup.string().email().required('Email de notificación es un campo requerido.'),
  cdr: yup.number().required(),
  dte: yup.number().required(),
  email_dte: yup
    .array()
    .of(yup.string().email('El email debe ser válido'))
    .when('dte', {
      is: 1,
      then: yup
        .array()
        .of(yup.string().email('El email debe ser válido'))
        .test(
          'email_dte',
          'Debe colocar al menos un mail *No olvide de presionar enter dentro del casillero',
          (email_dte: any) => email_dte.length > 0
        )
        .required('El E-mail es un campo requerido.')
    }),
  email_cdr: yup
    .array()
    .of(yup.string().email('El email debe ser válido'))
    .when('cdr', {
      is: 1,
      then: yup
        .array()
        .test(
          'email_cdr',
          'Debe colocar al menos un mail *No olvide de presionar enter dentro del casillero',
          (email_cdr: any) => email_cdr.length > 0
        )
        .required('El E-mail es un campo requerido.')
    }),
  portal_web: yup.string().nullable()
})

const FormClient = ({ fetchData, id, handleCloseDialog, data }: any) => {
  const { fetch, loading: loadingClient } = useFetch()
  const [dataClient, setDataClient] = useState<FormValues | null>(null)
  const { fetch: editClient, loading: editLoading } = useFetch()
  console.log(dataClient)

  useEffect(() => {
    fetch(`/clients/${id}`).then(res => {
      setDataClient(res.data)
    })
  }, [fetch, setDataClient, id])

  console.log(data)
  const {
    control: clientControl,
    handleSubmit: handleClientSubmit,
    formState: { errors: clientntErrors },
    setValue
  } = useForm<FormValues>({
    defaultValues: {
      ...data,
      email_cdr: data.email_cdr ? data.email_cdr.split(',') : [],
      email_dte: data.email_dte ? data.email_dte.split(',') : []
    },
    resolver: yupResolver(clientSchema)
  })

  const cdr = useWatch({ control: clientControl, name: 'cdr' })
  const dte = useWatch({ control: clientControl, name: 'dte' })
  const handleChange = (e: any, name: 'cdr' | 'dte') => {
    const newValue = e.target.checked ? 1 : 0
    if (!newValue) {
      const newName: 'email_dte' | 'email_cdr' = `email_${name}`
      setValue(newName, [])
    } else {
      setValue(name, newValue)
    }
  }
  const onSubmit = (values: any) => {
    console.log(values)
    const paramasToEliminate = ['rut', 'accountcode', 'id', 'fecha_termino', 'fecha_inicio']
    paramasToEliminate.forEach(param => {
      Reflect.deleteProperty(values, param)
    })
    const paramsNotRequired = ['portal_web']
    paramsNotRequired.forEach(param => {
      if (!values[param]) {
        Reflect.deleteProperty(values, param)
      }
    })
    if (!values.cdr) {
      Reflect.deleteProperty(values, 'email_cdr')
    }
    if (!values.dte) {
      Reflect.deleteProperty(values, 'email_dte')
    }

    editClient(`/clients/${id}`, {
      method: 'PATCH',
      data: { ...values, email_dte: values.email_dte.join(), email_cdr: values.email_cdr.join() }
    })
      .then(() => {
        toast.success('Se editó con éxito')
        handleCloseDialog()
        fetchData()
      })
      .catch(e => {
        toast.error('Error! No se pudo editar, si el error persiste, comuniquese con soporte.')
        console.log(e)
      })
  }
  if (loadingClient) {
    return <Spinner sx={{ height: '100%' }} />
  }

  return (
    <Box sx={{ p: 4 }}>
      <form key={0} onSubmit={handleClientSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Información del cliente
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='razon_social'
                control={clientControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Nombre Cliente'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(clientntErrors.razon_social)}
                    aria-describedby='stepper-linear-account-username'
                  />
                )}
              />

              {clientntErrors.razon_social && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  {clientntErrors.razon_social.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='rut'
                control={clientControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Rut'
                    disabled
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(clientntErrors.rut)}
                    aria-describedby='stepper-linear-account-username'
                  />
                )}
              />
              {clientntErrors.rut && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  {clientntErrors.rut.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='accountcode'
                control={clientControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled
                    value={value}
                    label='Accountcode'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(clientntErrors.accountcode)}
                    aria-describedby='stepper-linear-account-username'
                  />
                )}
              />
              {clientntErrors.accountcode && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  {clientntErrors.accountcode.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='nombre_corto'
                control={clientControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Nombre Corto'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(clientntErrors.nombre_corto)}
                    aria-describedby='stepper-linear-account-username'
                  />
                )}
              />
              {clientntErrors.nombre_corto && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  {clientntErrors.nombre_corto.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='responsable_comercial'
                control={clientControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Responsable Comercial'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(clientntErrors.responsable_comercial)}
                    aria-describedby='stepper-linear-account-username'
                  />
                )}
              />
              {clientntErrors.responsable_comercial && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  {clientntErrors.responsable_comercial.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='giro'
                control={clientControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Giro'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(clientntErrors.giro)}
                    aria-describedby='stepper-linear-account-username'
                  />
                )}
              />
              {clientntErrors.giro && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  {clientntErrors.giro.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Controller
                name='portal_web'
                control={clientControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    required={data.portal_web ? true : false}
                    label='Portal Web'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(clientntErrors.portal_web)}
                    aria-describedby='stepper-linear-account-username'
                  />
                )}
              />
              {clientntErrors.portal_web && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  {clientntErrors.portal_web.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ padding: 0.5 }} />

            <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', m: 2 }}>
              Notificaciones
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Controller
                name='email_notificacion'
                control={clientControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='E-mail Notificación'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(clientntErrors.email_notificacion)}
                    aria-describedby='stepper-linear-account-username'
                  />
                )}
              />
              {clientntErrors.email_notificacion && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-email'>
                  {clientntErrors.email_notificacion.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack direction='row' spacing={2}>
              <FormControlLabel
                sx={{ width: '15%' }}
                control={<Switch checked={dte ? true : false} onChange={e => handleChange(e, 'dte')} color='primary' />}
                label='Prefactura'
              />

              <FormControl fullWidth>
                <Controller
                  name='email_dte'
                  control={clientControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <MuiChipsInput
                      placeholder='Escriba y presione enter'
                      value={value}
                      onChange={onChange}
                      size='medium'
                      error={Boolean(clientntErrors.email_dte)}
                      hideClearAll
                    />
                  )}
                />
                {clientntErrors.email_dte && (
                  <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-email'>
                    {Array.isArray(clientntErrors.email_dte)
                      ? clientntErrors?.email_dte?.find((obj: any) => obj)?.message
                      : clientntErrors?.email_dte?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack direction='row' spacing={2}>
              <FormControlLabel
                sx={{ width: '15%' }}
                control={<Switch checked={cdr ? true : false} onChange={e => handleChange(e, 'cdr')} color='primary' />}
                label='Cdr'
              />

              <FormControl fullWidth>
                <Controller
                  name='email_cdr'
                  control={clientControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <MuiChipsInput
                      placeholder='Escriba y presione enter'
                      value={value}
                      onChange={onChange}
                      size='medium'
                      hideClearAll
                      error={Boolean(clientntErrors.email_cdr)}
                    />
                  )}
                />
                {clientntErrors.email_cdr && (
                  <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-email'>
                    {Array.isArray(clientntErrors.email_cdr)
                      ? clientntErrors?.email_cdr?.find(obj => obj)?.message
                      : clientntErrors?.email_cdr?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleCloseDialog} size='large' variant='outlined' color='secondary'>
              Cancelar
            </Button>
            <LoadingButton
              size='large'
              type='submit'
              loading={editLoading}
              loadingIndicator='Loading…'
              variant='contained'
            >
              Editar
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default FormClient

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, FormControl, FormHelperText, TextField, Box, Typography } from '@mui/material'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useFetch } from 'src/hooks/useFetch'
import * as yup from 'yup'

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
  ciudad: string
  direccion: string
  estado: number
  fecha_creacion: string
  fecha_modificacion: string
  id: number
  id_cliente: number
  nombre: string
  pais: string
  telefono: string
  zipcode: number
}

const branchSchema = yup.object().shape({
  nombre: yup.string().required('Nombre es un campo requerido.'),
  direccion: yup.string().required('Direccion es un campo requerido.'),
  telefono: yup.string().required('Teléfono es un campo requerido.'),
  pais: yup.string().nullable(),
  ciudad: yup.string().nullable(),
  zipcode: yup.string().nullable()
})

const FormBranch = ({ fetchData, id, handleCloseDialog, data }: any) => {
  const { fetch: editBranch, loading: editLoading } = useFetch()

  console.log(data)
  const {
    control: sucursalControl,
    handleSubmit: handleSucursalSubmit,
    formState: { errors: sucursalErrors },
    getValues
  } = useForm<FormValues>({
    defaultValues: data,
    resolver: yupResolver(branchSchema)
  })
  console.log(getValues())
  const onSubmit = (values: any) => {
    console.log(values)
    const paramasToEliminate = ['id_cliente', 'id', 'fecha_modificacion', 'fecha_creacion']
    paramasToEliminate.forEach(param => {
      Reflect.deleteProperty(values, param)
    })

    const paramsNotRequired = ['pais', 'zipcode', 'ciudad']
    paramsNotRequired.forEach(param => {
      if (!values[param]) {
        Reflect.deleteProperty(values, param)
      }
    })

    editBranch(`/branches/${id}`, {
      method: 'PATCH',
      data: { ...values }
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

  return (
    <Box sx={{ px: 4, py: 8 }}>
      <Typography variant='h6' sx={{ fontWeight: 600, color: 'text.primary', mb: 4 }}>
        Información de la ubicación
      </Typography>
      <form key={1} onSubmit={handleSucursalSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='nombre'
                control={sucursalControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    required
                    value={value}
                    label='Nombre Ubicación'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(sucursalErrors.nombre)}
                    aria-describedby='stepper-linear-personal-username'
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='direccion'
                control={sucursalControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    required
                    value={value}
                    label='Dirección'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(sucursalErrors.direccion)}
                    aria-describedby='stepper-linear-personal-username'
                  />
                )}
              />
              {sucursalErrors.direccion && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  {sucursalErrors.direccion.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='telefono'
                control={sucursalControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    required
                    value={value}
                    label='Teléfono'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(sucursalErrors.telefono)}
                    aria-describedby='stepper-linear-personal-username'
                  />
                )}
              />
              {sucursalErrors.telefono && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  {sucursalErrors.telefono.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='pais'
                control={sucursalControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    required={data.pais ? true : false}
                    label='País'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(sucursalErrors.pais)}
                    aria-describedby='stepper-linear-personal-username'
                  />
                )}
              />
              {sucursalErrors.pais && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  {sucursalErrors.pais.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='ciudad'
                control={sucursalControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    required={data.ciudad ? true : false}
                    value={value}
                    label='Ciudad'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(sucursalErrors.ciudad)}
                    aria-describedby='stepper-linear-personal-username'
                  />
                )}
              />
              {sucursalErrors.ciudad && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  {sucursalErrors.ciudad.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='zipcode'
                control={sucursalControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    required={data.zipcode ? true : false}
                    value={value}
                    label='Zip Code'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(sucursalErrors.zipcode)}
                    aria-describedby='stepper-linear-personal-username'
                  />
                )}
              />
              {sucursalErrors.zipcode && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  {sucursalErrors.zipcode.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button disabled={editLoading} size='large' type='submit' variant='contained'>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default FormBranch

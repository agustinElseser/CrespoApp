import React, { useEffect } from 'react'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Select,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  Typography,
  MenuItem
} from '@mui/material'
import { useFetch } from 'src/hooks/useFetch'

const defaultSucursalValues = {
  nombre: 'ubicacion 1',
  direccion: 'ubicacion 1',
  telefono: '123456789',
  pais: 'Chile',
  ciudad: 'SANTIAGO',
  zipcode: '1679',
  id_cliente: ''
}

const CreateBranch = ({ handleCloseDialog, fetchData }: any) => {
  const { fetch: postBranch, loading: isCreating } = useFetch()
  const { fetch: fetchClients, data, loading: isLoadingClients } = useFetch()

  const sucursalSchema = yup.object().shape({
    id_cliente: yup.number().required('Cliente es un campo requerido.'),
    nombre: yup.string().required('Nombre es un campo requerido.'),

    direccion: yup.string().required('Direccion es un campo requerido.'),
    telefono: yup.string().required('Teléfono es un campo requerido.'),
    pais: yup.string(),
    ciudad: yup.string(),
    zipcode: yup.string()
  })

  const {
    /* reset: sucursalReset, */
    control: sucursalControl,
    handleSubmit: handleSucursalSubmit,
    setValue: setValueSucursal,

    /* getValues: getValuesSucursal, */
    formState: { errors: sucursalErrors }
  } = useForm({
    defaultValues: defaultSucursalValues,
    resolver: yupResolver(sucursalSchema)
  })

  const onSubmit = (values: any) => {
    console.log(values)
    postBranch(`/branches`, {
      method: 'POST',
      data: { ...values }
    })
      .then(() => {
        toast.success('Se creo la sucursal con éxito')
        handleCloseDialog()
        fetchData()
      })
      .catch(e => {
        toast.error('Error! No se pudo crear, si el error persiste, comuniquese con soporte.')
        console.log(e)
      })
  }

  useEffect(() => {
    fetchClients(`/clients`)
  }, [fetchClients])

  return (
    <form key={1} onSubmit={handleSucursalSubmit(onSubmit)} style={{ padding: '2rem' }}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
            Creación de Ubicación
          </Typography>
        </Grid>
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
            {sucursalErrors.nombre && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                {sucursalErrors.nombre.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <Controller
              name={`id_cliente`}
              control={sucursalControl}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <>
                  <InputLabel id='demo-simple-select-label'>Cliente</InputLabel>
                  <Select
                    disabled={isLoadingClients}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={value}
                    label='Cliente'
                    onChange={(e: any) => setValueSucursal(`id_cliente`, e.target.value)}
                  >
                    {data.map((item: any) => {
                      return (
                        <MenuItem key={item.nombre} value={item.id}>
                          {item.nombre_corto}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </>
              )}
            />

            {/* {contactoErrors.tipo && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                          This field is required
                        </FormHelperText>
                      )} */}
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
      </Grid>
      <Box sx={{ mt: '1rem' }}>
        <Button disabled={isCreating} size='large' type='submit' variant='contained'>
          Enviar
        </Button>
      </Box>
    </form>
  )
}

export default CreateBranch

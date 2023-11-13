import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Grid,
  FormControl,
  FormHelperText,
  TextField,
  Box,
  Typography,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { useFetch } from 'src/hooks/useFetch'
import * as yup from 'yup'
import Spinner from 'src/@core/components/spinner'

type FormValues = {
  apellido: string
  descripcion: string
  email: string
  estado: number
  fecha_creacion: string
  fecha_modificacion: string | null
  id: number
  id_sucursal: number
  nombre: string
  telefono_principal: string
  telefono_secundario: string
  tipo: number
}

const contactSchema = yup.object().shape({
  nombre: yup.string().required('Nombre es un campo requerido.'),
  apellido: yup.string().required('Apellido es un campo requerido.'),
  tipo: yup.number().required(),
  email: yup.string().email('No es el formato correcto de e-mail').required('E-mail es un campo requerido.'),
  telefono_principal: yup.string().required('Teléfono principal es un campo requerido.'),
  telefono_secundario: yup.string().nullable(),
  descripcion: yup.string().nullable()
})

const FormContact = ({ fetchData, id, handleCloseDialog, data }: any) => {
  const { fetch: editBranch, loading: editLoading } = useFetch()
  const { fetch: fetchTypes, loading: loadingTypes, data: dataTypeContact } = useFetch()

  useEffect(() => {
    fetchTypes('/contact-types')

    // eslint-disable-next-line
  }, [])

  console.log(data)
  const {
    control: contactoControl,
    handleSubmit: handleContactSubmit,
    formState: { errors: contactoErrors },
    setValue
  } = useForm<FormValues>({
    defaultValues: data,
    resolver: yupResolver(contactSchema)
  })

  const onSubmit = (values: any) => {
    console.log(values)
    const paramasToEliminate = ['id_sucursal', 'id', 'fecha_modificacion', 'fecha_creacion']
    paramasToEliminate.forEach(param => {
      Reflect.deleteProperty(values, param)
    })

    const paramsNotRequired = ['telefono_secundario', 'descripcion']
    paramsNotRequired.forEach(param => {
      if (!values[param]) {
        Reflect.deleteProperty(values, param)
      }
    })

    /*     Reflect.deleteProperty(values, 'fecha_creacion')
    Reflect.deleteProperty(values, 'nombre')
    Reflect.deleteProperty(values, 'zipcode')
    Reflect.deleteProperty(values, 'direccion')
    Reflect.deleteProperty(values, 'direccion') */

    editBranch(`/contacts/${id}`, {
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
  if (loadingTypes) {
    return <Spinner />
  }

  return (
    <Box sx={{ px: 4, py: 2 }}>
      <Typography variant='h6' sx={{ fontWeight: 600, color: 'text.primary', mb: 4 }}>
        Información del Contacto
      </Typography>
      <form onSubmit={handleContactSubmit(onSubmit)} style={{ padding: '1rem' }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name={`nombre`}
                control={contactoControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    required
                    value={value}
                    label='Nombre'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(contactoErrors?.nombre)}
                    aria-describedby='stepper-linear-personal-username'
                  />
                )}
              />

              {contactoErrors.nombre && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  Nombre es un campo requerido.
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name={`apellido`}
                control={contactoControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    required
                    value={value}
                    label='Apellido'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(contactoErrors.apellido)}
                    aria-describedby='stepper-linear-personal-username'
                  />
                )}
              />

              {/* {contactoErrors.apellido && (
            <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
              This field is required
            </FormHelperText>
          )} */}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name={`tipo`}
                control={contactoControl}
                rules={{ required: true }}
                render={({ field: { value } }) => (
                  <>
                    <InputLabel id='demo-simple-select-label'>Tipo de Contacto</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={value}
                      label='Tipo de Contacto'
                      onChange={(e: any) => setValue('tipo', e.target.value)}
                    >
                      {dataTypeContact.map((item: any) => {
                        return (
                          <MenuItem key={item.nombre} value={item.id}>
                            {item.nombre}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </>
                )}
              />

              {contactoErrors.tipo && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name={`email`}
                control={contactoControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    required
                    value={value}
                    label='Email'
                    type='email'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(contactoErrors.email)}
                    aria-describedby='stepper-linear-personal-username'
                  />
                )}
              />

              {contactoErrors.email && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name={`telefono_principal`}
                control={contactoControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    required
                    value={value}
                    label='Telefono Principal'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(contactoErrors.telefono_principal)}
                    aria-describedby='stepper-linear-personal-username'
                  />
                )}
              />
              {contactoErrors.telefono_principal && (
                <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name={`telefono_secundario`}
                control={contactoControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    required={data.telefono_secundario ? true : false}
                    label='Teléfono secundario'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(contactoErrors.telefono_secundario)}
                    aria-describedby='stepper-linear-personal-username'
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name={`descripcion`}
                control={contactoControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  console.log(value)

                  return (
                    <TextField
                      value={value}
                      required={data.descripcion ? true : false}
                      label='Descripción'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(contactoErrors.descripcion)}
                      aria-describedby='stepper-linear-personal-username'
                    />
                  )
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
            <Button disabled={editLoading} size='large' type='submit' variant='contained'>
              Editar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default FormContact

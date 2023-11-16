import { useState } from 'react'
import { useFetch } from 'src/hooks/useFetch'
import FormHelperText from '@mui/material/FormHelperText'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { Icon } from '@iconify/react'
import { TextFieldWrapper } from './Login'
import toast from 'react-hot-toast'

interface State {
  username: string
  password: string
  showPassword: boolean
  repeatPassword: string
  nombre: string
  apellido: string
  dni: string
  direccion: string
  telefono: string
}

export default function Register({ handleForm }) {
  const { fetch, data } = useFetch()
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [showfirstPassword, setShowfirstPassword] = useState(false)
  const defaultValues: State = {
    username: '',
    password: '',
    showPassword: false,
    repeatPassword: '',
    nombre: '',
    apellido: '',
    dni: '',
    direccion: '',
    telefono: ''
  }

  const schema = yup.object().shape({
    username: yup.string().required('*Username es un campo requerido.').email('*Debe ingresar un email válido.'),
    nombre: yup.string().required('*Nombre es un campo requerido.'),
    apellido: yup.string().required('*Apellido es un campo requerido.'),
    dni: yup.string().required('*DNI es un campo requerido.'),
    direccion: yup.string().required('*Direccion es un campo requerido.'),
    telefono: yup.string().required('*Telefono es un campo requerido.'),
    password: yup.string().required('*Campo requerido.'),
    repeatPassword: yup
      .string()
      .required('*Campo requerido.')
      .oneOf([yup.ref('password')], '*Las contraseñas deben coincidir.')
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (values: any) => {
    const auxvalues = { ...values, dni: parseFloat(values.dni) }
    fetch(`autenticacion/registrarse`, {
      method: 'POST',
      data: { ...auxvalues }
    })
      .then(data => {
        toast.success(data.data.msg, {
          duration: 5000
        })
        reset()
      })
      .catch(error => {
        toast.error(error.response.data.msg, {
          duration: 5000,
          style: {
            zIndex: 999999999999
          }
        })
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 5
        }}
      >
        <FormControl fullWidth>
          <Controller
            name='nombre'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextFieldWrapper
                sx={{
                  backgroundColor: 'none',
                  backdropFilter: 'blur(12px)',
                  color: 'white',
                  borderRadius: '5px 5px 5px 5px'
                }}
                label='Nombre'
                color='warning'
                size='small'
                value={value}
                onChange={onChange}
                variant='filled'
                error={Boolean(errors.nombre)}
              />
            )}
          />

          {errors.nombre && <FormHelperText sx={{ color: 'error.main' }}>{errors.nombre.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth>
          <Controller
            name='apellido'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextFieldWrapper
                sx={{
                  backgroundColor: 'none',
                  backdropFilter: 'blur(12px)',
                  color: 'white',
                  borderRadius: '5px 5px 5px 5px'
                }}
                label='Apellido'
                color='warning'
                size='small'
                value={value}
                onChange={onChange}
                variant='filled'
                error={Boolean(errors.apellido)}
              />
            )}
          />

          {errors.apellido && <FormHelperText sx={{ color: 'error.main' }}>{errors.apellido.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth>
          <Controller
            name='direccion'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextFieldWrapper
                sx={{
                  backgroundColor: 'none',
                  backdropFilter: 'blur(12px)',
                  color: 'white',
                  borderRadius: '5px 5px 5px 5px'
                }}
                label='Dirección'
                color='warning'
                size='small'
                value={value}
                onChange={onChange}
                variant='filled'
                error={Boolean(errors.direccion)}
              />
            )}
          />

          {errors.direccion && <FormHelperText sx={{ color: 'error.main' }}>{errors.direccion.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth>
          <Controller
            name='telefono'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextFieldWrapper
                sx={{
                  backgroundColor: 'none',
                  backdropFilter: 'blur(12px)',
                  color: 'white',
                  borderRadius: '5px 5px 5px 5px'
                }}
                label='Teléfono'
                color='warning'
                size='small'
                value={value}
                onChange={onChange}
                variant='filled'
                error={Boolean(errors.telefono)}
              />
            )}
          />

          {errors.telefono && <FormHelperText sx={{ color: 'error.main' }}>{errors.telefono.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth>
          <Controller
            name='dni'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextFieldWrapper
                sx={{
                  backgroundColor: 'none',
                  backdropFilter: 'blur(12px)',
                  color: 'white',
                  borderRadius: '5px 5px 5px 5px'
                }}
                label='Documento'
                color='warning'
                size='small'
                value={value}
                onChange={onChange}
                variant='filled'
                error={Boolean(errors.dni)}
              />
            )}
          />

          {errors.dni && <FormHelperText sx={{ color: 'error.main' }}>{errors.dni.message}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth>
          <Controller
            name='username'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextFieldWrapper
                sx={{
                  backgroundColor: 'none',
                  backdropFilter: 'blur(12px)',
                  color: 'white',
                  borderRadius: '5px 5px 5px 5px'
                }}
                label='Email'
                size='small'
                value={value}
                onChange={onChange}
                variant='filled'
                color='warning'
                error={Boolean(errors.username)}
              ></TextFieldWrapper>
            )}
          />

          {errors.username && <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth>
          <Controller
            name='password'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextFieldWrapper
                size='small'
                value={value}
                label='Contraseña'
                onChange={onChange}
                variant='filled'
                color='warning'
                sx={{
                  backgroundColor: 'none',
                  backdropFilter: 'blur(12px)',
                  color: 'white',
                  borderRadius: '5px 5px 5px 5px'
                }}
                placeholder='Nueva contraseña'
                error={Boolean(errors.password)}
                type={showNewPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        aria-label='toggle password visibility'
                      >
                        <Icon icon={showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} color='white' />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth>
          <Controller
            name='repeatPassword'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextFieldWrapper
                size='small'
                value={value}
                label='Repetir contraseña'
                onChange={onChange}
                variant='filled'
                color='warning'
                sx={{
                  backgroundColor: 'none',
                  backdropFilter: 'blur(12px)',
                  color: 'white',
                  borderRadius: '5px 5px 5px 5px'
                }}
                placeholder='Repetir contraseña'
                error={Boolean(errors.repeatPassword)}
                type={showRepeatPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                        aria-label='toggle password visibility'
                      >
                        <Icon icon={showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} color='white' />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          {errors.repeatPassword && (
            <FormHelperText sx={{ color: 'error.main' }}>{errors.repeatPassword.message}</FormHelperText>
          )}
        </FormControl>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', mt: 0 }}>
          <Button fullWidth size='large' type='submit' variant='contained'>
            Registrarse
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} onClick={() => handleForm()}>
            <Typography color={'white'} variant='body2'>
              ¿Ya tiene cuenta?
            </Typography>
            <Typography color={'white'} variant='body2'>
              INICIE SESIÓN
            </Typography>
            <Icon icon='mdi:login' fontSize={20} color='white' />
          </Box>
        </Box>
      </Box>
    </form>
  )
}

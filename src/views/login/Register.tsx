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

interface State {
  password: string
  showPassword: boolean
  repeatPassword: string
  name: string
  surname: string
  email: string
}

export default function Register({ handleForm }) {
  const { fetch, data } = useFetch()
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [showfirstPassword, setShowfirstPassword] = useState(false)
  const defaultValues: State = {
    password: '',
    showPassword: false,
    repeatPassword: '',
    email: '',
    name: '',
    surname: ''
  }

  const schema = yup.object().shape({
    name: yup.string().required('Nombre es un campo requerido.'),
    surname: yup.string().required('Apellido es un campo requerido.'),
    email: yup.string().required('Email es un campo requerido.').email('Debe ingresar un correo electrónico válido.'),
    password: yup.string().required('Nombre es un campo requerido.'),
    repeatPassword: yup
      .string()
      .required('Repetir contraseña es un campo requerido.')
      .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir.')
  })
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // ** Styled Components
  const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
    [theme.breakpoints.up('sm')]: { width: '28rem' }
  }))

  const LinkStyled = styled('a')(({ theme }) => ({
    fontSize: '0.875rem',
    textDecoration: 'none',
    color: theme.palette.primary.main
  }))

  const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
    '& .MuiFormControlLabel-label': {
      fontSize: '0.875rem',
      color: theme.palette.text.secondary
    }
  }))

  // ** State

  // ** Hook
  const theme = useTheme()

  // const handleChange = (prop) => (event: ChangeEvent<HTMLInputElement>) => {
  //   console.log(prop, "prooppp");
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  const onSubmit = (values: any) => {
    fetch(`users/newuser`, {
      method: 'POST',
      data: { ...values }
      // url: `${URL}/users/newuser`
    })
  }

  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword });
  // };

  // const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  // };

  return (
    <Box
      sx={{
        width: '400px'
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                sx={{
                  backgroundColor: 'white',
                  color: 'red',
                  borderRadius: '5px 5px 5px 5px'
                }}
                label='Nombre'
                color='secondary'
                size='small'
                value={value}
                onChange={onChange}
                variant='filled'
                error={Boolean(errors.name)}
              />
            )}
          />

          {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <Controller
            name='surname'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                sx={{
                  backgroundColor: 'white',
                  color: 'red',
                  borderRadius: '5px 5px 5px 5px'
                }}
                label='Apellido'
                size='small'
                value={value}
                onChange={onChange}
                variant='filled'
                color='secondary'
                error={Boolean(errors.surname)}
              />
            )}
          />

          {errors.surname && <FormHelperText sx={{ color: 'error.main' }}>{errors.surname.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                sx={{
                  backgroundColor: 'white',
                  color: 'red',
                  borderRadius: '5px 5px 5px 5px'
                }}
                label='Email'
                size='small'
                value={value}
                onChange={onChange}
                variant='filled'
                color='secondary'
                error={Boolean(errors.email)}
              ></TextField>
            )}
          />

          {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <Controller
            name='password'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                size='small'
                value={value}
                label='Nueva contraseña'
                onChange={onChange}
                variant='filled'
                color='secondary'
                sx={{
                  backgroundColor: 'white',
                  color: 'red',
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
                        <Icon icon={showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Controller
            name='repeatPassword'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                size='small'
                value={value}
                label='Repetir contraseña'
                onChange={onChange}
                variant='filled'
                color='secondary'
                sx={{
                  backgroundColor: 'white',
                  color: 'red',
                  borderRadius: '5px 5px 5px 5px'
                }}
                placeholder='Repetir contraseña'
                error={Boolean(errors.password)}
                type={showRepeatPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                        aria-label='toggle password visibility'
                      >
                        <Icon icon={showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}
        </FormControl>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', mt: 4 }}>
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
      </form>
    </Box>
  )
}

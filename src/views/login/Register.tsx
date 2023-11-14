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

interface State {
  password: string
  showPassword: boolean
  repeatPassword: string
  name: string
  username: string
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
    username: ''
  }

  const schema = yup.object().shape({
    name: yup.string().required('*Nombre es un campo requerido.'),
    username: yup.string().required('*Apellido es un campo requerido.'),
    email: yup.string().required('*Email es un campo requerido.').email('*Debe ingresar un email válido.'),
    password: yup.string().required('*Campo requerido.'),
    repeatPassword: yup
      .string()
      .required('*Campo requerido.')
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
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}
      >
        <FormControl fullWidth>
          <Controller
            name='name'
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
                error={Boolean(errors.name)}
              />
            )}
          />

          {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
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
                label='Apellido'
                size='small'
                value={value}
                onChange={onChange}
                variant='filled'
                color='warning'
                error={Boolean(errors.username)}
              />
            )}
          />

          {errors.username && <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth>
          <Controller
            name='email'
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
                error={Boolean(errors.email)}
              ></TextFieldWrapper>
            )}
          />

          {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
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
                label='Nueva contraseña'
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

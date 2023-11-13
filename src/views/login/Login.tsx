// ** React Imports
import { useState, ReactNode, useEffect } from 'react'

// ** MUI Components

import Button from '@mui/material/Button'

import TextField, { TextFieldProps } from '@mui/material/TextField'

import Box, { BoxProps } from '@mui/material/Box'

import { styled } from '@mui/material/styles'

import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Third Party Imports
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import * as yup from 'yup'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

import BlankLayout from 'src/@core/layouts/BlankLayout'

import { IconButton, InputAdornment, Link, MenuItem, Stack } from '@mui/material'

import { Icon } from '@iconify/react'
import ResetPassword from 'src/views/components/ResetPassword'
import Register from 'src/views/login/Register'

// ** Styled Components

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: '100%'
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  },
  padding: 30,
  borderRadius: 15,
  backdropFilter: 'blur(5px)',
  //backgroundColor: 'rgb(255,215,58,0.3)'
  //backgroundColor: 'rgb(255,255,255,0.15)'
  border: '1px solid rgb(255,255,255,0.55)',
  '&.MuiFormControl-root': {
    backgroundColor: 'none'
  },
  '.MuiTextField-root': {
    backgroundColor: 'none'
  },
  '.MuiInputBase-root': {
    backgroundColor: 'none'
  },
  '.MuiFilledInput-root': {
    backgroundColor: 'none'
  }
}))

const TextFieldWrapper = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiInputBase-input.MuiFilledInput-input': {
    color: 'black',
    backdropFilter: 'blur(5px)',
    backgroundColor: 'none'
  }
}))

const TypographyWhite = styled(Typography)<TypographyProps>(() => ({
  color: 'white'
}))

const showErrors = (field: string, valueLen: number) => {
  if (valueLen === 0) {
    return `${field.toUpperCase()} es un campo requerido.`
  } else if (valueLen === -1) {
    return `Por favor, selecciona una empresa.`
  }
}

export interface FormLogin {
  username: string
  password: string | undefined
}

const defaultValues = {
  password: undefined,
  username: '',
  id_cliente: undefined,
  showPassword: false,
  showCompany: false
}

const schema = yup.object().shape({
  username: yup.string().required(obj => showErrors('username', obj.value.length)),
  showPassword: yup.boolean(),
  password: yup.string().when('showPassword', {
    is: true,
    then: yup.string().required(obj => showErrors('contraseña', obj.value?.length))
  }),
  showCompany: yup.boolean(),
  id_cliente: yup.string().when('showCompany', {
    is: true,
    then: yup.string().required(showErrors('id_cliente', -1))
  })
})

export default function Login({ handleForm }) {
  const [title, setTitle] = useState<string>('')
  const [showActPassword, setShowActPassword] = useState(false)
  const [open, setOpen] = useState<boolean>(false)
  // ** Hooks
  const auth = useAuth()

  // ** Functions
  const handleClose = () => {
    setOpen(false)
    reset()
  }
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  //variables observadas
  const password = useWatch({ control: control, name: 'password' })
  const username = useWatch({ control: control, name: 'username' })

  const onSubmit = (data: FormLogin) => {
    const { username, password } = data

    auth.login(data)
  }

  useEffect(() => {
    if (password !== undefined) {
      setValue('showPassword', true)
    }
    if (auth.companies && auth.companies?.length > 1) {
      setValue('showCompany', true)
    }
  }, [password, auth.companies, setValue])

  useEffect(() => {
    auth.setCompanies(null)
    setValue('password', undefined)
    setValue('showPassword', false)
    setValue('showCompany', false)
  }, [username, setValue])

  const [hoveredSvg, setHoveredSvg] = useState('')

  const handleMouseEnter = (e, svgName) => {
    setHoveredSvg(svgName)
  }

  const handleMouseLeave = () => {
    setHoveredSvg('')
  }

  return (
    <>
      <Box
        sx={{
          width: '400px'
        }}
      >
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='username'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextFieldWrapper
                  sx={{ backgroundColor: 'white', color: 'red', borderRadius: '5px 5px 5px 5px' }}
                  label='Username'
                  color='secondary'
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  variant='filled'
                  error={Boolean(errors.username)}
                  placeholder='admin'
                />
              )}
            />

            {errors.username && <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>}
          </FormControl>

          <>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextFieldWrapper
                    className='textFieldLogin'
                    sx={{ backgroundColor: 'white', color: 'gray', borderRadius: '5px 5px 5px 5px' }}
                    label='Contraseña'
                    color='secondary'
                    value={value}
                    type={showActPassword ? 'text' : 'password'}
                    onBlur={onBlur}
                    autoFocus
                    onChange={onChange}
                    variant='filled'
                    error={Boolean(errors.password)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={() => setShowActPassword(!showActPassword)}
                            aria-label='toggle password visibility'
                          >
                            <Icon icon={showActPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />

              {errors.password && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>

            {auth.companies && auth?.companies.length > 1 ? (
              <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name='id_cliente'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextFieldWrapper
                      select
                      sx={{ backgroundColor: 'white', color: 'gray', borderRadius: '5px 5px 5px 5px' }}
                      label='Seleccione una empresa'
                      value={value}
                      type={'select'}
                      onBlur={onBlur}
                      onChange={onChange}
                      variant='filled'
                      error={Boolean(errors.id_cliente)}
                    >
                      {auth.companies?.map(company => {
                        return (
                          <MenuItem key={company.id} value={company.id}>
                            {company.nombre}
                          </MenuItem>
                        )
                      })}
                    </TextFieldWrapper>
                  )}
                />
                {errors.id_cliente && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.id_cliente.message}
                  </FormHelperText>
                )}
              </FormControl>
            ) : null}
          </>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
            <Button fullWidth size='large' type='submit' variant='contained' onClick={handleSubmit(onSubmit)}>
              Acceder
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} onClick={() => setOpen(true)}>
              <TypographyWhite variant='body2'>¿Olvidó su contraseña?</TypographyWhite>
              <TypographyWhite variant='body2'>RESTABLECER</TypographyWhite>
              <Icon icon='mdi:lock-reset' fontSize={20} color='white' />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} onClick={() => handleForm()}>
              <Typography color={'white'} variant='body2'>
                ¿No tiene cuenta?
              </Typography>
              <Typography color={'white'} variant='body2'>
                REGÍSTRESE
              </Typography>
              <Icon icon='mdi:account-plus' fontSize={20} color='white' />
            </Box>
          </Box>
        </form>
      </Box>
      <ResetPassword handleCloseDialog={handleClose} open={open} />
    </>
  )
}

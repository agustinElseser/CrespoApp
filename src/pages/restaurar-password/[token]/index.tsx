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

import { IconButton, InputAdornment, Link, MenuItem, Stack, useMediaQuery, useTheme } from '@mui/material'

import { Icon } from '@iconify/react'
import ResetPassword from 'src/views/components/ResetPassword'
import Register from 'src/views/login/Register'
import Login, { TextFieldWrapper } from 'src/views/login/Login'
import { useRouter } from 'next/router'
import { useFetch } from 'src/hooks/useFetch'
import toast from 'react-hot-toast'

// ** Styled Components

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: 450
  },
  width: 450,
  [theme.breakpoints.down('md')]: {
    maxWidth: 350
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

export default function ActivateAccount() {
  // ** Hooks
  const router = useRouter()
  const { fetch, data } = useFetch()
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [showfirstPassword, setShowfirstPassword] = useState(false)

  const defaultValues = {
    password: '',
    showPassword: false,
    repeatPassword: ''
  }

  const schema = yup.object().shape({
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

  // ** Functions
  const handleRedirect = () => {
    router.replace('/login')
  }
  const { token } = router.query
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const onSubmit = data => {
    fetch(`autenticacion/restaurar-password/${token}`, {
      method: 'PATCH',
      data: data
    })
      .then(data => {
        toast.loading('Redireccionando..', {
          duration: 3000
        })
      })
      .catch(error => {
        toast.error(error.response?.data?.msg, {
          duration: 3000,
          style: {
            zIndex: 999999999999
          }
        })
      })
      .finally(() => {
        setTimeout(function () {
          handleRedirect()
        }, 1000)
      })
  }

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundImage: `url('https://res.cloudinary.com/mostarq/image/upload/v1700238462/Proyects/l9zizyftxddoaybm0mui.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <BoxWrapper>
            <Stack direction='column' justifyContent='center' alignItems='center' gap={8}>
              <Stack direction='column' justifyContent='center' alignItems='center' spacing={4}>
                <img
                  src='http://crespo.gob.ar/wp-content/uploads/2019/01/escudo-encabezado2.png'
                  width='90%'
                  alt='Municipalidad de la Ciudad de Crespo'
                  id='logo'
                  style={{ marginBottom: '20px' }}
                />

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer' }}
                  onClick={() => handleRedirect()}
                ></Box>
              </Stack>

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
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
                )}
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
                      label='Repetir nueva contraseña'
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

              <Button fullWidth size='large' type='submit' variant='contained' onClick={handleSubmit(onSubmit)}>
                Cambiar contraseña
              </Button>
            </Stack>
          </BoxWrapper>
        </Box>
      </Box>
    </>
  )
}

ActivateAccount.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ActivateAccount.guestGuard = true

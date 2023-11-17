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
import Login from 'src/views/login/Login'
import { useRouter } from 'next/router'
import { useFetch } from 'src/hooks/useFetch'
import toast from 'react-hot-toast'

// ** Styled Components

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 50,
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

export default function ActivateAccount() {
  // ** Hooks
  const router = useRouter()
  const { fetch, data, loading } = useFetch()
  // ** Functions
  const handleRedirect = () => {
    router.replace('/login')
  }
  const { token } = router.query
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    if (token) {
      fetch(`autenticacion/activar-cuenta/${token}`, {
        method: 'PATCH'
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
  }, [token])

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
            <Stack direction='column' justifyContent='center' alignItems='center' gap={6}>
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
                >
                  {data?.data && (
                    <>
                      <Typography variant='h6' noWrap color='white' fontWeight={600}>
                        Su cuenta ha sido activada,
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                        <Typography color={'white'} variant='body2'>
                          haga click aquí para
                        </Typography>
                        <Typography color={'white'} variant='body2'>
                          INICIAR SESIÓN
                        </Typography>
                        <Icon icon='mdi:login' fontSize={20} color='white' />
                      </Box>
                    </>
                  )}
                  {data.data === false && data?.msg && (
                    <Typography variant='h6' noWrap color='white' fontWeight={600}>
                      {data.msg}
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Stack>
          </BoxWrapper>
        </Box>
      </Box>
    </>
  )
}

ActivateAccount.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ActivateAccount.guestGuard = true

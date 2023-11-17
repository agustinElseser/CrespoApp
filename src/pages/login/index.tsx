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

const LoginPage = () => {
  const [formLogin, setFormLogin] = useState<boolean>(false)

  // ** Functions
  const handleForm = () => {
    console.log('cambio')
    setFormLogin(!formLogin)
  }

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundImage: !isSmallScreen
            ? `url('https://res.cloudinary.com/mostarq/image/upload/v1700238462/Proyects/l9zizyftxddoaybm0mui.jpg')`
            : `url('https://res.cloudinary.com/mostarq/image/upload/v1700238462/Proyects/l9zizyftxddoaybm0mui.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: !isSmallScreen ? 'start' : 'center',
            justifyContent: 'center',
            pl: !isSmallScreen ? 30 : 0
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
                />
                <Typography variant='body2' noWrap color='white'>
                  Bienvenido/a, a la plataforma de gestión.
                </Typography>
              </Stack>
              {formLogin ? <Login handleForm={handleForm} /> : <Register handleForm={handleForm} />}
            </Stack>
          </BoxWrapper>
        </Box>
      </Box>
    </>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage

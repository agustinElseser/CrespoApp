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

export const TextFieldWrapper = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiInputBase-input.MuiFilledInput-input': {
    color: 'white',
    backdropFilter: 'blur(5px)',
    backgroundColor: 'none'
  },
  '& .MuiFormLabel-root': {
    color: 'white'
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
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
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
                  label='Username'
                  color='warning'
                  value={value}
                  onChange={onChange}
                  variant='filled'
                  error={Boolean(errors.username)}
                  placeholder='admin'
                />
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
                  className='textFieldLogin'
                  sx={{
                    backgroundColor: 'none',
                    backdropFilter: 'blur(12px)',
                    color: 'white',
                    borderRadius: '5px 5px 5px 5px'
                  }}
                  label='Contraseña'
                  color='warning'
                  value={value}
                  type={showActPassword ? 'text' : 'password'}
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
                          <Icon icon={showActPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} color='white' />
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
        </Box>
      </form>

      <ResetPassword handleCloseDialog={handleClose} open={open} />
    </>
  )
}

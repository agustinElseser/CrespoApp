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
import IconifyIcon from 'src/@core/components/icon'

import { Icon } from '@iconify/react'
import ResetPassword from 'src/views/components/ResetPassword'

// ** Styled Components

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: '100%'
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TextFieldWrapper = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiInputBase-input.MuiFilledInput-input': {
    color: 'black'
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

interface FormData {
  username: string
  password: string | undefined
  id_cliente?: number
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

const ResetPage = () => {
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

  const onSubmit = (data: FormData) => {
    //
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
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          background: 'linear-gradient(249deg, #8B1874 -19.1%, #0C134F 63.99%)'
        }}
      >
        <Box
          sx={{
            p: 12
          }}
        >
          <BoxWrapper>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={10}>
              <Stack direction='column' justifyContent='center' alignItems='center' spacing={4}>
                <TypographyWhite variant='h5'>Bienvenido</TypographyWhite>
                <TypographyWhite variant='body1'>Establece una nueva contraseña</TypographyWhite>
              </Stack>
              <Box sx={{ width: '400px' }}>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <FormControl fullWidth sx={{ mb: 6 }}>
                    <Controller
                      name='password'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextFieldWrapper
                          className='textFieldLogin'
                          sx={{ backgroundColor: 'white', color: 'gray', borderRadius: '5px 5px 5px 5px' }}
                          label='Nueva contraseña'
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
                                  <IconifyIcon icon={showActPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
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
                  <FormControl fullWidth sx={{ mb: 6 }}>
                    <Controller
                      name='password'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextFieldWrapper
                          className='textFieldLogin'
                          sx={{ backgroundColor: 'white', color: 'gray', borderRadius: '5px 5px 5px 5px' }}
                          label='Confirmar nueva contraseña'
                          value={value}
                          type={showActPassword ? 'text' : 'password'}
                          onBlur={onBlur}
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
                                  <IconifyIcon icon={showActPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
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
                  <Button fullWidth size='large' type='submit' variant='contained' onClick={handleSubmit(onSubmit)}>
                    Guardar
                  </Button>
                </form>
              </Box>
            </Stack>
          </BoxWrapper>
        </Box>
      </Box>
      <ResetPassword handleCloseDialog={handleClose} open={open} />
    </>
  )
}
ResetPage.guestGuard = true

ResetPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ResetPage

// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import { Box, CircularProgress, FormHelperText, Typography } from '@mui/material'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'
import { toast } from 'react-hot-toast'
import { useFetch } from 'src/hooks/useFetch'
import { BoxScroll } from 'src/views/components/BoxScroll'

interface State {
  newPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showConfirmNewPassword: boolean
}

interface IFormPass {
  password_actual: string
  password_nueva: string
  password_confirm: string
}
export default function UserSecurity() {
  const { fetch, data: dataPW, loading } = useFetch()

  //* States
  const [showActPassword, setShowActPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  const defaultValues: IFormPass = {
    password_actual: '',
    password_nueva: '',
    password_confirm: ''
  }

  const schema = yup.object().shape({
    password_actual: yup.string().required('Campo requerido.'),
    password_nueva: yup
      .string()
      .required('Campo requerido.')
      .notOneOf([yup.ref('password_actual')], 'La nueva contraseña no puede ser igual a la contraseña actual.')
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[*\-_$#@]).{8,}$/, 'La contraseña no cumple con los requisitos.'),
    password_confirm: yup
      .string()
      .required('Campo requerido.')
      .oneOf([yup.ref('password_nueva')], 'Las contraseñas no coinciden.')
      .notOneOf([yup.ref('password_actual')], 'La nueva contraseña no puede ser igual a la contraseña actual.')
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (values: any) => {
    const valuesToSend = { ...values }
    delete valuesToSend.password_confirm
    fetch('usuario/cambiar-password', { method: 'PUT', data: { ...valuesToSend } })
      .then(response => {
        toast.success('Contraseña modificada.', {
          duration: 3000,
          style: {
            zIndex: 999999
          }
        })
        reset(defaultValues)
      })
      .catch(e => {
        toast.error(`${e.response.data.msg}.`, {
          duration: 3000,
          style: {
            zIndex: 999999
          }
        })
      })
  }

  return (
    <Box>
      <Grid container xs={12}>
        <Card sx={{ minHeight: 600, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <CardContent
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <Typography variant='body1' fontWeight={600}>
              Cambiar contraseña
            </Typography>

            <Alert icon={false} severity='warning' sx={{ mb: 8, mt: 4 }}>
              <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                Asegúrese de que se cumplan estos requisitos
              </AlertTitle>
              <ul>
                <li>Contener 1 mayúscula</li>
                <li>Tener letras</li>
                <li>Tener números</li>
                <li>Al menos 1 caracter especial '* - _ $ # @'</li>
              </ul>
            </Alert>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <Controller
                      name='password_actual'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          size='small'
                          value={value}
                          label='Contraseña actual'
                          onChange={onChange}
                          placeholder='Ingrese su contraseña'
                          error={Boolean(errors.password_actual)}
                          type={showActPassword ? 'text' : 'password'}
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
                    {errors.password_actual && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.password_actual.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <Controller
                      name='password_nueva'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          size='small'
                          value={value}
                          label='Nueva contraseña'
                          onChange={onChange}
                          placeholder='Nueva contraseña'
                          error={Boolean(errors.password_nueva)}
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
                    {errors.password_nueva && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.password_nueva.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <Controller
                      name='password_confirm'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          size='small'
                          value={value}
                          label='Confirmar nueva contraseña'
                          onChange={onChange}
                          placeholder='Confirmar nueva contraseña'
                          error={Boolean(errors.password_confirm)}
                          type={showConfirmNewPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                  aria-label='toggle password visibility'
                                >
                                  <Icon icon={showConfirmNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    />
                    {errors.password_confirm && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.password_confirm.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid container xs={12} justifyContent={'center'} sx={{ mt: 6 }}>
                  <Button
                    type='submit'
                    variant='contained'
                    endIcon={loading && <CircularProgress sx={{ ml: 3, color: 'white' }} size={18} />}
                  >
                    Cambiar contraseña
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  )
}

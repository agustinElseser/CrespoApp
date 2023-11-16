import { useTheme } from '@mui/material/styles'
import { useFetch } from 'src/hooks/useFetch'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Box, Button, DialogActions, TextField } from '@mui/material'
import IconifyIcon from 'src/@core/components/icon'
// ** Third Party Imports
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import * as yup from 'yup'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'

interface IProps {
  handleCloseDialog: () => void
  open: boolean
}

const schema = yup.object().shape({
  username: yup.string().required('*Email es un campo requerido.').email('*Debe ingresar un email válido.')
})

export default function ResetPassword({ handleCloseDialog, open }: IProps) {
  // ** Hooks
  const theme = useTheme()
  const { fetch, loading, data } = useFetch()
  const [onReset, setOnReset] = useState<boolean>(false)

  const defaultValues = {
    username: ''
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

  const onSubmit = data => {
    setOnReset(true)
    reset()

    fetch(`autenticacion/restaurar-password/`, {
      method: 'POST',
      data: data
    })
  }

  useEffect(() => {
    setOnReset(false)
  }, [open])

  return (
    <Dialog maxWidth={'xs'} onClose={handleCloseDialog} open={open} fullWidth>
      <DialogTitle
        id='customized-dialog-title'
        sx={{
          p: 5,
          backgroundColor: theme.palette.primary.dark,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant='body1' sx={{ fontWeight: 500 }}>
          RESETEO DE CONTRASEÑA
        </Typography>

        <IconButton aria-label='close' onClick={handleCloseDialog} sx={{ justifySelf: 'end' }}>
          <IconifyIcon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <Box sx={{ p: 5, my: 7 }}>
        {!onReset ? (
          <FormControl fullWidth>
            <Controller
              name='username'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label='Email'
                  color='warning'
                  value={value}
                  size='small'
                  onChange={onChange}
                  variant='outlined'
                  error={Boolean(errors.username)}
                  placeholder='Tomas@hotmail.com'
                />
              )}
            />

            {errors.username && <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>}
          </FormControl>
        ) : (
          <Typography variant='body1' sx={{ fontWeight: 400, textAlign: 'center' }}>
            Siga las instrucciones que le enviamos al correo para restablecer su contraseña.
          </Typography>
        )}
      </Box>
      {!onReset && (
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 6, pt: 0 }}>
          <Button onClick={handleCloseDialog} color='secondary' variant='outlined'>
            Cancelar
          </Button>
          <Button variant='contained' type='submit' disabled={loading} onClick={handleSubmit(onSubmit)}>
            Resetear
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}
